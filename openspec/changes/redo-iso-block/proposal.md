## Why

Session 2's ISO block is three screens of talk with no camera in hand. It never says what ISO
*is*, and it teaches the most common misconception about it: that ISO causes noise. The block,
the `iso-et-bruit` component, the lexique and the « ma photo est ratée » sheet all tie noise to
a high ISO, when noise comes from too little light collected and ISO only makes it visible.
Separately, the site says in a dozen places that `+/−` does nothing in `M`, while participants
are told to keep ISO auto on — with which, on most recent bodies, compensation shifts the ISO
in `M`.

## What Changes

- Rename the block « L'ISO, le bouton du volume », with the summary « Il n'ajoute pas de
  lumière : il monte le son. »
- Open with two explanation screens, like the speed block's shutter screen:
  1. **what ISO is**, from the film era: a sensitivity bought by the roll, fast films with bigger
     crystals and visible grain, the ISO (formerly ASA) number;
  2. **what ISO is in a digital camera**: a new interactive chain, all four stations shown at once — light fills the sensor,
     becomes a weak analog signal, is amplified (the ISO, the « volume »), then converted to
     numbers. The everyday word « sensibilité » is kept, and the screen says once that the sensor
     has a single sensitivity and that ISO is an amplification.
- Add two **« appareil en main »** exercises:
  1. **l'ISO éclaircit**: in `M`, a fixed aperture and speed, ISO auto off, ISO `100` → `800` →
     `6400`, compare the brightness; the last step turns ISO auto back on;
  2. **le bruit dans l'ombre**: one photograph at a high ISO of a scene with lit and dark areas,
     zoomed in on the camera screen — the shadows are noisy, the lit areas clean, at the same ISO.
- Add a concept panel on where noise comes from: film grain and digital noise look alike but do
  not come from the same place; noise is in the light collected, ISO makes it visible; « le
  meilleur ISO est celui qui expose correctement votre sujet ». Never under-expose to avoid noise.
- Keep `le-raisonnement` (f/4, 1/500, turn up the volume).
- Rework the `iso-et-bruit` component: its inputs become the **light collected** and the **ISO
  as volume**; noise follows the light, brightness follows light × volume, with a « bien
  exposée » band. Its screen is then dropped from the block in favour of the real photographs;
  the component stays in the code, unused.
- Replace the two-image `nette-ou-propre` demonstration with one series, « même lumière, trois
  issues »: ISO 6400 correctly exposed, ISO 400 under-exposed and brightened afterwards, ISO 400
  at 1/8 s blurred. Its caption says the clean one is clean because it collected more light.
- End the block with `M` + ISO auto: « vous fixez l'ouverture et la vitesse, l'appareil règle le
  volume », presented as the mode for the day you want both, not as a new default (`A` stays the
  default).
- In the `exposition` block, reframe compensation as **acting on what the camera still decides**:
  `A` → speed, `S` → aperture, `M` + ISO auto → ISO, `M` with a fixed ISO → nothing. This changes
  « Les quatre modes », « La question qui prouve », « Qui décide quoi » (the `molette-des-modes`
  component) and « Appareil en main — la molette ». (These screens were later removed with the
  rest of the session after the ISO block; see below.)
- End session 2 right after the ISO block, like session 1: remove the break, the exposition and
  modes block, the workshops, the diagnostic block and the session 3 preparation block, and add a
  closing block — a reference panel on which way to turn the `+/−` scene by scene, and why the
  camera errs, a challenge, and a closing
  question.
- Correct the same statement in the six brand pages' « Rappel », the « Avant de déclencher »
  sheet, and the lexique's `ISO` and `Bruit` entries; « ma photo est ratée » names lack of light
  as the cause of noise.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `lessons`: the ISO block opens with two explanation screens, alternates them with two hands-on
  exercises in `M`, explains where noise comes from and ends on `M` + ISO auto, which introduces exposure
  compensation; session 2 then ends on a session-1-style closing block.
- `interactive-components`: a new sensor-chain component; the ISO and noise component models
  light collected and amplification separately; the mode dial shows `M` with and without ISO auto.
- `demo-media`: the essential « nette / propre » pair becomes an essential three-image series;
  the metering-failure pairs leave the essential list with the diagnostic block.

## Impact

- `src/src/content/lecons/2.yaml`: the `iso` block rewritten (three screens → eight); everything
  after it replaced by a three-screen closing block; the session's `filConducteur` updated.
- `src/scripts/verifier-contenu-final.mjs`: the site-wide minimum of cumulative panels (check 13.2)
  lowered from 3 to 1, since session 2 no longer carries any.
- `src/src/pages/plan-de-cours.astro`: session 2's topics follow the new ending.
- `src/src/components/interactifs/`: a new sensor-chain component registered in `registre.ts`;
  `IsoEtBruit.astro` and `MoletteDesModes.astro` reworked.
- `src/src/content/marques/*.yaml` (six « Rappel » notes), `content/fiches/avant-de-declencher.md`,
  `content/fiches/lexique-des-termes.md`, `content/fiches/ma-photo-est-ratee.md`.
- Shot list: `l2-iso-nette-bruitee` and `l2-iso-propre-floue` kept, one new slot for the
  brightened under-exposure.
- Session 2 grows by five screens net, on top of the speed block's growth. Cuts stay deferred.
- `npm run verifier:contenu`, `npm run verifier` and `npm run verifier:liens` must still pass;
  in particular, no « soirée » in the film screen. `nette-ou-propre` keeps its id;
  `nette-et-bruitee` is removed.
- No new dependencies. The speed block, session 1 and session 3 are unchanged.
