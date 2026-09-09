## Context

`PointEtZone.astro` (see proposal.md for why) currently draws two twin panels side by
side in one `viewBox="0 0 640 250"`, each a horizontal ground line with a marker sliding
along it. `ZoneNette.astro` draws the same kind of ground line, but anchors it with an
inline `vous` marker — a small rounded rect above the line and a `vous` label below it,
at a fixed `(x, y)` — and that pattern is what's missing from `point-et-zone`.

The rendering constraint that makes stacking worthwhile: `.region-schema` (`lecon.css:176`)
sizes its column by grid track width, not by the SVG's content height. The SVG itself sets
`width:100%; height:auto`, so its rendered height is `columnWidth × (viewBoxHeight /
viewBoxWidth)` — purely a function of the viewBox's aspect ratio. A taller/narrower
viewBox therefore renders taller at the same column width, using vertical room that
today's `640×250` (2.56:1) leaves empty.

## Goals / Non-Goals

**Goals:**
- Give both panels an explicit `vous` origin marker, identical in icon and position
  convention (per the new `distance-diagrams` capability).
- Rearrange the two panels from side-by-side to stacked, within one SVG, so the origin
  marker and its label have room without shrinking the rest of the drawing.
- Keep `ZoneNette.astro`'s existing drawing visually unchanged while switching it to the
  shared marker, so the two diagrams are identical by construction going forward.

**Non-Goals:**
- No change to `claim`/`corps` wording on `point-ou-zone` or any other screen.
- No change to `.region-schema`/`.panneau` grid CSS — only what's inside the schema
  column's SVG changes.
- No change to `ZoneNette.astro`'s own overall composition beyond the marker swap.

## Decisions

**Extract `pieces/Vous.astro`, and use it in both diagrams.** `pieces/` already holds
`AppareilPhoto.astro`, `SourceLumiere.astro`, and `Sujet.astro` — shared sub-drawings
reused across schema components, each taking `x`/`y` (and `AppareilPhoto` an optional
`taille`) props. `Vous` follows the same shape:

```
interface Props { x: number; y: number }
```

rendering the rect + label `ZoneNette.astro` already draws, anchored at `(x, y)` on the
ground line. `ZoneNette.astro` swaps its inline `<g transform="translate(60,168)">…</g>`
for `<Vous x={60} y={168} />` — same output, now shared. This makes the new capability's
"same icon, same convention" requirement true by construction, not just by having two
authors independently draw the same thing.

**Stack the two panels vertically in one SVG, viewBox roughly `320×480`.** Each panel
keeps its internal geometry proportionally similar to today's (ground line, gradient
sharp-zone rect(s), marker line(s), caption text) — shifted into its own vertical band
instead of a horizontal half. The divider between them rotates from a vertical line to a
horizontal one. The `vous` marker sits at the near (left) end of each panel's own ground
line, same as `ZoneNette.astro`'s convention.

Approximate bands (final numbers settled during implementation, adjusted to fit real
text metrics):
- Panel A (mise au point): y ≈ 0–225 — title/subtitle, ground line with `vous` + two point
  markers (current position, alternate position), caption.
- Divider: horizontal rule ≈ y 230.
- Panel B (profondeur de champ): y ≈ 235–470 — mirrors panel A's structure with the
  fixed-point / variable-thickness drawing it already has.

**`aria-label` and the component's doc comment get rewritten for the new orientation.**
Both currently say "à gauche… à droite…"; both must say "en haut… en bas…" instead, or the
accessible description stops matching the visual.

## Risks / Trade-offs

**The taller SVG might not fit the panel's available height, causing real overflow, not
just idle space.** The reasoning above (schema column sizing is width-driven) holds for
the *column's* sizing, but `.panneau`'s middle row (`grid-template-rows: auto minmax(0,
1fr) auto`) still has to accommodate whichever of `corps` or `schema` is taller, at the
4:3 / 1024×768 projection floor specifically — the tightest case. → Mitigation: this is
exactly what `verifier:projection` and `verifier:telephone` check for; if the chosen
viewBox proportions overflow, reduce the target height (e.g. `320×420`) until both
verifiers pass clean, same as any other diagram change in this codebase.

**Refactoring `ZoneNette.astro` touches a diagram outside this change's stated trigger
screen.** It's low-risk (the new piece reproduces the existing markup exactly, same
numbers), but it does mean this change edits a component `profondeur-de-champ` depends on
too. → Mitigation: verify `zone-nette`'s two call sites (`la-definition`,
`ce-qui-change-l-epaisseur`) render identically before/after via the same verifiers plus a
visual check, not just the new `point-et-zone` screen.
