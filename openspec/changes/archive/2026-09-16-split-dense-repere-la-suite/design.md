## Context

See proposal.md - Why. `repere` (`src/components/ecrans/Repere.astro`) renders `claim` +
optional `corps` (markdown, so a list or prose) + optional `termes` + optional `aparte`, inside a
fixed-height, `overflow: hidden` scene. Its only adaptive sizing is `[data-dense] .claim`
shrinking to 72 % — `corps` and `aparte` are fixed-size. Unlike `panneau`, `repere` has no
clamp/shrink mechanism for `corps`/`aparte`, because its contract (per the component's own doc
comment) is "peu de contenu, volontairement" — it isn't meant to need one.

Surveying every `repere` screen across the three lessons (18 screens) against the projection
check that currently passes for all of them except `la-suite`:

| Screen | corps shape | aparte | Result |
|---|---|---|---|
| `bienvenue` (1) | 3-item wrapped list | none | passes |
| `quatre-situations` (2) | 4-item short list | none | passes |
| `tour-de-table` (1) | intro + 3-item numbered list + closing line | none | passes |
| `les-sept-gestes` (3) | 3 short paragraphs | present | passes |
| `quatre-stations` (2, "Les ateliers") | table | present | passes |
| most `ouverture`/`pause`/`questions`/`cloture` screens | 1-2 short paragraphs | present or none | pass |
| `la-suite` (3) | 5-item wrapped, multi-clause list | present, substantive | **fails** |

`la-suite` is the only `repere` screen in the entire content set that combines a **list-shaped
corps** with **an aparte**. Every other list-shaped corps stands alone; every screen that carries
an aparte pairs it with prose or a table, not a list. That combination is also where the project's
own readability-floor rule already bites: `openspec/config.yaml` states "rien de nécessaire pour
suivre le bloc ne peut reposer sur le plus petit palier" (nothing necessary to follow the block can
rely on the smallest tier). `la-suite`'s aparte introduces a new commitment (the retouching
workshop) rather than an optional footnote — content that arguably needed to be in `corps`, not
`aparte`, in the first place. Pushing it into the smallest tier is what let the total run over the
genre's implicit budget.

## Goals / Non-Goals

- Goal: split `la-suite` so both resulting screens render fully within the projection floor at
  1024×768 and 1280×720, using the existing split-screen authoring pattern (own `id`, own
  `claim`) already established for demonstration screens.
- Goal: add a build-time check that catches this specific pattern (list corps + aparte on a
  `repere`) before it reaches content, matching the precedent set by the 13.6 demonstration
  image-count check.
- Non-goal: a general word-count or markdown-aware length budget for `repere` content. Rejected
  (see Decisions) — this project's checks work by structural counting, not prose measurement, and
  a structural rule fits this content set with no false positives.
- Non-goal: any change to `Repere.astro` or `lecon.css`. The fix is authored content plus a lint,
  the same shape as the demonstration-slide precedent.

## Decisions

**Decision: enforce "a `repere` corps authored as a list SHALL NOT also carry an aparte,"
rather than a word/line count budget.**

Alternatives considered:
- *Word-count budget* (e.g., "corps + aparte SHALL NOT exceed N words"): rejected. No
  markdown-aware word-counting helper exists anywhere in the scripts today, and a word count
  can't fairly compare a table row (dense per word) against wrapped prose (sparse per word) —
  `quatre-stations`' table would need a different threshold than `la-suite`'s prose to reach the
  same conclusion. The existing 13.6 check counts a fixed structural feature (images), not prose
  volume; a word-count check would be new machinery this project has never needed.
- *Bullet/line count cap alone* (e.g., "corps SHALL NOT exceed 4 list items"): rejected as
  primary rule. It's arbitrary at the boundary (`quatre-situations` has exactly 4 short items and
  is fine; a hypothetical 4-item screen of `la-suite`-length bullets would still overflow but pass)
  and doesn't explain *why* `la-suite` specifically overflows when other list-corps screens don't.
- *CSS-level fix* (clamp/shrink `.repere .corps`/`.aparte` the way `.panneau[data-dense]` shrinks
  its encadrés): rejected as the primary fix. It would need to buy only ~11-20px, which is
  tempting, but it's a genre-wide rendering change made to accommodate one outlier, gives no
  build-time guard against a future author reintroducing the same density, and `repere`'s stated
  contract is "little content, deliberately" — the fix belongs in content and a lint, not in
  making the renderer more permissive.
- **Chosen: "list corps + aparte" is disallowed on a `repere`.** It matches the one dimension
  that actually separates every passing screen from `la-suite` with zero false positives across
  all 18 existing `repere` screens, it's checkable the same structural way the 13.6 check already
  works (inspect authored YAML shape, not render or count words), and it has a principled reason
  independent of curve-fitting to today's content: a list-shaped corps already reads as "the
  content," so pushing additional necessary content into the aparte both breaks the "nothing
  necessary in the smallest tier" rule and is exactly the pattern that overflows.

**Decision: split `la-suite` along its own content boundary — near-term logistics
(sortie, parrain, question channel) vs. ongoing engagement (défi mensuel, soirée critique) — and
move the atelier-de-retouche mention out of the aparte and into corps on whichever screen it lands
on**, rather than trimming content. Trimming was considered and rejected: every bullet carries a
distinct, load-bearing piece of information (a date, a name-lookup instruction, a channel, a
recurring structure, an upcoming session) that the proposal and prior review already treat as
necessary — cutting any of them changes what the room is told, not just how it's presented.
Splitting preserves all of it and is the same low-risk, additive, no-rollback-complexity move the
demonstration-slide change already validated for this codebase.

## Risks / Trade-offs

- [Two screens instead of one changes the `et-maintenant` block's screen count and reading
  rhythm] → Mitigation: this mirrors the exact pattern already shipped for four demonstration
  blocks; the block summary and keyboard navigation already handle an arbitrary number of
  sibling screens without special-casing.
- [The new "list corps + aparte" rule could someday reject a legitimate future repere that
  needs both] → Mitigation: if that happens, it is a single, well-understood check to loosen or
  special-case, in a script that already carries several similarly-scoped, human-adjudicated
  content rules (e.g. the `soir` check, which also expects rare human review of a real diff).

## Migration Plan

Content-only change, no rollback complexity: split the YAML, add the check, verify. Order:
1. Split `la-suite` in `3.yaml` (new id + claim for the split-off screen; move the retouching
   mention from aparte into corps on the screen it now belongs to).
2. Add the build-time check to `verifier-contenu-final.mjs` (models section 13.6).
3. Re-run `verifier:contenu`, `verifier:tout`, and the projection measurement to confirm both new
   screens render fully within 1024×768 and 1280×720.

## Open Questions

None — the split boundary and the check's rule are both decided above.
