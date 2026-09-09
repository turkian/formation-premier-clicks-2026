## ADDED Requirements

### Requirement: A static concept panel can carry one highlighted callout

A concept panel with no ordered states (a static panel) MAY carry exactly one highlighted
callout, distinct from its ordinary body text. The callout SHALL be visually set apart (a
bounded box with a tone-appropriate color and a small icon) and SHALL render after the
panel's ordinary body text. Using this callout SHALL NOT turn the panel into an
accumulating, click-through panel: a static panel with a callout SHALL still present all
of its content on first view, with nothing withheld behind an advance.

#### Scenario: A static panel highlights its pivot

- **WHEN** a static concept panel defines a callout with a tone and an icon
- **THEN** the callout is rendered as a bounded, tone-colored box with that icon
- **AND** the callout appears after the panel's ordinary body text
- **AND** the full panel, including the callout, is visible without advancing any state

#### Scenario: The callout stays legible offline and from a local copy

- **WHEN** the lesson is opened with no network, or from the `file://` local copy
- **THEN** the callout's icon renders identically to the online, projected version
- **AND** no request for the icon is made over the network
