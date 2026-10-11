## 1. Sensor chain component

- [x] 1.1 Create `src/src/components/interactifs/ChaineDuCapteur.astro` drawing the four steps of design D3 in SVG with the theme tokens and `interactif.css` (photosite filling with light, weak waveform with hiss, amplifier, digit groups and a small image); verify each step is labelled and the current step label is readable at 1024 × 768 from the projection scale
- [x] 1.2 Add the ISO slider with discrete stops `100` to `6400`, usable from the start with all four stations shown (no back/forward stepper); verify raising the ISO grows the waveform and its hiss together, the photosite of step 1 keeps the same fill, and the step 4 image brightens with the volume
- [x] 1.3 Register the component as `chaine-du-capteur` in `components/interactifs/registre.ts`; verify the build succeeds with the right name and fails on a misspelled one

## 2. ISO and noise component

- [x] 2.1 Rework `IsoEtBruit.astro` per design D7: sliders « La lumière captée » (seven qualitative steps) and « Le volume — l'ISO » (`100` to `6400`, seven steps), exposure `E = lumière + volume − k`, noise following the light collected only, scaled by the displayed brightness; remove the blur filter; verify the four scenarios of the interactive-components delta spec (little light + low ISO too dark and not cleaner; little light + correct ISO noisy; plenty of light clean; too much volume too bright)
- [x] 2.2 Add the readout (« trop sombre » / « bien exposée » / « trop claire » and the hint at the correct ISO for the current light); verify it is readable from the back at 1024 × 768 and fully visible at phone width

## 3. ISO block content

- [x] 3.1 Rename the `iso` block of `src/src/content/lecons/2.yaml` to « L'ISO, le bouton du volume » with the summary « Il n'ajoute pas de lumière : il monte le son. »; verify the title and summary in the built session page
- [x] 3.2 Add `qu-est-ce-que-l-iso` as the first screen: a panel with two `colonnes` (lente — 100 ISO / rapide — 400, 1600 ISO) per design D2, ASA in `aparte`; verify it stays near 100 words and contains no `soir`
- [x] 3.3 Add `l-iso-aujourd-hui` (interactif, `chaine-du-capteur`) as the second screen, with the « sensibilité » sentence in `aparte`; verify it states the sensor has a single sensitivity and ISO is an amplification
- [x] 3.4 Add `l-iso-eclaircit` (ex. 1: `M`, `f/5.6`, `1/125`, ISO auto off, `100` → `800` → `6400`, ISO auto back on, phone equivalent, brand-sheet pointer in `aparte`) as the third screen; verify it fits the « appareil en main » layout at 1024 × 768 and only the ISO changes between photographs
- [x] 3.5 Keep `le-raisonnement` in fourth position walking one example (gym basketball) as two paths that rejoin — aperture first or speed first, both landing on `f/4`, `1/500 s`, too dark, ISO about `3200`, with no noise warning and no ISO auto aside (moved to 3.10); verify no sentence of the screen presents ISO as the cause of noise
- [x] 3.6 Add `d-ou-vient-le-bruit` (grain ≠ noise headline, microphone image, `ton: regle` box with « Le meilleur ISO est celui qui expose correctement votre sujet. Ne sous-exposez jamais pour éviter le bruit. ») per design D6; verify it stays near 100 words and fits at 1024 × 768
- [x] 3.7 Add `le-bruit-dans-l-ombre` (ex. 2: `A`/`Av` with ISO auto, one photo of a scene with a lamp or window and a dark corner, read the ISO, zoom into the shadows then the lit area, phone equivalent about lost shadow detail) per design D5; verify the same layout check and no `soir`
- [x] 3.8 Remove `nette-et-bruitee` (the `iso-et-bruit` simulator) from the block, keeping the component unused in the code, and drop its aside; verify no link points to it (`npm run verifier:liens`)
- [x] 3.9 Rewrite `nette-ou-propre` as one series « même lumière, trois issues » with an easy recipe (variable « comment on obtient la luminosité »; constants one dim room, mode `M`, `f/5.6`; essential slots `l2-iso-nette-bruitee` 1/125 s ISO 6400, new `l2-iso-eclaircie` 1/125 s ISO 400 brightened afterwards on a phone or computer, `l2-iso-propre-floue` 1/8 s ISO 400) with the caption of design D8 and no aside; verify the three placeholders show their specifications, their bottoms align, all three are essential in the shot list, and the deep link still resolves
- [x] 3.10 Add `m-et-iso-auto` as the last screen (photographer fixes aperture and speed, camera sets the volume, `A` stays the starting point; rule box introducing the `+/−` exposure compensation, which moves the ISO in `M` with ISO auto; ISO auto limit `3200` or `6400` and brand-sheet section 3 in the aside); verify `votre-point-de-depart` still recommends `A`/`Av` and « Quand l'appareil se trompe » refers back to the button instead of introducing it
- [x] 3.11 Read the built `iso` block in order against design D1 and the lessons delta spec: eight screens, film → chain → exercise, no screen calling ISO the cause of noise; verify by walking the screens with the keyboard

