# Tasks

## 1. Full-width claim on panels with columns

- [x] 1.1 In `src/src/components/ecrans/Panneau.astro`, set `data-colonnes` on the panel when `ecran.colonnes` is present, with a short comment explaining why. Verify the attribute appears in the built HTML of `/lecons/3/composition/placer/` and is absent on a panel without columns.
- [x] 1.2 In `src/src/styles/lecon.css`, add `.panneau[data-colonnes] .claim { max-width: none; }` next to the `data-sans-schema` rule, with a comment. Verify in the browser that the claim on `qu-est-ce-que-l-iso` spans past 24ch and that a panel without columns keeps 24ch.

## 2. Shorter « Placer » claim

- [x] 2.1 In `src/src/content/lecons/3.yaml`, replace the `placer` claim with « Décentré ou centré — franchement. Jamais entre les deux. ». Verify it appears on a single line at 16:9.

## 3. Integration checks

- [x] 3.1 Run `npm run check` and `npm run build`, and verify both succeed.
- [x] 3.2 Run `npm run verifier:projection` and `npm run verifier:telephone`, and verify none of the 12 panels with columns is cut off at 1024 × 768 or at 16:9, and that phone width has no horizontal scrolling.
