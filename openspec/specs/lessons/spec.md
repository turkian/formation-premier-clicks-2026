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
demonstration screen.

#### Scenario: A comparison series is shown

- **WHEN** a demonstration screen presents a comparison series
- **THEN** the photographs occupy the screen's usable space
- **AND** a caption names the single variable that changed between them
- **AND** no concept panel body text competes for that space

#### Scenario: A diagram simulates a variable from one photograph

- **WHEN** a concept panel's diagram shows images derived from one photograph
- **THEN** the diagram or its caption says that the images are a simulation
- **AND** only the variable the diagram explains differs between the images

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

- **WHEN** the last recap concept panel has been displayed
- **THEN** the next screen introduces the session's new levers, shutter speed and ISO, side by
  side, each with what it is and what it does, without explaining either in detail
- **AND** that screen is the last screen of the recap block
- **AND** the screen after it is the first screen of the shutter-speed block

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
of three creative uses of a chosen blur — light trails, intentional camera movement and panning —
placed before the creative exercises.

#### Scenario: One street at three speeds

- **WHEN** the three-speed demonstration is displayed
- **THEN** it shows the same street scene at `1/500 s`, `1/30 s` and `1/2 s`
- **AND** its caption states that only the speed changed, and that the camera adjusted its ISO to
  compensate

#### Scenario: The creative uses are shown before they are tried

- **WHEN** the « flou choisi » demonstration is displayed
- **THEN** it shows a light-trail image, an intentional-camera-movement image and a panning image
- **AND** the next screen is the light-trail exercise

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
