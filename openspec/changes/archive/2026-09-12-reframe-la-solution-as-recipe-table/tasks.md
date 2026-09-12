## 1. Content edit

- [x] 1.1 In `src/src/content/lecons/1.yaml`, bloc `ouverture-et-profondeur-de-champ`, replace the
      `claim`, `corps`, and `encadre` of the `la-solution` screen with the versions pinned in
      `design.md` decisions 1, 3, and 5 (`id`, `titre`, `genre`, `ton` stay `la-solution` / `La
      solution` / `panneau` / `regle`, unchanged). Verify by diffing the edited block against
      `design.md`'s final yaml snippets, field by field.
- [x] 1.2 Confirm `le-probleme` and `exemple-fond-flou` (the screens immediately before and after)
      are untouched in the diff, and that `la-solution` remains in the same position in the bloc's
      `ecrans` list. Verify with `git diff src/src/content/lecons/1.yaml` — only `la-solution`'s
      three fields should appear changed.

## 2. Automated verification

- [x] 2.1 Run `npm run verifier:modele` (from `src/`) and confirm it passes — this checks the
      edited screen still conforms to the `panneau` content schema (required fields, table shape).
- [x] 2.2 Run `npm run verifier:contenu` and confirm it passes — this enforces the project's
      Québécois-French content rules (no relative session references, banned wording).
- [x] 2.3 Run `npm run verifier` and confirm it passes — this checks projection/téléphone/
      impression readability budgets (e.g. the concept-panel word-count ceiling) and internal
      links/alignment against the new `corps` table. (1026 checks passed; 2 pre-existing failures
      in an unrelated lesson-3 screen confirmed present with this change stashed out too.)
- [x] 2.4 Run `npm run build` (from `src/`) and confirm it completes without error.

## 3. Manual visual check

- [x] 3.1 Run `npm run dev` (from `src/`) and open the `la-solution` screen
      (`/lecons/1/ouverture-et-profondeur-de-champ/la-solution`). Confirm the table renders with
      three columns (Levier / Fond flou / Fond net) and four rows, and that the new claim and
      encadré read as intended. (Verified via headless-browser screenshot at 1024×768; table,
      claim, and encadré render exactly as designed, position counter reads 32/37.)
- [x] 3.2 Resize the browser to phone width and confirm the table stays legible in the
      single-column layout (per the `lessons` requirement that content is identical, only the
      arrangement changes between projection and phone width) — no horizontal overflow or
      truncated cells. (Verified via headless-browser screenshot at 390×844; scrollWidth ==
      clientWidth, no overflow, all four rows and both columns remain readable.)
