## 1. Update screen copy

- [x] 1.1 In `src/src/content/lecons/1.yaml`, screen `la-lumiere-en-images`, series
      "la direction de la lumière": replace "fenêtre" with a generic "source lumineuse"
      phrasing in the `legende` field (line ~99).
- [x] 1.2 Replace "fenêtre" with a generic "source lumineuse" phrasing in the four
      `specification` fields of that series' images (`l1-lum-frontale`,
      `l1-lum-laterale`, `l1-lum-contre-jour`, `l1-lum-dessus`; lines ~102, 107, 112,
      117 — the `l1-lum-dessus` specification doesn't say "fenêtre" today but re-check
      wording stays consistent with the other three).
- [x] 1.3 Confirm the quality-of-light series' `l1-qualite-douce` specification
      ("...ciel couvert ou grande fenêtre — ombres douces") is left unchanged.
- [x] 1.4 Confirm the `direction-lumiere` diagram (`DirectionLumiere.astro`,
      `SourceLumiere.astro`, and their aria-label/etiquette) is left unchanged.

## 2. Verify

- [x] 2.1 Run the project's content verification script
      (`src/scripts/verifier-contenu-final.mjs`) if it covers séance 1 content.
- [x] 2.2 Visually check the rendered slide (dev server, "La lumière, en images"
      screen) for French typographic rules (spacing, punctuation) on the edited
      strings.
