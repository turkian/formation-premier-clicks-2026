## ADDED Requirements

### Requirement: A repère screen can prompt the room with two unexplained terms

A block's `ouverture` repère screen MAY carry a two-term prompt: two short term labels
displayed side by side, with no definition, explanation, or timing text attached to either
one. This is reserved for a pair of terms the block is about to distinguish, where the room
is meant to consider both before a following screen resolves the distinction. It SHALL NOT
be used to also state which bloc or screen addresses each term.

#### Scenario: The room is asked to consider two terms before either is defined

- **WHEN** a block's `ouverture` screen carries a two-term prompt
- **THEN** both term labels are displayed side by side
- **AND** neither label is accompanied by a definition or explanatory text
- **AND** no scheduling or timing claim is displayed for either term

#### Scenario: A later screen resolves the distinction

- **WHEN** a block's `ouverture` screen carries a two-term prompt
- **THEN** a later screen in the same block defines and distinguishes both terms
- **AND** the `ouverture` screen itself does not state or imply when that later screen appears
