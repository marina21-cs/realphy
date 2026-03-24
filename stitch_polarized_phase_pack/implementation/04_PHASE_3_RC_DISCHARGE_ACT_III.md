# Phase 3: RC Discharge Act III (Charge, Release, Live Decay)

## Context

This phase introduces time-based RC behavior to Advanced mode.
Users must be able to charge, discharge, pause, resume, and export decay data with synchronized visual and numeric feedback.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Build with a predictable state machine and test critical paths.
- Verify error and edge behaviors (pause/resume/reset, conflicting controls).

BuildCraft alignment (`implementation-guide-prompt.md`):
- This phase includes explicit file targets, ordered steps, verification gate, rollback plan, and troubleshooting map.

## Skills To Load

- `react-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-patterns/SKILL.md`
- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `web-performance-optimization` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-performance-optimization/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`

## Prerequisites

- Phase 2 completed.
- Act I and Act II output layers stable.

## Phase Init

```bash
cd /home/keni/Documents/upphysics/simulation-phy
npm run lint
npm run build
```

## Directory Structure

```txt
simulation-phy/
├── src/
│   ├── App.tsx                                             <- MODIFIED
│   └── features/
│       ├── physics/
│       │   └── rc-discharge.ts                             <- CREATE
│       └── simulation/
│           ├── hooks/
│           │   └── use-rc-discharge.ts                     <- CREATE
│           ├── types/
│           │   └── discharge-sample.ts                     <- CREATE
│           ├── components/
│           │   ├── act3-circuit-viewport.tsx               <- CREATE
│           │   ├── discharge-controls.tsx                  <- CREATE
│           │   ├── live-equation-tiles.tsx                 <- CREATE
│           │   └── decay-chart-card.tsx                    <- CREATE
│           └── utils/
│               └── csv-export.ts                           <- CREATE
```

## File Init Checklist

- `src/features/physics/rc-discharge.ts`: pure RC equation helpers.
- `src/features/simulation/types/discharge-sample.ts`: sample row type.
- `src/features/simulation/hooks/use-rc-discharge.ts`: phase state machine and sampling loop.
- `src/features/simulation/components/discharge-controls.tsx`: charge/discharge controls.
- `src/features/simulation/components/live-equation-tiles.tsx`: formula readouts.
- `src/features/simulation/components/decay-chart-card.tsx`: measured vs theoretical chart.
- `src/features/simulation/components/act3-circuit-viewport.tsx`: animated discharge indicator.
- `src/features/simulation/utils/csv-export.ts`: data export utility.

## Instructions

### Step 3.1: Implement RC Formula Module
**File:** `src/features/physics/rc-discharge.ts` - CREATE

Export pure helpers:
- `tauSeconds(resistanceOhms, capacitanceFarads)`
- `voltageAtTime(v0, t, r, c)`
- `currentAtTime(v0, t, r, c)`
- `powerAtTime(v0, t, r, c)`

Guard invalid inputs and non-finite values.

### Step 3.2: Build Discharge State Hook
**Files:** `src/features/simulation/types/discharge-sample.ts`, `src/features/simulation/hooks/use-rc-discharge.ts` - CREATE

- States: `idle`, `charging`, `discharging`, `paused`, `complete`.
- Actions: `charge`, `discharge`, `pause`, `resume`, `reset`.
- Generate sample stream from `t=0` to `t=5*tau`.
- Clean up timers/frames to avoid leaks.

### Step 3.3: Wire Advanced Mode UI
**Files:** `src/features/simulation/components/discharge-controls.tsx`, `src/features/simulation/components/live-equation-tiles.tsx`, `src/features/simulation/components/decay-chart-card.tsx`, `src/features/simulation/components/act3-circuit-viewport.tsx`, `src/App.tsx` - CREATE/MODIFY

- Connect controls to hook actions.
- Bind tiles and chart to the same sample source.
- Plot measured and theoretical lines with clear visual distinction.
- Disable conflicting actions while discharge is active.

### Step 3.4: Add CSV Export
**File:** `src/features/simulation/utils/csv-export.ts` - CREATE

- Export rows: `time`, `voltage`, `current`, `power`.
- Ensure exported values reflect current run, not stale state.

## Interactive Requirements

- `Discharge` starts animated chart updates and viewport feedback.
- `Pause` freezes state and `Resume` continues from same timestamp.
- `Reset` clears run artifacts and returns to initial condition.
- Export button downloads current sample data without page reload.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Decay chart updates smoothly with no jump-back time artifacts.
- [ ] Pause/resume behavior is deterministic and repeatable.
- [ ] CSV file includes expected columns and non-empty rows.

## Rollback Plan

- Remove Act III files listed above.
- Restore previous Advanced mode composition in `src/App.tsx`.
- Re-run lint/build baseline checks.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Chart line jumps backward | Time source is not monotonic | Use elapsed duration based on one start timestamp |
| Pause does not stop updates | Update loop ignores paused state | Gate every tick by state machine status |
| CSV export is empty | Sample data cleared too early | Preserve samples until explicit reset |
