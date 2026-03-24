# POLARIZED
### A Narrative 3D Web Simulation of Capacitance & Dielectrics
**Project Specification v2.0 — Multi-Audience + Interactive Simulator**

> *Where invisible forces become visible memories — and matter itself learns to hold a charge.*

| Topic | Stack | Format | Audience |
|---|---|---|---|
| Capacitance & Dielectrics | React · Three.js · R3F · GLSL | Narrative · 3D · Browser-Native | Universal — Layered by Mode |

---

## 01 — Vision

### The Premise

Most capacitance simulations hand you two plates and a slider. **POLARIZED** does something fundamentally different: it gives you a story, a set of tools, and the freedom to go as deep as you want.

> *"What if you could watch matter remember? Every capacitor is, at its core, a tiny vault — a place where invisible electric potential waits, patient and coiled, until something demands it back."*

From a curious 14-year-old stumbling onto the simulation for the first time, to an undergraduate using it as a study companion, to a professor embedding it into a lecture on dielectric polarization — POLARIZED speaks to all of them. Not by diluting the physics, but by layering it. The deeper you go, the more the simulation reveals.

### The Central Metaphor

A capacitor is a **memory**. A dielectric material is what makes that memory richer — denser, deeper, more capable. By the end of the simulation, users at every level don't just know the formula `C = κε₀A/d`. They've *felt* what κ (kappa) means, because they watched molecules inside a real material realign in real time, resisting and amplifying the field in one breathtaking moment.

---

## 02 — Audience

### Built for Everyone. Layered by Depth.

POLARIZED is not designed for one classroom level. It is designed for every person who has ever been curious about what electricity actually looks like. The simulation achieves this through a **mode-switching system** that adapts the interface, narration depth, math visibility, and available controls to the user's chosen level of engagement.

---

### Tier 1 — Curious Explorers
**Ages 12+, no physics background required**

- Story mode only — guided narrative arc
- Plain-language narration, zero equations shown
- Drag-and-drop interactions, no sliders
- Visual feedback replaces numerical readouts
- *Goal: feel the concept before naming it*

### Tier 2 — Students
**High school through undergrad, introductory physics**

- Full Three-Act narrative + equation overlays
- Real-time formula readouts (C, Q, U, V)
- Material comparison mode unlocked
- Guided discovery with checkpoint quizzes
- *Goal: connect visual intuition to math*

### Tier 3 — Advanced Learners
**Upper-year undergrads, researchers, engineers**

- Free Explore sandbox mode from the start
- Full parameter control panel exposed
- Molecular polarization math overlays (σ_b, P vector)
- Series/parallel multi-capacitor circuit builder
- *Goal: use as a precision modelling tool*

### Tier 4 — Educators
**Professors, teachers, curriculum designers**

- Embed mode for LMS (Canvas, Moodle, Blackboard)
- Presentation mode — lock parameters for lecture demos
- Annotation layer for adding custom text overlays
- Shareable simulation state via URL parameters
- *Goal: live, interactive lecture demonstration*

---

### Mode Tier Table

| Mode | Audience | What Is Unlocked |
|---|---|---|
| `STORY` | Curious Explorers, General Public | Guided narrative, no equations, drag-and-drop only |
| `STUDENT` | High School, Introductory Undergrad | Equations unlocked, material comparison, checkpoint questions |
| `ADVANCED` | Engineers, Researchers, Upper-Year | Full sandbox, molecular math, multi-capacitor builder, data export |
| `EDUCATOR` | Professors, Instructors, Teachers | Embed mode, lecture lock, annotation layer, URL state sharing |

The mode selection screen appears before the simulation loads — no gatekeeping, no sign-in required. Users can switch modes at any time from the settings panel without losing their current simulation state.

---

## 03 — Differentiation

### Why This Is Not a PhET Simulation

PhET's Capacitor Lab is exceptional — but it is a sandbox built for parameter exploration at a single audience tier. POLARIZED is an experience built for discovery across four audience tiers.

