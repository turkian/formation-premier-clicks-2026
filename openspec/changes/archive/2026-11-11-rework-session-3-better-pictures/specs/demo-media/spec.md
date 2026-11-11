# Spec Delta

## ADDED Requirements

### Requirement: Archival images are public domain where the site is read

A demonstration image by a third party (a photograph, an engraving or a book page) that is not
used with its author's permission SHALL be in the public domain both in Canada (its author died
before 1972) and in the United States. Otherwise it SHALL NOT be hosted on the site.

#### Scenario: The animator adds a nineteenth-century image

- **WHEN** an archival image whose author died before 1972 is added to a slot
- **THEN** the image is hosted with the site like any other demonstration image

#### Scenario: A candidate image is still protected in Canada

- **WHEN** the author of a candidate archival image died in 1972 or later
- **THEN** the image is not added to the site, even if it is public domain in the United States

### Requirement: Archival images carry their author, date and source

Every archival image SHALL carry a credit giving its author, its date or approximate date,
and the collection or archive it comes from.

#### Scenario: A participant enlarges an archival image

- **WHEN** an archival image is displayed or enlarged
- **THEN** its author, date and source are available as its credit

#### Scenario: An archival slot is still empty

- **WHEN** an archival image has not yet been supplied
- **THEN** the slot's specification names the intended image, its author and its date

## MODIFIED Requirements

### Requirement: Essential demonstrations are marked

Each demonstration slot SHALL carry a priority. The following SHALL be marked essential: the
focus-distance series, the subject-to-background distance series, the out-of-focus versus
camera-shake pair, the subject-blur versus camera-shake pair, the street scene at three shutter
speeds, the light-trail and intentional-camera-movement images of the « flou choisi »
demonstration, the three images of the « même lumière, trois issues » ISO series, and the
photographs of the first-tier composition techniques.

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

#### Scenario: The animator plans the composition photographs

- **WHEN** the animator reviews the composition block's slots in the shot list
- **THEN** the photographs of the first-tier techniques are marked essential
- **AND** the photographs of the second- and third-tier techniques are marked useful

## REMOVED Requirements

### Requirement: The development demonstration is backed by cumulative pre-rendered states

**Reason**: Session 3 no longer demonstrates development gesture by gesture. Editing is reduced
to the animateur's workflow and a few hints, and the full tutorial belongs to the later editing
workshop.

**Migration**: No image is lost, because no development state was ever supplied. If the editing
workshop is built on this site later, it brings its own requirement.
