## 1. Replace `le-vote` with `la-question` and `la-reponse`

- [ ] 1.1 In `src/src/content/lecons/1.yaml`, bloc `ouverture-et-profondeur-de-champ`, replace
      the `le-vote` écran (id, `etats`, and all) with the `la-question` écran exactly as
      specified in `design.md` §2, in the same position in the bloc's `ecrans` list.
- [ ] 1.2 Immediately after `la-question`, add the `la-reponse` écran exactly as specified in
      `design.md` §3.
- [ ] 1.3 Replace the doc comment currently above `le-vote` ("★ Panneau cumulatif nº 2 : le
      vote...") with the short comment described in `design.md` §6, describing the new
      activity-then-static-panel shape.
- [ ] 1.4 Verify: `le-vote` no longer appears anywhere in `src/src/content/lecons/1.yaml`
      (`grep -n le-vote src/src/content/lecons/1.yaml` returns nothing), and the bloc
      `ouverture-et-profondeur-de-champ` now lists, in order, `ouverture`, `la-question`,
      `la-reponse`, `le-f-est-une-division`, `deux-retombees`, followed by whatever screens
      already came after `deux-retombees`.
- [ ] 1.5 Verify neither "à main levée" nor "moitié-moitié" nor "petit chiffre, grand trou"
      appear anywhere in `src/src/content/lecons/1.yaml`
      (`grep -n "main levée\|moitié-moitié\|petit chiffre" src/src/content/lecons/1.yaml`
      returns nothing) — confirming the dropped instruction, aside, and rule are gone, not
      just moved.

## 2. Verify against the project's own checks

- [ ] 2.1 Run `npm run verifier:tout` (from `src/`) and confirm it passes — the yaml still
      matches the `lecons` content schema, contains no forbidden `soir`-radical reference, and
      passes the general content/link/offline checks.
- [ ] 2.2 Run `npm run verifier:projection`, `npm run verifier:telephone`, and
      `npm run verifier:alignement` and confirm all pass — `la-question` and `la-reponse` stay
      within the projection/phone readability thresholds as single-view screens.
- [ ] 2.3 Run `npm run build` and confirm it completes with no errors.
- [ ] 2.4 Run `npm run dev`, open leçon 1, and step through `ouverture-et-profondeur-de-champ`
      to confirm the room-facing order and content: `la-question` (the question, plus the
      one-minute table-discussion instruction, no reveal) → `la-reponse` (the `f/2.4` answer
      and the reassurance for `f/22` answers, fully visible on first view, no click-through) →
      `le-f-est-une-division` (unchanged interactive simulator, still opening on the 24 mm/
      200 mm comparison with its own division arithmetic and "quart de tarte" line rendering
      unprompted).
