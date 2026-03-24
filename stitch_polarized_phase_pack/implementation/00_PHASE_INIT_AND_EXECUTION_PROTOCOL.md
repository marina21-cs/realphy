# Global Init and Execution Protocol

## Purpose

This file standardizes how every phase is executed so features are:
- initialized correctly,
- interactive by default,
- fully working before moving forward.

## Prompt Application Contract

This implementation pack applies both master prompts every phase.

1. `feature-implementation-prompt.md` (FeatureCraft)
- Stage 0: orientation and pattern discovery before coding
- Stage 1-3: clarify, design, and approve approach
- Stage 4-5: implement and test
- Stage 6-7: self-review and completion summary

2. `implementation-guide-prompt.md` (BuildCraft)
- Each phase file includes context, skills, prerequisites, directory structure, step instructions, verification, rollback, and troubleshooting.
- Dependency order is enforced (no phase depends on future files).

## Extended Phase Sequence (Current)

Run phases in this order:

1. `01_PHASE_0_SETUP_BASELINE.md`
2. `02_PHASE_1_CORE_PHYSICS_ACT_I.md`
3. `02_PHASE_1_TEST_CHECKLIST.md`
4. `03_PHASE_2_DIELECTRIC_ACT_II.md`
5. `04_PHASE_3_RC_DISCHARGE_ACT_III.md`
6. `05_PHASE_4_MODE_COMPARE_EDUCATOR.md`
7. `06_PHASE_5_POLISH_ACCESSIBILITY_PERFORMANCE.md`
8. `07_PHASE_6_DEPLOYMENT_EMBED_EXPORT.md`
9. `09_PHASE_7_REALTIME_INTERPRETATION_AI.md`
10. `10_PHASE_8_SOUND_AND_SCI_FI_VOICE.md`
11. `11_PHASE_9_UI_UX_CLARITY_AND_PERFORMANCE.md`
12. `08_END_TO_END_FEATURE_ACCEPTANCE.md`

## Global Init (Run Once At Start)

From `/home/keni/Documents/upphysics/simulation-phy`:

```bash
npm install
npm run lint
npm run build
```

Expected outcome:
- Toolchain is healthy before feature edits begin.

If `npm run lint` fails due to non-app folders:
- Keep `tsconfig.json` scoped to `src` and `vite.config.ts`.
- Keep `variation_04_deep_tagalog` and `haha` excluded.

## Per-Phase Init (Run Before Every Phase)

1. Read the target phase doc and the previous phase verification checklist.
2. Run baseline checks:
```bash
npm run lint
npm run build
```
3. Initialize missing files listed in that phase under "File Init Checklist".
4. Add minimal typed exports in new files before wiring behavior.
5. Start local runtime validation:
```bash
npm run dev
```
6. Implement phase steps and verify all interactive requirements.
7. Re-run:
```bash
npm run lint
npm run build
```

## File Init Standard

For every new file in any phase:
- Create the file at the exact path listed by the phase.
- Start with explicit TypeScript exports and typed signatures.
- Avoid placeholder `any` types.
- Add a short comment only when behavior is non-obvious.
- Do not leave dead code, TODO-only stubs, or unreachable components.

## Interactivity Contract (Mandatory)

Every feature phase must include direct user interaction:
- Sliders, toggles, tabs, buttons, drag handles, or keyboard controls.
- Interaction must immediately update at least one simulation output (visual or numeric).
- Keyboard access is required (`Tab`, `Enter`, `Space` where relevant).
- No interaction should depend on sign-in or profile state.

## Working-Feature Gate (Must Pass Before Next Phase)

A phase is done only if all are true:
- Feature behavior works in `npm run dev`.
- Interactive controls are responsive and deterministic.
- No React runtime errors or console error spam.
- `npm run lint` passes.
- `npm run build` passes.
- Scope lock is preserved (no auth/account/profile UI).

## Delivery Note Template (After Each Phase)

Record:
- files created,
- files modified,
- interaction behaviors added,
- verification commands run,
- known risks and follow-ups.

Use this log style to stay aligned with both prompts and keep handoffs clean.
