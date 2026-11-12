# lessons Specification

## Purpose
The three lessons as they are delivered in the room: a small number of dense, self-sufficient
screens the animator holds on the projector while conversing with the participants, navigable
from the keyboard, and readable afterwards on a phone.
## Requirements
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

### Requirement: Demonstrations are separate screens from concept panels

Demonstration photographs SHALL be placed on their own screens, not inside concept panels, so
that both keep full usable space. Diagrams MAY appear inside a concept panel. A diagram MAY
include images derived from a single photograph to illustrate one variable it explains — for
example, the same frame rendered at the exposure each aperture admits — provided the diagram
states that the images are a simulation. A comparison of separately taken photographs remains a
demonstration screen. A concept panel MAY carry one archival document — a book page or an
engraving — as an illustration beside its body, when the body states what that document says;
the illustration is not a demonstration photograph.

#### Scenario: A comparison series is shown

- **WHEN** a demonstration screen presents a comparison series
- **THEN** the photographs occupy the screen's usable space
- **AND** a caption names the single variable that changed between them
- **AND** no concept panel body text competes for that space

#### Scenario: A diagram simulates a variable from one photograph

- **WHEN** a concept panel's diagram shows images derived from one photograph
- **THEN** the diagram or its caption says that the images are a simulation
- **AND** only the variable the diagram explains differs between the images

#### Scenario: A concept panel carries an archival illustration

- **WHEN** a concept panel declares an archival illustration and is displayed in projection
- **THEN** the illustration occupies the left column and the body the right column, both under
  the statement
- **AND** the illustration shows its caption and its credit, and can be enlarged to its full frame
- **AND** the panel carries no diagram alongside it

#### Scenario: An illustrated panel fits a 4:3 projector

- **WHEN** a concept panel with an archival illustration is displayed at 1024 × 768
- **THEN** the statement, the illustration, the whole body and the aside are visible without
  scrolling
- **AND** the body stays clearly above the aside type size

#### Scenario: An illustrated panel is read on a phone or printed

- **WHEN** a concept panel with an archival illustration is displayed on a phone or printed
- **THEN** the statement, the illustration, the body and the aside appear in a single column, in
  that order

#### Scenario: A panel without an illustration

- **WHEN** a concept panel declares no illustration
- **THEN** it is laid out exactly as before

### Requirement: A demonstration screen shows at most three photographs

A demonstration screen SHALL NOT display more than three photographs at once, counted across
every comparison series and every free (non-series) image declared on that screen. A block whose
demonstration content exceeds three photographs SHALL be authored as multiple sibling
demonstration screens within the same block instead, each carrying its own claim, so that no
single screen crowds its photographs below a legible size.

#### Scenario: A block needs four comparison photographs

- **WHEN** a block's demonstration content is authored with four or more photographs across its
  series and free images
- **THEN** that content is split across two or more demonstration screens, each with three or
  fewer photographs
- **AND** each resulting screen carries its own claim

#### Scenario: A single comparison series itself has more than three images

- **WHEN** one comparison series alone declares more than three images
- **THEN** that series is split across two or more demonstration screens, each with three or
  fewer images from that series
- **AND** each resulting screen's claim and caption still identify the single variable the
  series compares

#### Scenario: A build is produced with an oversized demonstration screen

- **WHEN** a demonstration screen is authored with more than three photographs across its series
  and free images
- **THEN** the content verification SHALL fail the build and identify that screen

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

### Requirement: A static concept panel can carry one highlighted callout

A concept panel with no ordered states (a static panel) MAY carry exactly one highlighted
callout, distinct from its ordinary body text. The callout SHALL be visually set apart (a
bounded box with a tone-appropriate color and a small icon) and SHALL render after the
panel's ordinary body text. Using this callout SHALL NOT turn the panel into an
accumulating, click-through panel: a static panel with a callout SHALL still present all
of its content on first view, with nothing withheld behind an advance.

#### Scenario: A static panel highlights its pivot

- **WHEN** a static concept panel defines a callout with a tone and an icon
- **THEN** the callout is rendered as a bounded, tone-colored box with that icon
- **AND** the callout appears after the panel's ordinary body text
- **AND** the full panel, including the callout, is visible without advancing any state

#### Scenario: The callout stays legible offline and from a local copy

- **WHEN** the lesson is opened with no network, or from the `file://` local copy
- **THEN** the callout's icon renders identically to the online, projected version
- **AND** no request for the icon is made over the network

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

### Requirement: Keyboard navigation and position indicator

A lesson SHALL be navigable entirely from the keyboard: forward and backward through screens and
panel states, and into fullscreen. The current block and the lesson's total number of blocks SHALL
be visible on every screen.

#### Scenario: The animator advances through a block

- **WHEN** the animator presses the forward key on a panel with remaining states
- **THEN** the panel advances to its next state rather than to the next screen

#### Scenario: The animator paces the evening without notes

- **WHEN** any lesson screen is displayed
- **THEN** the current block's position within the lesson is readable on screen

### Requirement: Toolbar controls each have one direct, unambiguous target

A lesson screen's toolbar SHALL present exactly three controls: a fullscreen toggle, a control
that returns to that lesson's first screen, and a control that leaves to the site root. Clicking
or tapping the slide anywhere outside these three controls SHALL NOT change the fullscreen state
or navigate away from the current screen.

#### Scenario: The fullscreen control is used

- **WHEN** the animator activates the toolbar's fullscreen control, by click or by keyboard
- **THEN** the browser enters fullscreen if it was not already in fullscreen, or exits fullscreen
  if it was
