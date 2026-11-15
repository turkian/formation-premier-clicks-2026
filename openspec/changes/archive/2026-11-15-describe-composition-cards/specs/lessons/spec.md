## ADDED Requirements

### Requirement: Session 3 concept panel cards describe the technique

On a session 3 concept panel with columns, each column's body SHALL describe the technique as it
appears in an image, by its elements and their arrangement. It MAY say what that arrangement does.
It SHALL NOT tell the photographer what to do, give a test to pass, or point out a common mistake.
That advice belongs in the room, said out loud, not on the card.

#### Scenario: The cards of « Simplifier » are displayed

- **WHEN** the « Simplifier » panel is displayed
- **THEN** « Un seul sujet » reads « Un seul élément à regarder, rien autour pour lui faire
  concurrence. »
- **AND** « Se rapprocher » reads « Assez près pour lire l'expression, la texture, le détail. »
- **AND** « Remplir le cadre » reads « Le sujet occupe l'image d'un bord à l'autre. »

#### Scenario: The cards of « Nettoyer » are displayed

- **WHEN** the « Nettoyer » panel is displayed
- **THEN** « Les quatre coins » reads « Des coins sans intrus : ni poteau, ni poubelle, ni bras
  coupé. »
- **AND** « L'arrière-plan d'abord » reads « Un fond calme, choisi en premier ; le sujet se détache
  devant. »

#### Scenario: The point-of-view card is displayed

- **WHEN** the « Donner de la profondeur » panel is displayed
- **THEN** « Le point de vue » reads « Accroupi ou en hauteur, plutôt qu'à la hauteur des yeux. »

#### Scenario: A card body is written as advice

- **WHEN** a session 3 concept panel's column body is an imperative (« Choisissez… »), a test
  addressed to the reader (« Si vous ne pouvez pas… ») or the diagnosis of a usual fault (« la
  photo est presque toujours prise de trop loin »)
- **THEN** it is rewritten to describe what the image shows
- **AND** the panel's claim and aside are not affected by this rule
