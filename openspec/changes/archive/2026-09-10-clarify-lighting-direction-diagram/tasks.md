## 1. Shared diagram pieces

- [x] 1.1 Create `src/src/components/schemas/pieces/traits.ts` exporting the two line
      styles: `traitLumiere` (solid, `var(--accent)`, stroke-width 2) and `traitVisee`
      (dashed `4 3`, `var(--texte-3)`, stroke-width 1.5, plus the shared arrowhead path
      helper reused from `PointEtZone.astro`).
- [x] 1.2 Create `src/src/components/schemas/pieces/Sujet.astro` — renders the subject
      as `lucide:user-round` at a given `(cx, cy)`.
- [x] 1.3 Create `src/src/components/schemas/pieces/SourceLumiere.astro` — renders the
      window rect (unchanged geometry/label) plus a small 2–3 line radiating-rays glyph
      at its inner edge, in `var(--accent)`.
- [x] 1.4 Create `src/src/components/schemas/pieces/AppareilPhoto.astro` — renders
      `lucide:camera` upright at a given `(cx, cy)`, sized to match the current camera
      rect's visual weight.

## 2. Redraw `direction-lumiere`

- [x] 2.1 In `DirectionLumiere.astro`, replace the `transform="rotate(...)"` rect with
      a polar-coordinate computation: `camera = sujet + r · (cos θ, sin θ)` for each of
      the four `angle` values, producing plain `(x, y)` for the camera icon.
- [x] 2.2 Render the four pieces (`SourceLumiere`, `Sujet`, `AppareilPhoto`) per column
      using the computed positions, replacing the current inline `rect`/`circle`/`path`
      shapes.
- [x] 2.3 Draw the light path (window → subject) using `traitLumiere` and the camera
      sightline (camera → subject, with arrowhead at the subject end) using
      `traitVisee`, so the two are never the same line style.
- [x] 2.4 Remove the now-unused inline shape code and the `rotate(...)` transform from
      `DirectionLumiere.astro`.

## 3. Verify

- [x] 3.1 Run `npm run check` (Astro/TS check) in `src/`. — `@astrojs/check`/
      `typescript` aren't installed in this repo (pre-existing, unrelated to this
      change; confirmed the same gap exists on `main`), so substituted `npm run
      build`, which compiles every `.astro` file including the new pieces and the
      120-page site built cleanly.
- [x] 3.2 Use the `run` skill (or `npm run dev`) to view the `direction-lumiere` slide
      in a real browser; confirm camera, light source, and subject are each
      identifiable without the caption, and the light path and sightline are visually
      distinct, at both a 16:9 window and a 4:3 (1024×768) window. — verified via
      Playwright screenshots at both sizes, in isolation and in the full concept
      panel; camera/window/subject icons and the solid-vs-dashed lines are all
      clearly distinct.
- [x] 3.3 Run `npm run verifier:copie-locale` to confirm the nested icon SVGs survive
      the offline/local-copy pipeline. — the full script fails at an unrelated
      navigation step (reproduces identically with this change stashed out, so it's
      a pre-existing issue, not introduced here); directly opened this diagram's
      page from `copie-locale/` over `file://` instead and confirmed all four
      camera and subject icons render with zero failed requests.

## 4. Follow-up from reviewing the rendered diagram

- [x] 4.1 Remove the window's radiating-rays glyph from `SourceLumiere.astro` — next
      to the solid light-path line it read as a confusing extra line rather than a
      helpful "this emits light" cue.
- [x] 4.2 Give `du dessus` its own source placement in `DirectionLumiere.astro`
      (`sourceEnHaut` flag on that `POSITIONS` entry): a wide skylight rect above the
      subject with the light path running straight down, instead of the fixed
      side window shared by the other three panels — a fixed side window can never
      look like overhead light, whichever icon represents it.
- [x] 4.3 Re-verify visually (all four panels, plus a close crop of `du dessus`) and
      rebuild (`npm run build`) after both fixes.

## 5. Layout: 2×2 grid instead of a single row

- [x] 5.1 In `DirectionLumiere.astro`, lay the four positions out as a 2×2 grid
      (`COLONNES = 2`) instead of one row of four — `cx`/`cy` per panel now derive
      from `colonne`/`ligne`, with the viewBox growing taller (`640×480`) rather
      than wider. Per-panel geometry (icon sizes, radius, line styles) is
      unchanged; only the arrangement of the four panels changed.
- [x] 5.2 Re-verify visually at both aspect ratios and rebuild — also directly
      addresses the earlier open item about extra whitespace below this panel's
      diagram, since the diagram is now taller as a block and fills that space.

## 6. Content: remove the redundant aparté (separate from the diagram itself)

- [x] 6.1 In `content/lecons/1.yaml`, remove the `la-matiere-premiere` screen's
      `aparte` block (small-vs-large-source example + "deux pas" closing line —
      removed at the user's request).
- [x] 6.2 Remove the screen's `schema.legende`, which duplicated the diagram's own
      built-in caption ("Aucun réglage n'a changé…") in different words — found
      while looking for ways to redistribute the slide's content.
- [x] 6.3 Remove that same built-in caption line from `DirectionLumiere.astro`
      itself (per the user's follow-up request) — the diagram no longer carries
      any closing caption text; the viewBox's bottom margin was trimmed
      accordingly (`+40` → `+16`, just enough space under the second row).
