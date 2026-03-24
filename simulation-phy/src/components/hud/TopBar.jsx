import useSimStore from '../../store/useSimStore';

const MODE_LABEL = {
  story: 'Story',
  student: 'Student',
  advanced: 'Advanced',
  educator: 'Educator',
};

export default function TopBar() {
  const currentAct = useSimStore((s) => s.currentAct);
  const simMode = useSimStore((s) => s.simMode);
  const setAct = useSimStore((s) => s.setAct);

  return (
    <div
      style={{
        position: 'absolute',
        top: 14,
        left: 18,
        right: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'all',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', fontSize: 12, color: 'var(--accent)' }}>
          POLARIZED // CAPACITANCE
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1, 2, 3].map((a) => (
            <button
              key={a}
              onClick={() => setAct(a)}
              style={{
                width: 9,
                height: 9,
                borderRadius: 20,
                border: 'none',
                background: a <= currentAct ? 'var(--accent)' : 'rgba(0,229,255,0.2)',
                boxShadow: a <= currentAct ? '0 0 8px rgba(0,229,255,0.8)' : 'none',
                cursor: 'pointer',
              }}
              aria-label={`Go to act ${a}`}
            />
          ))}
        </div>
      </div>

      <div
        id="mbadge"
        onClick={() => window.location.reload()}
        title="Reload simulation"
        style={{
          border: '1px solid var(--border2)',
          borderRadius: 999,
          padding: '6px 12px',
          fontFamily: 'var(--font-display)',
          fontSize: 9,
          letterSpacing: '0.18em',
          color: 'var(--text)',
          background: 'rgba(0,229,255,0.08)',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        {MODE_LABEL[simMode]}
      </div>
    </div>
  );
}
