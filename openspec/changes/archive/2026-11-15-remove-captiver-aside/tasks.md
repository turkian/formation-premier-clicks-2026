# Tasks

## 1. Content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, delete the `aparte` block of the `au-dela/captiver` panel (« Un exemple célèbre, qu'on ne peut pas montrer ici : Elliott Erwitt… »); verify with `git diff` that only those lines are removed and the `claim`, `colonnes` and credits are unchanged
- [x] 1.2 In the same file, reword the comment above the `au-dela` block so it no longer says Erwitt is named in an aside (only Cartier-Bresson and Crewdson are, in « Faire imaginer »); verify with `grep -n Erwitt src/src/content/lecons/3.yaml` that no line claims Erwitt is shown or named on screen
- [x] 1.3 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `au-dela/captiver` has no overflow at 1024 × 768 and 16:9 and fits phone width
- [x] 2.2 Open `/lecons/3/au-dela/captiver/` in the dev server; verify no aside appears between the cards and the photo credits, and the « Faire imaginer » aside is still there
- [x] 2.3 Run `openspec validate remove-captiver-aside --strict`; verify it passes

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « Session 3's « Captiver » panel has no aside ».
