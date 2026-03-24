# Phase 2: Dielectric Act II (Material Insertion and Polarization)

## Context

This phase extends Act I with material-dependent dielectric behavior.
Student mode should become materially interactive: material selection and insertion depth must change both visuals and equations.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Clarify user-facing behavior for each material and edge case.
- Implement with reusable state and data maps.
- Test transitions, empty states, and keyboard flow.

BuildCraft alignment (`implementation-guide-prompt.md`):
- This phase keeps strict file mapping, dependency order, verification gates, and rollback instructions.

## Skills To Load

- `3d-web-experience` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/3d-web-experience/SKILL.md`
- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `tailwind-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/tailwind-patterns/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`

## Prerequisites

- Phase 1 completed.
- Act I formulas validated.

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
│   ├── App.tsx                                         <- MODIFIED
│   └── features/
│       ├── physics/
│       │   ├── materials.ts                            <- CREATE
│       │   └── dielectric-equations.ts                 <- CREATE
│       └── simulation/
│           ├── types/
│           │   └── material-id.ts                      <- CREATE
│           ├── hooks/
│           │   └── use-dielectric-state.ts             <- CREATE
│           ├── components/
│           │   ├── material-library.tsx                <- CREATE
│           │   ├── act2-dielectric-viewport.tsx        <- CREATE
│           │   ├── molecular-detail-drawer.tsx         <- CREATE
│           │   └── dielectric-readout-panel.tsx        <- CREATE
│           └── utils/
│               └── legends.ts                          <- CREATE
```

## File Init Checklist

Initialize with typed exports first:
- `src/features/physics/materials.ts`: material registry and metadata.
- `src/features/physics/dielectric-equations.ts`: dielectric formulas.
- `src/features/simulation/types/material-id.ts`: material id union.
- `src/features/simulation/hooks/use-dielectric-state.ts`: selected material + insertion state.
- `src/features/simulation/components/material-library.tsx`: selection rail/cards.
- `src/features/simulation/components/act2-dielectric-viewport.tsx`: insertion visualization.
- `src/features/simulation/components/molecular-detail-drawer.tsx`: tabbed detail panel.
- `src/features/simulation/components/dielectric-readout-panel.tsx`: live metrics.
- `src/features/simulation/utils/legends.ts`: colorblind-safe marker map.

## Instructions

### Step 2.1: Build Material Registry and Formula Layer
**Files:** `src/features/physics/materials.ts`, `src/features/physics/dielectric-equations.ts` - CREATE

- Add materials: Vacuum, Water, Borosilicate, Barium Titanate.
- Include `kappa`, display label, color token key, and motion metadata.
- Export dielectric capacitance helper and vacuum comparison helpers.

### Step 2.2: Add Dielectric State Hook
**Files:** `src/features/simulation/types/material-id.ts`, `src/features/simulation/hooks/use-dielectric-state.ts` - CREATE

- Track selected material and insertion depth.
- Clamp insertion depth to allowed range.
- Expose actions: select material, set depth, reset.

### Step 2.3: Implement Student-Mode Interactive UI
**Files:** `src/features/simulation/components/material-library.tsx`, `src/features/simulation/components/act2-dielectric-viewport.tsx`, `src/features/simulation/components/dielectric-readout-panel.tsx`, `src/App.tsx` - CREATE/MODIFY

- Material cards change selected material state.
- Insertion control updates viewport and computed values.
- Readout panel displays `kappa`, `C_dielectric`, and baseline comparison.

### Step 2.4: Add Molecular Detail Drawer
**File:** `src/features/simulation/components/molecular-detail-drawer.tsx` - CREATE

- Tabs: `Field View`, `Dipole View`, `Bound Charge View`.
- Show a temporary transition label such as `Aligning dipoles...` while switching material/depth.
- Keep tab controls keyboard reachable.

### Step 2.5: Add Accessible Legends
**File:** `src/features/simulation/utils/legends.ts` - CREATE

- Define symbol + color pairings for colorblind-safe interpretation.
- Use legends consistently across viewport and readout panel.

## Interactive Requirements

- Material selection updates values and visuals in real time.
- Insertion depth is user-adjustable and visibly reflected.
- Drawer tabs switch without layout jump.
- Keyboard users can operate rail, tabs, and insertion controls.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `kappa` changes alter capacitance outputs.
- [ ] Transition text appears briefly during material updates.
- [ ] Legend markers remain readable in colorblind-safe mode.

## Rollback Plan

- Revert all newly added Act II files.
- Restore Student mode composition in `src/App.tsx`.
- Re-run lint/build baseline checks.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Material switch has no effect | Act II still calling vacuum-only function | Route output through dielectric equations with selected `kappa` |
| Stutter during transitions | Heavy recompute on each render | Memoize derived values and move expensive work outside render |
| Tabs switch label but not content | Tab key map mismatch | Use one enum/union key for both tab controls and panel content |
