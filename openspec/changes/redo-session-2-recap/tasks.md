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
