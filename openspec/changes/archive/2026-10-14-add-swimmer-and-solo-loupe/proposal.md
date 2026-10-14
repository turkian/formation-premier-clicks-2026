## Why

The « flou choisi » demonstration shows *who* moves during the exposure — the light, the camera,
the camera following the subject — but not the most common chosen blur a beginner will actually
make: a speed slow enough to let the fast part of a subject blur while the rest stays sharp. The
animator has a photograph of exactly that (a backstroke swimmer, face sharp, hand and water
softened), but the effect is subtle: at a third or a quarter of a projected screen, the softness
disappears and the photograph reads as frozen. The linked loupe that solves this on comparison
series cannot be used here, because it assumes every photograph shows the same scene — on four
different scenes it would magnify the swimmer's face and a random patch of motocross dirt at the
same time.

## What Changes

- Add a fourth photograph to `le-flou-choisi`: the animator's backstroke swimmer, slot `l2-nageur`,
  marked useful. Its label states the idea it adds — part of the subject moves faster than the
  rest; the face stays sharp, the hand blurs. The shutter speed is unknown and is not stated.
- Lay the four photographs out as a 2 × 2 grid at projection width: light trails and intentional
  camera movement on the first row, panning and the swimmer on the second. On a phone they stack
  in reading order, as today.
- The free (non-series) photographs of a demonstration screen MAY declare a number of columns;
  they wrap into rows of that many photographs. Absent, they stay on one row, as today.
- The free photographs of a demonstration screen MAY declare a **single-photograph loupe**: holding
  Shift over one of them magnifies, at the declared magnification, the point under the pointer —
  on that photograph only. Same trigger, same hint, same restriction to hover-capable fine-pointer
  devices as the linked loupe. The linked loupe on comparison series is unchanged.
- Enable the single-photograph loupe on `le-flou-choisi`, at about the files' native resolution
  (× 3), so the sharp face and the soft hand can be compared at 1:1.
- On this slide, a photograph's label shows only once it is enlarged — not on hover — and the
  resting view gives that line back to the photographs. Any demonstration screen can opt in.
- The photo credit on the slide follows the 2 × 2 arrangement (« Photo de gauche, rangée du bas :
  Alain Ruelland »); the swimmer, being the animator's own, is not credited.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `demo-media`: free demonstration photographs may wrap into a declared number of columns, and may
  declare a single-photograph loupe with its on-screen hint; the « flou choisi » swimmer joins the
  shot list as a useful slot.
- `lessons`: the « flou choisi » demonstration shows four creative uses of a chosen blur, adding
  partial subject blur, in two rows of two.

## Impact

- `src/src/content.config.ts` — the screen's free `images` gain optional `colonnes` and
  `loupe: { zoom }` declarations (exact shape decided in design).
- `src/src/components/ecrans/Demonstration.astro` — wraps the free row into columns, marks it for
  the single-photograph loupe, renders the hint, and the loupe script learns to drive one frame
  instead of all frames of a series.
- `src/src/components/EmplacementDemo.astro` — free photographs receive a loupe element when the
  screen declares one; Shift + click no longer enlarges them in that case.
- `src/src/lib/demos.ts` — `creditDeLEcran` counts wrapped free photographs as rows.
- `src/src/content/lecons/2.yaml` — `le-flou-choisi` gains `l2-nageur`, two columns and a loupe.
- `src/public/demos/l2-nageur.jpg` — the photograph, moved from the untracked `images/` folder.
- No change to comparison series, their linked loupe, the resting crop, click-to-enlarge, or any
  fiche.
