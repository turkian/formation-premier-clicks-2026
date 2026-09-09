## Context

See `proposal.md` — Why. This section covers only what shapes the approach.

Two facts about the current codebase determine the implementation:

- **The target design is not being invented here; it is being moved.** `src/src/pages/fiches/index.astro`
  already renders the seven sheets as `.carte` with the label / `titre` / `sousTitre` triplet, and
  already sorts them `rang` then `localeCompare(…, 'fr')`. The hub duplicates the listing with a
  different component and a weaker sort. The change is a deduplication of treatment, and its
  correctness test is that the two listings become indistinguishable in structure.
- **`.liste-simple` is not dead after this change.** `src/src/pages/lecons/[numero]/index.astro`
  uses it for a block's screen list, where the label-above-title shape is built inline with
  `style` attributes rather than with `.carte`. That page is out of scope for the card work, but
  it shares the alignment defect, which lives in the class rather than in either page.

## Decisions

### D1 — The hub gets the full card, not a reduced variant

A compact variant — the card's surface, radius, and hover, but the title alone — was the cheaper
option and was rejected. It would make the sheets *look* like the other cards while still being
the only hub entry that does not say what its destination is for, which is the half of the problem
that a participant standing in a parking lot actually feels. « Recettes d'exportation » does not
tell anyone whether it is worth a tap; « Trois destinations, trois réglages, rien à décider » does.

The `sousTitre` is already written for all seven sheets, already reviewed, and already rendered on
`/fiches`. Nothing has to be authored for the full card to be correct.

### D2 — The label reuses the `/fiches` rule verbatim

`fiche.data.seance ? « Séance N » : « Référence »`. The ordinal is the same vocabulary the séance
cards use two sections above, which is the point: the hub's three kinds of entry become one kind
of object with one labelling scheme. `lexique-des-termes` is the only sheet with no `seance`, and
« Référence » is what `/fiches` already calls it.

This is consistent with `site-shell`'s « Site copy is true whenever it is read »: an ordinal, never
a position relative to the reader.

### D3 — The alignment defect is fixed in the class, not worked around in the page

The hub's ragged rows disappear on their own once the sheets are `.carte`, because `.carte` is
itself the grid item and grid stretches it. That would have left `.liste-simple` broken in its
remaining consumer, where nobody would connect the symptom to this change.

`.liste-simple li { display: flex }` plus `width: 100%` on the link is the minimal fix: a flex
item stretches on the cross axis by default, so the link takes its `<li>`'s full height without
`height: 100%` and without touching the grid definition. `display: block` on the link is kept — it
is what the lesson sommaire's two stacked spans rely on.

## Implementation Notes

- The hub's `.map` callback keeps its expression body; the `sousTitre` is guarded (`&&`) even
  though all seven sheets currently have one, because the schema declares it `optional()`.
- `typo()` continues to wrap every rendered string, including the « Séance N » label, so the
  narrow no-break space before French punctuation is applied on the hub exactly as on `/fiches`.
- Verification is the existing suite: `npm run build`, then `npm run verifier` — the phone-width
  and link checks are the ones this change can plausibly break.
