import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSimStore from '../../store/useSimStore';
import { MATS } from '../../physics/materials';

const DR = 10;
const DC = 10;
const DL = 3;
const COUNT = DR * DC * DL;

export default function DipoleMesh() {
  const bodyRef = useRef();
  const posEndRef = useRef();
  const negEndRef = useRef();
  const anglesRef = useRef([]);
  const opacityRef = useRef(0);
  const targetThetaRef = useRef(0);
  const settleSpeedRef = useRef(1.2);
  const chaosUntilRef = useRef(0);

  const P = useSimStore((s) => s.P);
  const currentMat = useSimStore((s) => s.currentMat);

  const halfGap = (P.d * 100) / 2;
  const plateSize = Math.sqrt(P.A) * 5 * 0.82;

  useEffect(() => {
    if (!bodyRef.current || !posEndRef.current || !negEndRef.current) {
      return;
    }

    bodyRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    posEndRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    negEndRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useEffect(() => {
    const next = [];

    for (let l = 0; l < DL; l += 1) {
      for (let r = 0; r < DR; r += 1) {
        for (let c = 0; c < DC; c += 1) {
          const x = -plateSize / 2 + (r / (DR - 1)) * plateSize;
          const z = -plateSize / 2 + (c / (DC - 1)) * plateSize;
          const layerY = DL === 1 ? 0 : -halfGap * 0.5 + (l / (DL - 1)) * halfGap;
          next.push({
            x,
            y: layerY,
            z,
            th: (Math.random() - 0.5) * Math.PI,
            target: 0,
          });
        }
      }
    }

    anglesRef.current = next;
  }, [halfGap, plateSize]);

  useEffect(() => {
    const mat = MATS[currentMat] ?? MATS.vacuum;

    if (currentMat === 'vacuum') {
      opacityRef.current = 0;
      useSimStore.getState().setAlignFrac(0);
      return;
    }

    const maxKappa = 1200;
    const norm = Math.min(Math.log10(mat.kappa + 1) / Math.log10(maxKappa + 1), 1);
    targetThetaRef.current = norm * (Math.PI / 2 - 0.04);
    settleSpeedRef.current = mat.alignSpeed ?? 1.4;

    if (mat.climax) {
      targetThetaRef.current = Math.PI / 2 - 0.015;
      settleSpeedRef.current *= 1.45;
    }

    chaosUntilRef.current = mat.chaos ? performance.now() + 1100 : 0;
    opacityRef.current = 0;

    useSimStore.getState().setAlignFrac(Math.min(1, targetThetaRef.current / (Math.PI / 2)));

    anglesRef.current.forEach((a) => {
      a.target = targetThetaRef.current + (Math.random() - 0.5) * (1 - norm) * 0.6;
    });

    if (posEndRef.current && negEndRef.current) {
      const posColor = mat.dipColor ?? 0xff3322;
      posEndRef.current.material.color.setHex(posColor);
      posEndRef.current.material.emissive.setHex(posColor);
      negEndRef.current.material.color.setHex(0x2233ff);
      negEndRef.current.material.emissive.setHex(0x1122ff);
    }
  }, [currentMat]);

  const bodyGeo = useMemo(() => new THREE.CylinderGeometry(0.007, 0.007, 0.065, 6), []);
  const endGeo = useMemo(() => new THREE.SphereGeometry(0.013, 6, 4), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }, delta) => {
    if (!bodyRef.current || !posEndRef.current || !negEndRef.current || !anglesRef.current.length) {
      return;
    }

    const now = performance.now();
    const isChaos = now < chaosUntilRef.current;

    if (currentMat === 'vacuum') {
      opacityRef.current = Math.max(0, opacityRef.current - delta * 2.2);
    } else {
      opacityRef.current = Math.min(0.88, opacityRef.current + delta * 1.9);
    }

    const opacity = opacityRef.current;
    bodyRef.current.material.opacity = opacity;
    posEndRef.current.material.opacity = opacity * 0.9;
    negEndRef.current.material.opacity = opacity * 0.9;

    if (opacity < 0.01) {
      return;
    }

    const alignFrac = useSimStore.getState().alignFrac || 0;
    const jitterAmp = (1 - alignFrac) * 0.055;
    const t = clock.elapsedTime;

    anglesRef.current.forEach((a, i) => {
      if (isChaos) {
        a.th += 0.22 + (i % 4) * 0.01;
      } else {
        a.th += (a.target - a.th) * delta * 3.4 * settleSpeedRef.current;
      }

      const th = a.th + (i % 3 === 0 ? jitterAmp * Math.sin(t * 2.5 + i * 1.73) : 0);
      const hy = 0.033;

      dummy.position.set(a.x, a.y, a.z);
      dummy.rotation.set(th, 0, 0);
      dummy.updateMatrix();
      bodyRef.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(a.x + Math.sin(th) * hy, a.y + Math.cos(th) * hy, a.z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      posEndRef.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(a.x - Math.sin(th) * hy, a.y - Math.cos(th) * hy, a.z);
      dummy.updateMatrix();
      negEndRef.current.setMatrixAt(i, dummy.matrix);
    });

    bodyRef.current.instanceMatrix.needsUpdate = true;
    posEndRef.current.instanceMatrix.needsUpdate = true;
    negEndRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={bodyRef} args={[bodyGeo, null, COUNT]}>
        <meshStandardMaterial color={0xbbccdd} metalness={0.3} roughness={0.6} transparent opacity={0} />
      </instancedMesh>
      <instancedMesh ref={posEndRef} args={[endGeo, null, COUNT]}>
        <meshStandardMaterial
          color={0xff3322}
          emissive={0xff1100}
          emissiveIntensity={0.4}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      <instancedMesh ref={negEndRef} args={[endGeo, null, COUNT]}>
        <meshStandardMaterial
          color={0x2233ff}
          emissive={0x1122ff}
          emissiveIntensity={0.4}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}
