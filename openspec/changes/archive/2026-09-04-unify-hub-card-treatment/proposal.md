## Why

The hub presents three kinds of destination — the three séances, the three consultable sections,
and the seven reference sheets — and the third kind is built out of a different component than
the first two. Séances and sections are `.carte`: a label, a title, and one line saying what the
destination is for. The reference sheets are `.liste-simple`: a padded link carrying the bare
title, in a tighter corner radius, at the inherited body size, with no label and no description.

Two consequences, both visible on the page:

- **The sheets read as a lesser kind of thing than they are.** They are the artifact a participant
  keeps after the formation — the whole point of `printable-references`. On the hub they look
  like a footer link list placed under two sections of real cards.
- **The tiles in a row do not align.** `.liste-simple` is a grid whose items are `<li>`, and the
  `<a>` inside each `<li>` is `display: block`. The `<li>` stretches to its row's height; the
  link inside it does not. A one-line title therefore leaves a short tile beside a title that
  wraps to two lines. `.carte` never had this problem, because there the link *is* the grid item.

The site already owns the correct treatment and merely fails to use it in one place: the
reference index at `/fiches` renders exactly the card this change moves to the hub — label
(« Séance 1 » or « Référence »), `titre`, `sousTitre` — from the same collection, with the same
sort. The hub is the odd page out, not the page that needs a new design.

## What Changes

- **The hub's reference-sheet list becomes the same card as every other hub entry.**
  `src/src/pages/index.astro` replaces its `<ul class="liste-simple">` with the `.grille` /
  `.carte` markup already used by the two sections above it and by `/fiches`. Each card carries
  the sheet's séance ordinal (or « Référence » for the sheet that belongs to no single séance),
  its `titre`, and its `sousTitre`.
- **The hub sorts the sheets the way the reference index does.** `rang`, then title by French
  collation, so a future pair of sheets sharing a `rang` cannot list in one order on the hub and
  another on `/fiches`.
- **The `.liste-simple` stretch defect is fixed where the class still lives.** The class remains
  in use on the lesson sommaire (`/lecons/<n>`), which lists a block's screens and has the same
  ragged rows for the same reason. The `<li>` becomes a flex container so its link stretches with
  it. This is the defect's only other site.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-shell`: the hub's requirement gains what it never stated — that a hub entry describes its
  destination, not merely names it, and that entries of the same kind align. The requirement was
  written about *reachability* (« each reachable by one link »), which the old list satisfied
  while looking like an afterthought; reachability alone turned out not to be the whole contract.

`printable-references` needs no delta. Its requirements govern what a sheet is and how it prints,
and its « a new sheet appears in the reference index without any other page being edited » already
held on the hub before this change and still holds after it — both listings are built from the
collection. Nothing in that spec's contract changes.

## Impact

- **Modified — templates**: `src/src/pages/index.astro` (the fiches section's markup, and the
  sort's tie-break).
- **Modified — styles**: `src/src/styles/carrefour.css` (`.liste-simple li` added,
  `width: 100%` on `.liste-simple a`). No rule is removed: `.liste-simple` keeps its one
  remaining consumer.
- **No content change.** Every string the new cards render — `titre`, `sousTitre`, `seance` —
  already exists in the front matter of all seven sheets and is already rendered on `/fiches`.
- **No dependency, build, or deployment change.**
- **The hub grows longer.** Seven cards replace seven single-line links, which is the cost of the
  change and is accepted: the hub is a carrefour whose stated job is that everything is one click
  away, and a card that says what a sheet is for saves the click that the bare title costs.
- **Not in scope**: the « Fiches de référence » card in the « Consulter » section stays. It leads
  to the printable index, which is a different destination than any single sheet.
