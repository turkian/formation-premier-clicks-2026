## Context

See proposal.md - Why. Relevant constraints already in place:

- This screen is a `panneau` (`content.config.ts`'s `ecranPanneau`), authored as `titre`, `claim`,
  `corps`, optional `schema`, optional `aparte` — no `etats` here (it's a static panel, not
  cumulative). `aparte` is documented in that schema as *"le détail sans coût : rien de nécessaire
  pour suivre le bloc"* — genuinely optional, supplementary detail, which is why removing it
  entirely (rather than rephrasing its content) is a valid move, not a loss of required information.
- The project's readability floor states a concept panel holds "environ 100 mots plus un schéma ou
  un tableau," and must stay fully visible at 4:3 (1024×768) projection with no scrolling. Growing
  the table from 3 to 5 rows is the main risk this design needs to manage.
- Only one file references this screen's `id` (`grep` confirmed, see proposal.md - Impact), so the
  rename is contained and needs no other update.

## Goals / Non-Goals

**Goals:**
- Land the five-row table (portrait, macro, `f/16`, paysage `f/2`, focus-point) within the existing
  panel's visual budget, with no row needing more than a short phrase per cell.
- Pick a concrete replacement `id`/`titre` now, so this isn't left as an implementation-time
  guess.

**Non-Goals:**
- Redesigning `Panneau.astro`'s table rendering or grid CSS. This panel already renders a
  markdown table in `corps` today (three rows); five rows is the same rendering path, not a new
  one. If actual projection testing during implementation shows five rows genuinely don't fit,
  that's a follow-up, not something to pre-solve here.
- Touching `le-quatrieme-facteur` (the next screen) — background blur stays there, untouched, per
  proposal.md.

## Decisions

**Two rejected approaches, tried and measured before landing on the current one.** This section
originally proposed a single five-row table on one screen, with the id/titre renamed to something
count-agnostic. Implementation-time testing (Playwright screenshots at 16:9, 4:3, and phone width)
showed that didn't fit — row 5 was clipped at 16:9 and rows 4–5 at 4:3, confirming the risk this
document had flagged and deferred. The next attempt used this panel's existing cumulative-`etats`
mechanism (base `corps` = original 3 rows, a new état's `corps` = the 2 new rows), matching the
pattern already used by `le-facteur-invisible`/`le-quatrieme-facteur` elsewhere in this lesson.
That also failed testing: revealing the état switches the panel to a two-column "dense" layout
(`lecon.css`'s `.panneau[data-dense]` grid), and squeezing *either* table to half width roughly
doubled its height from text wrapping — worse than the single-table version at 4:3, since now both
halves clipped. Root cause: `.region-encadres` (`lecon.css:132`) is built for short `encadre`
callouts (a sentence or two), not a second wide table; a three-column table doesn't survive being
halved in width regardless of row count.

**Chosen approach: split into two full-width single-column screens.** `trois-frustrations` keeps
its original three rows (portrait, macro, `f/16`) and reverts to its original `id`/`titre`/`claim`
unchanged — it's genuinely "trois frustrations" again. A new screen, `paysage-deux-causes`, added
immediately after it in the same bloc, carries the two new rows (paysage `f/2`, focus-point) as its
own full-width table. Neither screen is ever squeezed to half width, so neither hits the wrapping
problem that broke the other two approaches. Playwright-verified at 16:9, 4:3, and phone width:
both screens render with comfortable margin, no clipping, no page-level horizontal scroll.

**New screen's `id`: `paysage-deux-causes`. `titre`: "Le paysage a deux causes de flou possibles".
`claim`: "Un paysage flou n'a pas toujours la même cause."** This groups the two rows by what they
share — both present as "a blurry landscape" but have different causes (aperture vs. focus-point
placement) and different fixes — rather than by a count that would need revisiting again if a
sixth frustration surfaces later. Alternative considered: grouping by theme instead (e.g. all three
landscape-related rows — `f/16`, paysage `f/2`, and focus-point — on one screen, portrait/macro on
the other). Rejected in favor of the order-preserving split: it keeps `trois-frustrations`
untouched (no id/title churn on the screen the user already reviewed and approved), and cleanly
separates "the original three" from "the two refinements added during this session."

**Every cell stays a short clause, not a full sentence**, matching the terseness already used in
the original three-row version (e.g. "Ce n'est pas votre faute" was cut for exactly this reason).
This no longer carries the same overflow risk it did in the five-row/single-screen design, but it's
kept anyway — it's simply the panel's established voice.

**Aperture mistakes (`f/16` and `f/2`) stay as separate rows, on separate screens now** — the
user's original "keep the 2 fixes separate, it's clearer" decision still holds; the split just
means they're no longer visually adjacent. Both keep their own row rather than being merged.

## Risks / Trade-offs

- [Risk] The lesson's total screen count grows by one (39 → 40), shifting every later screen's
  position number in bloc 5 onward. → Not mitigated, because it isn't a defect: the lessons spec
  requires each screen's own deep link to stay stable, not the total count or other screens'
  ordinal position, and nothing in the codebase hardcodes screen counts (confirmed: only this
  panel's own `id` was referenced anywhere in `src/`).
- [Risk] Two new-approach dead ends (single five-row table, cumulative états) were built and
  discarded before this one. → Not a forward-looking risk, but worth recording here (rather than
  only in tasks.md) so a future reader of this design doesn't re-attempt either without first
  reading why they failed, above.
