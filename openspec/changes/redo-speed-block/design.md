## Context

The change touches the `retour` and `vitesse` blocks of `src/src/content/lecons/2.yaml` and adds
one interactive component. Everything else uses screen kinds that already exist: `appareil-en-main`
(gestes + `cellulaire` + `aparte`), `demonstration` (a `series` with one declared variable, or up to
three `images`), and `interactif` (a registered component + `aparte`). See proposal.md for the
motivation and the specs for the requirements.

Constraints that shape the wording and layout (from `openspec/config.yaml`): sessions named by rank,
no `soir` except the two allowed phrases, lesson text addressed to the participants, nothing
necessary in the smallest type size, everything visible at 1024 × 768 and 16:9.

## Goals / Non-Goals

**Goals:**
- A block where people pick up the camera three times, the first time within minutes.
- A shutter demonstration that is physically right, including the slit at fast speeds, and
  that can be explained one phase at a time.
- Photographs that show what speeds are *for*, not only what goes wrong.

**Non-Goals:**
- Anything about ISO beyond leaving ISO auto on: no « regardez votre ISO », no M + ISO auto, no
  compensation. The ISO block is redone next and will pick these up.
- Rewriting `la-decision`, `points-de-depart`, `deux-flous`, `deux-flous-en-images` or
  `explorer-le-mouvement`.
- Showing the image being built on the sensor, the rolling-shutter distortion of an electronic
  shutter, or flash sync. The note on electronic shutters stays one sentence.
- Cutting screens elsewhere in session 2 to make room (deferred, see Risks).

## Decisions

### D1. Screen sequence

```
retour   … rappel-leviers → deux-nouveaux-leviers        (le-programme removed)

vitesse
 1  l-obturateur            interactif         obturateur component; aparte: electronic shutter
 2  la-molette-de-vitesse   appareil-en-main   ex. 1 · waving hand, 1/500 then 1/15 (moved, rewritten)
 3  la-decision             panneau            unchanged
 4  trois-vitesses          demonstration      series: one street, 1/500 · 1/30 · 1/2 s
 5  points-de-depart        panneau            unchanged
 6  deux-flous              panneau            unchanged
 7  deux-flous-en-images    demonstration      unchanged
 8  explorer-le-mouvement   interactif         unchanged
 9  le-flou-choisi          demonstration      images: light trails · ICM · panning
10  les-trainees            appareil-en-main   ex. 2 · camera still, the light moves
11  le-flou-voulu           appareil-en-main   ex. 3 · the scene still, the camera moves
```

`trois-vitesses` goes right after `la-decision` so that « figer, ou laisser voir » is seen at once,
and its middle image shows that it is a range, not two options. `le-flou-choisi` goes just before
the exercises so the room sees the result before trying it.

Alternatives considered: one exercise after each concept screen was rejected because exercises 2
and 3 only make sense after `deux-flous`. Putting the light trails and ICM in atelier station 2
was rejected: the point is to practise during the presentation, not after a long talk.

### D2. The exercise screen keeps its id

Exercise 1 is the existing `la-molette-de-vitesse`, moved to position 2 and rewritten, so its deep
link keeps working. The new ids are `l-obturateur`, `trois-vitesses`, `le-flou-choisi`,
`les-trainees` and `le-flou-voulu`. `le-programme` disappears; a check confirms nothing links to it.

### D3. `S` / `Tv` with ISO auto in every exercise

Participants leave session 1 in `A` with ISO auto ([1.yaml](../../../src/src/content/lecons/1.yaml)).
The exercises change only the mode. In `S` the camera picks aperture and ISO, so ISO auto saves the
photo at both ends: at `1/500` indoors the aperture runs out of light, at `1 s` the ISO drops to its
minimum. `M` + ISO auto was rejected for now: it contradicts « Les quatre modes » and « La question
qui prouve » after the break, which the ISO redo will handle.

### D4. Exercise content

- **Ex. 1, la main:** `S`/`Tv`; find the speed dial; `1/500`, then `1/15`; compare. The phone
  equivalent stays the current one (a `Pro` mode, or watching the phone choose a slow speed in
  low light).
- **Ex. 2, les traînées:** `S`/`Tv` at `1 s` (then `2 s`); the camera rests on the table or a bag;
  the 2-second self-timer so pressing does not shake it; a neighbour draws a shape in the air with
  a phone flashlight. A shown stage direction says the lights are dimmed. The link to `deux-flous`
  is « le sujet bouge — cette fois, exprès ». Phone: iPhone Live Photo → « Pose longue »; on
  Android, a long-exposure or light-painting mode, or `Pro` with a slow speed.
