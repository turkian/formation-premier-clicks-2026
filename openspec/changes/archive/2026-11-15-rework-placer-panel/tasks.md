# Tasks

## 1. Find the photograph

- [x] 1.1 Search the Musée McCord Stewart, BAnQ and Bibliothèque et Archives Canada first, then the Met, Rijksmuseum and Library of Congress open-access collections, for a picture meeting design D3: a subject in profile or moving across the frame, placed in the outer third, with most of the frame ahead of it. Record two or three candidates with accession number, author, death year, date and rights line; verify each is in the public domain in Canada (author dead before 1972; Notman & Son after 1891 judged on its date). US status is not required, as decided during implementation
- [x] 1.2 Pick one candidate, check it at full resolution and confirm the pick with the presenter; verify the direction and the room in front can be seen at a glance, and that the picture shows no nudity
- [x] 1.3 Compare the chosen picture with every `src/public/demos/l3-*.jpg`; verify neither the picture nor another print of its negative is already used in session 3

## 2. Image file

- [x] 2.1 Download the file, crop any mount, caption or album margin, resize it like the other `l3-compo-*` demos and save it as `src/public/demos/l3-compo-espace-devant.jpg`; verify its size is comparable to `l3-compo-tiers.jpg` and that the crop keeps the room in front of the subject

## 3. Lesson content

- [x] 3.1 In `src/src/content/lecons/3.yaml`, delete the `aparte` block of the `placer` panel (« **La règle des tiers est un point de départ, pas une loi.** … trace les tiers pour vous. »); verify with `git diff` that the `claim` and the two existing columns are unchanged
- [x] 3.2 Add a third column to `placer` after `Le centre assumé`, as in design D2: `titre: L'espace devant`, `icone: lucide:move-right`, `corps: Plus de place du côté où le sujet regarde ou avance.`, and an `image` with `id: l3-compo-espace-devant`, `specification` (picture, author, date, collection, then where the space is), French `alt`, `credit` « Auteur, année, collection » and `priorite: essentiel`; verify the panel has exactly three columns in the order of the spec
- [x] 3.3 Update the composition block's rights comment as in design D4: add the `espace-devant` line between `centre` and `accroupi`, change « seize » to « dix-sept » and the Québec count if needed; verify the comment lists seventeen slots, one per `l3-compo-*` image id
- [x] 3.4 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass
- [x] 3.5 Run `npm run liste-de-prises-de-vue -- --manquantes` in `src/`; verify `l3-compo-espace-devant` is listed as `essentiel` and is not missing (or, under design D3's fallback, is the only missing `l3-compo-*` slot)

## 4. Integration checks

- [x] 4.1 Build with `SEANCES_TOUJOURS_PRETES=1`, then run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `composition/placer` does not overflow at 1024 × 768 or 16:9 and its three cards stack at phone width
- [x] 4.2 Open `/lecons/3/composition/placer/` at 16:9 and at 1024 × 768; verify the claim fits on one line at 16:9, no aside appears between the cards and the credits, « point de départ » and « 1797 » appear nowhere on the screen, the credit line names the « Photo du centre » and the « Photo de droite », and the thirds line and the room in front can still be pointed at
- [x] 4.3 Run `npm run verifier:tout` in `src/` and `openspec validate rework-placer-panel --strict`; verify both pass

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « Session 3's « Placer » panel shows three placements and no aside » and that the composition-block scenario no longer mentions 1797.
