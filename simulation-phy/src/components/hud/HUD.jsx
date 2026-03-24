import { motion } from 'framer-motion';
import useSimStore from '../../store/useSimStore';
import ConceptFlash from '../scene/ConceptFlash';
import ActNav from './ActNav';
import AdvancedMath from './AdvancedMath';
import ControlPanel from './ControlPanel';
import CircuitPanel from './CircuitPanel';
import DecayChart from './DecayChart';
import FormulaPanel from './FormulaPanel';
import LogPanel from './LogPanel';
import MaterialSelector from './MaterialSelector';
import TopBar from './TopBar';

const ACT_LABELS = [
  '',
  'ACT I - THE VOID BETWEEN',
  'ACT II - THE CRYSTAL AWAKENS',
  'ACT III - MEMORY AND RELEASE',
];

export default function HUD() {
  const currentAct = useSimStore((s) => s.currentAct);
  const simMode = useSimStore((s) => s.simMode);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.9 } }}
      style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}
    >
      <TopBar />

      <div
        style={{
          position: 'absolute',
          top: 64,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: '0.3em',
          color: 'rgba(0,229,255,0.45)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        {ACT_LABELS[currentAct]}
      </div>

      <LogPanel />

      {simMode !== 'story' && <FormulaPanel />}

      {currentAct === 1 && <ControlPanel />}
      {currentAct === 2 && <MaterialSelector />}
      {currentAct === 3 && <CircuitPanel />}

      {(simMode === 'advanced' || simMode === 'educator') && currentAct >= 2 && <AdvancedMath />}

      {simMode !== 'story' && currentAct === 3 && <DecayChart />}

      <ConceptFlash />

      <ActNav />

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11.5,
          color: 'var(--dim)',
          letterSpacing: '0.06em',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '0 12px',
        }}
      >
        Drag to orbit · Scroll to zoom · Click materials to swap dielectrics
      </div>
    </motion.div>
  );
}
