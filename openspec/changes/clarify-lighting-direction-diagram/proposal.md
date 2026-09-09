## Why

The `direction-lumiere` schema (the four-position window-light diagram in
`content/lecons/1.yaml`) draws its camera as an unlabeled rotated rectangle and its
light ray and camera sightline as two identical orange lines. A viewer can't tell the
camera's facing from the rotated blob alone, and can't tell which line is light and
which is sightline — exactly the two things this diagram exists to show clearly. The
project already has `astro-icon` + `@iconify-json/lucide` available (added for the
static-panel callout icon) but no lighting diagram uses them; every `schemas/` diagram
still draws camera/light/subject as bare geometric primitives, so the same ambiguity
will repeat in the next window-light variant unless the pieces are shared.

## What Changes

- Add a small set of reusable, parametric diagram pieces (subject marker, light source
  with its ray to the subject, camera icon with a facing cue and a distinct sightline)
  that any lighting-position diagram can compose from, instead of inlining SVG shapes
  per diagram.
- Redraw `direction-lumiere` using these pieces:
  - camera becomes a `lucide:camera` icon rotated to face the subject, with a short
    facing cue instead of relying on rotation alone to convey aim;
  - the light ray (window → subject) stays a solid accent-colored line;
  - the camera's sightline (camera → subject) becomes a distinct dashed neutral line,
    so the two are never visually interchangeable.
- No change to the registry (`registre.ts`) or to content authoring — `composant:
  direction-lumiere` keeps working exactly as referenced today; this is a rendering
  rewrite behind the same name.
- No new dependencies — `astro-icon` and `@iconify-json/lucide` are already installed
  and already ship the icons this needs (`camera`, among others).

## Capabilities

### New Capabilities
- `lighting-diagrams`: lighting-position diagrams (camera/light-source/subject) SHALL
  depict each role with unambiguous, distinguishable iconography rather than bare
  geometric primitives, and SHALL visually distinguish the light path from the
  camera's sightline. Built from a shared, reusable set of diagram pieces rather than
  per-diagram inline shapes.

### Modified Capabilities
_None — the `lessons` capability's diagram-region layout (placement of the diagram
within a concept panel) is unaffected; only what's drawn inside that region changes._

## Impact

- `src/src/components/schemas/DirectionLumiere.astro` — rewritten to compose the new
  shared pieces instead of inlining primitives.
- `src/src/components/schemas/pieces/` (new) — reusable subject / light-source /
  camera components, parameterized by position and angle.
- No changes to `registre.ts`, `content.config.ts`, `content/lecons/*.yaml`, or
  `package.json`.
