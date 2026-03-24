# Phase 4: Mode Gateway, Split Compare, and Educator Controls

## Context

This phase upgrades mode flow and educator tooling so learning scenarios can be compared and shared.
All functionality stays identity-free: Educator is a feature mode, not an authenticated user role.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Reuse existing mode architecture and avoid introducing unrelated patterns.
- Validate edge cases: sync toggles, lock enforcement, URL rehydrate behavior.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Includes explicit file map, step sequence, verification gate, rollback, and troubleshooting.

## Skills To Load

- `react-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-patterns/SKILL.md`
- `frontend-design` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/frontend-design/SKILL.md`
- `api-security-best-practices` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/api-security-best-practices/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`

## Prerequisites

- Phases 0-3 complete.
- Act I/II/III state models stable.

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
│   ├── App.tsx                                                <- MODIFIED
│   └── features/
│       └── simulation/
│           ├── components/
│           │   ├── mode-gateway.tsx                           <- CREATE
│           │   ├── split-compare-view.tsx                     <- CREATE
│           │   ├── educator-control-panel.tsx                 <- CREATE
│           │   ├── control-lock-list.tsx                      <- CREATE
│           │   ├── annotation-overlay.tsx                     <- CREATE
│           │   └── checkpoint-quiz-popover.tsx                <- CREATE
│           ├── hooks/
│           │   ├── use-control-locks.ts                       <- CREATE
│           │   └── use-url-state.ts                           <- CREATE
│           └── utils/
│               └── query-state.ts                             <- CREATE
```

## File Init Checklist

- `src/features/simulation/components/mode-gateway.tsx`: mode entry cards.
- `src/features/simulation/components/split-compare-view.tsx`: two-panel compare view.
- `src/features/simulation/components/educator-control-panel.tsx`: educator controls shell.
- `src/features/simulation/components/control-lock-list.tsx`: lock toggles for key controls.
- `src/features/simulation/components/annotation-overlay.tsx`: draggable annotation layer.
- `src/features/simulation/components/checkpoint-quiz-popover.tsx`: non-blocking quiz helper.
- `src/features/simulation/hooks/use-control-locks.ts`: centralized lock state.
- `src/features/simulation/hooks/use-url-state.ts`: URL sync logic.
- `src/features/simulation/utils/query-state.ts`: parse/serialize helpers.

## Instructions

### Step 4.1: Add Mode Gateway Entry
**File:** `src/features/simulation/components/mode-gateway.tsx` - CREATE

- Render cards for Story, Student, Advanced, Educator.
- Selecting a card opens the mode with corresponding defaults.

### Step 4.2: Implement Split Compare View
**File:** `src/features/simulation/components/split-compare-view.tsx` - CREATE

- Render left/right panels with independent material selection.
- Add sync toggle for shared parameter movement.
- Ensure responsive fallback to stacked layout on narrow screens.

### Step 4.3: Add Educator Lock Controls
**Files:** `src/features/simulation/components/educator-control-panel.tsx`, `src/features/simulation/components/control-lock-list.tsx`, `src/features/simulation/hooks/use-control-locks.ts` - CREATE

- Add lock toggles for `d`, `kappa`, `V`, and `R`.
- Enforce locks in update handlers, not only disabled styling.

### Step 4.4: Add Annotation and Quiz Helpers
**Files:** `src/features/simulation/components/annotation-overlay.tsx`, `src/features/simulation/components/checkpoint-quiz-popover.tsx` - CREATE

- Allow draggable annotations in educator view.
- Add non-blocking student checkpoint popover.

### Step 4.5: Add URL State Round-Trip
**Files:** `src/features/simulation/hooks/use-url-state.ts`, `src/features/simulation/utils/query-state.ts`, `src/App.tsx` - CREATE/MODIFY

- Serialize mode, materials, locks, and selected controls into query string.
- Parse query state on load.
- Ignore unknown keys safely.

## Interactive Requirements

- Mode cards and compare toggles are clickable and keyboard operable.
- Split view sync/unsync behavior is clear and deterministic.
- Locked controls cannot be changed through any UI path.
- URL copy/restore reproduces visible simulation state.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Gateway routes to all four modes correctly.
- [ ] Split compare shows two distinct material contexts.
- [ ] Control locks are enforced consistently across views.
- [ ] URL round-trip restores state accurately.

## Rollback Plan

- Remove mode gateway, split view, and educator-specific files.
- Restore previous mode navigation in `src/App.tsx`.
- Re-run lint/build baseline checks.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| URL restore misses values | Parser and serializer key mismatch | Keep a single shared schema map in `query-state.ts` |
| Lock appears active but value still changes | Lock only applied at UI layer | Enforce lock checks inside state update path |
| Split panels drift unexpectedly | Shared and local state mixed without boundary | Separate shared params and per-panel overrides clearly |
