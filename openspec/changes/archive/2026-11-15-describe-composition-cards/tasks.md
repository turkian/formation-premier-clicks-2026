## 1. Card bodies

- [x] 1.1 In `src/src/content/lecons/3.yaml`, `simplifier`: set « Un seul sujet » `corps` to « Un seul élément à regarder, rien autour pour lui faire concurrence. » and « Se rapprocher » `corps` to « Assez près pour lire l'expression, la texture, le détail. »; verify « Remplir le cadre » is unchanged in `git diff`
- [x] 1.2 `nettoyer`: set « Les quatre coins » `corps` to « Des coins sans intrus : ni poteau, ni poubelle, ni bras coupé. » and « L'arrière-plan d'abord » `corps` to « Un fond calme, choisi en premier ; le sujet se détache devant. »; verify the panel's `claim` and `aparte` are unchanged
- [x] 1.3 `donner-de-la-profondeur`: set « Le point de vue » `corps` to « Accroupi ou en hauteur, plutôt qu'à la hauteur des yeux. »
- [x] 1.4 Check that `git diff` on `3.yaml` touches exactly five `corps` lines and nothing else; then read every remaining `colonnes[].corps` of session 3's `panneau` screens and verify none is an imperative, a test addressed to the reader or a usual-fault diagnosis
- [x] 1.5 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `composition/simplifier`, `composition/nettoyer` and `composition/donner-de-la-profondeur` have no overflow at 1024 × 768 and 16:9 and fit phone width
- [x] 2.2 Open the three panels in the dev server; verify the typography utility renders the non-breaking spaces before `:` and `;` in the new bodies
- [x] 2.3 Run `npm run verifier:tout` in `src/` and `openspec validate describe-composition-cards --strict`; verify both pass

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « Session 3 concept panel cards describe the technique ».
