## 1. Remove the duplicate fiches

- [x] 1.1 Delete `src/src/content/fiches/la-methode-et-les-leviers.md`,
  `composer-et-figer.md`, `developper-en-sept-gestes.md`, `recettes-d-exportation.md` and verify
  `git status` shows exactly those four removals under `src/src/content/fiches/`
- [x] 1.2 Grep the repo for the four removed ids/titles (`la-methode-et-les-leviers`,
  `composer-et-figer`, `developper-en-sept-gestes`, `recettes-d-exportation`, and their `titre:`
  strings) outside `openspec/` and verify no remaining reference in `src/`

## 2. Retire the /fiches index page

- [x] 2.1 Delete `src/src/pages/fiches/index.astro` and verify `npm run build` no longer emits a
  `/fiches/index.html` (only `/fiches/<id>/` pages remain under `dist/fiches/`)
- [x] 2.2 In `src/src/layouts/Fiche.astro`, change the breadcrumb link (currently
  `lien('/fiches')`, line ~30) and the footer "Toutes les fiches" link (currently
  `lien('/fiches')`, line ~49) to point at `lien('/')` instead, and verify `npm run
  verifier:liens` passes with no dead `/fiches` reference
- [x] 2.3 In `src/src/pages/index.astro`, remove the "Fiches de référence" card from the
  "Consulter" section (the one linking to `lien('/fiches')`) and verify the section now renders
  only the lexique and plan-de-cours cards, with "Les fiches, une par une" below still listing the
  three remaining sheets

## 3. Verify the build end to end

- [x] 3.1 Run `npm run verifier:tout` from `src/` and verify it passes (covers model, final
  content, links/impression/phone/projection/alignment, and offline checks)
- [x] 3.2 Run `npm run build` and manually open the built home page and each of the three
  remaining `/fiches/<id>/` pages, and verify each prints as a single Letter page via `npm run
  verifier:impression`
- [x] 3.3 Run `openspec validate --change remove-duplicate-fiches --strict` and verify it passes
