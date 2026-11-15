## ADDED Requirements

### Requirement: Session 3's « Placer » panel shows three placements and no aside

Session 3's « Placer » composition panel SHALL show its claim and three technique cards, in this
order: « Les tiers », « Le centre assumé » and « L'espace devant ». It SHALL NOT show an aside under
the cards. The presenter says out loud that the rule of thirds is not a law.

#### Scenario: The « Placer » panel is displayed

- **WHEN** the « Placer » panel of session 3 is displayed
- **THEN** it shows the claim « Décentré ou centré — franchement. Jamais entre les deux. » and the
  cards « Les tiers », « Le centre assumé » and « L'espace devant », in that order, each with its
  photograph or the photograph's specification
- **AND** no aside appears between the cards and the photo credits
- **AND** neither « point de départ » nor « 1797 » appears anywhere on the screen

#### Scenario: The « L'espace devant » card is read

- **WHEN** the « L'espace devant » card is read
- **THEN** its body is « Plus de place du côté où le sujet regarde ou avance. »
- **AND** its photograph is an archival public-domain photograph in which a subject, seen in
  profile or moving, has clearly more room on the side it faces or moves toward than behind it

#### Scenario: A candidate photograph for « L'espace devant » is centred or faces the near edge

- **WHEN** a candidate photograph for « L'espace devant » shows its subject centred, coming
  straight toward or away from the camera, or facing or moving toward the nearer edge of the
  frame
- **THEN** it is not used in that slot, even if its rights are clear

#### Scenario: The three-card « Placer » panel is projected

- **WHEN** the « Placer » panel is displayed at 1024 × 768 or at 16:9
- **THEN** its three cards are visible side by side with their photographs, and nothing on the
  screen is cut off
- **AND** at 16:9 its claim still appears on a single line above the cards

## MODIFIED Requirements

### Requirement: The history block shows where composition rules come from

Session 3's history block SHALL present, on at most three screens and in this order: composition
older than photography, photography becoming an art by composing like painting, and the first
composition rules written for photographers. The block SHALL end before the twentieth century.

#### Scenario: The history block is read in order

- **WHEN** the history block's screens are displayed in sequence
- **THEN** the three stages appear in the order above, on no more than three screens
- **AND** each stage is illustrated by at least one archival image: a photograph, an engraving or
  a book page

#### Scenario: The first history screen is displayed

- **WHEN** the first screen of the history block is displayed
- **THEN** its statement is that composition is older than photography
- **AND** it shows that, in 1797, an engraver was already giving advice on how to arrange a
  landscape (where the sky, the land and the water go), before photography existed
- **AND** neither its statement, its aside nor its image captions name the rule of thirds or
  mention the camera's grid

#### Scenario: The second history screen shows staged photographs in date order

- **WHEN** the second screen of the history block is displayed
- **THEN** its images are staged photographs, each assembled from several negatives, shown
  oldest first
- **AND** its aside and captions name only photographers whose work appears on the screen
- **AND** none of its images shows a nude or partly nude figure

#### Scenario: The composition block follows the history block

- **WHEN** the composition block's screens are read
- **THEN** no technique is presented as borrowed from a named painting or painter
- **AND** the block makes no historical reference: no date, author or origin is given for any
  technique, apart from the credits of its photographs

### Requirement: Composition techniques are ordered by impact in three tiers

Session 3's composition block SHALL present composition techniques from the most to the least
impact, in three tiers, and SHALL present all three tiers during the session. The first tier
SHALL cover a single subject, getting closer, checking the four corners and the background, and
placing the subject decisively.

#### Scenario: The composition block is read in order

- **WHEN** the composition block's screens are displayed in sequence
- **THEN** every first-tier technique appears before any second-tier technique, and every
  second-tier technique before any third-tier technique
- **AND** the rule of thirds is presented as one of three ways to place the subject, alongside a
  clearly centred subject and room left in front of the subject, and not as a rule to follow

#### Scenario: A reader looks for the third tier

- **WHEN** a reader looks for symmetry, repetition, negative space or diagonals
- **THEN** they are found in the lesson, not only on a separate page
