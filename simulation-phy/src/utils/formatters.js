export const fmtCap = (v) => {
  if (!Number.isFinite(v)) return '--';
  const abs = Math.abs(v);
  if (abs >= 1) return `${v.toFixed(3)} F`;
  if (abs >= 1e-3) return `${(v * 1e3).toFixed(3)} mF`;
  if (abs >= 1e-6) return `${(v * 1e6).toFixed(3)} uF`;
  if (abs >= 1e-9) return `${(v * 1e9).toFixed(3)} nF`;
  if (abs >= 1e-12) return `${(v * 1e12).toFixed(3)} pF`;
  return `${(v * 1e15).toFixed(3)} fF`;
};

export const fmtSci = (v, unit = '') => {
  if (!Number.isFinite(v)) return '--';
  const abs = Math.abs(v);
  if (abs === 0) return `0 ${unit}`.trim();
  if (abs >= 0.01 && abs < 1000) return `${v.toFixed(3)} ${unit}`.trim();
  return `${v.toExponential(2)} ${unit}`.trim();
};

export const fmtTime = (s) => {
  if (!Number.isFinite(s)) return '--';
  if (s < 1) return `${Math.round(s * 1000)} ms`;
  if (s < 60) return `${s.toFixed(2)} s`;
  return `${(s / 60).toFixed(2)} min`;
};
