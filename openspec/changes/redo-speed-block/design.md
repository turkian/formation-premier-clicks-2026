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
- Rewriting `deux-flous-en-images`.
- The rolling-shutter distortion of an electronic shutter, or flash sync. The note on electronic shutters stays one sentence.
- Cutting screens elsewhere in session 2 to make room (deferred, see Risks).

## Decisions

### D1. Screen sequence

```
retour   … rappel-leviers → deux-nouveaux-leviers        (le-programme removed)

vitesse
 1  l-obturateur            interactif         obturateur component; aparte: electronic shutter
 2  la-molette-de-vitesse   appareil-en-main   ex. 1 · neighbour's waving hand, 1/500 then 1/15 (moved, rewritten)
 3  la-decision             panneau            two choices in columns, a photograph under each
 4  trois-vitesses          demonstration      series: one street, 1/500 · 1/30 · 1/2 s
 5  points-de-depart        panneau            ten situations as cards, grouped by choice
 6  deux-flous              panneau            table kept; adds the 1/focale rule and the tripod
 7  deux-flous-en-images    demonstration      unchanged
 8  le-flou-choisi          demonstration      images: light trails · ICM · panning
 9  les-trainees            appareil-en-main   ex. 2 · camera still, the light moves
10  le-flou-voulu           appareil-en-main   ex. 3 · the scene still, the camera moves

`explorer-le-mouvement` (the `vitesse-et-mouvement` interactive) is removed: each thing it showed
is now on another screen — the two blurs in `deux-flous` and its photographs, the correction in
the table, its presets in the `points-de-depart` cards, and the feel of each speed in the three
exercises. The component stays registered, unused.
```

`trois-vitesses` goes right after `la-decision` so that « figer, ou laisser voir » is seen at once,
and its middle image shows that it is a range, not two options. `le-flou-choisi` goes just before
the exercises so the room sees the result before trying it.

Alternatives considered: one exercise after each concept screen was rejected because exercises 2
and 3 only make sense after `deux-flous`. Putting the light trails and ICM in atelier station 2
was rejected: the point is to practise during the presentation, not after a long talk.

### D1b. The decision as two columns

`la-decision` states « deux choix » and sets them side by side: **Figer** and **Laisser voir le
mouvement**, each a card with a one-line body and a demonstration photograph below
(`l2-figer`, `l2-laisser-voir`, both useful — the essential comparison is `trois-vitesses`).
Concept panels gain an optional `colonnes` field (two or three cards, the same shape as the
repère columns plus an optional photograph); the shot list collects those photographs. In
projection the cards fill the panel's body row and the photograph takes the remaining height,
so it fits at 4:3 and 16:9; at phone width the cards stack and the photograph is 3:2.

### D1c. Starting points as cards, grouped by choice

`points-de-depart` drops its five-row table for three rows of four cards. The first and last are
titled with the two choices of `la-decision`; the middle one, « Entre les deux », shows the range
between them, as `trois-vitesses` does with its `1/30 s` image, without making it a third choice:

- **Figer**: a bird in flight `1/2000 s`, sports `1/1000 s`, a child running `1/500 s`, someone
  walking `1/250 s`;
- **Entre les deux**: a musician or a dancer `1/60 s`, passers-by in the street `1/30 s`, a
  waterfall that keeps its texture `1/15 s` (camera braced), waves on rocks `1/8 s` (tripod);
- **Laisser voir le mouvement**: panning `1/30 s`, a silky river `1/4 s` to `1 s`, fireworks `2`
  to `4 s`, car headlights `10` to `30 s`.

Four cards per row. The speeds follow common recommendations. Left out: a dog running (it needs
`1/1000 s`, not `1/500 s`), splashing water (it duplicates `1/2000 s`, and frozen drops call for
a flash) and a lamp drawing (the headlights already show light trails, and exercise 2 does it).

Each card has an inline icon, the situation, the speed in body size and, for slow speeds, the
support on a line of its own (« sur trépied », « appareil posé », « appareil appuyé »). Group
titles sit in a narrow column left of their cards so three rows fit at 4:3; the grid has as
many columns as the largest group, so a short row keeps the same card width. Concept panels
gain an optional `cartes` field for this: groups, each a title and icon over its cards.

### D1d. The hand-held rule and the tripod

`deux-flous` keeps its table and gains a rule box (`ton: regle`): « À main levée, la règle du
pouce : au moins `1/focale` », with `50 mm` → `1/50 s` and `200 mm` → `1/200 s`, then « appuyez-
vous, ou posez l'appareil sur un trépied » for anything slower. The aside says what the tripod
does and does not fix — your shake, never the subject's, which is the screen's distinction — that
stabilization lets you go slower, and that on an APS-C sensor the focal length is multiplied by
1.5 first. It avoids stops, which are introduced later.

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

- **Ex. 1, la main:** `S`/`Tv`; find the speed dial; photograph a neighbour's waving hand, so both of the photographer's hands stay on the camera; `1/500`, then `1/15`; compare. The phone
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
tokens and `interactif.css`, like `VitesseEtMouvement.astro`. No photograph.

Behind the curtains, the sensor carries a drawn landscape that brightens as it is exposed, so
the sensor reads clearly apart from the curtains. Each line's exposure is `(τ − y·T) / t`,
clamped to `[0, 1]`: a line darkens to nothing while covered by the front curtain, brightens
only while uncovered, and is fully exposed exactly when the back curtain covers it. Being linear
in `y`, it is drawn as one dark gradient overlay whose two stops move with `τ`.

Beside the sensor, a second panel, « la photo », shows the same exposure with no curtain in
front: it builds up during the release and shows the finished image once the shutter has
closed, which the sensor panel, covered by the back curtain, cannot. Registered in
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

- [Six non-practice screens between ex. 1 and ex. 2 (positions 3 to 8)] → Accepted for now:
  three of them are short demonstrations. Removing `explorer-le-mouvement` already took one
  out; if session 2 needs more trimming, `deux-flous-en-images` is the next candidate.
- [Session 2 grows by three screens net, already far past the spec's about eighteen] → Accepted;
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
