## Why

The `le-quatrieme-facteur` screen (leçon 1, bloc `profondeur-de-champ`) is a single
accumulating concept panel with three states: the concept stated neutrally, the
misconception framed as a warning (`ton: avertissement`), and the fix. It is the one factor
in this bloc's four-factor explanation that has no photographic proof — every other claim in
the bloc is either a table or backed by a diagram, while this one asks the room to take the
"f/1.8 does not guarantee a blurred background" claim on faith. The proof photos for exactly
this claim already exist, but they are attached to a different screen three screens later
(`demo-ouverture-et-fond`, bloc `ouverture`), where they sit alongside an unrelated aperture
comparison — so the room sees the claim once without evidence, and the evidence once,
disconnected, without the claim that motivates it.

## What Changes

- Splits `le-quatrieme-facteur` into three screens, replacing its three accumulating states:
  - `le-probleme` (concept panel, static, no states) — merges the current state 1 (the
    factor stated neutrally) and state 2 (the misconception). Restated as a plain problem
    statement rather than a flagged warning: `ton: neutre`, no `icone`, the "beaucoup
    achètent un objectif lumineux…" framing dropped as editorializing rather than the claim
    itself.
  - `la-solution` (concept panel, static) — the current state 3 unchanged in substance
    (`ton: regle`): move the subject away from the background, or move closer to the
    subject.
  - `exemple-fond-flou` (demonstration screen, new) — a single comparison series, variable
    "la distance entre le sujet et le fond", carrying the `l1-pdc-fond-colle` /
    `l1-pdc-fond-loin` image pair.
- Moves the `l1-pdc-fond-colle` / `l1-pdc-fond-loin` comparison series out of
  `demo-ouverture-et-fond` (bloc `ouverture`) into the new `exemple-fond-flou` screen, so the
  claim and its proof sit together instead of three screens apart.
- `demo-ouverture-et-fond` keeps only its aperture series (f/1.8 / f/5.6 / f/11) and is
  retitled and rewritten accordingly, since its current claim and `aparte` ("l'une demande un
  réglage, l'autre ne demande que de bouger" / "sans elle, la moitié de la salle conclut...")
  are written to contrast the two factors and no longer make sense with only one.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ The lessons spec already grants everything used here: a static concept panel with
one callout (`le-probleme`, `la-solution`), and a demonstration screen with a comparison
series captioned by its single varying value (`exemple-fond-flou`). No requirement changes;
`skip_specs: true` is set accordingly.

## Impact

- Content: `src/src/content/lecons/1.yaml`
  - Bloc `profondeur-de-champ`: `le-quatrieme-facteur` (3 states) replaced by `le-probleme`,
    `la-solution`, `exemple-fond-flou` (3 screens), in that order.
  - Bloc `ouverture`: `demo-ouverture-et-fond` loses its second comparison series and gets a
    new claim/titre/aparte scoped to aperture alone.
- Navigation: the bloc `profondeur-de-champ` grows from 8 to 10 screens, but the lesson's total
  stop count is unchanged (40 before and after) — the 3 accumulating states of
  `le-quatrieme-facteur` become 3 single-state screens, so every later screen's position
  indicator (`N / 40`) is unaffected. No screen `id` outside this bloc and `ouverture` changes.
