## Context

The change rewrites the `iso` block of `src/src/content/lecons/2.yaml`, three screens of the
`exposition` block, two interactive components, and wording in brand pages, sheets and the
diagnostic tree. It follows the speed block's redo (`2026-10-11-redo-speed-block`): explanation
of the mechanism first, then a camera in hand within minutes, then what it is for. See
proposal.md for the motivation and the specs for the requirements.

Constraints from `openspec/config.yaml`: sessions named by rank, no `soir` except the two allowed
phrases, lesson text addressed to the participants, nothing necessary in the smallest type size,
everything visible at 1024 × 768 and 16:9, about 100 words per concept panel.

Every screen kind needed already exists: `panneau` (with the optional `colonnes` added by the
speed redo), `interactif`, `appareil-en-main`, `demonstration` with a `series`.

## Goals / Non-Goals

**Goals:**
- A physical model of ISO a beginner can repeat: light collected, then the volume turned up.
- One clear correction of the noise misconception, proved on the participants' own cameras.
- One consistent story about compensation in `M` across the lesson, the components, the brand
  pages and the sheets.

**Non-Goals:**
- ISO invariance, dual native ISO, read noise versus shot noise, or stops. The block says
  « ne sous-exposez pas pour éviter le bruit » and stops there.
- Brand-by-brand detail of how compensation behaves in `M` + ISO auto; the site says « sur la
  plupart des boîtiers récents ».
- Trimming session 2 (deferred, see Risks).
- Removing the word « sensibilité » from the site.

## Decisions

### D1. Screen sequence

```
iso   « L'ISO, le bouton du volume » · Il n'ajoute pas de lumière : il monte le son.

 1  qu-est-ce-que-l-iso    panneau           ISO and film; two colonnes, lente / rapide
 2  l-iso-aujourd-hui      interactif        chaine-du-capteur (new)
 3  l-iso-eclaircit        appareil-en-main  ex. 1 · M, f/5.6, 1/125, ISO 100 → 800 → 6400
 4  le-raisonnement        panneau           two paths that rejoin, one example
 5  d-ou-vient-le-bruit    panneau           grain ≠ noise; the cause is the light
 6  le-bruit-dans-l-ombre  appareil-en-main  ex. 2 · one photo, zoom into the shadows
 7  nette-et-bruitee       interactif        iso-et-bruit, reworked
 8  nette-ou-propre        demonstration     one series, three images
 9  m-et-iso-auto          panneau           M + ISO auto, with a limit
```

`nette-et-bruitee` and `nette-ou-propre` keep their ids so that their deep links keep working.
The new ids are `qu-est-ce-que-l-iso`, `l-iso-aujourd-hui`, `l-iso-eclaircit`,
`d-ou-vient-le-bruit`, `le-bruit-dans-l-ombre` and `m-et-iso-auto`.

The noise panel (5) goes before the exercise (6) so the room knows what to look for; the
component (7) then generalizes what they saw; the series (8) shows the trade-off with real
photographs. `m-et-iso-auto` comes last because it builds on `le-raisonnement` (4) and leads into
the break and then the modes.

Alternative considered: two separate demonstrations, « bien exposée ou éclaircie » then
« nette ou propre ». They were merged into one series because it is the same scene and the same
light, and the three outcomes together tell one story.

### D2. The film screen

A concept panel with two `colonnes`, no photographs:

- **Une pellicule lente — 100 ISO**: petits cristaux, il faut beaucoup de lumière ; grand soleil ;
  image fine.
- **Une pellicule rapide — 400, 1600 ISO**: gros cristaux, moins de lumière suffit ; intérieur,
  nuit ; le grain se voit.

Claim: something like « L'ISO est un chiffre hérité de la pellicule : il dit combien de lumière
il faut pour une image bien exposée. » Aside: you changed ISO by changing film, for 24 or 36
photographs; before ISO, the number was called ASA. The word « soirée » is avoided (content check
13.5).

### D3. The sensor chain component (`chaine-du-capteur`)

Drawn in SVG with the theme tokens and `interactif.css`, like `Obturateur.astro`. Four labelled
stations, all visible from the start; the only control is the ISO:

1. **La lumière** — photons fill a photosite; label « ici se décide la quantité de lumière ».
2. **Le signal** — a weak waveform with a small hiss on it.
3. **Le volume** — an amplifier with an ISO control (`100` to `6400`); the waveform and its hiss
   grow together; the photosite from step 1 stays drawn at the same fill.
