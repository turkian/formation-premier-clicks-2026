# practice-exercises Specification

## Purpose

A set of per-session pages offering several short, self-directed practice prompts tied to that
session's concepts, meant to be browsed independently on a phone after the session, without a
projector and without a fixed order to follow.

## Requirements

### Requirement: One exercise page per session, reachable independently of the lesson

The site SHALL provide one practice-exercise page per session, distinct from that session's
projected lesson, listing several short self-directed prompts tied to that session's concepts.

#### Scenario: Participant opens a session's exercises weeks later

- **WHEN** a participant opens a session's exercise page without having opened that session's
  lesson in the same visit
- **THEN** the page's prompts are understandable on their own, without requiring the lesson to be
  open alongside it

#### Scenario: A session's exercise set is added without touching another session's

- **WHEN** the club adds the exercise page for a session
- **THEN** no other session's exercise page or lesson requires any edit

### Requirement: Each exercise is phrased for either a phone or a camera

Every exercise prompt SHALL be phrased so a participant can attempt it with either a phone or a
camera. Where a phone cannot perform a step a camera can — such as choosing the aperture
directly — the exercise SHALL carry a short note stating that limitation and what to do instead.

#### Scenario: An exercise depends on a control a phone lacks

- **WHEN** an exercise's prompt depends on a setting a phone does not expose directly, such as
  the aperture
- **THEN** the exercise carries a note naming the limitation and the phone-appropriate alternative
- **AND** the prompt itself makes no assumption about which kind of device the participant is
  using

#### Scenario: An exercise needs no device-specific note

- **WHEN** an exercise's prompt requires no control unavailable on a phone
- **THEN** the exercise carries no device-specific note

### Requirement: Exercises are self-directed, not sequenced or scored

The exercise pages SHALL present each session's prompts as an unordered set a participant may
attempt in any order, any number of times, with no submission, scoring, or completion tracking.

#### Scenario: A participant revisits an exercise

- **WHEN** a participant returns to an exercise they already attempted
- **THEN** the page shows the same prompt, with no record of a prior attempt or completion

#### Scenario: A participant skips prompts

- **WHEN** a participant attempts only some of a session's prompts
- **THEN** nothing on the page indicates an expected order or a required minimum

### Requirement: Exercise pages read on a phone screen, not on paper

Practice-exercise pages SHALL be designed for on-screen reading and SHALL NOT carry a print
layout, unlike the printable reference sheets.

#### Scenario: A participant opens an exercise page on a phone

- **WHEN** a participant opens a session's exercise page on a phone-width screen
- **THEN** the page is readable and navigable without horizontal scrolling

#### Scenario: A participant prints an exercise page

- **WHEN** a participant prints a session's exercise page
- **THEN** the page makes no claim of fitting a single sheet and carries no print-specific layout
  controls
