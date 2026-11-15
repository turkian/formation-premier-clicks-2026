## RENAMED Requirements

- FROM: `### Requirement: The experience block goes from intention to an open discussion`
- TO: `### Requirement: The experience block goes from an open discussion to a last word`

## MODIFIED Requirements

### Requirement: The experience block is shared with the club's photographers

Session 3's experience block SHALL be titled « Ce que la pratique nous apprend ». Its opener SHALL
state, as its only text, « Prenez ce qui vous sert. Contournez les règles quand c'est
nécessaire. ». The block SHALL stay true for a reader months later and SHALL NOT name the guest
photographers.

#### Scenario: A reader opens the experience block months later

- **WHEN** the experience block is read outside the room
- **THEN** its summary reads « Progresser sans perdre le plaisir. »
- **AND** no screen refers to the current session by a moment relative to the reader
- **AND** no screen names a guest photographer

#### Scenario: The opener is displayed

- **WHEN** the experience block's opener is displayed
- **THEN** it shows its block label and the claim « Prenez ce qui vous sert. Contournez les règles
  quand c'est nécessaire. »
- **AND** it carries no body, no columns and no aside

#### Scenario: A first-person screen is checked against the address rule

- **WHEN** an experience screen is written in the animateur's voice
- **THEN** it speaks to the participants and gives them something to do or consider
- **AND** it does not address the animateur

### Requirement: The experience block goes from an open discussion to a last word

After its opener, the experience block SHALL present exactly two screens: a discussion screen titled
« Progresser, et continuer d'aimer ça », then « Le mot de la fin », a repère screen stating only
« Aimez vos photos. ». « Le mot de la fin » SHALL be session 3's last screen.

#### Scenario: The experience block is read in order

- **WHEN** the experience block's screens are displayed in sequence
- **THEN** the opener comes first, the discussion screen second and « Le mot de la fin » last
- **AND** the discussion screen shows the label « On enchaîne »
- **AND** « Le mot de la fin » shows the label « Pour finir » and the claim « Aimez vos photos. »,
  with no body, no columns and no aside
- **AND** the label « Pour finir » appears only on « Le mot de la fin »

#### Scenario: The discussion screen stays up during the discussion

- **WHEN** the discussion screen is displayed
- **THEN** its statement asks how one becomes a better photographer without losing the pleasure
- **AND** its body is a list of questions aimed at the club's photographers: what made them
  progress most, which moment took them past a threshold, what they wish they had known at the
  start, and what brings them back when the desire fades
- **AND** no sentence precedes that list
- **AND** it carries no aside

#### Scenario: The session ends on the last word

- **WHEN** the animateur advances past the discussion screen
- **THEN** « Aimez vos photos. » is displayed alone, centered, as the last screen of session 3
- **AND** the next arrow appears faded and does not act as a link

#### Scenario: A participant looks for RAW, a workflow or printing in session 3

- **WHEN** session 3 is read from start to end
- **THEN** no screen teaches RAW, the animateur's workflow, printing or exhibiting
- **AND** no screen shows the club's logistics: outings, parrains, workshops or a closing show of
  hands
