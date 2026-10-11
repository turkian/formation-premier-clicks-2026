## ADDED Requirements

### Requirement: The digital ISO chain is shown step by step

The site SHALL provide an interactive component that draws the path from light to a digital
image in four steps: light filling the sensor, a weak analog signal carrying its noise, the
amplification set by the ISO, and the conversion to numbers producing the image. The animator
SHALL be able to step forward and back through the steps and stop on each one. An ISO control
SHALL change the amplification, and the component SHALL show that the signal and its noise are
amplified together while the light collected does not change. The component SHALL be drawn,
never photographed.

#### Scenario: The animator stops on each step

- **WHEN** the animator steps forward from the first step
- **THEN** the component shows, in order, the light collected, the analog signal, the
  amplification and the conversion to numbers, each labelled
- **AND** the current step is readable from the back of the room

#### Scenario: The ISO is raised

- **WHEN** the ISO control is raised on the amplification step
- **THEN** the amplified signal and its noise both grow
- **AND** the light collected shown on the first step stays the same

### Requirement: ISO and noise are modelled from the light collected

The ISO and noise component SHALL take two inputs: the light collected and the ISO. The
visible noise SHALL depend on the light collected, and the brightness on the light collected and
the ISO together. The component SHALL show when the image is correctly exposed, and SHALL make
it possible to see that, for a given light collected, lowering the ISO darkens the image without
making it cleaner.

#### Scenario: Little light, low ISO

- **WHEN** the light collected is low and the ISO is low
- **THEN** the image is shown too dark
- **AND** the component does not present it as cleaner than the same light at a correct ISO

#### Scenario: Little light, correct ISO

- **WHEN** the light collected is low and the ISO brings the image to a correct exposure
- **THEN** the image is shown correctly exposed, with visible noise

#### Scenario: Plenty of light

- **WHEN** the light collected is high and the ISO brings the image to a correct exposure
- **THEN** the image is shown correctly exposed and clean

#### Scenario: Too much amplification

- **WHEN** the ISO is raised past a correct exposure
- **THEN** the image is shown too bright

## MODIFIED Requirements

### Requirement: The remaining component set

The site SHALL additionally provide interactive components for: shutter speed and motion,
distinguishing subject movement from camera shake as two separately controllable blurs; ISO and
noise, modelling the light collected and the ISO separately; the mode dial, showing which of
aperture, shutter and ISO the photographer retains and what exposure compensation acts on; and
the « ma photo est ratée » diagnostic tree.

#### Scenario: The essential blur distinction is demonstrated

- **WHEN** the motion component's subject-movement control is changed with camera shake at zero
- **THEN** only the subject is blurred and the rest of the frame stays sharp
- **AND** raising camera shake with subject movement at zero blurs the whole frame instead

#### Scenario: Manual mode is selected on the mode dial component with ISO auto

- **WHEN** manual mode is selected with ISO auto on
- **THEN** both aperture and shutter are attributed to the photographer and the ISO to the camera
- **AND** the exposure compensation control is shown as acting on the ISO

#### Scenario: Manual mode is selected on the mode dial component

- **WHEN** manual mode is selected with ISO auto off
- **THEN** aperture, shutter and ISO are all attributed to the photographer
- **AND** the exposure compensation control is shown as having no effect, with the reason stated

#### Scenario: A participant walks the diagnostic tree

- **WHEN** a symptom is selected in the diagnostic component
- **THEN** its possible causes are presented as choices
- **AND** selecting a cause presents the correction for it