- **AND** no other control and no click elsewhere on the slide triggers this behavior

#### Scenario: The animator restarts the lesson

- **WHEN** the animator activates the toolbar's start-of-lesson control
- **THEN** the lesson's first screen — the first screen of its first block — is displayed

#### Scenario: The animator leaves the lesson

- **WHEN** the animator activates the toolbar's home control
- **THEN** the site root is displayed

#### Scenario: The slide is clicked away from the toolbar

- **WHEN** a participant or the animator clicks anywhere on the slide body, outside the toolbar's
  three controls
- **THEN** no navigation occurs
- **AND** the fullscreen state is unchanged

### Requirement: A lesson is entered at any point

A lesson that is ready to publish SHALL have its summary present every block and every screen
of that lesson as a direct link, and SHALL NOT offer a privileged entry control that starts the
lesson at its first screen ahead of that list. Participants choose where to enter; the site
does not choose for them. Within a block, its screens SHALL be listed in a single column, top
to bottom, at every viewport width. A lesson that is not yet ready to publish is governed
instead by the "Publication readiness gates a lesson's route" requirement.

#### Scenario: A participant returns for one idea

- **WHEN** a participant opens a ready lesson's summary looking for a single explanation
- **THEN** every block and every screen is listed and directly reachable
- **AND** no « start here » control is presented ahead of that list

#### Scenario: The animator opens a lesson to project it

- **WHEN** the animator opens a ready lesson's summary at the start of a group session
- **THEN** the lesson's first screen is reachable as the first entry of the first block
- **AND** reaching it requires no more interaction than reaching any other screen

#### Scenario: A lesson summary is read on a phone

- **WHEN** a participant opens a ready lesson's summary on a phone
- **THEN** the block and screen list is the primary content of the page

#### Scenario: A lesson summary is displayed on a wide screen

- **WHEN** a ready lesson's summary is displayed on a projector or desktop-width viewport
- **THEN** each block's screens remain listed in a single column, top to bottom
- **AND** the list does not reflow into multiple columns as width increases

### Requirement: Publication readiness gates a lesson's route

A lesson SHALL carry a readiness state: ready, or not yet ready. When a build is produced for
publication, a lesson that is not yet ready SHALL have its summary route render a neutral
notice in place of its blocks and screens, and SHALL NOT have routes generated for its
individual screens. The notice SHALL NOT state or imply when the lesson will be published. A
build produced for publication is any build other than the dev server or the project's offline
working-copy build; on the dev server and on the offline working-copy build, every lesson SHALL
render as ready regardless of its readiness state.

#### Scenario: A published build reaches a not-yet-ready lesson

- **WHEN** a build produced for publication renders the summary route of a lesson marked not
  yet ready
- **THEN** the route displays a neutral work-in-progress notice instead of the lesson's blocks
  and screens
- **AND** the notice makes no claim about when the lesson will be published

#### Scenario: A not-yet-ready lesson has no reachable screens in a published build

- **WHEN** a build produced for publication is generated
- **THEN** no individual screen route exists for a lesson marked not yet ready

#### Scenario: The dev server always shows every lesson

- **WHEN** the site is run from the dev server
- **THEN** every lesson's summary and screens render normally regardless of its readiness state

#### Scenario: The animator's offline working copy always shows every lesson

- **WHEN** the project's offline working-copy build is produced
- **THEN** every lesson's summary and screens render normally regardless of its readiness state

#### Scenario: The home hub is unaffected

- **WHEN** the home hub is displayed in a build produced for publication
- **THEN** a not-yet-ready lesson's entry is presented identically to a ready lesson's entry, as
  a peer link

### Requirement: Every screen has a stable deep link

Each screen SHALL have its own address that restores that screen, including its panel state.

#### Scenario: A link to a screen is opened

- **WHEN** a screen's address is opened directly
- **THEN** that screen is displayed at the referenced state
- **AND** navigation forward and backward continues from there

### Requirement: Screens are rendered for both projection and phone

A concept panel SHALL be authored as four named regions — the claim, the body, the diagram, and
the aside — and SHALL be rendered in a wide arrangement for projection and a single-column
arrangement for phone width. Content MUST be identical between the two arrangements. A panel MAY
instead be stacked — claim, body, then diagram, each across the full width — either because it
asks for it or because it has a diagram and no body; a stacked panel keeps that order at every
width, because its body introduces the diagram.

#### Scenario: A panel is projected

- **WHEN** a concept panel is displayed at projection width
- **THEN** its regions are laid out so the body and the diagram are visible together
- **AND** no content required by the block is cut off or pushed out of view

#### Scenario: A panel is read on a phone

- **WHEN** the same concept panel is opened at phone width
- **THEN** its regions are stacked in a single column with the diagram preceding the body
- **AND** all four regions' content is present and readable without horizontal scrolling

#### Scenario: A stacked panel is displayed

- **WHEN** a stacked concept panel is displayed at any width
- **THEN** its claim, body and diagram appear in that order, each across the full width
- **AND** the diagram is not placed beside the body

#### Scenario: The projector's aspect ratio is not 16:9

- **WHEN** a lesson is projected on a 4:3 display
- **THEN** every screen's content remains fully visible

### Requirement: A concept panel with columns states its claim across the full width

On a concept panel whose body is two or three side-by-side cards, the claim SHALL be allowed to
span the full width the cards occupy at projection width, instead of the short measure used by
concept panels without columns. A claim that fits on one line at that width SHALL be shown on one
line. A longer claim MAY wrap onto two or more lines, each as wide as the cards. Concept panels
without columns SHALL keep their short claim measure.

