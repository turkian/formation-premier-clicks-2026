## Context

See `proposal.md` for motivation and `specs/demo-media/spec.md` for the required behaviour.

Current state relevant to the approach:

- `Demonstration.astro` renders each series as `figure.rang > div.serie > EmplacementDemo*`, then
  a `figcaption.legende-serie`. It is the only place that knows which photographs belong to the
  same series.
- `EmplacementDemo.astro` draws the photograph inside `.marco` (`overflow: hidden`) with
  `object-fit: contain`, plus an optional resting crop applied as `transform: scale(zoom)` around
  `transform-origin: x% y%` on the `<img>`. It already carries an inline script (click opens a
  native `<dialog>`) following the project's `data-*` + inline `<script>` island convention.
- `Ecran.astro` binds ArrowLeft/Right, PageUp/Down, Space and F on `keydown`, and ignores events
  with Ctrl/Alt/Meta. Shift alone is not bound.
- Source photographs are capped at 2048 px on the long side; the three `nette-ou-propre` files
  are 2048 × 1365, and the grain is visible at 1:1.

## Goals / Non-Goals

**Goals:**
- One interaction that shows the same point of the scene, magnified, on every photograph of a
  series at once.
- Correct coordinates whatever the box's aspect ratio (4:3 or 16:9 projector) and whether or not
  a photograph declares a resting crop.
- Zero cost for series that do not opt in, and for touch devices and print.

**Non-Goals:**
- No loupe inside the enlarged `<dialog>`.
- No loupe on free images (`images:` outside a series) — `deux-flous-en-images` stays as is.
- No touch gesture.
- No higher-resolution source files or build-time image processing: the loupe reads the same
  JPEG already displayed.
- No presenter-remote binding: a remote cannot hold Shift; the loupe is a keyboard-and-mouse
  gesture.

## Decisions

**`loupe` is declared on the series, not on the image.**
`serieComparative` gains `loupe: z.object({ zoom: z.number().min(1) }).optional()`. Linking is
only meaningful between photographs that share a framing, and a series is by definition "same
scene, one variable". A per-image flag would allow linking photographs that do not line up.
`zoom` is required inside `loupe` so every slide states the magnification its photos support;
`min(1)` mirrors `cadrage`. Suggested values: 4 for `nette-ou-propre` (≈ 1:1 on a 1080p
projector, ≈ 0,75:1 on 1024 × 768), 3 for `trois-vitesses`.

**Magnification is relative to the photograph as drawn at rest without crop.**
`zoom: 4` means the loupe shows the scene four times larger than the whole, `contain`-fitted
photograph. This keeps the authored number meaningful across projectors, matches how `cadrage`
already expresses magnification, and makes a series with mixed crops consistent: the same point
looks the same size in each loupe.

**Pointer → scene coordinates: one normalised (u, v) in image space, computed once.**
On `pointermove`, the script takes the pointer position in the hovered `.marco`, then:
1. undoes the resting crop, if any: `p = origin + (pointer − origin) / cadrageZoom`, where
   `origin` is the `transform-origin` in box pixels;
2. removes the `contain` letterbox: compute the drawn image rectangle from `naturalWidth/Height`
   and the box size, and convert to `u, v ∈ [0, 1]`;
3. ignores the event when (u, v) falls outside the image (in the letterbox bars).
The same (u, v) is then applied to every loupe of the series, each converting it back to its
own box (via its own letterbox and crop). Using `getBoundingClientRect()` of the `<img>` would
be simpler but returns the post-transform box only for the cropped case and still not the
`contain` rectangle; doing the arithmetic explicitly is more predictable.

**Rendering: one absolutely positioned circle per photograph, painted with
`background-image`.**
Each `EmplacementDemo` in a loupe series contains a hidden `div.loupe` inside `.marco`, with
`background-image` set to the same URL as the `<img>` (already in the cache). Showing it at
(u, v) sets `left/top`, `background-size` to the drawn image size × `zoom`, and
`background-position` so (u, v) sits at the circle's centre. `.marco`'s existing
`overflow: hidden` clips the circle at the frame edge, which satisfies "stays inside each
photograph's frame" without edge-flipping logic. A `<canvas>` copy was rejected: more code, and
no benefit for a single scaled bitmap. Cloning a second `<img>` with a transform was rejected:
harder to clip to a circle and to keep in step with the crop transform.

The circle diameter is a fraction of the box (around 45 % of the box's smaller side) so it stays
readable from the back of the room on a 4:3 projector and never covers the whole photograph.
`image-rendering` is left at its default: at ≈ 1:1 smoothing does not hide noise, and pixelated
upscaling would add an artefact that looks like noise on the clean photograph.

**Key handling lives in the series script, not in `Ecran.astro`.**
The series listens to `keydown`/`keyup` for `Shift` on `document`, plus `blur` on `window` (a
Shift released while the window lost focus must not leave the loupe stuck on). It tracks
"Shift held" and "pointer over a photograph of this series"; the loupe is shown when both are
true. `pointerleave` on the `.serie` hides it. No change to `Ecran.astro`: it never acts on
Shift alone.

**Shift + click does not enlarge.**
The existing click handler in `EmplacementDemo.astro` returns early when `evenement.shiftKey` is
true. Otherwise the most natural presenter gesture — clicking while looking closely — would throw
the room into the full-frame dialog and lose the comparison.

**The hint is static markup, gated by a media query.**
`Demonstration.astro` renders the hint after the series' `figcaption` (inside `figure.rang`),
text passed through `typo()`: « Maintenir Maj pour agrandir un détail », in the aparté tier. It
and the loupe elements are hidden by default and shown only under
`@media (hover: hover) and (pointer: fine)`; `@media print` hides them. The script also checks
`matchMedia('(hover: hover) and (pointer: fine)')` before attaching listeners, so nothing runs
on touch devices.

## Risks / Trade-offs

- [The hint adds a line to slides that are already tall; on 1024 × 768 the `nette-ou-propre`
  caption is long] → hint in the aparté tier on the same line as the caption's end if it fits,
  and `verifier:projection` must pass at 4:3 before the change is done.
- [Photographs in a series are not perfectly aligned (handheld shots)] → the loupes show
  slightly different points; acceptable for noise (texture, not an exact object). Check
  `trois-vitesses` and `nette-ou-propre` by eye during implementation; if misaligned, it is a
  content fix (re-crop the files), not a code fix.
- [A presenter on a laptop with a touch screen and a mouse] → `pointer: fine` matches when the
  primary pointer is a mouse/trackpad; the loupe works with the mouse, as intended.
- [`zoom` beyond the file's real resolution shows soft, enlarged pixels] → per-series `zoom`
  lets the author stay near 1:1; the design suggests values rather than a global default.
- [Shift is also used for text selection] → the photographs are buttons with no selectable
  text; holding Shift over them selects nothing.

## Migration Plan

Additive and opt-in: series without `loupe` render identical markup and load no new listeners.
Rollback is removing the `loupe` keys from `2.yaml`.
