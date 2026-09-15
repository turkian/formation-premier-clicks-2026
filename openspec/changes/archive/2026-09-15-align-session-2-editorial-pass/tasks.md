## 1. Trim verbose `aparte`s

- [x] 1.1 Bloc `vitesse`, écran `deux-flous`: remove the sentence "Cette distinction revient à
      chaque diagnostic de la séance." from `aparte`, keeping only the stabilizing-factors
      sentence. Verify by reading the screen's rendered `aparte` and confirming only one
      sentence remains.
- [x] 1.2 Bloc `iso`, écran `le-raisonnement`: remove the sentence "Vous récupérez la souplesse
      sans avoir à y penser." from `aparte`, keeping only the auto-ISO instruction. (This is
      superseded by task 2.1 moving the cost line out of `corps` — do both edits on the same
      screen together.)

## 2. Convert three plain-prose pivot facts into static callouts

- [x] 2.1 Bloc `iso`, écran `le-raisonnement`: move the `corps` line "Ce que ça coûte : du
      bruit, de la perte de détail fin, une dynamique réduite." into a new `encadre` field with
      `ton: avertissement` and `icone: lucide:triangle-alert`; trim `aparte` per task 1.2.
      Verify by confirming `corps` no longer contains a "Ce que ça coûte" line and the screen
      declares `encadre`/`ton`/`icone`.
- [x] 2.2 Bloc `exposition`, écran `qui-decide-quoi`: split the current `aparte` — keep only
      "`Av` et `A` sont le même mode : Canon dit `Av`, les autres disent `A`. Même chose pour
      `Tv` et `S`." as `aparte`; move the Fujifilm sentence and the "Pour tous les autres :
      section 1" pointer into a new `encadre` with `ton: avertissement` and `icone:
      lucide:triangle-alert`. Verify by confirming the Fujifilm exception no longer sits in
      `aparte`.
- [x] 2.3 Bloc `exposition`, écran `l-effet-secondaire`: replace the `aparte` "⚠️
      **L'ouverture n'est pas la mise au point.** …" with an `encadre` carrying the same text
      minus the hand-typed `⚠️`, plus `ton: avertissement` and `icone: lucide:triangle-alert`.
      Verify with `grep -n "⚠️" src/src/content/lecons/2.yaml` returning no match.

## 3. Split `la-decision` (bloc `vitesse`)

- [x] 3.1 Rewrite `la-decision` to keep only the claim, the figer/laisser-voir list, and the
      shortened aparte ("Votre choix dépend de ce que vous voulez raconter : c'est la question 3
      de votre fiche."), per design.md § Decision 1. Verify the five-row table is no longer in
      this screen's `corps`.
- [x] 3.2 Add a new écran `points-de-depart` immediately after `la-decision` in bloc `vitesse`,
      carrying the five-row situation/speed table and the claim "Des points de départ, pas des
      règles.", per design.md § Decision 1. Verify with `npm run verifier:contenu` (from `src/`)
      that the lesson still validates, and that the new screen appears between `la-decision` and
      `deux-flous` in `2.yaml`.

## 4. Convert `quatre-situations` into an activité + reveal pair (bloc `exposition`)

- [x] 4.1 Replace `quatre-situations` with `la-question-de-vitesse` (`repere`, `variante:
      activite`, the four situations as a numbered `corps` list, no `etats`), in the same
      position in bloc `exposition`, per design.md § Decision 2.
- [x] 4.2 Add `vos-reponses` (`panneau`, static, no `etats`) immediately after it, carrying the
      answer table and the claim "Il n'y a pas toujours une seule bonne réponse.", per design.md
      § Decision 2. Verify with `npm run verifier:contenu` (from `src/`) that bloc `exposition`
      now declares two cumulative panels (`quand-l-appareil-se-trompe`,
      `la-compensation-en-manuel`) instead of three, and that `quatre-situations` no longer
      appears in `2.yaml`.

## 5. Verify the whole pass

- [x] 5.1 Run `npm run verifier:contenu` (from `src/`) and confirm all checks still pass,
      including "aucun écran ne s'adresse à l'animateur" and the cumulative-panel checks.
- [x] 5.2 Run `npm run dev` (from `src/`) and step through bloc `vitesse` and bloc `exposition`
      of lesson 2 in the browser — confirm the two new screens render, the three new callouts
      show a bounded, icon-tagged box, and no screen is left with leftover empty `corps` or
      `aparte` fields.
