## 1. Title-only repère screens are centered

- [x] 1.1 In `src/src/components/ecrans/Repere.astro`, derive `titreSeul` (no `corps`, `colonnes`, `termes` or `aparte`) and render `data-titre-seul` on the screen, next to `data-dense`; verify with `npm run build` in `src/` that no page of sessions 1–3 carries `data-titre-seul` yet (`grep -rl data-titre-seul dist` returns nothing)
- [x] 1.2 In `src/src/styles/lecon.css`, add a `.repere[data-titre-seul]` rule beside the existing `.repere[data-dense]` rules: `text-align: center`, `justify-items: center`, claim box centered; comment it in French like its neighbours; verify the rule is the only diff in the file and that the phone breakpoint does not override `text-align`

## 2. Session 3's ending screens

- [x] 2.1 In `src/src/content/lecons/3.yaml`, set the `ouverture` claim of `apprentissages` to « Prenez ce qui vous sert. Contournez les règles quand c'est nécessaire. » and delete its `corps`; verify the screen has only `id`, `genre`, `variante`, `titre` and `claim`
- [x] 2.2 Turn `pourquoi-pour-qui` into `genre: repere`, `variante: transition`, keep its `id` and `titre`, set its claim to « Aimez vos photos. » and delete its `corps`; verify the `id` is unchanged in `git diff`
- [x] 2.3 Delete the line « Des photographes du club racontent leur parcours. » (and the blank line after it) from `progresser`; verify its body now starts with the first question and its four questions are unchanged
- [x] 2.4 Rewrite the comment above the `apprentissages` block so it no longer says the body of « Pourquoi, et pour qui » is in the first person, and keep the block's `resume` unchanged; verify `grep -n 'première personne' src/src/content/lecons/3.yaml` no longer matches that comment
- [x] 2.5 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 3. Integration checks

- [x] 3.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify `apprentissages/ouverture` and `apprentissages/pourquoi-pour-qui` are centered with no overflow at 1024 × 768 and 16:9, and fit phone width without horizontal scroll
- [x] 3.2 Open slides 23, 24 and 25 of session 3 in the dev server; verify the labels read « Bloc 6 sur 6 », « On enchaîne », « Pour finir », that 23 and 24 are centered line by line, and that another repère with a body (e.g. session 3's pause) is still left-aligned
- [x] 3.3 Run `npm run verifier:tout` in `src/` and `openspec validate simplify-session-3-ending --strict`; verify both pass

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` states the new opener claim, « Aimez vos photos. » and the title-only centering rule.
