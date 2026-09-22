## Why

On slide 30 of séance 1 (`explorer-la-zone-nette`), the depth-of-field simulator only draws a
top-down, bird's-eye diagram of the scene. That view explains the mechanism (distances, the sharp
zone's near/far edges, aperture) but never answers the question a participant actually has while
dragging the levers: what would the photo itself look like? A reviewer flagged this gap and asked
for a simulated view of the photographed frame to sit alongside the existing diagram.

## What Changes

- Add a second, simulated "as-seen" view to `ProfondeurDeChamp.astro`: a front-facing scene with a
  subject (always sharp, centered), a background element, and a foreground element, both rendered
  blurred or sharp using the component's existing depth-of-field math.
- Add a toggle control (`Schéma` / `Aperçu`) so the animator can switch between the existing
  top-down diagram and the new simulated view on demand. The toggle affects display only — both
  views read the same live lever state, and switching does not reset it.
- The toggle sits in the `.visuel` column's format-chip row ("Chiffres pour : …"), right-aligned,
  rather than owning a row of its own.
- The simulated view also labels each element's distance from the camera — avant-plan, sujet,
  fond — three numbers, reusing values the component already computes. This doesn't reopen the
  view's qualitative framing (Decision 1): three anchor numbers, not a ruler.
- The foreground element is decorative and non-interactive: it sits at a fixed fraction of the
  current focus distance rather than being controlled by a lever, so the four-lever model is
  unchanged. It blurs or sharpens exactly like any other point at that distance — including
  becoming sharp if the sharp zone widens enough to reach it, which is expected and consistent
  with how the existing background blur already behaves.
- Scoped to this one screen/component; the static top-down schemas used elsewhere
  (`la-definition`, `ce-qui-change-l-epaisseur`) are unchanged.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
- `interactive-components`: the depth-of-field component gains a requirement for a toggle-able
  simulated front view (subject/background/foreground, sharp/blur driven by the same computed
  near/far limits), in addition to its existing top-down diagram.

## Impact

- `src/src/components/interactifs/ProfondeurDeChamp.astro` — new simulated-view SVG/markup, the
  `Schéma`/`Aperçu` toggle control and its wiring, and blur logic for the foreground element
  (mirroring the existing background blur calculation).
- `src/src/lib/profondeur-de-champ.ts` — unaffected; the existing computed values (`proche`,
  `lointaine`, `jusquALInfini`) are reused as-is, no formula changes.
- `src/src/styles/interactif.css` — styling for the new toggle (likely reusing the existing
  `.segments` pill-button pattern already used by four other interactive components) and for the
  simulated-view layout within the existing `.visuel` column.
- `src/src/content/lecons/1.yaml` — no change; `explorer-la-zone-nette`'s existing props apply to
  both views.
