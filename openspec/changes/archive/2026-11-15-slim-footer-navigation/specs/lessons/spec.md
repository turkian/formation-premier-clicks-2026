## ADDED Requirements

### Requirement: Footer navigation shows only arrows and the screen counter

A lesson screen's footer navigation SHALL show a previous arrow, the screen counter `n / total`
and a next arrow, and SHALL NOT show the words « Précédent » or « Suivant ». Each arrow SHALL keep
an accessible name, « Précédent » or « Suivant », and SHALL be easy to tap on a phone.

#### Scenario: A middle screen is displayed

- **WHEN** a lesson screen that is neither the first nor the last is displayed
- **THEN** the footer navigation reads `←`, the counter (for example `12 / 25`) and `→`
- **AND** the words « Précédent » and « Suivant » are not visible in the footer
- **AND** activating `←` opens the previous screen and activating `→` opens the next one

#### Scenario: A screen reader reaches the footer arrows

- **WHEN** assistive technology announces the footer's arrow links
- **THEN** the previous link is announced as « Précédent » and the next link as « Suivant »

#### Scenario: The first or last screen is displayed

- **WHEN** the first screen of a lesson is displayed
- **THEN** the previous arrow appears faded and does not act as a link
- **AND WHEN** the last screen of a lesson is displayed
- **THEN** the next arrow appears faded and does not act as a link

#### Scenario: A reader taps an arrow on a phone

- **WHEN** a lesson screen is displayed at phone width
- **THEN** each active arrow's tap target is larger than the arrow glyph itself

### Requirement: Footer navigation never wraps

The footer navigation, meaning its two arrows and its screen counter, SHALL always appear on a
single line and SHALL NOT be narrowed by other footer content. When the footer runs out of
horizontal room, the photo credit SHALL wrap instead.

#### Scenario: A screen with long photo credits is projected

- **WHEN** session 3's « Placer » composition panel, which credits three archive photographs, is
  displayed at 16:9 and at 4:3 (1024 × 768)
- **THEN** the arrows and the counter `12 / 25` appear on one line, with the counter unbroken
- **AND** the photo credit wraps onto several lines if it needs the room

#### Scenario: The footer wraps on a phone

- **WHEN** a screen with a photo credit is displayed at phone width and the footer wraps
- **THEN** the navigation moves as one unit and stays on a single line
