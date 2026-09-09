## MODIFIED Requirements

### Requirement: A lesson is entered at any point

A lesson's summary SHALL present every block and every screen of that lesson as a direct link,
and SHALL NOT offer a privileged entry control that starts the lesson at its first screen ahead
of that list. Participants choose where to enter; the site does not choose for them. Within a
block, its screens SHALL be listed in a single column, top to bottom, at every viewport width.

#### Scenario: A participant returns for one idea

- **WHEN** a participant opens a lesson summary looking for a single explanation
- **THEN** every block and every screen is listed and directly reachable
- **AND** no « start here » control is presented ahead of that list

#### Scenario: The animator opens a lesson to project it

- **WHEN** the animator opens a lesson summary at the start of a group session
- **THEN** the lesson's first screen is reachable as the first entry of the first block
- **AND** reaching it requires no more interaction than reaching any other screen

#### Scenario: A lesson summary is read on a phone

- **WHEN** a participant opens a lesson summary on a phone
- **THEN** the block and screen list is the primary content of the page

#### Scenario: A lesson summary is displayed on a wide screen

- **WHEN** a lesson summary is displayed on a projector or desktop-width viewport
- **THEN** each block's screens remain listed in a single column, top to bottom
- **AND** the list does not reflow into multiple columns as width increases
