# Design

## Context

The claim (`.claim`) has `max-width: 30ch`, and `.panneau[data-sans-schema] .claim` lowers it to
24ch. `Panneau.astro` sets `data-sans-schema` on any non-dense panel without a diagram or an
illustration. It never looks at `colonnes`, so every panel with columns gets the 24ch cap. The
claim also uses `text-wrap: balance`.

## Goals / Non-Goals

**Goals:**
- Remove the measure cap only on panels with columns.

**Non-Goals:**
- Rewriting the long claims (`qu-est-ce-que-l-iso`, `rappel-vitesse`…): two wide lines are
  accepted.
- Changing the claim's font size, or the repère screens (`Repere.astro`), which have their own
  rules.

## Decisions

**A `data-colonnes` attribute on the panel, rather than reusing `data-sans-schema`.**
`Panneau.astro` adds `data-colonnes` when `ecran.colonnes` is present. `lecon.css` adds
`.panneau[data-colonnes] .claim { max-width: none; }` after the `data-sans-schema` rule. It has a
higher specificity, so it wins wherever both attributes are present. Alternative considered:
dropping `data-sans-schema` on these panels. That attribute may govern more than the claim
measure, so removing it would risk side effects.

**Keep `text-wrap: balance`.** With the cap removed, a two-line claim is split into two lines of
roughly equal length, each shorter than the full width. That is the accepted outcome for long
claims, and it reads better than one full line plus a short widow. A short claim (« Placer »)
fills a single line because it fits there.

## Risks / Trade-offs

- [A wider claim on two lines could still push the photos down on a 4:3 projector] → In practice
  every affected claim loses lines (four lines down to one or two). Check with
  `npm run verifier:projection`.
- [Claims run very wide on a large screen] → The slide's width is bounded by the deck layout, and
  this matches the cards' width, which is the intended effect.
