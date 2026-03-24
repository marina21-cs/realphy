# POLARIZED Global Design Lock

Use this block as a prefix before each phase prompt so the design stays connected.

```txt
Design language lock for all POLARIZED screens:
- Product: POLARIZED, a narrative 3D web simulation of capacitance and dielectrics.
- Tone: Scientific wonder, cinematic but minimal, never gamey, never generic SaaS.
- Theme: Dark mode matrix-lab + subtle glassmorphism.
- Style goal: Looks like a precision instrument, not a school worksheet.
- Uniqueness goal: Must feel unlike common web simulators by combining story, lab controls, and molecular 3D overlays in one coherent UI.

Color system (fixed tokens):
- --bg-0: #05090B
- --bg-1: #0A1114
- --bg-2: #0F171B
- --grid-line: #163029
- --glass-fill: rgba(16, 30, 28, 0.56)
- --glass-stroke: rgba(119, 255, 197, 0.18)
- --text-primary: #E8FFF4
- --text-secondary: #9CC4B8
- --text-muted: #6F8A82
- --accent-neon: #57FFA8
- --accent-cyan: #43E6FF
- --accent-amber: #FFC66D
- --accent-danger: #FF6D8B

Typography (fixed):
- Heading font: Syne (700, 800)
- Body font: IBM Plex Sans (400, 500, 600)
- Data/metrics font: JetBrains Mono (500, 700)
- Do not use Inter, Roboto, Arial, or system default stacks.

Layout system (fixed):
- Desktop viewport: 1440px
- Main container: max-width 1280px, centered
- Grid: 12 columns, 24px gutter
- Canvas zone: about 70% width in simulation screens
- Panel radius: 16px
- Control radius: 10px
- Vertical section rhythm: 28px / 56px / 84px increments

Visual surfaces (fixed):
- Glass panels: backdrop-filter blur(14px), translucent fill, 1px neon-tinted border.
- Shadows: layered, soft, dark: 0 8px 30px rgba(0,0,0,0.35).
- Matrix atmosphere: subtle line grid and faint scanline texture at very low opacity.

Motion language (fixed):
- Enter animation: staggered reveal from 14px translateY with 160ms intervals.
- Hover transitions: 180ms ease-out.
- Important state changes: glow pulse under 800ms, no aggressive motion spam.

3D interaction principles (fixed):
- 3D serves understanding, never decoration only.
- Always include loading state with progress percentage.
- Always include mobile-safe fallback behavior notes.
- Include at least one interaction cue for mouse and one for touch.

Frontend implementation guardrails (for handoff fidelity):
- Keep clear Suspense loading placeholders for heavy 3D areas.
- Keep controls grouped by feature and mode, avoid clutter.
- Reserve dedicated places for equations and live readouts.
- No layout-jumping loaders.
```