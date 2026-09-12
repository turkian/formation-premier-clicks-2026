## 1. Split `le-quatrieme-facteur` into three screens (`profondeur-de-champ`)

- [x] 1.1 In `src/src/content/lecons/1.yaml`, replace the `le-quatrieme-facteur` écran (id,
      états, and all) with the `le-probleme` écran exactly as specified in `design.md` §2, in
      the same position in the bloc's `ecrans` list.
- [x] 1.2 Immediately after `le-probleme`, add the `la-solution` écran exactly as specified in
      `design.md` §3.
- [x] 1.3 Immediately after `la-solution`, add the `exemple-fond-flou` écran (genre
      `demonstration`) exactly as specified in `design.md` §4, moving the
      `l1-pdc-fond-colle` / `l1-pdc-fond-loin` series — with their `id`s, `specification`,
      `valeur`, `priorite`, and `reglages` unchanged — out of `demo-ouverture-et-fond` and into
      this screen's `series`.
- [x] 1.4 Verify: `le-quatrieme-facteur` no longer appears anywhere in
      `src/src/content/lecons/1.yaml` (`grep -n le-quatrieme-facteur src/src/content/lecons/1.yaml`
      returns nothing), and the bloc `profondeur-de-champ` now lists 10 écrans in this order:
      `ouverture`, `la-definition`, `ce-qui-change-l-epaisseur`, `le-facteur-invisible`,
      `explorer-la-zone-nette`, `trois-frustrations`, `paysage-deux-causes`, `le-probleme`,
      `la-solution`, `exemple-fond-flou`.

## 2. Rename and rewrite `demo-ouverture-et-fond` (`ouverture`)

- [x] 2.1 Rename the écran's `id` from `demo-ouverture-et-fond` to `demo-ouverture`, remove its
      `la distance entre le sujet et le fond` series (moved in task 1.3), and set its `titre`,
      `claim`, keeping only the aperture series unchanged, exactly as specified in `design.md`
      §5.
- [x] 2.2 Remove the écran's `aparte` field entirely (its content now lives on `la-solution`,
      per `design.md` §5) — do not leave an empty `aparte:` key.
- [x] 2.3 Verify: `demo-ouverture-et-fond` no longer appears in
      `src/src/content/lecons/1.yaml`; `demo-ouverture` has exactly one entry under `series`
      (the aperture series with images `l1-pdc-ouverture-18`, `l1-pdc-ouverture-56`,
      `l1-pdc-ouverture-11`, all three unchanged) and no `aparte` key.

## 3. Verify against the project's own checks

- [x] 3.1 Run `npm run verifier:modele` (from `src/`) and confirm it passes — the yaml still
      matches the `lecons` content schema (each new écran's `genre` fields are all present,
      `demonstration` series still declare exactly one varying `variable`).
- [x] 3.2 Run `npm run verifier:contenu` and confirm it passes — new/edited copy doesn't
      introduce a forbidden `soir`-radical reference or break another content rule.
- [x] 3.3 Run `npm run verifier` (or at least `verifier:projection`, `verifier:telephone`,
      `verifier:alignement`) and confirm it passes — `le-probleme`/`la-solution` stay within
      the projection/phone readability thresholds now that they're static panels instead of
      cumulative states. (1056 checks passed; 2 pre-existing failures on
      `lecons/3/et-maintenant/la-suite/`, an unrelated screen this change never touches.)
- [x] 3.4 Run `npm run liste-de-prises-de-vue` and confirm `l1-pdc-fond-colle` /
      `l1-pdc-fond-loin` are each listed exactly once, under the new `exemple-fond-flou` slot,
      still marked `essentiel` — not duplicated, not orphaned.
- [x] 3.5 Run `npm run build` and confirm it completes with no errors.
- [x] 3.6 Run `npm run dev`, open leçon 1, and step through `profondeur-de-champ` to confirm
      the room-facing order and content: `le-probleme` (plain problem statement, no warning
      icon) → `la-solution` (the rule) → `exemple-fond-flou` (the two photos or their
      placeholders, captioned "Seule chose qui change : la distance entre le sujet et le
      fond"). Then open `ouverture`'s `demo-ouverture` screen and confirm it now reads as an
      aperture-only demonstration with no dangling reference to a background-distance
      comparison.
