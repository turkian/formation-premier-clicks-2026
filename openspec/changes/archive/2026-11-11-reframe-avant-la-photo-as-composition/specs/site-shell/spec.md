## MODIFIED Requirements

### Requirement: French-Québec typographic conventions

All rendered text SHALL follow the French typographic conventions used in the source content:
non-breaking spaces before `:`, `;`, `!`, and `?`, French quotation marks `« »` with
non-breaking inner spaces, and non-breaking spaces inside numbers and units (`1 h 50`, `f/5.6`,
`10 × 15 cm`).

#### Scenario: A line wraps near punctuation

- **WHEN** a line of text wraps immediately before a `:` or inside `« … »`
- **THEN** the punctuation or quotation mark stays attached to the word it belongs to
- **AND** a unit is never separated from its number across a line break

#### Scenario: A colon follows emphasized or code text

- **WHEN** content writes a `:` right after bold, italic or inline code, such as
  `**comment l'arranger** :`
- **THEN** the rendered `:` is preceded by a thin non-breaking space, as it is after plain text
- **AND** the `:` never starts a line on its own
