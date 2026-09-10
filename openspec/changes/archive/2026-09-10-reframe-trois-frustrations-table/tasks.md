## 1. Rewrite `trois-frustrations`

- [x] 1.1 In `src/src/content/lecons/1.yaml`, replace `trois-frustrations`'s `corps` with a
      **Problème / Pourquoi / Comment faire** table, keeping its original three rows (portrait
      rapproché, macro gros plan, `f/16` et exposition trop longue — reframed from "`f/16` est
      inutile" to name the actual problem, the slow shutter it forces). `id`/`titre`/`claim` stay
      unchanged.
- [x] 1.2 Remove the paragraph trailing the table (the `f/16`/shutter-speed sentence) — its content
      is now in the `f/16` row.
- [x] 1.3 Remove the `aparte` field entirely — its portrait-fix content is now redundant with that
      row, and its negatively-framed opening line is what this change removes.

## 2. Add `paysage-deux-causes`

- [x] 2.1 Add a new `panneau` screen immediately after `trois-frustrations` in the same bloc:
      `id: paysage-deux-causes`, `titre: Le paysage a deux causes de flou possibles`,
      `claim: Un paysage flou n'a pas toujours la même cause.`, with a two-row **Problème /
      Pourquoi / Comment faire** table (paysage flou à `f/2`; premier plan ou fond flou malgré la
      bonne ouverture — the focus-point-placement mistake, explicitly distinguished from an
      aperture mistake so a learner doesn't reach for the wrong lever).

## 3. Verify

- [x] 3.1 Run `npm run verifier:contenu` (from `src/`) — 56/56 checks pass.
- [x] 3.2 Two earlier approaches were tried and rejected before this one, both confirmed by
      Playwright screenshots at 16:9 (1280×720) and 4:3 (1024×768):
      - A single five-row table on one screen: row 5 clipped at 16:9, rows 4–5 clipped at 4:3.
      - Splitting via this panel's cumulative `etats` (base corps = 3 rows, état corps = 2 rows):
        revealing the état switches to a two-column "dense" layout, and squeezing either table to
        half width roughly doubled its height from wrapping — clipped at both viewports, worse
        than the single-table attempt at 4:3. Root cause documented in design.md.
- [x] 3.3 Final approach (two full-width single-column screens) re-verified with Playwright at
      16:9, 4:3, and phone width for both screens: no clipping (`corps.scrollHeight ==
      corps.clientHeight` at every size), no page-level horizontal scroll. Screenshots reviewed
      directly — both tables render with comfortable margin at 4:3, the tightest viewport.
- [x] 3.4 Confirmed via the dev server's own navigation: `trois-frustrations` →
      `paysage-deux-causes` → `le-quatrieme-facteur` flows correctly in order ("Suivant"/
      "Précédent"), and `le-quatrieme-facteur`'s background-blur content still reads on its own,
      not duplicated by either new screen. Lesson's total screen count grew 39 → 40 as expected
      (one new screen added); no other file in `src/` or `docs/` references screen counts or the
      `trois-frustrations` id, so nothing else needed updating.
