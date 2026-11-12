## MODIFIED Requirements

### Requirement: Session 3 answers how to make better photographs

Session 3 SHALL be titled « Composer, puis progresser », with the thread « Apprendre à voir →
composer → aller au-delà → progresser ». It SHALL state its question as « comment faire de
meilleures photos ? » and SHALL present, in this order: the recap of session 2, the history of
composition rules, composition, the pause and questions, beyond composition, and the shared
experience block, which ends the session.

#### Scenario: A participant opens session 3

- **WHEN** session 3's lesson is opened
- **THEN** its title is « Composer, puis progresser » and its question is « comment faire de
  meilleures photos ? »
- **AND** its blocks appear in the order above
- **AND** no block follows the experience block

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

### Requirement: The beyond-composition block ends on the photographer's intention

The beyond-composition block SHALL end on a transition screen asking participants, before asking
how to compose a photograph, to ask themselves why they want to take it. The block that follows
SHALL be the experience block.

#### Scenario: The block's last screen is displayed

- **WHEN** the last screen of the beyond-composition block is displayed
- **THEN** it states « Avant de vous demander comment composer votre photo, demandez-vous pourquoi
  vous voulez la prendre. »
- **AND** it addresses the participants with « vous »
- **AND** the next block is the experience block

## ADDED Requirements

### Requirement: The experience block is shared with the club's photographers

Session 3's experience block SHALL be titled « Ce que la pratique nous apprend ». Its opener SHALL
state that the animateur speaks first and that photographers from the club then share their own
practice. The block SHALL stay true for a reader months later and SHALL NOT name the guest
photographers.

#### Scenario: A reader opens the experience block months later

- **WHEN** the experience block is read outside the room
- **THEN** the reader can tell that the animateur's screen is Jean-Pierre Bluteau's and that the
  discussion involved photographers from the club
- **AND** no screen refers to the current session by a moment relative to the reader
- **AND** no screen names a guest photographer

#### Scenario: A first-person screen is checked against the address rule

- **WHEN** an experience screen is written in the animateur's voice
- **THEN** it speaks to the participants and gives them something to do or consider
- **AND** it does not address the animateur

### Requirement: The experience block goes from intention to an open discussion

After its opener, the experience block SHALL present exactly two screens: « Pourquoi, et pour qui »,
stating that you must like your pictures first, then a closing discussion screen titled
« Progresser, et continuer d'aimer ça ». The discussion screen SHALL be session 3's last screen.

#### Scenario: The experience block is read in order

- **WHEN** the experience block's screens are displayed in sequence
- **THEN** the opener comes first, « Pourquoi, et pour qui » second and the discussion screen last
- **AND** « Pourquoi, et pour qui » states « Aimez vos photos d'abord. Puis demandez-vous pour qui
  vous les faites. »

#### Scenario: The discussion screen stays up during the discussion

- **WHEN** the discussion screen is displayed
- **THEN** its statement asks how one becomes a better photographer without losing the pleasure
- **AND** its body says that photographers from the club tell how they got there, and lists
  questions aimed at them: what made them progress most, which moment took them past a threshold,
  what they wish they had known at the start, and what brings them back when the desire fades
- **AND** it carries no aside

#### Scenario: A participant looks for RAW, a workflow or printing in session 3

- **WHEN** session 3 is read from start to end
- **THEN** no screen teaches RAW, the animateur's workflow, printing or exhibiting
- **AND** no screen shows the club's logistics: outings, parrains, workshops or a closing show of
  hands

## REMOVED Requirements

### Requirement: The experience block is the animateur's testimony

**Reason**: The block is now shared: the animateur opens it, then photographers from the club share
their practice in an open discussion. It is no longer illustrated by the animateur's photographs.

**Migration**: Replaced by « The experience block is shared with the club's photographers », which
keeps the address rule and the « read months later » rule.

### Requirement: The experience block goes from intention to showing your work

**Reason**: RAW, the animateur's workflow and tips, printing and the exhibition montage are removed
so the session can end on the discussion with the club's photographers.

**Migration**: Replaced by « The experience block goes from intention to an open discussion ». Each
brand sheet still gives its RAW extension and setting.