#### Scenario: A short claim on a panel with columns is projected

- **WHEN** session 3's « Placer » screen is displayed at 16:9 projection width
- **THEN** its claim « Décentré ou centré — franchement. Jamais entre les deux. » appears on a
  single line above the two cards

#### Scenario: A long claim on a panel with columns is projected

- **WHEN** a concept panel with columns whose claim does not fit on one line is displayed at
  projection width
- **THEN** its claim wraps onto lines that extend past the short measure, up to the width of
  the cards
- **AND** nothing on the screen is cut off, at 1024 × 768 or at 16:9

#### Scenario: A concept panel without columns is projected

- **WHEN** a concept panel without columns, diagram or illustration is displayed at projection
  width
- **THEN** its claim keeps the short measure of a single-column panel

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

### Requirement: « Appareil en main » screens are visually consistent

Every « appareil en main » screen SHALL use the same recognizable presentation across all three
lessons, and SHALL include the cellulaire equivalent of the exercise wherever the source content
provides one.

#### Scenario: The eighth hands-on moment of the formation

- **WHEN** any « appareil en main » screen is displayed
- **THEN** it is recognizable as a hands-on moment from the back of the room without reading its text
- **AND** a participant using a phone as their camera has an exercise to perform

### Requirement: A repère screen can prompt the room with two unexplained terms

A block's `ouverture` repère screen MAY carry a two-term prompt: two short term labels
displayed side by side, with no definition, explanation, or timing text attached to either
one. This is reserved for a pair of terms the block is about to distinguish, where the room
is meant to consider both before a following screen resolves the distinction. It SHALL NOT
be used to also state which bloc or screen addresses each term.

#### Scenario: The room is asked to consider two terms before either is defined

- **WHEN** a block's `ouverture` screen carries a two-term prompt
- **THEN** both term labels are displayed side by side
- **AND** neither label is accompanied by a definition or explanatory text
- **AND** no scheduling or timing claim is displayed for either term

#### Scenario: A later screen resolves the distinction

- **WHEN** a block's `ouverture` screen carries a two-term prompt
- **THEN** a later screen in the same block defines and distinguishes both terms
- **AND** the `ouverture` screen itself does not state or imply when that later screen appears

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

### Requirement: A repère screen with a list corps does not also carry an aparte

A repère screen whose `corps` is authored as an enumerated or bulleted list SHALL NOT also carry
an `aparte`. A repère's contract is a small amount of wayfinding content; a list-shaped corps
already carries as much content as that budget allows, and repère has no mechanism — unlike a
concept panel — to shrink or paginate `corps` or `aparte` content that overflows the projection
floor. A block whose repère content needs both a list and an aparte's worth of material SHALL be
authored as multiple sibling repère screens within the same block instead, each carrying its own
claim.

#### Scenario: A repère needs both a list and additional necessary content

- **WHEN** a repère screen's content is authored with a list corps and material that would
  otherwise go in an aparte
- **THEN** that content is split across two or more repère screens, each with its own claim
- **AND** any content necessary to follow the block is placed in a screen's claim or corps, never
  left in an aparte

#### Scenario: A build is produced with a repère combining a list corps and an aparte

- **WHEN** a repère screen is authored with a list-shaped `corps` and a non-empty `aparte`
- **THEN** the content verification SHALL fail the build and identify that lesson and screen

### Requirement: A session opens with a recap that starts from the participants' photos

A session after the first SHALL open with a recap block whose first screen asks the room what they
photographed since the previous session and what they learned, before any concept is restated. The
session SHALL be named by its rank (« depuis la séance 1 »), never by a moment relative to the
reader. The first screen SHALL NOT depend on an exercise having been done, and SHALL NOT show the
animateur's own photographs.

#### Scenario: Someone did nothing since the last session

- **WHEN** the recap's first screen is displayed
- **THEN** it asks about photos in general, not about a specific exercise or setting
- **AND** a participant who took no photos can still answer, for instance by naming what they noticed

#### Scenario: A reader opens the session months later

- **WHEN** the recap's first screen is read outside the room
- **THEN** it refers to the earlier session by its rank
- **AND** it does not claim which session is current, imminent or past

### Requirement: A recap tells one story and fits a short time budget

A recap block SHALL be a single line of argument built from the concepts of the earlier session,
not a re-teach of every earlier screen. It SHALL be designed to be presented in about five to
eight minutes, discussion included, and SHALL end by handing over to a screen that introduces
what the current session adds. Every concept panel in the recap MUST respect the concept-panel
size limits (about 100 words plus one diagram or table).

#### Scenario: The recap of session 2 goes from aperture to building an image

- **WHEN** the recap block of session 2 is read in order
- **THEN** its concept panels present, in this order: aperture as the opening that lets light in,
  larger admitting more and smaller less; aperture also setting the depth of field, explained as
  a zone that stays sharp in front of and behind the subject; focus, with the `AF-S` and `AF-C`
  modes and the effect of the focusing distance on the sharp zone; and the four levers presented
  as an order of choice to build an image, from the scene to the setting, with aperture last
- **AND** none of them introduces shutter speed, ISO or stops
- **AND** none of them claims that a wide aperture always blurs the background

#### Scenario: The levers are presented as an order of choice

- **WHEN** the recap's levers panel is displayed
- **THEN** it lists the background, the photographer's distance, the focal length and the
  aperture, in that order, each with how it is operated
