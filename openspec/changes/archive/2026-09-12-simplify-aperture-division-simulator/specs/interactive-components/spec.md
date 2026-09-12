## MODIFIED Requirements

### Requirement: A kit-lens preset constrains aperture by focal length

The depth-of-field component SHALL offer a kit-zoom preset whose maximum aperture narrows as
focal length increases, matching an 18–55 mm `f/3.5-5.6` lens. The aperture/division component
is not required to offer this preset.

#### Scenario: The animator zooms the kit preset in

- **WHEN** the kit-zoom preset is selected and the focal length is increased from 18 mm toward 55 mm
- **THEN** the widest available aperture narrows from `f/3.5` toward `f/5.6`
- **AND** the aperture control visibly refuses to open beyond the limit for the current focal length

### Requirement: The `f/` notation is shown as a division

An interactive component SHALL show the aperture's real physical diameter as the focal length
divided by the `f`-number, drawn at true relative scale. When two lenses are compared, the
component SHALL state only the computed diameters and how they compare to one another — it
SHALL NOT claim that the two lenses deliver the same (or different) exposure, since the
`f`-number is a geometric ratio and says nothing about a specific lens's actual light
transmission.

#### Scenario: Continuing the aperture-notation quiz

- **WHEN** the aperture/division component's default state is displayed
- **THEN** two lenses are shown, both at 50 mm, one at `f/2.4` and the other at `f/22`
- **AND** the drawn diameters are approximately 20,8 mm and 2,3 mm at true relative scale
- **AND** the component states how many times larger one diameter is than the other
- **AND** the component makes no claim about exposure being equal or unequal between the two

#### Scenario: The same f-number on two different lenses

- **WHEN** 24 mm at `f/2.8` and 200 mm at `f/2.8` are compared
- **THEN** the drawn diameters are approximately 8,5 mm and 71 mm at true relative scale
- **AND** the component makes no claim about exposure being equal or unequal between the two

#### Scenario: The inversion is demonstrated

- **WHEN** the `f`-number is increased at a fixed focal length
- **THEN** the computed and drawn diameter decreases
