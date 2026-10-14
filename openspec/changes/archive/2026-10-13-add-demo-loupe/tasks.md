## 1. Content schema

- [x] 1.1 Add an optional `loupe: { zoom }` field (`zoom` a number ≥ 1, required inside `loupe`)
      to `serieComparative` in `src/src/content.config.ts`, and verify `npm run check` passes.
- [x] 1.2 Verify existing lesson YAML still validates unchanged by running
      `npm run verifier:modele`.

## 2. Series markup and hint

- [x] 2.1 In `Demonstration.astro`, mark a series that declares `loupe` (a `data-*` attribute
      carrying the zoom on `.serie`) and leave series without it rendering identical markup;
      verify by diffing the built HTML of a lesson 1 demonstration screen before and after.
- [x] 2.2 Render the hint « Maintenir Maj pour agrandir un détail » (through `typo()`, aparté
      tier) below a loupe series, shown only under `(hover: hover) and (pointer: fine)` and
      hidden in `@media print`; verify in `npm run dev` that it shows on desktop and disappears
      in the browser's touch-device emulation and print preview.

## 3. Loupe rendering

- [x] 3.1 In `EmplacementDemo.astro`, add a hidden `div.loupe` inside `.marco` for photographs of
      a loupe series, painted with the photograph's URL as `background-image`, circular, sized
      to about 45 % of the box's smaller side, clipped by `.marco`; verify by forcing it visible
      in devtools that it appears inside the frame and is clipped at the edge.
- [x] 3.2 Implement the pointer → (u, v) conversion (undo `cadrage` transform, remove `contain`
      letterbox, ignore points in the bars) and the (u, v) → loupe position/background
      conversion; verify in `npm run dev` on `nette-ou-propre` that the loupe centre shows the
      detail under the pointer, at 16:9 and at 1024 × 768.
- [x] 3.3 Verify the resting-crop case: temporarily add a `cadrage` to one `nette-ou-propre`
      image, confirm the loupe still shows the point under the pointer, then remove it.

## 4. Interaction

- [x] 4.1 Add the series script: track Shift (`keydown`/`keyup` on `document`, reset on window
      `blur`) and pointer presence over the series; show every loupe of the series at the same
      (u, v) while both hold, hide on release or `pointerleave`; attach nothing unless
      `matchMedia('(hover: hover) and (pointer: fine)')` matches. Verify in `npm run dev`: all
      three loupes appear and follow together, disappear on Shift release, on leaving the
      series, and after Alt-Tab away with Shift held.
- [x] 4.2 Make the existing enlarge click handler ignore clicks with `shiftKey`; verify Shift +
      click does not open the dialog and a plain click still does.
- [x] 4.3 Verify Shift over a series without `loupe` (e.g. `le-flou-choisi`) shows nothing and
      slide navigation (arrows, Space, F) still works on a loupe screen.

## 5. Lesson 2 content

- [x] 5.1 Add `loupe: { zoom: 4 }` to the `nette-ou-propre` series and `loupe: { zoom: 3 }` to the
      `trois-vitesses` series in `src/src/content/lecons/2.yaml`; verify `npm run verifier:modele`
      and `npm run verifier:contenu` pass.
- [x] 5.2 Check by eye that the photographs of each series line up closely enough for the linked
      loupes to show the same detail; if not, note which files need re-cropping.

## 6. Verification

- [x] 6.1 Run `npm run check` and confirm no new type errors.
- [x] 6.2 Run `npm run verifier:projection` and confirm no overflow on the two loupe screens at
      4:3 and 16:9 (the hint must fit).
- [x] 6.3 Run `npm run verifier:telephone` and `npm run verifier:impression` and confirm the
      hint is absent and click-to-enlarge still works at phone width.
