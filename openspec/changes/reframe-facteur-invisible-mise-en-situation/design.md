## Context

See proposal.md - Why. Relevant constraints already in place:

- `content.config.ts` gives a `panneau` screen exactly one `schema` region (a single drawn SVG
  component), never photographs — real photos only exist on `demonstration` screens
  (`components/ecrans/Demonstration.astro`). This change keeps `le-facteur-invisible` a `panneau`
  and adds a drawn diagram, not a photo.
- `components/schemas/registre.ts` is an explicit, one-component-per-concept registry
  (`zone-nette`, `diametre-ouverture`, `quatre-leviers`, `direction-lumiere`, `point-et-zone`),
  each importing shared pieces from `components/schemas/pieces/` (`AppareilPhoto`, `Sujet`, `Vous`).
  A wrong `composant` name fails the build rather than leaving a blank panel on the projector.
- `openspec/specs/lessons/spec.md` already specifies that an accumulating panel's states add
  content without removing what's already shown, and that a concept panel's four regions (claim,
  body, diagram, aparté) can show the diagram alongside the body. No change needed there.
- `openspec/specs/distance-diagrams/spec.md` requires every distance diagram to anchor its ground
  line to an explicit photographer marker with consistent iconography — but has no notion of two
  scenes shown for comparison, which is what this change needs (see specs delta).

## Goals / Non-Goals

**Goals:**
- Give `le-facteur-invisible` a visual mise en situation (capteur, objectif, ouverture, then the
  1 m / 3 m setup) that primes the question without revealing the numeric answer its later états
  disclose.
- Retire the "kit lens, that's all it can do" framing across this lesson in favour of neutral,
  accurate language, stated once (in `le-facteur-invisible`, `profondeur-de-champ` bloc) and
  referred to plainly afterward (in `demo-la-distance` and `demo-ouverture-et-fond`, later in the
  same lesson's `ouverture` bloc).

**Non-Goals:**
- Adding real photographs anywhere in this lesson — the user chose the drawn-diagram route
  explicitly; `demo-la-distance` and `demo-ouverture-et-fond` keep their existing photo/placeholder
  handling untouched.
- Touching the "pourquoi votre kit dit f/3.5-5.6" explanation in `deux-retombées` (also in the
  `ouverture` bloc) — that passage is substantively about variable-aperture zoom optics, not about
  this framing.
- Changing the accumulating états themselves (`Les chiffres`, `Le rapport`) — only the base
  `corps`/`schema` that all états sit on top of changes.

## Decisions

**A new single-purpose schema component, not a "comparative mode" on `ZoneNette`.**
Every existing schema component owns exactly one concept (`zone-nette` = the sharp zone around a
point; `diametre-ouverture` = aperture diameter at a focal length; etc.). Adding a two-scene
comparison prop to `ZoneNette` would conflate two concerns in one file. A new component (working
name `distance-sujet`) keeps that one-concept-per-file pattern intact and is registered in
`registre.ts` next to the other five.

**The diagram sits at the panel's base `schema`, and `Panneau.astro` now hides it once the panel
becomes dense (État 2 onward).** The base `schema` is authored once, at the panel's top level, so
it's naturally present at État 1. Originally this was expected to stay visible through `Les
chiffres` and `Le rapport` too, since accumulating panels keep everything already shown (lessons
spec, "Panels that must withhold an answer accumulate in place") — but the site's CSS
(`styles/lecon.css`) only ever defines three panel grids: schema+corps (static), corps-only
(static, no schema), and corps+encadrés (dense/cumulative, États 2+). No dense panel had ever
carried a schema before this change, so there was no fourth grid reserving room for one alongside
the growing `encadrés` column — the schema div was orphaned by CSS grid auto-placement, which
silently squeezed and clipped the `Les chiffres` table. `components/ecrans/Panneau.astro` now
computes `schema` as `dense ? undefined : cumule.schema`, so the diagram renders only pre-reveal
and cedes the full width to `encadrés` from État 2 on — matching how every other dense panel in the
site already behaves, and matching the mise en situation's actual job: set the scene before the
question, then get out of the way for the payoff. This also means the diagram never needs to coexist
on screen with the answer it's building up to — it simply isn't there anymore once the reveal
starts (see the `distance-diagrams` spec delta, which still governs the diagram's own content).

**Distances shown: 1 m and 3 m, matching this panel's own question — not `demo-la-distance`'s 1 m
and 5 m.** The panel's question text asks about "un sujet à 3 mètres et un sujet à 1 mètre," and
`Les chiffres` answers exactly those two distances (8 cm, 77 cm). The diagram must match the
question it illustrates. `demo-la-distance`, in the `ouverture` bloc later in the same lesson, is
a separate screen making a separate point with real photos at different distances (1 m / 5 m) — no
need for the two to agree.

**Scene layout follows `ZoneNette`'s and `PointEtZone`'s existing visual grammar.** Two independent
ground lines side by side in one `viewBox`, each with the `Vous` marker anchored at its near end
(the same photographer-marker piece every other distance diagram uses) and a `Sujet` placed at
scaled distance, labelled only with the distance ("1 m" / "3 m") — no gradient, no blur cue,
nothing that hints at the resulting depth of field.

## Risks / Trade-offs

- [Risk] Two scenes in the panel's narrow diagram region could look cramped at 4:3 projection
  (1024 × 768). → Mitigation: reuse the same responsive `viewBox` + `width:100%;height:auto`
  pattern every existing schema component already uses, and keep each scene's label to the bare
  distance.
- [Risk] A reader who has already seen `demo-la-distance` (1 m/5 m) could read this diagram's 1 m/3 m
  as inconsistent. → Mitigation: this diagram is scoped to the question it accompanies, which
  explicitly names 3 m and 1 m — the discrepancy is a deliberate difference in purpose (early tease
  vs. later photographic proof), not an error, and is documented here so it isn't "fixed" later.
- [Risk] Simplifying "zoom de kit" to plain "50 mm" downstream in `demo-la-distance` /
  `demo-ouverture-et-fond` could read as under-specified if a reader lands on those screens without
  having seen `le-facteur-invisible` first (deep links, lessons spec's "entered at any point").
  → Mitigation: "50 mm" alone is still a complete, accurate spec for the constant being held in
  those comparisons — the lens's identity ("common," "not something to buy") was never load-bearing
  for those two screens' own point, only for `le-facteur-invisible`'s narrative.
