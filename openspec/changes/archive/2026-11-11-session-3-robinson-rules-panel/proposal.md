# Proposal

## Why

The third screen of session 3's history block (`les-regles-s-ecrivent`) shows page 47 of
Robinson's *Pictorial Effect in Photography* (1869) alone, centred, with an aside that names the
book's broad topics. The room sees *that* rules were written down, but not *which* ones: the
chapter's ten "Simple Rules" are unreadable on a projected scan and nowhere in the text. Listing
them — the dated ones included — shows what photographers of the 1860s were told, and gives the
later composition block something to depart from.

## What Changes

- The screen becomes a concept panel: the scan on the left, Robinson's rules on the right.
- The right column lists all ten rules of Chapter IX (pp. 47–49), summarized in French and grouped
  under four headings — *Le point de vue*, *Les lignes*, *L'équilibre*, *Le cadre* — keeping
  Robinson's prescriptive « jamais ». No rule is dropped for being outdated, and none points
  forward to a later screen.
- The scan keeps its caption, its credit and its enlargement on click. It no longer has a loupe: the room reads the rules on the right, not the page, and the hint line goes back to the scan as height.
- The claim is unchanged. The aside keeps only its sentence on Lake Price and Robinson; the closing line « Les gestes qui suivent viennent de cette histoire. Ce sont des outils, pas des lois. » is removed.
- A concept panel gains an optional *illustration*: one archival document (book page, engraving)
  shown in the left column, with an optional single-image loupe. The body moves to the right.
  Panels without an illustration render exactly as before.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: a concept panel MAY carry one archival document beside its body (an exception to
  "Demonstrations are separate screens from concept panels"); the history block's third screen
  SHALL list Robinson's ten rules beside the scan.
- `demo-media`: a panel's archival illustration MAY declare a single-image loupe, with the same
  behaviour and hint as free demonstration photographs.

## Impact

- `src/src/content.config.ts` — `ecranPanneau` gains an optional `illustration` field.
- `src/src/components/ecrans/Panneau.astro` — renders the illustration region and wires the loupe.
- `src/src/styles/lecon.css` — a panel layout with the illustration on the left (projection,
  4:3, phone, print).
- `src/src/content/lecons/3.yaml` — `les-regles-s-ecrivent` moves from `demonstration` to
  `panneau`.
- No new image: `public/demos/l3-histoire-robinson-effet.jpg` is reused. The shot list derived
  from declared slots must still include it.
