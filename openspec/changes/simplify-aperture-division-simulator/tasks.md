## 1. Shared aperture list

- [x] 1.1 Add `2.4` to `CRANS_OUVERTURE` in `src/src/lib/profondeur-de-champ.ts`, in ascending
      order between `2` and `2.8`, and verify `CRANS_OUVERTURE.indexOf(2.4)` no longer returns
      `-1`.

## 2. `OuvertureDivision.astro` rework

- [x] 2.1 Replace the `focale`/`ouverture`/`comparaison` props with `focaleA`, `ouvertureA`,
      `focaleB`, `ouvertureB` (defaults `50`, `2.4`, `50`, `22`), per design.md Decision 1.
- [x] 2.2 Replace the single shared focale/ouverture slider pair with two symmetric panels
      ("Objectif A", "Objectif B"), each with its own focale slider and its own ouverture
      slider, each initialized from its own prop.
- [x] 2.3 Remove the `data-paire` preset buttons (`24-200`, `kit`, `400`) and their click
      handlers; verify no `data-paire` attribute remains in the file.
- [x] 2.4 Update the `input` event handling so each slider updates only its own panel's state
      (no shared `focaleComparee`), and verify dragging panel A's sliders never changes panel
      B's displayed values or vice versa.
- [x] 2.5 Update `rendre()` to compute each panel's own diameter (`diametre(focaleX, ouvertureX)`)
      and render each panel's own division equation (e.g. `50 ÷ 2,4 = 20,8 mm`), replacing the
      single shared `calcul`/`explication` output.
- [x] 2.6 Update `dessiner()` to draw both panels' disks from their two independently computed
      diameters at true relative scale (reusing the existing `enPixels`/`rayonMax` scaling),
      and verify the default state renders two visibly different-sized disks labelled `50 mm à
      f/2.4` and `50 mm à f/22`.
- [x] 2.7 Replace the branchy single-lens/two-lens `exposition` text with one generated
      paragraph that states both diameters and how many times larger one is than the other,
      keeps the "diviseur"/quart-de-tarte framing sentence once, and contains no claim about
      exposure being equal or unequal — verify by grepping the component file for `exposition`
      and confirming the word `exposition` (and any paraphrase of it) no longer appears in any
      generated string.
- [x] 2.8 Verify manually (dev server, phone-width and full-width) that both panels' controls
      are usable and both readouts stay legible, per the `interactive-components` spec's
      "Controls are operable during a live explanation" requirement (unchanged by this change).

## 3. Lesson content update

- [x] 3.1 Update `le-f-est-une-division` in `src/src/content/lecons/1.yaml`: new `claim` (naming
      `f/2.4`/`f/22`/50 mm, per design.md Decision 3), `props` set to `focaleA: 50, ouvertureA:
      2.4, focaleB: 50, ouvertureB: 22`, and a shortened or removed `aparte` with no exposure
      claim.
- [x] 3.2 Run `node src/scripts/verifier-contenu-final.mjs` (or the project's equivalent content
      check) and verify it passes against the updated screen.
- [x] 3.3 Run the Astro build (`npm run build` from `src/`) and verify it succeeds with no
      errors referencing `le-f-est-une-division` or `OuvertureDivision`.

## 4. Spec sync

- [x] 4.1 Run `openspec validate simplify-aperture-division-simulator --strict` and verify it
      passes.
