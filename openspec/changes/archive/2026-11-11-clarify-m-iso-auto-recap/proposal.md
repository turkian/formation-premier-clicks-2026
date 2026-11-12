# Proposal

## Why

The session 3 recap panel `rappel-m-iso-auto` is titled « M et l'ISO auto ». On the mode dial,
`M` reads as *manuel*, so a beginner expects to set everything themselves. With ISO auto that is
not the case: it is a semi-automatic mode. The photographer keeps the two choices that shape the
image, the aperture and the speed, and the camera keeps the exposure. The title names the letter
and leaves the misconception in place. The next screen, « Ce que l'appareil ne décide pas », is
about what the camera still decides, so the recap should already say who decides what.

## What Changes

- Rewrite the projected headline (the claim) of `rappel-m-iso-auto` in `lecons/3.yaml` so it
  names the kind of mode, without the letter: « Un mode à moitié automatique : vous gardez
  l'ouverture et la vitesse, l'appareil choisit l'ISO. »
- Retitle the screen « Un mode à moitié automatique » (browser tab and list of screens).
- Add one line after the list that names `M` as where to find the mode: « Sur la molette :
  `M`, avec l'ISO auto. »
- Keep the screen `id`, so its URL `/lecons/3/retour/rappel-m-iso-auto/` does not change.
- Keep the list, the callout on `+/−`, the aside, the tone and the icon.
- Out of scope: the session 2 screen `m-et-iso-auto` (the session has been given), the
  « Avant de déclencher » sheet, the exercises and brand pages, where « mode `M` avec l'ISO
  auto » in running text is fine.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that the session 3 manual-mode recap presents the mode as
  half-automatic in its headline, and names `M` only in its body, as the dial position.

## Impact

- Content: `src/src/content/lecons/3.yaml`, screen `rappel-m-iso-auto` (title, claim and one
  body line).
- No change to components, schema, scripts, URLs or media.