4. **Les nombres** — a few digit groups, then a small image whose brightness follows the volume.

The ISO control is a slider with discrete stops, readable from the back of the room. The
« volume » word appears in the step label, and « sensibilité » in the screen's `aparte`: « Le mot
"sensibilité" vient de la pellicule. Votre capteur, lui, n'en a qu'une. »

Alternatives considered: animating photons continuously, rejected because the animator needs
something to talk over; and a back/forward stepper revealing one station at a time, like
`l-obturateur`. The stepper was built, then removed: with the whole chain visible, moving the
ISO alone shows what grows and what does not, in one look.

### D4. Exercise 1 settings

`M`, `f/5.6`, `1/125 s`, ISO auto off, then `100`, `800`, `6400`, then ISO auto back on.
`f/5.6` is reachable by every kit lens at any focal length; `1/125 s` is hand-holdable at any
kit focal length and fast enough to remove shake from the comparison. Indoors, `100` gives an
almost black image, `800` a dark one, `6400` about right. That is the progression the screen
wants.

Steps (within the « appareil en main » limits; any surplus goes into `aparte`):
1. Passez en `M`. Réglez `f/5.6` et `1/125`.
2. Coupez l'ISO auto, et réglez `100`. Photographiez la salle.
3. Même photo à `800`, puis à `6400`. Comparez.
4. Remettez l'ISO auto.

The aside points to the brand sheet section for ISO auto. Phone: `Pro` / manual mode, ISO slider
at its lowest, then at its highest, with the speed fixed if the app allows it.

### D5. Exercise 2 settings

The camera stays in `A` / `Av` with ISO auto, so nothing needs turning off: in a lit room the ISO
auto climbs high on its own. Participants frame a scene with a lamp or window and a dark corner,
take one photograph, read the ISO on the screen, and zoom into the dark corner, then into the lit
area. The screen's wording: same photo, same ISO, the noise lives in the shadows. Phone: take a
photo of the same scene and zoom in. The phone's noise reduction smooths it, but the shadows still
lose their detail first.

Alternative considered: two photographs at fixed ISO, one under-exposed and brightened. It was
rejected for the room because brightening needs an editor; it moves to the demonstration series.

### D6. `le-raisonnement` and the noise panel

`le-raisonnement` walks one worked example — a basketball game in a gym — as two paths that
rejoin, in two `colonnes`: « la zone nette d'abord » (aperture `f/4`, then speed `1/500 s`) and
« le mouvement d'abord » (speed `1/500 s`, then aperture `f/4`). Which one comes first depends on
what the photographer wants to show. A rule box joins them: both land on `f/4`, `1/500 s`, the photo
comes out too dark, so the ISO goes up, to about `3200`. The claim says the ISO comes last. The
warning callout about noise is removed: the next screen, `d-ou-vient-le-bruit`, carries that point.
`f/4` and `1/500 s` stay, because `m-et-iso-auto` reuses the same example. Its ISO auto aside
moves to `m-et-iso-auto`.

