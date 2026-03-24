export const rk4Step = (y, dyFn, dt) => {
  const k1 = dyFn(y);
  const k2 = dyFn(y + (k1 * dt) / 2);
  const k3 = dyFn(y + (k2 * dt) / 2);
  const k4 = dyFn(y + k3 * dt);
  return y + ((k1 + 2 * k2 + 2 * k3 + k4) * dt) / 6;
};
