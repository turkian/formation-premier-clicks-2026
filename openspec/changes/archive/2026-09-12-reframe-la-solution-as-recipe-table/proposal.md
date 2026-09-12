## Why

The `la-solution` screen (leçon 1, bloc `ouverture-et-profondeur-de-champ`) currently states one
instruction for one goal: "Éloignez votre sujet du fond, ou rapprochez-vous de lui" (blur the
background). It is silent on aperture and focale as levers even though this same bloc already
teaches both (`les-quatre-leviers`, `ce-qui-change-l-epaisseur`), and it never addresses the
inverse goal — a participant who wants the background to stay legible (group photo, environmental
portrait) gets no guidance at all. The screen also closes on a "distance is free, beats an
expensive lens" framing that pits money against technique, when the more useful takeaway is that
understanding the four levers may remove the need for new gear entirely.

## What Changes

- Reshape `la-solution` from a single-instruction panel into a static concept panel carrying a
  recipe table: rows are the four levers already established in this bloc (distance au sujet,
  distance du fond, focale, ouverture), columns are the two opposite goals (fond flou / fond net),
  each cell a directional instruction (e.g. "rapprochez-vous" / "éloignez-vous").
- Rewrite the screen's `claim` to state that each lever reverses depending on which goal you want,
  replacing the current single-direction claim.
- Rewrite the screen's `encadre` to close on "you may not need a new lens, you need to understand
  how it works," replacing the current "c'est gratuit... objectif à mille dollars" framing.
- `le-probleme` and `exemple-fond-flou`, the screens immediately before and after, are unchanged —
  this is scoped to `la-solution` alone. No merge of screens is happening; that direction was
  considered and dropped in favor of this reshape.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ `lessons` already grants a static concept panel with exactly one highlighted callout
carrying arbitrary body content, including a table (the sibling screens `trois-frustrations`,
`paysage-deux-causes`, and `ce-qui-change-l-epaisseur` in this same bloc already use a table as a
static panel's body). No requirement changes; `skip_specs: true` is set accordingly.

## Impact

- Content: `src/src/content/lecons/1.yaml`
  - Bloc `ouverture-et-profondeur-de-champ`, screen `la-solution`: `claim`, `corps` (prose →
    table), and `encadre` rewritten. `id`, `titre`, `genre`, `ton` unchanged. No other screen in
    the bloc changes.
