## Why

`/lecons/3/et-maintenant/la-suite/` clips content in projection: 11 px cropped at 1024 × 768,
20 px at 1280 × 720 (measured by `node scripts/verifier.mjs projection`). The `repere` genre is
built for wayfinding — its own component doc comment says "peu de contenu, volontairement" — and,
unlike `panneau`, has no mechanism to shrink or paginate content past that budget: `.repere .corps`
and `.repere .aparte` are fixed-size, and the parent `.ecran` clips overflow with
`overflow: hidden` rather than scrolling it. `la-suite` carries a claim, five wrapped multi-clause
bullets, and a substantive aparte introducing a new commitment (~150–175 words) — roughly double
the next-densest `repere` screen in the whole content set, and the only one using wrapped prose at
that length instead of a short list or table. This is the same shape of problem the just-archived
`split-dense-demonstration-slides` change solved for demonstration screens: split the dense
content across sibling screens, and check the budget at build time so it stays true as content
grows.

## What Changes

- Split the `la-suite` écran in `src/content/lecons/3.yaml` into two sibling `repere` screens
  within the `et-maintenant` block, each with its own `id` and `claim`, so neither exceeds the
  content budget that keeps `repere` legible at both projection viewports.
- New build-time check (in the style of the existing "section 13.6" demonstration image-count
  check) in `src/scripts/verifier-contenu-final.mjs` that flags a `genre: repere` écran whose
  `corps` content exceeds a structural budget, so a future author cannot silently re-introduce an
  overflowing repere screen.
- New deep link: the newly split-off screen gets its own `id` and address
  (`/lecons/3/et-maintenant/<nouvel-id>/`); `la-suite` keeps its existing address for whichever
  half stays under that `id`.

## Capabilities

### Modified Capabilities

- `lessons`: adds a content-budget requirement for `repere` screens, alongside the existing
  three-photograph budget for demonstration screens.

## Impact

- Content: `src/content/lecons/3.yaml` (the `la-suite` écran split into two; new `claim` text
  authored for the new screen).
- Build tooling: `src/scripts/verifier-contenu-final.mjs` gains a check on `genre: repere` écran
  content density.
- No changes to `src/components/ecrans/Repere.astro` or `src/styles/lecon.css` — the fix is
  authored content plus a lint, not a rendering-engine change.
