## ADDED Requirements

### Requirement: A session opens with a recap that starts from the participants' photos

A session after the first SHALL open with a recap block whose first screen asks the room what they
photographed since the previous session and what they learned, before any concept is restated. The
session SHALL be named by its rank (« depuis la séance 1 »), never by a moment relative to the
reader. The first screen SHALL NOT depend on an exercise having been done, and SHALL NOT show the
animateur's own photographs.

#### Scenario: Someone did nothing since the last session

- **WHEN** the recap's first screen is displayed
- **THEN** it asks about photos in general, not about a specific exercise or setting
- **AND** a participant who took no photos can still answer, for instance by naming what they noticed

#### Scenario: A reader opens the session months later

- **WHEN** the recap's first screen is read outside the room
- **THEN** it refers to the earlier session by its rank
- **AND** it does not claim which session is current, imminent or past

### Requirement: A recap tells one story and fits a short time budget

A recap block SHALL be a single line of argument built from the concepts of the earlier session,
not a re-teach of every earlier screen. It SHALL be designed to be presented in about five to
eight minutes, discussion included, and SHALL end by handing over to a screen that introduces
what the current session adds. Every concept panel in the recap MUST respect the concept-panel
size limits (about 100 words plus one diagram or table).

#### Scenario: The recap of session 2 goes from aperture to building an image

- **WHEN** the recap block of session 2 is read in order
- **THEN** its concept panels present, in this order: aperture as the opening that lets light in,
  larger admitting more and smaller less; aperture also setting the depth of field, explained as
  a zone that stays sharp in front of and behind the subject; focus, with the `AF-S` and `AF-C`
  modes and the effect of the focusing distance on the sharp zone; and the four levers presented
  as an order of choice to build an image, from the scene to the setting, with aperture last
- **AND** none of them introduces shutter speed, ISO or stops
- **AND** none of them claims that a wide aperture always blurs the background

#### Scenario: The levers are presented as an order of choice

- **WHEN** the recap's levers panel is displayed
- **THEN** it lists the background, the photographer's distance, the focal length and the
  aperture, in that order, each with how it is operated
- **AND** it states that aperture comes last because it is the only lever that also changes the light
- **AND** it does not describe the subject-to-background distance as changing the depth of the
  sharp zone

#### Scenario: A recap panel goes past the size limit

- **WHEN** a recap concept panel carries a table and a diagram whose text together exceed the
  legibility floor for projection
- **THEN** the content is reduced or split before the block is considered ready

#### Scenario: The recap hands over to the session's own content

- **WHEN** the last recap concept panel has been displayed
- **THEN** the next screen introduces the session's new levers, shutter speed and ISO, side by
  side, each with what it is and what it does, without explaining either in detail
- **AND** the screen after that presents the session's programme, unchanged in role

### Requirement: Recap content does not address phones separately

A recap block SHALL NOT contain phone-specific instructions or notes. A concept it restates applies
to any device and is worded that way.

#### Scenario: A participant with a phone reads the recap

- **WHEN** the recap block is displayed
- **THEN** no screen contains a note that applies only to phones

### Requirement: A repère screen can present notions side by side

A repère screen MAY carry two or three columns, each a card with a title, a short body, and
optionally an icon and a short highlighted label. The columns SHALL be laid out side by side at
projection width and stacked in a single column at phone width. Their text SHALL be subject to
the same content checks as any other screen text.

#### Scenario: A transition introduces two new notions

- **WHEN** a repère screen with two columns is displayed at projection width
- **THEN** both cards are visible side by side, each with its title and body
- **AND** the screen's content is centred vertically and fits at 1024 × 768 and 16:9

#### Scenario: The same screen is read on a phone

- **WHEN** the screen is opened at phone width
- **THEN** the cards are stacked in a single column without horizontal scrolling

#### Scenario: A screen asks for an unsupported number of columns

- **WHEN** a repère screen is authored with one column or more than three
- **THEN** the build fails instead of rendering the screen

## MODIFIED Requirements

### Requirement: Demonstrations are separate screens from concept panels

Demonstration photographs SHALL be placed on their own screens, not inside concept panels, so
that both keep full usable space. Diagrams MAY appear inside a concept panel. A diagram MAY
include images derived from a single photograph to illustrate one variable it explains — for
example, the same frame rendered at the exposure each aperture admits — provided the diagram
states that the images are a simulation. A comparison of separately taken photographs remains a
demonstration screen.

#### Scenario: A comparison series is shown

- **WHEN** a demonstration screen presents a comparison series
- **THEN** the photographs occupy the screen's usable space
- **AND** a caption names the single variable that changed between them
- **AND** no concept panel body text competes for that space

#### Scenario: A diagram simulates a variable from one photograph

- **WHEN** a concept panel's diagram shows images derived from one photograph
- **THEN** the diagram or its caption says that the images are a simulation
- **AND** only the variable the diagram explains differs between the images

### Requirement: Screens are rendered for both projection and phone

A concept panel SHALL be authored as four named regions — the claim, the body, the diagram, and
the aside — and SHALL be rendered in a wide arrangement for projection and a single-column
arrangement for phone width. Content MUST be identical between the two arrangements. A panel MAY
instead be stacked — claim, body, then diagram, each across the full width — either because it
asks for it or because it has a diagram and no body; a stacked panel keeps that order at every
width, because its body introduces the diagram.

#### Scenario: A panel is projected

- **WHEN** a concept panel is displayed at projection width
- **THEN** its regions are laid out so the body and the diagram are visible together
- **AND** no content required by the block is cut off or pushed out of view

#### Scenario: A panel is read on a phone

- **WHEN** the same concept panel is opened at phone width
- **THEN** its regions are stacked in a single column with the diagram preceding the body
- **AND** all four regions' content is present and readable without horizontal scrolling

#### Scenario: A stacked panel is displayed

- **WHEN** a stacked concept panel is displayed at any width
- **THEN** its claim, body and diagram appear in that order, each across the full width
- **AND** the diagram is not placed beside the body

#### Scenario: The projector's aspect ratio is not 16:9

- **WHEN** a lesson is projected on a 4:3 display
- **THEN** every screen's content remains fully visible
