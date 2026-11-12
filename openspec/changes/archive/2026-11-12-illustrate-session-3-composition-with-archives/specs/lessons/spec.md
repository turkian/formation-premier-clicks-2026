## ADDED Requirements

### Requirement: The composition block shows public-domain photographs

The composition block's photographs SHALL be archival photographs in the public domain or the
club's own photographs. Each archival photograph SHALL show the technique of its column clearly
enough to be pointed at from the front of the room.

#### Scenario: An archival photograph fills a composition slot

- **WHEN** a composition-technique screen displays an archival photograph
- **THEN** the photograph carries its author, date and collection as its credit
- **AND** the technique named by its column is visible in it, for example a cliff edge on a thirds
  line or a ship seen through an opening

#### Scenario: A candidate photograph only roughly shows its technique

- **WHEN** a candidate photograph for « Les tiers » places its subject well off the thirds lines
- **THEN** it is not used in that slot, even if its rights are clear

### Requirement: No photograph is shown twice in session 3

A photograph SHALL appear at most once in session 3, in any version (a retouched and an
unretouched print of the same negative count as one photograph). The same photographer MAY
appear several times with different photographs.

#### Scenario: A photographer is used in two blocks

- **WHEN** session 3's archival credits are listed
- **THEN** a photographer may appear more than once
- **AND** no photograph, or another print of its negative, appears in two slots
