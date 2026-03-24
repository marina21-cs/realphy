import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSimStore from '../../store/useSimStore';

const VSCALE = 100;
const ASCALE = 5;

const backOut = (t, overshoot = 1.8) => {
  const x = t - 1;
  return x * x * ((overshoot + 1) * x + overshoot) + 1;
};

export default function PlateMesh() {
  const posRef = useRef();
  const negRef = useRef();
  const posLightRef = useRef();
  const negLightRef = useRef();
  const spawnRef = useRef(0);
  const boostRef = useRef(0);
  const prevFieldRef = useRef(0);

  const P = useSimStore((s) => s.P);

  const plateSize = Math.sqrt(P.A) * ASCALE;
  const halfGap = (P.d * VSCALE) / 2;

  useEffect(() => {
    const metric = (Math.max(P.V, 0) * Math.sqrt(Math.max(P.A, 1e-6))) / Math.max(P.d, 1e-4);
    if (metric > prevFieldRef.current * 1.015) {
      boostRef.current = Math.min(boostRef.current + 0.85, 1.4);
    }
    prevFieldRef.current = metric;
  }, [P.A, P.V, P.d]);

  const geo = useMemo(() => new THREE.BoxGeometry(plateSize, plateSize, 0.045), [plateSize]);

  useFrame((_, delta) => {
    const { chargeLevel } = useSimStore.getState();

    boostRef.current = Math.max(0, boostRef.current - delta * 1.6);
    const surge = boostRef.current * (0.55 + 0.45 * Math.sin(performance.now() * 0.012));

    spawnRef.current = Math.min(1, spawnRef.current + delta * 1.5);
    const posScale = backOut(spawnRef.current, 1.8);
    const negScale = backOut(Math.max(0, spawnRef.current - 0.16), 1.8);

    if (posRef.current) {
      posRef.current.scale.set(posScale, posScale, posScale);
      posRef.current.material.emissiveIntensity = 0.06 + chargeLevel * 0.55 + surge * 0.38;
    }

    if (negRef.current) {
      negRef.current.scale.set(negScale, negScale, negScale);
      negRef.current.material.emissiveIntensity = 0.06 + chargeLevel * 0.55 + surge * 0.38;
    }

    if (posLightRef.current) {
      posLightRef.current.intensity = chargeLevel * 0.8 + surge * 0.6;
    }

    if (negLightRef.current) {
      negLightRef.current.intensity = chargeLevel * 0.8 + surge * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={posRef} geometry={geo} rotation={[Math.PI / 2, 0, 0]} position={[0, halfGap, 0]} castShadow>
        <meshStandardMaterial color={0x99aabb} metalness={0.88} roughness={0.12} emissive={0xff2200} emissiveIntensity={0.06} />
      </mesh>
      <pointLight ref={posLightRef} color={0xff5544} intensity={0} distance={4} position={[0, halfGap + 0.3, 0]} />

      <mesh ref={negRef} geometry={geo} rotation={[Math.PI / 2, 0, 0]} position={[0, -halfGap, 0]} castShadow>
        <meshStandardMaterial color={0x99aabb} metalness={0.88} roughness={0.12} emissive={0x0022ff} emissiveIntensity={0.06} />
      </mesh>
      <pointLight ref={negLightRef} color={0x4488ff} intensity={0} distance={4} position={[0, -halfGap - 0.3, 0]} />
    </group>
  );
}
