# Phase 0: Setup Baseline and Scope Lock

## Context

This phase prepares `simulation-phy` for phased delivery with a stable, typed baseline.
It also enforces the learning-only product boundary: no auth, no profile, no account logic.

## Prompt Alignment

This phase applies both prompt systems.

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Stage 0: read current structure and conventions before edits.
- Stage 3-4: implement small, verifiable refactor steps.
- Stage 6: run lint/build and regression checks.

BuildCraft alignment (`implementation-guide-prompt.md`):
- File-level instructions, dependency order, verification gate, rollback, and troubleshooting are defined below.

## Skills To Load

Load before coding:
- `clean-code` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/clean-code/SKILL.md`
- `cc-skill-coding-standards` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/cc-skill-coding-standards/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`
- `lint-and-validate` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/lint-and-validate/SKILL.md`

## Prerequisites

- `npm install` completed.
- `npm run dev` starts successfully.
- `npm run lint` and `npm run build` pass before refactor.

## Phase Init

Run from `/home/keni/Documents/upphysics/simulation-phy`:

```bash
npm run lint
npm run build
```

## Directory Structure

Target structure after this phase:

```txt
simulation-phy/
├── src/
│   ├── App.tsx                                      <- MODIFIED
│   ├── config/
│   │   └── simulation-scope.ts                      <- CREATE
│   ├── features/
│   │   └── simulation/
│   │       ├── constants/
│   │       │   └── modes.ts                         <- CREATE
│   │       ├── hooks/
│   │       │   └── use-simulation-mode.ts           <- CREATE
│   │       ├── components/
│   │       │   ├── header-bar.tsx                   <- CREATE
│   │       │   └── mode-tabs.tsx                    <- CREATE
│   │       └── types/
│   │           └── view-mode.ts                     <- CREATE
│   └── index.css                                    <- MODIFY only if needed for extracted UI
└── README.md                                        <- MODIFIED
```

## File Init Checklist

Initialize these files before wiring behavior:
- `src/config/simulation-scope.ts`: export frozen scope object.
- `src/features/simulation/types/view-mode.ts`: export `ViewMode` union type.
- `src/features/simulation/constants/modes.ts`: export mode metadata list.
- `src/features/simulation/hooks/use-simulation-mode.ts`: export typed mode hook.
- `src/features/simulation/components/header-bar.tsx`: export top navigation shell.
- `src/features/simulation/components/mode-tabs.tsx`: export reusable mode tabs.

## Instructions

### Step 0.1: Add Scope Guard Config
**File:** `src/config/simulation-scope.ts` - CREATE

- Export `SIMULATION_SCOPE` with:
  - `learningOnly: true`
  - `authEnabled: false`
  - `profileUiEnabled: false`
  - `accountMenusEnabled: false`
- Export object as `as const` and `Object.freeze` it.

### Step 0.2: Extract Header and Mode Tabs
**Files:** `src/features/simulation/components/header-bar.tsx`, `src/features/simulation/components/mode-tabs.tsx`, `src/App.tsx` - CREATE/MODIFY

- Move current header/nav markup from `App.tsx` into reusable components.
- Keep current visual style and active-state behavior.
- Ensure tabs work for all four modes: Story, Student, Advanced, Educator.

### Step 0.3: Add Typed Mode Model
**Files:** `src/features/simulation/types/view-mode.ts`, `src/features/simulation/constants/modes.ts`, `src/features/simulation/hooks/use-simulation-mode.ts` - CREATE

- Define one source of truth for allowed modes.
- Expose typed setter (`setMode`) and current value.
- Keep state local (no global store introduction in this phase).

### Step 0.4: Rewire App Without Behavior Regression
**File:** `src/App.tsx` - MODIFY

- Use new mode hook and extracted components.
- Keep existing Story, Student, Advanced, and Educator view routing.
- Remove any profile/account-related controls if they appear.

### Step 0.5: Document Scope Lock
**File:** `README.md` - MODIFY

- Add a section named `Scope` with explicit no-auth/no-profile statement.
- Include one sentence clarifying Educator mode is not identity-gated.

## Interactive Requirements

- Mode tabs must respond to mouse and keyboard activation.
- Active tab styling updates immediately on change.
- All four views render without blank states.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Header shows no login/signup/profile/account controls.
- [ ] Mode switching works for Story, Student, Advanced, Educator.
- [ ] README includes clear scope lock text.

## Rollback Plan

- Revert `src/App.tsx` and `README.md`.
- Remove newly added files under `src/config` and `src/features/simulation`.
- Re-run `npm run lint` and `npm run build` to confirm a clean baseline.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Mode buttons render but do not switch | Setter not passed through extracted components | Ensure callback is typed and wired from parent state |
| Build fails after extraction | Incorrect relative imports | Standardize import paths and check filename casing |
| Profile icon reappears | Legacy icon block still in `App.tsx` | Remove stale JSX and icon imports |
