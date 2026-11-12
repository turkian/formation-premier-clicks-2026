# Spec Delta

## ADDED Requirements

### Requirement: A concept panel with columns states its claim across the full width

On a concept panel whose body is two or three side-by-side cards, the claim SHALL be allowed to
span the full width the cards occupy at projection width, instead of the short measure used by
concept panels without columns. A claim that fits on one line at that width SHALL be shown on one
line. A longer claim MAY wrap onto two or more lines, each as wide as the cards. Concept panels
without columns SHALL keep their short claim measure.

#### Scenario: A short claim on a panel with columns is projected

- **WHEN** session 3's « Placer » screen is displayed at 16:9 projection width
- **THEN** its claim « Décentré ou centré — franchement. Jamais entre les deux. » appears on a
  single line above the two cards

#### Scenario: A long claim on a panel with columns is projected

- **WHEN** a concept panel with columns whose claim does not fit on one line is displayed at
  projection width
- **THEN** its claim wraps onto lines that extend past the short measure, up to the width of
  the cards
- **AND** nothing on the screen is cut off, at 1024 × 768 or at 16:9

#### Scenario: A concept panel without columns is projected

- **WHEN** a concept panel without columns, diagram or illustration is displayed at projection
  width
- **THEN** its claim keeps the same short measure as before this change
