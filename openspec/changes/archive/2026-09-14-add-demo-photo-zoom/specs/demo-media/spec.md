## ADDED Requirements

### Requirement: A demonstration image may declare a resting crop and zoom

A demonstration image MAY declare a resting view that frames a point in the photograph at a
stated magnification, instead of showing the whole frame. When declared, the resting view SHALL
show that same framing and magnification regardless of whether the image is projected, viewed on
a phone, or printed. When not declared, the resting view SHALL show the whole frame, as before.

#### Scenario: A lighting-direction comparison is projected

- **WHEN** a demonstration image with a declared resting crop is displayed
- **THEN** the resting view is centered on the declared point at the declared magnification
- **AND** the detail the comparison depends on is visible without enlarging the image

#### Scenario: The same image is read on a phone, and printed

- **WHEN** a demonstration image with a declared resting crop is displayed on a narrower or
  differently proportioned surface, including a printed page
- **THEN** the same point remains the center of the resting view at the same magnification

#### Scenario: An image without a declared crop is displayed

- **WHEN** a demonstration image has no declared resting crop
- **THEN** its resting view shows the whole frame

### Requirement: A demonstration image can be enlarged to its full frame

Every demonstration image whose photograph is present, whether or not it declares a resting crop,
SHALL be enlargeable on demand to its full, uncropped frame, shown above the rest of the screen
with the screen behind it visibly dimmed. The room SHALL be able to return to the resting view
without leaving the screen.

#### Scenario: The presenter enlarges a cropped demonstration photo

- **WHEN** the presenter activates a demonstration image whose resting view is cropped
- **THEN** the full, uncropped photograph is displayed above the rest of the screen
- **AND** the screen behind it is visibly dimmed

#### Scenario: The presenter returns to the resting view

- **WHEN** the enlarged photograph is active and the presenter activates it again, activates
  anywhere outside it, or presses the keyboard's escape key
- **THEN** the resting view is shown again
- **AND** nothing else on the screen has changed

#### Scenario: A comparison series has several images enlargeable at once

- **WHEN** one image in a comparison series is enlarged
- **THEN** the other images in the same series remain in their resting view, unaffected

### Requirement: A demonstration image's label is available on demand

A demonstration image's declared label (the value of the comparison's variable for that image)
SHALL NOT be shown by default in the resting view. It SHALL be shown while the image is being
pointed at, and whenever the image is enlarged.

#### Scenario: The resting view is uncluttered

- **WHEN** a demonstration image is displayed at rest and is not being pointed at
- **THEN** its label is not shown

#### Scenario: The presenter points at an image to identify it

- **WHEN** the presenter points at a demonstration image without activating it
- **THEN** its label is shown

#### Scenario: An enlarged image still identifies itself

- **WHEN** a demonstration image is enlarged
- **THEN** its label is shown
