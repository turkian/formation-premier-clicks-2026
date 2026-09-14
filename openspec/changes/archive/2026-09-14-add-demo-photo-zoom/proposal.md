## Why

Demonstration photographs are rendered whole and shrunk to fit their slot (`object-fit:
contain`), so the difference a comparison exists to prove — for example the direction of light on
a face — can occupy only a small fraction of an already-small frame, illegible from the back of
the room. Photographs need a way to show the relevant detail at a readable size by default, while
still letting the room see the full, uncropped frame on demand.

## What Changes

- Add an optional `cadrage` field to a demonstration image's declaration: a focal point
  (percentage coordinates) and a zoom factor. When present, the image's resting view is framed on
  that point at that zoom instead of showing the whole frame. Absent, behavior is unchanged.
- Add click-to-enlarge to every demonstration image, cropped or not: clicking opens the full,
  uncropped photograph in an overlay above the dimmed slide; clicking again, clicking outside the
  overlay, or pressing Escape returns to the resting view.
- Change a demonstration image's caption (`valeur`) from always visible to hidden by default,
  shown on hover or while the image is enlarged. The resting view stays as uncluttered as the crop
  makes it, and the caption remains available on demand.
- The resting crop, zoom, and hover affordance render as plain CSS/HTML, so they carry over
  unchanged if a lesson screen is ever printed directly — no separate print path exists for lesson
  screens today, so nothing extra is needed for paper.

## Capabilities

### Modified Capabilities

- `demo-media`: adds an authored resting crop/zoom for a demonstration image and a
  click-to-enlarge interaction with an on-hover/on-expand caption, on top of the existing
  missing-photograph placeholder behavior (which is unchanged).

## Impact

- `src/src/content/lecons/*.yaml` — image declarations gain an optional `cadrage` field.
- `src/src/components/EmplacementDemo.astro` — resting crop/zoom rendering, click-to-enlarge
  overlay, hover/expanded caption, inline `<script>` in the project's existing vanilla
  data-attribute style (no framework introduced).
- `src/src/components/ecrans/Demonstration.astro` — passes `cadrage` through to
  `EmplacementDemo`.
- No changes to `src/src/lib/demos.ts`, the missing-photograph/shot-list mechanism, or any
  print/fiche template — none of them are affected by this change.
