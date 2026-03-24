import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSimStore from '../../store/useSimStore';

export default function CircuitMesh() {
  const resistorRef = useRef();
  const sinkRef = useRef();
  const particlesRef = useRef();
  const resistancePulseRef = useRef(0);
  const prevRRef = useRef(10);

  const N = 180;
  const particleGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(N * 3);

    for (let i = 0; i < N; i += 1) {
      const a = (i / N) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * 1.25;
      arr[i * 3 + 1] = -1.55;
      arr[i * 3 + 2] = Math.sin(a) * 0.45;
    }

    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ clock }, delta) => {
    const { chargeLevel, P } = useSimStore.getState();
    const v = chargeLevel * P.V;
    const power = (v * v) / Math.max(P.R, 1e-3);

    if (P.R > prevRRef.current * 1.015) {
      resistancePulseRef.current = Math.min(resistancePulseRef.current + 0.8, 1.3);
    }
    prevRRef.current = P.R;

    resistancePulseRef.current = Math.max(0, resistancePulseRef.current - delta * 1.25);
    const resistancePulse = resistancePulseRef.current * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 8.4));

    if (resistorRef.current) {
      resistorRef.current.material.emissiveIntensity = 0.06 + Math.min(2.5, power / 350) + resistancePulse * 0.28;
    }

    if (sinkRef.current) {
      sinkRef.current.material.emissiveIntensity = 0.08 + Math.min(2.8, power / 220) + resistancePulse * 0.22;
    }

    if (particlesRef.current) {
      const arr = particlesRef.current.geometry.attributes.position.array;
      const t = clock.elapsedTime;

      for (let i = 0; i < N; i += 1) {
        const base = (i / N) * Math.PI * 2;
        const a = base + t * (0.35 + chargeLevel * 2.2);
        arr[i * 3] = Math.cos(a) * 1.25;
        arr[i * 3 + 1] = -1.55 + Math.sin(a * 2.5 + i * 0.21) * 0.045;
        arr[i * 3 + 2] = Math.sin(a) * 0.45;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.material.opacity = 0.08 + chargeLevel * 0.8;
    }
  });

  return (
    <group>
      <mesh position={[0, -1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.018, 12, 180]} />
        <meshStandardMaterial color={0x224466} emissive={0x113355} emissiveIntensity={0.16} metalness={0.6} roughness={0.24} />
      </mesh>

      <mesh ref={resistorRef} position={[1.25, -1.55, 0]}>
        <boxGeometry args={[0.24, 0.12, 0.12]} />
        <meshStandardMaterial color={0xff8844} emissive={0xff5722} emissiveIntensity={0.05} />
      </mesh>

      <mesh ref={sinkRef} position={[-1.25, -1.55, 0]}>
        <sphereGeometry args={[0.11, 18, 12]} />
        <meshStandardMaterial color={0xffb300} emissive={0xff8800} emissiveIntensity={0.08} />
      </mesh>

      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial color={0xffcc66} size={0.022} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}
