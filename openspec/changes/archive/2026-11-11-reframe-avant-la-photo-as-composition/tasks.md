# Tasks

## 1. Session 3 content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, set the `avant-la-photo` claim to « La composition est plus vieille que la photographie. »; verify the claim reads exactly that
- [x] 1.2 Replace the `avant-la-photo` aside with: « En 1797, le graveur **John Thomas Smith** publie des conseils pour dessiner le paysage. Il ne dit pas *quoi* dessiner, mais **comment l'arranger** : quelle place donner au ciel, à la terre, à l'eau. C'est ça, composer. »; verify the aside contains neither « tiers », « grille », « cases » nor « Maj »
- [x] 1.3 Set the `valeur` of `l3-histoire-smith` to « Smith, 1797 — le ciel, la terre, l'eau : chacun à sa place » and that of `l3-histoire-smith-regle` to « Smith, 1797 — des règles pour arranger un paysage »; verify that `specification`, `alt`, `credit`, `priorite` and `loupeImages` are unchanged and that no other screen in the file has changed (`git diff` touches only `avant-la-photo`)

## 2. Colon after emphasized or code text

- [x] 2.1 In `src/src/lib/typo.ts`, let the colon rule also match a `:` at the start of the string (the text that follows `</strong>`, `</em>` or `</code>` in the Markdown tree); verify `typo(' : suite')` returns a thin non-breaking space before `:`, `typo('10:30')` and `typo('https://x')` are unchanged, and `typo(typo(s)) === typo(s)` for these inputs
- [x] 2.2 Add a check 13.8 to `src/scripts/verifier-contenu-final.mjs` that renders every Markdown string of the lessons, brand sheets and reference sheets through the site's Markdown pipeline and fails if a `:` outside `<code>` is preceded by a breakable space; verify it fails with the fix from 2.1 reverted and passes with it

## 3. Integration checks

- [x] 3.1 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/` after group 1; verify both pass
- [x] 3.2 Run `npm run verifier:modele` and `npm run verifier:contenu` again after group 2; verify both pass
- [x] 3.3 Open `/lecons/3/histoire/avant-la-photo/` in the dev server; verify the new claim, aside and captions render with French typography (thin non-breaking spaces before `:`, including after `**comment l'arranger**`), the Shift hint appears only once, and the screen fits at 1024 × 768
- [x] 3.4 Run `openspec validate reframe-avant-la-photo-as-composition --strict`; verify the change is valid (re-run after the artifact update)

## Workflow follow-up

- Archive the change once it is implemented and reviewed, then check that the `lessons` spec's first-history-screen scenario describes composition, not the rule of thirds.
