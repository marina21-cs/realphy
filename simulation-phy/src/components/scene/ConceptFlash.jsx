import { AnimatePresence, motion } from 'framer-motion';
import useSimStore from '../../store/useSimStore';

export default function ConceptFlash() {
  const conceptText = useSimStore((s) => s.conceptText);
  const conceptVisible = useSimStore((s) => s.conceptVisible);
  const kappaFlashVal = useSimStore((s) => s.kappaFlashVal);

  return (
    <>
      <AnimatePresence>
        {conceptVisible && (
          <motion.div
            key="concept"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14px, 2vw, 22px)',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'var(--accent)',
              textShadow: '0 0 30px var(--accent)',
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            {conceptText}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {kappaFlashVal && (
          <motion.div
            key="kappa"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { type: 'spring', damping: 8 } }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 900,
              color: 'var(--gold)',
              textShadow: '0 0 40px var(--gold)',
              pointerEvents: 'none',
            }}
          >
            {kappaFlashVal}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
