import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField() {
  const ref = useRef();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 4000;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i += 1) {
      pos[i] = (Math.random() - 0.5) * 60;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00004;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={0xffffff} size={0.012} transparent opacity={0.55} />
    </points>
  );
}
