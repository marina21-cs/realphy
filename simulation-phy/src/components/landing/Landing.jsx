import { motion } from 'framer-motion';
import useSimStore from '../../store/useSimStore';
import ModeCard from './ModeCard';

const MODES = [
  {
    key: 'story',
    icon: '🌟',
    label: 'STORY',
    aud: 'Ages 12+ · No background',
    desc: 'Guided journey through field and memory. No equations, pure discovery.',
  },
  {
    key: 'student',
    icon: '📐',
    label: 'STUDENT',
    aud: 'High School · Undergrad',
    desc: 'Live equations, dielectric comparison, and checkpoint-ready visuals.',
  },
  {
    key: 'advanced',
    icon: '⚗️',
    label: 'ADVANCED',
    aud: 'Engineers · Researchers',
    desc: 'Full sandbox with molecular overlays and RC decay export.',
  },
  {
    key: 'educator',
    icon: '🎓',
    label: 'EDUCATOR',
    aud: 'Instructors · Lecturers',
    desc: 'Lecture-safe flow with state sharing and classroom demonstration pacing.',
  },
];

export default function Landing() {
  const setSimMode = useSimStore((s) => s.setSimMode);
  const setAct = useSimStore((s) => s.setAct);

  const selectMode = (key) => {
    setSimMode(key);
    setAct(1);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 25%, #031020 0%, var(--void) 65%)',
      }}
    >
      <div className="l-stars" />

      {[20, 40, 60, 80].map((left, i) => (
        <div key={i} className="l-field-line" style={{ left: `${left}%`, animationDelay: `${-i * 2}s` }} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
        style={{ textAlign: 'center', marginBottom: 52, position: 'relative', zIndex: 1, padding: '0 20px' }}
      >
        <h1 className="l-word">POLARIZED</h1>
        <p className="l-sub">Capacitance and Dielectrics · Interactive 3D Simulation</p>
        <p className="l-tag">Where invisible fields become memory.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.4 } }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 14,
          maxWidth: 920,
          width: '92%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {MODES.map((m) => (
          <ModeCard key={m.key} {...m} onSelect={() => selectMode(m.key)} />
        ))}
      </motion.div>
    </motion.div>
  );
}
