## 1. Schema and vocabulary

- [x] 1.1 Add `'activite'` to `ecranRepere.variante`'s `z.enum([...])` in `src/src/content.config.ts`.
- [x] 1.2 Add an `ÉTIQUETTES.activite` badge label (e.g. `Activité`) in `src/src/components/ecrans/Repere.astro`.

## 2. Phone handoff rule

- [x] 2.1 Extend `porteLeCodeQr` in `src/src/lib/lecon.ts` to return `true` for `repere` screens with `variante === 'activite'`.
- [x] 2.2 Extend the `autorise` condition in `verifierCodesQr` (`src/scripts/verifier.mjs`) with the same `activite` case.

## 3. Content split

- [x] 3.1 In `src/src/content/lecons/1.yaml`, trim the `bienvenue` écran's `corps` to the three framing bullets only, and remove its `aparte`.
- [x] 3.2 Add a new écran `tour-de-table` (`genre: repere`, `variante: activite`) right after `bienvenue` in the `accueil` bloc, with a `claim` stating the icebreaker instruction, a `corps` carrying the three numbered questions, and the `aparte` about the third question (moved from `bienvenue`).

## 4. Verification

- [x] 4.1 Run the project's content/build verification scripts (`src/scripts/verifier.mjs` and any lint/typecheck the repo defines) and confirm they pass, in particular the QR-code check for both `bienvenue` and `tour-de-table`.
- [x] 4.2 Visually check both screens in the dev server: `bienvenue` shows only the framing bullets and no QR code change beyond variante `ouverture`'s existing behavior; `tour-de-table` shows the exercise, its own badge (not "Bloc 1 sur 7"), and a QR code.