| Aspect | PhET → POLARIZED |
|---|---|
| **Audience** | Single level, assumed physics baseline → **Four layered tiers, from age 12 to professor** |
| **Structure** | Free sandbox, explore anything → **Three-Act narrative arc + unlockable free sandbox** |
| **Perspective** | Top-down 2D schematic view → **Immersive 3D orbital camera inside the field itself** |
| **Dielectric** | A colored rectangle that changes a number → **Thousands of animated molecular dipoles that visibly align** |
| **Field Lines** | Static vector arrows → **Real-time GLSL ray-marched lines that breathe and respond** |
| **Narrative** | Labels and tooltips → **Cartographer's Log — in-world narration that adapts to mode** |
| **Energy** | A bar graph in a panel → **Volumetric light density inside the gap — brighter = more energy** |
| **Embed** | Not LMS-embeddable → **Native iframe embed with URL param state, lock mode for lectures** |

---

## 04 — Narrative Structure

### The Three Acts of Matter & Memory

In Story and Student modes, the simulation is divided into three narrative acts. Each act introduces exactly one conceptual layer. In Advanced and Educator modes, the full sandbox is available immediately, but the acts remain accessible as guided walkthroughs.

---

#### Act I — The Void Between
> *"Before you can store anything, you must understand the space that holds it."*

The user arrives at a bare parallel-plate capacitor floating in deep space. No material. No dielectric. Just two conducting plates and the raw electric field between them.

**Concepts introduced:** Electric field `E = V/d`, capacitance `C = ε₀A/d`, charge `Q = CV`. The user manipulates plate area (A) and separation (d) and watches field lines respond in real time. Story mode users drag visually; Student mode users see the live equations change.

---

#### Act II — The Crystal Awakens
> *"Insert a material. Watch it remember who it is."*

A dielectric material slides into the gap. Thousands of molecular dipoles snap into alignment with the field. The user feels the field weaken as polarization opposes it, but the capacitance grows. Each material has a unique animation signature.

**Concepts introduced:** Dielectric constant κ, polarization, `C = κε₀A/d`, bound charges. Advanced users can also view the polarization vector field **P** and surface charge density σ_b overlaid on the geometry.

---

#### Act III — Memory & Release
> *"All stored energy is a promise. The circuit is how you keep it."*

A resistor connects to the capacitor. The user charges it — watching volumetric light fill the gap — then triggers discharge. The light floods through the circuit in real time, following the exponential decay `V(t) = V₀e^(-t/RC)`.

**Concepts introduced:** Energy stored `U = ½CV²`, RC time constant `τ = RC`, exponential decay. Student mode plots the curve in real time. Advanced mode exposes R and C sliders, a logarithmic scale toggle, and an exportable CSV of the discharge data.

---

### Narrative Arc

```
[ Arrive at empty plates ] → [ Map the field (Act I) ] → [ Insert dielectric (Act II) ] → [ Charge & discharge (Act III) ] → [ Free Explore unlocked ]
```

---

## 05 — Interactive Simulator

### Simulator Design & Control Architecture

The interactive simulator is the heart of POLARIZED. It is a browser-native, real-time 3D environment built in React Three Fiber, driven by a physics engine running entirely on the client. Every panel, every control, and every visual output described below exists as a **live, responsive UI element** — not a static diagram.

> *"The simulator is not a companion to the lesson. It is the lesson. Every formula is derived from something the user can touch."*

---

### 5A — The 3D Viewport

The central canvas occupies **70% of the screen** at 1440px wide. It is an interactive Three.js scene rendered via React Three Fiber. Users orbit, zoom, and pan freely using mouse or touch gestures. At key narrative moments, the camera executes cinematic transitions automatically.

#### 3D Capacitor Geometry

| Element | Description |
|---|---|
| **Plates** | Two PBR metallic rectangular plates with dynamic edge glow proportional to accumulated charge Q |
| **Gap** | Volumetric energy fog fills the space; brightness maps to `U = ½CV²` in real time |
| **Dielectric** | Translucent glass-refractive slab that slides in/out; tinted per material type |
| **Dipoles** | 2,000+ `InstancedMesh` capsule geometries rotating per the polarization model |

#### Camera & Navigation

| Control | Behaviour |
|---|---|
| **Default** | Isometric 3/4 orbit view — intuitive for all audience tiers |
| **Cinematic** | Auto dolly-zoom on Act transitions, focusing the molecular layer |
| **X-Ray** | Toggle between macroscopic and molecular view at any time (Advanced mode) |
| **Touch** | Full pinch-zoom and two-finger orbit for tablet and mobile users |

