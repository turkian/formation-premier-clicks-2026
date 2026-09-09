## ADDED Requirements

### Requirement: A pause block can hand questions to tables instead of a shared wall
A repère screen with variante `pause` MAY instruct participants to write questions on a
sheet at their own table instead of directing them to a shared wall-mounted sheet or
sticky notes. When it does, it SHALL NOT reference a shared wall or sticky notes as the
place to record a question.

#### Scenario: Session 1 pause screen is displayed
- **WHEN** the session 1 pause screen (`la-pause`) is displayed
- **THEN** it instructs participants to write questions on the sheet at their own table
- **AND** it does not mention a wall-mounted sheet or sticky notes

### Requirement: A questions block can resolve table questions in the room before the animateur does
A repère screen with variante `questions` that follows a pause block routing questions
through tables SHALL frame the block as a room-wide catch for whatever a table could not
answer among itself, and SHALL make clear that any participant, not only the animateur,
may answer a question raised this way. It SHALL NOT promise that a question left
unanswered will be taken up at a later session.

#### Scenario: Session 1 "vos questions" screen is displayed
- **WHEN** the session 1 "vos questions" screen (`vos-questions`) is displayed
- **THEN** it states that tables have already tried to answer their own questions
- **AND** it invites the room, not only the animateur, to answer whatever remains
- **AND** it does not reference a wall, sticky notes, or an animateur reading questions
  aloud
- **AND** it does not state or imply that an unresolved question will be answered at the
  next session
