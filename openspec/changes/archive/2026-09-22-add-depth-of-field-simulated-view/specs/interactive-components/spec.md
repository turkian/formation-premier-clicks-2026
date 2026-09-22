## ADDED Requirements

### Requirement: Depth of field offers a simulated view alongside the top-down diagram

The depth-of-field component SHALL provide a toggle between its existing top-down diagram and a
simulated front-facing view of the scene, both driven by the same live lever state. The simulated
view SHALL render a subject, a background element, and a foreground element, with the subject
always sharp and the background and foreground each rendered sharp or blurred according to the
component's existing computed near and far limits of the sharp zone. The foreground element's
position SHALL be a fixed fraction of the current focus distance rather than a control of its own,
so the component continues to expose exactly four levers. Each of the three elements SHALL also
display its distance from the camera as text.

#### Scenario: Switching views preserves the current lever state

- **WHEN** the animator toggles from the top-down diagram to the simulated view, or back
- **THEN** the four levers' current values are unchanged
- **AND** the newly shown view reflects those same values with no reset

#### Scenario: The simulated view shows the subject in focus

- **WHEN** the simulated view is displayed, for any lever values
- **THEN** the subject is rendered sharp

#### Scenario: The background element blurs consistently with the top-down diagram

- **WHEN** the simulated view is displayed and the subject-to-background distance places the
  background outside the far limit of the sharp zone
- **THEN** the background element is rendered blurred
- **AND** the same lever values that blur the top-down diagram's background wall also blur the
  simulated view's background element

#### Scenario: The foreground element can become sharp

- **WHEN** the sharp zone widens enough that its near limit reaches or passes the foreground
  element's fixed position
- **THEN** the foreground element is rendered sharp instead of blurred

#### Scenario: A participant explores the toggle on a phone

- **WHEN** the depth-of-field component is opened at phone width
- **THEN** the toggle between the top-down diagram and the simulated view is operable by touch

#### Scenario: The simulated view labels each element's distance from the camera

- **WHEN** the simulated view is displayed
- **THEN** the foreground, subject, and background elements each show their distance from the
  camera as text
- **AND** the three distances stay consistent with the top-down diagram's figures for the same
  lever values
