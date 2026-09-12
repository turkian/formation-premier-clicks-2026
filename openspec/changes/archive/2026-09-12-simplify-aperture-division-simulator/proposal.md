## Why

The aperture simulator screen (`le-f-est-une-division`, immediately after the `f/2.4` vs `f/22`
quiz) currently claims that the same `f`-number gives "the same exposure on any lens, any brand,
for a hundred years." That claim is baked into the spec itself
(`interactive-components`'s "same f-number on two different lenses" scenario requires the
component to state it) but it overreaches: the `f`-number is a geometric ratio, not a measured
light transmission, and two lenses at the same `f`-number can pass measurably different amounts
of light depending on element count, coatings, and design — which is exactly why cinema lenses
are rated in T-stops instead of `f`-stops. For a beginner audience this is misleading, not merely
imprecise.

The screen also introduces a brand-new comparison (24 mm vs 200 mm at `f/2.8`) instead of
building on the `f/2.4` vs `f/22` numbers the room just used to answer the preceding quiz,
adding new numbers to hold in mind right where reusing familiar ones would resolve the quiz
concretely. Combined with a wordy `aparte` and three single-purpose preset buttons, the screen
carries more text and controls than the point requires.

## What Changes

- Rework `OuvertureDivision.astro` from "one shared focal-length slider + a hardcoded
  comparaison toggle" to **two independent lens panels**, each with its own focal-length slider
  and its own `f`-number slider.
- Change the default state from 24 mm/200 mm at `f/2.8` to **both lenses at 50 mm, one at
  `f/2.4` and one at `f/22`** — continuing directly from the previous screen's quiz instead of
  introducing new numbers. The room can still reach a same-`f`-number, different-focal-length
  comparison by hand afterward, same as any other combination.
- **Drop the "same exposure" claim** everywhere it appears (the yaml `aparte` and the
  component's generated text). The component states the computed diameters and how many times
  larger one is than the other; it never asserts anything about exposure being equal (or
  unequal) across lenses.
- Remove the three hardcoded preset buttons (`24-200`, `kit`, `400`) — two independent slider
  pairs already reach any state a preset would, and a static "kit" button was never a real
  implementation of the kit-zoom-narrows-with-focal-length behavior the spec asks for (see
  Capabilities below).
- Add `2.4` to the shared `CRANS_OUVERTURE` list in `profondeur-de-champ.ts` so the default
  state can show the exact quiz value rather than the nearest existing step.
- **BREAKING** (internal only): `OuvertureDivision.astro`'s props change shape, from
  `focale`/`ouverture`/`comparaison` to two independent focale/ouverture pairs. The only caller
  (`lecons/1.yaml`, screen `le-f-est-une-division`) is updated in this same change.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
- `interactive-components`: the "The `f/` notation is shown as a division" requirement's
  "same f-number on two different lenses" scenario no longer asserts equal exposure — it
  describes only the diameter comparison. The "A kit-lens preset constrains aperture by focal
  length" requirement is narrowed to the depth-of-field component only; the aperture/division
  component is no longer required to offer a kit-zoom preset.

## Impact

- `src/src/content/lecons/1.yaml` — screen `le-f-est-une-division`: `claim`, `props`, `aparte`.
- `src/src/components/interactifs/OuvertureDivision.astro` — markup, props, and script
  reworked for two independent lens panels; preset buttons removed.
- `src/src/lib/profondeur-de-champ.ts` — `CRANS_OUVERTURE` gains `2.4`.
- `openspec/specs/interactive-components/spec.md` — delta for the two modified requirements
  above.
