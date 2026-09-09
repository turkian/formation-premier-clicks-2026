## 1. Content edit

- [x] 1.1 In `src/src/content/lecons/1.yaml`, rename écran id `le-mythe-du-f18` to
      `le-quatrieme-facteur` (bloc `profondeur-de-champ`). No other field changes.
- [x] 1.2 In `src/src/content/lecons/1.yaml`, rename écran id `bloc` to `ouverture` (bloc
      `ouverture`, the bloc's own opener écran). No other field changes.

## 2. Verification

- [x] 2.1 Grep the repo for the old ids (`le-mythe-du-f18`, and the literal `id: bloc` under the
      `ouverture` bloc) to confirm nothing else references them.
- [x] 2.2 Build the site and confirm the lesson-summary page's links resolve to the new écran
      URLs with no dead links.
