## RENAMED Requirements

- FROM: `### Requirement: Session 3's pause is a single question break`
- TO: `### Requirement: Session 3's pause is a single timed break`

## MODIFIED Requirements

### Requirement: Session 3's pause is a single timed break

Session 3's pause block SHALL be titled « Pause » and SHALL consist of one repère screen whose
claim is « On prend une pause de 5 minutes. », with no body and no aside, and which carries a
five-minute countdown timer.

#### Scenario: The pause screen is displayed

- **WHEN** session 3's pause block is displayed
- **THEN** it holds exactly one screen
- **AND** that screen shows the « Pause » label, the claim « On prend une pause de 5 minutes. »
  and a timer reading `5:00`, stopped
- **AND** it shows no other text

#### Scenario: The block is listed in the lesson

- **WHEN** session 3's blocks are listed or the pause screen's header is displayed
- **THEN** the block is named « Pause », without « questions »

#### Scenario: The pause screen is read months later

- **WHEN** the pause screen is read outside the room
- **THEN** it does not mention a wall, sticky notes, or the session as the last one together

### Requirement: Session 3 answers how to make better photographs

Session 3 SHALL be titled « Composer, puis progresser », with the thread « Apprendre à voir →
composer → aller au-delà → progresser ». It SHALL state its question as « comment faire de
meilleures photos ? » and SHALL present, in this order: the recap of session 2, the history of
composition rules, composition, the pause, beyond composition, and the shared experience block,
which ends the session.

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

## ADDED Requirements

### Requirement: A repère screen can carry a countdown timer

A repère screen MAY declare a duration in whole minutes. It SHALL then show, under its claim, a
countdown in `m:ss` form, large enough to read from the back of the room, which the animateur
starts, pauses, resumes and resets with the mouse. A repère screen that declares no duration
SHALL show no timer and load no timer script.

#### Scenario: The screen opens

- **WHEN** a repère screen declaring 5 minutes is displayed for the first time in a browser tab
- **THEN** its timer reads `5:00` and is stopped
- **AND** it looks visibly different from a running timer

#### Scenario: The animateur starts, pauses and resumes the timer

- **WHEN** the stopped timer is clicked
- **THEN** it counts down one second at a time
- **WHEN** the running timer is clicked
- **THEN** it stops on the remaining time and shows that it is paused
- **WHEN** the paused timer is clicked
- **THEN** it resumes from the remaining time

#### Scenario: The animateur resets the timer

- **WHEN** the timer is double-clicked, whatever its state
- **THEN** it reads the full duration again and is stopped
- **AND** the double-click does not leave the timer running or paused

#### Scenario: Time runs out

- **WHEN** the countdown reaches zero
- **THEN** the timer reads `0:00` and stays there
- **AND** it changes appearance to show that the break is over
- **AND** no sound is played

#### Scenario: The animateur leaves the screen during the break

- **WHEN** the timer is running and the animateur moves to another screen, then comes back in the
  same browser tab
- **THEN** the timer shows the time that actually remains and is still running
- **AND** a paused or finished timer is likewise found paused or finished

#### Scenario: The browser tab is in the background

- **WHEN** the running timer's tab is hidden for a while, then shown again
- **THEN** the timer shows the time that actually remains, not a count delayed by the hidden time

#### Scenario: Keyboard navigation near the timer

- **WHEN** the timer has been clicked and the animateur presses Space or an arrow key
- **THEN** the presentation changes screen as on any other screen
- **AND** the timer's state is kept for when the animateur comes back

#### Scenario: The timer is read by a screen reader

- **WHEN** the timer is reached with a screen reader
- **THEN** it is announced as a button whose label says the remaining time and what a click will do
- **AND** the remaining time is not announced every second
