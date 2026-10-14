## ADDED Requirements

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

## MODIFIED Requirements

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
