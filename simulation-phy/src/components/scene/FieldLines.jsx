import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSimStore from '../../store/useSimStore';

export default function FieldLines() {
  const groupRef = useRef();
  const boostRef = useRef(0);
  const prevMetricRef = useRef(0);

  const P = useSimStore((s) => s.P);

  const halfGap = (P.d * 100) / 2;
  const plateSize = Math.sqrt(P.A) * 5 * 0.88;
  const ENorm = Math.min((P.V / Math.max(P.d, 1e-4)) / 30000, 1);
  const internal = 1 / Math.max(P.kappa, 1);
  const N = 5;
  const curvature = Math.min(0.26, 0.06 + ENorm * 0.2 + (1 - internal) * 0.08);

  useEffect(() => {
    const metric = (Math.max(P.V, 0) * Math.max(P.kappa, 1)) / Math.max(P.d, 1e-4);
    if (metric > prevMetricRef.current * 1.015) {
      boostRef.current = Math.min(boostRef.current + 0.9, 1.5);
    }
    prevMetricRef.current = metric;
  }, [P.A, P.V, P.d, P.kappa]);

  const lines = useMemo(() => {
    const result = [];

    for (let i = 0; i < N; i += 1) {
      for (let j = 0; j < N; j += 1) {
        const x = -plateSize / 2 + (i / (N - 1)) * plateSize;
        const z = -plateSize / 2 + (j / (N - 1)) * plateSize;

        const radial = Math.hypot(x, z) / Math.max(plateSize * 0.72, 1e-4);
        const radialFactor = 0.42 + radial * 0.74;
        const bend = curvature * radialFactor;
        const sign = (i + j) % 2 === 0 ? 1 : -1;

        const start = new THREE.Vector3(x, -halfGap, z);
        const ctrl = new THREE.Vector3(x + sign * z * bend, 0, z - sign * x * bend);
        const end = new THREE.Vector3(x, halfGap, z);

        const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
        result.push({ geometry });
      }
    }

    return result;
  }, [curvature, halfGap, plateSize]);

  useEffect(
    () => () => {
      lines.forEach((line) => line.geometry.dispose());
    },
    [lines]
  );

  const lineColor = useMemo(() => {
    if (P.kappa > 1) {
      return new THREE.Color().setHSL(0.08, 0.85, Math.min(0.54 + internal * 0.36, 0.9));
    }
    return new THREE.Color(0x00e5ff);
  }, [P.kappa, internal]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    boostRef.current = Math.max(0, boostRef.current - delta * 1.5);
    const surge = 1 + boostRef.current * (0.45 + 0.55 * Math.sin(clock.elapsedTime * 9.5));

    groupRef.current.children.forEach((child, i) => {
      if (child.material?.transparent) {
        const base = child.material.userData.b || (child.material.userData.b = child.material.opacity);
        const wobble = 0.86 + 0.14 * Math.sin(clock.elapsedTime * (3 + ENorm * 2.8) + i * 0.4);
        child.material.opacity = Math.min(0.98, base * wobble * surge);
      }
    });
  });

  const baseOpacity = 0.12 + 0.62 * ENorm * Math.max(internal, 0.18);

  return (
    <group ref={groupRef}>
      {lines.map(({ geometry }, idx) => (
        <line key={idx} geometry={geometry}>
          <lineBasicMaterial
            color={lineColor}
            transparent
            opacity={baseOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}
