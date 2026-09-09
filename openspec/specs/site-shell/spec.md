# site-shell Specification

## Purpose
The site's entry point and shared frame: a home hub that reaches every section of the formation,
the typography and legibility conventions all sections inherit, and the hosting behavior that
lets the site be projected in a room with unreliable network access.
## Requirements
### Requirement: Home hub reaches all content

The site SHALL provide a single home page from which every lesson, the lexique, and every
printable reference sheet is reachable in one click, plus the course description aimed at
prospective club members.

Every entry on the hub SHALL be presented with the same treatment, whatever kind of destination
it leads to: a label naming its kind, its title, and one line stating what the destination is
for. No kind of destination SHALL be presented as a bare title.

#### Scenario: Animator opens the site before a session

- **WHEN** the animator loads the site root
- **THEN** the three lessons, the lexique, and the reference sheet index are each reachable by one link
- **AND** the three lessons are presented as peers, none marked current, dated, or otherwise privileged

#### Scenario: Participant arrives from a printed handout

- **WHEN** a participant loads the site root on a phone
- **THEN** the hub is readable and navigable at phone width without horizontal scrolling
- **AND** the lexique and reference sections are reachable without entering a lesson

#### Scenario: A session card describes its lesson

- **WHEN** a lesson's card is displayed on the hub
- **THEN** it identifies the lesson by its ordinal and its subject
- **AND** it carries no date, schedule, or claim about which session is next

#### Scenario: A reference sheet is offered on the hub

- **WHEN** a reference sheet is listed on the hub
- **THEN** it is presented with the same treatment as a lesson and as a section, carrying its
  séance ordinal — or a label marking it as belonging to no single séance — its title, and the
  line that states what it is for
- **AND** a participant can tell what the sheet is for without opening it

#### Scenario: Entries of the same kind are displayed side by side

- **WHEN** two or more hub entries of the same kind are displayed on one row
- **THEN** they occupy the same height, whether or not their titles wrap to a different number of lines
- **AND** the row reflows to fewer columns at narrower widths rather than scrolling horizontally

#### Scenario: The hub and the reference index list the same sheets

- **WHEN** the hub's list of reference sheets and the reference index are compared
- **THEN** they contain the same sheets in the same order
- **AND** a sheet added to the collection appears in both without either page being edited

### Requirement: Site is served as a static site on a project path

The site SHALL be publishable as static files to GitHub Pages under a repository sub-path, with
no server-side runtime and no third-party realtime service.

#### Scenario: Deployed under a repository sub-path

- **WHEN** the site is deployed to a GitHub Pages project URL such as `/formation-premier-clicks-2026/`
- **THEN** every internal link, asset reference, and deep link resolves correctly
- **AND** no page depends on a request to a non-static endpoint in order to render

### Requirement: Lessons remain usable without network access

The site SHALL continue to display any lesson, reference sheet, and lexique page that has been
visited once, after network access is lost.

#### Scenario: Room wifi fails mid-session

- **WHEN** the animator has loaded a lesson and the network then becomes unavailable
- **THEN** navigating between that lesson's screens continues to work
- **AND** interactive components on those screens continue to respond

#### Scenario: Animator prepares an offline fallback

- **WHEN** the animator wants a guaranteed fallback independent of hosting
- **THEN** the repository supports producing a local copy of the site that opens and navigates
  without a network connection

### Requirement: The site states its offline behavior rather than instructing a deadline

Where the site tells participants about working without network access, it SHALL describe what
the site does, not instruct the reader to act before a scheduled event.

#### Scenario: A participant learns the site works offline

- **WHEN** copy explains that the site remains available without network access
- **THEN** it states the condition under which that is true
- **AND** it does not condition the instruction on an upcoming session the reader may not attend

### Requirement: French-Québec typographic conventions

All rendered text SHALL follow the French typographic conventions used in the source content:
non-breaking spaces before `:`, `;`, `!`, and `?`, French quotation marks `« »` with
non-breaking inner spaces, and non-breaking spaces inside numbers and units (`1 h 50`, `f/5.6`,
`10 × 15 cm`).

#### Scenario: A line wraps near punctuation

- **WHEN** a line of text wraps immediately before a `:` or inside `« … »`
- **THEN** the punctuation or quotation mark stays attached to the word it belongs to
- **AND** a unit is never separated from its number across a line break

### Requirement: Site copy is true whenever it is read

All rendered copy SHALL be true regardless of when it is read. Copy SHALL refer to a session by
its ordinal (« la séance 2 ») and SHALL NOT locate a session by a clock, a date, or a moment
relative to the reader (« ce soir », « cette soirée », « la prochaine séance »). The site SHALL
NOT compute, derive, or assert which session is current, imminent, or past.

This rule governs all rendered text, in the same way the French-Québec typographic conventions
do: lesson screens, lexique brand sheets, reference sheets, and page templates alike.

#### Scenario: A participant reads a lesson months after the formation

- **WHEN** a participant opens any lesson screen at an arbitrary later date
- **THEN** every statement on the screen is still accurate
- **AND** no statement depends on the reader being in a room on a particular evening

#### Scenario: Copy refers to another session

- **WHEN** copy needs to point at material covered in a different session
- **THEN** it names that session by ordinal
- **AND** it does not describe that session as next, previous, or upcoming

#### Scenario: A word carries a meaning unrelated to a session

- **WHEN** copy uses « soirée » in a sense unrelated to a formation session — a party
  photographed in low light, or the club's « soirée critique » event
- **THEN** that wording is preserved unchanged
- **AND** the ordinal rule does not apply to it

#### Scenario: A screen describes the physical room

- **WHEN** a screen exists to stage a group session — a break, a written-question wall, a live
  question period
- **THEN** the screen remains part of the lesson, because sessions may still be run as a group
- **AND** only its references to a session are corrected, not its description of the room

### Requirement: Projection legibility floors

Every screen intended for projection SHALL respect minimum legibility rules so that content is
readable from the back of a room of about thirty people.

#### Scenario: Content is read from the back of the room

- **WHEN** a lesson screen is projected
- **THEN** the screen's headline claim, the shape of its diagram, and the number of items in its
  body are distinguishable from the back of the room
- **AND** no information required to follow the block is carried only by the smallest text tier

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
