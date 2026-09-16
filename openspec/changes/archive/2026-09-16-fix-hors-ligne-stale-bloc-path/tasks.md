## 1. Fix the stale reference

- [x] 1.1 In `src/scripts/verifier-hors-ligne.mjs`, update the three `parcours` entries from
  `/lecons/1/profondeur-de-champ/...` to `/lecons/1/ouverture-et-profondeur-de-champ/...`
  (`la-definition`, `ce-qui-change-l-epaisseur`, `explorer-la-zone-nette`).
- [x] 1.2 Run `npm run build` then `npm run verifier:hors-ligne` and confirm it completes without
  an uncaught exception, with all checks against those three routes passing (both the
  with-network and offline sections, plus the `[data-pdc]` component check).
- [x] 1.3 Run `npm run verifier:tout` end to end and confirm the `verifier:hors-ligne` step is
  reached and passes (previously it was never reached because the unrelated `verifier` step
  failed first — tracked by `split-dense-repere-la-suite`).
