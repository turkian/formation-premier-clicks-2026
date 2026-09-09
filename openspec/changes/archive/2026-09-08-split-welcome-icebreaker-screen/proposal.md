## Why

The `bienvenue` screen (bloc `accueil`, séance 1) currently mixes two unrelated jobs in one
`corps` region: the framing bullets that set expectations for the whole formation, and the
instructions for the icebreaker exercise (table introductions). A single repère screen is meant
to make one thing legible at a glance from the back of the room; this one asks the room to hold
a cadrage message and a table-activity instruction at the same time, and the icebreaker's
`aparte` about the third question gets buried under unrelated bullets above it.

## What Changes

- Split the `bienvenue` screen into two screens inside the `accueil` bloc:
  - `bienvenue` keeps only the three framing bullets (claim unchanged, `aparte` removed).
  - a new `tour-de-table` screen carries the icebreaker instructions (the three numbered
    questions) and the existing `aparte` about the third question.
- Add a new `repere` variante, `activite`, for screens that hand the room a participant exercise
  to run right now (as opposed to `ouverture`, `pause`, `questions`, `transition`, `cloture`,
  none of which fit an in-block activity). Give it its own badge label in `Repere.astro`.
- Extend the phone-handoff rule so an `activite` screen also carries a scannable code, the same
  way an `appareil en main` screen does today — participants are turned toward their tablemates,
  not the projector, during the exercise.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `lessons`: the "A screen is the unit, and a block is a small number of screens" requirement's
  repère kind gains a recognized `activite` variante for participant exercises; the "Phone
  handoff is offered only where phone use helps" requirement's condition for showing a scannable
  code is extended to include `repere` screens with variante `activite`.

## Impact

- `src/src/content/lecons/1.yaml`: split the `bienvenue` écran into `bienvenue` + `tour-de-table`.
- `src/src/content.config.ts`: add `'activite'` to `ecranRepere.variante`'s enum.
- `src/src/components/ecrans/Repere.astro`: add an `ÉTIQUETTES.activite` badge label.
- `src/src/lib/lecon.ts`: extend `porteLeCodeQr` to return true for `repere`/`activite`.
- `src/scripts/verifier.mjs`: extend the build-time QR check (`verifierCodesQr`) with the same
  `activite` condition — it reimplements the `porteLeCodeQr` rule independently and would fail
  the build otherwise.
