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
not one screen per earlier concept. It SHALL be designed to be presented in about five to seven
minutes, discussion included, and SHALL end by handing over to a screen that frames what the
current session adds. Every concept panel in the recap MUST respect the concept-panel size limits
(about 100 words plus one diagram or table).

#### Scenario: The recap of session 2 follows light to aperture

- **WHEN** the recap block of session 2 is read in order
- **THEN** its concept panels present light as a limited quantity, then aperture as a way to admit
  it, then the depth of the sharp zone as the price of that choice, then the four levers with
  aperture singled out
- **AND** none of them introduces shutter speed, ISO or stops

#### Scenario: A recap panel goes past the size limit

- **WHEN** a recap concept panel carries a table and a diagram whose text together exceed the
  legibility floor for projection
- **THEN** the content is reduced or split before the block is considered ready

#### Scenario: The recap hands over to the session's own content

- **WHEN** the last recap screen is displayed
- **THEN** the next screen frames the question and the new topics of the current session
- **AND** the screen after that presents the session's programme, unchanged in role

### Requirement: Recap content does not address phones separately

A recap block SHALL NOT contain phone-specific instructions or notes. A concept it restates applies
to any device and is worded that way.

#### Scenario: A participant with a phone reads the recap

- **WHEN** the recap block is displayed
- **THEN** no screen contains a note that applies only to phones
