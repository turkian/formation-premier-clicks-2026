## 1. Widen the step arrays

- [x] 1.1 In `src/src/components/interactifs/ProfondeurDeChamp.astro`, change `FOCALES` to
      `[9, 12, 16, 18, 24, 28, 35, 50, 70, 85, 105, 135, 200, 300, 400, 500, 600]` and verify by
      rendering the component and dragging the focale slider to each end: the readout shows
      `9 mm` at the low end and `600 mm` at the high end.
- [x] 1.2 In the same file, change `DISTANCES` to
      `[0.3, 0.4, 0.5, 0.6, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 15, 20, 30, 50, 75, 100, 150, 200, 300]`
      and verify by dragging the distance slider to each end: the readout shows `0,3 m` at the low
      end and `300 m` at the high end.

## 2. Rescale the scene drawing

- [x] 2.1 In `dessiner()`, change the log-scale `MAX` constant from `80` to `400` (keep `MIN` at
      `0.2`) and verify by setting distance to `300 m`: the subject marker and focus-zone lines
      render inside the `viewBox` instead of at/past its right edge.
- [x] 2.2 Add `100` and `300` to the graduation list (currently `[0.3, 1, 3, 10, 30]`) and verify
      the two new tick marks and their `m` labels render on the axis without overlapping the
      existing ones.

## 3. Verify

- [x] 3.1 Run `npm run verifier:modele` from `src/` and confirm every existing check still passes
      (the script's fixed distances — 1 m, 3 m, 10 m — and 50 mm are untouched by this change, so
      all figures should match their current expected values).
- [x] 3.2 Run `npm run build` from `src/` and confirm it completes without errors or warnings.
- [x] 3.3 Run `npm run dev`, open slide 30
      (`/lecons/1/ouverture-et-profondeur-de-champ/explorer-la-zone-nette/`), and manually sweep
      the focale slider end to end (9 mm → 600 mm) and the distance slider end to end (0,3 m →
      300 m): confirm every readout updates without `NaN` or layout breakage, and that the
      "net jusqu'à l'infini" case still reads correctly at the extremes where it's expected.
