# Tasks

## 1. Lesson content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, screen `rappel-m-iso-auto`, set `titre` to « M, mais pas tout manuel » and `claim` to « Sur la molette, c'est `M`. Avec l'ISO auto, vous gardez l'ouverture et la vitesse. L'appareil règle le volume. » (design decisions 1 and 2). Leave the `id`, `corps`, `encadre`, `aparte`, `ton` and `icone` unchanged. Verify by opening `/lecons/3/retour/rappel-m-iso-auto/` in `npm run dev`: the new title and claim show at the same URL.
- [x] 1.2 Check French typography in the rendered text: the title's comma, the apostrophes and the code-formatted `M`, with no hand-typed spacing in the YAML. Verify by inspecting the rendered HTML of the screen.

## 2. Verification

- [x] 2.1 From `src/`, run `npm run build` and `npm run verifier` with `SEANCES_TOUJOURS_PRETES=1` (session 3 is `pret: false`). Verify that both pass with no new errors.
- [x] 2.2 Run `npm run verifier:projection`. Verify that `rappel-m-iso-auto` fits with no overflow at 1024 × 768 and in 16:9.

## 3. Revision after viewing the screen

The first wording still opened the projected headline on `M` (design decision 1, first rejected
option). Tasks 1.1 to 2.2 applied it; this group replaces it.

- [x] 3.1 In `rappel-m-iso-auto`, set `titre` to « Un mode à moitié automatique » and `claim` to « Un mode à moitié automatique : vous gardez l'ouverture et la vitesse, l'appareil choisit l'ISO. » (design decisions 1 and 3). After the numbered list in `corps`, add a paragraph: « Sur la molette : `M`, avec l'ISO auto. » (decision 2). Verify in the built HTML that the `<h1 class="claim">` contains no `M` in a `code` element and that the body line does.
- [x] 3.2 Check the typography: a thin non-breaking space before both `:`, no hand-typed spacing in the YAML. Verify by inspecting the rendered HTML.
- [x] 3.3 From `src/`, run `npm run build`, `npm run verifier` and `npm run verifier:projection` with `SEANCES_TOUJOURS_PRETES=1`. Verify that all pass, and that the longer headline fits at 1024 × 768 and in 16:9.

## Workflow follow-up

- Archive the change once the screen has been checked.
