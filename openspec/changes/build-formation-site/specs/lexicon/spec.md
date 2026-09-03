## Purpose

The per-manufacturer glossary as a browsable website: eight camera brands that use eight
different words for the same settings, presented so that a participant can look up their own
camera's vocabulary at home and never conclude that their camera is missing a feature.

## ADDED Requirements

### Requirement: Eight brands, one shared structure

The lexique SHALL cover Canon, Nikon, Sony, Fujifilm, Lumix, Olympus/OM System, iPhone, and
Android. Every brand's page SHALL present the same numbered sections in the same order, so that
a spoken instruction such as « section 2 de votre feuille » is correct for every participant
regardless of brand.

#### Scenario: The animator refers to a section by number

- **WHEN** the animator says to consult section 2 of the lexique
- **THEN** section 2 covers focus on all eight brand pages

#### Scenario: A participant compares two brands

- **WHEN** a participant switches from one brand to another
- **THEN** the section headings and their order are unchanged
- **AND** only the right-hand column of correspondences differs

### Requirement: Each entry maps the formation's word to the camera's word

Every lexique entry SHALL present the term used during the formation alongside the term or menu
location used by that camera, with the formation's term always in the leading position.

#### Scenario: A participant looks up a term heard in a lesson

- **WHEN** a participant searches for a term used during the formation
- **THEN** the corresponding term or menu path for their selected brand is shown

#### Scenario: A brand does not use the formation's term at all

- **WHEN** a brand's menus contain neither `AF-S` nor `AF-C`
- **THEN** that brand's page states the substitution explicitly rather than leaving the entry blank

### Requirement: Brand selection is remembered

The lexique SHALL let a visitor select their brand and SHALL restore that selection on subsequent
visits from the same device, without requiring an account.

#### Scenario: A participant returns a week later

- **WHEN** a participant who previously selected a brand reopens the lexique
- **THEN** their brand's content is shown without reselecting
- **AND** changing brands remains possible at any time

#### Scenario: A visitor has no stored selection

- **WHEN** the lexique is opened on a device with no stored selection, or with storage unavailable
- **THEN** the brand selector is presented and the page renders correctly with no brand chosen

### Requirement: Structural exceptions are served, not flattened

Where a brand's controls do not map onto the formation's model, the lexique SHALL explain that
brand's own scheme on its page rather than omitting the section.

#### Scenario: A Fujifilm owner looks for the mode dial

- **WHEN** a Fujifilm owner opens the modes section
- **THEN** the page explains that the mode results from combining the lens aperture ring and the
  shutter speed dial, each of which has an `A` position
- **AND** the four resulting combinations are given

### Requirement: The lexique states why brands differ

Each brand page SHALL carry the framing statement that a missing term reflects different naming,
not an inferior camera, and SHALL tell the reader where to look when a setting cannot be found.

#### Scenario: A participant cannot find a setting

- **WHEN** a participant reaches the end of their brand page without finding a setting
- **THEN** the page directs them to their camera's quick menu, to the manufacturer's PDF manual
  searched by the camera's own term, and to asking a person

### Requirement: The lexique is searchable across the selected brand

The lexique SHALL allow searching within the selected brand's terms and menu paths.

#### Scenario: A participant searches by their camera's own word

- **WHEN** a participant searches for a term printed on their camera rather than a formation term
- **THEN** the matching entry is found and its formation-side equivalent is shown
