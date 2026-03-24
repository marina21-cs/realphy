import { useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import useSimStore from '../../store/useSimStore';
import { ACTS } from '../../content/acts';
import useLogQueue from '../../hooks/useLogQueue';
import usePhysicsTick from '../../hooks/usePhysicsTick';
import CinematicCamera from './CinematicCamera';
import CircuitMesh from './CircuitMesh';
import DipoleMesh from './DipoleMesh';
import EnergyFog from './EnergyFog';
import FieldLines from './FieldLines';
import PlateMesh from './PlateMesh';
import SlabMesh from './SlabMesh';
import StarField from './StarField';

export default function SceneContent() {
  const currentAct = useSimStore((s) => s.currentAct);
  const setLog = useSimStore((s) => s.setLog);
  const flashConcept = useSimStore((s) => s.flashConcept);
  const setIsUserOrbiting = useSimStore((s) => s.setIsUserOrbiting);
  const { queue, clear } = useLogQueue();

  usePhysicsTick();

  useEffect(() => {
    clear();

    if (currentAct === 1) {
      setLog(ACTS[1][0]);
      queue([
        { delay: 3000, text: ACTS[1][1] },
        { delay: 7000, text: ACTS[1][2] },
        { delay: 12000, text: ACTS[1][3] },
      ]);
    }

    if (currentAct === 2) {
      flashConcept('MOLECULAR POLARIZATION');
      setLog(ACTS[2][0]);
      queue([
        { delay: 2500, text: ACTS[2][1] },
        { delay: 4900, text: ACTS[2][2] },
        { delay: 6700, text: ACTS[2][3] },
      ]);
    }

    if (currentAct === 3) {
      flashConcept('ENERGY STORAGE AND RELEASE');
      setLog(ACTS[3][0]);
      queue([
        { delay: 2500, text: ACTS[3][1] },
        { delay: 5200, text: ACTS[3][2] },
        { delay: 8600, text: ACTS[3][3] },
      ]);
    }

    return () => clear();
  }, [clear, currentAct, flashConcept, queue, setLog]);

  return (
    <>
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.72}
        zoomSpeed={0.8}
        minDistance={0.85}
        maxDistance={10}
        enablePan={false}
        onStart={() => setIsUserOrbiting(true)}
        onEnd={() => setIsUserOrbiting(false)}
      />

      <fogExp2 attach="fog" args={[0x020408, 0.12]} />

      <ambientLight color={0x0d1f33} intensity={0.8} />
      <directionalLight
        position={[3, 5, 3]}
        intensity={0.62}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      <StarField />
      <CinematicCamera />

      {currentAct >= 1 && <PlateMesh />}
      {currentAct >= 1 && <FieldLines />}

      {currentAct >= 2 && <SlabMesh />}
      {currentAct >= 2 && <DipoleMesh />}

      {currentAct >= 3 && <EnergyFog />}
      {currentAct >= 3 && <CircuitMesh />}
    </>
  );
}
