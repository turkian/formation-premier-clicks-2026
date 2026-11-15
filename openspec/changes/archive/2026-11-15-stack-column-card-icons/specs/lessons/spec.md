## ADDED Requirements

### Requirement: A column card places its icon above its title

On any screen with column cards, repère screens and concept panels alike, a card that carries an
icon SHALL show that icon on its own line, above the card's title, whatever the title's length or
the screen's width. The icon SHALL NOT share a line with the title. A card without an icon SHALL
open on its title.

#### Scenario: Titles of different lengths share a screen

- **WHEN** session 3's « Au-delà de la composition » opening screen is displayed at projection
  width
- **THEN** « Captiver », « Faire ressentir » and « Faire imaginer » each appear below their icon
- **AND** the three titles start at the same height, as do the three bodies

#### Scenario: A short title would fit beside its icon

- **WHEN** a card whose title is a single short word is displayed at any width
- **THEN** its icon is above the title, not beside it

#### Scenario: A concept panel with icons and photographs is projected

- **WHEN** a concept panel whose columns carry icons and demonstration photographs is displayed at
  1024 × 768 or 16:9
- **THEN** each card's icon is above its title
- **AND** nothing on the screen is cut off

#### Scenario: Cards are read on a phone

- **WHEN** a screen with column cards carrying icons is opened at phone width
- **THEN** each stacked card shows its icon above its title
