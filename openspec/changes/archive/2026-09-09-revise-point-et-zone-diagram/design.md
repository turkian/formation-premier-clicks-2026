## Context

`PointEtZone.astro` (see proposal.md for why) currently draws two twin panels side by
side in one `viewBox="0 0 640 250"`, each a horizontal ground line with a marker sliding
along it. `ZoneNette.astro` draws the same kind of ground line, but anchors it with an
inline `vous` marker — a small rounded rect above the line and a `vous` label below it,
at a fixed `(x, y)` — and that pattern is what's missing from `point-et-zone`.

The rendering mechanic behind stacking: `.region-schema` (`lecon.css:176`) sizes its
column by grid track width, not by the SVG's content height. The SVG itself sets
`width:100%; height:auto`, so its rendered height is `columnWidth × (viewBoxHeight /
viewBoxWidth)` — purely a function of the viewBox's aspect ratio. A taller/narrower
viewBox therefore renders taller at the same column width — today's `640×250` (ratio
0.39) leaves that height mostly unused.

**This does not mean the height is free to spend, though** (corrected during
implementation, see Decisions/Risks below): `.panneau`'s own available height is fixed and
`overflow: hidden` at the projection floor, so how much of that "unused" room the schema
column can actually claim depends on how much `corps`/`claim` already used above it — a
question the original reasoning didn't account for and had to be measured, not assumed.

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

**Stack the two panels vertically in one SVG, compact: `viewBox="0 0 300 236"`.** Each
panel keeps its internal geometry proportionally similar to today's (ground line,
gradient sharp-zone rect(s), marker line(s), caption text) — shifted into its own
vertical band instead of a horizontal half. The divider between them rotates from a
vertical line to a horizontal one. The `vous` marker sits at the near (left) end of each
panel's own ground line, same as `ZoneNette.astro`'s convention.

**Dimensions were derived from real measurement, not estimated.** An initial `300×500`
attempt (ratio 1.67, following the original per-panel proportions roughly doubled) was
built and checked with Playwright against the actual rendered page: the real ceiling —
schema column's available-height ÷ its rendered width — is as low as ~0.88 at 1280×720,
the tightest supported projection breakpoint. `300×236` (ratio 0.79) fits under that with
margin. To get there at usable type sizes, each panel dropped from ~230 units tall to
~110: type shrank (12/10 instead of 15/13), rect/line spacing tightened, and panel A's
arrow annotation (pointing from one marker to the other) was cut — the solid/dashed
marker pair plus the "le point se déplace" caption already carry that meaning without it.

Final bands:
- Panel A (mise au point): y 0–110 — title/subtitle, ground line with `vous` + two point
  markers (current position, alternate position), two caption lines, no arrow.
- Divider: horizontal rule at y 117.
- Panel B (profondeur de champ): y 121–232 — mirrors panel A's structure with the
  fixed-point / variable-thickness drawing it already has.

**`aria-label` and the component's doc comment get rewritten for the new orientation.**
Both currently say "à gauche… à droite…"; both must say "en haut… en bas…" instead, or the
accessible description stops matching the visual.

## Risks / Trade-offs

**The taller SVG might not fit the panel's available height, causing real overflow, not
just idle space. — Happened, and was caught.** The initial `300×500` attempt cropped
199px at 1024×768 and 442px at 1280×720 (`.panneau`'s `overflow: hidden` clipping, exactly
as `verifier:projection` is built to catch — see tasks.md 3.2). The first verifier run had
actually been against a stale `dist/` build and read as false-clean; re-running after
`npm run build` caught it for real. Resolution: measured the real ceiling in a browser
(available height ÷ rendered width, at both projection breakpoints) instead of guessing
again, then rebuilt compact (`300×236`) to fit under it — see Decisions.

**Refactoring `ZoneNette.astro` touches a diagram outside this change's stated trigger
screen. — Confirmed safe.** Verified `zone-nette`'s two call sites (`la-definition`,
`ce-qui-change-l-epaisseur`) render pixel-identically before/after (`la-definition`
checked byte-for-byte via `git stash` against `main`); both do show a pre-existing
corps/aparte text-overlap bug, confirmed present on `main` before this change too and
unrelated to the marker swap.

**Not anticipated: `point-et-zone` has a second call site.** `lecons/3.yaml`'s
`definir-une-intention` reuses the same component as a callback panel ("le même
raisonnement qu'à la séance 1"). Missed during proposal/design because the search that
grounded this change only looked at leçon 1. It shares the same fix automatically (same
component), and was verified separately once found (tasks.md 3.2, 3.6) — no separate
content change was needed, but it's a reminder to grep every call site of a shared
component before scoping a change to "the screen that motivated it."