#### Field Line Shader (GLSL)

| Property | Detail |
|---|---|
| **Method** | Ray-marched fragment shader — recalculated every frame, not precomputed meshes |
| **Vacuum** | Cold cyan lines — sharp, parallel, aggressive in their order |
| **Dielectric** | Lines shift amber, compress and soften as κ increases inside the material |
| **LOD** | Fewer ray-march steps when camera is far; full density on close inspection |

#### Dipole Animation System

| Property | Detail |
|---|---|
| **Model** | Rotation angle `θ = arctan(E_applied / E_bind)` per material-specific binding constant |
| **Water** | Chaotic spin before alignment — spring physics via Cannon-es impulses |
| **Ceramic** | Rigid lattice flex — minimal rotation, immediate snap |
| **Idle** | Subtle thermal oscillation keeps material feeling alive at rest |

---

### 5B — Control Panel

The right-side control panel adapts its visible controls based on the active audience mode. Story mode shows minimal drag targets. Advanced mode exposes the full parameter surface. All sliders update the physics engine in real time with no perceptible lag.

| Control | Range & Behaviour |
|---|---|
| **Plate Area (A)** | 1 cm² to 100 cm². Drag plate corners in 3D (Story) or numeric slider (Student+). C grows proportionally as A increases. |
| **Separation (d)** | 1 mm to 20 mm. Drag plates apart or use slider. Field line density decreases; C drops inversely. |
| **Voltage (V)** | 0 to 500 V DC. Radial dial in Story; numeric slider in Student+. Drives `Q = CV` in real time. |
| **Dielectric Material** | Vacuum (κ=1), Water (κ=80), Borosilicate Glass (κ=4.7), Barium Titanate (κ=1200). Each triggers a unique molecular animation. |
| **Resistance (R)** | 10 Ω to 10 MΩ. Unlocked in Act III and Advanced mode. Controls RC time constant `τ = RC`. |
| **Custom κ** *(Advanced)* | Manual input 1 to 10,000. Allows exploration of arbitrary or hypothetical dielectric materials. |

---

### 5C — Live Readout Panel

The bottom strip shows computed physics quantities updating every animation frame. In Story mode, readouts are replaced by qualitative indicators (e.g. a charge meter that fills like a battery). In Student+ modes, precise numerical values with units are shown.

| Formula | Readout |
|---|---|
| `C = κε₀A/d` | Capacitance (pF – μF) |
| `Q = CV` | Charge stored (nC – μC) |
| `U = ½CV²` | Energy (nJ – mJ) |
| `V(t) = V₀e^(-t/RC)` | Discharge voltage (V) |
| `τ = RC` | Time constant (ms – s) |

---

### 5D — RC Discharge & Circuit Visualizer

When the discharge circuit is triggered in Act III or Advanced mode, the simulator activates three simultaneous visualisations: the 3D energy drain, the resistor heat glow, and the real-time decay curve below the viewport.

#### 3D Discharge Animation

| Element | Description |
|---|---|
| **Energy Fog** | Volumetric light in the gap drains following `V(t) = V₀e^(-t/RC)` — visually accurate to the curve |
| **Wire Stream** | Custom particle emitter fires charge carriers along the circuit path; speed proportional to current `I(t)` |
| **Resistor** | Glows red-orange with heat; luminosity maps to instantaneous power `P = I²R` |
| **Duration** | Discharge runs for 5τ by default; user can pause, rewind, or step frame-by-frame (Advanced) |

#### Live Decay Curve Plot

| Property | Detail |
|---|---|
| **Chart** | Real-time line chart below the 3D viewport using a lightweight canvas renderer |
| **Axes** | X = time (ms or s adaptive), Y = voltage V(t) — both auto-scale to current RC values |
| **Overlay** | Theoretical `e^(-t/RC)` plotted as a dashed reference line against simulated data |
| **Export** | Advanced mode: download discharge data as CSV for external analysis or lab reports |

---

### 5E — Material Comparison Mode

Available from Act II onward. The viewport splits vertically into two independent simulation instances running at identical voltage and plate geometry, each with a different dielectric. Molecular animations, field lines, energy fog, and all readouts run in parallel. Users directly see why κ matters.

