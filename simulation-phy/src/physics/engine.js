import { EPS0, MIN_GAP } from '../utils/constants';
import { rk4Step } from './rk4';

// C = k * e0 * A / d
export const calcC = (P) => (P.kappa * EPS0 * P.A) / Math.max(P.d, MIN_GAP);

// Q = C * V
export const calcQ = (P) => calcC(P) * P.V;

// U = 1/2 * C * V^2
export const calcU = (P) => 0.5 * calcC(P) * P.V ** 2;

// E = V / d
export const calcE = (P) => P.V / Math.max(P.d, MIN_GAP);

// tau = R * C
export const calcTau = (P) => Math.max(1e-9, P.R * calcC(P));

// dV/dt = -V / (R * C)
export const dischargeStep = (voltage, P, dt = 0.04) => {
  const tau = calcTau(P);
  const dyFn = (v) => -v / tau;
  return Math.max(0, rk4Step(voltage, dyFn, dt));
};

export const theoreticalDecay = (timeS, v0, P) => {
  const tau = calcTau(P);
  return v0 * Math.exp(-timeS / tau);
};
