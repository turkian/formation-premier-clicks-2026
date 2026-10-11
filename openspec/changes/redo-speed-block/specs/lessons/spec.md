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

- **WHEN** the last recap concept panel has been displayed
- **THEN** the next screen introduces the session's new levers, shutter speed and ISO, side by
  side, each with what it is and what it does, without explaining either in detail
- **AND** that screen is the last screen of the recap block
- **AND** the screen after it is the first screen of the shutter-speed block

## ADDED Requirements

### Requirement: The speed block alternates explanation and hands-on practice

Session 2's shutter-speed block SHALL interleave « appareil en main » screens with its concept,
demonstration and interactive screens rather than placing all practice at the end. It SHALL
contain exactly three « appareil en main » screens, all using the shutter-priority mode (`S`, or
`Tv` on a Canon) with ISO auto, and each SHALL provide a phone equivalent.

#### Scenario: The block is read in order

- **WHEN** the speed block of session 2 is read from its first screen to its last
- **THEN** its first screen explains what shutter speed is mechanically
- **AND** its second screen is an « appareil en main » exercise in which participants photograph
  a waving hand at a fast speed, then at a slow one, and compare
- **AND** its last two screens are the two creative exercises

#### Scenario: A participant follows an exercise of the block

- **WHEN** any « appareil en main » screen of the speed block is displayed
- **THEN** its steps name the shutter-priority mode as `S`, or `Tv` on a Canon
- **AND** it does not ask the participant to set an ISO value by hand
- **AND** it carries a phone equivalent

#### Scenario: ISO is not explained ahead of its own block

- **WHEN** any screen of the speed block is displayed
- **THEN** it does not explain what ISO does or how ISO auto chooses its value

### Requirement: The speed block pairs the two blurs with two creative exercises

After the screen that distinguishes subject blur from camera shake, the speed block SHALL present
a demonstration of chosen blur followed by two « appareil en main » exercises that produce each
blur on purpose: one where the camera stays still and a light moves, one where the scene stays
still and the camera moves.

#### Scenario: Light trails

- **WHEN** the first creative exercise is displayed
- **THEN** it asks participants to rest the camera on a stable surface and use the self-timer
- **AND** someone draws in the air with a phone's flashlight during an exposure of about one second
  or longer
- **AND** the screen states that the room lights are dimmed

#### Scenario: Intentional camera movement

- **WHEN** the second creative exercise is displayed
- **THEN** it asks participants to move the camera deliberately during an exposure of about a
  quarter of a second to one second, starting the movement before pressing the shutter button
- **AND** it does not ask for a tripod or a stable surface

#### Scenario: The link to the two blurs is visible

- **WHEN** either creative exercise is displayed
- **THEN** its wording connects it to the subject-blur or the camera-shake case of the earlier
  « deux flous » screen

### Requirement: The speed block shows what different speeds are for

The speed block SHALL include a demonstration comparing one scene at three shutter speeds, placed
after the screen presenting the choice between freezing and showing movement, and a demonstration
of three creative uses of a chosen blur — light trails, intentional camera movement and panning —
placed before the creative exercises.

#### Scenario: One street at three speeds

- **WHEN** the three-speed demonstration is displayed
- **THEN** it shows the same street scene at `1/500 s`, `1/30 s` and `1/2 s`
- **AND** its caption states that only the speed changed, and that the camera adjusted its ISO to
  compensate

#### Scenario: The creative uses are shown before they are tried

- **WHEN** the « flou choisi » demonstration is displayed
- **THEN** it shows a light-trail image, an intentional-camera-movement image and a panning image
- **AND** the next screen is the light-trail exercise
