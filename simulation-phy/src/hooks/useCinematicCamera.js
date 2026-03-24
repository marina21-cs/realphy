import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CAM_POSITIONS = {
  0: { x: 0, y: 1.5, z: 6.5 },
  1: { x: 0, y: 1.0, z: 4.5 },
  2: { x: 1.2, y: 0.4, z: 3.2 },
  3: { x: 0, y: 0.6, z: 4.2 },
};

export default function useCinematicCamera(currentAct, isUserOrbiting) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 1.5, 6.5), []);
  const lookTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const settledRef = useRef(false);
  const userOverrideRef = useRef(false);

  useEffect(() => {
    settledRef.current = false;
    userOverrideRef.current = false;
  }, [currentAct]);

  useEffect(() => {
    if (isUserOrbiting) {
      userOverrideRef.current = true;
    }
  }, [isUserOrbiting]);

  useFrame((_, delta) => {
    if (isUserOrbiting || userOverrideRef.current) {
      return;
    }

    const p = CAM_POSITIONS[currentAct] ?? CAM_POSITIONS[0];
    target.set(p.x, p.y, p.z);
    const easeRate = settledRef.current ? 1.6 : 2.4;
    const ease = 1 - Math.exp(-delta * easeRate);
    camera.position.lerp(target, ease);
    camera.lookAt(lookTarget);

    if (camera.position.distanceTo(target) < 0.03) {
      settledRef.current = true;
    }
  });
}
