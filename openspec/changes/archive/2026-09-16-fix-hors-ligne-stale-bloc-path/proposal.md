## Why

`npm run verifier:hors-ligne` crashes (uncaught `TimeoutError`, exit code 1) instead of reporting
a failure. `src/scripts/verifier-hors-ligne.mjs` hardcodes a `parcours` of routes under
`/lecons/1/profondeur-de-champ/...`, but that bloc was merged into `ouverture-et-profondeur-de-champ`
(commit `a74f577`, "reflow") — the parent bloc id changed while its écran ids stayed the same. The
script navigates to a 404, then times out waiting for `[data-pdc]` (which only exists on the real,
current route), crashing the whole Node process rather than recording one more failed check.

## What Changes

- Update the three stale route strings in `verifier-hors-ligne.mjs`'s `parcours` array from
  `/lecons/1/profondeur-de-champ/...` to `/lecons/1/ouverture-et-profondeur-de-champ/...`, matching
  the bloc's current id.

## Capabilities

No spec-level behavior changes — this fixes a stale reference in build-time test tooling; the
site's behavior is unaffected.

## Impact

- Build tooling: `src/scripts/verifier-hors-ligne.mjs` (three string literals).
