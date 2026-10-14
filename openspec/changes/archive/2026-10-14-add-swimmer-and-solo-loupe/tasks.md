## 1. Content schema

- [x] 1.1 Add optional `imagesParRang` (integer ≥ 1) and `loupeImages: { zoom }` (`zoom` a number
      ≥ 1) to `ecranDemonstration` in `src/src/content.config.ts` (design D1), and verify
      `npm run check` passes. (It reports 6 pre-existing errors — missing `@types/node` and
      `qrcode` declarations — identical before the change; none from it.)
- [x] 1.2 Verify existing lesson YAML still validates unchanged with `npm run verifier:modele`.

## 2. Wrapped free photographs

- [x] 2.1 In `Demonstration.astro`, chunk the free photographs by `imagesParRang` into several
      `.rang > .serie`, each carrying the loupe marks itself (see design D2), and count them in `nombreDeRangs`
      (design D2); verify by diffing the built HTML of `deux-flous-en-images` and a lesson 1
      demonstration before and after — identical when `imagesParRang` is absent.
- [x] 2.2 In `creditDeLEcran` (`src/src/lib/demos.ts`), split `ecran.images` into rows of
      `imagesParRang` (design D4); verify with a temporary 2 × 2 credit that the footer reads
      « Photo de gauche, rangée du bas : … » at projection width and « Troisième photo : … » at
      phone width, and that `la-decision`'s credit is unchanged.

## 3. Single-photograph loupe

- [x] 3.1 When `loupeImages` is declared, mark each free `.serie` with `data-loupe` (the zoom) and
      `data-loupe-mode="seule"`, pass `loupe` to each free `EmplacementDemo`, and render the hint
      once after the last free rang; verify in `npm run dev` that the hint shows on desktop and
      disappears in touch-device emulation and print preview.
- [x] 3.2 Teach the loupe script (`.serie[data-loupe]`) a `seule` mode, placing the
      loupe on every frame in linked mode and on the pointed frame only (hiding the others) in
      `seule` mode (design D3); verify on a temporary `loupeImages` that only the pointed photo
      magnifies, that the loupe follows the pointer from one photo to the next across rows, and
      that releasing Shift or leaving the photos removes it.
- [x] 3.3 Verify Shift + click does not enlarge a free photograph under `loupeImages`, and that
      plain click still enlarges it to its full frame.
- [x] 3.4 Verify the linked loupe is unchanged: on `nette-ou-propre` and `trois-vitesses`, Shift
      over one photo still magnifies the same point on every photo of the series.

## 4. The swimmer on « le flou choisi »

- [x] 4.1 Move `images/589725087_1532477997838301_1665073980922124573_n.jpg` to
      `src/public/demos/l2-nageur.jpg` and remove the empty `images/` folder; verify the file is
      2048 × 1365 and `git status` no longer lists `images/`.
- [x] 4.2 In `src/src/content/lecons/2.yaml`, add the `l2-nageur` slot after `l2-file` with the
      specification, `valeur`, `alt` and `priorite: utile` of design D6 and no `credit`, and add
      `imagesParRang: 2` and `loupeImages: { zoom: 3 }` to `le-flou-choisi`; verify
      `npm run liste-de-prises-de-vue` lists `l2-nageur` as useful and present.
- [x] 4.3 Verify in `npm run dev` that `le-flou-choisi` shows trainées and ICM on the first row,
      panning and the swimmer on the second, that the swimmer's label appears on hover, and that
      at × 3 the loupe shows the face sharp and the hand soft.

- [x] 4.4 Make the series subgrid rule in `lecon.css` actually apply (`.serie > figure.emplacement`):
      the component's own `.emplacement` rows, same specificity and loaded later, overrode it, so
      at 1024 × 768 the swimmer's two-line label shrank its photo below its neighbour's; verify
      both photos of the row measure the same height.
- [x] 4.5 Let content rule 13.6 (« 3 photographies au plus ») exempt a demonstration screen whose
      every photograph is under a loupe (`loupeImages`, and `loupe` on every series) — decided with
      the animator; verify `npm run verifier:contenu` passes, and fails on `le-flou-choisi` once
      `loupeImages` is removed.
- [x] 4.6 Add a screen-level `etiquettes: agrandissement` (default `survol`) that drops the resting
      label, so it shows only once an image is enlarged, and set it on `le-flou-choisi`; verify that
      pointing at the swimmer shows no label, enlarging it does, the photos gain the freed line
      (swimmer 285 → 315 px at 1080p), and `nette-ou-propre` keeps its hover labels.

## 5. Whole-site checks

- [x] 5.1 Run `npm run verifier:projection` and confirm `le-flou-choisi` stays entirely visible at
      1024 × 768 and 16:9, hint and credit included. (`le-flou-choisi` passes; the run reports
      4 pre-existing overflows on the two lesson 1 « la lumière en images » screens, present before
      this change.)
- [x] 5.2 Run `npm run verifier:telephone` and `npm run verifier:impression`, and confirm the four
      photos stack in order on a phone and print without loupe or hint.
- [x] 5.3 Run `npm run build` and `npm run verifier:tout`, and confirm they pass. (Build, model,
      content and offline checks pass; `verifier` reports only the 4 lesson 1 overflows, identical
      on a clean checkout of `HEAD`.)
