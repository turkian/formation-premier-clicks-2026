## MODIFIED Requirements

### Requirement: A lesson is entered at any point

A lesson that is ready to publish SHALL have its summary present every block and every screen
of that lesson as a direct link, and SHALL NOT offer a privileged entry control that starts the
lesson at its first screen ahead of that list. Participants choose where to enter; the site
does not choose for them. Within a block, its screens SHALL be listed in a single column, top
to bottom, at every viewport width. A lesson that is not yet ready to publish is governed
instead by the "Publication readiness gates a lesson's route" requirement.

#### Scenario: A participant returns for one idea

- **WHEN** a participant opens a ready lesson's summary looking for a single explanation
- **THEN** every block and every screen is listed and directly reachable
- **AND** no « start here » control is presented ahead of that list

#### Scenario: The animator opens a lesson to project it

- **WHEN** the animator opens a ready lesson's summary at the start of a group session
- **THEN** the lesson's first screen is reachable as the first entry of the first block
- **AND** reaching it requires no more interaction than reaching any other screen

#### Scenario: A lesson summary is read on a phone

- **WHEN** a participant opens a ready lesson's summary on a phone
- **THEN** the block and screen list is the primary content of the page

#### Scenario: A lesson summary is displayed on a wide screen

- **WHEN** a ready lesson's summary is displayed on a projector or desktop-width viewport
- **THEN** each block's screens remain listed in a single column, top to bottom
- **AND** the list does not reflow into multiple columns as width increases

## ADDED Requirements

### Requirement: Publication readiness gates a lesson's route

A lesson SHALL carry a readiness state: ready, or not yet ready. When a build is produced for
publication, a lesson that is not yet ready SHALL have its summary route render a neutral
notice in place of its blocks and screens, and SHALL NOT have routes generated for its
individual screens. The notice SHALL NOT state or imply when the lesson will be published. A
build produced for publication is any build other than the dev server or the project's offline
working-copy build; on the dev server and on the offline working-copy build, every lesson SHALL
render as ready regardless of its readiness state.

#### Scenario: A published build reaches a not-yet-ready lesson

- **WHEN** a build produced for publication renders the summary route of a lesson marked not
  yet ready
- **THEN** the route displays a neutral work-in-progress notice instead of the lesson's blocks
  and screens
- **AND** the notice makes no claim about when the lesson will be published

#### Scenario: A not-yet-ready lesson has no reachable screens in a published build

- **WHEN** a build produced for publication is generated
- **THEN** no individual screen route exists for a lesson marked not yet ready

#### Scenario: The dev server always shows every lesson

- **WHEN** the site is run from the dev server
- **THEN** every lesson's summary and screens render normally regardless of its readiness state

#### Scenario: The animator's offline working copy always shows every lesson

- **WHEN** the project's offline working-copy build is produced
- **THEN** every lesson's summary and screens render normally regardless of its readiness state

#### Scenario: The home hub is unaffected

- **WHEN** the home hub is displayed in a build produced for publication
- **THEN** a not-yet-ready lesson's entry is presented identically to a ready lesson's entry, as
  a peer link
