## ADDED Requirements

### Requirement: An unnamed studio's photograph is judged on its dates

An archival photograph whose operator is unknown, such as a studio's work credited only to the
studio, SHALL be hosted only if it was made before 1949 (public domain in Canada) and is public
domain in the United States: published in 1930 or earlier, or made more than 120 years ago.

#### Scenario: A studio photograph from the 1890s

- **WHEN** a « Wm. Notman & Son » photograph made around 1893 is added to a slot
- **THEN** it is hosted, since it was made before 1949 and more than 120 years ago

#### Scenario: A studio photograph from 1911 with no known publication

- **WHEN** a « Wm. Notman & Son » photograph made in 1911 is a candidate
- **AND** no publication in 1930 or earlier is found
- **THEN** it is not hosted, and the slot takes another photograph

#### Scenario: A photograph by a named photographer

- **WHEN** an archival photograph's operator is named, such as William Notman or Alexander
  Henderson
- **THEN** the rule on the author's death date applies, not this one

### Requirement: A holder's rights label is read for what it says about copyright

An archival photograph SHALL be judged by the hosting rules on the author's death date or on the
photograph's dates. A holder's label that leaves its rights unassessed SHALL NOT by itself block
hosting. A label stating that the photograph is in copyright SHALL block it. The label SHALL be
recorded in the block's rights comment.

#### Scenario: A photograph whose rights the holder has not assessed

- **WHEN** an archive labels a photograph « Droit d'auteur non évalué »
- **AND** its author died in 1905
- **THEN** it is hosted, and the rights comment records the label next to the author's death year

#### Scenario: A photograph the holder marks as in copyright

- **WHEN** an archive labels a photograph « In Copyright », even with non-commercial use permitted
- **THEN** it is not hosted, and the slot takes another photograph
