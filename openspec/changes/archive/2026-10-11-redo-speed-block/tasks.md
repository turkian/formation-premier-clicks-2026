## 1. Recap

- [x] 1.1 Remove `le-programme` from the `retour` block of `src/src/content/lecons/2.yaml`; verify with `grep -rn "le-programme" src/src` (excluding `dist` and `copie-locale`) that nothing links to it, and that `deux-nouveaux-leviers` is the last screen of the block in the build

## 2. Shutter component

- [x] 2.1 Create `src/src/components/interactifs/Obturateur.astro` with the timeline model from design D5 (travel `T` = 1/250 s, back curtain starting at `t`, ×250 slowdown) drawing a sensor and two curtains in SVG; verify at `1/60 s` the whole sensor is uncovered between the two travels and at `1/2000 s` only a slit an eighth tall ever is
- [x] 2.2 Add the « déclencher » button, the three labelled phase steps (back/forward) and the speed presets `1/60`, `1/250`, `1/2000`; verify stepping forward from closed shows front curtain → exposed → back curtain, with the slit halfway across at `1/2000`
- [x] 2.3 Show the selected speed and « au ralenti, 250 fois » at a size readable from the back of the room; under `prefers-reduced-motion`, make « déclencher » jump through the phases; verify both in the browser (emulating reduced motion)
- [x] 2.4 Register the component as `obturateur` in `components/interactifs/registre.ts`; verify the build fails on a misspelled name and succeeds with the right one

## 3. Speed block content

- [x] 3.1 Add `l-obturateur` (interactif, `obturateur`) as the first screen of `vitesse`, with the electronic-shutter note in `aparte`; verify the screen reads alone and the note is one sentence
- [x] 3.2 Move `la-molette-de-vitesse` to second position and rewrite it as ex. 1 (`S`/`Tv`, speed dial, `1/500` then `1/15`, compare), keeping its id and phone equivalent; verify the deep link `…/vitesse/la-molette-de-vitesse/` still resolves and no step sets an ISO value
- [x] 3.3 Add `trois-vitesses` after `la-decision`: a series with variable « la vitesse — l'appareil ajuste l'ISO », constants (scene, framing, `f/8`, tripod) and essential slots `l2-rue-1-500`, `l2-rue-1-30`, `l2-rue-1-2`; verify the three placeholders show their specifications
- [x] 3.4 Add `le-flou-choisi` after `explorer-le-mouvement`: images `l2-trainees` (essential), `l2-icm` (essential), `l2-file` (useful); verify the placeholders and their priorities in the shot list
- [x] 3.5 Add `les-trainees` (ex. 2: `S`/`Tv` at `1 s`, camera resting, 2-second self-timer, phone flashlight, dimmed lights as a shown stage direction, link to « le sujet bouge », phone equivalent); verify it fits the « appareil en main » layout at 1024 × 768 and contains no `soir`
- [x] 3.6 Add `le-flou-voulu` (ex. 3: `S`/`Tv` at `1/4` then `1/2 s`, move the camera before and during the release, no tripod, link to « vous bougez », phone equivalent) as the last screen of the block; verify the same
- [x] 3.7 Read the built `vitesse` block in order against design D1 and the lessons delta spec: three exercises, all `S`/`Tv`, each with a phone equivalent, nothing explaining ISO; verify by walking the screens with the keyboard

## 4. Verification

- [x] 4.1 Run `npm run build` in `src/` and verify it succeeds
- [x] 4.2 Run `npm run verifier:contenu` and verify all checks pass (no animateur-facing text, sessions named by rank, no `soir`)
- [x] 4.3 Run `npm run verifier` and `npm run verifier:liens` on a build with session 2 enabled; verify no screen of the `vitesse` block overflows at 1024 × 768 or 16:9 and no link is broken
- [x] 4.4 Open the shutter screen at phone width and verify every control is usable by touch and the readout is fully visible
- [x] 4.5 Run `openspec validate redo-speed-block --strict` and verify the change is valid
