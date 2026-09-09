## 1. Planning prerequisite

- [x] 1.1 Run `openspec sync` (or archive) on `build-formation-site` so its six delta specs land in `openspec/specs/`
- [x] 1.2 Confirm `openspec/specs/site-shell/spec.md` contains « Home hub reaches all content » including the scenario line « the current session's lesson is identifiable without reading link text in full » — this is the base the MODIFIED delta applies against
- [x] 1.3 Run `openspec validate --changes make-site-self-paced --strict` and confirm it still passes with a base present

## 2. The session-reference check (before any content is touched)

- [x] 2.1 Extend `src/scripts/verifier-contenu-final.mjs` with a check that scans every rendered string value in `content/lecons/*.yaml` and `content/marques/*.yaml` for the stem `soir` (case-insensitive; matches « ce soir », « soirée », « soirées »)
- [x] 2.2 Add the allowlist structure keyed by file and exact phrase, and populate it with exactly two entries: « photos de soirée » in `lecons/2.yaml`, « soirée critique » in `lecons/3.yaml`
- [x] 2.3 Add a second check for a session qualified by position rather than ordinal — « prochaine séance », « séance précédente » — with no allowlist, and verify « la séance 2 » does not match. « dernière séance » is deliberately NOT forbidden: on séance 3, « notre dernière séance ensemble » states a fact of structure, and the spec forbids only « next, previous, or upcoming »
- [x] 2.4 Make each failure message name the offending file, the matched phrase, and the allowlist location, so the fix is obvious from the output alone
- [x] 2.5 Run `npm run verifier:contenu`; it MUST fail. Record its violation list — this is the working inventory for sections 5 and 6, and the completeness test for them

## 3. Remove the cohort calendar

- [x] 3.1 Delete `src/src/lib/calendrier.ts` (`DATES`, `seanceCourante`, `dateLisible`) — the file, not its contents
- [x] 3.2 In `src/src/pages/index.astro`: remove the `calendrier` import, `const courante`, the `data-courante` attribute, and the « · ce soir » label
- [x] 3.3 In `src/src/pages/index.astro`: replace `typo(date ?? lecon.data.filConducteur)` with the unconditional `filConducteur`, drop `const date`, and collapse the `.map` callback back to an expression body
- [x] 3.4 In `src/src/pages/lecons/[numero]/index.astro`: remove the `dateLisible` import, `const date`, and the `${date ? ' · ' + date : ''}` suffix from the surtitre
- [x] 3.5 In `src/src/styles/carrefour.css`: remove both `.carte[data-courante]` rules and the comment above them; leave no dead selector
- [x] 3.6 Run `npm run check` and confirm no unused import or binding remains

## 4. Remove the « Commencer » card

- [x] 4.1 Delete the « Commencer » card block from `src/src/pages/lecons/[numero]/index.astro`, including the wrapping `<p>` that produced the invalid `<p><a><h3>…<p>…</p></a></p>` nesting
- [x] 4.2 Remove the now-orphaned `const arrets` and `const premier`, and drop `aplatir` from the `lib/lecon` import while keeping `nombreEtats` (still used by the block list)
- [x] 4.3 Update the file's docstring if needed so it still describes what the page does — it already argues against a « commencer » button
- [x] 4.4 Run `npm run check`, then confirm the lesson's first screen is reachable as the first entry of the first block with no extra interaction

## 5. Content pass — lessons

- [x] 5.1 `content/lecons/1.yaml`: correct « soirée » → « séance » at the block-scope uses, and « ce soir » → « cette séance » where it locates the session
- [x] 5.2 `content/lecons/1.yaml`: replace « à la prochaine séance » with the ordinal « à la séance 2 » at each cross-session reference
- [x] 5.3 `content/lecons/1.yaml` — editorial: rewrite the `le-defi` aparté's second paragraph from the imperative-with-deadline « Ouvrez ce site avant d'arriver à la prochaine séance… » to the capability statement « Ce site fonctionne hors ligne une fois qu'il a été ouvert une première fois — utile si le réseau de la salle faiblit. »
- [x] 5.4 `content/lecons/2.yaml`: correct the « soirée » and « ce soir » uses, including the two-lever table cell that reads « ce soir » in the same column as « séance 1 » — it becomes « séance 2 »
- [x] 5.5 `content/lecons/2.yaml`: leave « vos photos de soirée sont floues » untouched — « soirée » there means a party, not a session
- [x] 5.6 `content/lecons/3.yaml`: correct the « soirée » and « ce soir » uses, including the `pause` and `questions` screens — these screens stay, only their session references change
- [x] 5.7 `content/lecons/3.yaml` — editorial: rewrite the `la-suite` claim to « Ce qui compte ne se joue pas pendant ces trois séances. Ça se joue dans les six prochains mois. »
- [x] 5.8 `content/lecons/3.yaml`: leave « La soirée critique » untouched — it is a named club event

## 6. Content pass — brand sheets

- [x] 6.1 `content/marques/canon.yaml` and `content/marques/olympus-om-system.yaml`: « toute la soirée » → « toute la séance »
- [x] 6.2 `content/marques/android.yaml` and `content/marques/iphone.yaml`: « toute la soirée » → « toute la séance », and « Faites … ce soir » → « Faites … dès maintenant »
- [x] 6.3 Run `npm run verifier:contenu`; it MUST now pass, with the only `soir` matches being the two allowlisted phrases

## 7. Content pass — page templates

- [x] 7.1 `src/src/pages/index.astro`: « Trois soirées pour sortir du mode automatique » → « Trois séances … »
- [x] 7.2 `src/src/pages/lecons/[numero]/index.astro`: « Cette soirée traite une seule question » → « Cette séance … »
- [x] 7.3 `src/src/pages/lecons/[numero]/index.astro`: replace the footer's « revenir dans trois semaines » — it assumes a weekly cadence — with wording that does not depend on when it is read
- [x] 7.4 Update the « soirée » wording in the docstrings of `pages/lecons/[numero]/index.astro` and `components/IndexBlocs.astro` for consistency (not rendered, so not covered by the check)

## 8. Record the authoring rule

- [x] 8.1 Add the session-reference rule to `openspec/config.yaml` `context`, beside the French-Québec typography conventions: refer to a session by ordinal, never by a clock, a date, or a moment relative to the reader
- [x] 8.2 Note in that rule that the check in `scripts/verifier-contenu-final.mjs` enforces it, and that the two allowlisted « soirée » uses are deliberate

## 9. Verification

- [x] 9.1 `npm run verifier:tout` passes
- [x] 9.2 Hub: the three séance cards render as peers — no accent border, no « ce soir », each showing its `filConducteur`
- [x] 9.3 Lesson sommaire: no « Commencer » control; the block and screen list is the first content after the header
- [x] 9.4 Hub and sommaire read correctly at phone width with no horizontal scrolling
- [x] 9.5 Project `lecons/3.yaml`'s rewritten `la-suite` claim at 4:3 (1024 × 768) and confirm it stays within the projection legibility floors — it grew from 77 to 95 characters at the largest type tier
- [x] 9.6 Grep the built `dist/` for `ce soir`, `cette soirée`, and `prochaine séance` and confirm the only remaining `soir` matches are the two allowlisted phrases
- [x] 9.7 Run `openspec validate --changes make-site-self-paced --strict`
