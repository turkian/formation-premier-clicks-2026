## MODIFIED Requirements

### Requirement: Session 3 answers how to make better photographs

Session 3 SHALL state its question as « comment faire de meilleures photos ? » and SHALL present,
in this order: the recap of session 2, the history of composition rules, composition, the pause
and questions, beyond composition, the animateur's experience, and « Et maintenant ? ».

#### Scenario: A participant opens session 3

- **WHEN** session 3's lesson is opened
- **THEN** its question is « comment faire de meilleures photos ? »
- **AND** its blocks appear in the order above

#### Scenario: The session opens on the participants' own question

- **WHEN** session 3's first screen is displayed
- **THEN** it asks whether participants have taken photographs since session 2 and what they
  learned
- **AND** no screen in session 3 shows a montage of the participants' photographs from sessions 1
  and 2

#### Scenario: A participant looks for the editing tutorial

- **WHEN** session 3 is read from start to end
- **THEN** no block teaches editing-software controls one by one
- **AND** no screen carries an export-recipe table

#### Scenario: The composition block hands over to the pause

- **WHEN** the last screen of the composition block is displayed
- **THEN** it is a composition-technique screen, not an « appareil en main » screen
- **AND** the next screen is the pause

## ADDED Requirements

### Requirement: Session 3's pause is a single question break

Session 3's pause block SHALL consist of one repère screen that announces a break and invites
questions, about composition or about anything else, and invites participants to show a
photograph on their screen.

#### Scenario: The pause screen is displayed

- **WHEN** session 3's pause block is displayed
- **THEN** it holds exactly one screen
- **AND** that screen announces the break and invites questions on any subject, composition
  included
- **AND** it invites participants to come and show a photograph on their screen

#### Scenario: The pause screen is read months later

- **WHEN** the pause screen is read outside the room
- **THEN** it does not mention a wall, sticky notes, or the session as the last one together

### Requirement: The beyond-composition block opens on three intentions

Session 3's beyond-composition block SHALL open on a repère screen stating that a well-composed
photograph is not yet a strong photograph, and announcing side by side three intentions,
*captiver*, *faire ressentir* and *faire imaginer*, without explaining them yet.

#### Scenario: The block's opener is displayed

- **WHEN** the first screen of the beyond-composition block is displayed
- **THEN** its statement opposes a well-composed photograph to a photograph that holds the viewer
- **AND** it shows *Captiver*, *Faire ressentir* and *Faire imaginer* side by side, in that order

#### Scenario: The opener does not call everything storytelling

- **WHEN** the opener is read
- **THEN** it presents telling a story as one intention among three, under *Faire imaginer*
- **AND** it does not use the word « storytelling »

### Requirement: Each intention has one screen of tools in columns

After its opener, the beyond-composition block SHALL present one concept panel per intention, in
the opener's order. Each panel SHALL be titled by the intention and present two or three tools as
side-by-side columns, each with its name, one short sentence and a photograph or its
specification.

#### Scenario: The tool screens are read in order

- **WHEN** the block's concept panels are displayed in sequence
- **THEN** *Captiver* presents tension and relationships between elements
- **AND** *Faire ressentir* presents two or three contrasting emotions, each with the visual
  choices that support it
- **AND** *Faire imaginer* presents what the photograph withholds and what happens before or
  after the moment

#### Scenario: The emotion screen warns against formulas

- **WHEN** the *Faire ressentir* panel is displayed
- **THEN** a callout states that these choices are not formulas, for example that a dark
  photograph is not necessarily sad

#### Scenario: A tool screen is projected or read on a phone

- **WHEN** a tool screen is displayed at 1024 × 768 or 16:9
- **THEN** its columns are visible side by side, each with its photograph or specification, and
  nothing is cut off
- **AND** at phone width the columns stack into one without horizontal scrolling

### Requirement: The beyond-composition block is an introduction

The beyond-composition block SHALL hold fewer screens than the composition block, and SHALL NOT
include an « appareil en main » screen or an activity screen.

#### Scenario: The block's length is compared with composition

- **WHEN** the screens of both blocks are counted
- **THEN** the beyond-composition block has fewer screens than the composition block
- **AND** none of its screens is an « appareil en main » or an activity screen

### Requirement: The beyond-composition block ends on the photographer's intention

The beyond-composition block SHALL end on a transition screen asking participants, before asking
how to compose a photograph, to ask themselves why they want to take it. The block that follows
SHALL be the animateur's experience block.

#### Scenario: The block's last screen is displayed

- **WHEN** the last screen of the beyond-composition block is displayed
- **THEN** it states « Avant de vous demander comment composer votre photo, demandez-vous pourquoi
  vous voulez la prendre. »
- **AND** it addresses the participants with « vous »
- **AND** the next block is the animateur's experience block

### Requirement: The beyond-composition block shows only public-domain photographs

The beyond-composition block's photographs SHALL be archival photographs in the public domain or
the club's own photographs. A protected photographer's work MAY be named and linked in an aside,
and SHALL NOT be shown.

#### Scenario: A reader looks for Cartier-Bresson's « instant décisif »

- **WHEN** the block mentions a photograph by a protected photographer
- **THEN** the photographer and the photograph are named, and a link MAY lead to it
- **AND** no image of that photograph is shown on the site

## REMOVED Requirements

### Requirement: Composition is practised without touching a setting

**Reason**: The hands-on exercise at the end of the composition block (`cinq-fois-le-meme-objet`)
is replaced by a question break before the beyond-composition block, which needs the room rested
more than a further exercise.

**Migration**: None in the lesson. Participants practise composition after the session; the
monthly challenge in « Et maintenant ? » remains the place to propose such an exercise.
