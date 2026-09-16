## ADDED Requirements

### Requirement: A demonstration screen shows at most three photographs

A demonstration screen SHALL NOT display more than three photographs at once, counted across
every comparison series and every free (non-series) image declared on that screen. A block whose
demonstration content exceeds three photographs SHALL be authored as multiple sibling
demonstration screens within the same block instead, each carrying its own claim, so that no
single screen crowds its photographs below a legible size.

#### Scenario: A block needs four comparison photographs

- **WHEN** a block's demonstration content is authored with four or more photographs across its
  series and free images
- **THEN** that content is split across two or more demonstration screens, each with three or
  fewer photographs
- **AND** each resulting screen carries its own claim

#### Scenario: A single comparison series itself has more than three images

- **WHEN** one comparison series alone declares more than three images
- **THEN** that series is split across two or more demonstration screens, each with three or
  fewer images from that series
- **AND** each resulting screen's claim and caption still identify the single variable the
  series compares

#### Scenario: A build is produced with an oversized demonstration screen

- **WHEN** a demonstration screen is authored with more than three photographs across its series
  and free images
- **THEN** the content verification SHALL fail the build and identify that screen
