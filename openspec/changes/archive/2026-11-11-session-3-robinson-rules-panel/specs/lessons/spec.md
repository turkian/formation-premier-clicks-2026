## MODIFIED Requirements

### Requirement: Demonstrations are separate screens from concept panels

Demonstration photographs SHALL be placed on their own screens, not inside concept panels, so
that both keep full usable space. Diagrams MAY appear inside a concept panel. A diagram MAY
include images derived from a single photograph to illustrate one variable it explains — for
example, the same frame rendered at the exposure each aperture admits — provided the diagram
states that the images are a simulation. A comparison of separately taken photographs remains a
demonstration screen. A concept panel MAY carry one archival document — a book page or an
engraving — as an illustration beside its body, when the body states what that document says;
the illustration is not a demonstration photograph.

#### Scenario: A comparison series is shown

- **WHEN** a demonstration screen presents a comparison series
- **THEN** the photographs occupy the screen's usable space
- **AND** a caption names the single variable that changed between them
- **AND** no concept panel body text competes for that space

#### Scenario: A diagram simulates a variable from one photograph

- **WHEN** a concept panel's diagram shows images derived from one photograph
- **THEN** the diagram or its caption says that the images are a simulation
- **AND** only the variable the diagram explains differs between the images

#### Scenario: A concept panel carries an archival illustration

- **WHEN** a concept panel declares an archival illustration and is displayed in projection
- **THEN** the illustration occupies the left column and the body the right column, both under
  the statement
- **AND** the illustration shows its caption and its credit, and can be enlarged to its full frame
- **AND** the panel carries no diagram alongside it

#### Scenario: An illustrated panel fits a 4:3 projector

- **WHEN** a concept panel with an archival illustration is displayed at 1024 × 768
- **THEN** the statement, the illustration, the whole body and the aside are visible without
  scrolling
- **AND** the body stays clearly above the aside type size

#### Scenario: An illustrated panel is read on a phone or printed

- **WHEN** a concept panel with an archival illustration is displayed on a phone or printed
- **THEN** the statement, the illustration, the body and the aside appear in a single column, in
  that order

#### Scenario: A panel without an illustration

- **WHEN** a concept panel declares no illustration
- **THEN** it is laid out exactly as before

### Requirement: The history block shows where composition rules come from

Session 3's history block SHALL present, on at most three screens and in this order: composition
older than photography, photography becoming an art by composing like painting, and the first
composition rules written for photographers. The block SHALL end before the twentieth century.

#### Scenario: The history block is read in order

- **WHEN** the history block's screens are displayed in sequence
- **THEN** the three stages appear in the order above, on no more than three screens
- **AND** each stage is illustrated by at least one archival image: a photograph, an engraving or
  a book page

#### Scenario: The first history screen is displayed

- **WHEN** the first screen of the history block is displayed
- **THEN** its statement is that composition is older than photography
- **AND** it shows that, in 1797, an engraver was already giving advice on how to arrange a
  landscape (where the sky, the land and the water go), before photography existed
- **AND** neither its statement, its aside nor its image captions name the rule of thirds or
  mention the camera's grid

#### Scenario: The first history screen does not repeat the loupe hint

- **WHEN** the first screen of the history block offers a loupe on its images
- **THEN** the hint to hold Shift appears once, under the images
- **AND** the aside does not repeat it

#### Scenario: The second history screen shows staged photographs in date order

- **WHEN** the second screen of the history block is displayed
- **THEN** its images are staged photographs, each assembled from several negatives, shown
  oldest first
- **AND** its aside and captions name only photographers whose work appears on the screen
- **AND** none of its images shows a nude or partly nude figure

#### Scenario: The composition block follows the history block

- **WHEN** the composition block's screens are read
- **THEN** no technique is presented as borrowed from a named painting or painter
- **AND** the only historical reference in the block is the 1797 origin of the rule of thirds,
  on the screen that places the subject

## ADDED Requirements

### Requirement: The third history screen lists Robinson's simple rules

The third screen of session 3's history block SHALL be a concept panel showing page 47 of
Robinson's *Pictorial Effect in Photography* (1869) as its illustration and, beside it, all ten
rules of the chapter "Simple Rules", summarized in French, grouped under four headings, outdated
rules included. The rules SHALL be stated as Robinson stated them, without pointing to a later
screen.

#### Scenario: The rules are listed beside the scan

- **WHEN** the third history screen is displayed in projection
- **THEN** the scan of page 47 appears on the left with its caption « Robinson, 1869 — « Simple
  Rules » » (author, date, title) and its credit
- **AND** the right column shows, in this order, the headings *Le point de vue*, *Les lignes*,
  *L'équilibre* and *Le cadre*

#### Scenario: All ten rules are present

- **WHEN** the rules of the third history screen are read
- **THEN** *Le point de vue* holds: change position, a few steps change the lines; and seen at an
  angle rather than from the front
- **AND** *Les lignes* holds: no parallel lines, with an undulating foreground under a straight
  horizon; a few straight lines among the curves; and never the main subjects stacked in a line
- **AND** *L'équilibre* holds: never a mirror symmetry; a street or a river never taken from the
  centre; and never the horizon in the middle
- **AND** *Le cadre* holds: a picture closed in on its edges; and an arch never resting on the
  edge of the frame

#### Scenario: The rules keep Robinson's tone and stay in the past

- **WHEN** the rules of the third history screen are read
- **THEN** the prescriptive rules keep the word « jamais » where Robinson writes "never"
- **AND** no rule names, links to or announces a later screen or block

#### Scenario: The rest of the screen is unchanged

- **WHEN** the third history screen is displayed
- **THEN** its statement is « Dans les années 1860, des photographes mettent les règles par écrit —
  pour d'autres photographes. »
- **AND** its aside names William Lake Price and Henry Peach Robinson, and says nothing else
- **AND** the screen keeps its stable deep link `les-regles-s-ecrivent`
