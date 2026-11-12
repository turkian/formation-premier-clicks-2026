# Spec Delta

## ADDED Requirements

### Requirement: A panel whose columns show the same scene may declare a linked loupe

A concept panel whose columns all show a photograph of the same scene MAY declare a loupe with a
stated magnification. Its photographs SHALL then behave like those of a comparison series that
declares a loupe, hint included. A panel that does not declare a loupe SHALL behave as before.

#### Scenario: The presenter calls the loupe on a panel

- **WHEN** the presenter holds Shift with the pointer over one photograph of a panel that
  declares a loupe
- **THEN** every photograph of the panel shows a magnified view at the declared magnification
- **AND** each magnified view is centred on the same point of the scene as the pointer, the
  resting crop taken into account

#### Scenario: The loupe hint on a panel

- **WHEN** a panel that declares a loupe is shown on a device that can call it
- **THEN** a hint below the columns tells the presenter to hold Shift to magnify a detail
- **AND** the hint does not appear on a phone, a tablet, or a printed page

#### Scenario: A panel without a loupe is pointed at with Shift held

- **WHEN** the presenter holds Shift over a column photograph of a panel that does not declare a
  loupe
- **THEN** no magnified view appears
