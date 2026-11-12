# Tasks

## 1. Lesson content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, rewrite `rappel-iso`. New claim (design decision 4). Remove `corps`. Add two `colonnes`: « Le volume en haut » (`lucide:volume-2`, slot `l3-rappel-iso-haut` → `l2-iso-nette-bruitee.jpg`) and « Le volume en bas, éclairci après » (`lucide:volume-1`, slot `l3-rappel-iso-bas` → `l2-iso-eclaircie.jpg`). Each slot has a `specification`, an `alt`, `priorite: complement` and the shared `cadrage: { point: [40, 62], zoom: 3 }`. Keep the `encadre`, `ton` and `icone`. Verify by opening `/lecons/3/retour/rappel-iso/` in `npm run dev`: two cards, each photo cropped on the same point, callout below. _Done as « Le volume en bas » with the caption « ISO bas, éclaircie après. Plus de bruit, pas moins. »: the longer title and caption made the right card's photo box shorter, so the same `scale` showed a different area (design decision 6)._
- [x] 1.2 In `rappel-m-iso-auto`, change the third list item to « **L'ISO**, en dernier, qui expose bien — l'appareil. » Verify on `/lecons/3/retour/rappel-m-iso-auto/` that « en dernier » appears, and that `rappel-iso` no longer says it.
- [x] 1.3 Check French typography in the rendered text: thin non-breaking space before `;` and `:`, no hand-typed spacing in the YAML. Verify by inspecting the rendered HTML of both screens.

## 2. Verification

- [x] 2.1 Run `npm run build` and `npm run verifier` from `src/`. Verify that both pass with no new errors, and that the build check on screen content accepts the two new slots. _Needed a one-line fix in `scripts/verifier.mjs` (commit 8c08a7e): the projection check counted a `cadrage` crop as an overflow. Run with `SEANCES_TOUJOURS_PRETES=1`, since session 3 is `pret: false` and an ordinary build leaves it out._
- [x] 2.2 Run `npm run liste-de-prises-de-vue`. Verify that the two new slots are listed as `complement` and present, since their files exist.
- [x] 2.3 Run `npm run verifier:projection`. Verify that `rappel-iso` fits with no overflow at 1024 × 768 and in 16:9.
- [ ] 2.4 On the projector (or a 1024 × 768 window seen from a distance), adjust the `cadrage` point and zoom until the grain in the shadow can be compared on both photos. Verify that both cards still share the same values, and record the final values in design.md decision 5.
- [x] 2.5 Check the phone and print views of `rappel-iso`. Verify that the cards stack on one column and that the crop is the same. _Phone: stacked, same crop. Print: the two cards stay side by side, which is how the existing print layout handles any `colonnes` panel; the crop is the same on both._

## 3. Linked loupe on the panel

- [x] 3.1 Move the linked-loupe script from `Demonstration.astro` to `src/lib/loupe-liee.ts`, started on any `[data-loupe]` container, and the hint to `IndiceLoupe.astro`. Verify that the session 2 « Même lumière, trois issues » series still magnifies its three photographs together.
- [x] 3.2 Add an optional `loupe` to the panel schema; in `Panneau.astro`, put `data-loupe` on the columns, give the column photographs their loupe window, and show the hint below. Verify in a browser that Shift over one `rappel-iso` photograph magnifies the same point on both, and that releasing Shift hides both.
- [x] 3.3 Declare `loupe: { zoom: 8 }` on `rappel-iso`. Verify that `npm run verifier` (with `SEANCES_TOUJOURS_PRETES=1`) passes.
- [ ] 3.4 On the projector, adjust the loupe zoom with the crop (task 2.4) and record the values in design.md decision 1.

## Workflow follow-up

- Archive the change once the projector check (2.4) is done.
