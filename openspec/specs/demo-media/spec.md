# demo-media Specification

## Purpose
The contract between the site and the demonstration photographs the animator supplies: the site
must be projectable before a single photo exists, must never show a broken image, and must tell
the animator exactly what remains to be shot.
## Requirements
### Requirement: A missing photograph displays its own specification

Every demonstration image SHALL be declared with the shooting specification it requires. When the
image file is absent, the site SHALL display that specification in the image's place.

#### Scenario: Lesson 1 is projected before the demo series is shot

- **WHEN** a demonstration screen whose photographs are absent is displayed
- **THEN** each missing image's slot shows its shooting specification, such as « 50 mm · f/5.6 · sujet à 1 m »
- **AND** no broken image, empty box, or error is displayed
- **AND** the screen remains legible and the block remains presentable

#### Scenario: A photograph is added later

- **WHEN** the image file for a declared slot is supplied
- **THEN** the photograph replaces the specification with no other edit required

### Requirement: A comparison series declares its single variable

Each demonstration comparison SHALL declare the one variable that differs between its images, and
SHALL display it as the caption of the series.

#### Scenario: The focus-distance series is shown

- **WHEN** the series comparing a subject at 1 m and at 5 m is displayed
- **THEN** the caption states that only the distance changed
- **AND** the constant settings shared by both images are stated

#### Scenario: A series is declared with images that vary in more than one respect

- **WHEN** a comparison series declares more than one differing variable
- **THEN** the declaration is rejected as invalid

### Requirement: The shot list is derived from the declared slots

The site SHALL be able to report every declared demonstration slot, its specification, its
priority, and whether its image is present, so the animator can work from a single list.

#### Scenario: The animator plans a shooting session

- **WHEN** the animator requests the shot list
- **THEN** every declared slot is listed with its specification, its lesson and block, its priority, and its status
- **AND** the slots still missing an image are distinguishable from those already supplied

### Requirement: Essential demonstrations are marked

Each demonstration slot SHALL carry a priority. The following SHALL be marked essential: the
focus-distance series, the subject-to-background distance series, the out-of-focus versus
camera-shake pair, the subject-blur versus camera-shake pair, the street scene at three shutter
speeds, the light-trail and intentional-camera-movement images of the « flou choisi »
demonstration, the three images of the « même lumière, trois issues » ISO series, the
composition before-and-after pairs, the development demonstration
photograph, and its seven cumulative states.

#### Scenario: The animator can only prepare part of the set

- **WHEN** the animator reviews the shot list with limited time
- **THEN** the essential slots are identified
- **AND** the focus-distance series is identified as the one to keep if only one can be prepared

#### Scenario: The animator plans the speed photographs

- **WHEN** the animator reviews the speed block's slots in the shot list
- **THEN** the three street speeds, the light trails and the intentional camera movement are
  marked essential
- **AND** the panning image and the partial-subject-blur image are marked useful, not essential

#### Scenario: The animator plans the ISO photographs

- **WHEN** the animator reviews the ISO block's slots in the shot list
- **THEN** the series shows the same scene in the same light, at the same aperture: a high ISO
  correctly exposed, a low ISO under-exposed then brightened in editing, and a low ISO at a slow
  speed with camera shake
- **AND** all three are marked essential
- **AND** the specification of the brightened image states that it was brightened afterwards

### Requirement: Photographs are not required where a component is more honest

A concept SHALL NOT declare a demonstration slot when an interactive component covers it. The
aperture-as-division geometry, the depth-of-field levers, the mode dial, and the diagnostic tree
SHALL be presented by components, not photographs.

#### Scenario: The animator checks whether a concept needs a photograph

- **WHEN** the shot list is reviewed
- **THEN** no slot is declared for a concept presented by an interactive component

### Requirement: The development demonstration is backed by cumulative pre-rendered states

The seven-gestures development demonstration SHALL declare, in addition to its starting
photograph, seven cumulative image states — one per geste, each showing every gesture applied so
far. These SHALL be declared as demonstration slots like any other image, and SHALL degrade to
their specification when absent.

#### Scenario: The animator demonstrates live

- **WHEN** the animator performs the seven gestures live in editing software
- **THEN** the screens carry the fixed order and the principle repeated at each gesture
- **AND** the pre-rendered states are available as the block's support

