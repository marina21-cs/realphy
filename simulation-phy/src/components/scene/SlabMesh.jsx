import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useSimStore from '../../store/useSimStore';
import { MATS } from '../../physics/materials';

export default function SlabMesh() {
  const meshRef = useRef();
  const boostRef = useRef(0);
  const prevStimulusRef = useRef(0);
  const prevMatRef = useRef('vacuum');

  const P = useSimStore((s) => s.P);
  const currentMat = useSimStore((s) => s.currentMat);
  const isVacuum = currentMat === 'vacuum';

  const halfGap = (P.d * 100) / 2;
  const plateSize = Math.sqrt(P.A) * 5 * 0.9;
  const mat = MATS[currentMat] ?? MATS.vacuum;

  useEffect(() => {
    if (isVacuum) {
      return;
    }

    const stimulus = (Math.max(P.V, 0) * Math.max(P.kappa, 1)) / Math.max(P.d, 1e-4);
    const matChanged = prevMatRef.current !== currentMat;

    if (matChanged || stimulus > prevStimulusRef.current * 1.01) {
      boostRef.current = Math.min(boostRef.current + 0.95, 1.35);
    }

    prevStimulusRef.current = stimulus;
    prevMatRef.current = currentMat;
  }, [P.A, P.V, P.d, P.kappa, currentMat, isVacuum]);

  useFrame(({ clock }, delta) => {
    if (isVacuum || !meshRef.current) {
      return;
    }

    const { chargeLevel } = useSimStore.getState();
    boostRef.current = Math.max(0, boostRef.current - delta * 1.4);

    const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 8.4);
    const surge = boostRef.current * pulse;
    const opacity = 0.25 + chargeLevel * 0.22 + Math.sin(clock.elapsedTime * 1.8) * 0.03 + surge * 0.16;

    meshRef.current.material.opacity = Math.max(0.18, Math.min(0.8, opacity));
    meshRef.current.material.emissiveIntensity = 0.1 + chargeLevel * 0.24 + surge * 0.38;

    const s = 1 + surge * 0.012;
    meshRef.current.scale.set(s, s, s);
  });

  if (isVacuum) {
    return null;
  }

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[plateSize, halfGap * 1.9, plateSize]} />
      <meshStandardMaterial
        color={mat.slabColor}
        emissive={mat.slabEmissive ?? mat.slabColor}
        emissiveIntensity={0.1}
        transparent
        opacity={0.31}
        roughness={0.32}
        metalness={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}
