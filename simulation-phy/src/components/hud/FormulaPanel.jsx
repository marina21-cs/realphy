import useSimStore from '../../store/useSimStore';
import { calcC, calcE, calcQ, calcTau, calcU } from '../../physics/engine';
import { fmtCap, fmtSci, fmtTime } from '../../utils/formatters';

export default function FormulaPanel() {
  const P = useSimStore((s) => s.P);
  const simMode = useSimStore((s) => s.simMode);
  const currentAct = useSimStore((s) => s.currentAct);

  const vals = {
    kappa: P.kappa >= 100 ? Math.round(P.kappa).toString() : P.kappa.toFixed(1),
    C: fmtCap(calcC(P)),
    Q: fmtSci(calcQ(P) * 1e9, 'nC'),
    U: fmtSci(calcU(P) * 1e6, 'uJ'),
    E: fmtSci(calcE(P), 'V/m'),
    tau: fmtTime(calcTau(P)),
  };

  const Row = ({ label, id }) => (
    <div className="frow">
      <span className="flabel">{label}</span>
      <span className="fval">{vals[id] ?? '—'}</span>
    </div>
  );

  return (
    <div className="panel" style={{ position: 'absolute', right: 22, top: 64, width: 290 }}>
      <div className="plabel">◈ Live Physics</div>
      <Row label="kappa (k)" id="kappa" />
      <Row label="C = k e0 A / d" id="C" />
      <Row label="Q = C V" id="Q" />
      <Row label="U = 1/2 C V^2" id="U" />
      <Row label="E = V / d" id="E" />
      {(simMode === 'advanced' || simMode === 'educator') && currentAct === 3 && <Row label="tau = R C" id="tau" />}
    </div>
  );
}
