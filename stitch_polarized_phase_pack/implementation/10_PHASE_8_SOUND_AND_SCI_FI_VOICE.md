# Phase 8: Sound Effects and Sci-Fi Voice Interpretation

## Context

This phase adds an audio layer that makes interpretation more cinematic and memorable without overwhelming learning clarity.
It introduces event-based sound effects plus narration voice output for interpretation text in a sci-fi lecture style.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Integrate audio using existing UI/state patterns and preserve performance.
- Include graceful fallback for autoplay restrictions and unsupported voice features.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Structured file plan, dependency-ordered steps, verification gate, rollback strategy, and troubleshooting coverage.

## Skills To Load

- `react-ui-patterns` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/react-ui-patterns/SKILL.md`
- `voice-agents` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/voice-agents/SKILL.md`
- `web-performance-optimization` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/web-performance-optimization/SKILL.md`
- `systematic-debugging` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/systematic-debugging/SKILL.md`
- `typescript-expert` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/typescript-expert/SKILL.md`

## Prerequisites

- Phase 7 complete (live interpretation present).
- Accessibility preferences are available (especially reduced motion and user preference storage).
- Existing simulation interactions are stable.

## Phase Init

```bash
cd /home/keni/Documents/upphysics/simulation-phy
npm run lint
npm run build
```

## Directory Structure

```txt
simulation-phy/
├── public/
│   └── audio/
│       ├── ambient-hum-loop.mp3                                         <- CREATE
│       ├── field-shift-soft.wav                                          <- CREATE
│       ├── dielectric-insert.wav                                         <- CREATE
│       └── discharge-pulse.wav                                           <- CREATE
├── src/
│   └── features/
│       └── simulation/
│           ├── audio/
│           │   ├── audio-event-map.ts                                    <- CREATE
│           │   ├── audio-mixer.ts                                        <- CREATE
│           │   ├── voice-profile.ts                                      <- CREATE
│           │   └── use-simulation-audio.ts                               <- CREATE
│           ├── hooks/
│           │   └── use-interpretation-voice.ts                           <- CREATE
│           └── components/
│               ├── audio-control-panel.tsx                               <- CREATE
│               └── voice-caption-chip.tsx                                <- CREATE
```

## File Init Checklist

- `src/features/simulation/audio/audio-event-map.ts`: maps simulation events to SFX cues and cooldown rules.
- `src/features/simulation/audio/audio-mixer.ts`: volume groups, mute state, and master limiter behavior.
- `src/features/simulation/audio/voice-profile.ts`: sci-fi narration parameters (voice, pitch, rate, emphasis).
- `src/features/simulation/audio/use-simulation-audio.ts`: event subscription and cue triggering.
- `src/features/simulation/hooks/use-interpretation-voice.ts`: voice synthesis of interpretation output.
- `src/features/simulation/components/audio-control-panel.tsx`: user controls for ambient/SFX/voice levels.
- `src/features/simulation/components/voice-caption-chip.tsx`: currently spoken line preview and speaking status.

## Instructions

### Step 8.1: Build Event-Driven Sound Effects Layer
**Files:** `src/features/simulation/audio/audio-event-map.ts`, `src/features/simulation/audio/audio-mixer.ts`, `src/features/simulation/audio/use-simulation-audio.ts` - CREATE

- Map key simulation events to audio cues:
  - major slider shift,
  - dielectric insert/change,
  - charge/discharge triggers,
  - act transition moments.
- Add per-event cooldown windows so repeated micro-interactions do not spam audio.
- Implement volume groups: `master`, `ambient`, `effects`, `voice`.

### Step 8.2: Add Interpretation Voice Narration
**Files:** `src/features/simulation/audio/voice-profile.ts`, `src/features/simulation/hooks/use-interpretation-voice.ts` - CREATE

- Narrate interpretation lines using browser speech synthesis first (low integration cost).
- Tune a sci-fi lecture profile using safe speech parameters (pitch/rate/voice selection) while keeping intelligibility.
- Queue only high-value interpretation updates and skip low-value repeated lines.
- Add fallback behavior for unsupported browsers: captions only, no crash.

### Step 8.3: Add User-Facing Audio Controls and Captions
**Files:** `src/features/simulation/components/audio-control-panel.tsx`, `src/features/simulation/components/voice-caption-chip.tsx` - CREATE

- Add controls for:
  - mute/unmute,
  - ambient level,
  - SFX level,
  - narration on/off.
- Add a compact caption chip showing the current spoken interpretation.
- Ensure all controls are keyboard and touch accessible.

### Step 8.4: Enforce Accessibility and Performance Guardrails
**Files:** `src/features/simulation/audio/use-simulation-audio.ts`, `src/features/simulation/hooks/use-interpretation-voice.ts` - MODIFY

- Respect reduced-motion/accessibility preferences for audio intensity and autoplay behavior.
- Require explicit user gesture before starting ambient loops when browser policy blocks autoplay.
- Keep audio processing lightweight and avoid per-frame object allocations in render loops.

## Interactive Requirements

- Users can hear event-based SFX when interacting with controls.
- Interpretation voice narrates key explanations when enabled.
- Users can disable narration or all audio instantly.
- Audio controls update without causing simulation lag.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Slider/material/circuit actions trigger appropriate SFX with cooldown (no spam).
- [ ] Voice narration reads interpretation text when narration is enabled.
- [ ] Unsupported voice/autoplay scenarios degrade cleanly to text-only captions.
- [ ] Muting audio silences ambient, SFX, and narration groups.

## Rollback Plan

- Remove audio module files and public audio assets.
- Revert UI integration points that mount audio controls/captions.
- Re-run lint/build and verify baseline simulation has no audio dependency errors.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| No sound after first load | Browser autoplay policy blocked playback | Require user gesture and show one-time audio start prompt |
| Voice sounds robotic or unclear | Bad voice profile selection | Add voice fallback ordering and safer pitch/rate defaults |
| Audio stutters during rapid interaction | Event spam without cooldown | Increase event cooldown and dedupe repeated cues |
| FPS drops when voice is active | Voice updates triggered too often | Narrate only significant interpretation updates with queueing |