**Split-View Architecture:** Two separate R3F rendering contexts share the same WebGL canvas using a **scissor-test technique**, allowing both scenes to update at 60fps with minimal additional GPU cost. The shared physics tick runs once, applying computed C and U values to both contexts simultaneously. State is managed in a single Zustand store with `left` / `right` namespacing.

---

### 5F — Educator Embed & Presentation Mode

Educators can embed POLARIZED into any LMS via a standard `<iframe>`. A URL parameter system allows professors to pre-configure the simulation state for specific lecture moments.

| Feature | Description |
|---|---|
| **URL Params** | `?mode=educator&d=5mm&kappa=80&lock=d,kappa` — pre-sets separation and dielectric, then locks those sliders for a controlled demo |
| **Present Mode** | Hides the full control panel; only a minimal toolbar is visible for projection. Instructor controls from a second tab with the full panel. |
| **Annotation** | Floating text-overlay tool lets instructors add callout labels directly on the 3D viewport. Labels persist in URL state for sharing. |
| **LMS Compat.** | Tested in Canvas, Moodle, Blackboard, and Google Classroom. SCORM 1.2 wrapper available for completion tracking. |

---

## 06 — Physics Model

### Mathematical Engine

All physics is computed client-side in real time. The model is accurate enough to teach, fast enough to feel alive, and transparent enough for advanced users to inspect.

| Formula | Description |
|---|---|
| `C = κε₀A / d` | Core capacitance equation |
| `Q = C · V` | Charge on plates |
| `U = ½CV²` | Stored energy |
| `V(t) = V₀e^(-t/RC)` | Exponential discharge (RK4 solver) |

### Dielectric Polarization Model

Each dipole is a Three.js `InstancedMesh` with rotation driven by:

```
θ = arctan(E_applied / E_bind)
```

where `E_bind` is a material-specific binding energy constant. Bound surface charge density is rendered as an emergent glow:

```
σ_b = P · n̂
```

where **P** is the polarization vector and **n̂** is the outward normal.

The RC discharge curve is solved with a **4th-order Runge-Kutta integrator** with adaptive step size, ensuring visual smoothness across a τ range of 0.1s to 10s.

---

## 07 — User Experience

### The Cartographer's Journey

The onboarding flow adapts to the selected audience mode. Every interaction is designed so that even a first-time user understands what to do within 10 seconds of landing.

**`01` Mode Selection Screen**
A clean landing page presents the four audience modes as illustrated cards. No login required. One click sets the mode and loads the appropriate simulation state.

**`02` Cold Open — The Arrival**
The simulation opens with darkness. Two glowing plates materialise. A single line appears: *"There is a field here. You cannot see it yet. But it is there."* Story mode: the user clicks the plates. Advanced mode: the full control panel is already visible.

**`03` Discovery — Mapping the Field**
Field lines snap into existence. Story users drag plate handles. Student users see live equations change. Each significant change triggers a Log entry in plain language. One sentence. One insight.

**`04` The Reveal — Inserting the Dielectric**
A material selector appears. The user drags a material into the gap. The molecular animation cascade triggers. Story users see descriptive language; Student users see κ appear in the formula; Advanced users see the polarization vector field activate.

**`05` Comparison Mode**
A split-view appears with two simultaneous simulations. Story mode: visual comparison. Student+: full numerical readout side-by-side. The emotional punch: barium titanate next to vacuum makes the capacitance difference visceral.

**`06` The Release — RC Discharge**
A circuit element appears. The user triggers discharge. The energy fog flows out. The decay curve plots in real time. Advanced users can pause mid-discharge to inspect instantaneous current and power. Log entry: *"All that stored potential, gone in a breath."*

**`07` Free Explore / Educator Mode**
Story/Student users unlock the sandbox. Educators access lecture lock and annotation tools. Advanced users build multi-capacitor circuits and export data. The simulation becomes a tool, not just a story.

---

## 08 — Material Library

### Four Dielectrics, Four Personalities

Each material has its own visual identity, molecular animation signature, and narrative role. They are not just numbers — they are characters.

