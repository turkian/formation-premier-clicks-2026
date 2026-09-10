## ADDED Requirements

### Requirement: A distance diagram may compare two distances side by side

A distance diagram MAY present two scenes side by side, each depicting the photographer marker
anchored to its own ground line, to let a comparison be read at a glance. Each scene SHALL be
labelled only with its distance, not with any outcome the comparison is testing.

#### Scenario: A comparative diagram sets up a withheld question

- **WHEN** a comparative distance diagram is added to a panel that later reveals an answer through
  accumulating states
- **THEN** the diagram shows only the distance for each scene
- **AND** the diagram does not show or hint at the outcome (for example, how much of the scene
  stays sharp) that a later state is meant to reveal

#### Scenario: Both scenes share the site's diagram conventions

- **WHEN** a comparative distance diagram is displayed
- **THEN** both scenes use the same photographer icon and the same anchored-ground-line convention
  as every other distance diagram in the site
