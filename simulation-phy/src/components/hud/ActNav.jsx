import useSimStore from '../../store/useSimStore';

const NEXT_LABELS = { 1: 'INSERT DIELECTRIC ->', 2: 'MEMORY AND RELEASE ->', 3: 'FREE EXPLORE ->' };
const PREV_LABELS = { 2: '<- THE VOID', 3: '<- THE CRYSTAL' };

export default function ActNav() {
  const currentAct = useSimStore((s) => s.currentAct);
  const setAct = useSimStore((s) => s.setAct);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        pointerEvents: 'all',
      }}
    >
      {currentAct > 1 && (
        <button className="btn-act" onClick={() => setAct(currentAct - 1)}>
          {PREV_LABELS[currentAct]}
        </button>
      )}
      {currentAct <= 3 && (
        <button className="btn-act pri" onClick={() => setAct(Math.min(currentAct + 1, 3))}>
          {NEXT_LABELS[currentAct] ?? 'EXPLORE'}
        </button>
      )}
    </div>
  );
}
