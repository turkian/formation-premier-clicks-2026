## Purpose

The three lessons as they are delivered in the room: a small number of dense, self-sufficient
screens the animator holds on the projector while conversing with the participants, navigable
from the keyboard, and readable afterwards on a phone.

## ADDED Requirements

### Requirement: One lesson per session, organized by pedagogical block

The site SHALL provide three lessons corresponding to the three sessions, each divided into the
blocks of its run-of-show, in the same order.

#### Scenario: Animator follows the evening's plan

- **WHEN** the animator opens a lesson
- **THEN** the lesson's blocks appear in the order of that session's run-of-show
- **AND** each block's screens are grouped under that block

### Requirement: A screen is the unit, and a block is a small number of screens

Each lesson SHALL be composed of screens, each of which is one of five kinds: concept panel,
demonstration, interactive, repère, or « appareil en main ». A concept panel MUST be
self-sufficient — a participant who reads only that screen understands the concept it introduces.
A lesson SHALL contain approximately eighteen screens and MUST NOT be authored as one idea per
screen.

#### Scenario: A concept panel is held on screen while the animator talks

- **WHEN** a concept panel is displayed
- **THEN** it carries a headline claim stated as a complete sentence, a structured body, and
  optionally a diagram
- **AND** it remains complete and legible without the animator's commentary
- **AND** it requires no navigation for several minutes of discussion

#### Scenario: A participant arrives in the middle of a block

- **WHEN** a participant joins while a concept panel is displayed
- **THEN** the displayed screen alone is sufficient to identify the concept under discussion

### Requirement: Demonstrations are separate screens from concept panels

Demonstration photographs SHALL be placed on their own screens, not inside concept panels, so
that both keep full usable space. Diagrams MAY appear inside a concept panel.

#### Scenario: A comparison series is shown

- **WHEN** a demonstration screen presents a comparison series
- **THEN** the photographs occupy the screen's usable space
- **AND** a caption names the single variable that changed between them
- **AND** no concept panel body text competes for that space

### Requirement: Panels that must withhold an answer accumulate in place

A concept panel MAY be authored with ordered states. Advancing a state SHALL add content to the
same screen while everything already shown remains visible, and MUST NOT remove or replace prior
content. At its final state the panel SHALL be the complete explanation of its block.

#### Scenario: The aperture vote is put to the room

- **WHEN** the aperture panel is at its first state
- **THEN** the question « entre f/2.4 et f/22, lequel laisse passer le plus de lumière ? » is shown
- **AND** the answer, the explanation, and the rule are not present anywhere on screen

#### Scenario: The animator reveals the answer

- **WHEN** the animator advances to the next state
- **THEN** the answer and the face-saving statement appear on the same screen
- **AND** the question and the vote instruction remain visible

#### Scenario: The block ends

- **WHEN** an accumulating panel reaches its final state
- **THEN** the screen shows the question, the answer, the explanation, and the takeaway together
- **AND** that final state serves as the block's written summary for later review

### Requirement: Room-facing stage directions are shown, not hidden

The lessons SHALL NOT provide presenter notes, a notes pane, or any animator-only side channel.
Stage directions from the source scripts that concern the room SHALL be rendered as on-screen
text; stage directions that concern only the animator's own pacing or preparation SHALL be
omitted from the site.

#### Scenario: A hands-up vote is requested

- **WHEN** a screen puts a question to the room that the source script asks to be voted by raised hands
- **THEN** the screen states that the vote is by raised hands and that no one will be named

#### Scenario: A screen is authored from a run-of-show block

- **WHEN** a block's source text contains timings, staffing, or preparation instructions
- **THEN** none of it appears on any lesson screen

### Requirement: Lesson text addresses the participants

All lesson screen copy SHALL address the participants directly, never the animator.

#### Scenario: Source text addresses the animator

- **WHEN** source text is written to the animator (for example « fais voter », « ne t'attarde pas »)
- **THEN** the rendered screen either states the equivalent instruction to the participants or omits it
- **AND** no screen addresses a reader who is not a participant

### Requirement: Keyboard navigation, block index, and position indicator

A lesson SHALL be navigable entirely from the keyboard: forward and backward through screens and
panel states, into fullscreen, and into an index of the lesson's blocks that allows jumping
directly to any block. The current block and the lesson's total number of blocks SHALL be visible
on every screen.

#### Scenario: The animator advances through a block

- **WHEN** the animator presses the forward key on a panel with remaining states
- **THEN** the panel advances to its next state rather than to the next screen

#### Scenario: The animator is running late

- **WHEN** the animator opens the block index
- **THEN** every block of the lesson is listed and selectable
- **AND** selecting one moves directly to that block's first screen

#### Scenario: The animator paces the evening without notes

- **WHEN** any lesson screen is displayed
- **THEN** the current block's position within the lesson is readable on screen

### Requirement: Every screen has a stable deep link

Each screen SHALL have its own address that restores that screen, including its panel state.

#### Scenario: A link to a screen is opened

- **WHEN** a screen's address is opened directly
- **THEN** that screen is displayed at the referenced state
- **AND** navigation forward and backward continues from there

### Requirement: Screens are rendered for both projection and phone

A concept panel SHALL be authored as four named regions — the claim, the body, the diagram, and
the aside — and SHALL be rendered in a wide arrangement for projection and a single-column
arrangement for phone width. Content MUST be identical between the two arrangements.

#### Scenario: A panel is projected

- **WHEN** a concept panel is displayed at projection width
- **THEN** its regions are laid out so the body and the diagram are visible together
- **AND** no content required by the block is cut off or pushed out of view

#### Scenario: A panel is read on a phone

- **WHEN** the same concept panel is opened at phone width
- **THEN** its regions are stacked in a single column with the diagram preceding the body
- **AND** all four regions' content is present and readable without horizontal scrolling

#### Scenario: The projector's aspect ratio is not 16:9

- **WHEN** a lesson is projected on a 4:3 display
- **THEN** every screen's content remains fully visible

### Requirement: Phone handoff is offered only where phone use helps

A screen SHALL display a scannable code linking to its own address only when it is a block opener
or an « appareil en main » screen. Concept, demonstration, and interactive screens SHALL NOT
display one.

#### Scenario: Participants are asked to pick up their cameras

- **WHEN** an « appareil en main » screen is displayed
- **THEN** a scannable code to that screen's address is shown
- **AND** the numbered instructions, including the cellulaire and reflex variants, are present on
  the resulting phone page

#### Scenario: A concept panel is under discussion

- **WHEN** a concept panel is displayed
- **THEN** no scannable code is shown on it

### Requirement: « Appareil en main » screens are visually consistent

Every « appareil en main » screen SHALL use the same recognizable presentation across all three
lessons, and SHALL include the cellulaire equivalent of the exercise wherever the source content
provides one.

#### Scenario: The eighth hands-on moment of the formation

- **WHEN** any « appareil en main » screen is displayed
- **THEN** it is recognizable as a hands-on moment from the back of the room without reading its text
- **AND** a participant using a phone as their camera has an exercise to perform
