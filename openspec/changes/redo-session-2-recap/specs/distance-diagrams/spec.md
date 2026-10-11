## MODIFIED Requirements

### Requirement: A distance diagram may compare two distances side by side

A distance diagram MAY present two scenes side by side, each depicting the photographer marker
anchored to its own ground line, to let a comparison be read at a glance. By default each scene
SHALL be labelled only with its distance, not with any outcome the comparison is testing. A
diagram MAY opt in to showing the outcome — the sharp zone around each subject, drawn to the
ground line's scale and computed from the focal length, aperture and sensor format, with its depth
written beneath — only on a screen that does not withhold that outcome for a later state.

#### Scenario: A comparative diagram sets up a withheld question

- **WHEN** a comparative distance diagram is added to a panel that later reveals an answer through
  accumulating states
- **THEN** the diagram shows only the distance for each scene
- **AND** the diagram does not show or hint at the outcome (for example, how much of the scene
  stays sharp) that a later state is meant to reveal

#### Scenario: A recap shows the outcome of the comparison

- **WHEN** a comparative distance diagram opts in to showing the sharp zones
- **THEN** each scene shows its sharp zone around the subject, to the ground line's scale
- **AND** each scene states the zone's depth, computed rather than drawn by eye
- **AND** the zone of the closer subject is visibly thinner than the zone of the farther one

#### Scenario: Both scenes share the site's diagram conventions

- **WHEN** a comparative distance diagram is displayed
- **THEN** both scenes use the same photographer icon and the same anchored-ground-line convention
  as every other distance diagram in the site
