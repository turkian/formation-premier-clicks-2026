# Tasks

## 1. Content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, delete the `aparte` block of the `nettoyer` panel (« **Personne ne regarde ses quatre coins naturellement** : … change tout. »); verify with `git diff` that only those lines are removed and the `claim`, `colonnes` and credits are unchanged
- [x] 1.2 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `composition/nettoyer` has no overflow at 1024 × 768 and 16:9 and fits phone width
- [x] 2.2 Open `/lecons/3/composition/nettoyer/` in the dev server; verify no aside appears between the cards and the photo credits
- [x] 2.3 Run `openspec validate remove-nettoyer-aside --strict`; verify it passes

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « Session 3's « Nettoyer » panel has no aside ».
