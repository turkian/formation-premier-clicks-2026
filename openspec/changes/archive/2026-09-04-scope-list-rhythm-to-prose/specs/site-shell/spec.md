## ADDED Requirements

### Requirement: Vertical rhythm belongs to prose, not to list items

Spacing between list items SHALL be a property of the prose contexts the site renders text in,
not a property of the list item element. A list used as a layout — items placed side by side in
a grid or a flex container — SHALL NOT inherit prose spacing, and SHALL be spaced only by the
gap its own layout declares.

This is a cross-cutting presentation contract, in the same way the French-Québec typographic
conventions and the projection legibility floors are: it governs the session sommaires, the
lexique's brand selector, the plan de cours, lesson bodies, and the printed sheets alike.

#### Scenario: Items are laid out side by side

- **WHEN** list items are displayed as a grid or a wrapping row rather than as running prose
- **THEN** the space between them is exactly the gap that layout declares
- **AND** no additional space is contributed by the items themselves

#### Scenario: A list runs as prose

- **WHEN** a list is part of running text — a lesson body, an aside, a printed sheet, the plan
  de cours, the lexique's index
- **THEN** its items are separated by that context's own rhythm
- **AND** a context that states its own spacing keeps that spacing rather than a site-wide default

#### Scenario: A new layout is built out of list items

- **WHEN** a future section lays out list items in a grid or a wrapping row
- **THEN** it inherits no prose spacing and needs no rule to suppress any
- **AND** it is not required to know that a site-wide list rule exists

### Requirement: Items sharing a row occupy the same height

Wherever two or more items are displayed side by side on one row — the hub's cards, a session
sommaire's screen tiles, the lexique's brand chips — they SHALL occupy the same height as one
another, whatever the length of the text each carries and whichever position in the row it holds.
A row SHALL be no taller than the tallest item it actually contains.

#### Scenario: Titles in a row wrap to different numbers of lines

- **WHEN** one item's title wraps to two lines and its neighbours' titles fit on one
- **THEN** every item in the row is drawn to the same height as the tallest
- **AND** the row is no taller than that item requires

#### Scenario: An item's position in the row changes

- **WHEN** the same item is displayed first in a row, in the middle, or last
- **THEN** it is drawn at the same height in each case
- **AND** the last item in a row is not drawn differently from its neighbours

#### Scenario: The row reflows at a narrower width

- **WHEN** the viewport narrows and a row reflows to fewer columns
- **THEN** the items sharing each resulting row still occupy the same height
- **AND** the page does not scroll horizontally

#### Scenario: The alignment is verified rather than inspected

- **WHEN** the site's verification suite is run against the built site
- **THEN** it reports a failure naming the page and the row whenever two items sharing a row
  differ in height
- **AND** a difference too small to catch by eye is reported as a failure like any other
