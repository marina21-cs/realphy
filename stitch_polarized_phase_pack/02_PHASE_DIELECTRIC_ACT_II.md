# Phase 2 Stitch Prompt

Use with: `00_GLOBAL_DESIGN_LOCK.md`

```txt
Design the next connected POLARIZED screen at 1440px desktop for Act II: inserting dielectric materials and visualizing molecular polarization.

Apply the provided POLARIZED design language lock exactly.

Overall aesthetic:
The same lab interface evolves into a molecular theater. Add warmth and contrast only where dielectric behavior appears. Keep the rest minimal and stable so users feel continuity from Phase 1.

Page structure top to bottom:
1) Top nav bar remains identical to Phase 1
- Story and Student chips visible, Student now active.
- Add a small breadcrumb: "Act II / The Crystal Awakens".

2) Main simulation band (780px tall)
- Left rail: Material Library cards
  - Vacuum (k=1)
  - Water (k~80)
  - Borosilicate (k~4.7)
  - Barium Titanate (k~1200)
- Each card has tiny behavior tag (chaotic align, rigid flex, etc).
- Center viewport: dielectric slab inserted between plates, dipole instancing visible in X-ray toggle mode.
- Right rail: controls for material selection, dielectric insertion depth, and k readout.

3) Molecular detail drawer (bottom expandable glass sheet)
- Toggle tabs: Field View, Dipole View, Bound Charge View.
- Show mini legends with cyan, amber, and green encoding.

Interaction and states:
- Drag material card into viewport to insert dielectric.
- On insert, field lines change from cyan to amber within dielectric zone.
- Dipole cloud animates from noisy motion to aligned orientation.
- Include loading state text "Aligning dipoles..." while transition runs.

Accessibility and fallback:
- Include colorblind-safe legend with shape-coded markers.
- Mobile fallback: replace dense dipole scene with simplified vector glyph animation.

Key design notes:
- Preserve layout architecture from Phase 1 to feel connected.
- Material personality should be visible through motion and tint, not loud UI clutter.
- Keep controls concise and grouped.
```