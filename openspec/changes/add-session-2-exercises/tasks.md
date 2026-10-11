## 1. Content

- [x] 1.1 Create `src/src/content/exercices/2.yaml` with `numero: 2`, `titre: L'exposition`, and
      a header comment in the style of `exercices/1.yaml`; verify `npm run build` (from `src/`)
      accepts it against the `exercices` schema.
- [x] 1.2 Write the six speed exercises (#1–#6 in design.md: `figer-ou-laisser-voir`,
      `qui-a-bouge`, `votre-vitesse-limite`, `dessiner-la-lumiere`, `le-flou-voulu`, `le-file`),
      each solo, with a `cellulaire` note giving the phone alternative; verify against leçon 2's
      `vitesse` bloc that the speeds and rules quoted (1/focale, 1/30 panning…) match.
- [x] 1.3 Write the three ISO exercises (#7–#9: `l-iso-eclaircit`, `ne-sous-exposez-pas`,
      `m-et-iso-auto`), each with a `cellulaire` note, citing « section 1 » or « section 3 » of the
      brand sheet where a control must be found; verify against leçon 2's `iso` bloc.
- [x] 1.4 Write the two compensation exercises (#10–#11: `le-blanc-et-le-noir`, `le-contre-jour`),
      with no `cellulaire` note, citing « section 3 » for `+/−`; verify the directions and amounts
      match leçon 2's `plus-clair-plus-sombre` screen.

## 2. Verification

- [x] 2.1 Run `npm run verifier:contenu` (from `src/`) and confirm it passes, including §13.5 (no
      « soir » radical, no séance situated relative to the reader) for `exercices/2.yaml`.
- [x] 2.2 Run `npm run verifier:modele` and `npm run verifier:telephone` and confirm both pass.
- [x] 2.3 Open `/exercices/2` at phone width in the dev server: eleven exercises, no horizontal
      scroll, typography (thin spaces, « », `f/5.6`, `1/125 s`) applied; and confirm the hub's
      « Exercices » section shows a second card « Séance 2 · L'exposition ».
- [x] 2.4 Confirm `git diff --stat` touches only `src/src/content/exercices/2.yaml` (plus this
      change's own files) — `exercices/1.yaml`, the schema, the page and the lessons unchanged.
