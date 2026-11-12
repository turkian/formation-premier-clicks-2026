## MODIFIED Requirements

### Requirement: The history block shows where composition rules come from

Session 3's history block SHALL present, on at most three screens and in this order: composition
older than photography, photography becoming an art by composing like painting, and the first
composition rules written for photographers. The block SHALL end before the twentieth century,
and its last screen SHALL hand over to the composition block.

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

#### Scenario: The first history screen does not repeat the loupe hint

- **WHEN** the first screen of the history block offers a loupe on its images
- **THEN** the hint to hold Shift appears once, under the images
- **AND** the aside does not repeat it

#### Scenario: The second history screen shows staged photographs in date order

- **WHEN** the second screen of the history block is displayed
- **THEN** its images are staged photographs, each assembled from several negatives, shown
  oldest first
- **AND** its aside and captions name only photographers whose work appears on the screen
- **AND** none of its images shows a nude or partly nude figure

#### Scenario: The composition block follows the history block

- **WHEN** the composition block's screens are read
- **THEN** no technique is presented as borrowed from a named painting or painter
- **AND** the only historical reference in the block is the 1797 origin of the rule of thirds,
  on the screen that places the subject
