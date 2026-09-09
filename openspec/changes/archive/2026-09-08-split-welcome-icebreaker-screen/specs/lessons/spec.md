## ADDED Requirements

### Requirement: A repère screen can hand the room a participant exercise

A block MAY include a repère screen with variante `activite`, carrying the instructions for a
participant exercise to run immediately, separate from the block's opening screen. An `activite`
screen SHALL carry its own on-screen label, distinct from a block opener's "Bloc N sur M"
indicator, so the room can tell the two apart at a glance.

#### Scenario: The icebreaker is separated from the block's framing

- **WHEN** a block's opening screen states the block's framing and a participant exercise follows
  it
- **THEN** the exercise is presented on its own repère screen with variante `activite`
- **AND** that screen is not labelled as the block's opening

#### Scenario: An activity screen is identified at a glance

- **WHEN** a repère screen with variante `activite` is displayed
- **THEN** its on-screen label reads as an exercise, not as "Bloc N sur M"

## MODIFIED Requirements

### Requirement: Phone handoff is offered only where phone use helps

A screen SHALL display a scannable code linking to its own address only when it is a block
opener, an « appareil en main » screen, or a repère screen with variante `activite`. Concept,
demonstration, and interactive screens SHALL NOT display one.

#### Scenario: Participants are asked to pick up their cameras

- **WHEN** an « appareil en main » screen is displayed
- **THEN** a scannable code to that screen's address is shown
- **AND** the numbered instructions, including the cellulaire and reflex variants, are present on
  the resulting phone page

#### Scenario: Participants are asked to run an exercise at their table

- **WHEN** a repère screen with variante `activite` is displayed
- **THEN** a scannable code to that screen's address is shown
- **AND** the exercise's instructions are present on the resulting phone page

#### Scenario: A concept panel is under discussion

- **WHEN** a concept panel is displayed
- **THEN** no scannable code is shown on it
