# Tasks

## 1. Session 3 content

- [x] 1.1 Delete the `diaporama` block (screen `le-diaporama`, image `l3-diaporama`) and its separator comment from `src/src/content/lecons/3.yaml`; verify `retour` is now the first block and `bilan` its first screen, and that the `retour` summary « Vos photos d'abord, … » is unchanged
- [x] 1.2 Run `node scripts/liste-de-prises-de-vue.mjs` in `src/`; verify `l3-diaporama` no longer appears in the shot list

## 2. Integration checks

- [x] 2.1 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass
- [x] 2.2 Build with `SEANCES_TOUJOURS_PRETES=1` and run `npm run verifier:liens`; verify no link points to `/lecons/3/diaporama/…`
- [x] 2.3 Open session 3's lesson index and first screen on the built site; verify the blocks appear in the order in `specs/lessons/spec.md` and the first screen asks « Avez-vous pris des photos depuis la séance 2 ? Qu'avez-vous appris ? »
- [x] 2.4 Run `openspec validate drop-session-3-montage --strict`; verify the change is valid

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that the `lessons` spec's session 3 requirement no longer mentions the participants' montage.
