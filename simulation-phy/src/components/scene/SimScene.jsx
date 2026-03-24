import { Canvas } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, FXAA } from '@react-three/postprocessing';
import * as THREE from 'three';
import SceneContent from './SceneContent';

export default function SimScene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 1.5, 6.5], fov: 52, near: 0.01, far: 80 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.65, debounce: 200 }}
      gl={{ antialias: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.35 }}
      shadows
    >
      <SceneContent />
      <EffectComposer multisampling={0}>
        <DepthOfField focusDistance={0.02} focalLength={0.018} bokehScale={0.75} height={280} />
        <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.9} intensity={1.1} />
        <FXAA />
      </EffectComposer>
    </Canvas>
  );
}