- **AND** it states that aperture comes last because it is the only lever that also changes the light
- **AND** it does not describe the subject-to-background distance as changing the depth of the
  sharp zone

#### Scenario: A recap panel goes past the size limit

- **WHEN** a recap concept panel carries a table and a diagram whose text together exceed the
  legibility floor for projection
- **THEN** the content is reduced or split before the block is considered ready

#### Scenario: The recap hands over to the session's own content

- **WHEN** the last recap concept panel of session 2 has been displayed
- **THEN** the next screen introduces the session's new levers, shutter speed and ISO, side by
  side, each with what it is and what it does, without explaining either in detail
- **AND** that screen is the last screen of the recap block
- **AND** the screen after it is the first screen of the shutter-speed block

#### Scenario: The recap of session 3 goes from shutter speed to what the camera still decides

- **WHEN** the recap block of session 3 is read in order
- **THEN** its concept panels present, in this order: shutter speed as the choice between
  freezing and letting motion show, with the two blurs; ISO as the volume, and noise as a lack
  of light; and manual mode with ISO auto, ISO chosen last, together with exposure compensation
- **AND** none of them introduces composition

### Requirement: The session 3 ISO recap shows noise with two cropped photographs

The session 3 recap panel on ISO SHALL show, side by side, two photographs of the same scene and
light from session 2: one taken at a high ISO, and one taken at a low ISO and brightened
afterwards. Both SHALL open on the same resting crop, on a shadow where the noise is visible at
projection size, and SHALL share a linked loupe for a closer look. The panel SHALL NOT say that ISO comes last; the manual-mode recap panel says it.

#### Scenario: The ISO recap panel is projected

- **WHEN** the session 3 ISO recap panel is displayed
- **THEN** it shows two columns, each with one session 2 photograph of the same scene and a
  short caption
- **AND** the column for the low ISO brightened afterwards says it has more noise, not less
- **AND** the callout states that noise comes from a lack of light, not from ISO

#### Scenario: The noise is visible without enlarging the photographs

- **WHEN** the two photographs are shown at rest on a projector, in 16:9 or 4:3
- **THEN** both are framed on the same point at the same magnification
- **AND** the grain in the shadow can be compared from the middle of the room without opening
  either photograph

#### Scenario: The presenter magnifies the grain

- **WHEN** the presenter holds Shift over one of the two photographs
- **THEN** both photographs show a magnified view of the same point, so the grain can be compared
  more closely than the resting crop allows

#### Scenario: The order of the choices is stated once

- **WHEN** the session 3 recap block is read in order
- **THEN** the ISO recap panel does not state that ISO comes last
- **AND** the manual-mode recap panel that follows it states that ISO comes last, after the
  aperture and the shutter speed

### Requirement: The session 3 manual-mode recap does not read M as full manual

The session 3 recap panel on manual mode with ISO auto SHALL present it, in its projected
headline, as a half-automatic mode and state who decides what: the photographer keeps the
aperture and the speed, the camera chooses the ISO. The headline SHALL NOT name `M`. The panel
SHALL name `M` in its body, as the position on the mode dial, together with ISO auto.

#### Scenario: The manual-mode recap panel is projected

- **WHEN** the session 3 recap panel on manual mode with ISO auto is displayed
- **THEN** its headline calls the mode half-automatic
- **AND** its headline states that the photographer keeps the aperture and the speed, and that
  the camera chooses the ISO
- **AND** its headline does not contain `M`
- **AND** its body names `M` with ISO auto as where to find the mode on the dial

#### Scenario: The screen is listed or opened in a tab

- **WHEN** the screen's title is shown in the session's list of screens or in the browser tab
- **THEN** it does not open with `M`

#### Scenario: A participant follows the link months later

- **WHEN** someone opens `/lecons/3/retour/rappel-m-iso-auto/`
- **THEN** the panel is still at that address

### Requirement: Recap content does not address phones separately

A recap block SHALL NOT contain phone-specific instructions or notes. A concept it restates applies
to any device and is worded that way.

#### Scenario: A participant with a phone reads the recap

- **WHEN** the recap block is displayed
- **THEN** no screen contains a note that applies only to phones

### Requirement: A repère screen can present notions side by side

A repère screen MAY carry two or three columns, each a card with a title, a short body, and
optionally an icon and a short highlighted label. The columns SHALL be laid out side by side at
projection width and stacked in a single column at phone width. Their text SHALL be subject to
the same content checks as any other screen text.

#### Scenario: A transition introduces two new notions

- **WHEN** a repère screen with two columns is displayed at projection width
- **THEN** both cards are visible side by side, each with its title and body
- **AND** the screen's content is centred vertically and fits at 1024 × 768 and 16:9

#### Scenario: The same screen is read on a phone

- **WHEN** the screen is opened at phone width
- **THEN** the cards are stacked in a single column without horizontal scrolling

#### Scenario: A screen asks for an unsupported number of columns

- **WHEN** a repère screen is authored with one column or more than three
- **THEN** the build fails instead of rendering the screen

### Requirement: The speed block alternates explanation and hands-on practice

Session 2's shutter-speed block SHALL interleave « appareil en main » screens with its concept,
demonstration and interactive screens rather than placing all practice at the end. It SHALL
contain exactly three « appareil en main » screens, all using the shutter-priority mode (`S`, or
`Tv` on a Canon) with ISO auto, and each SHALL provide a phone equivalent.

#### Scenario: The block is read in order

- **WHEN** the speed block of session 2 is read from its first screen to its last
- **THEN** its first screen explains what shutter speed is mechanically
- **AND** its second screen is an « appareil en main » exercise in which participants photograph
  a neighbour's waving hand at a fast speed, then at a slow one, and compare
