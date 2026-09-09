## Context

See `proposal.md` for motivation. Relevant current state:

- `DirectionLumiere.astro` computes four column centers (`cx = 80 + i*160`) in a
  `640×250` viewBox, and for each draws a window rect, a subject circle, two
  identically-styled orange lines, and a camera rect rotated with
  `transform="rotate(angle cx cy)"`.
- `astro-icon` + `@iconify-json/lucide` are already installed (introduced in
  `add-static-panel-callout`) and used exactly once today, in `Panneau.astro`, as
  `<Icon name={ecran.icone} class="encadre-icone" />` styled entirely through CSS
  `color` (lucide icons are `stroke="currentColor"`/`fill="currentColor"` glyphs) — no
  prior use inside a hand-drawn `schemas/` SVG.
- `PointEtZone.astro` already has a dashed-secondary-line + arrowhead convention
  (`stroke-dasharray="4 3"`, a small filled triangle `<path>` for the arrowhead) that
  nothing else in `schemas/` reuses yet.

## Goals / Non-Goals

**Goals:**
- Redraw `direction-lumiere` so camera / light / subject are each unambiguous, and the
  light path and camera sightline can't be confused.
- Extract exactly the pieces this diagram and the next window-light variant need — no
  more.

**Non-Goals:**
- Studio/multi-light iconography (softbox, umbrella, flash, reflector) — out of scope;
  the only anticipated future diagrams are more single-window-light position variants.
- Touching `ZoneNette`, `QuatreLeviers`, `PointEtZone`, or `DiametreOuverture` — those
  aren't lighting-position diagrams and don't share this problem.

## Decisions

**Camera stays upright; the dashed sightline (not icon rotation) conveys aim.**
The original rotates a rectangle by `angle` degrees to suggest facing. A `lucide:camera`
glyph rotated to 90°/180°/270° doesn't read as "aimed that way" the way a rotated arrow
does — camera icons aren't designed to be legible at arbitrary rotations. Instead: the
camera icon renders upright at its computed position, and a dashed line with a small
arrowhead (reusing `PointEtZone`'s existing convention) points from the camera to the
subject. This is also what satisfies the spec's "explicit visual cue on the icon
itself" requirement without depending on rotation.
*Alternative considered*: rotate the camera icon like the original rect. Rejected —
tested mentally against all four angles, a rotated camera glyph at e.g. 90° reads as
"sideways," not "aimed left," which is the exact ambiguity this change exists to fix.

**Camera position is computed directly in polar coordinates, not via SVG `transform`.**
`camera = subject + r · (cos θ, sin θ)` in the loop, producing plain `x`/`y` for the
icon and the sightline's endpoint. This replaces `transform="rotate(...)"` entirely —
simpler (one coordinate computation instead of a rotation matrix applied to a
rectangle), and it's what makes "camera stays upright" trivial: nothing is rotated
anymore.

**The window rectangle stays; it isn't replaced by a generic sun icon.** The window is
a real, correct object for this lesson (it's literally about window light) — replacing
it with `lucide:sun` would make the diagram less specific, not clearer.
*Revised after first implementation*: a radiating-rays glyph was added at the window's
inner edge to make it read as "light-emitting." In practice, sitting right next to the
solid light-path line (same accent color, similar angle), it read as a confusing extra
line rather than a helpful cue — reviewed in the actual rendered diagram, not just in
design. Removed; the light-path line alone already carries that meaning, and the window
rect + its `fenêtre` label were never the ambiguous part.

**The light source moves for `du dessus` only; it stays fixed for the other three.**
The window is deliberately drawn at the same position and angle across `frontale`,
`latérale`, and `contre-jour` — that fixed position *is* the lesson's point ("the light
never moved, only the photographer did"). But that fixity is exactly what makes
`du dessus` illegible: a window fixed at subject height, off to the side, cannot be made
to look like it's shining from above no matter which icon represents it — confirmed by
rendering it and looking, not by reasoning about it in the abstract. `du dessus` is a
distinct physical case (overhead light, harsh downward shadows) that this floor-plan
layout can only depict by drawing the source above the subject for that one panel: a
wide, short "skylight" rect in place of the tall side window, with the light path
running straight down. The camera's position is unaffected (still placed by the same
polar formula, unchanged at directly-below for this angle) — only the source moves.
*Alternative considered*: keep the window fixed everywhere and add a small supplementary
"light from above" arrow near the subject instead. Rejected (user's call) — it would
have left the actual light-path line still pointing diagonally from the side,
contradicting its own supplementary arrow, whereas moving the source draws exactly one
light path per panel and it always points the right way.

**Subject renders as `lucide:user-round`, not a plain filled circle.** Matches the
reference convention (subject shown as a small figure) and reads immediately as "the
person being photographed" rather than an abstract dot — the plain circle was never
called out as confusing, but the diagram is not harder to read with a person icon
instead, and now every role has a role-appropriate icon per the new capability's
requirement.

**Icons are embedded as nested `<svg>` inside the diagram's outer `<svg>`.** `astro-icon`
inlines each icon as literal `<svg>` markup at build time; a nested `<svg>` with its own
`x`/`y`/`width`/`height` is valid SVG and behaves like a positioned stamp. Wrapped in a
`<g>` only where a group transform is still needed (there is none left for the camera
once rotation is dropped — the window's rays glyph may still use a small `<g>` for
convenience). Color is inherited via CSS `color` on the wrapping `<g>`, same mechanism
`Panneau.astro` already relies on.

**Shared pieces: three icon components, one plain style module — not four
components.** `schemas/pieces/Sujet.astro`, `SourceLumiere.astro`, `AppareilPhoto.astro`
each take a position (and `AppareilPhoto` an angle, purely to compute where the
sightline points) and render their icon. The light-path and sightline are both just
`<line>` elements — not worth a fourth Astro component — so their stroke/dash/arrowhead
attributes live as two exported constants in `schemas/pieces/traits.ts`
(`traitLumiere`, `traitVisee`), consumed directly by `DirectionLumiere.astro`. Future
lighting diagrams import the three components plus these two constants.

## Risks / Trade-offs

- **Icons render too small/fuzzy when projected** (the room tolerates 4:3 at 1024×768,
  per project context) → size each icon generously relative to the 640-wide canvas
  (roughly what the current 34px-tall camera rect already occupies), and check it in a
  real browser at both aspect ratios before considering this done.
- **Nesting `<svg>` inside a hand-drawn `schemas/` SVG is a new pattern for this
  codebase** → low actual risk, since `astro-icon`'s build-time inlining is the same
  mechanism already proven to survive the offline-mode / local-copy pipeline in
  `add-static-panel-callout`; confirm with `npm run verifier:copie-locale` after
  implementing.
- **Dropping rotation changes the diagram's visual rhythm** (four rotated compositions
  → four polar-placed-but-upright compositions) → the four positions are still
  visually distinct (camera occupies a different quadrant each time, sightline angle
  differs), so "the photographer moved" still reads; this trades a bit of the
  original's visual variety for actual legibility, which is the point of the change.

## Open Questions

- Exact subject icon (`user-round` vs. `circle-user`) is a one-line swap either way —
  can be decided while implementing, doesn't affect the spec or the task breakdown.
