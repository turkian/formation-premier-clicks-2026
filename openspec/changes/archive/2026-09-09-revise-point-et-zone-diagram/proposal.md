## Why

`point-et-zone` (the diagram on the `point-ou-zone` screen, leçon 1) draws mise au point
as a marker sliding along an unanchored horizontal line. Geometrically that line already
*is* a distance axis, but with no origin it reads as an arbitrary spot — indistinguishable
from the AF-point aiming (a screen position) taught three screens later in the same bloc.
`ZoneNette.astro`, two blocs further in the same lesson, already solves this exact problem
for the same kind of ground-line drawing with a `vous` marker anchoring the line to the
photographer's position. `point-et-zone` never adopted it.

Separately, the diagram's two twin panels (mise au point / profondeur de champ) sit side
by side inside a `640×250` viewBox, sized down to the panel's schema column width.
Stacking the panels vertically instead reads better as two related, comparable drawings.
**Correction made during implementation:** the schema column is not, in fact, free of
height constraints — real measurement in a browser found the available height/width ratio
is as low as ~0.88 at the tightest supported breakpoint (1280×720), far under what two
generously-spaced stacked panels need. The stacked layout that shipped is compact
(smaller type, no arrow annotation) to fit under that real ceiling — see design.md.

## What Changes

- `PointEtZone.astro`'s two panels each gain a `vous` origin marker at the near end of
  their horizontal line, anchoring "the point moves along this line" to "how far from
  you."
- The two panels move from side-by-side to stacked vertically in one SVG (`300×236`,
  compact — smaller type, no arrow annotation — to fit the real available height at every
  supported projection breakpoint; see design.md).
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
- Content: `point-et-zone` renders on two screens, not just the one that motivated this
  change — `src/src/content/lecons/1.yaml`'s `point-ou-zone` and
  `src/src/content/lecons/3.yaml`'s `definir-une-intention` (a callback panel reusing the
  same diagram). Not identified until implementation; both are verified in tasks.md.
