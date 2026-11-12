# Proposal

## Why

On a concept panel whose body is two or three cards side by side, the claim is held to a
24-character measure meant for single-column text panels. It wraps into three or four short lines
over the left third of the screen while the cards below span the full width. The claim looks
orphaned, and it takes vertical room the photographs need, especially on a 4:3 projector. Session
3's « Placer » screen shows the problem most clearly: its 92-character claim fills four lines.

## What Changes

- On a concept panel with columns, the claim spans the full width of the screen, as the cards do.
  This applies to all 12 such panels (sessions 2 and 3), not just « Placer ».
- Concept panels without columns keep their current short measure.
- Claims too long for one line stay as they are: two wide lines are acceptable.
- Session 3's « Placer » claim is shortened to fit on one line:
  « Décentré ou centré — franchement. Jamais entre les deux. » (The wording is the recommended
  option from the exploration. The user can still adjust it before apply.)

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that a concept panel with columns states its claim across the full
  width of its cards.

## Impact

- `src/src/components/ecrans/Panneau.astro`: marks panels that carry columns.
- `src/src/styles/lecon.css`: the 24ch claim cap no longer applies to those panels.
- `src/src/content/lecons/3.yaml`: new `placer` claim.
- Visual change on the 12 panels with columns: `la-decision`, `qu-est-ce-que-l-iso` and
  `le-raisonnement` (session 2); `rappel-vitesse`, `rappel-iso`, `simplifier`, `nettoyer`, `placer`,
  `donner-de-la-profondeur`, `guider-l-oeil`, `structurer` and `respirer` (session 3).