- **AND** its last two screens are the two creative exercises

#### Scenario: A participant follows an exercise of the block

- **WHEN** any « appareil en main » screen of the speed block is displayed
- **THEN** its steps name the shutter-priority mode as `S`, or `Tv` on a Canon
- **AND** it does not ask the participant to set an ISO value by hand
- **AND** it carries a phone equivalent

#### Scenario: ISO is not explained ahead of its own block

- **WHEN** any screen of the speed block is displayed
- **THEN** it does not explain what ISO does or how ISO auto chooses its value

### Requirement: The speed block pairs the two blurs with two creative exercises

After the screen that distinguishes subject blur from camera shake, the speed block SHALL present
a demonstration of chosen blur followed by two « appareil en main » exercises that produce each
blur on purpose: one where the camera stays still and a light moves, one where the scene stays
still and the camera moves.

#### Scenario: Light trails

- **WHEN** the first creative exercise is displayed
- **THEN** it asks participants to rest the camera on a stable surface and use the self-timer
- **AND** someone draws in the air with a phone's flashlight during an exposure of about one second
  or longer
- **AND** the screen states that the room lights are dimmed

#### Scenario: Intentional camera movement

- **WHEN** the second creative exercise is displayed
- **THEN** it asks participants to move the camera deliberately during an exposure of about a
  quarter of a second to one second, starting the movement before pressing the shutter button
- **AND** it does not ask for a tripod or a stable surface

#### Scenario: The link to the two blurs is visible

- **WHEN** either creative exercise is displayed
- **THEN** its wording connects it to the subject-blur or the camera-shake case of the earlier
  « deux flous » screen

### Requirement: The speed block shows what different speeds are for

The speed block SHALL include a demonstration comparing one scene at three shutter speeds, placed
after the screen presenting the choice between freezing and showing movement, and a demonstration
of four creative uses of a chosen blur — light trails, intentional camera movement, panning and
partial subject blur — placed before the creative exercises.

#### Scenario: One street at three speeds

- **WHEN** the three-speed demonstration is displayed
- **THEN** it shows the same street scene at `1/500 s`, `1/30 s` and `1/2 s`
- **AND** its caption states that only the speed changed, and that the camera adjusted its ISO to
  compensate

#### Scenario: The creative uses are shown before they are tried

- **WHEN** the « flou choisi » demonstration is displayed
- **THEN** it shows a light-trail image, an intentional-camera-movement image, a panning image and
  a partial-subject-blur image
- **AND** the next screen is the light-trail exercise

#### Scenario: The partial subject blur says what it adds

- **WHEN** the presenter enlarges the partial-subject-blur image
- **THEN** its label states that one part of the subject moves faster than the rest, so that part
  blurs while the rest stays sharp

#### Scenario: The four creative uses are projected

- **WHEN** the « flou choisi » demonstration is displayed at projection width
- **THEN** the four images are arranged in two rows of two: light trails and intentional camera
  movement on the first row, panning and partial subject blur on the second
- **AND** at phone width they are stacked in that same order
- **AND** no image's label is shown until that image is enlarged

### Requirement: The speed block presents the decision as two choices side by side

The speed block's decision screen SHALL state that there are two choices when something moves,
neither better than the other, and SHALL present them as two columns — freezing the movement and
letting it show — each with a short description and a demonstration photograph below it. The
columns SHALL be side by side at projection width and stacked at phone width.

#### Scenario: The decision screen is projected

- **WHEN** the decision screen is displayed at 1024 × 768 or 16:9
- **THEN** the two choices are visible side by side, each with its title, its description and a
  photograph or the photograph's specification
- **AND** nothing on the screen is cut off

#### Scenario: The decision screen is read on a phone

- **WHEN** the decision screen is opened at phone width
- **THEN** the two choices are stacked in a single column without horizontal scrolling

#### Scenario: The animator plans the decision photographs

- **WHEN** the animator reviews the shot list
- **THEN** both photographs of the decision screen appear in it

### Requirement: The speed block's starting points are grouped by choice

The speed block's starting-points screen SHALL present shutter speeds as starting points, not
rules, for at least ten situations, grouped under the two choices of the decision screen —
freezing the movement and letting it show — with a group between them for speeds that suggest
movement while keeping the subject readable. Each situation SHALL be a card with its starting
speed readable from the middle of the room, and each slow speed SHALL state the support it
needs.

#### Scenario: The starting points are projected

- **WHEN** the starting-points screen is displayed at 1024 × 768 or 16:9
- **THEN** a « figer » group, an « entre les deux » group and a « laisser voir le mouvement »
  group are visible, in that order, each with its cards
- **AND** the situations include sports, fireworks and light trails
- **AND** nothing on the screen is cut off

#### Scenario: The in-between group does not add a third choice

- **WHEN** the « entre les deux » group is displayed
- **THEN** its speeds lie between those of the two other groups
- **AND** the decision screen still presents two choices

#### Scenario: A slow speed is read

- **WHEN** a card shows a speed of a quarter of a second or slower
- **THEN** it states that the camera is on a tripod or resting on a surface

### Requirement: The two-blurs screen gives the hand-held limit and the tripod's role

The screen that distinguishes subject blur from camera shake SHALL state the hand-held rule of
thumb — a shutter speed of at least one over the focal length — with at least one worked
example, and SHALL say that below it the photographer braces the camera or uses a tripod. It
SHALL state that a tripod removes camera shake but not subject blur.

