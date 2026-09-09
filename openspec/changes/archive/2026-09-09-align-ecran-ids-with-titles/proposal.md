## Why

Two écrans in the `profondeur-de-champ` and `ouverture` blocs (séance 1) have ids that no
longer describe what the screen is:

- `le-mythe-du-f18` (slide 21) displays `titre: Le quatrième facteur` — the id was presumably
  written when the screen was framed around debunking the "f/1.8 background blur" myth; the
  screen has since been reframed around the fourth depth-of-field factor, and its `états`
  (`Le quatrième facteur` / `Le malentendu` / `La solution`) confirm that's the actual content.
- `bloc` (slide 22, the `ouverture` bloc's own opener) uses a generic id, while every other
  bloc-opener repère écran in this file (`mise-au-point`, `profondeur-de-champ`) uses `id:
  ouverture`, matching the écran's `variante`.

Every écran id also doubles as a URL segment (`/lecons/${numero}/${bloc.id}/${ecran.id}`, per
`src/src/lib/lecon.ts`), so a stale or inconsistent id is a small maintenance trap for anyone
reading the source later — the kind of "true months later, not just live" mismatch the project's
own authoring rule calls out.

## What Changes

- Rename écran id `le-mythe-du-f18` → `le-quatrieme-facteur` (bloc `profondeur-de-champ`).
- Rename écran id `bloc` → `ouverture` (bloc `ouverture`), matching the sibling bloc-openers.

No wording, `titre`, `claim`, or displayed content changes on either écran — ids only.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — internal identifier rename, no requirement or behavior changes)

## Impact

- `src/src/content/lecons/1.yaml`: two `id:` field renames.
- Route impact: the two renamed écrans' slideshow URLs change (their bloc/écran id segments).
  No known external links or handout references point at these specific URLs — participants
  navigate the slideshow sequentially, not by memorized link — so this is a cosmetic-only
  side effect, not a breaking one.
