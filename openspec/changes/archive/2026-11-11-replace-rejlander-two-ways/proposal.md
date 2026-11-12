## Why

Session 3's screen « La photo devient un art » shows Oscar Gustave Rejlander's « The Two Ways of
Life » (1857). The allegory includes several nude figures, and the animateur does not want nudity
projected in front of the club. The image goes. Its replacement must still show what the screen
argues: photography first earned respect by composing like painting, with posed models, placed
groups and several negatives combined into one print.

## What Changes

- **Replace** Rejlander's « The Two Ways of Life » with Henry Peach Robinson's « Bringing Home
  the May » (1862). It is a wide outdoor scene of young women and girls gathering hawthorn, built
  from nine negatives, and every figure is clothed. The only public-domain copy found is a halftone
  reproduction in *The Practical and Junior Photographer* (April 1901, p. 257), scanned by the
  Internet Archive and hosted on Wikimedia Commons. The magazine's printed caption is cropped off.
- **Drop Rejlander's name from the screen.** The aside now speaks of Robinson alone, in the
  singular.
- **Put the two images in date order:** « Fading Away » (1858) first, « Bringing Home the May »
  (1862) second.
- **Remove** the file `l3-histoire-rejlander.jpg` and its entry in the rights comment. The new
  image gets its own id, `l3-histoire-robinson-mai`.
- **New rule:** demonstration images contain no nudity. This applies to archival images as well
  as the animateur's own photographs.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `demo-media`: a new requirement that no demonstration image shows nudity.
- `lessons`: the requirement « The history block shows where composition rules come from » gets
  a scenario for its second screen. It shows staged, multi-negative photographs in date order, and
  no image on it shows nudity.

## Impact

- `src/src/content/lecons/3.yaml`: the `la-photo-devient-un-art` screen (images, their order and
  the aside) and the rights comment above the `histoire` block.
- `src/public/demos/`: `l3-histoire-rejlander.jpg` is removed and `l3-histoire-robinson-mai.jpg`
  is added.
- `openspec/specs/demo-media/spec.md` and `openspec/specs/lessons/spec.md`, through their delta
  specs.
- No component, schema, style or verification-script changes.