#### Scenario: A participant checks whether they can shoot hand-held

- **WHEN** the two-blurs screen is displayed
- **THEN** the rule « au moins `1/focale` » is visible in a rule box with a worked example
- **AND** the screen says what to do below that speed

#### Scenario: The tripod is presented

- **WHEN** the two-blurs screen's aside is read
- **THEN** it states that a tripod removes the photographer's shake, never the subject's

### Requirement: The ISO block explains ISO from film to sensor before practice

Session 2's ISO block SHALL open with two explanation screens. The first SHALL define ISO from
the film era: a sensitivity chosen by buying a roll of film, faster films reaching a correct
exposure with less light and showing more grain. The second SHALL explain ISO in a digital
camera as a chain — light collected by the sensor, a weak analog signal, its amplification, its
conversion to numbers — and SHALL state that the sensor has a single sensitivity and that ISO
sets the amplification, which the block calls the « volume ». The everyday word « sensibilité »
MAY remain in use elsewhere on the site.

#### Scenario: The block is read in order

- **WHEN** the ISO block of session 2 is read from its first screen
- **THEN** its first screen defines ISO and connects it to film
- **AND** its second screen shows the digital chain from light to numbers and names ISO as an
  amplification
- **AND** its third screen is an « appareil en main » exercise

#### Scenario: The film screen is read months later

- **WHEN** the film screen is displayed
- **THEN** it states that on film the sensitivity came with the roll and that faster films showed
  more grain
- **AND** it does not use « soir » or « soirée »

### Requirement: The ISO block lets participants see ISO change brightness

The ISO block's first « appareil en main » exercise SHALL have participants switch to manual mode
(`M`), keep one aperture and one shutter speed, turn ISO auto off, take the same photograph at a
low, a middle and a high ISO, and compare the brightness. Its last step SHALL turn ISO auto back
on. It SHALL provide a phone equivalent.

#### Scenario: A participant follows the exercise

- **WHEN** the first ISO exercise is displayed
- **THEN** its steps name manual mode `M`, a fixed aperture and a fixed speed
- **AND** they ask for at least three ISO values from low to high, with only the ISO changing
- **AND** the last step turns ISO auto back on

#### Scenario: A participant uses a phone

- **WHEN** the first ISO exercise is displayed
- **THEN** it carries a phone equivalent using a `Pro` or manual mode's ISO control

### Requirement: The ISO block places the cause of noise in the light collected

The ISO block SHALL state that film grain and digital noise look alike but do not come from the
same place, that digital noise comes from too little light collected, and that ISO makes visible
the noise already present. It SHALL state that the best ISO is the one that exposes the subject
correctly, and that under-exposing to avoid noise does not help. No screen of the block SHALL
present ISO as the cause of noise.

#### Scenario: The noise panel is displayed

- **WHEN** the screen on where noise comes from is displayed
- **THEN** its headline contrasts film grain with digital noise
- **AND** it names the lack of light collected as the cause of noise
- **AND** it states « le meilleur ISO est celui qui expose correctement votre sujet », or an
  equivalent sentence

#### Scenario: A participant proves it on their own camera

- **WHEN** the second ISO exercise is displayed
- **THEN** it asks for one photograph at a high ISO of a scene with both lit and dark areas
- **AND** it asks the participant to zoom in on the camera screen and compare the dark areas with
  the lit ones
- **AND** it carries a phone equivalent

### Requirement: The ISO block ends on manual mode with ISO auto

The ISO block's last screen SHALL present manual mode with ISO auto: the photographer sets the
aperture and the speed, and the camera sets the ISO, within a stated upper limit. It SHALL
present this as the mode for when both the aperture and the speed matter, and SHALL NOT replace
`A` or `Av` as the recommended default mode. It SHALL introduce exposure compensation — the `+/−`
button, asking the camera for a brighter or darker result than it chose — and state that in `M`
with ISO auto it moves the ISO.

#### Scenario: The last screen of the block is displayed

- **WHEN** the ISO block's last screen is displayed
- **THEN** it states that in `M` with ISO auto the photographer keeps the aperture and the speed
  and the camera chooses the ISO
- **AND** it names an upper ISO limit
- **AND** it introduces the `+/−` button and states that, in `M` with ISO auto, it moves the ISO
- **AND** it presents `A` or `Av` as the starting point

### Requirement: Exposure compensation acts on what the camera still decides

Where the site describes exposure compensation in `M`, it SHALL present it as acting on what the
camera still decides: the ISO in `M` with ISO auto, and nothing in `M` with a fixed ISO. No lesson
screen, brand page or reference sheet SHALL state without qualification that compensation does
nothing in `M`, or that in `M` the camera decides nothing.

#### Scenario: The ISO block's last screen mentions compensation

- **WHEN** the « M et l'ISO auto » screen introduces the `+/−` button
- **THEN** it states that in `M` with ISO auto, compensation moves the ISO

#### Scenario: A brand page or sheet mentions compensation in M

- **WHEN** a brand page or the « Avant de déclencher » sheet mentions compensation in `M`
- **THEN** it says that with ISO auto on, compensation moves the ISO on most recent bodies, and
  that with a fixed ISO it does nothing

### Requirement: Session 2 ends like session 1, right after the ISO block

