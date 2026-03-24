# Phase 1: Core Physics Act I (Vacuum Parallel Plates)

## Context

This phase turns Act I into a truly interactive physics simulation with live equations.
The Story experience must respond immediately to user input for area, separation, and voltage.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Stage 2-4: choose equation architecture, then implement with minimal regression risk.
- Stage 5: validate formulas and interactions.
- Stage 6: run lint/build plus manual behavior checks.

BuildCraft alignment (`implementation-guide-prompt.md`):
- File-level tasks, dependency order, verification, rollback, and troubleshooting are fully defined below.

## Skills To Load

- `react-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-patterns/SKILL.md`
- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`
- `3d-web-experience` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/3d-web-experience/SKILL.md`

## Prerequisites

- Phase 0 completed and verified.
- No scope-lock violations.

## Phase Init

Run from `/home/keni/Documents/upphysics/simulation-phy`:

```bash
npm run lint
npm run build
```

## Directory Structure

```txt
simulation-phy/
├── src/
│   ├── App.tsx                                      <- MODIFIED
│   └── features/
│       ├── physics/
│       │   └── capacitor-equations.ts              <- CREATE or HARDEN
│       └── simulation/
│           ├── types/
│           │   └── simulation-params.ts            <- CREATE or HARDEN
│           ├── hooks/
│           │   └── use-simulation-params.ts        <- CREATE or HARDEN
│           ├── components/
│           │   ├── act1-cartographer-log.tsx       <- CREATE or HARDEN
│           │   ├── act1-controls.tsx               <- CREATE or HARDEN
│           │   ├── act1-viewport.tsx               <- CREATE or HARDEN
│           │   └── live-readout-strip.tsx          <- CREATE or HARDEN
│           └── utils/
│               └── units-format.ts                 <- CREATE or HARDEN
```

## File Init Checklist

Ensure each file has explicit exports before wiring logic:
- `src/features/physics/capacitor-equations.ts`: pure equation helpers and constants.
- `src/features/simulation/types/simulation-params.ts`: typed parameter model and ranges.
- `src/features/simulation/hooks/use-simulation-params.ts`: central Act I state hook.
- `src/features/simulation/components/act1-controls.tsx`: sliders and labels.
- `src/features/simulation/components/act1-viewport.tsx`: visual response to parameters.
- `src/features/simulation/components/live-readout-strip.tsx`: readout cards with trend data.
- `src/features/simulation/utils/units-format.ts`: conversion and formatting helpers.

## Instructions

### Step 1.1: Implement Vacuum Equations
**File:** `src/features/physics/capacitor-equations.ts` - CREATE/MODIFY

- Export pure functions:
  - `capacitanceVacuum(areaM2, separationM)`
  - `chargeStored(capacitanceF, voltageV)`
  - `energyStored(capacitanceF, voltageV)`
  - `electricField(voltageV, separationM)`
- Include constant `EPSILON_0`.
- Guard invalid inputs (`separationM <= 0`, non-finite values).

### Step 1.2: Create Typed Parameter State
**Files:** `src/features/simulation/types/simulation-params.ts`, `src/features/simulation/hooks/use-simulation-params.ts` - CREATE/MODIFY

- Define default Act I values and safe min/max ranges.
- Expose parameter setter with clamp behavior.
- Keep one state source for controls, viewport, and readouts.

### Step 1.3: Wire Controls, Viewport, and Readouts
**Files:** `src/features/simulation/components/act1-controls.tsx`, `src/features/simulation/components/act1-viewport.tsx`, `src/features/simulation/components/live-readout-strip.tsx`, `src/App.tsx` - CREATE/MODIFY

- Connect sliders to central params state.
- Convert units before running equations (`cm2 -> m2`, `mm -> m`).
- Update readouts (`C`, `Q`, `U`, `E`) on every control change.
- Keep graceful fallback display (`--`) for invalid states.

### Step 1.4: Add Interaction Depth
**Files:** `src/features/simulation/components/act1-viewport.tsx`, `src/features/simulation/components/act1-controls.tsx` - MODIFY

- Add at least one viewport interaction beyond sliders (for example drag handle for plate gap).
- Sync viewport interaction with slider values in both directions.
- Preserve keyboard access for all slider controls.

### Step 1.5: Keep Scope Guarded
**File:** `src/App.tsx` - MODIFY

- Keep Story mode focused on simulation controls only.
- Ensure no login/profile/account UI appears.

## Interactive Requirements

- Slider changes must update formulas in under one frame at normal desktop speed.
- Viewport interaction must modify at least one parameter live.
- Readout trend indicators should reflect parameter movement direction.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `A` changes affect `C` proportionally.
- [ ] Increasing `d` lowers both `C` and `E`.
- [ ] Increasing `V` raises `Q`, `U`, and `E`.
- [ ] No NaN/Infinity output appears at min/max control ranges.

Detailed checklist:
- `02_PHASE_1_TEST_CHECKLIST.md`

## Rollback Plan

- Revert modified Act I files and restore pre-phase `App.tsx` behavior.
- Remove newly introduced Act I modules if needed.
- Re-run lint/build to confirm baseline recovery.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Readouts do not match slider values | Unit conversion missing or applied twice | Centralize conversion in one utility and reuse everywhere |
| Viewport drag and slider fight each other | Two unsynchronized state sources | Use one hook state source and one update pipeline |
| Flickering values | Reformatting every render without stable precision | Normalize formatting precision in `units-format.ts` |
