# POLARIZED Implementation Phase Pack

This folder contains the implementation plan for the current `simulation-phy` codebase.
Each phase is a separate file and includes:
- A copy-ready prompt for an AI coding agent
- Concrete implementation guidelines
- Verification, rollback, and troubleshooting notes

## Scope Lock

This project is a scientific learning simulation only.
Do not add:
- Login buttons
- Signup buttons
- Profile buttons
- User account flows

Mode switching (Story, Student, Advanced, Educator) is allowed because it is a learning depth selector, not identity/auth.

## Files

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

## Execution Order

0. `00_PHASE_INIT_AND_EXECUTION_PROTOCOL.md`
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
12. `08_END_TO_END_FEATURE_ACCEPTANCE.md` (final gate)

## New Enhancement Scope

These additional phases implement the latest requested direction:
- Real-time interpretation that explains simulation meaning as users tweak controls.
- Phase 1.1 AI interpretation using OpenRouter with safe fallback when key/model is unavailable.
- Sound + sci-fi style narration voice for interpretation events.
- UI/UX clarity, typography upgrades, and lag reduction aligned with POLARIZED goals.

All new phases still follow:
- `feature-implementation-prompt.md` lifecycle (discover -> plan -> implement -> test -> review)
- `implementation-guide-prompt.md` structure (context, skills, prerequisites, directory map, steps, verification, rollback, troubleshooting)

## How To Use

1. Start at Phase 0 and finish each phase gate before moving forward.
2. For each phase file, copy the `Prompt For Coding Agent` block into your coding agent.
3. Execute the phase in `simulation-phy`.
4. Run verification commands listed in that phase.
5. Continue only when all checks pass.

## Target Repo

- App root: `/home/keni/Documents/upphysics/simulation-phy`
- Phase docs root: `/home/keni/Documents/upphysics/stitch_polarized_phase_pack/implementation`
