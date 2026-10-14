## ADDED Requirements

### Requirement: A comparison series may declare a linked loupe

A comparison series MAY declare a loupe with a stated magnification. When it does, and only on a
device with a fine pointer that can hover, holding the Shift key while pointing at one of the
series' photographs SHALL show, on every photograph of the series at the same time, a magnified
view of the same point of the scene at the declared magnification. The magnified views SHALL
follow the pointer while Shift is held, and SHALL stay inside each photograph's frame. When the
series does not declare a loupe, its photographs SHALL behave exactly as before.

#### Scenario: The presenter calls the loupe on a series

- **WHEN** the presenter holds Shift with the pointer over one photograph of a series that
  declares a loupe
- **THEN** every photograph of that series shows a magnified view at the declared magnification
- **AND** each magnified view is centred on the same point of the scene as the pointer

#### Scenario: The presenter moves across the photograph

- **WHEN** the presenter moves the pointer while still holding Shift
- **THEN** every magnified view of the series follows to the new point of the scene

#### Scenario: The presenter dismisses the loupe

- **WHEN** the presenter releases Shift, or the pointer leaves the photographs of the series
- **THEN** no magnified view remains on the screen
- **AND** every photograph is back in its resting view

#### Scenario: The pointed photograph has a resting crop

- **WHEN** a photograph of the series declares a resting crop and the presenter calls the loupe
  over it
- **THEN** the magnified view shows the point of the scene that is under the pointer, not the
  point that would be under it without the crop

#### Scenario: Shift is held while activating a photograph

- **WHEN** the presenter activates a photograph while holding Shift
- **THEN** the photograph is not enlarged to its full frame

#### Scenario: A series without a loupe is pointed at with Shift held

- **WHEN** the presenter holds Shift over a photograph of a series that does not declare a loupe
- **THEN** no magnified view appears and the photograph behaves as it does without Shift

#### Scenario: Another series on the same screen

- **WHEN** the loupe is called on one series of a screen that shows several series
- **THEN** the photographs of the other series show no magnified view

### Requirement: A series with a loupe says how to call it

A comparison series that declares a loupe SHALL display, below the series, a permanent hint
telling the presenter to hold Shift to magnify a detail. The hint SHALL appear only where the
loupe can be called, and SHALL NOT appear on a phone, a tablet, or a printed page.

#### Scenario: A series with a loupe is projected

- **WHEN** a screen with a series that declares a loupe is displayed on a computer
- **THEN** a hint telling the presenter to hold Shift to magnify a detail is visible below the
  series, without pointing at anything

#### Scenario: The same screen is read on a phone or printed

- **WHEN** the same screen is displayed on a touch device without hover, or printed
- **THEN** no loupe hint is shown
- **AND** the series' photographs can still be enlarged to their full frame as before
