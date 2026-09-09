## 1. Styling

- [x] 1.1 In `src/src/styles/lecon.css`, extend the `.gestes` counter-reset/grid rule to also
      match `.repere[data-variante="activite"] .corps ol`
- [x] 1.2 Extend the `.gestes li` grid/counter-increment rule to also match
      `.repere[data-variante="activite"] .corps ol li`
- [x] 1.3 Extend the `.gestes li::before` circle rule to also match
      `.repere[data-variante="activite"] .corps ol li::before`
- [x] 1.4 Verify `.corps ul` (unordered lists) in `activite` screens is unaffected, and that
      `panneau` screens (e.g. "avant-chaque-photo") keep their plain `.corps ol` numbering

## 2. Content

- [x] 2.1 In `src/src/content/lecons/1.yaml`, remove the `aparte` field (and its text) from
      the `deux-pas-de-cote` écran

## 3. Verification

- [x] 3.1 Run the dev server and view `tour-de-table` (bloc `accueil`) — confirm its numbered
      steps render as orange circled numbers, matching the `deux-pas-de-cote` "appareil en
      main" style
- [x] 3.2 View `deux-pas-de-cote` — confirm the aparté line is gone and the screen still reads
      cleanly without it
- [x] 3.3 View `avant-chaque-photo` (panneau, "Les quatre questions") — confirm its numbered
      list is unchanged (plain numbers, no circles)
- [x] 3.4 Check `tour-de-table` at phone width and at 4:3 projection width — confirm the
      circled list stays fully visible and legible at both

## 4. Follow-up refinements (user feedback after initial review)

- [x] 4.1 In `src/src/styles/lecon.css`, remove the `border` from `.appareil` (keep the
      background gradient) — now that all four `appareil-en-main` screens are recognized
      by the same box treatment as `activite` screens, the border read as redundant
- [x] 4.2 In `AppareilEnMain.astro`, replace the abstract `.banniere::before` CSS shape with
      a literal `lucide:camera` icon (via `astro-icon`, already a project dependency)
- [x] 4.3 Add a `lucide:smartphone` icon to the "Cellulaire" variante label, to mark it
      distinctly from "Reflex" (left unchanged — not requested)
- [x] 4.4 Verify via screenshot on `deux-pas-de-cote` and `designer-le-point` (which shows
      both Cellulaire and Reflex side by side) — icons render correctly, no console errors
