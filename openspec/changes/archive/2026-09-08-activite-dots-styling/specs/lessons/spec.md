## MODIFIED Requirements

### Requirement: A repère screen can hand the room a participant exercise

A block MAY include a repère screen with variante `activite`, carrying the instructions for a
participant exercise to run immediately, separate from the block's opening screen. An `activite`
screen SHALL carry its own on-screen label, distinct from a block opener's "Bloc N sur M"
indicator, so the room can tell the two apart at a glance. Where its instructions form a numbered
sequence of steps, an `activite` screen SHALL present them with the same recognizable,
at-a-glance numbered-step presentation used by « appareil en main » screens.

#### Scenario: The icebreaker is separated from the block's framing

- **WHEN** a block's opening screen states the block's framing and a participant exercise follows
  it
- **THEN** the exercise is presented on its own repère screen with variante `activite`
- **AND** that screen is not labelled as the block's opening

#### Scenario: An activity screen is identified at a glance

- **WHEN** a repère screen with variante `activite` is displayed
- **THEN** its on-screen label reads as an exercise, not as "Bloc N sur M"

#### Scenario: Activity steps read like a hands-on moment

- **WHEN** a repère screen with variante `activite` presents a numbered sequence of steps
- **THEN** each step is presented with the same recognizable numbered-step presentation as an
  « appareil en main » screen's instructions
- **AND** a participant can tell at a glance that these are steps to follow right now
