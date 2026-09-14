## 1. Content schema

- [x] 1.1 Add an optional `cadrage` field (`point: [x, y]` as percentages 0–100, `zoom` a number
      ≥ 1) to the `emplacementDemo` schema in `src/content.config.ts`, and verify `npm run check`
      passes.
- [x] 1.2 Verify existing lesson YAML still validates unchanged by running `npm run
      verifier:modele`.

## 2. Resting crop/zoom rendering

- [x] 2.1 In `EmplacementDemo.astro`, read the optional `cadrage` prop and apply it as a CSS
      transform (`transform: scale(zoom)` around a `transform-origin` set to the declared point)
      on the image, wrapped in `overflow: hidden`; images without `cadrage` keep today's
      `object-fit: contain` rendering unchanged.
- [x] 2.2 Pass `cadrage` through from `Demonstration.astro`'s image mapping to `EmplacementDemo`.
- [x] 2.3 Verify manually in `npm run dev` that a demo image with a declared crop shows the same
      framing (same detail, same apparent magnification) in a 4:3 window, a 16:9 window, and a
      narrow phone-width window.

## 3. Enlarge / overlay

- [x] 3.1 Add a `<dialog>` element to `EmplacementDemo.astro` containing the full, uncropped
      image, and a script that opens it with `.showModal()` when the resting image is activated
      (click, or Enter/Space while focused).
- [x] 3.2 Style the dialog and its `::backdrop` to dim the rest of the screen behind it, and
      verify visually in `npm run dev`.
- [x] 3.3 Verify closing works by re-activating the enlarged image, clicking outside it, and
      pressing Escape, and confirm the underlying screen is unchanged after closing.
- [x] 3.4 Verify independence: in a comparison series with two or more images, enlarge one and
      confirm the others stay in their resting view.

## 4. Label visibility

- [x] 4.1 Change `EmplacementDemo.astro`'s caption (`valeur`) from always-visible to hidden by
      default, shown on `:hover`/`:focus-within` of the resting figure.
- [x] 4.2 Render a second copy of the caption inside the dialog, always visible while it is open.
- [x] 4.3 Verify keyboard-only operation: tabbing to a demo image reveals its label (via
      `:focus-within`) without using a pointer.

## 5. Content example

- [x] 5.1 Add `cadrage` values to the `la-lumiere-en-images` direction-of-light series images
      (`l1-lum-frontale`, `l1-lum-laterale`, `l1-lum-contre-jour`, `l1-lum-dessus`) in
      `src/content/lecons/1.yaml` as a worked example, and verify `npm run verifier:modele` still
      passes.

## 6. Verification

- [x] 6.1 Run `npm run check` and confirm it passes with no new type errors.
- [x] 6.2 Run `npm run verifier:projection` and confirm no new overflow or legibility failures on
      lesson screens containing demonstration images.
- [x] 6.3 Run `npm run verifier:telephone` and confirm the cropped resting view and the enlarge
      interaction both work at phone width.
