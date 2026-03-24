# Phase 6: Deployment, Embed Integration, and Data Export

## Context

This phase finalizes classroom delivery workflows: shareable URLs, embed snippets, and data exports.
The release must remain no-auth and fully reproducible through URL/state only.

## Prompt Alignment

FeatureCraft alignment (`feature-implementation-prompt.md`):
- Complete shipping stage with docs, verification, and follow-up readiness.
- Ensure deployment tooling does not introduce account dependencies.

BuildCraft alignment (`implementation-guide-prompt.md`):
- Includes file map, ordered instructions, verification gate, rollback plan, and troubleshooting table.

## Skills To Load

- `deployment-procedures` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/deployment-procedures/SKILL.md`
- `vercel-deployment` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/vercel-deployment/SKILL.md`
- `documentation-templates` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/documentation-templates/SKILL.md`
- `verification-before-completion` - `/home/keni/Documents/upphysics/simulation-phy/variation_04_deep_tagalog/skills/verification-before-completion/SKILL.md`

## Prerequisites

- Phases 0-5 complete.
- Interactions verified in local development.

## Phase Init

```bash
cd /home/keni/Documents/upphysics/simulation-phy
npm run lint
npm run build
```

## Directory Structure

```txt
simulation-phy/
├── README.md                                                      <- MODIFIED
├── .env.example                                                   <- MODIFIED
├── src/
│   └── features/
│       └── simulation/
│           ├── components/
│           │   ├── embed-config-panel.tsx                         <- CREATE
│           │   ├── embed-preview-pane.tsx                         <- CREATE
│           │   └── export-tools-panel.tsx                         <- CREATE
│           └── utils/
│               ├── embed-iframe.ts                                <- CREATE
│               ├── state-share.ts                                 <- CREATE
│               └── export-session-json.ts                         <- CREATE
└── docs/
    ├── educator-embed-guide.md                                    <- CREATE
    └── release-checklist.md                                       <- CREATE
```

## File Init Checklist

- `src/features/simulation/components/embed-config-panel.tsx`: preset and lock config form.
- `src/features/simulation/components/embed-preview-pane.tsx`: embed preview and preset switcher.
- `src/features/simulation/components/export-tools-panel.tsx`: CSV/JSON/screenshot actions.
- `src/features/simulation/utils/embed-iframe.ts`: iframe HTML generator.
- `src/features/simulation/utils/state-share.ts`: share URL builder.
- `src/features/simulation/utils/export-session-json.ts`: versioned JSON export.
- `docs/educator-embed-guide.md`: LMS integration instructions.
- `docs/release-checklist.md`: release gate checklist.

## Instructions

### Step 6.1: Implement Embed Config and Preview
**Files:** `src/features/simulation/components/embed-config-panel.tsx`, `src/features/simulation/components/embed-preview-pane.tsx` - CREATE

- Add controls for mode preset, lock state, default material, and default plate distance.
- Render live query preview and embed preview pane.
- Include LMS presets: Canvas, Moodle, Blackboard, Google Classroom.

### Step 6.2: Implement Share and Embed Utilities
**Files:** `src/features/simulation/utils/embed-iframe.ts`, `src/features/simulation/utils/state-share.ts` - CREATE

- Serialize current simulation state to URL-safe query parameters.
- Generate copy-ready iframe snippet.
- Ignore unsupported keys and sanitize output.

### Step 6.3: Implement Export Panel
**Files:** `src/features/simulation/components/export-tools-panel.tsx`, `src/features/simulation/utils/export-session-json.ts` - CREATE

- Provide:
  - CSV export for discharge samples,
  - JSON export for full session state,
  - optional screenshot trigger if platform support exists.
- Include `schemaVersion` in JSON export.

### Step 6.4: Update Docs for Shipping
**Files:** `README.md`, `.env.example`, `docs/educator-embed-guide.md`, `docs/release-checklist.md` - MODIFY/CREATE

- Add deployment and embed quickstart.
- Document exact command flow for local preview and deployment.
- Keep no-auth policy explicit in docs.

## Interactive Requirements

- Changing embed settings updates preview query instantly.
- Copy actions provide clear success feedback.
- Export actions download usable files without breaking app state.
- Reopening shared URL restores expected mode and controls.

## Verification Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `npm run preview` starts and renders correctly.
- [ ] Shared URL round-trip restores state correctly.
- [ ] Iframe snippet is valid and copy-ready.
- [ ] CSV and JSON exports contain expected fields.

## Rollback Plan

- Remove embed/export components and utility files.
- Revert README/docs updates if release path changes.
- Re-run lint/build to confirm baseline.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Shared URL misses state fields | Serializer does not include all active controls | Maintain one state schema and test round-trip restore |
| LMS iframe fails to load | Invalid source URL or host restrictions | Verify origin, encoded params, and target platform policy |
| Export JSON cannot be consumed later | Missing versioning and stable keys | Add `schemaVersion` and backwards-safe field naming |
