## Why

Measuring rendered photo size at both projector viewports (4:3 1024×768, 16:9 1920×1080) shows
that a demonstration screen carrying more than three photographs shrinks each one well below the
size a two- or three-photograph screen gets — as low as 228×152 px at 4:3, roughly a quarter the
area of a clean two-image comparison. A demonstration photograph is evidence, not decoration; the
room needs to actually see it. Four screens today exceed three images by stacking two independent
series (or a series plus an unrelated single image) onto one screen. The fix already has a
precedent in the content itself — `ouverture-et-profondeur-de-champ` is authored as three separate
demonstration screens instead of one crowded one — this change makes that precedent a rule, and
checks it the same way the existing `soir` rule is checked: automatically, at build time.

## What Changes

- New authoring rule: a demonstration screen SHALL NOT display more than three photographs in
  total (summed across all its series and its free/`libres` images). Content exceeding three is
  split across additional sibling screens in the same block, each with its own `claim`.
- New build-time check (in the style of the existing "section 13.5" `soir` check) that counts
  images per demonstration screen and fails the build past three, so the rule stays true as
  content grows rather than degrading silently.
- Content restructuring of the four screens that exceed the limit today:
  - `1/lumiere/la-lumiere-en-images` (6 images: a 4-image series + a 2-image series) → three
    screens: the 4-image "direction of light" series splits 2+2 across two screens, the 2-image
    "quality of light" series keeps its own screen unchanged.
  - `2/diagnostic/le-cas-du-posemetre` (4 images: two independent 2-image series) → two screens,
    one per scene (neige, contre-jour).
  - `3/composition/avant-apres` (4 images: two independent 2-image series) → two screens, one per
    reflex (distance, hauteur du point de vue).
  - `1/mise-au-point/ou-le-point-a-ete-fait` (a 3-image series + 1 unrelated `libre` image) → two
    screens: the series keeps its screen unchanged, the single image moves to its own screen with
    a new claim carrying the point the current `aparte` text makes.
- New deep links: each newly split-off screen gets its own `id` and therefore its own address
  (`/lecons/<n>/<bloc>/<nouvel-id>/`); the screens that keep their original `id` keep their
  existing address.

## Capabilities

### Modified Capabilities

- `lessons`: adds a maximum-images-per-demonstration-screen requirement, alongside the existing
  requirement that demonstration photographs get their own screens to keep full usable space.

## Impact

- Content: `src/content/lecons/1.yaml`, `src/content/lecons/2.yaml`, `src/content/lecons/3.yaml`
  (the four screens above split into nine; new `claim` text authored for each new screen).
- Build tooling: `src/scripts/verifier-contenu-final.mjs` gains a check counting
  `series[].images.length` summed with `images.length` per `genre: demonstration` screen.
- No changes to `src/components/ecrans/Demonstration.astro`, `src/components/EmplacementDemo.astro`,
  or `src/lib/lecon.ts` — the fix is authored content plus a lint, not a rendering-engine change.
- Deep links into the four affected screens' post-first-photo images shift to new screen
  addresses; anything printed or QR-coded pointing at the removed portion of a split screen would
  need updating (none currently exist outside the site's own generated QR codes, which regenerate
  from content).
