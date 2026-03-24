# End-to-End Feature Acceptance Matrix

Use this file after Phase 9 to confirm every major feature works and remains interactive.
Run from `/home/keni/Documents/upphysics/simulation-phy`.

## Command Gate

```bash
npm run lint
npm run build
npm run dev
```

All three commands must complete successfully before manual checks.

## Scenario 1: Story Mode (Act I Vacuum Physics)

- [ ] Open Story mode.
- [ ] Adjust `A`, `d`, and `V`.
- [ ] Confirm live updates for `C`, `Q`, `U`, `E`.
- [ ] Confirm viewport interaction (for example drag gap handle) updates at least one parameter.

## Scenario 2: Student Mode (Act II Dielectric)

- [ ] Select each material (Vacuum, Water, Borosilicate, Barium Titanate).
- [ ] Confirm `kappa` and capacitance outputs change per material.
- [ ] Adjust insertion depth and confirm viewport/readout update.
- [ ] Switch molecular drawer tabs and verify content switches correctly.

## Scenario 3: Advanced Mode (Act III RC Discharge)

- [ ] Start a discharge run and confirm live chart updates.
- [ ] Pause and resume without timeline reset.
- [ ] Reset and confirm state returns to baseline.
- [ ] Export CSV and verify columns: `time`, `voltage`, `current`, `power`.

## Scenario 4: Educator Mode and Compare Tools

- [ ] Open gateway and switch between all four modes.
- [ ] Enable split compare and set different materials left/right.
- [ ] Toggle sync on/off and verify expected behavior.
- [ ] Apply control locks and verify locked controls cannot be changed.
- [ ] Copy URL state and reload; verify state restoration.

## Scenario 5: Accessibility and Performance

- [ ] Enable reduced motion and verify high-motion effects are suppressed.
- [ ] Enable high contrast and verify readability gains.
- [ ] Enable colorblind-safe mode and verify marker symbols are shown.
- [ ] Switch performance tiers (Full/Balanced/Lite) and verify visible rendering differences.
- [ ] Verify keyboard-only operation for major controls.

## Scenario 6: Deployment and Embed

- [ ] Generate embed preset and copy iframe snippet.
- [ ] Verify preview pane reflects selected preset.
- [ ] Export JSON session and confirm `schemaVersion` exists.
- [ ] Run `npm run preview` and validate release build behavior.

## Scenario 7: Real-Time Interpretation and OpenRouter AI

- [ ] Change `A`, `d`, `V`, `kappa`, and `R`; verify interpretation text updates in near real time.
- [ ] Confirm deterministic interpretation works even when AI mode is off.
- [ ] Enable OpenRouter AI interpretation and verify AI-enhanced explanation appears.
- [ ] Remove or invalidate OpenRouter key and verify graceful fallback to deterministic output.
- [ ] Rapid slider dragging should not spam AI calls or freeze interaction.

## Scenario 8: Sound and Sci-Fi Voice Layer

- [ ] Trigger key simulation events and verify matching sound effects play (without spam).
- [ ] Enable narration and confirm interpretation text is spoken in configured voice profile.
- [ ] Disable narration and verify only captions remain.
- [ ] Mute audio and verify ambient, SFX, and voice are silenced.
- [ ] Browser autoplay restrictions should show a safe user-gesture start path (no crash).

## Scenario 9: UI/UX Clarity and Lag Reduction

- [ ] Typography hierarchy is readable in Story, Student, Advanced, and Educator modes.
- [ ] Quick glossary and hint overlays explain `kappa`, `E`, `C`, `Q`, `U`, and `tau` clearly.
- [ ] Rapid control adjustments remain smooth with no major jank.
- [ ] Performance indicator reflects runtime state/tier changes.
- [ ] Mobile viewport remains understandable and touch-usable.

## Scope Lock Validation

- [ ] No login button.
- [ ] No signup flow.
- [ ] No profile/account menu.
- [ ] No feature that requires authentication to use core simulation.

## Final Release Gate

Release is approved only when all checkboxes above pass and there are no critical console/runtime errors.
