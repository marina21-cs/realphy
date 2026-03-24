import useSimStore from '../../store/useSimStore';
import { calcC, calcQ, calcTau, calcU } from '../../physics/engine';
import { fmtCap, fmtSci, fmtTime } from '../../utils/formatters';

export default function AdvancedMath() {
  const P = useSimStore((s) => s.P);

  return (
    <div className="panel" style={{ position: 'absolute', right: 22, bottom: 118, width: 340 }}>
      <div className="plabel">◈ Advanced Layer</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--text)' }}>
        <div>1) C = k e0 A / d</div>
        <div className="fval">{fmtCap(calcC(P))}</div>
        <div style={{ marginTop: 6 }}>2) Q = C V = {fmtSci(calcQ(P), 'C')}</div>
        <div style={{ marginTop: 6 }}>3) U = 1/2 C V^2 = {fmtSci(calcU(P), 'J')}</div>
        <div style={{ marginTop: 6 }}>4) V(t) = V0 * exp(-t/(R C))</div>
        <div style={{ marginTop: 6 }}>tau = R C = {fmtTime(calcTau(P))}</div>
      </div>
    </div>
  );
}
