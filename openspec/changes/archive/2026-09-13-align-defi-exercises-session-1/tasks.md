## 1. Content edit — site

- [x] 1.1 In `src/src/content/lecons/1.yaml`, on the `le-defi` écran's `corps` list, replace
      "Une photo où le mouvement est figé" and "Une photo où le mouvement est visible" with
      "Une photo où vous avez choisi l'endroit précis de la mise au point" and "Une photo où
      l'on voit clairement d'où vient la lumière", keeping the other three items and the
      trailing "Si elles sont ratées..." line unchanged.
- [x] 1.2 Load the `le-defi` screen (leçon 1, bloc `repartir`) and confirm the list now reads
      five items with the two new ones in place, still fitting the panel's projection floor.

## 2. Content edit — docs

- [x] 2.1 In `docs/Session 1/formation_photo_session_1.md`, under "Le défi", apply the same
      two-item replacement to the five-item list so its wording matches the site verbatim.
- [x] 2.2 In `docs/Documents/feuillets-a-remettre.md`, under "Feuillet 1 · Le défi", apply the
      same two-item replacement to the printed checklist so its wording matches the site
      verbatim.

## 3. Verification

- [x] 3.1 Run `npm run verifier:contenu` (from `src/`) and confirm it passes, including the
      "soir"-radical check unaffected by this edit.
- [x] 3.2 Diff the exercise list across `src/src/content/lecons/1.yaml`, `docs/Session
      1/formation_photo_session_1.md`, and `docs/Documents/feuillets-a-remettre.md` and confirm
      all three read identically.
