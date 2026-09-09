## 1. The hub's reference-sheet cards

- [x] 1.1 In `src/src/pages/index.astro`, replace the `<ul class="liste-simple">` block with `<div class="grille">` and one `.carte` per sheet, matching `src/src/pages/fiches/index.astro` element for element: `<span class="etiquette">`, `<h3>`, optional `<p>`
- [x] 1.2 Use the same label rule as `/fiches` — « Séance N » when the sheet declares a `seance`, « Référence » when it does not — so no sheet is unlabelled
- [x] 1.3 Give the sheets the same sort as `/fiches`: `rang`, then `titre.localeCompare(…, 'fr')`
- [x] 1.4 Confirm the section heading « Les fiches, une par une » still reads correctly above cards rather than above a list

## 2. The `.liste-simple` alignment defect

- [x] 2.1 In `src/src/styles/carrefour.css`, make `.liste-simple li` a flex container and give `.liste-simple a` `width: 100%`, so the link stretches to its row's height
- [x] 2.2 Keep `display: block` on the link — the lesson sommaire stacks two spans inside it
- [x] 2.3 Comment the rule with the defect it fixes, not with the property it sets

## 3. Verification

- [x] 3.1 `npm run build` — 119 pages, no error
- [x] 3.2 Inspect `dist/index.html` and confirm each of the seven sheets renders as `<a class="carte">` with a label, a title, and its `sousTitre`
- [x] 3.3 Confirm the hub's card order matches `/fiches`
- [x] 3.4 `npm run verifier` — phone width, print, projection, and links
- [x] 3.5 Look at the hub at phone width and at desktop width and confirm rows align and no row scrolls horizontally
- [x] 3.6 Look at `/lecons/1` and confirm the screen tiles in a block now align to a common height

## Definition of Done

- The hub's three sections are built from one card component, and a reference sheet on the hub
  says what it is for.
- The hub's sheet order and `/fiches`' sheet order cannot diverge.
- No row of tiles is ragged, on the hub or on a lesson sommaire.
- `npm run build` and `npm run verifier` pass.
