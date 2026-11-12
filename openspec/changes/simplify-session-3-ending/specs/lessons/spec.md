## MODIFIED Requirements

### Requirement: The experience block is shared with the club's photographers

Session 3's experience block SHALL be titled « Ce que la pratique nous apprend ». Its opener SHALL
state, as its only text, « Prenez ce qui vous sert. Contournez les règles quand c'est
nécessaire. ». The block SHALL stay true for a reader months later and SHALL NOT name the guest
photographers.

#### Scenario: A reader opens the experience block months later

- **WHEN** the experience block is read outside the room
- **THEN** its summary tells the reader that photographers from the club took part
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

### Requirement: The experience block goes from intention to an open discussion

After its opener, the experience block SHALL present exactly two screens: « Pourquoi, et pour qui »,
a repère screen stating only « Aimez vos photos. », then a closing discussion screen titled
« Progresser, et continuer d'aimer ça ». The discussion screen SHALL be session 3's last screen.

#### Scenario: The experience block is read in order

- **WHEN** the experience block's screens are displayed in sequence
- **THEN** the opener comes first, « Pourquoi, et pour qui » second and the discussion screen last
- **AND** « Pourquoi, et pour qui » shows the label « On enchaîne » and the claim « Aimez vos
  photos. », with no body, no columns and no aside
- **AND** the label « Pour finir » appears only on the discussion screen

#### Scenario: The discussion screen stays up during the discussion

- **WHEN** the discussion screen is displayed
- **THEN** its statement asks how one becomes a better photographer without losing the pleasure
- **AND** its body is a list of questions aimed at the club's photographers: what made them
  progress most, which moment took them past a threshold, what they wish they had known at the
  start, and what brings them back when the desire fades
- **AND** no sentence precedes that list
- **AND** it carries no aside

#### Scenario: A participant looks for RAW, a workflow or printing in session 3

- **WHEN** session 3 is read from start to end
- **THEN** no screen teaches RAW, the animateur's workflow, printing or exhibiting
- **AND** no screen shows the club's logistics: outings, parrains, workshops or a closing show of
  hands

## ADDED Requirements

### Requirement: A title-only repère screen is centered

A repère screen that carries only its label and its claim, with no body, columns, terms or aside,
SHALL be centered on the screen both vertically and horizontally, with its label and its claim
each centered line by line. A repère screen with any other content SHALL keep its left-aligned
layout.

#### Scenario: A title-only repère is projected

- **WHEN** a repère screen with only a label and a claim is displayed at projection width, in 16:9
  or in 4:3
- **THEN** its label and claim sit in the middle of the screen, vertically and horizontally
- **AND** each line of the claim is centered
- **AND** the claim keeps the large size of a repère without a body

#### Scenario: A repère with a body is projected

- **WHEN** a repère screen with a body, columns, terms or an aside is displayed
- **THEN** its label, claim and content are left-aligned, as before this change

#### Scenario: A title-only repère is read on a phone

- **WHEN** a title-only repère screen is displayed at phone width
- **THEN** its label and claim stay centered and fit the width without horizontal scrolling
