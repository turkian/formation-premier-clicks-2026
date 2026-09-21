## Why

`docs/` was the animateur's private production carnet (timing, team, material,
animator briefing sheets, station missions, prep/follow-up checklists,
parrainage plan) for a facilitation workflow that is no longer in use. `src/`
is now the sole up-to-date source of content for the site. Keeping `docs/`
around leaves dead content in the repo and stale prose in several files that
still describe a `docs/` ↔ site adaptation workflow that no longer applies.

## What Changes

- **BREAKING**: Delete the entire `docs/` directory (all three sessions'
  avant/après files, `Documents/`, the manufacturer lexicon source sheets,
  `plan-de-cours.md`, and `docs/README.md`).
- Remove the "Partage docs/ ↔ site" section from `openspec/config.yaml`
  (the docs/-adaptation rule it documents no longer applies).
- Update the provenance comments in `src/content/lecons/1.yaml`, `2.yaml`,
  `3.yaml` that cite `docs/Session N/...` as their source, and the comment in
  `src/pages/plan-de-cours.astro` that cites `docs/Documents/plan-de-cours.md`.
- Reword the two comments in `src/scripts/verifier-contenu-final.mjs` that
  justify the "logistics vocabulary" and "séance ce soir" content checks by
  referencing `docs/` — the checks themselves stay (they guard against
  animator-only language leaking onto participant-facing screens regardless
  of whether `docs/` exists), only the now-inaccurate `docs/` framing in the
  prose changes.
- Out of scope: `src/README.md`'s mention of `docs/` is handled by the
  separate `rework-readme` change.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — this is a content/tooling removal with no change to the site's
observable behavior; `skip_specs: true` is set for this change)

## Impact

- Deletes `docs/` (repo content only, never built into the site — no build
  output, routes, or `src/` behavior change).
- Touches prose/comments in `openspec/config.yaml`,
  `src/scripts/verifier-contenu-final.mjs`, `src/content/lecons/*.yaml`,
  `src/pages/plan-de-cours.astro`. No logic changes to the verifier's checks.
- Coordinates with the `rework-readme` change, which owns the `docs/` mention
  inside `src/README.md`.