#### Scenario: The editing software fails during the session

- **WHEN** the live demonstration cannot be performed
- **THEN** the seven cumulative states present the sequence in order
- **AND** each state shows the result of every gesture up to and including its own

#### Scenario: The animator skips a geste

- **WHEN** the animator chooses to skip a geste for time
- **THEN** the remaining states are still reachable in order without the skipped one breaking the sequence

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
pointed at, and whenever the image is enlarged. A demonstration screen MAY instead declare that its
labels are shown only when an image is enlarged; on such a screen, pointing at an image SHALL NOT
show its label, and the resting view SHALL reserve no space for it.

#### Scenario: The resting view is uncluttered

- **WHEN** a demonstration image is displayed at rest and is not being pointed at
- **THEN** its label is not shown

#### Scenario: The presenter points at an image to identify it

- **WHEN** the presenter points at a demonstration image without activating it, on a screen that
  does not restrict its labels to enlargement
- **THEN** its label is shown

#### Scenario: An enlarged image still identifies itself

- **WHEN** a demonstration image is enlarged
- **THEN** its label is shown

#### Scenario: A screen keeps its labels for enlargement

- **WHEN** the presenter points at an image of a screen that declares its labels are shown only
  when enlarged
- **THEN** no label is shown
- **AND** the photographs use the height a label line would otherwise have taken

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

### Requirement: Free demonstration photographs may wrap into columns

The photographs of a demonstration screen that do not belong to a comparison series MAY declare a
number of columns. When they do, at projection width they SHALL be arranged in rows of that many
photographs, in their declared order, every photograph the same size. When they do not, they SHALL
be arranged on a single row, as before. At phone width they SHALL be stacked in their declared
order either way.

#### Scenario: Four photographs declared in two columns are projected

- **WHEN** a demonstration screen declares four free photographs in two columns
- **THEN** the photographs are shown as two rows of two, in their declared order
- **AND** the screen remains entirely visible at 1024 × 768 as at 16:9

#### Scenario: Free photographs without a column count

- **WHEN** a demonstration screen declares free photographs without a column count
- **THEN** they are shown on a single row, as before

#### Scenario: The wrapped photographs are credited

- **WHEN** a wrapped photograph carries a credit and the other photographs of the screen do not
- **THEN** the credit at projection width designates it by its column and its row, such as
  « Photo de gauche, rangée du bas »
- **AND** at phone width it designates it by its rank in reading order

### Requirement: Free demonstration photographs may declare a single-photograph loupe

The free photographs of a demonstration screen MAY declare a loupe with a stated magnification.
When they do, and only on a device with a fine pointer that can hover, holding the Shift key while
pointing at one of them SHALL show, on that photograph only, a magnified view of the point under
the pointer at the declared magnification. The magnified view SHALL follow the pointer while Shift
is held and SHALL stay inside the photograph's frame. A permanent hint telling the presenter to
hold Shift to magnify a detail SHALL be shown below the photographs, under the same conditions as
the hint of a series with a loupe. When no loupe is declared, the photographs SHALL behave exactly
as before.

#### Scenario: The presenter calls the loupe on one photograph

- **WHEN** the presenter holds Shift with the pointer over one free photograph of a screen that
  declares a single-photograph loupe
- **THEN** that photograph shows a magnified view of the point under the pointer at the declared
  magnification
- **AND** no other photograph of the screen shows a magnified view

#### Scenario: The presenter moves to another photograph

- **WHEN** the presenter, still holding Shift, moves the pointer from one free photograph to
  another
- **THEN** the magnified view leaves the first photograph and appears on the second, at the point
  under the pointer

#### Scenario: The presenter dismisses the loupe

- **WHEN** the presenter releases Shift, or the pointer leaves the photographs
- **THEN** no magnified view remains on the screen

#### Scenario: Shift is held while activating a photograph

- **WHEN** the presenter activates a free photograph while holding Shift, on a screen that declares
  a single-photograph loupe
- **THEN** the photograph is not enlarged to its full frame

#### Scenario: The same screen is read on a phone or printed

- **WHEN** the same screen is displayed on a touch device without hover, or printed
- **THEN** no loupe and no loupe hint are shown
- **AND** the photographs can still be enlarged to their full frame as before
