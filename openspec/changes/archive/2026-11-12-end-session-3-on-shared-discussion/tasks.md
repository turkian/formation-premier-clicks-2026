## 1. Session 3 ends on the shared discussion

- [x] 1.1 In `src/src/content/lecons/3.yaml`, set `titre` to « Composer, puis progresser » and `filConducteur` to « Apprendre à voir → composer → aller au-delà → progresser » (design D3); verify `question` is unchanged and `grep -n 'Composer, choisir' src/src/content/lecons/3.yaml` returns nothing
- [x] 1.2 Delete the `le-raw`, `mon-flux`, `mes-astuces`, `imprimer` and `montrez-vos-photos` screens (with the `l3-expositions` slot and the comment above `mes-astuces`); verify `grep -n -E 'le-raw|mon-flux|mes-astuces|imprimer|l3-expositions' src/src/content/lecons/3.yaml` returns nothing
- [x] 1.3 Delete the `et-maintenant` block and its separator comment; verify `grep -n -i -E 'et-maintenant|parrain|question-de-fin' src/src/content/lecons/3.yaml` returns nothing
- [x] 1.4 Retitle the `apprentissages` block and rewrite its `ouverture` with design D3's wording, leaving `pourquoi-pour-qui` untouched; verify `git diff` shows no change inside `pourquoi-pour-qui`
- [x] 1.5 Add the `progresser` repère (variante `cloture`) after `pourquoi-pour-qui` with design D3's wording and no `aparte`; verify it is the last screen of the file
- [x] 1.6 Update the header comment and the comment above the `apprentissages` block (design D4); verify neither mentions « Et maintenant ? », the editing workshop, or the animateur's testimony alone
- [x] 1.7 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass, including the `soir` stem check

## 2. Content corrections outside session 3

- [x] 2.1 In `src/src/lib/lexique.ts`, replace « à votre parrain ensuite » with « à un membre ensuite » (design D3); verify `grep -rn -i parrain src/src` returns nothing
- [x] 2.2 In `src/src/content/marques/iphone.yaml` and `android.yaml`, remove the phrase saying Lightroom is the software used in session 3 (design D3); verify `grep -rn 'séance 3' src/src/content/marques` returns nothing and both notes still read as complete sentences

## 3. Integration checks

- [x] 3.1 Build with `SEANCES_TOUJOURS_PRETES=1` and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `apprentissages/ouverture` and `apprentissages/progresser` don't overflow at 1024 × 768 or 16:9 and read correctly at phone width
- [x] 3.2 Run `npm run verifier:tout` in `src/`; verify it passes, including links and rank-based session names
- [x] 3.3 Read session 3 on the built site; verify it has 25 screens in 6 blocks, slide 24 is « Pourquoi, et pour qui », slide 25 is « Progresser, et continuer d'aimer ça » with the label « Pour finir », and nothing follows it
- [x] 3.4 Run `openspec validate end-session-3-on-shared-discussion --strict`; verify the change is valid

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` no longer requires « Et maintenant ? », RAW or the exhibition montage in session 3.
