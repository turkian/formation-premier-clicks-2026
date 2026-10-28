# Spec Delta

## ADDED Requirements

### Requirement: Session 3 answers how to make better photographs

Session 3 SHALL state its question as « comment faire de meilleures photos ? » and SHALL present,
in this order: the participants' montage, the recap of session 2, the history of the first
photographers, composition, the pause and questions, the animateur's experience, and « Et
maintenant ? ».

#### Scenario: A participant opens session 3

- **WHEN** session 3's lesson is opened
- **THEN** its question is « comment faire de meilleures photos ? »
- **AND** its blocks appear in the order above

#### Scenario: A participant looks for the editing tutorial

- **WHEN** session 3 is read from start to end
- **THEN** no block teaches editing-software controls one by one
- **AND** no screen carries an export-recipe table

### Requirement: The history block shows how the first photographers learned to see

Session 3's history block SHALL present four stages in order: the technique as the challenge,
pictorialism imitating painting, straight photography doing what only photography can do, and
the decisive moment. Painting SHALL be mentioned only for pictorialism, not as a parallel for
each composition technique.

#### Scenario: The history block is read in order

- **WHEN** the history block's screens are displayed in sequence
- **THEN** the four stages appear in the order above
- **AND** each stage is illustrated by at least one archival photograph, except where every
  representative photographer is still under copyright

#### Scenario: A stage's representative photographer is under copyright

- **WHEN** a stage is best represented by a photographer whose work is not public domain
- **THEN** the screen names the photographer and links to an outside source
- **AND** no photograph by that photographer is shown on the site

#### Scenario: The composition block follows the history block

- **WHEN** the composition block's screens are read
- **THEN** no technique is presented as borrowed from a named painting or painter

### Requirement: The recap of session 2 hands over to framing

Session 3's recap SHALL end on a screen stating that the camera can decide sharpness and
exposure in its place but never the framing, and the screen after it SHALL open the history
block.

#### Scenario: The recap's last screen is displayed

- **WHEN** the last screen of session 3's recap block is displayed
- **THEN** it opposes what the camera can decide for the photographer (sharpness, exposure) to
  what it never decides (framing)
- **AND** the next screen is the first screen of the history block

### Requirement: Composition techniques are ordered by impact in three tiers

Session 3's composition block SHALL present composition techniques from the most to the least
impact, in three tiers, and SHALL present all three tiers during the session. The first tier
SHALL cover a single subject, getting closer, checking the four corners and the background, and
placing the subject decisively.

#### Scenario: The composition block is read in order

- **WHEN** the composition block's screens are displayed in sequence
- **THEN** every first-tier technique appears before any second-tier technique, and every
  second-tier technique before any third-tier technique
- **AND** the rule of thirds is presented as a starting point, alongside a clearly centred subject

#### Scenario: A reader looks for the third tier

- **WHEN** a reader looks for symmetry, repetition, negative space or diagonals
- **THEN** they are found in the lesson, not only on a separate page

### Requirement: Composition screens show two or three techniques side by side

Each composition-technique screen SHALL present two or three techniques as side-by-side columns
under a title naming what they do to the image. Each column SHALL carry the technique's name, at
most a short sentence, and a demonstration photograph or its specification.

#### Scenario: A technique screen is projected

- **WHEN** a composition-technique screen is displayed at 1024 × 768 or 16:9
- **THEN** its two or three techniques are visible side by side, each with its photograph or
  the photograph's specification
- **AND** nothing on the screen is cut off

#### Scenario: A technique screen is read on a phone

- **WHEN** the screen is opened at phone width
- **THEN** the techniques are stacked in a single column without horizontal scrolling

### Requirement: Composition is practised without touching a setting

Session 3's composition block SHALL include an « appareil en main » screen in which participants
photograph the same object several times, changing only distance, height or background, then
share their preferred one at their table.

#### Scenario: A participant with a phone does the exercise

- **WHEN** the hands-on composition screen is displayed
- **THEN** no step asks for a setting or a menu
- **AND** the exercise applies to a phone as it does to a camera

