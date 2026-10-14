## MODIFIED Requirements

### Requirement: The speed block shows what different speeds are for

The speed block SHALL include a demonstration comparing one scene at three shutter speeds, placed
after the screen presenting the choice between freezing and showing movement, and a demonstration
of four creative uses of a chosen blur — light trails, intentional camera movement, panning and
partial subject blur — placed before the creative exercises.

#### Scenario: One street at three speeds

- **WHEN** the three-speed demonstration is displayed
- **THEN** it shows the same street scene at `1/500 s`, `1/30 s` and `1/2 s`
- **AND** its caption states that only the speed changed, and that the camera adjusted its ISO to
  compensate

#### Scenario: The creative uses are shown before they are tried

- **WHEN** the « flou choisi » demonstration is displayed
- **THEN** it shows a light-trail image, an intentional-camera-movement image, a panning image and
  a partial-subject-blur image
- **AND** the next screen is the light-trail exercise

#### Scenario: The partial subject blur says what it adds

- **WHEN** the presenter enlarges the partial-subject-blur image
- **THEN** its label states that one part of the subject moves faster than the rest, so that part
  blurs while the rest stays sharp

#### Scenario: The four creative uses are projected

- **WHEN** the « flou choisi » demonstration is displayed at projection width
- **THEN** the four images are arranged in two rows of two: light trails and intentional camera
  movement on the first row, panning and partial subject blur on the second
- **AND** at phone width they are stacked in that same order
- **AND** no image's label is shown until that image is enlarged
