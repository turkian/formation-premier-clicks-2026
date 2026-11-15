# Proposal

## Why

The « Faire imaginer » panel in session 3 ends with an aside under its cards: Stieglitz waiting three
hours in the storm, Cartier-Bresson's « instant décisif » and Crewdson's unfinished stories. The claim
and the two cards already make the point. The presenter can tell the anecdote and name the
photographers in the room.

## What Changes

- Remove the `aparte` from the `au-dela/faire-imaginer` panel in `src/src/content/lecons/3.yaml`.
- Remove the rights comment « Cartier-Bresson et Crewdson sont protégés : nommés en aparté, jamais
  montrés. » above the `au-dela` block, since neither photographer is named in the content anymore.
- The panel keeps its claim, its two columns (titles, icons, bodies, images, credits) and its photo
  credit line.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that session 3's « Faire imaginer » panel shows no aside under its
  cards.

## Impact

- `src/src/content/lecons/3.yaml`: the six-line `aparte` block of `faire-imaginer` and one comment
  line removed.
- No schema or component change: `aparte` is already optional on `panneau` screens.
- The links to Henri Cartier-Bresson and Gregory Crewdson leave the site; they appear nowhere else.
- The screen gets shorter at 4:3 and 16:9. This only frees space, so the projection and phone checks
  should still pass.
