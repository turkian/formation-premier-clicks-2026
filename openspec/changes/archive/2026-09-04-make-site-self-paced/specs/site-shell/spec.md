## MODIFIED Requirements

### Requirement: Home hub reaches all content

The site SHALL provide a single home page from which every lesson, the lexique, and every
printable reference sheet is reachable in one click, plus the course description aimed at
prospective club members.

#### Scenario: Animator opens the site before a session

- **WHEN** the animator loads the site root
- **THEN** the three lessons, the lexique, and the reference sheet index are each reachable by one link
- **AND** the three lessons are presented as peers, none marked current, dated, or otherwise privileged

#### Scenario: Participant arrives from a printed handout

- **WHEN** a participant loads the site root on a phone
- **THEN** the hub is readable and navigable at phone width without horizontal scrolling
- **AND** the lexique and reference sections are reachable without entering a lesson

#### Scenario: A session card describes its lesson

- **WHEN** a lesson's card is displayed on the hub
- **THEN** it identifies the lesson by its ordinal and its subject
- **AND** it carries no date, schedule, or claim about which session is next

## ADDED Requirements

### Requirement: Site copy is true whenever it is read

All rendered copy SHALL be true regardless of when it is read. Copy SHALL refer to a session by
its ordinal (« la séance 2 ») and SHALL NOT locate a session by a clock, a date, or a moment
relative to the reader (« ce soir », « cette soirée », « la prochaine séance »). The site SHALL
NOT compute, derive, or assert which session is current, imminent, or past.

This rule governs all rendered text, in the same way the French-Québec typographic conventions
do: lesson screens, lexique brand sheets, reference sheets, and page templates alike.

#### Scenario: A participant reads a lesson months after the formation

- **WHEN** a participant opens any lesson screen at an arbitrary later date
- **THEN** every statement on the screen is still accurate
- **AND** no statement depends on the reader being in a room on a particular evening

#### Scenario: Copy refers to another session

- **WHEN** copy needs to point at material covered in a different session
- **THEN** it names that session by ordinal
- **AND** it does not describe that session as next, previous, or upcoming

#### Scenario: A word carries a meaning unrelated to a session

- **WHEN** copy uses « soirée » in a sense unrelated to a formation session — a party
  photographed in low light, or the club's « soirée critique » event
- **THEN** that wording is preserved unchanged
- **AND** the ordinal rule does not apply to it

#### Scenario: A screen describes the physical room

- **WHEN** a screen exists to stage a group session — a break, a written-question wall, a live
  question period
- **THEN** the screen remains part of the lesson, because sessions may still be run as a group
- **AND** only its references to a session are corrected, not its description of the room

### Requirement: The site states its offline behavior rather than instructing a deadline

Where the site tells participants about working without network access, it SHALL describe what
the site does, not instruct the reader to act before a scheduled event.

#### Scenario: A participant learns the site works offline

- **WHEN** copy explains that the site remains available without network access
- **THEN** it states the condition under which that is true
- **AND** it does not condition the instruction on an upcoming session the reader may not attend
