import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useSimStore from '../../store/useSimStore';

export default function EnergyFog() {
  const ref = useRef();
  const P = useSimStore((s) => s.P);

  const halfGap = (P.d * 100) * 0.95;
  const plateSize = Math.sqrt(P.A) * 5 * 0.88;
  const N = 1200;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);

    for (let i = 0; i < N; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * plateSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * halfGap * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * plateSize;
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [halfGap, plateSize]);

  useFrame(() => {
    const { chargeLevel } = useSimStore.getState();

    if (!ref.current) {
      return;
    }

    ref.current.material.opacity = chargeLevel * 0.72;
    ref.current.material.size = 0.012 + chargeLevel * 0.025;

    if (chargeLevel > 0.01) {
      const positions = ref.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 9) {
        positions[i + 1] += (Math.random() - 0.5) * 0.003;
        positions[i] += (Math.random() - 0.5) * 0.0015;

        if (Math.abs(positions[i + 1]) > halfGap) {
          positions[i + 1] *= -0.9;
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={0xffaa22}
        size={0.012}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
