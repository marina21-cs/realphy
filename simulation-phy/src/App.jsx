import { AnimatePresence } from 'framer-motion';
import useSimStore from './store/useSimStore';
import Landing from './components/landing/Landing';
import HUD from './components/hud/HUD';
import SimScene from './components/scene/SimScene';

export default function App() {
  const currentAct = useSimStore((s) => s.currentAct);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <SimScene />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(2,4,8,0.7) 100%)',
        }}
      />

      <AnimatePresence>{currentAct > 0 && <HUD key="hud" />}</AnimatePresence>
      <AnimatePresence>{currentAct === 0 && <Landing key="landing" />}</AnimatePresence>
    </div>
  );
}
