## 1. Mark generic elements in the template

- [x] 1.1 In `src/src/pages/lexique/[marque].astro`, add `sans-impression` to the `.cadrage` div
      and verify the class appears on that element in the rendered HTML (`astro build` then
      inspect `dist/lexique/canon/index.html`).
- [x] 1.2 Add `sans-impression` to the "Comment lire cette feuille" paragraph and verify the same
      way.
- [x] 1.3 In `src/src/components/RechercheLexique.astro`, add `sans-impression` to the root
      `.recherche` div and verify the same way.

## 2. Add the print stylesheet

- [x] 2.1 In `src/src/styles/lexique.css`, add an `@media print` block that hides
      `.sans-impression`, `.saut-au-contenu`, `nav`, `.fil`, and `.pied-site` (mirroring
      `fiche.css`'s existing chrome-hiding rule) and verify these elements are absent from a
      browser print preview of `/lexique/canon`.
- [x] 2.2 Add `@page { size: letter; margin: 11mm 12mm; }` and the `body { min-height: 0; }` /
      background override, matching `fiche.css`, and verify no blank trailing page appears in the
      print preview.
- [x] 2.3 Force-show `.entree[hidden]` and `.section-lexique[hidden]` at print, and force-hide
      `.aucun-resultat`; verify by typing a search filter into `/lexique/canon` that hides some
      entries and a full section, then confirming the print preview shows every entry and section
      unfiltered with no "aucun résultat" text.
- [x] 2.4 Apply the compact print type scale (headings, entries, notes, `chemin-menu`) at a
      density comparable to `fiche.css`'s `serree` variant, and give `.section-lexique`, `.entree`,
      `.exception`, and `.note-section` `break-inside: avoid`; verify in the print preview that no
      entry or note is split across a page break.
- [x] 2.5 At print, force `.entree` to the existing narrow single-column layout (the same rule
      `lexique.css` already uses under `@media (max-width: 40rem)`) regardless of page width, and
      apply a `column-count: 2` layout to the section content; verify in the print preview that
      each entry's formation/appareil pair stacks legibly rather than wrapping.

## 3. Verify across brands

- [x] 3.1 Run `astro build` in `src/` and confirm it completes without errors.
- [x] 3.2 Print-preview a sparse brand (e.g. iPhone or Android) and confirm the brand's full
      content is present, no generic/chrome text appears, and it fits on one page.
- [x] 3.3 Print-preview a content-heavy brand (Canon) and confirm the brand's full content is
      present, no generic/chrome text appears, and the page break falls between sections/entries
      rather than mid-entry.
