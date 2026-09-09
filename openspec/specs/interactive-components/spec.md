# interactive-components Specification

## Purpose
The interactive demonstrations that replace explanations prose and photographs cannot carry —
above all depth of field, whose four levers must be varied one at a time on demand, and the `f/`
notation, whose meaning is geometric.
## Requirements
### Requirement: Interactive components work before any photograph exists

Every interactive component SHALL render and respond using only computed or drawn output, with no
dependency on demonstration photographs.

#### Scenario: A lesson is projected before the animator has shot the demo series

- **WHEN** a lesson containing interactive components is opened with no demonstration photographs present
- **THEN** every interactive component functions fully

### Requirement: Controls are operable during a live explanation

Interactive components SHALL present controls large enough to be operated while speaking to a
room, and readouts legible from the back of that room.

#### Scenario: The animator drives a component while addressing the room

- **WHEN** the animator manipulates a control without looking at the input device
- **THEN** the control is hit reliably and the resulting readout change is visible from the back of the room

#### Scenario: A participant explores the same component on a phone

- **WHEN** an interactive component is opened at phone width
- **THEN** all of its controls are operable by touch and its readout is fully visible

### Requirement: Depth of field is modelled with the four levers, one marked as a setting

The depth-of-field component SHALL expose exactly four levers — aperture, focus distance, focal
length, and subject-to-background distance — and SHALL identify aperture as the only one of the
four that is a camera setting.

#### Scenario: A participant looks for what to change

- **WHEN** the depth-of-field component is displayed
- **THEN** the three levers that require no camera setting are visually distinguished from the one that does

#### Scenario: Only the background distance is changed

- **WHEN** the subject-to-background distance is changed and nothing else
- **THEN** the reported thickness of the sharp zone does not change
- **AND** the rendered background blur does change

### Requirement: Focus position and zone thickness are separately controlled

The depth-of-field component SHALL represent where the focus point is and how thick the sharp
zone is as two distinct controls with two distinct visual consequences.

#### Scenario: The most persistent beginner confusion is addressed

- **WHEN** the aperture is changed
- **THEN** the position of the focus point in the scene is unchanged and only the thickness of the
  sharp zone around it changes

### Requirement: Depth-of-field figures are computed for a stated sensor format

The depth-of-field component SHALL compute its figures from the selected sensor format's circle
of confusion, SHALL offer at least full frame, APS-C, 4/3, 1 inch, and phone, and SHALL display
which format the current figures belong to. A single comparison presented to the room MUST NOT
mix formats.

#### Scenario: Two cameras in the room give different answers

- **WHEN** the sensor format is changed with all four levers unchanged
- **THEN** the reported thickness of the sharp zone changes accordingly
- **AND** the displayed format label changes with it

#### Scenario: The kit-lens example from the lessons is reproduced

- **WHEN** APS-C, 50 mm, `f/5.6` are selected and the focus distance is set to 1 m, then 3 m, then 10 m
- **THEN** the reported thicknesses are approximately 8 cm, 77 cm, and 10 m respectively

### Requirement: Depth of field is reported as a figure and a qualitative band

The depth-of-field readout SHALL present the computed thickness, a qualitative band naming what
that thickness means in practice, and the near and far limits of the sharp zone. The bands SHALL be:

| Thickness | Band | Meaning shown |
|---|---|---|
| under 2 cm | extrêmement mince | la macro : un seul pétale |
| 2 – 10 cm | très mince | un œil net, l'autre flou |
| 10 – 50 cm | mince | un visage entier, mais pas deux personnes |
| 0,5 – 2 m | moyenne | un rang de personnes |
| 2 – 10 m | épaisse | une scène de rue, tout est lisible |
| focus at or beyond the hyperfocal distance | tout est net | paysage — inutile de fermer davantage |

#### Scenario: A very shallow zone is reported

- **WHEN** the computed thickness is 4 cm
- **THEN** the figure, the band « très mince », and the near and far limits are all displayed

#### Scenario: Focus reaches the hyperfocal distance

- **WHEN** the focus distance reaches or exceeds the hyperfocal distance for the current settings
- **THEN** the readout reports that everything is sharp to infinity rather than a finite thickness
- **AND** the hyperfocal distance for those settings is shown

### Requirement: A kit-lens preset constrains aperture by focal length

The depth-of-field and aperture components SHALL offer a kit-zoom preset whose maximum aperture
narrows as focal length increases, matching an 18–55 mm `f/3.5-5.6` lens.

#### Scenario: The animator zooms the kit preset in

- **WHEN** the kit-zoom preset is selected and the focal length is increased from 18 mm toward 55 mm
- **THEN** the widest available aperture narrows from `f/3.5` toward `f/5.6`
- **AND** the aperture control visibly refuses to open beyond the limit for the current focal length

### Requirement: The `f/` notation is shown as a division

An interactive component SHALL show the aperture's real physical diameter as the focal length
divided by the `f`-number, drawn at true relative scale.

#### Scenario: The same f-number on two different lenses

- **WHEN** 24 mm at `f/2.8` and 200 mm at `f/2.8` are compared
- **THEN** the drawn diameters are approximately 8,5 mm and 71 mm at true relative scale
- **AND** the component states that both give the same exposure

#### Scenario: The inversion is demonstrated

- **WHEN** the `f`-number is increased at a fixed focal length
- **THEN** the computed and drawn diameter decreases

### Requirement: The remaining component set

The site SHALL additionally provide interactive components for: shutter speed and motion,
distinguishing subject movement from camera shake as two separately controllable blurs; ISO and
noise, presenting the trade-off as a judgement rather than a scale alone; the mode dial, showing
which of aperture and shutter the photographer retains and whether exposure compensation has any
effect; and the « ma photo est ratée » diagnostic tree.

#### Scenario: The essential blur distinction is demonstrated

- **WHEN** the motion component's subject-movement control is changed with camera shake at zero
- **THEN** only the subject is blurred and the rest of the frame stays sharp
- **AND** raising camera shake with subject movement at zero blurs the whole frame instead

#### Scenario: Manual mode is selected on the mode dial component

- **WHEN** manual mode is selected
- **THEN** both aperture and shutter are attributed to the photographer
- **AND** the exposure compensation control is shown as having no effect, with the reason stated

#### Scenario: A participant walks the diagnostic tree

- **WHEN** a symptom is selected in the diagnostic component
- **THEN** its possible causes are presented as choices
- **AND** selecting a cause presents the correction for it

