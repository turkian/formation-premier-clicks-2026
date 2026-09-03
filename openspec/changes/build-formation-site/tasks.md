## 1. Project setup and deployment

- [ ] 1.1 Fill in `openspec/config.yaml` `context`: stack (Astro, static, GitHub Pages project path), French-Québec typography conventions, projection legibility floors, and the rule that `docs/` holds logistics while the site is canonical for concept explanations
- [ ] 1.2 Initialize the Astro project in `src/`, configured for a GitHub Pages repository sub-path
- [ ] 1.3 Add the GitHub Actions workflow that builds and deploys to Pages on push to `main`
- [ ] 1.4 Verify a deep link to a nested page resolves correctly under the deployed sub-path
- [ ] 1.5 Establish the shared design tokens: colour (dark neutral ground suited to displaying photographs), the three typographic tiers for projection, and the phone and print scales
- [ ] 1.6 Implement the French typography helpers — non-breaking spaces before `:` `;` `!` `?`, `« »` with non-breaking inner spaces, non-breaking spaces in numbers and units — and apply them site-wide

## 2. Content authoring model

- [ ] 2.1 Define the content collections: lessons (blocks and screens), lexique brands, reference sheets
- [ ] 2.2 Define the screen schema covering the five kinds: concept panel, demonstration, interactive, repère, « appareil en main »
- [ ] 2.3 Define the concept panel's four named regions — `claim`, `corps`, `schéma`, `aparté`
- [ ] 2.4 Define the ordered-states schema for accumulating panels
- [ ] 2.5 Define the demonstration slot schema: shooting specification, priority, lesson and block, and the single declared variable for a comparison series
- [ ] 2.6 Add a build-time check rejecting a comparison series that declares more than one differing variable

## 3. Site shell and hub

- [ ] 3.1 Build the home hub reaching all three lessons, the lexique, and the reference index in one click each
- [ ] 3.2 Add the course description page adapted from `plan-de-cours.md`
- [ ] 3.3 Verify the hub is readable and navigable at phone width without horizontal scrolling

## 4. Reference sheets and print pipeline

- [ ] 4.1 Build the reference sheet layout and the print stylesheet: one Letter page, site furniture suppressed, title and club attribution retained
- [ ] 4.2 Build the reference index, so adding a sheet requires editing no other page
- [ ] 4.3 Adapt the three aide-mémoire cards from `aide-memoire-participants.md` into reference sheets
- [ ] 4.4 Build the « ma photo est ratée » diagnostic sheet with every symptom, cause, and correction on one page
- [ ] 4.5 Build the export-recipes sheet from lesson 3's three numbered recipes
- [ ] 4.6 Verify each sheet prints to exactly one Letter page with nothing cut off, and reflows readably at phone width

## 5. Lexique

- [ ] 5.1 Build the shared brand-page layout with the numbered sections in a fixed order, so « section 2 de votre feuille » is correct for every brand
- [ ] 5.2 Build the brand selector with the choice remembered per device, and correct rendering when no choice is stored or storage is unavailable
- [ ] 5.3 Port all eight brand sheets: Canon, Nikon, Sony, Fujifilm, Lumix, Olympus/OM System, iPhone, Android
- [ ] 5.4 Handle the Fujifilm structural exception: the mode results from the aperture ring and shutter dial combination, with the four combinations given
- [ ] 5.5 Add the framing statement and the « si vous ne trouvez pas » guidance to every brand page
- [ ] 5.6 Implement search within the selected brand's terms and menu paths, matching on the camera's own vocabulary as well as the formation's

## 6. Lesson screen system

- [ ] 6.1 Build the lesson shell: ordered blocks and screens, forward and backward navigation, fullscreen
- [ ] 6.2 Implement panel state advancement — forward advances the state before advancing the screen; prior content is never removed
- [ ] 6.3 Build the block index with direct jumping, and the persistent `bloc N / M` position indicator
- [ ] 6.4 Implement stable per-screen deep links that restore the referenced panel state
- [ ] 6.5 Implement the projection and phone grid arrangements for the four named regions, with the diagram preceding the body at phone width
- [ ] 6.6 Add an authoring check that no screen overflows at 1024 × 768 or at 16:9
- [ ] 6.7 Build the « appareil en main » screen layout: consistent across all three lessons, recognizable from the back of the room, with the cellulaire and reflex variants
- [ ] 6.8 Build the repère screen layout for block openers, the pause, and the question blocks
- [ ] 6.9 Implement the QR handoff, rendered only on block openers and « appareil en main » screens

## 7. Interactive components

- [ ] 7.1 Implement the depth-of-field model: per-format circle of confusion, hyperfocal, near and far limits, and the qualitative bands from the spec
- [ ] 7.2 Verify the model against the lessons' kit-lens figures — APS-C, 50 mm, `f/5.6` at 1 m, 3 m, and 10 m yielding approximately 8 cm, 77 cm, and 10 m
- [ ] 7.3 Build the depth-of-field component: four levers with the three free ones visually distinguished from the one setting, focus position and zone thickness as separate controls, sensor format selector with its label always visible
- [ ] 7.4 Implement the two-tier readout: figure, qualitative band, and near and far limits, reporting sharp-to-infinity at or beyond the hyperfocal distance
- [ ] 7.5 Implement the kit-zoom preset whose maximum aperture narrows from `f/3.5` to `f/5.6` across 18–55 mm, with the control visibly refusing to open past the limit
- [ ] 7.6 Build the `f/`-as-division component: true-relative-scale diameters, the 24 mm versus 200 mm `f/2.8` pair, and the same-exposure statement
- [ ] 7.7 Build the shutter-and-motion component with subject movement and camera shake as two separately controllable blurs
- [ ] 7.8 Build the ISO-and-noise component presenting the trade-off as a judgement, not a scale alone
- [ ] 7.9 Build the mode-dial component: who holds aperture and shutter per mode, and exposure compensation shown inert in manual with the reason stated
- [ ] 7.10 Build the interactive diagnostic tree: symptom, then causes, then correction
- [ ] 7.11 Verify every component renders and responds with no demonstration photographs present, and is operable by touch at phone width

