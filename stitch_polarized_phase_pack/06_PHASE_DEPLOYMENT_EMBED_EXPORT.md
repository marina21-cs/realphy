# Phase 6 Stitch Prompt

Use with: `00_GLOBAL_DESIGN_LOCK.md`

```txt
Design the final connected POLARIZED operations screen at 1440px desktop for deployment and educator integration: embed setup, URL-state sharing, and export tools.

Apply the provided POLARIZED design language lock exactly.

Overall aesthetic:
A professional control center that still feels like POLARIZED. Utility-focused, clean, and trustworthy, with subtle neon accents.

Page structure:
1) Embed configuration panel (left)
- Inputs for mode preset, locked controls, default dielectric, default plate distance.
- Live query string preview in mono font.
- Buttons: Copy URL, Generate iframe, Reset.

2) Preview pane (center)
- Browser-frame style live preview of embedded simulation.
- Toggles for Canvas, Moodle, Blackboard, Google Classroom presets.

3) Data and package panel (right)
- Export cards: CSV discharge data, session JSON state, screenshot capture.
- SCORM 1.2 package status card with Build Package button.
- QA checklist chips: Chrome, Firefox, Safari, Edge.

Interaction and states:
- Updating config instantly updates query preview.
- Copy action shows tiny confirmation toast.
- Build Package action shows progress indicator and completion badge.

Responsive notes:
- Tablet: embed config above preview.
- Mobile: single-column wizard flow with step indicator.

Key design notes:
- Keep this phase practical and production-ready.
- Preserve visual continuity from all prior phases.
- Keep dense controls readable through grouping and spacing.
```