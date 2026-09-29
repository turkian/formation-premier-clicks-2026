## Purpose

Static diagrams of the lens aperture used inside concept panels. They show the size of the opening
at true relative scale, and offer variants so a panel can carry only the message it needs.

## ADDED Requirements

### Requirement: An aperture diagram draws the openings at true relative scale

An aperture diagram SHALL draw each opening as a disc whose diameter is the focal length divided by
its `f`-number, all on the same scale, and SHALL label each disc with its `f`-number. This applies
to every variant of the diagram.

#### Scenario: Four openings side by side

- **WHEN** the diagram shows `f/2`, `f/4`, `f/8` and `f/16` for the same focal length
- **THEN** the discs are drawn on one shared scale, from the largest to the smallest
- **AND** each disc is labelled with its `f`-number

### Requirement: The light-focused variant stays generic about light

A light-focused variant of the aperture diagram SHALL convey only that a larger opening admits more
light and a smaller opening admits less. It SHALL NOT display numeric ratios, stops or exposure
values, and SHALL NOT display the diameter arithmetic.

#### Scenario: The recap shows the openings as a light budget

- **WHEN** the light-focused variant is displayed
- **THEN** an axis states which end admits more light and which end admits less
- **AND** no ratio, stop count or division such as `50 ÷ 2` appears anywhere in the diagram

### Requirement: The light-focused variant states the direction of the `f`-number

The light-focused variant SHALL state on the diagram itself that a smaller `f`-number is a larger
opening, so a participant does not have to recall the direction from the spoken explanation.

#### Scenario: A participant reads the diagram alone

- **WHEN** the light-focused variant is displayed
- **THEN** the diagram states that a small `f`-number means a large opening
- **AND** the statement is readable at the projection body size, not the smallest size

### Requirement: Existing uses of the aperture diagram keep their rendering

Adding a variant SHALL NOT change how the diagram renders when no variant is requested.

#### Scenario: Session 1's aperture panel is rendered

- **WHEN** a panel uses the aperture diagram without requesting a variant
- **THEN** it renders the diameter arithmetic under each disc, as before
