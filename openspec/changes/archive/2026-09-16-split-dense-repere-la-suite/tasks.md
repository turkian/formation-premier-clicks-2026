## 1. Build-time enforcement

- [x] 1.1 Add a new section to `src/scripts/verifier-contenu-final.mjs` (after the existing 13.6
  demonstration image-count check) that, for every écran with `genre: repere` in each lesson,
  fails verification when its `corps` is authored as an enumerated or bulleted markdown list AND
  its `aparte` is non-empty, naming the lesson and écran id in the failure message.
- [x] 1.2 Run `npm run verifier:contenu` against current content and confirm it fails on exactly
  one écran (`3/et-maintenant/la-suite`) and passes on every other repère screen across all three
  lessons.

## 2. Split `3/et-maintenant/la-suite`

- [x] 2.1 In `src/content/lecons/3.yaml`, split the `la-suite` écran into two repère screens
  within the `et-maintenant` block:
  - the first keeps the `la-suite` id and carries the near-term logistics items (la prochaine
    sortie photo, un parrain pour chacun, où poser une question bête), with no aparte;
  - the second gets a new id and carries the ongoing-engagement items (le défi mensuel, la
    soirée critique), plus the retouching-workshop mention moved from the removed aparte into its
    corps as a list item, with no aparte.
- [x] 2.2 Give the new screen its own `claim`, consistent with the split-screen authoring pattern
  used for demonstration screens (each half gets its own claim, not a fragment of the original).
- [x] 2.3 Verify: `npm run verifier:contenu` no longer flags this bloc.

## 3. Full verification

- [x] 3.1 Build with `SEANCES_TOUJOURS_PRETES=1 npm run build` and run
  `node scripts/verifier.mjs projection` to confirm both new screens render fully within
  1024×768 and 1280×720, with no `.ecran.repere` overflow reported.
- [x] 3.2 Run `npm run verifier:tout` and confirm it proceeds past the `verifier` step (this was
  the step that previously failed and blocked the `&&` chain from reaching
  `verifier:hors-ligne`).
- [x] 3.3 Visually check `/lecons/3/` and the `et-maintenant` block summary list both resulting
  screens, in order, alongside the block's other screen.
