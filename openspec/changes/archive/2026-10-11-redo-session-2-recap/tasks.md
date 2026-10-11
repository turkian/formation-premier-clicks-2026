## 1. Aperture diagram variant

- [x] 1.1 Add a light-focused mode to `src/src/components/schemas/DiametreOuverture.astro` selected by props, hiding the `focale ÷ f = mm` line and adding a more-light ↔ less-light axis; verify by building and viewing a panel that requests it
- [x] 1.2 State on the variant that a small `f`-number means a large opening, at the projection body size; verify the text is not in the smallest size and that no ratio, stop or division appears
- [x] 1.3 Confirm session 1's `diametre-ouverture` panel (no mode requested) renders exactly as before, with the arithmetic line; verify by comparing the built output of `1.yaml`'s screen before and after

## 2. Recap block content

- [x] 2.1 Replace `mes-rates` in the `retour` block of `src/src/content/lecons/2.yaml` with the `bilan` discussion screen, naming session 1 by rank; verify the built page has no relative-time wording and no exercise reference
- [x] 2.2 Add `rappel-budget`: light as a limited quantity, with the light-focused aperture diagram and generic more/less wording; verify about 100 words plus the diagram
- [x] 2.3 Add `un-prix`: the same setting also sets the sharp zone, using `zone-nette` and a callout saying that in automatic mode the camera settles the trade-off; verify the panel is self-sufficient when read alone
- [x] 2.4 Add `rappel-leviers`: the four levers with aperture singled out, reusing `quatre-leviers`; verify aperture is in the accent colour and the other three are labelled as free
- [x] 2.5 Add the intro screen before `le-programme`, framing the session's question and three teasers (speed, ISO, who decides); verify it does not repeat the wording of `le-programme` and that `le-programme` is unchanged
- [x] 2.6 Check the block against the recap specs: no phone notes, no shutter speed, ISO or stops in the recap panels, and the block fits five to seven minutes; verify by reading the built screens in order

## 3. Verification

- [x] 3.1 Run `npm run build` in `src/` and verify it succeeds
- [x] 3.2 Run `npm run verifier:contenu` and verify all checks pass, including the one that keeps screens from addressing the animateur and the rank-based naming of sessions
- [x] 3.3 Run `npm run verifier` and verify no screen of the new block overflows at 1024 × 768 or 16:9
- [x] 3.4 Run `openspec validate redo-session-2-recap --strict` and verify it reports the change as valid

## 4. Revisions after review

- [x] 4.1 Rewrite `rappel-budget` as a stacked panel: aperture as the opening that lets light in, a subtitle on more and less light, and the light variant with one simulated photograph per opening (`photos`, `l2-lumiere-*.jpg`); remove the focal-length caption; verify the four columns fit at 1024 × 768, 16:9 and phone width
- [x] 4.2 Add stacked panels (`disposition: empilee`, implicit for a diagram without a body); verify the order is claim, body, diagram at every width
- [x] 4.3 Rewrite `un-prix` around the depth of field (sharp zone in front of and behind the subject), replace the automatic-mode callout with aperture setting brightness and rendering, and add `arrierePlan` to `zone-nette`; verify session 1's `zone-nette` panels do not draw the background
- [x] 4.4 Add `rappel-mise-au-point` (focus chooses where, `AF-S` / `AF-C`, distance and the sharp zone) with `zones` on `distance-sujet`; verify session 1's withheld-answer panel still shows distances only
- [x] 4.5 Rewrite `rappel-leviers` as four levers to build an image, in order of choice, with aperture last; verify lever 4 is not described as changing the depth of the sharp zone
- [x] 4.6 Replace the intro screen with `deux-nouveaux-leviers` (renamed from `la-question`): speed and ISO as two `colonnes` cards; verify no internal link pointed to the old id
- [x] 4.7 Run `npm run verifier:contenu`, `npm run verifier` on a build with session 2 enabled, and `npm run verifier:liens`; verify no new failure
- [x] 4.8 Update the change's proposal, design and delta specs to match, and run `openspec validate redo-session-2-recap --strict`