`d-ou-vient-le-bruit` panel (≈100 words): claim contrasting grain and noise (« Le grain de la
pellicule venait de l'ISO. Le bruit numérique vient du manque de lumière. »); body with the
microphone image (« Quelqu'un chuchote : montez le volume, vous entendez le chuchotement — et le
souffle. Le souffle était là. Baisser le volume ne le fait pas partir : on n'entend plus rien »);
a rule box `ton: regle`: « Le meilleur ISO est celui qui expose correctement votre sujet. Ne
sous-exposez jamais pour éviter le bruit. »

### D7. `iso-et-bruit` rework

Two sliders: « La lumière captée » (seven steps, from « très peu » to « beaucoup », labelled
qualitatively, no stops) and « Le volume — l'ISO » (`100` to `6400`, seven steps).

- Exposure `E = lumière + volume − k`, in steps; |E| ≤ 0.5 → « bien exposée »; below → « trop
  sombre »; above → « trop claire ».
- Displayed brightness follows `E`.
- Noise visibility follows the light collected only (more light, less noise), multiplied by the
  displayed brightness so that a dark image hides its noise without being cleaner.
- A readout shows the state and a hint at the correct-exposure ISO for the current light.

The existing SVG scene, grain filter and blur are reused; the blur filter is removed, because
the component no longer simulates speed (the series in `nette-ou-propre` shows blur).

The screen's claim becomes about the right volume: « À lumière donnée, un seul ISO expose
correctement : c'est le bon. » Aside: « Le bruit se corrige en partie au développement —
séance 3. Le flou de bougé, jamais. » (kept).

### D8. The demonstration series

One `series`, variable « comment on obtient la luminosité », constants: scene, the same low
light, `f/2.8`, `35 mm`. Slots, all essential:

- `l2-iso-nette-bruitee` (kept): ISO 6400, 1/125 s, correctly exposed — sharp, noisy.
- `l2-iso-eclaircie` (new): ISO 400, 1/125 s, under-exposed by four stops, brightened in editing —
  sharp, noisier. The specification says it was brightened afterwards.
- `l2-iso-propre-floue` (kept): ISO 400, 1/8 s hand-held — clean, blurred.

Caption: the third is clean because it collected sixteen times more light, not because its ISO
is low; that light came from a slow speed, hence the blur.

### D9. `m-et-iso-auto`

Panel: « En `M` avec l'ISO auto, vous fixez l'ouverture et la vitesse, et l'appareil règle le
volume. » It is `le-raisonnement`, automated. The ISO auto limit (`3200` or `6400`) and its
brand-sheet section move here. A line says it is for when both decisions matter, and that `A`
stays the starting point, which `votre-point-de-depart` still says after the break.

### D10. Compensation across the site

« Compensation acts on whatever the camera still decides »:

| Mode | The camera decides | `+/−` moves |
|---|---|---|
| `A · Av` | the speed | the speed |
| `S · Tv` | the aperture | the aperture |
| `M` + ISO auto | the ISO | the ISO |
| `M`, fixed ISO | nothing | nothing |

- `qui-decide-quoi`: an ISO column, « l'appareil (ISO auto) » in every row; the `M` row says
  « Il ne décide plus que l'ISO — si l'ISO auto est activé. »
- `la-compensation-en-manuel`: the question becomes « En `M`, tournez le `+/−`. Qu'est-ce qui
  bouge ? » The answer state gives the table above; the last state keeps the idea that manual is
  slower because you have taken the decisions.
- `molette-des-modes`: an « ISO auto » toggle; in `M` with ISO auto, the compensation acts on the
  ISO; with it off, the current « sans effet » explanation stays.
- `le-tour-de-la-molette`: in `M`, « tournez le `+/−` et regardez l'ISO bouger » (ISO auto is
  back on since exercise 1).
- Six brand pages' « Rappel » and « Avant de déclencher »: « En `M` avec l'ISO auto, le `+/−`
  déplace l'ISO sur la plupart des boîtiers récents. Avec un ISO fixe, il ne fait rien. »
- `diagnostic.ts`, « bruitée »: the first cause becomes « Il manquait de lumière — l'ISO a dû
  monter », with a correction that adds « ne sous-exposez pas pour l'éviter ». The second cause
  (under-exposed then brightened) is unchanged.
- Lexique: `ISO` « La sensibilité — en fait, le volume du signal du capteur. Plus haut = plus
  clair, sans ajouter de lumière »; `Bruit` « Le grain coloré qui apparaît quand la lumière
  captée manque. Un ISO élevé le rend visible ».
- « Ma photo est ratée », « Bruitée »: cause « pas assez de lumière captée ».

`deux-nouveaux-leviers` keeps « La sensibilité » (the everyday term).

## Risks / Trade-offs

- [Session 2 grows by six more screens] → Accepted for now; trimming is a later pass across the
  whole session. Candidates in this block: fold `d-ou-vient-le-bruit` into the aside of
  `nette-et-bruitee`, or drop `qu-est-ce-que-l-iso`'s columns into the sensor chain screen's aside.
- [`M` appears before « Les quatre modes »] → Exercise 1 uses it as a lab setting (« on fige
  tout sauf l'ISO »); the modes block after the break names it properly.
- [A participant leaves exercise 1 with ISO auto off] → Its last step turns it back on, and
  `le-tour-de-la-molette` checks ISO auto again before the workshops.
- [Some bodies ignore compensation in `M` + ISO auto] → The wording says « la plupart des
  boîtiers récents »; the hands-on step has them look, so a body that does nothing is a finding,
  not a contradiction.
- [In exercise 2, phone noise reduction hides the noise] → The phone equivalent talks about lost
  detail in the shadows, not grain.
- [The four-stop brightened image depends on the sensor; some show little difference] → The
  animator shoots it on their own camera; the caption says « autant ou plus de bruit ».
