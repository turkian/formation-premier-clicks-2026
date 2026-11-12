## ADDED Requirements

### Requirement: A panel's archival illustration may declare a single-image loupe

A concept panel's archival illustration MAY declare a loupe with a stated magnification. Its
illustration SHALL then behave like a free demonstration photograph that declares a
single-photograph loupe, hint included. An illustration without a loupe SHALL show no magnified
view.

#### Scenario: The presenter calls the loupe on an illustration

- **WHEN** the presenter holds Shift with the pointer over a panel's illustration that declares a
  loupe, on a device with a fine pointer that can hover
- **THEN** the illustration shows a magnified view of the point under the pointer at the declared
  magnification, inside its frame
- **AND** the view disappears when Shift is released or the pointer leaves the illustration

#### Scenario: The loupe hint on an illustrated panel

- **WHEN** a panel whose illustration declares a loupe is shown on a device that can call it
- **THEN** a hint below the illustration tells the presenter to hold Shift to magnify a detail
- **AND** the hint appears once, and not on a phone, a tablet or a printed page

#### Scenario: Shift is held while activating the illustration

- **WHEN** the presenter activates the illustration while holding Shift
- **THEN** the illustration is not enlarged to its full frame
