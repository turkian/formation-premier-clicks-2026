# Tasks

## 1. The scan

- [x] 1.1 Download page 24 at full resolution (archive.org `pictorialeffecti00robi`, leaf 30) into a scratch directory, resize it to 2048 px tall like the current file, and save it over `src/public/demos/l3-histoire-robinson-effet.jpg`. Verify with `file` that it is a portrait JPEG 2048 px tall, and by opening it that it shows the rectangle with one diagonal (fig. 2) and the cliff and beach (fig. 3).

## 2. The screen

- [x] 2.1 In `src/src/content/lecons/3.yaml`, on `les-regles-s-ecrivent`, replace `illustration.specification`, `alt` and `valeur` with the values in design.md §6, and replace `corps` with the text in design.md §5. Leave `id`, `titre`, `claim`, `credit`, `priorite` unchanged, and remove `aparte` (design.md §7). Verify that `/lecons/3/histoire/les-regles-s-ecrivent/` renders the new scan with the caption « Robinson, 1869 — la diagonale », the headings *Le sujet*, *Les lignes*, *L'ombre et la lumière* in that order, all eleven bullets, no « jamais » and no mention of a later screen.
- [x] 2.2 Check the fit at 1024 × 768 and at 16:9: the statement, the scan with its caption, and all eleven bullets are visible without scrolling, the body stays at the body size, and the diagonal on the scan is visible. Verify with both screenshots and a clean `npm run verifier:projection` for this screen. If it overflows, shorten bullets as design.md's Risks say, and record the final wording back in design.md §5.

## 3. Integration

- [x] 3.1 From `src/`, run `npm run build`, `npm run verifier` and `npm run verifier:contenu`, and verify that all three pass.
- [x] 3.2 Run `openspec validate session-3-rules-panel-lines-and-light --strict` and verify that it passes.

## Workflow follow-up

- Archive the change once the screen has been reviewed in projection.
