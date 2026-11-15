# Tasks

## 1. Content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, delete the `aparte` block of the `faire-imaginer` panel (« Stieglitz a attendu trois heures… histoires qui ne finissent jamais. »); verify with `git diff` that only those lines are removed and the `claim`, `colonnes` and credits are unchanged
- [x] 1.2 In the same file, delete the comment « Cartier-Bresson et Crewdson sont protégés : nommés en aparté, jamais montrés. » above the `au-dela` block; verify `grep -n "Crewdson\|Cartier-Bresson" src/src/content/` returns nothing
- [x] 1.3 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `au-dela/faire-imaginer` has no overflow at 1024 × 768 and 16:9 and fits phone width
- [x] 2.2 Open `/lecons/3/au-dela/faire-imaginer/` in the dev server; verify no aside appears between the cards and the photo credits
- [x] 2.3 Run `openspec validate remove-imaginer-aside --strict`; verify it passes

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « Session 3's « Faire imaginer » panel has no aside ».
