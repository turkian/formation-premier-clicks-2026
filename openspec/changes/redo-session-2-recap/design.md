## Context

The recap replaces the `retour` block in `src/src/content/lecons/2.yaml`. Most of what it needs
already exists in the content model: `repere` and `panneau` screens, the `schema` region on a panel
(props are free-form), and a static `encadre` with `ton`. Four diagrams are reused, three of them
with a new opt-in prop (`diametre-ouverture`, `zone-nette`, `distance-sujet`); two small authoring
options are added (stacked panels, repère columns).

Project constraints that shape the wording and layout (from `openspec/config.yaml`):

- Sessions are named by rank; nothing relative to the reader.
- About 100 words plus one diagram or table per concept panel; nothing essential in the smallest
  type size; everything visible at 1024 × 768 and 16:9.
- Lesson text speaks to the participants, never to the animateur.

See proposal.md for motivation. The plan was revised after reviewing the implemented screens:
decisions D1 to D4 were updated, D6 to D10 were added.

## Goals / Non-Goals

**Goals:**
- One story, one arc, about seven minutes: aperture and light → depth of field → focus → four
  levers in the order you choose them.
- A light-focused aperture diagram that a projector can carry without the reader doing arithmetic.
- A last screen that introduces speed and ISO without repeating « Le programme ».

**Non-Goals:**
- Stops, ratios, shutter speed and ISO in the recap panels.
- Phone-specific content.
- Changing session 1, the interactive aperture/division component, or the recording of what the
  room says (the site is static; the discussion happens out loud).

## Decisions

### D1. Screen sequence

```
1  bilan                  repere/ouverture   discussion prompt, about 3 min
2  rappel-budget          panneau (stacked)  aperture lets light in: discs + simulated photos
3  un-prix                panneau            aperture also sets the depth of field (zone-nette,
                                             background outside the zone); encadre: aperture
                                             sets both brightness and rendering
4  rappel-mise-au-point   panneau            focus = where; AF-S / AF-C; distance and the sharp
                                             zone (distance-sujet with zones)
5  rappel-leviers         panneau            four levers to build an image, in order of choice
6  deux-nouveaux-leviers  repere/transition  speed and ISO, two cards
7  le-programme           panneau            unchanged
```

Alternatives considered: one screen per earlier concept was rejected because it turns the recap
into a re-teach. A single cumulative panel was rejected because stacked diagrams risk overflowing
in 4:3. The focus screen was added after review: depth of field without focus left out the
session 1 idea that the photographer chooses *where* it is sharp.

### D2. The light variant is a mode of `diametre-ouverture`, not a new component

The disc area is the light admitted, so the drawing already carries the message. The variant
removes the arithmetic and the focal length, adds a more-light ↔ less-light axis, and states that
a small `f`-number is a large opening. It is selected through props (`mode: lumiere`), so the
registry name is unchanged; an unknown mode fails the build. The scale is computed once in the
parent and handed to two rendering pieces, so the modes cannot drift apart, and session 1's call,
which passes no mode, renders byte-for-byte as before.

The axis and the direction statement are HTML at the body type size, not SVG text: an SVG shrinks
with its column, and its letters fell below the smallest type size at 4:3.

### D3. Generic wording, on purpose

The recap says "more" and "less" light. Stops and ratios are deferred to the speed and ISO blocks,
which need the doubling idea and can introduce it once. The variant enforces this by having no
numeric light figure to render. The depth-of-field panel avoids "the background becomes blurred",
which is not true in every situation, and explains the sharp zone in front of and behind the
subject instead.

### D4. The intro screen is separate from « Le programme »

The intro introduces the two new levers (speed, ISO) as two cards, each with what it is and what
it does; it no longer carries the session's question or the modes. « Le programme » keeps its
aperture-and-speed table. Known overlap: « Le programme » still says there are only two ways to let
light in, right after a screen that names two new levers. Folding or removing it is left to a
later change.

### D5. « Le programme » wording is left alone

The intro does not reuse « Le programme »'s sentence (« Vous allez comprendre ce que votre
appareil décide à votre place »).

### D6. Simulated photographs show exposure only

The light variant takes one photograph per opening (`photos`), paired with its opening before the
openings are sorted. The four images are derived from one photograph, cropped to 4:3, with the
source treated as correctly exposed at `f/4`; `f/2.8`, `f/5.6` and `f/8` are one stop apart, so
the row reads too bright, right, darker, much darker. Exposure is scaled in linear light and
clipped, as a sensor would, then re-encoded to sRGB. Depth of field is not simulated: the source
background is already blurred and cannot be sharpened, and the next screen covers depth of field.
The caption says « Simulation ».

### D7. Stacked panels

A panel with a diagram and no body, or one that asks for `disposition: empilee`, stacks claim,
body and diagram across the full width, in that order at every width: its body introduces the
diagram, so the phone order (diagram first) does not apply. Used by `rappel-budget`, whose four
columns need the full width.

### D8. Opt-in outcomes on existing diagrams

`zone-nette` gains `arrierePlan` (a blurred background outside the sharp zone) and
`distance-sujet` gains `zones` (the sharp zone around each subject, computed with the site's
`profondeurDeChamp`, depth written beneath). Both default to off, so session 1's withheld-answer
screen still shows distances only. The computed depth at 3 m (about 74 cm) differs from session
1's stated 77 cm; the recap text says "nearly ten times more" rather than a figure.

### D9. Repère columns

A repère may carry two or three `colonnes` (title, body, optional icon and label), side by side at
projection width and stacked on phones; a repère with columns is centred vertically. The content
checks already walk nested fields, so the card text is checked like any other screen text.

### D10. Screen ids follow their content

The intro screen was renamed from `la-question` to `deux-nouveaux-leviers`. No internal link
pointed to it; the old address no longer exists.

## Risks / Trade-offs

- **A recap panel exceeds 100 words** → draft to the limit first, then verify at 1024 × 768 and
  16:9 with the existing checks.
- **The intro and « Le programme » repeat each other** → known (D4); review in the room.
- **One-stop exposure steps look flat on a projector** → switch to `f/2`, `f/4`, `f/8`, `f/16`
  if the room cannot see the difference.
- **Participants who missed session 1** → the first screen asks a general question and the panels
  are self-sufficient, so the recap also works as a catch-up without extra screens.
- **The discussion cannot be captured by a static site** → the screens must work whatever is said;
  each panel is independent and may be skipped.
- **The variant drifts from the original** → both share the scaling code; the spec requires the
  default rendering to be unchanged.
