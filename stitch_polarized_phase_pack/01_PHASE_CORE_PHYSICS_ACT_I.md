# Phase 1 Stitch Prompt

Use with: `00_GLOBAL_DESIGN_LOCK.md`

```txt
Design a premium web simulator screen for "POLARIZED" in dark mode at 1440px desktop, focused on Act I: empty parallel plates in vacuum, with real-time field mapping and basic controls.

Apply the provided POLARIZED design language lock exactly.

Overall aesthetic:
A quiet, high-precision lab in deep space. The screen should feel like a live instrument panel where electric fields are being discovered in real time. Minimal UI chrome, strong typography, and glowing data accents.

Page structure top to bottom:
1) Top nav bar (height 68px, glass panel)
- Left: POLARIZED wordmark in Syne 22px bold, tiny subtitle "Matter Remembers" in IBM Plex Sans 12px.
- Center: mode chips (Story, Student, Advanced, Educator) with Story active.
- Right: help icon button, settings icon button, performance chip showing "60 FPS Target".

2) Main simulation band (12-column grid, 760px tall)
- Left rail (col 1-2): Cartographer Log panel with 3 short narrative lines.
- Center viewport (col 3-10): large 3D canvas placeholder of two metallic capacitor plates with cyan field lines in vacuum.
- Right rail (col 11-12): compact controls for Plate Area (A), Separation (d), Voltage (V).
- Include orbit/zoom hint chips: "Drag to orbit" and "Scroll to zoom".

3) Bottom live readout strip (full width, 120px)
- 4 metric cards using JetBrains Mono:
  - C = e0A/d
  - Q = CV
  - U = 1/2 CV^2
  - E = V/d
- Each card has micro trend sparkline and unit labels.

Interaction and states:
- Slider hover glows in accent-neon.
- Dragging plate distance updates readout cards with animated number interpolation.
- Include loading overlay for 3D scene with circular progress and text "Mapping field...".
- Reduced motion mode: disable glow pulses, keep static transitions.

Responsive notes:
- At 1024px: collapse left log into top accordion.
- At 390px: show static hero snapshot in place of full 3D with a "Tap to open lite viewer" CTA.

Key design notes:
- Keep background layered: deep gradient + faint matrix grid.
- Keep interface sparse and readable.
- Make equations visible but not overwhelming.
```