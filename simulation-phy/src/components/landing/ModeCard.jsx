import { motion } from 'framer-motion';

export default function ModeCard({ icon, label, aud, desc, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -5, borderColor: 'rgba(0,229,255,0.5)' }}
      onClick={onSelect}
      style={{
        background: 'rgba(0,229,255,0.04)',
        border: '1px solid rgba(0,229,255,0.14)',
        borderRadius: 10,
        padding: '22px 14px',
        cursor: 'pointer',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: 'var(--accent)',
          marginBottom: 7,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--dim)', marginBottom: 6, fontWeight: 600 }}>{aud}</div>
      <div style={{ fontSize: 11, color: 'rgba(200,232,248,0.38)', lineHeight: 1.55 }}>{desc}</div>
    </motion.div>
  );
}
