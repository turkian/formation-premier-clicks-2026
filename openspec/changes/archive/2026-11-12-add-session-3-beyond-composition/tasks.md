## 1. Composition ends, the pause becomes one question break

- [x] 1.1 In `src/src/content/lecons/3.yaml`, delete the `cinq-fois-le-meme-objet` screen; verify `respirer` is the composition block's last screen and `grep -n 'cinq-fois' src/src/content/lecons/3.yaml` returns nothing
- [x] 1.2 Replace the `pause` block's two screens with a single `la-pause` repère (variante `pause`) using design D3's wording: title « Pause et questions », questions on composition or anything else, show a photograph on your screen, the existing workshop aside; verify the block has one screen and contains no « papillon », « mur » or « dernière séance »
- [x] 1.3 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Archival photographs

- [x] 2.1 For each photograph in design D4, find the source file, record author, death year, date, collection and US public-domain basis, and choose the Atget photograph (an empty street, door or courtyard, no people); verify every author died before 1972, every work is public domain in the US, and no image shows a nude or partly nude figure
- [x] 2.2 Download, resize like the other demos and save them as `src/public/demos/l3-au-dela-*.jpg` (seven files); verify `ls src/public/demos/l3-au-dela-*` lists seven files of a size comparable to `l3-histoire-*.jpg`

## 3. The « Au-delà de la composition » block

- [x] 3.1 Add the block `au-dela` (titre « Au-delà de la composition », resume « Captiver, faire ressentir, faire imaginer. ») between `pause` and `apprentissages`, with a rights comment listing the D4 photographs like the `histoire` block's; verify `npm run build` succeeds in `src/`
- [x] 3.2 Add its `ouverture` repère with the three `colonnes` of design D3; verify the word « storytelling » appears nowhere in the lesson
- [x] 3.3 Add `captiver` (2 colonnes), `faire-ressentir` (3 colonnes, encadré, aparte) and `faire-imaginer` (2 colonnes), each column with its `image` slot (`priorite: utile`, `specification`, `alt`, `credit` « Auteur, année, collection »), and the asides naming Erwitt, Cartier-Bresson and Crewdson; verify every image has a credit with author, date and source, and no file of a protected photographer is referenced
- [x] 3.4 Add the `pourquoi` repère (variante `transition`) with the closing claim and the three recap `colonnes`; verify it is the block's last screen, the next screen is `apprentissages/ouverture`, and the claim uses « vous »
- [x] 3.5 Update the file's header comment (the block after the pause, the removal of the hands-on exercise, the protected photographers named in asides); verify it no longer describes the old order
- [x] 3.6 Build with `SEANCES_TOUJOURS_PRETES=1` and run `npm run verifier:projection` and `npm run verifier:telephone`; verify no `au-dela` or `pause` screen overflows at 1024 × 768 or 16:9 and the columns stack at phone width; if `faire-ressentir` overflows, apply design's mitigation in order and verify again
- [x] 3.7 Run `npm run liste-de-prises-de-vue`; verify the seven new slots appear as `utile` and the composition tier-1 slots are still `essentiel`

## 4. Integration checks

- [x] 4.1 Run `npm run verifier:tout` in `src/`; verify it passes, including rank-based session names, the `soir` stem and links
- [x] 4.2 Read session 3 from start to end on the built site; verify the block order matches `specs/lessons/spec.md`, the `au-dela` block has fewer screens than `composition`, and the lesson has 33 screens
- [x] 4.3 Run `openspec validate add-session-3-beyond-composition --strict`; verify the change is valid

## Workflow follow-up

- If the archival photographs don't suit, replace them with the club's own photographs in the same slots.
- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` carries the new requirements and no longer has the hands-on composition requirement.
