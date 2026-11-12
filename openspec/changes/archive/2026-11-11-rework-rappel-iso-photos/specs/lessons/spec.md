# Spec Delta

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
  freezing and letting motion show, with the two blurs; ISO as the volume, and noise as a lack
  of light; and manual mode with ISO auto, ISO chosen last, together with exposure compensation
- **AND** none of them introduces composition

## ADDED Requirements

### Requirement: The session 3 ISO recap shows noise with two cropped photographs

The session 3 recap panel on ISO SHALL show, side by side, two photographs of the same scene and
light from session 2: one taken at a high ISO, and one taken at a low ISO and brightened
afterwards. Both SHALL open on the same resting crop, on a shadow where the noise is visible at
projection size, and SHALL share a linked loupe for a closer look. The panel SHALL NOT say that ISO comes last; the manual-mode recap panel says it.

#### Scenario: The ISO recap panel is projected

- **WHEN** the session 3 ISO recap panel is displayed
- **THEN** it shows two columns, each with one session 2 photograph of the same scene and a
  short caption
- **AND** the column for the low ISO brightened afterwards says it has more noise, not less
- **AND** the callout states that noise comes from a lack of light, not from ISO

#### Scenario: The noise is visible without enlarging the photographs

- **WHEN** the two photographs are shown at rest on a projector, in 16:9 or 4:3
- **THEN** both are framed on the same point at the same magnification
- **AND** the grain in the shadow can be compared from the middle of the room without opening
  either photograph

#### Scenario: The presenter magnifies the grain

- **WHEN** the presenter holds Shift over one of the two photographs
- **THEN** both photographs show a magnified view of the same point, so the grain can be compared
  more closely than the resting crop allows

#### Scenario: The order of the choices is stated once

- **WHEN** the session 3 recap block is read in order
- **THEN** the ISO recap panel does not state that ISO comes last
- **AND** the manual-mode recap panel that follows it states that ISO comes last, after the
  aperture and the shutter speed

