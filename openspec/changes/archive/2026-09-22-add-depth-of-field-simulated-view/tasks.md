## 1. Icons

- [x] 1.1 Confirm `lucide:trees` and `lucide:leaf` render via the project's `astro-icon` integration (same import path as `lucide:camera`/`lucide:user-round` in `AppareilPhoto.astro`/`Sujet.astro`) and verify both appear correctly in a throwaway render before wiring them into the component.
- [x] 1.2 If either icon is missing or illegible at small size, pick a replacement `lucide:*` name and verify it the same way; record the final choice. — Not needed: both icons render legibly at their chosen sizes (confirmed via screenshots at 1600×1000, 1024×768, and phone width); no replacement required.

## 2. Markup (`ProfondeurDeChamp.astro`)

- [x] 2.1 Add the `Schéma`/`Aperçu` toggle (`.segments` markup, matching `MoletteDesModes.astro`'s pattern) above the SVGs in `.visuel`, with `data-vue="schema"` `aria-pressed="true"` and `data-vue="apercu"` `aria-pressed="false"` by default, and verify it renders styled by the existing `.segments` CSS with no new rules.
- [x] 2.2 Add the second `<svg class="scene-svg" data-scene-pdc-apercu hidden viewBox="0 0 640 260">` sibling to the existing top-down SVG, containing fixed-position groups for foreground (`data-avant-plan`), subject (`data-sujet-apercu`, `lucide:user-round`), and background (`data-fond-apercu`, `lucide:trees`), and verify it is present in the DOM but hidden on initial load.
- [x] 2.3 Give the new SVG a distinct `role="img"` `aria-label` describing it as the simulated/qualitative view (distinct from the top-down SVG's existing label), and verify with the browser accessibility tree.

## 3. Script (`ProfondeurDeChamp.astro`'s inline `<script>`)

- [x] 3.1 Add a click handler on the toggle's `role="group"` container that flips `hidden` on both SVGs and updates `aria-pressed` on both buttons, and verify clicking each button shows the corresponding SVG and hides the other, with the correct button reporting `aria-pressed="true"`. — Implemented with `toggleAttribute('hidden', …)` rather than the `.hidden` property: a headless-browser check found `.hidden = value` does not reliably reflect to the content attribute on `<svg>` elements, which silently broke the toggle.
- [x] 3.2 Implement `dessinerApercu(racine, distance, fond, r)` computing the foreground's fixed position (`distance * 0.4`) and its blur via `dehors = max(0, r.proche - distanceAvantPlan)`, `flou = min(6, sqrt(dehors) * 1.9)`, applied as `filter: blur()` the same way the existing background blur is applied to `[data-fond-groupe]`, and verify visually that closing the aperture enough removes the foreground blur.
- [x] 3.3 Reuse the existing `dehors`/`flou` background calculation (already in `dessiner()`) for the simulated view's background element, so both SVGs' background blur derive from the same numbers, and verify by comparing blur intensity between the two views at several lever settings. — `dessiner()` now returns its computed `flou`, and `rendre()` passes that exact number into `dessinerApercu()`.
- [x] 3.4 Call both `dessiner()` and `dessinerApercu()` from `rendre()` on every input event regardless of which view is visible, and verify by toggling mid-drag that the just-revealed view is already up to date with no stale frame.

## 4. Verification

- [x] 4.1 Drive every lever to both extremes with the simulated view visible and confirm the subject stays sharp, the background blurs/sharpens consistently with the top-down diagram, and the foreground blurs/sharpens per design.md Decision 4 — run this at 1600×1000 and at the 1024×768 compaction breakpoint (the same two sizes used for this component's last layout verification), screenshots reviewed.
- [x] 4.2 Confirm toggling the view does not change `.commandes`' width/height at either breakpoint (sidebar layout stability requirement carried over from the earlier simplification work).
- [x] 4.3 Confirm the toggle is operable by touch at phone width (`interactive-components` spec: controls operable during a live explanation / by touch on a phone).
- [x] 4.4 Run the project's content/typography verification scripts (`src/scripts/verifier*.mjs` as applicable) and confirm no new failures. — `verifier:modele`, `verifier:contenu`, and `verifier` (projection/téléphone/impression/liens/alignement/qr) all pass.
- [x] 4.5 Walk through each scenario in `specs/interactive-components/spec.md`'s new requirement and confirm it holds against the running component.

## 5. Amendments — toggle repositioning and distance labels

- [x] 5.1 Move the `Schéma`/`Aperçu` toggle out of its dedicated row into the `.etiquette-format` row, right-aligned; simplify `.scene-conteneur`'s `grid-template-rows` now that it only stacks the two SVGs.
- [x] 5.2 Add three `<text>` distance labels to `dessinerApercu()` — avant-plan (`distance * 0.4`), sujet (`distance`), fond (`distance + fond`) — via `distanceLisible()`/`typo()`, positioned near each icon, same visual pattern as the top-down SVG's "vous"/"sujet"/"fond" labels.
- [x] 5.3 Revisit the simulated-view `aria-label` wording now that it carries three numbers (design.md, Decision 6).
- [x] 5.4 Re-verify at 1600×1000 and 1024×768: `.commandes` size stability, toggle touch operability at phone width, and that the reclaimed row doesn't crowd the format chip or the SVG. — Verified via headless Chromium (Playwright): `.commandes` bounding box identical before/after toggle at both breakpoints; toggle responds to `page.tap()` on a 390px viewport; the reclaimed `.ligne-format` row wraps cleanly with `flex-wrap` and doesn't crowd the format chip or SVG at any breakpoint.
- [x] 5.5 Re-run `verifier:modele`, `verifier:contenu`, and `verifier`; confirm no new failures. — `verifier:modele` (30/30) and `verifier:contenu` (77/77) pass. `verifier` reports 4 pre-existing failures on unrelated `lumiere/*` pages (`.marco` overflow in `EmplacementDemo.astro`), confirmed present on the unmodified baseline via `git stash`/re-run — not introduced by this change.
