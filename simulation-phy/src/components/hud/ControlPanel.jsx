import useSimStore from '../../store/useSimStore';
import { fmtSci } from '../../utils/formatters';

export default function ControlPanel() {
  const P = useSimStore((s) => s.P);
  const setP = useSimStore((s) => s.setP);

  return (
    <div className="panel" style={{ position: 'absolute', left: '50%', bottom: 120, transform: 'translateX(-50%)', width: 500, pointerEvents: 'all' }}>
      <div className="plabel">◈ Act I Controls · Field Geometry</div>

      <div className="srow">
        <div className="slab">Area A</div>
        <input type="range" min={0.01} max={0.1} step={0.001} value={P.A} onChange={(e) => setP('A', Number(e.target.value))} />
        <div className="sval">{P.A.toFixed(3)} m^2</div>
      </div>

      <div className="srow">
        <div className="slab">Gap d</div>
        <input type="range" min={0.001} max={0.02} step={0.0001} value={P.d} onChange={(e) => setP('d', Number(e.target.value))} />
        <div className="sval">{(P.d * 1000).toFixed(1)} mm</div>
      </div>

      <div className="srow" style={{ marginBottom: 0 }}>
        <div className="slab">Voltage V</div>
        <input type="range" min={0} max={500} step={1} value={P.V} onChange={(e) => setP('V', Number(e.target.value))} />
        <div className="sval">{fmtSci(P.V, 'V')}</div>
      </div>
    </div>
  );
}
