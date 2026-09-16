## 1. Build-time enforcement

- [x] 1.1 Add a new section to `src/scripts/verifier-contenu-final.mjs` that, for every `écran`
  with `genre: demonstration` in each lesson, sums `images.length` (free images) with the length
  of every `series[].images` array, and fails verification when that total exceeds 3, naming the
  lesson and écran id in the failure message.
- [x] 1.2 Run `npm run verifier:contenu` against current content and confirm it fails on exactly
  the four known écrans (`lumiere/la-lumiere-en-images`, `diagnostic/le-cas-du-posemetre`,
  `composition/avant-apres`, `mise-au-point/ou-le-point-a-ete-fait`) and passes on every other
  demonstration screen.

## 2. Split `1/lumiere/la-lumiere-en-images`

- [x] 2.1 In `src/content/lecons/1.yaml`, split the 4-image "direction de la lumière" series into
  two new écrans of 2 images each (frontale+latérale, contre-jour+dessus), each with its own
  `id`, `claim`, and the series' `variable`/`legende` adjusted to describe its half.
- [x] 2.2 Move the existing 2-image "qualité de la lumière" series into its own écran, unchanged
  in content, with a new `id` and `claim`.
- [x] 2.3 Remove the now-empty original `la-lumiere-en-images` écran.
- [x] 2.4 Verify: `npm run verifier:contenu` no longer flags this bloc, and `npm run build` (with
  `SEANCES_TOUJOURS_PRETES=1`) produces three separate routes under `/lecons/1/lumiere/`.

## 3. Split `2/diagnostic/le-cas-du-posemetre`

- [x] 3.1 In `src/content/lecons/2.yaml`, split the écran into two: one carrying the "neige"
  series (2 images), one carrying the "contre-jour" series (2 images), each with its own `id` and
  `claim`.
- [x] 3.2 Move the écran's `aparte` (the unphotographed "scène sombre" third case) onto the second
  of the two new écrans.
- [x] 3.3 Verify: `npm run verifier:contenu` no longer flags this bloc, and the two new routes
  under `/lecons/2/diagnostic/` render correctly.

## 4. Split `3/composition/avant-apres`

- [x] 4.1 In `src/content/lecons/3.yaml`, split the écran into two: one carrying the "distance au
  sujet" series (2 images), one carrying the "hauteur du point de vue" series (2 images), each
  with its own `id` and `claim`.
- [x] 4.2 Verify: `npm run verifier:contenu` no longer flags this bloc, and the two new routes
  under `/lecons/3/composition/` render correctly.

## 5. Split `1/mise-au-point/ou-le-point-a-ete-fait`

- [x] 5.1 In `src/content/lecons/1.yaml`, keep the existing 3-image series
  (œil/oreille/arrière-plan) on the original écran `id`, unchanged.
- [x] 5.2 Move the single free image (`l1-hors-focus`) to a new sibling écran with its own `id`
  and a new `claim` carrying the point currently made by the écran's `aparte` text ("le point est
  ailleurs — le décor est net"); move or rephrase the `aparte` accordingly.
- [x] 5.3 Verify: `npm run verifier:contenu` no longer flags this bloc, and the new route under
  `/lecons/1/mise-au-point/` renders correctly.

## 6. Full verification

- [x] 6.1 Run `npm run verifier:tout` and confirm it passes with no failures.
- [x] 6.2 Build with `SEANCES_TOUJOURS_PRETES=1` and re-run the Playwright measurement used during
  exploration against all nine resulting demonstration screens at both 4:3 (1024×768) and 16:9
  (1920×1080), confirming every screen now shows 3 or fewer images and no image renders smaller
  than the smallest baseline 2-image screen measured before this change (473×315 px at 4:3).
- [x] 6.3 Confirm no bloc's bloc-opener screen or lesson summary is affected by the added écrans
  beyond the expected screen count increase (visually check `/lecons/1/`, `/lecons/2/`,
  `/lecons/3/` summaries list every new screen).
