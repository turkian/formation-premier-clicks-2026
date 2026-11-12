# Tasks

All commands run from `src/` (the Astro root).

## 1. Panel illustration: schema

- [x] 1.1 In `src/content.config.ts`, add the optional `illustration` field to `ecranPanneau`: an `emplacementDemo` plus an optional `loupe: { zoom ≥ 1 }`. Add a `superRefine` that rejects `illustration` combined with `schema`, `etats`, `colonnes` or `cartes`. Verify that `npm run check` passes, and that a throwaway panel declaring both `illustration` and `schema` fails the content build with a clear message. Remove the throwaway panel afterwards.

## 2. Panel illustration: rendering and layout

- [x] 2.1 In `Panneau.astro`, render a `region-illustration` holding an `EmplacementDemo`, wrapped in a container with `data-loupe={zoom}` and `data-loupe-mode="seule"` when a loupe is declared. Put `IndiceLoupe` once under it, and set `data-illustre` on the panel. Verify that on the dev server, with Shift held over the scan, only the scan is magnified, and that clicking with Shift held does not enlarge it.
- [x] 2.2 In `lecon.css`, add the `.panneau[data-illustre]` projection grid (`'claim claim' / 'illustration corps' / 'aparte aparte'`, columns `0.8fr 1.2fr`), plus the phone and print order (claim, illustration, corps, aparte). Under the 4:3 query, set the body to two columns. Verify with `npm run verifier:projection`, `npm run verifier:telephone` and `npm run verifier:impression` that no overflow is reported. Also verify that panels without an illustration are pixel-identical in the projection check.

## 3. Slot enumerators include the illustration

- [x] 3.1 In `lib/demos.ts`, have `creditDeLEcran` gather `ecran.illustration` along with `colonnes[].image`. Verify that the screen footer still shows « Photo : Henry Peach Robinson, 1869, Getty Research Institute ».
- [x] 3.2 In `scripts/liste-de-prises-de-vue.mjs`, `pages/fiches/[id].astro` and `components/ecrans/Repere.astro`, handle `illustration` wherever `colonnes[].image` is read, or record in the commit why a file doesn't need it. Verify that `npm run liste-de-prises-de-vue` still lists `l3-histoire-robinson-effet`.

## 4. Content: the Robinson screen

- [x] 4.1 In `content/lecons/3.yaml`, convert `les-regles-s-ecrivent` to `genre: panneau`, keeping the same `id`, `titre`, `claim` and `aparte`. Move the image into `illustration`, unchanged (same `valeur` and `credit`), with no loupe (dropped after review: the rules are on the right, and the hint row goes back to the scan). Write the four-group `corps` exactly as in design.md §5. Verify that the screen renders at `/lecons/3/histoire/les-regles-s-ecrivent/` with all ten rules, the four headings in order, and no mention of a later screen.
- [x] 4.2 Check the 4:3 fit by hand at 1024 × 768 and at 16:9. The statement, the scan with its caption and hint, all ten rules and the aside must be visible without scrolling, and the body must stay at the body size. Verify by taking both screenshots (with `SEANCES_TOUJOURS_PRETES=1` for the build, since session 3 is not `pret`) and confirming that `npm run verifier:projection` is clean for this screen.

## 5. Integration

- [x] 5.1 Run `npm run build`, `npm run verifier` and `node scripts/verifier-contenu-final.mjs`, and verify that all three pass. Fix any French-typography or session-reference finding in the new body text.
- [x] 5.2 Run `openspec validate session-3-robinson-rules-panel --strict` and verify that it passes.

## Workflow follow-up

- Archive the change once the screen has been reviewed in projection.
