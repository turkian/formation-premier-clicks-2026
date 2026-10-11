## ADDED Requirements

### Requirement: The shutter is shown as two curtains crossing the sensor

The site SHALL provide an interactive shutter component that draws a sensor and two curtains: the
front curtain uncovers the sensor, the sensor is exposed, and the back curtain covers it again.
The back curtain SHALL start its travel after the front curtain by the selected shutter speed, and
both curtains SHALL travel at the same speed whatever shutter speed is selected, so that at fast
speeds the exposure crosses the sensor as a moving slit and the sensor is never fully uncovered
at once. The component SHALL be drawn, never photographed.

#### Scenario: A slow speed is played

- **WHEN** a slow speed such as `1/60 s` is selected and the shutter is released
- **THEN** the front curtain finishes its travel before the back curtain starts
- **AND** the whole sensor is shown uncovered for a moment

#### Scenario: A fast speed is played

- **WHEN** a fast speed such as `1/2000 s` is selected and the shutter is released
- **THEN** the back curtain starts before the front curtain has finished its travel
- **AND** a narrow uncovered band travels across the sensor, and no moment shows the whole sensor
  uncovered

#### Scenario: Every line of the sensor gets the same exposure

- **WHEN** any speed is played
- **THEN** each line of the sensor stays uncovered for the selected duration, whether the sensor is
  uncovered all at once or by a slit

### Requirement: The shutter can be followed while it is explained

The shutter component SHALL play the release slowed down by a single stated factor, the same for
every speed, and SHALL let the animator step through the three phases — front curtain opening,
sensor exposed, back curtain closing — and stop on each one. It SHALL offer at least one speed at
which the whole sensor is uncovered and one at which only a slit is.

#### Scenario: The animator stops on each phase

- **WHEN** the animator steps forward from the closed state
- **THEN** the component shows, in order, the front curtain travelling, the sensor exposed and the
  back curtain travelling, each labelled with its phase
- **AND** at a fast speed, the exposed phase shows the slit partway across the sensor

#### Scenario: The slowdown is stated

- **WHEN** the release is played
- **THEN** the component states that it is slowed down and by how much
- **AND** the selected shutter speed is readable from the back of the room
