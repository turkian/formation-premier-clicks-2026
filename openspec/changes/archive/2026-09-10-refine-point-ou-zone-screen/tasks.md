## 1. Content

- [x] 1.1 In `src/src/content/lecons/1.yaml`, on the `mise-au-point` bloc's `point-ou-zone`
      screen: remove the "C'est la confusion la plus fréquente chez les débutants — et les
      deux réglages se règlent séparément." sentence from `corps`.
- [x] 1.2 On the same screen's `corps`, add a parenthetical to the *mise au point* bullet
      linking it to « le focus » (the anglicism most participants already use), e.g.
      "**La mise au point** — ce qu'on appelle souvent « faire le focus » — c'est **où**
      l'appareil fait le point." Keep it inline in the existing bullet; don't add a new
      sentence or paragraph.
- [x] 1.3 On the same screen, move the `aparte` text ("Ce que fait réellement
      l'autofocus…") to `encadre`, unchanged. Add `icone: lucide:focus`. Leave `ton` unset
      (defaults to `neutre` — this note is explanatory, not a warning, unlike the
      neighboring `autofocus` screen's ⚠️ note).
- [x] 1.4 Re-read `claim`, `corps`, `schema`, and `encadre` together on the edited screen to
      confirm it still reads as one coherent ~100-word panel, not a fragment, now that the
      callout renders inline after the body instead of at the bottom.

## 2. Verification

- [x] 2.1 Run `npm run verifier:contenu` (content rules, including Québec French
      typography).
- [x] 2.2 Run `npm run verifier:projection` and `npm run verifier:telephone` to confirm the
      screen renders correctly at both breakpoints now that it carries a callout box.
      `verifier:projection` reports 2 pre-existing failures on an unrelated lesson-3 screen
      (`/lecons/3/et-maintenant/la-suite/`), confirmed present on `main` before this edit
      (checked via `git stash`); the `point-ou-zone` screen itself passes.
- [x] 2.3 Run `npm run build` to confirm the site builds clean.
- [x] 2.4 View the `point-ou-zone` screen in the dev server at a projector-width viewport:
      confirm the removed sentence is gone, the focus parenthetical reads naturally inline,
      and the callout box with its icon renders after the body text, above the
      `point-et-zone` diagram, without pushing content off the 4:3 (1024×768) floor.
      Verified via Playwright screenshot at 1024×768: sentence absent, "faire le focus"
      renders inline in the first bullet, the encadre renders as a bordered box with its
      icon after the corps, and `scrollHeight` (768) matches viewport height exactly — no
      overflow.
