## Why

`point-et-zone` (the diagram on the `point-ou-zone` screen, leçon 1) draws mise au point
as a marker sliding along an unanchored horizontal line. Geometrically that line already
*is* a distance axis, but with no origin it reads as an arbitrary spot — indistinguishable
from the AF-point aiming (a screen position) taught three screens later in the same bloc.
`ZoneNette.astro`, two blocs further in the same lesson, already solves this exact problem
for the same kind of ground-line drawing with a `vous` marker anchoring the line to the
photographer's position. `point-et-zone` never adopted it.

Separately, the diagram's two twin panels (mise au point / profondeur de champ) sit side
by side inside a `640×250` viewBox, sized down to the panel's schema column width. That
column isn't height-constrained — stacking the panels vertically instead lets the same
column width render a taller, more legible diagram, with room for the new origin marker.

## What Changes

- `PointEtZone.astro`'s two panels each gain a `vous` origin marker at the near end of
  their horizontal line, anchoring "the point moves along this line" to "how far from
  you."
- The two panels move from side-by-side to stacked vertically in one SVG (roughly
  `340×480` instead of `640×250`), using the schema column's already-idle vertical room
  instead of splitting its width.
- The `vous` marker is extracted into a shared `pieces/Vous.astro` (mirroring the existing
  `pieces/AppareilPhoto.astro` pattern), and `ZoneNette.astro` is switched to use it too —
  so the two distance diagrams stay visually identical by construction, not by convention.

Out of scope: no change to any screen's `claim`/`corps` wording (the "où" framing
discussed separately stays as-is), no change to the panel's `.region-schema` grid CSS, no
change to `ZoneNette.astro`'s own panel-internal layout beyond swapping in the shared
piece.

## Capabilities

### New Capabilities

- `distance-diagrams`: a diagram depicting a subject's distance from the photographer
  along a ground line SHALL anchor that line to an explicit photographer marker, and
  every such diagram SHALL use the same marker — mirrors the existing `lighting-diagrams`
  capability's pattern (explicit iconography, cross-diagram consistency) for this
  different diagram family.

### Modified Capabilities

_None._ The `lessons` capability's diagram-region layout (placement of the schema within
a concept panel) is unaffected; only what's drawn inside `point-et-zone`, and how its own
two panels are arranged relative to each other, changes.

## Impact

- Component: `src/src/components/schemas/PointEtZone.astro` — SVG layout rewritten
  (stacked panels, origin markers).
- Component: `src/src/components/schemas/pieces/Vous.astro` — new shared piece.
- Component: `src/src/components/schemas/ZoneNette.astro` — inline `vous` markup replaced
  with the shared piece (no visual change intended).