Session 2 SHALL end after its ISO block, with no break, modes block, workshops or diagnostic block,
on a closing block shaped like session 1's: a reference panel on exposure compensation, a
challenge, and a closing question asked by raised hands. The panel SHALL name the setting in its
headline — exposure compensation, the `+/−` button — and SHALL state that the camera
aims for a scene of average brightness and SHALL show, scene by scene, which way to correct and
by how much — towards `+` for snow, a white subject or backlight, towards `−` for a dark scene or
a subject on a black background — with what happens without the correction, and SHALL end on
the rule « trop sombre → vers le `+`, trop clair → vers le `−` ». It is a reference, not an
exercise: the room cannot reproduce these scenes. The challenge SHALL ask for photographs that practise the session.

#### Scenario: The end of session 2 is read

- **WHEN** session 2 is read past the ISO block
- **THEN** the next and last block holds the compensation panel, the challenge and the closing
  question, in that order
- **AND** no workshop, modes or diagnostic screen follows

#### Scenario: A participant reads the challenge

- **WHEN** the challenge screen is displayed
- **THEN** it asks for photographs that practise movement, low light and the `+/−` button

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

### Requirement: The history block shows where composition rules come from

Session 3's history block SHALL present, on at most three screens and in this order: composition
older than photography, photography becoming an art by composing like painting, and the first
composition rules written for photographers. The block SHALL end before the twentieth century.

#### Scenario: The history block is read in order

- **WHEN** the history block's screens are displayed in sequence
- **THEN** the three stages appear in the order above, on no more than three screens
- **AND** each stage is illustrated by at least one archival image: a photograph, an engraving or
  a book page

#### Scenario: The first history screen is displayed

- **WHEN** the first screen of the history block is displayed
- **THEN** its statement is that composition is older than photography
- **AND** it shows that, in 1797, an engraver was already giving advice on how to arrange a
  landscape (where the sky, the land and the water go), before photography existed
- **AND** neither its statement, its aside nor its image captions name the rule of thirds or
  mention the camera's grid

#### Scenario: The first history screen does not repeat the loupe hint

- **WHEN** the first screen of the history block offers a loupe on its images
- **THEN** the hint to hold Shift appears once, under the images
- **AND** the aside does not repeat it

#### Scenario: The second history screen shows staged photographs in date order

- **WHEN** the second screen of the history block is displayed
- **THEN** its images are staged photographs, each assembled from several negatives, shown
  oldest first
- **AND** its aside and captions name only photographers whose work appears on the screen
- **AND** none of its images shows a nude or partly nude figure

#### Scenario: The composition block follows the history block

- **WHEN** the composition block's screens are read
- **THEN** no technique is presented as borrowed from a named painting or painter
- **AND** the only historical reference in the block is the 1797 origin of the rule of thirds,
  on the screen that places the subject

### Requirement: The third history screen lists Robinson's simple rules

The third screen of session 3's history block SHALL be a concept panel showing page 47 of
Robinson's *Pictorial Effect in Photography* (1869) as its illustration and, beside it, all ten
rules of the chapter "Simple Rules", summarized in French, grouped under four headings, outdated
rules included. The rules SHALL be stated as Robinson stated them, without pointing to a later
screen.

#### Scenario: The rules are listed beside the scan

- **WHEN** the third history screen is displayed in projection
- **THEN** the scan of page 47 appears on the left with its caption « Robinson, 1869 — « Simple
  Rules » » (author, date, title) and its credit
- **AND** the right column shows, in this order, the headings *Le point de vue*, *Les lignes*,
  *L'équilibre* and *Le cadre*

#### Scenario: All ten rules are present

- **WHEN** the rules of the third history screen are read
- **THEN** *Le point de vue* holds: change position, a few steps change the lines; and seen at an
  angle rather than from the front
- **AND** *Les lignes* holds: no parallel lines, with an undulating foreground under a straight
  horizon; a few straight lines among the curves; and never the main subjects stacked in a line
- **AND** *L'équilibre* holds: never a mirror symmetry; a street or a river never taken from the
  centre; and never the horizon in the middle
- **AND** *Le cadre* holds: a picture closed in on its edges; and an arch never resting on the
  edge of the frame

#### Scenario: The rules keep Robinson's tone and stay in the past

- **WHEN** the rules of the third history screen are read
- **THEN** the prescriptive rules keep the word « jamais » where Robinson writes "never"
- **AND** no rule names, links to or announces a later screen or block

#### Scenario: The rest of the screen is unchanged

- **WHEN** the third history screen is displayed
- **THEN** its statement is « Dans les années 1860, des photographes mettent les règles par écrit —
  pour d'autres photographes. »
- **AND** its aside names William Lake Price and Henry Peach Robinson, and says nothing else
- **AND** the screen keeps its stable deep link `les-regles-s-ecrivent`

### Requirement: The recap of session 2 hands over to framing

Session 3's recap SHALL end on a screen stating that the camera can decide sharpness and
exposure in its place but never the framing, and the screen after it SHALL open the history
block.

#### Scenario: The recap's last screen is displayed

- **WHEN** the last screen of session 3's recap block is displayed
- **THEN** it opposes what the camera can decide for the photographer (sharpness, exposure) to
  what it never decides (framing)
- **AND** the next screen is the first screen of the history block

### Requirement: Composition techniques are ordered by impact in three tiers

Session 3's composition block SHALL present composition techniques from the most to the least
impact, in three tiers, and SHALL present all three tiers during the session. The first tier
SHALL cover a single subject, getting closer, checking the four corners and the background, and
placing the subject decisively.

#### Scenario: The composition block is read in order

- **WHEN** the composition block's screens are displayed in sequence
- **THEN** every first-tier technique appears before any second-tier technique, and every
  second-tier technique before any third-tier technique
