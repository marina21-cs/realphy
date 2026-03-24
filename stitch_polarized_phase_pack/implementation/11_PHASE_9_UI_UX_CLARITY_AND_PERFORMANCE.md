# Phase 9: UI/UX Clarity, Typography, and Lag Reduction

## Context

This phase improves clarity so users at every mode can understand what is happening with minimal confusion.
It also hardens performance by reducing avoidable lag while preserving the cinematic identity of POLARIZED.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Follow existing architecture, avoid pattern drift, and improve comprehension through targeted UI changes.
- Measure before optimization and verify before/after outcomes.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Structured phase format with explicit file map, step-by-step instructions, verification gate, rollback plan, and troubleshooting table.

## Skills To Load

- `frontend-design` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/frontend-design/SKILL.md`
- `web-design-guidelines` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-design-guidelines/SKILL.md`
- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `web-performance-optimization` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-performance-optimization/SKILL.md`
- `performance-profiling` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/performance-profiling/SKILL.md`

## Prerequisites

- Phase 8 complete.
- Interpretation and audio controls already functional.
- Existing design tokens and mode logic are stable.

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
│   ├── App.tsx                                                           <- MODIFIED
│   ├── index.css                                                         <- MODIFIED
│   └── features/
│       └── simulation/
│           ├── ui/
│           │   ├── typography-tokens.ts                                  <- CREATE
│           │   ├── comprehension-map.ts                                  <- CREATE
│           │   └── performance-budget.ts                                 <- CREATE
│           ├── hooks/
│           │   ├── use-comprehension-hints.ts                            <- CREATE
│           │   └── use-performance-telemetry.ts                          <- CREATE
│           └── components/
│               ├── mode-aware-help-layer.tsx                             <- CREATE
│               ├── quick-glossary-popover.tsx                            <- CREATE
│               ├── readability-panel.tsx                                 <- CREATE
│               └── performance-indicator-chip.tsx                        <- CREATE
├── docs/
│   └── performance-audit-notes.md                                        <- CREATE
```

## File Init Checklist

- `src/features/simulation/ui/typography-tokens.ts`: font families, sizes, weights, and mode-aware readability tokens.
- `src/features/simulation/ui/comprehension-map.ts`: mapping of concepts -> short explanations per mode.
- `src/features/simulation/ui/performance-budget.ts`: thresholds for frame time, update rate, and heavy visual gates.
- `src/features/simulation/hooks/use-comprehension-hints.ts`: contextual helper hints based on user action history.
- `src/features/simulation/hooks/use-performance-telemetry.ts`: lightweight client metrics for interaction smoothness.
- `src/features/simulation/components/mode-aware-help-layer.tsx`: visual guidance layer by mode.
- `src/features/simulation/components/quick-glossary-popover.tsx`: compact definitions for symbols and terms.
- `src/features/simulation/components/readability-panel.tsx`: control over text density/reading aid.
- `src/features/simulation/components/performance-indicator-chip.tsx`: simple runtime status (Full/Balanced/Lite, smooth/strained).
- `docs/performance-audit-notes.md`: before/after metrics and optimization decisions.

## Instructions

### Step 9.1: Improve Readability and Font System
**Files:** `src/features/simulation/ui/typography-tokens.ts`, `src/index.css`, `src/App.tsx` - CREATE/MODIFY

- Apply a clear font stack aligned to the design goal:
  - heading/display,
  - body/teaching copy,
  - equations/metrics.
- Ensure hierarchy is clear on desktop and mobile:
  - major concepts,
  - live formulas,
  - interpretation text,
  - controls.
- Keep text contrast and spacing high enough for classroom projection.

### Step 9.2: Add Mode-Aware Comprehension Layer
**Files:** `src/features/simulation/ui/comprehension-map.ts`, `src/features/simulation/hooks/use-comprehension-hints.ts`, `src/features/simulation/components/mode-aware-help-layer.tsx`, `src/features/simulation/components/quick-glossary-popover.tsx` - CREATE

- Add concise explanatory hints triggered by key interactions.
- Use mode-aware depth:
  - Story mode: plain-language explanation.
  - Student mode: plain-language + formula link.
  - Advanced/Educator: concise technical interpretation.
- Add quick glossary entries for `kappa`, `E`, `C`, `Q`, `U`, and `tau`.

### Step 9.3: Reduce Lag in High-Interaction Paths
**Files:** `src/features/simulation/ui/performance-budget.ts`, `src/features/simulation/hooks/use-performance-telemetry.ts`, `src/features/simulation/components/performance-indicator-chip.tsx`, `src/App.tsx` - CREATE/MODIFY

- Measure and log baseline performance before tuning.
- Optimize interaction-heavy paths:
  - prevent unnecessary rerenders,
  - throttle non-critical updates,
  - avoid expensive operations inside render loops,
  - gate heavy visual layers when performance tier drops.
- Add lightweight runtime indicator so users/educators can see current performance tier status.

### Step 9.4: Add Readability and Stability Controls
**Files:** `src/features/simulation/components/readability-panel.tsx`, `src/index.css` - CREATE/MODIFY

- Provide user controls for text density and assistive readability options.
- Ensure these controls do not introduce layout shift or render-jank.
- Keep behavior aligned with phase goals and existing accessibility settings.

### Step 9.5: Document Before/After Metrics
**File:** `docs/performance-audit-notes.md` - CREATE

- Capture key metrics before and after optimization:
  - interaction responsiveness,
  - build size/chunk notes,
  - runtime smoothness observations on desktop and mobile.
- Record major trade-offs and why final choices align with learning goals.

## Interactive Requirements

- Users can understand symbol meaning quickly via glossary/hint layer.
- Typography and layout remain readable across mode contexts.
- Interaction remains smooth when rapidly adjusting controls.
- Performance indicator reflects actual runtime state changes.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Mode-aware hints and glossary provide correct explanations for key concepts.
- [ ] Updated font hierarchy improves readability without clipping/overlap.
- [ ] Rapid control interaction shows reduced lag compared to baseline.
- [ ] Performance indicator updates correctly when heavy visual load changes.

## Rollback Plan

- Remove new UI/telemetry files from this phase.
- Revert typography and App wiring changes.
- Re-run lint/build and compare runtime behavior against the pre-phase baseline.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| UI looks cleaner but still feels slow | Bottleneck is in render loop or postprocessing | Profile frame-time hotspots and gate heavy layers by performance tier |
| New fonts break spacing on mobile | Token scale not responsive enough | Add mobile-specific clamps and fallback font metrics |
| Hint layer overwhelms users | Hint triggers are too frequent | Add cooldown and only show contextually relevant hints |
| Performance indicator always shows stable | Telemetry sampling is not connected to real metrics | Bind indicator state to measured frame/update thresholds |