# Phase 7: Real-Time Interpretation and AI Interpretation (OpenRouter)

## Context

This phase adds live interpretation to the simulation so users immediately understand what parameter changes mean.
It introduces two layers: deterministic real-time interpretation and optional AI interpretation (Phase 1.1) using OpenRouter.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Discover existing control/state patterns first, then integrate interpretation without breaking current behavior.
- Add loading/error/empty states for AI responses and maintain UX consistency.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Uses strict file mapping, dependency-ordered steps, verification gate, rollback plan, and troubleshooting matrix.

## Skills To Load

- `react-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-patterns/SKILL.md`
- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `ai-product` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/ai-product/SKILL.md`
- `api-security-best-practices` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/api-security-best-practices/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`

## Prerequisites

- Phases 0-6 complete.
- Existing simulation controls are stable and produce deterministic numeric outputs.
- Narrative HUD/log panel is available for interpretation rendering.

## Phase Init

```bash
cd /home/keni/Documents/upphysics/simulation-phy
npm run lint
npm run build
```

## Directory Structure

```txt
simulation-phy/
├── .env.example                                                          <- MODIFIED
├── src/
│   ├── App.tsx                                                           <- MODIFIED
│   └── features/
│       └── simulation/
│           ├── interpretation/
│           │   ├── interpretation-types.ts                               <- CREATE
│           │   ├── interpretation-rules.ts                               <- CREATE
│           │   ├── openrouter-client.ts                                  <- CREATE
│           │   └── interpretation-prompt.ts                              <- CREATE
│           ├── hooks/
│           │   ├── use-live-interpretation.ts                            <- CREATE
│           │   └── use-openrouter-interpretation.ts                      <- CREATE
│           └── components/
│               ├── interpretation-panel.tsx                              <- CREATE
│               └── interpretation-status-chip.tsx                        <- CREATE
```

## File Init Checklist

- `src/features/simulation/interpretation/interpretation-types.ts`: strict types for interpretation context, severity, and response states.
- `src/features/simulation/interpretation/interpretation-rules.ts`: deterministic mapping of control deltas -> human-readable interpretation.
- `src/features/simulation/interpretation/openrouter-client.ts`: API client with timeout, abort, retries, and normalized error output.
- `src/features/simulation/interpretation/interpretation-prompt.ts`: prompt template for concise physics-safe interpretation text.
- `src/features/simulation/hooks/use-live-interpretation.ts`: debounced subscription to parameter changes and rule output generation.
- `src/features/simulation/hooks/use-openrouter-interpretation.ts`: optional AI refinement hook with fallback logic.
- `src/features/simulation/components/interpretation-panel.tsx`: panel that displays live interpretation lines.
- `src/features/simulation/components/interpretation-status-chip.tsx`: source indicator (Rule / AI / Fallback) with loading/error badge.

## Instructions

### Step 7.1: Add Deterministic Real-Time Interpretation Layer
**Files:** `src/features/simulation/interpretation/interpretation-types.ts`, `src/features/simulation/interpretation/interpretation-rules.ts`, `src/features/simulation/hooks/use-live-interpretation.ts` - CREATE

- Build a deterministic interpretation engine that reacts to parameter deltas (`A`, `d`, `V`, `kappa`, `R`, mode/act changes).
- Convert raw numbers into learning language, for example:
  - what changed,
  - immediate physical effect,
  - likely next behavior.
- Add delta thresholds to avoid noisy micro-updates while dragging sliders.
- Keep interpretation updates debounced so frequent input remains smooth.

### Step 7.2: Add AI Interpretation (Phase 1.1) via OpenRouter
**Files:** `src/features/simulation/interpretation/openrouter-client.ts`, `src/features/simulation/interpretation/interpretation-prompt.ts`, `src/features/simulation/hooks/use-openrouter-interpretation.ts`, `.env.example` - CREATE/MODIFY

- Add OpenRouter request layer that receives current simulation snapshot and deterministic interpretation seed.
- Require env vars:
  - `VITE_OPENROUTER_API_KEY`
  - `VITE_OPENROUTER_MODEL` (default model in docs)
  - `VITE_OPENROUTER_BASE_URL` (optional override)
- Enforce strict response formatting (short, educational, non-hallucinated, no policy-unsafe content).
- Add token/latency guardrails:
  - debounce AI calls,
  - do not call on every frame,
  - abort stale in-flight calls when newer user input arrives.
- If key/model/network fails, fall back to deterministic rule output with an explicit status chip.

### Step 7.3: Render Interpretation UI in Existing HUD
**Files:** `src/features/simulation/components/interpretation-panel.tsx`, `src/features/simulation/components/interpretation-status-chip.tsx`, `src/App.tsx` - CREATE/MODIFY

- Place the interpretation panel near existing story/log regions without covering critical controls.
- Show three states clearly:
  - live deterministic interpretation,
  - AI-enhanced interpretation in progress,
  - fallback/error state.
- Keep language audience-aware:
  - Story mode: plain and cinematic.
  - Student/Advanced/Educator: richer physics context.

### Step 7.4: Add Safety and Performance Controls
**Files:** `src/features/simulation/hooks/use-live-interpretation.ts`, `src/features/simulation/hooks/use-openrouter-interpretation.ts` - MODIFY

- Add a cooldown window to avoid API spam during continuous dragging.
- Add per-session caps for AI call count and fallback to deterministic mode when cap is reached.
- Store only minimal local interpretation history required for UI context.

## Interactive Requirements

- Changing any major control updates interpretation text in near real time.
- AI interpretation appears only when enabled and key/model are available.
- If AI is unavailable, users still get immediate deterministic explanations.
- Drag interactions remain smooth with no visible input lag introduced by interpretation logic.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Deterministic interpretation updates when `A`, `d`, `V`, `kappa`, or `R` changes.
- [ ] OpenRouter call executes only when API key exists and interpretation AI mode is enabled.
- [ ] AI request failures degrade to deterministic output without crashing UI.
- [ ] Rapid slider movement does not trigger runaway API calls.

## Rollback Plan

- Remove interpretation module files and hooks.
- Revert `App.tsx` and `.env.example` changes.
- Re-run lint/build and confirm baseline simulation behavior returns.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Interpretation text flickers during drag | Update stream is too frequent | Increase debounce window and delta threshold |
| AI never returns content | Missing key/model env var or bad endpoint | Validate `.env` values and inspect network response |
| Frequent 429/rate limits | API called on every tiny change | Add cooldown, batching, and abort stale requests |
| User sees blank interpretation panel | Loading/error state not rendered correctly | Always render deterministic fallback with source badge |