### Requirement: The experience block is the animateur's testimony

Session 3 SHALL include a block in which the animateur shares their own practice in the first
person, illustrated by their own photographs and signed. The block SHALL still address the
participants, and SHALL stay true for a reader months later.

#### Scenario: A reader opens the experience block months later

- **WHEN** the experience block is read outside the room
- **THEN** the reader can tell whose experience it is
- **AND** no screen refers to the current session by a moment relative to the reader

#### Scenario: A first-person screen is checked against the address rule

- **WHEN** an experience screen is written in the animateur's voice
- **THEN** it speaks to the participants and gives them something to do or consider
- **AND** it does not address the animateur

### Requirement: The experience block goes from intention to showing your work

The experience block SHALL present, in this order: why and for whom you take pictures, stating
that you must like your pictures first; RAW on a single screen; the animateur's workflow with a
few hints; printing; and showing your pictures, with a montage of photographs from the
animateur's exhibitions. More tips MAY be added within this order.

#### Scenario: The experience block is read in order

- **WHEN** the experience block's screens are displayed in sequence
- **THEN** intention comes first and showing your pictures comes last
- **AND** the screen about showing your pictures carries the exhibition montage

#### Scenario: A participant wants to know about RAW

- **WHEN** a participant looks for RAW in session 3
- **THEN** exactly one screen covers it, stating what RAW keeps and why to shoot RAW + JPEG

#### Scenario: A participant looks for how to develop a photo

- **WHEN** a participant reads the workflow screen
- **THEN** it gives the steps from import to export, including a backup and sorting before
  developing
- **AND** it does not walk through individual editing controls

## MODIFIED Requirements

### Requirement: A recap tells one story and fits a short time budget

A recap block SHALL be a single line of argument built from the concepts of the earlier session,
not a re-teach of every earlier screen. It SHALL be designed to be presented in about five to
eight minutes, discussion included, and SHALL end by handing over to a screen that introduces
what the current session adds. Every concept panel in the recap MUST respect the concept-panel
size limits (about 100 words plus one diagram or table).

#### Scenario: The recap of session 2 goes from aperture to building an image

- **WHEN** the recap block of session 2 is read in order
- **THEN** its concept panels present, in this order: aperture as the opening that lets light in,
  larger admitting more and smaller less; aperture also setting the depth of field, explained as
  a zone that stays sharp in front of and behind the subject; focus, with the `AF-S` and `AF-C`
  modes and the effect of the focusing distance on the sharp zone; and the four levers presented
  as an order of choice to build an image, from the scene to the setting, with aperture last
- **AND** none of them introduces shutter speed, ISO or stops
- **AND** none of them claims that a wide aperture always blurs the background

#### Scenario: The levers are presented as an order of choice

- **WHEN** the recap's levers panel is displayed
- **THEN** it lists the background, the photographer's distance, the focal length and the
  aperture, in that order, each with how it is operated
- **AND** it states that aperture comes last because it is the only lever that also changes the light
- **AND** it does not describe the subject-to-background distance as changing the depth of the
  sharp zone

#### Scenario: A recap panel goes past the size limit

- **WHEN** a recap concept panel carries a table and a diagram whose text together exceed the
  legibility floor for projection
- **THEN** the content is reduced or split before the block is considered ready

#### Scenario: The recap hands over to the session's own content

- **WHEN** the last recap concept panel of session 2 has been displayed
- **THEN** the next screen introduces the session's new levers, shutter speed and ISO, side by
  side, each with what it is and what it does, without explaining either in detail
- **AND** that screen is the last screen of the recap block
- **AND** the screen after it is the first screen of the shutter-speed block

#### Scenario: The recap of session 3 goes from shutter speed to what the camera still decides

- **WHEN** the recap block of session 3 is read in order
- **THEN** its concept panels present, in this order: shutter speed as the choice between
  freezing and letting motion show, with the two blurs; ISO as the volume, chosen last, and
  noise as a lack of light; and manual mode with ISO auto together with exposure compensation
- **AND** none of them introduces composition
