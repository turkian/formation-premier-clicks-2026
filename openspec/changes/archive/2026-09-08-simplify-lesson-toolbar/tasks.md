## 1. Fix the fullscreen selector collision

- [x] 1.1 Rename the fullscreen button's attribute in `src/src/layouts/Ecran.astro` from
      `data-plein-ecran` to a name that can't collide with `<html data-plein-ecran="oui">`
      (e.g. `data-bouton-plein-ecran`), and update the matching `querySelector` call.
- [x] 1.2 Verify (via a real click in a browser, not just reading the code) that clicking the
      slide body no longer toggles fullscreen, and that clicking the fullscreen control still
      toggles it correctly in both directions.
- [x] 1.3 Verify `aria-pressed` now updates on the visible fullscreen button after toggling.

## 2. Remove the block-index modal

- [x] 2.1 Delete `src/src/components/IndexBlocs.astro`.
- [x] 2.2 Remove its usage (`<IndexBlocs lecon={lecon} blocCourant={arret.bloc.id} />`) from
      `Ecran.astro`.
- [x] 2.3 Remove the `data-ouvrir-index` button, its click listener, the `dialogue` lookup, the
      `i`/`I` keydown case, and the `dialogue?.addEventListener('click', ...)` backdrop-close
      handler from `Ecran.astro`'s script.
- [x] 2.4 Remove the now-unused `dialog.index-blocs` CSS rules from `src/src/styles/lecon.css`.

## 3. Retarget and relabel the remaining two controls

- [x] 3.1 Change the button that used to open the index into an `<a href={lien('/')}>` labelled
      "Premiers clics".
- [x] 3.2 Change the "Sommaire" link's `href` to the lesson's first screen
      (`/lecons/${lecon.numero}/${lecon.blocs[0].id}/${lecon.blocs[0].ecrans[0].id}`) and relabel
      it "Début".
- [x] 3.3 Reorder the toolbar markup to: Plein écran, Début, Premiers clics.

## 4. Verify

- [x] 4.1 Run `npm run verifier:liens` and `npm run verifier:contenu`; fix any assertion that
      still expects the old labels, the removed index, or the old "Sommaire" target.
- [x] 4.2 Manually check one lesson screen at projection width and at phone width (per the
      `lessons` spec's projection/phone requirements) after the edit.
- [x] 4.3 Confirm no other file in the repo references `IndexBlocs`, `data-ouvrir-index`, or the
      `i` keyboard shortcut hint.

## 5. Update specs

- [ ] 5.1 Run `openspec archive simplify-lesson-toolbar` (or the project's archive step) once the
      above is verified, so the `lessons` spec delta merges into `openspec/specs/lessons/spec.md`.
