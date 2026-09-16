## ADDED Requirements

### Requirement: A repère screen with a list corps does not also carry an aparte

A repère screen whose `corps` is authored as an enumerated or bulleted list SHALL NOT also carry
an `aparte`. A repère's contract is a small amount of wayfinding content; a list-shaped corps
already carries as much content as that budget allows, and repère has no mechanism — unlike a
concept panel — to shrink or paginate `corps` or `aparte` content that overflows the projection
floor. A block whose repère content needs both a list and an aparte's worth of material SHALL be
authored as multiple sibling repère screens within the same block instead, each carrying its own
claim.

#### Scenario: A repère needs both a list and additional necessary content

- **WHEN** a repère screen's content is authored with a list corps and material that would
  otherwise go in an aparte
- **THEN** that content is split across two or more repère screens, each with its own claim
- **AND** any content necessary to follow the block is placed in a screen's claim or corps, never
  left in an aparte

#### Scenario: A build is produced with a repère combining a list corps and an aparte

- **WHEN** a repère screen is authored with a list-shaped `corps` and a non-empty `aparte`
- **THEN** the content verification SHALL fail the build and identify that lesson and screen
