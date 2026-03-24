import useSimStore from '../../store/useSimStore';
import { MATS } from '../../physics/materials';

export default function MaterialSelector() {
  const currentMat = useSimStore((s) => s.currentMat);
  const setMat = useSimStore((s) => s.setMat);
  const setP = useSimStore((s) => s.setP);
  const setLog = useSimStore((s) => s.setLog);
  const flashKappa = useSimStore((s) => s.flashKappa);

  const choose = (key) => {
    const mat = MATS[key];
    setMat(key);
    setP('kappa', mat.kappa);
    setLog(mat.log);
    flashKappa(mat.kappa >= 100 ? Math.round(mat.kappa) : mat.kappa.toFixed(1), 'k');
  };

  return (
    <div
      className="panel"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 120,
        transform: 'translateX(-50%)',
        width: 560,
        pointerEvents: 'all',
      }}
    >
      <div className="plabel">◈ Act II Materials · Dielectric Personalities</div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {Object.entries(MATS).map(([key, m]) => (
          <div key={key} className={`matcard ${currentMat === key ? 'sel' : ''}`} onClick={() => choose(key)}>
            <div className="mk">{m.paramDisplay}</div>
            <div className="mn">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
