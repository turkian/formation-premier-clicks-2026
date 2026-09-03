## Purpose

The contract between the site and the demonstration photographs the animator supplies: the site
must be projectable before a single photo exists, must never show a broken image, and must tell
the animator exactly what remains to be shot.

## ADDED Requirements

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
camera-shake pair, the subject-blur versus camera-shake pair, the « nette mais bruitée » versus
« propre mais floue » pair, the three metering-failure pairs, the composition before-and-after
pairs, the development demonstration photograph, and its seven cumulative states.

#### Scenario: The animator can only prepare part of the set

- **WHEN** the animator reviews the shot list with limited time
- **THEN** the essential slots are identified
- **AND** the focus-distance series is identified as the one to keep if only one can be prepared

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