## 4. Compensation across session 2

- [x] 4.1 Rework `MoletteDesModes.astro`: add an « ISO auto » toggle and an ISO column; in `M` with ISO auto, attribute the ISO to the camera and show compensation acting on the ISO; with it off, keep the « sans effet » explanation; verify both `M` scenarios of the interactive-components delta spec and that `A` and `S` are unchanged
- [x] 4.2 *(screen later removed, see 7.1)* Rewrite `qui-decide-quoi` (« Les quatre modes ») with the ISO column, « l'appareil (ISO auto) » in every row and the `M` row « Il ne décide plus que l'ISO — si l'ISO auto est activé. »; verify the table fits at 1024 × 768
- [x] 4.3 *(screen later removed, see 7.1)* Rewrite `la-compensation-en-manuel` (« La question qui prouve ») with the question « En `M`, le `+/−` déplace l'ISO. Et en `A`, en `S` ? », the answer table of design D10 and the closing state on manual being slower; verify the answer says compensation does nothing in `M` only with a fixed ISO
- [x] 4.4 *(screen later removed, see 7.1)* Rewrite the `M` step of `le-tour-de-la-molette` to « tournez le `+/−` et regardez l'ISO bouger »; verify it matches ISO auto being on since exercise 1

## 5. Brand pages, sheets and diagnostic

- [x] 5.1 Replace the compensation-in-`M` sentence in the « Rappel » of the six `content/marques/*.yaml` and in `content/fiches/avant-de-declencher.md` with « En `M` avec l'ISO auto, le `+/−` déplace l'ISO sur la plupart des boîtiers récents. Avec un ISO fixe, il ne fait rien. »; verify with `grep -rn` (excluding `dist` and `copie-locale`) that no unqualified « ne fait rien en M » or « l'appareil ne décide rien » remains in content
- [x] 5.2 Update the lexique's `ISO` and `Bruit` entries in `content/fiches/lexique-des-termes.md` per design D10; verify the built lexique renders them with Québec typography and no JavaScript
- [x] 5.3 Update the « bruitée » first cause in `src/src/lib/diagnostic.ts` (« Il manquait de lumière — l'ISO a dû monter », correction adding « ne sous-exposez pas pour l'éviter ») and the « Bruitée » cause in `content/fiches/ma-photo-est-ratee.md` (« pas assez de lumière captée »); verify the diagnostic component and the printed sheet agree, and `npm run verifier:modele` still passes

## 6. Verification

- [x] 6.1 Run `npm run build` in `src/` and verify it succeeds
- [x] 6.2 Run `npm run verifier:contenu` and verify all checks pass (no animateur-facing text, sessions named by rank, no `soir`)
- [x] 6.3 Run `npm run verifier` and `npm run verifier:liens` on a build with session 2 enabled; verify no screen of the `iso` and `exposition` blocks overflows at 1024 × 768 or 16:9 and no link is broken
- [x] 6.4 Open `l-iso-aujourd-hui`, `explorer-la-molette` and `qui-decide-quoi` at phone width and verify every control is usable by touch and every readout is fully visible
- [x] 6.5 Run `openspec validate redo-iso-block --strict` and verify the change is valid

## 7. End of session 2

- [x] 7.1 Remove everything after the ISO block in `src/src/content/lecons/2.yaml` (break, `exposition`, `ateliers`, `diagnostic`, `vers-la-seance-3`); verify `npm run verifier:liens` finds no broken link
- [x] 7.2 Add the closing block `repartir` per design D11 (compensation reference panel `plus-clair-plus-sombre` in `cartes`, challenge with no session 3 reminder and no aside, closing question) and update the session's `filConducteur`; verify the three screens fit at 1024 × 768 and contain no `soir`
- [x] 7.3 Lower check 13.2 of `scripts/verifier-contenu-final.mjs` to at least one cumulative panel, with a comment on why; verify `npm run verifier:contenu` passes
- [x] 7.4 Update session 2's topics on the « plan de cours » page (`src/src/pages/plan-de-cours.astro`): drop the modes, workshops and diagnostic, name the ISO as amplification, `M` + ISO auto, compensation and the challenge; verify the page builds
