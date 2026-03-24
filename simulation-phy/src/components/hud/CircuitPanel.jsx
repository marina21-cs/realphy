import useSimStore from '../../store/useSimStore';
import { calcTau } from '../../physics/engine';
import { fmtTime } from '../../utils/formatters';

export default function CircuitPanel() {
  const P = useSimStore((s) => s.P);
  const setP = useSimStore((s) => s.setP);
  const chargeLevel = useSimStore((s) => s.chargeLevel);
  const setChargeLevel = useSimStore((s) => s.setChargeLevel);
  const isCharging = useSimStore((s) => s.isCharging);
  const isDischarging = useSimStore((s) => s.isDischarging);
  const setIsCharging = useSimStore((s) => s.setIsCharging);
  const setIsDischarging = useSimStore((s) => s.setIsDischarging);
  const resetChart = useSimStore((s) => s.resetChart);
  const setSimTime = useSimStore((s) => s.setSimTime);

  return (
    <div
      className="panel"
      style={{ position: 'absolute', left: '50%', bottom: 120, transform: 'translateX(-50%)', width: 620, pointerEvents: 'all' }}
    >
      <div className="plabel">◈ Act III · Memory and Release</div>

      <div className="srow">
        <div className="slab">Resistance R</div>
        <input type="range" min={1} max={100000} step={10} value={P.R} onChange={(e) => setP('R', Number(e.target.value))} />
        <div className="sval">{P.R.toFixed(0)} ohm</div>
      </div>

      <div className="srow" style={{ gridTemplateColumns: '130px 1fr 180px', marginTop: 8, marginBottom: 0 }}>
        <div className="slab">tau = {fmtTime(calcTau(P))}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            className="btn-charge"
            onClick={() => {
              setIsCharging(true);
              setIsDischarging(false);
            }}
          >
            CHARGE
          </button>
          <button
            className="btn-dis"
            onClick={() => {
              if (chargeLevel <= 0.001) {
                setChargeLevel(1);
              }
              setIsCharging(false);
              setIsDischarging(true);
            }}
          >
            DISCHARGE
          </button>
          <button
            className="btn-act"
            onClick={() => {
              setIsCharging(false);
              setIsDischarging(false);
              setChargeLevel(0);
              setSimTime(0);
              resetChart();
            }}
          >
            RESET
          </button>
        </div>
        <div className="sval">Level {(chargeLevel * 100).toFixed(0)}% {isCharging ? '· charging' : isDischarging ? '· releasing' : ''}</div>
      </div>
    </div>
  );
}