## 8. Demonstration media

- [ ] 8.1 Implement the asset slot: a missing image displays its own shooting specification, never a broken image or an error
- [ ] 8.2 Implement the comparison-series caption naming the single variable and stating the constant settings
- [ ] 8.3 Build the shot-list report from the declared slots: specification, lesson and block, priority, and present-or-missing status
- [ ] 8.4 Mark the essential slots per the spec, with the focus-distance series identified as the one to keep if only one can be prepared

## 9. Lesson 1 — la lumière et la netteté

- [ ] 9.1 Adapt the block structure from `formation_photo_session_1.md`, applying the `docs/`-to-screen rule: blockquotes become copy, tables become content, room-facing directions become on-screen affordances, animator-only pacing and preparation are dropped
- [ ] 9.2 Build the « quatre questions » and « comprendre la lumière » screens
- [ ] 9.3 Build the « ce qui est net : la mise au point » screens, keeping the focus-versus-aperture distinction explicit
- [ ] 9.4 Build the profondeur de champ concept panel: definition, thin versus thick zone, and the four levers with only one marked as a setting
- [ ] 9.5 Build the profondeur de champ accumulating panel state that withholds the 1 m / 3 m / 10 m table until revealed
- [ ] 9.6 Build the « trois frustrations que vous avez déjà vécues » panel and the « mythe du f/1.8 » screen
- [ ] 9.7 Build the ouverture accumulating panel with its four states: the vote, the reveal with the face-saving statement, the division, and the rule
- [ ] 9.8 Restate the 50 mm `f/1.8` figure in a single sensor format so the comparison with the kit-lens figures is consistent — 8 cm to 2,6 cm on APS-C, per design decision D6
- [ ] 9.9 Build the « votre appareil est prêt, et votre défi » screens
- [ ] 9.10 Declare lesson 1's demonstration slots: the three depth-of-field series, light direction, light quality, colour, and the out-of-focus versus camera-shake pair
- [ ] 9.11 Rehearse lesson 1 end to end at projection size with no photographs present, then again at phone width

## 10. Lesson 2 — l'exposition

- [ ] 10.1 Adapt the block structure from `formation_photo_session_2.md` under the same rule
- [ ] 10.2 Build the vitesse d'obturation screens, keeping subject blur and camera shake distinct
- [ ] 10.3 Build the ISO and low-light screens
- [ ] 10.4 Build the exposition, quatre modes, and compensation panel, including the two-ways-in framing and the Canon and Fujifilm naming notes
- [ ] 10.5 Build the accumulating panel that withholds why compensation does nothing in manual
- [ ] 10.6 Build the accumulating panel for the three metering failures, withholding the corrected exposure
- [ ] 10.7 Build the diagnostic synthesis screens for the four ateliers and the diagnostic tree
- [ ] 10.8 Build the séance 3 preparation screens
- [ ] 10.9 Declare lesson 2's demonstration slots, including the participant photographs collected after session 1
- [ ] 10.10 Rehearse lesson 2 end to end at projection size and at phone width

## 11. Lesson 3 — composer, développer, continuer

- [ ] 11.1 Adapt the block structure from `formation_photo_session_3.md` under the same rule
- [ ] 11.2 Build the diaporama opening screen accepting the participants' photographs
- [ ] 11.3 Build the composition screens for the five réflexes and the on-the-spot exercise
- [ ] 11.4 Build the JPEG and RAW screens and the « lire une image avant de la modifier » screens
- [ ] 11.5 Build the seven-gestures screens: the fixed order, the principle repeated at each gesture, and what no RAW recovers
- [ ] 11.6 Build the masques, netteté, and bruit screens
- [ ] 11.7 Build the trier and exporter screens, linked to the export-recipes reference sheet
- [ ] 11.8 Build the « et maintenant ? » closing screens: sortie photo, parrainage, question channels, défi mensuel, soirée critique
- [ ] 11.9 Declare lesson 3's demonstration slots, including the development demonstration photograph
- [ ] 11.10 Rehearse lesson 3 end to end at projection size and at phone width

## 12. Offline and fallback

- [ ] 12.1 Add the service worker caching visited lessons, reference sheets, lexique pages, and components
- [ ] 12.2 Verify that after a network loss, a visited lesson still navigates and its components still respond
- [ ] 12.3 Add the local-copy path that opens and navigates without a server, documented as the projection fallback
- [ ] 12.4 Add « ouvrez le site avant d'arriver » to the séance 1 feuillet content

## 13. Verification

- [ ] 13.1 Confirm no lesson screen contains timings, staffing, or preparation content, and that no screen addresses the animator rather than the participants
- [ ] 13.2 Confirm the five accumulating panels withhold their answers at first state
- [ ] 13.3 Confirm every reference sheet prints to one Letter page
- [ ] 13.4 Confirm « section 2 de votre feuille » is correct on all eight brand pages
- [ ] 13.5 Confirm the QR handoff appears only on block openers and « appareil en main » screens
- [ ] 13.6 Run `openspec validate --changes build-formation-site --strict`
