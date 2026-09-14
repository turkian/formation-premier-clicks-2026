## Context

See `proposal.md` for motivation. Current state:

- Demonstration images are declared by the `emplacementDemo` Zod schema in `src/content.config.ts`
  (`id`, `specification`, `fichier`, `priorite`, `alt`, `reglages`, `valeur`) and rendered by
  `src/components/EmplacementDemo.astro`, the only component that produces an `<img>` in the
  codebase.
- `EmplacementDemo.astro` currently renders the image at `object-fit: contain` inside a grid cell
  sized by its parent (`Demonstration.astro`), with `valeur` always shown as a `<figcaption>`
  underneath. It has no client-side script today.
- The nearest interactivity pattern in the codebase is `ProfondeurDeChamp.astro`: a plain `.astro`
  component with `data-*` attributes read by an inline `<script>`. There is no framework
  (React/Vue/Svelte) anywhere in the project, and this change does not introduce one.
- Lesson screens (`/lecons/...`) have no separate print template; printing is `@media print` CSS
  applied to the same HTML the browser already rendered. Printable "fiches" are a wholly separate,
  image-free content collection and are unaffected by this change.

## Goals / Non-Goals

**Goals:**
- A resting crop/zoom authored per image that means the same thing (frames the same detail, at
  the same apparent magnification) regardless of the container's aspect ratio — projector at 4:3
  or 16:9, phone column, or a directly printed lesson page.
- Every demonstration image, cropped or not, can be enlarged to its full uncropped frame by
  click, and returned to its resting view by clicking again, clicking outside, or pressing Escape.
- A caption that stays out of the way in the resting view but is available on hover or whenever
  the image is enlarged.
- No behavior change for images that don't declare a crop, and no change at all to the
  missing-photograph placeholder path.

**Non-Goals:**
- No multi-image compare/gallery view — each image's enlarge state is independent of its siblings
  in the same series (decided during exploration).
- No build-time image processing (resizing/cropping pipeline). Cropping is CSS-only; source JPEGs
  are already capped at 2048 px on the longer side by authoring convention.
- No visible "this is clickable" affordance beyond a pointer cursor — no icon, no tooltip system.
- No print-specific template or stylesheet work for lesson screens: none exists today, and the
  crop/zoom is expressed in plain CSS so it already applies if such a page is printed.

## Decisions

**Crop is authored as a focal point + zoom factor, not a rectangle.**
`cadrage: { point: [x, y], zoom }` (percentages, zoom a multiplier ≥ 1) is quick to eyeball while
looking at a photo ("centre on the eyes, zoom 1.6×"). An explicit `(x, y, w, h)` rectangle would
be more precise but requires measuring the source image for no real benefit here — the intent is
"zoom toward the interesting part," not exact pixel-perfect framing.

**Rendering: `object-fit: contain` baseline, then `transform: scale(zoom)` around
`transform-origin: <point>`, inside `overflow: hidden`.**
This keeps `zoom: 1.6` meaning the same magnification in a 4:3 room, a 16:9 room, a phone column,
and a printed page, because the transform is applied *after* the browser has already fit the
whole image inside its box. The alternative, `object-fit: cover` + `object-position: X% Y%`, was
rejected: its effective crop depends on the mismatch between the image's aspect ratio and
whatever box it happens to be in, so the same authored values would show a different slice of the
photo on a projector than on a phone — exactly the inconsistency this feature exists to avoid.

**The enlarge overlay is a native `<dialog>`, opened with `.showModal()`.**
It provides Escape-to-close, top-layer stacking above the dimmed slide, and focus containment
without hand-rolling a modal — none of which exists elsewhere in this codebase to reuse. A plain
`<div>` toggled by a class was considered and rejected: it would mean reimplementing Escape
handling, focus trapping, and stacking order by hand, and getting any of those wrong is exactly
the kind of failure a live presentation can't absorb mid-lecture (Escape not closing it, or the
overlay appearing behind other content).

**Click-to-enlarge and the crop transform live entirely in `EmplacementDemo.astro`.**
It follows the existing `data-*` + inline `<script>` island convention (`ProfondeurDeChamp.astro`).
`Demonstration.astro` only gains passing `cadrage` through as a prop — it does not need to know
how cropping or enlarging is implemented.

**The caption is duplicated, not relocated.**
One copy stays in the resting `<figure>`, revealed via CSS `:hover`/`:focus-within` (no script
needed for that half); a second copy renders inside the `<dialog>`, always visible while it's
open (a modal has no useful "hover to reveal" for a presenter who wants the label immediately).
This avoids scripting the relocation of a DOM node between two containers depending on state.

**Schema addition:** `cadrage` becomes an optional field on `emplacementDemo`:
`z.object({ point: z.tuple([z.number().min(0).max(100), z.number().min(0).max(100)]), zoom:
z.number().min(1) }).optional()`. The `zoom >= 1` floor rules out an author accidentally
shrinking the image further than `contain` already does, which would silently reproduce the exact
problem this change fixes.

## Risks / Trade-offs

- [`<dialog>`'s default backdrop/chrome differs slightly across browsers] → acceptable for a
  controlled, single-browser presenter setup; `::backdrop` is styled explicitly to match the
  dimmed-slide look regardless of browser defaults.
- [Hover-only caption reveal means a touch-only reader never sees the caption in the resting view]
  → accepted: already decided during exploration that tap-to-enlarge (which does show the
  caption) is sufficient on phones.
- [`transform: scale` on a raster image can soften edges at high zoom if the browser must
  upsample] → mitigated by the 2048 px authoring convention, which leaves enough native
  resolution for the zoom range this feature targets (roughly up to 2–3×) without visible
  upsampling at projector or phone resolution.

## Migration Plan

None needed. The change is purely additive: existing lesson YAML validates and renders unchanged,
and every image without an authored `cadrage` keeps today's `object-fit: contain` framing.