- **AND** the rule of thirds is presented as a starting point, alongside a clearly centred subject

#### Scenario: A reader looks for the third tier

- **WHEN** a reader looks for symmetry, repetition, negative space or diagonals
- **THEN** they are found in the lesson, not only on a separate page

### Requirement: Composition screens show two or three techniques side by side

Each composition-technique screen SHALL present two or three techniques as side-by-side columns
under a title naming what they do to the image. Each column SHALL carry the technique's name, at
most a short sentence, and a demonstration photograph or its specification.

#### Scenario: A technique screen is projected

- **WHEN** a composition-technique screen is displayed at 1024 × 768 or 16:9
- **THEN** its two or three techniques are visible side by side, each with its photograph or
  the photograph's specification
- **AND** nothing on the screen is cut off

#### Scenario: A technique screen is read on a phone

- **WHEN** the screen is opened at phone width
- **THEN** the techniques are stacked in a single column without horizontal scrolling

### Requirement: Session 3's pause is a single question break

Session 3's pause block SHALL consist of one repère screen that announces a break and invites
questions, about composition or about anything else, and invites participants to show a
photograph on their screen.

#### Scenario: The pause screen is displayed

- **WHEN** session 3's pause block is displayed
- **THEN** it holds exactly one screen
- **AND** that screen announces the break and invites questions on any subject, composition
  included
- **AND** it invites participants to come and show a photograph on their screen

#### Scenario: The pause screen is read months later

- **WHEN** the pause screen is read outside the room
- **THEN** it does not mention a wall, sticky notes, or the session as the last one together

### Requirement: The beyond-composition block opens on three intentions

Session 3's beyond-composition block SHALL open on a repère screen stating that a well-composed
photograph is not yet a strong photograph, and announcing side by side three intentions,
*captiver*, *faire ressentir* and *faire imaginer*, without explaining them yet.

#### Scenario: The block's opener is displayed

- **WHEN** the first screen of the beyond-composition block is displayed
- **THEN** its statement opposes a well-composed photograph to a photograph that holds the viewer
- **AND** it shows *Captiver*, *Faire ressentir* and *Faire imaginer* side by side, in that order

#### Scenario: The opener does not call everything storytelling

- **WHEN** the opener is read
- **THEN** it presents telling a story as one intention among three, under *Faire imaginer*
- **AND** it does not use the word « storytelling »

### Requirement: Each intention has one screen of tools in columns

After its opener, the beyond-composition block SHALL present one concept panel per intention, in
the opener's order. Each panel SHALL be titled by the intention and present two or three tools as
side-by-side columns, each with its name, one short sentence and a photograph or its
specification.

#### Scenario: The tool screens are read in order

- **WHEN** the block's concept panels are displayed in sequence
- **THEN** *Captiver* presents tension and relationships between elements
- **AND** *Faire ressentir* presents two or three contrasting emotions, each with the visual
  choices that support it
- **AND** *Faire imaginer* presents what the photograph withholds and what happens before or
  after the moment

#### Scenario: The emotion screen warns against formulas

- **WHEN** the *Faire ressentir* panel is displayed
- **THEN** a callout states that these choices are not formulas, for example that a dark
  photograph is not necessarily sad

#### Scenario: A tool screen is projected or read on a phone

- **WHEN** a tool screen is displayed at 1024 × 768 or 16:9
- **THEN** its columns are visible side by side, each with its photograph or specification, and
  nothing is cut off
- **AND** at phone width the columns stack into one without horizontal scrolling

### Requirement: The beyond-composition block is an introduction

The beyond-composition block SHALL hold fewer screens than the composition block, and SHALL NOT
include an « appareil en main » screen or an activity screen.

#### Scenario: The block's length is compared with composition

- **WHEN** the screens of both blocks are counted
- **THEN** the beyond-composition block has fewer screens than the composition block
- **AND** none of its screens is an « appareil en main » or an activity screen

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

### Requirement: The beyond-composition block shows only public-domain photographs

The beyond-composition block's photographs SHALL be archival photographs in the public domain or
the club's own photographs. A protected photographer's work MAY be named and linked in an aside,
and SHALL NOT be shown.

#### Scenario: A reader looks for Cartier-Bresson's « instant décisif »

- **WHEN** the block mentions a photograph by a protected photographer
- **THEN** the photographer and the photograph are named, and a link MAY lead to it
- **AND** no image of that photograph is shown on the site

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

### Requirement: The composition block shows public-domain photographs

The composition block's photographs SHALL be archival photographs in the public domain or the
club's own photographs. Each archival photograph SHALL show the technique of its column clearly
enough to be pointed at from the front of the room.

#### Scenario: An archival photograph fills a composition slot

- **WHEN** a composition-technique screen displays an archival photograph
- **THEN** the photograph carries its author, date and collection as its credit
- **AND** the technique named by its column is visible in it, for example a cliff edge on a thirds
  line or a ship seen through an opening

#### Scenario: A candidate photograph only roughly shows its technique

- **WHEN** a candidate photograph for « Les tiers » places its subject well off the thirds lines
- **THEN** it is not used in that slot, even if its rights are clear

### Requirement: No photograph is shown twice in session 3

A photograph SHALL appear at most once in session 3, in any version (a retouched and an
unretouched print of the same negative count as one photograph). The same photographer MAY
appear several times with different photographs.

#### Scenario: A photographer is used in two blocks

- **WHEN** session 3's archival credits are listed
- **THEN** a photographer may appear more than once
- **AND** no photograph, or another print of its negative, appears in two slots
