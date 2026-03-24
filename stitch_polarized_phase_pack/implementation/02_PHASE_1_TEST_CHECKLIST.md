# Phase 1 Test Checklist (Act I Core Physics)

Run these checks after implementing Phase 1 in:
`/home/keni/Documents/upphysics/simulation-phy`

## 1) Command Gate

- [x] `npm run lint` passes.
- [x] `npm run build` passes.

## 2) Scope Guard Checks

- [x] No login button appears.
- [x] No signup flow appears.
- [x] No profile/account button appears in the header.

## 3) Formula Correctness Spot Check

Set parameters:
- `A = 50 cm2`
- `d = 5 mm`
- `V = 100 V`

Expected vacuum values (approximate):
- [x] `C = eps0 * A / d` is about `8.85 pF`
- [x] `Q = C * V` is about `885 pC`
- [x] `U = 0.5 * C * V^2` is about `44.27 nJ`
- [x] `E = V / d` is about `20 kV/m`

Accept display tolerance: `+/-1%` after formatting.

## 4) Interaction Reliability

- [x] Moving each slider updates readouts immediately.
- [x] Keyboard arrows can adjust focused sliders.
- [x] If viewport drag is enabled, drag updates `d` and slider reflects it.
- [x] Trend indicators react to value direction changes.

## 5) Control Limits and Stability

- [x] Min/max `d` values do not produce NaN or Infinity.
- [x] `V = 0` drives `Q`, `U`, and `E` to zero (or near-zero formatted output).
- [x] Min/max `A` values do not break layout.

## 6) Regression Checks

- [x] Story mode renders dynamic values (not hardcoded text).
- [x] Student, Advanced, Educator tabs still switch correctly.
- [ ] No console errors appear during mode switching.

## Verification Notes (2026-03-22)

- Command gate run from `simulation-phy`: `npm run lint` and `npm run build` both passed.
- Build completed successfully with one existing CSS optimization warning from generated selector parsing.
- Formula spot-check computed values:
- `C = 8.8541878128 pF`
- `Q = 885.41878128 pC`
- `U = 44.270939064 nJ`
- `E = 20 kV/m`
- Trend direction was implemented as `RISING` / `FALLING` / `STEADY` in the live readout strip.
- Remaining unchecked item requires an interactive browser run while switching modes and observing the console.

## 7) Optional Quick Re-run Script

```bash
cd /home/keni/Documents/upphysics/simulation-phy
npm run lint && npm run build
```
