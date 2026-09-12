## 1. Replace `le-vote` with `la-question` and `la-reponse`

- [x] 1.1 In `src/src/content/lecons/1.yaml`, bloc `ouverture-et-profondeur-de-champ`, replace
      the `le-vote` écran (id, `etats`, and all) with the `la-question` écran exactly as
      specified in `design.md` §2, in the same position in the bloc's `ecrans` list.
- [x] 1.2 Immediately after `la-question`, add the `la-reponse` écran exactly as specified in
      `design.md` §3.
- [x] 1.3 Replace the doc comment currently above `le-vote` ("★ Panneau cumulatif nº 2 : le
      vote...") with the short comment described in `design.md` §6, describing the new
      activity-then-static-panel shape.
- [x] 1.4 Verify: `le-vote` no longer appears anywhere in `src/src/content/lecons/1.yaml`
      (`grep -n le-vote src/src/content/lecons/1.yaml` returns nothing), and the bloc
      `ouverture-et-profondeur-de-champ` now lists, in order, `ouverture`, `la-question`,
      `la-reponse`, `le-f-est-une-division`, `deux-retombees`, followed by whatever screens
      already came after `deux-retombees`.
- [x] 1.5 Verify neither "à main levée" nor "moitié-moitié" nor "petit chiffre, grand trou"
      appear anywhere in `src/src/content/lecons/1.yaml`
      (`grep -n "main levée\|moitié-moitié\|petit chiffre" src/src/content/lecons/1.yaml`
      returns nothing) — confirming the dropped instruction, aside, and rule are gone, not
      just moved.
      Note: the loose grep also matches two pre-existing, unrelated occurrences unrelated to
      `le-vote` (a top-of-file comment example at line 6, and the closing screen
      `derniere-question`'s own show-of-hands at line ~672) — confirmed via `git diff` these
      predate this change. The exact removed phrases ("moitié-moitié", "petit chiffre, grand
      trou") return zero matches.

## 2. Verify against the project's own checks

- [x] 2.1 Run `npm run verifier:tout` (from `src/`) and confirm it passes — the yaml still
      matches the `lecons` content schema, contains no forbidden `soir`-radical reference, and
      passes the general content/link/offline checks.
      Note: initial run failed §13.2 ("panneaux cumulatifs ... au moins 5 attendus") — a
      hardcoded threshold in `src/scripts/verifier-contenu-final.mjs` that assumed at least 5
      cumulative panels project-wide. This change intentionally converts `le-vote` (a
      4-état cumulative panel) into two non-cumulative screens, dropping the count from 5 to 4.
      Confirmed with the user out-of-band: lowered the threshold from `>= 5` to `>= 4` in that
      script (one-line change, unplanned by design.md, which called this a content-only change).
- [x] 2.2 Run `npm run verifier:projection`, `npm run verifier:telephone`, and
      `npm run verifier:alignement` and confirm all pass — `la-question` and `la-reponse` stay
      within the projection/phone readability thresholds as single-view screens.
      All three pass cleanly (196, 121, 363 checks respectively, no failures). `verifier:tout`
      and `verifier:projection` both also report 2 pre-existing, unrelated overflow warnings in
      leçon 3's `et-maintenant/la-suite` screen — confirmed unrelated via `git diff --stat`
      (only `1.yaml` touched by this change) and non-fatal (both runs exit 0).
- [x] 2.3 Run `npm run build` and confirm it completes with no errors.
      119 pages built, exit 0. Confirmed `dist/lecons/1/ouverture-et-profondeur-de-champ/`
      contains `la-question/index.html` and `la-reponse/index.html`, no `le-vote/` directory.
- [x] 2.4 Run `npm run dev`, open leçon 1, and step through `ouverture-et-profondeur-de-champ`
      to confirm the room-facing order and content: `la-question` (the question, plus the
      one-minute table-discussion instruction, no reveal) → `la-reponse` (the `f/2.4` answer
      and the reassurance for `f/22` answers, fully visible on first view, no click-through) →
      `le-f-est-une-division` (unchanged interactive simulator, still opening on the 24 mm/
      200 mm comparison with its own division arithmetic and "quart de tarte" line rendering
      unprompted).
      Verified via Playwright (chromium-cli unavailable in this environment) against the dev
      server at all three URLs: `la-question` shows only the claim and the one-minute
      instruction, no reveal; `la-reponse` shows the `f/2.4` answer, the corps text, and the
      encadré reassurance, all visible on first load; `le-f-est-une-division` renders unchanged,
      opening on 24 mm/f/2.8 with its own division equation and "quart de tarte" line. No
      console errors on any of the three pages. Screenshots confirmed the layout visually.
