## Context

The recap replaces the `retour` block in `src/src/content/lecons/2.yaml`. Everything it needs
already exists in the content model: `repere` and `panneau` screens, the `schema` region on a panel
(props are free-form), and a static `encadre` with `ton`. Three of the four diagrams are reused
as they are (`zone-nette`, `quatre-leviers`, plus `diametre-ouverture` with a new mode).

Project constraints that shape the wording and layout (from `openspec/config.yaml`):

- Sessions are named by rank; nothing relative to the reader.
- About 100 words plus one diagram or table per concept panel; nothing essential in the smallest
  type size; everything visible at 1024 × 768 and 16:9.
- Lesson text speaks to the participants, never to the animateur.

See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- One story, one arc, about six minutes: light budget → aperture → depth as the price → four levers.
- A light-focused aperture diagram that a projector can carry without the reader doing arithmetic.
- A last screen that frames session 2 without repeating « Le programme ».

**Non-Goals:**
- Stops, ratios, shutter speed and ISO in the recap.
- Phone-specific content.
- Changing session 1, the interactive aperture/division component, or the recording of what the
  room says (the site is static; the discussion happens out loud).

## Decisions

### D1. Screen sequence

```
1  bilan            repere/ouverture   discussion prompt, about 3 min
2  rappel-budget    panneau            light as a quantity + aperture discs (variant)
3  un-prix          panneau            same setting sets the sharp zone (zone-nette)
                                       encadre: in auto, the camera settles it for you
4  rappel-leviers   panneau            four levers, aperture in accent colour
5  (new intro)      repere/transition  the session's question, three teasers
6  le-programme     panneau            unchanged
```

Alternatives considered: one screen per earlier concept (light, focus, aperture, levers) was
rejected because it turns the recap into a re-teach and does not give the room a reason to care.
A single cumulative panel was rejected because stacked diagrams risk overflowing in 4:3.

### D2. The light variant is a mode of `diametre-ouverture`, not a new component

The disc area is the light admitted, so the drawing already carries the message. The variant only
removes the arithmetic line, adds a more-light ↔ less-light axis, and adds a line stating that a
small `f`-number is a large opening. It is selected through props, so the registry name is
unchanged and a misspelled prop cannot silently produce a hole in a projected screen. Session 1's
call, which passes no mode, keeps the current rendering.

Alternatives considered: a new component (duplication of the scaling logic); extending the
interactive `OuvertureDivision` (too heavy for a recap and needs the whole-page island).

### D3. Generic wording, on purpose

The recap says "more" and "less" light. Stops and ratios are deferred to the speed and ISO blocks,
which need the doubling idea and can introduce it once. The variant enforces this by having no
numeric light figure to render.

### D4. The intro screen is separate from « Le programme »

The intro frames the question and the three new topics (speed, ISO, who decides); « Le programme »
keeps its aperture-and-speed table. Merging them would push the end of a short recap over the
panel size limit; keeping them apart costs one screen. If the two feel redundant in the room, the
intro can be folded into « Le programme » later without changing any spec.

### D5. « Le programme » wording is left alone except where it would repeat the intro

The intro must not duplicate the sentence already on « Le programme » (« Vous allez comprendre ce
que votre appareil décide à votre place »). The intro takes the question form, « Qu'est-ce que
mon appareil décide à ma place, et pourquoi ? », and « Le programme » keeps the table.

## Risks / Trade-offs

- **A recap panel exceeds 100 words** → draft to the limit first, then verify at 1024 × 768 and
  16:9 with the existing checks.
- **The intro and « Le programme » repeat each other** → different roles (question and topics vs.
  aperture-and-speed table); review in the room after first use.
- **Participants who missed session 1** → the first screen asks a general question and the panels
  are self-sufficient, so the recap also works as a catch-up without extra screens.
- **The discussion cannot be captured by a static site** → the screens must work whatever is said;
  each panel is independent and may be skipped.
- **The variant drifts from the original** → both share the scaling code; the spec requires the
  default rendering to be unchanged.
