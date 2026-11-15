## RENAMED Requirements

- FROM: `### Requirement: A column card places its icon above its title`
- TO: `### Requirement: A repère card places its icon above its title`

## MODIFIED Requirements

### Requirement: A repère card places its icon above its title

On a repère screen with column cards, a card that carries an icon SHALL show that icon on its own
line, above the card's title, whatever the title's length or the screen's width. The icon SHALL NOT
share a line with the title. On a concept panel, a card's icon SHALL sit beside its title when both
fit on one line, and the title SHALL move below the icon only when they don't. A card without an
icon SHALL open on its title.

#### Scenario: Titles of different lengths share a screen

- **WHEN** session 3's « Au-delà de la composition » opening screen is displayed at projection
  width
- **THEN** « Captiver », « Faire ressentir » and « Faire imaginer » each appear below their icon
- **AND** the three titles start at the same height, as do the three bodies

#### Scenario: A short title would fit beside its icon

- **WHEN** a repère card whose title is a single short word is displayed at any width
- **THEN** its icon is above the title, not beside it

#### Scenario: A concept panel with icons and photographs is projected

- **WHEN** session 3's « Captiver » panel is displayed at 1024 × 768 or 16:9
- **THEN** « La tension » and « Les relations » each sit on the same line as their icon
- **AND** the demonstration photographs take the height the header no longer uses
- **AND** nothing on the screen is cut off

#### Scenario: A concept-panel title is too long for its icon's line

- **WHEN** a concept-panel card's title does not fit beside its icon at the displayed width
- **THEN** the title moves below the icon
- **AND** the bodies and photographs of the cards on that panel still start at the same height

#### Scenario: Cards are read on a phone

- **WHEN** a repère screen with column cards carrying icons is opened at phone width
- **THEN** each stacked card shows its icon above its title
