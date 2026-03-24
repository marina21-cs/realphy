# Phase 5: Narrative Polish, Accessibility, and Performance

## Context

This phase makes the simulation production-ready for classroom use across desktop and mobile.
The app should feel interactive and cinematic while remaining accessible, readable, and stable.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Add polish without breaking current behavior.
- Include loading/empty/error accessibility patterns.
- Self-review for performance and a11y before completion.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Structured instructions, verification gate, rollback path, and troubleshooting are provided.

## Skills To Load

- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `web-design-guidelines` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-design-guidelines/SKILL.md`
- `web-performance-optimization` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-performance-optimization/SKILL.md`
- `systematic-debugging` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/systematic-debugging/SKILL.md`

## Prerequisites

- Phases 0-4 complete.
- Core interactions stable in all four modes.

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
│   ├── App.tsx                                                  <- MODIFIED
│   ├── index.css                                                <- MODIFIED
│   └── features/
│       └── simulation/
│           ├── hooks/
│           │   ├── use-accessibility-preferences.ts            <- CREATE
│           │   └── use-performance-tier.ts                     <- CREATE
│           ├── components/
│           │   ├── story-timeline-rail.tsx                     <- CREATE
│           │   ├── cinematic-overlay.tsx                       <- CREATE
│           │   ├── narration-toast.tsx                         <- CREATE
│           │   ├── accessibility-panel.tsx                     <- CREATE
│           │   └── performance-switch.tsx                      <- CREATE
│           └── utils/
│               └── focus-order.ts                              <- CREATE
```

## File Init Checklist

- `src/features/simulation/hooks/use-accessibility-preferences.ts`: persisted a11y toggles.
- `src/features/simulation/hooks/use-performance-tier.ts`: performance mode selection.
- `src/features/simulation/components/story-timeline-rail.tsx`: phase navigator.
- `src/features/simulation/components/cinematic-overlay.tsx`: low-noise transition layer.
- `src/features/simulation/components/narration-toast.tsx`: short context prompts.
- `src/features/simulation/components/accessibility-panel.tsx`: a11y controls.
- `src/features/simulation/components/performance-switch.tsx`: full/balanced/lite selector.
- `src/features/simulation/utils/focus-order.ts`: keyboard order helpers.

## Instructions

### Step 5.1: Add Timeline and Narrative Components
**Files:** `src/features/simulation/components/story-timeline-rail.tsx`, `src/features/simulation/components/cinematic-overlay.tsx`, `src/features/simulation/components/narration-toast.tsx` - CREATE

- Build timeline steps: Act I, Act II, Act III, Free Explore.
- Keep transitions short and meaningful.
- Avoid layout jumps while overlays appear/disappear.

### Step 5.2: Add Accessibility Preferences
**Files:** `src/features/simulation/hooks/use-accessibility-preferences.ts`, `src/features/simulation/components/accessibility-panel.tsx`, `src/index.css` - CREATE/MODIFY

- Controls: reduced motion, high contrast, colorblind-safe mode, keyboard help.
- Persist preferences locally.
- Apply visible focus styles and reduced-motion CSS handling.

### Step 5.3: Add Performance Tiers
**Files:** `src/features/simulation/hooks/use-performance-tier.ts`, `src/features/simulation/components/performance-switch.tsx`, `src/App.tsx` - CREATE/MODIFY

- Provide `Full`, `Balanced`, `Lite` modes.
- Gate expensive visual layers by selected tier.
- Ensure lite mode avoids heavy continuous animation.

### Step 5.4: Normalize Focus Flow
**File:** `src/features/simulation/utils/focus-order.ts` - CREATE

- Define predictable keyboard traversal for side panels and floating tools.
- Ensure all critical controls are reachable by keyboard only.

## Interactive Requirements

- Accessibility toggles take effect immediately.
- Performance tier switch changes visible rendering complexity.
- Timeline selection updates current act context without reload.
- Keyboard users can access all essential controls.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Reduced motion suppresses high-motion effects.
- [ ] High contrast mode improves readability and preserves layout.
- [ ] Lite mode noticeably reduces heavy visual rendering.
- [ ] Keyboard-only flow can operate major controls end to end.

## Rollback Plan

- Remove newly added Phase 5 hooks/components.
- Revert modified style and app wiring files.
- Re-run lint/build baseline checks.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Motion still plays in reduced mode | Animation gates are not centralized | Route motion decisions through one shared preference hook |
| Floating controls are skipped by keyboard | Missing focus order or focusable attributes | Add deterministic tab order and ensure controls are focusable |
| Lite mode still slow | Heavy layers remain mounted | Conditionally render heavy visuals only for full/balanced |
