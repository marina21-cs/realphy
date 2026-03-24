import { AnimatePresence, motion } from 'framer-motion';
import useSimStore from '../../store/useSimStore';

export default function LogPanel() {
  const logText = useSimStore((s) => s.logText);

  return (
    <div className="panel" style={{ position: 'absolute', left: 22, top: 64, width: 290 }}>
      <div className="plabel">◈ Cartographer&apos;s Log</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={logText}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
          style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', fontWeight: 300, minHeight: 80 }}
          dangerouslySetInnerHTML={{ __html: logText }}
        />
      </AnimatePresence>
    </div>
  );
}
