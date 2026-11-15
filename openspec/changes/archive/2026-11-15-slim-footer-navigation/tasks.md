# Tasks

## 1. Footer markup

- [x] 1.1 In `src/src/layouts/Ecran.astro`, change the previous and next links to `<a rel="prev" aria-label="Précédent">←</a>` (and the same shape for `→` / « Suivant »); verify in the built HTML of `/lecons/3/composition/placer/` that the words appear only in `aria-label` attributes
- [x] 1.2 Change the inactive spans on the first and last screen to a lone faded arrow with `aria-hidden="true"`; verify on `/lecons/3/` (first screen) that the previous position shows a faded `←` and contains no « Précédent » text

## 2. Footer styles

- [x] 2.1 In `src/src/styles/lecon.css`, add `flex: none; white-space: nowrap;` to `.pied-ecran .navigation`; verify in the dev server, by narrowing the window on `composition/placer`, that `← 12 / 25 →` stays on one line while the credit wraps
- [x] 2.2 Give the footer navigation links padding cancelled by an equal negative margin, no larger than `var(--pas)`; verify in devtools that each arrow's hit box is clearly larger than the glyph, that the two boxes don't overlap, and that the footer height hasn't changed on a screen without a credit
- [x] 2.3 Check keyboard focus: Tab onto each arrow and verify the `:focus-visible` outline wraps the enlarged box and the hover colour still applies

## 3. Integration checks

- [x] 3.1 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass
- [x] 3.2 Build, then run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify no screen overflows at 1024 × 768 or 16:9, and that `composition/placer` fits phone width with the navigation on one line
- [x] 3.3 Compare the `composition/placer` footer at 1024 × 768 before and after; verify it is the same height or shorter
- [x] 3.4 With a screen reader or the browser's accessibility tree, verify the footer links are named « Précédent » and « Suivant » and the faded end arrows aren't announced
- [x] 3.5 Run `openspec validate slim-footer-navigation --strict`; verify it passes

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md`
  contains « Footer navigation shows only arrows and the screen counter » and « Footer navigation
  never wraps ».