| Material | κ | Personality | Visual |
|---|---|---|---|
| **Vacuum** | 1.0 | *The Baseline* — no molecules, no polarization, pure raw field | Cold cyan sharp parallel lines. The reference all others are measured against. |
| **Water** | ≈ 80 | *The Chaos that Obeys* — dipoles spin violently before snapping into alignment | Warm blue-white turbulence resolving into order. Dramatic capacitance jump. |
| **Borosilicate Glass** | ≈ 4.7 | *The Reluctant Rememberer* — dipoles barely flex, stiff and modest | Translucent crystalline slab with subtle internal light scattering. |
| **Barium Titanate** | ≈ 1200 | *The Amplifier* — cascading crystalline domain alignment, field nearly vanishes inside | The climactic Act II revelation. Even Advanced users pause when they see this. |

---

## 09 — Technical Stack

### Architecture & Implementation

```
Frontend Framework   React 18
3D Rendering         React Three Fiber · Three.js r160
Shaders              GLSL (custom fragment shaders)
Post-Processing      @react-three/postprocessing
3D Helpers           @react-three/drei
Physics              Cannon-es (dipole spring dynamics)
ODE Solver           Custom 4th-order Runge-Kutta
Math                 Math.js
State Management     Zustand
UI Animation         Framer Motion
Data Visualization   Chart.js (decay curve)
Build Tool           Vite
Deployment           Vercel
Optional Backend     Supabase (save states, user data)
LMS Integration      SCORM 1.2 wrapper
```

### Performance Targets

The simulation must run at **60fps** on a mid-range laptop with integrated GPU, and at **30fps** on a modern mobile device.

Key optimisations:
- `InstancedMesh` for all 2,000+ dipole geometries
- Frustum culling on off-screen dipoles
- Field line shader LOD (fewer ray-march steps when camera is far)
- React state isolated from the R3F render loop via Zustand middleware
- Split-view comparison mode uses WebGL **scissor testing** to render two scenes in one canvas draw call

---

## 10 — Pedagogy

### Teaching Without Teaching

The simulation never *explains* — it *reveals*. Every concept is introduced through a visual moment before a mathematical label is attached. This principle holds across all four audience modes, with the depth of label varying by tier.

| Principle | Detail |
|---|---|
| **Experience first, formula second** | The user sees field lines compress before they see `C = κε₀A/d`. The formula confirms what they already feel. |
| **No jargon without translation** | Every physics term appears first in plain English, then in its symbol. *"The material weakens the field — physicists call this the dielectric constant, κ (kappa)."* |
| **One idea per moment** | Log entries appear one at a time. Each act ends with a single-sentence summary a student could write on the back of their hand. |
| **Checkpoint quizzes** | Brief multiple-choice prompts appear between acts in Student mode. No grade, no pressure — just a moment to consolidate. |
| **Data export** | Advanced mode: discharge data, capacitance values, and polarization measurements exportable as CSV for coursework and lab reports. |
| **Accessibility** | Full keyboard navigation, ARIA labels, reduced motion mode. Molecular animation simplifies to a static indicator. Color-blind modes replace cyan/amber with shape-coded overlays. |

---

## 11 — Project Scope & Phases

| Phase | Duration | Deliverable |
|---|---|---|
| **Phase 1** | 4 weeks | Core physics engine + 3D scene. Capacitance model, GLSL field line shader (vacuum), plate geometry, basic parameter controls. Proves 60fps loop. |
| **Phase 2** | 3 weeks | Dielectric system + material library. Instanced dipole mesh, per-material alignment model, bound charge glow, material selector, Act II narrative. |
| **Phase 3** | 3 weeks | RC circuit + discharge visualizer. RK4 discharge solver, particle wire stream, energy fog, real-time decay curve chart, Act III narrative. |
| **Phase 4** | 2 weeks | Audience mode system + comparison mode. Mode selector, adaptive UI per tier, split-view comparison, checkpoint quiz layer, Educator annotation tools. |
| **Phase 5** | 2 weeks | Narrative polish + post-FX. Cartographer's Log system, cinematic cameras, bloom/DOF/FXAA, audio design (hum, snap, discharge), accessibility audit. |
| **Phase 6** | 1 week | Deploy + LMS integration. Vercel deploy, iframe embed, URL param state system, SCORM wrapper, data export (CSV), cross-browser QA. |

**Total estimated timeline: 15 weeks**

---

*POLARIZED · Simulation Project Specification v2.0 · React · Three.js · R3F · GLSL · WebGL*
