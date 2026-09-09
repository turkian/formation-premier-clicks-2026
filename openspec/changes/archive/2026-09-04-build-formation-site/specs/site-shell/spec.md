## Purpose

The site's entry point and shared frame: a home hub that reaches every section of the formation,
the typography and legibility conventions all sections inherit, and the hosting behavior that
lets the site be projected in a room with unreliable network access.

## ADDED Requirements

### Requirement: Home hub reaches all content

The site SHALL provide a single home page from which every lesson, the lexique, and every
printable reference sheet is reachable in one click, plus the course description aimed at
prospective club members.

#### Scenario: Animator opens the site before a session

- **WHEN** the animator loads the site root
- **THEN** the three lessons, the lexique, and the reference sheet index are each reachable by one link
- **AND** the current session's lesson is identifiable without reading link text in full

#### Scenario: Participant arrives from a printed handout

- **WHEN** a participant loads the site root on a phone
- **THEN** the hub is readable and navigable at phone width without horizontal scrolling
- **AND** the lexique and reference sections are reachable without entering a lesson

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

### Requirement: French-Québec typographic conventions

All rendered text SHALL follow the French typographic conventions used in the source content:
non-breaking spaces before `:`, `;`, `!`, and `?`, French quotation marks `« »` with
non-breaking inner spaces, and non-breaking spaces inside numbers and units (`1 h 50`, `f/5.6`,
`10 × 15 cm`).

#### Scenario: A line wraps near punctuation

- **WHEN** a line of text wraps immediately before a `:` or inside `« … »`
- **THEN** the punctuation or quotation mark stays attached to the word it belongs to
- **AND** a unit is never separated from its number across a line break

### Requirement: Projection legibility floors

Every screen intended for projection SHALL respect minimum legibility rules so that content is
readable from the back of a room of about thirty people.

#### Scenario: Content is read from the back of the room

- **WHEN** a lesson screen is projected
- **THEN** the screen's headline claim, the shape of its diagram, and the number of items in its
  body are distinguishable from the back of the room
- **AND** no information required to follow the block is carried only by the smallest text tier
