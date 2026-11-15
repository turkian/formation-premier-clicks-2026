## ADDED Requirements

### Requirement: Session 3's « Faire imaginer » panel has no aside

Session 3's « Faire imaginer » panel SHALL show its claim and its two cards, and SHALL NOT show an
aside under the cards. The presenter tells the Stieglitz anecdote and names other photographers out
loud.

#### Scenario: The « Faire imaginer » panel is displayed

- **WHEN** the « Faire imaginer » panel of session 3 is displayed
- **THEN** it shows the claim « Ce que la photo ne montre pas, celui qui la regarde l'invente. » and
  the cards « Ce qu'on ne montre pas » and « L'avant et l'après » with their photographs
- **AND** no aside appears between the cards and the photo credits
- **AND** the names « Cartier-Bresson » and « Crewdson » appear nowhere on the screen

## MODIFIED Requirements

### Requirement: The beyond-composition block shows only public-domain photographs

The beyond-composition block's photographs SHALL be archival photographs in the public domain or
the club's own photographs. A protected photographer's work MAY be named and linked in an aside,
and SHALL NOT be shown.

#### Scenario: The block mentions a protected photographer

- **WHEN** the block mentions a photograph by a protected photographer
- **THEN** the photographer and the photograph are named, and a link MAY lead to it
- **AND** no image of that photograph is shown on the site
