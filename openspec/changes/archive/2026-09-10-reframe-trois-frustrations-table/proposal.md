## Why

The `trois-frustrations` panel (lesson 1, bloc profondeur-de-champ) splits its "fix" across the
screen instead of attaching it to each frustration: only the portrait and paysage rows have a fix,
and both live outside the table — the portrait fix is repeated in the `aparte`, the paysage fix
trails the table as a bare sentence. The macro row has no fix at all. The `aparte` itself opens on
a negatively-framed line ("obtiennent des portraits ratés et croient s'être trompés") that centers
the reader's perceived failure before reassuring them, which reads against the panel's own claim
("ce n'est pas des erreurs de votre part"). Separately, the paysage row only shows one direction of
the aperture mistake (`f/16` too narrow) and nothing distinguishes a genuinely different mistake —
focusing at the wrong distance — from an aperture problem, which risks a learner "fixing" a
mis-focused landscape by closing the aperture further instead of moving the focus point.

## What Changes

- Rewrite the `trois-frustrations` panel's `corps` as a **Problème / Pourquoi / Comment faire**
  table (kept at its original three rows — see Impact for why a fourth and fifth row moved to a
  new screen instead):
  - Portrait rapproché (existing frustration, fix moved into its own row).
  - Macro gros plan (existing frustration, now with an explicit fix: fermer à `f/8`–`f/11` et
    compenser la perte de lumière avec un trépied).
  - `f/16` et exposition trop longue (reframed from "`f/16` est inutile" — the problem is the slow
    shutter it forces, not that it's merely unnecessary, so the fix — opening to `f/5.6`/`f/8` —
    directly resolves the stated problem).
- Remove the paragraph currently trailing the table (the `f/16`/shutter-speed point) — its content
  moves into the `f/16` row above.
- Remove the `aparte` region entirely: its portrait-fix content is now redundant with that row, and
  its negatively-framed opening line is the thing this change removes rather than rephrases.
- Add a new panel, `paysage-deux-causes`, immediately after `trois-frustrations` in the same bloc,
  with its own two-row table:
  - Paysage flou à `f/2` (the opposite-direction aperture mistake from `f/16` — too wide instead of
    too narrow — kept as its own row rather than merged with the `f/16` row, since they're
    opposite mistakes worth showing separately).
  - Premier plan ou fond flou malgré la bonne ouverture (distinguishes a focus-point placement
    mistake from an aperture/depth-of-field mistake, so a learner doesn't reach for the wrong
    lever).
- Explicitly keep "arrière-plan trop net" (background blur) out of both panels — that stays the
  reveal of the next screen, `le-quatrieme-facteur`, and is not duplicated here.

`trois-frustrations` keeps its original `id`/`titre`/`claim` unchanged — it's a genuine three-row
"trois frustrations" again once the two new rows move to their own screen, so no rename is needed
there after all (see design.md for the two rejected approaches that led here).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none)

## Impact

- `src/src/content/lecons/1.yaml`: rewrote `corps` on `trois-frustrations` (`id`/`titre`/`claim`
  unchanged); `aparte` removed; added one new screen (`paysage-deux-causes`) right after it in the
  same bloc. No component, schema, or `content.config.ts` changes.
- `trois-frustrations`'s deep-link address is unchanged. The lesson's total screen count grows by
  one (39 → 40); every screen after this point in bloc 5 shifts its position number accordingly,
  which is expected and not itself a defect (the lessons spec only requires each screen's own
  address to stay stable, not the total count).
