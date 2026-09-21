## Why

The lexique is meant to be kept and reread at home, weeks after the session — but printing a
brand page today captures the whole live page: the breadcrumb, the eight-brand switcher, and the
generic note explaining why brands differ, all mixed in with the one brand's actual
correspondences. A sheet someone keeps in a camera bag should hold only that brand's content, and
as little else as fits on paper.

## What Changes

- Add a print stylesheet to the lexique brand page, reusing the chrome-hiding and compact-type
  convention already established in `fiche.css` for the printable reference sheets, rather than
  inventing a new one.
- On print, hide: the breadcrumb nav, the brand switcher, the "manufacturers use different words"
  framing note, the "comment lire cette feuille" reading instructions, the live search box, and
  the site footer.
- Keep on print: the brand's title, its "menu rapide" / RAW-extension facts, every numbered
  section with its entries, menu paths, and notes, and the "si vous ne trouvez pas" troubleshooting
  list.
- Compact the print typography and layout (columns, reduced type scale) to minimize page count.
  This is best-effort: content-heavy brands (e.g. Canon's 22 entries across 4 sections) may still
  span more than one printed page — no entry, note, or menu path is dropped to force a single-page
  fit.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `lexicon`: adds a requirement that printing a brand page outputs only that brand's content —
  omitting generic framing and cross-brand navigation — laid out as compactly as the content
  allows.

## Impact

- `src/src/pages/lexique/[marque].astro` — mark chrome and generic-framing elements for print
  hiding (breadcrumb, brand switcher, cadrage note, reading-instructions paragraph, footer).
- `src/src/styles/lexique.css` — add the `@media print` block: hides the marked elements, applies
  `@page` sizing and the compact type/column treatment.
- `src/src/components/RechercheLexique.astro` — hidden on print via CSS only; no script changes.
- No changes to brand content data, the search behavior, or any other page genre.
