# Phase 3 Stitch Prompt

Use with: `00_GLOBAL_DESIGN_LOCK.md`

```txt
Design the connected POLARIZED screen at 1440px desktop for Act III: charge and discharge through a resistor, with synchronized 3D and chart feedback.

Apply the provided POLARIZED design language lock exactly.

Overall aesthetic:
A controlled energy release scene. The UI should feel surgical and scientific, with dramatic but minimal visual emphasis during discharge events.

Page structure top to bottom:
1) Top nav bar (same baseline)
- Student and Advanced chips visible, Advanced active.
- Add quick actions: Charge, Discharge, Pause, Rewind.

2) Main simulation and circuit zone (760px tall)
- Center-left large viewport: capacitor, wire path, resistor element.
- Right control dock: Voltage, Resistance (R), Capacitance lock, duration set to 5tau.
- Floating badge on resistor: instantaneous power P = I^2R.

3) Bottom dual analytics strip (160px)
- Left: live equation tiles for V(t)=V0*e^(-t/RC), tau=RC, I(t).
- Right: real-time decay chart card with solid measured curve and dashed theoretical curve.

Interaction and states:
- On Discharge: volumetric energy fog drains from capacitor gap into circuit path.
- Wire particles move with speed tied to current magnitude.
- Resistor glow intensity tied to instantaneous power.
- Chart traces animate left to right in real time.

Mobile and performance notes:
- Mobile: switch from full volumetric fog to simplified glow ribbon.
- Add small performance switch: "Visual Fidelity: Full / Balanced / Lite".

Key design notes:
- Keep graph clean and high contrast.
- Keep motion physically meaningful.
- No game-like effects, only data-driven visuals.
```