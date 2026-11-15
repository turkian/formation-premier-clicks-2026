## 1. Session 3's ending screens

- [x] 1.1 In `src/src/content/lecons/3.yaml`, move the `pourquoi-pour-qui` screen after `progresser` in the `apprentissages` block; verify with `git diff` that both screens keep their `id` and that `progresser` now directly follows `ouverture`
- [x] 1.2 Set `progresser` to `variante: transition`, leaving its `titre`, `claim` and four questions unchanged; verify its body still starts with the first question
- [x] 1.3 Set `pourquoi-pour-qui` to `variante: cloture` and its `titre` to « Le mot de la fin », keeping « Aimez vos photos. » as its only text; verify the screen has only `id`, `genre`, `variante`, `titre` and `claim`
- [x] 1.4 Set the block's `resume` to « Progresser sans perdre le plaisir. »; verify `grep -n 'club racontent' src/src/content/lecons/3.yaml` no longer matches the `resume`
- [x] 1.5 Rewrite the file header (lines about « Pourquoi, et pour qui » and « La séance se termine sur cette discussion ouverte ») and the comment above `apprentissages` so they say the session ends on « Aimez vos photos. », the animateur's last word, after the discussion; verify `grep -n 'termine sur' src/src/content/lecons/3.yaml` only matches the new wording
- [x] 1.6 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass

## 2. Integration checks

- [x] 2.1 Open slides 23, 24 and 25 of session 3 in the dev server; verify the labels read « Bloc 6 sur 6 », « On enchaîne », « Pour finir », that slide 25 shows « Aimez vos photos. » alone and centered, and that its next arrow is faded
- [x] 2.2 Open the session 3 plan page; verify the block shows « Progresser sans perdre le plaisir. » and lists « Progresser, et continuer d'aimer ça » before « Le mot de la fin »
- [x] 2.3 Run `npm run verifier:tout` in `src/` and `openspec validate end-session-3-on-love-your-photos --strict`; verify both pass

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` names « Le mot de la fin » as session 3's last screen and no longer requires the club in the block's summary.
