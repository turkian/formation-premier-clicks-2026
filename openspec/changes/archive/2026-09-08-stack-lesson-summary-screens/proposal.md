## Why

A lesson summary (`/lecons/<n>`) lists each block's screens in a `.liste-simple` grid that uses
`auto-fit`/`minmax` to fill available width. On a phone this collapses to one column, but on a
projector or desktop viewport it reflows into two or three columns depending on how many screens
a block has. The screen order is still document order, but the visual shape changes with every
block and every viewport — a block of four screens draws as a 2x2 grid, a block of three draws as
one row, a block of five draws as an uneven 3+2. There is no single, stable "down the page" scan
path a reader can rely on across blocks or screen widths.

The summary's whole purpose (per the existing "A lesson is entered at any point" requirement) is
to be the thing a participant scans to find where they are or where to go next — on the projector
at the start of a session, on a phone during a later re-read. That scan should look the same
regardless of which block it is or how wide the screen is.

## What Changes

- The `.liste-simple` grid (`src/src/styles/carrefour.css`) becomes a fixed single column at
  every viewport width, instead of `repeat(auto-fit, minmax(min(16rem, 100%), 1fr))`. A block's
  screens always stack top to bottom.
- `.liste-simple` is used in exactly one place (`src/src/pages/lecons/[numero]/index.astro`), so
  no other page is affected by this rule change.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `lessons`: "A lesson is entered at any point" gains a scenario establishing that a block's
  screen list is a single vertical column at every viewport width, not just on a phone.

## Impact

- `src/src/styles/carrefour.css` — `.liste-simple` rule.
- `src/src/pages/lecons/[numero]/index.astro` — the only consumer of that rule; no markup change
  expected, layout only.