- **Ex. 3, le flou voulu (ICM):** `S`/`Tv` at `1/4 s`, then `1/2 s`; point at the ceiling lights,
  a bookshelf or a colourful coat; start moving, press, keep moving; a vertical sweep first. The
  link is « c'est vous qui bougez — cette fois, exprès ». Phone: `Pro` with a slow speed, or a
  Live Photo « Pose longue » while moving.

Each fits the existing « appareil en main » limits; any detail that does not fit goes into
`aparte`.

### D5. Shutter component model

One normalized timeline in real seconds:

- Each curtain crosses the sensor in a fixed travel time `T` = 1/250 s (a typical focal-plane
  shutter), whatever the speed.
- The front curtain starts at 0; the back curtain starts at `t`, the selected speed.
- At any moment, the uncovered band runs from the back curtain's edge to the front curtain's edge.
  When `t ≥ T` the whole sensor is uncovered between `T` and `t`; when `t < T` the band is a slit
  of height `t / T` of the sensor.

Playback multiplies real time by a single slowdown factor, ×250, so a curtain crosses in one
second on screen. It is stated in the readout (« au ralenti, 250 fois »). Speed presets:
`1/60 s` (whole sensor uncovered for about 4 s on screen), `1/250 s` (whole sensor uncovered for
just an instant) and `1/2000 s` (a slit an eighth of the sensor tall). Slower speeds such as
`1/15` are not offered: at the same factor they would hold the screen for 17 seconds, and a
different factor per speed would break the honesty the spec asks for.

Controls: a « déclencher » button that plays the whole release, and back/forward step buttons
for three labelled phases: front curtain halfway, exposed (sensor uncovered, or the slit halfway
across), back curtain halfway. Under `prefers-reduced-motion`, « déclencher » goes through the
three phases without animating between them.

Drawing: an SVG sensor with two coloured curtains moving vertically, using the existing theme
tokens and `interactif.css`, like `VitesseEtMouvement.astro`. No photograph. Registered in
`components/interactifs/registre.ts` as `obturateur`.

The electronic-shutter note lives in the screen's `aparte`, not in the component: something like
« Obturateur électronique : aucun rideau ne bouge — le capteur est lu ligne par ligne. Le
résultat est semblable. »

### D6. Demonstration slots

- `trois-vitesses`: one `series`, variable « la vitesse — l'appareil ajuste l'ISO », constants
  scene, framing, aperture `f/8`, tripod. Slots `l2-rue-1-500`, `l2-rue-1-30`, `l2-rue-1-2`, all
  essential. The animateur shoots them in `M` + ISO auto so that the aperture really is constant
  (in `S` it would change between shots). This never appears on screen. 1/2 s needs dusk, blue
  hour or deep shade.
- `le-flou-choisi`: three `images`: `l2-trainees` (essential), `l2-icm` (essential),
  `l2-file` (useful). The same street outing can supply the panning shot, car light trails and
  the missing `l2-sujet-bouge`.
- Until the photographs exist, each slot shows its specification, as for every other slot.

## Risks / Trade-offs

- [Seven non-practice screens between ex. 1 and ex. 2 (positions 3 to 9)] → Accepted for now:
  two of them are short demonstrations and one is the interactive. When session 2 is trimmed,
  `points-de-depart` or `deux-flous-en-images` are the first candidates to merge or drop.
- [Session 2 grows by four screens net, already far past the spec's about eighteen] → Accepted;
  the user will trim in a later pass.
- [Light trails need a dim room; a lit room overexposes at 1 s even at the smallest aperture] →
  The screen shows dimming as a stage direction; ex. 3 works with the lights on.
- [People press the button and shake the camera during the light trails] → The self-timer step.
- [The street photos need specific light (dusk) and a tripod] → Noted in the slot specifications;
  until then the placeholders show what to shoot.
- [A slowdown of ×250 can't show `1/15`, the speed used in ex. 1] → Accepted: the demo is about
  the mechanism, and the exercise shows the result at `1/15`.
- [`le-flou-choisi` repeats ex. 2 and ex. 3 visually] → Intended: seeing the result is the goal of
  the exercise.
