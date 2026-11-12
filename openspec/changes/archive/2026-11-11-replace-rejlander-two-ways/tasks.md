# Tasks

## 1. Image file

- [x] 1.1 Download the Commons original of `Bringing_Home_the_May,_H._P._Robinson,_The_Practical_and_junior_photographer,_vol_1,_No_9,_April_1901,_p_257.jpg`. Crop off the printed caption band and the white margin below the image's bottom edge, and keep the curved top with its black border. Save it as an sRGB JPEG without resampling to `src/public/demos/l3-histoire-robinson-mai.jpg`. Verify by viewing the file: no caption text, the whole scene is present, and no figure is nude or partly nude
- [x] 1.2 Delete `src/public/demos/l3-histoire-rejlander.jpg`. Verify that `ls src/public/demos/l3-histoire-*` lists `robinson`, `robinson-mai`, `robinson-effet`, `smith` and `smith-regle`, and nothing else

## 2. Session 3 content

- [x] 2.1 In `src/src/content/lecons/3.yaml`, screen `la-photo-devient-un-art`: replace the `l3-histoire-rejlander` entry with `l3-histoire-robinson-mai`, with `specification`, `alt`, `valeur` « Robinson, 1862 — neuf négatifs, un seul paysage » and `credit` « Henry Peach Robinson, 1862, Internet Archive » (short enough to keep the 16:9 footer on one line), as in design.md. Move it after `l3-histoire-robinson` so that « Fading Away » (1858) comes first. Verify the two `images` entries read 1858, then 1862
- [x] 2.2 Rewrite the screen's `aparte` for Robinson alone, in the singular, as in design.md. Verify that `grep -n -i rejlander src/src/content/lecons/3.yaml` matches nothing outside the rights comment
- [x] 2.3 In the rights comment above the `histoire` block, replace the Rejlander line with `Robinson († 1901)  1862  Bringing Home the May — reproduit dans The Practical and Junior Photographer, avril 1901, p. 257, numérisé par l'Internet Archive (Wikimedia Commons)`. Verify that `grep -n -i rejlander src/src/content/lecons/3.yaml` returns nothing
- [x] 2.4 Run `npm run liste-de-prises-de-vue` in `src/`. Verify `l3-histoire-robinson-mai` is listed and `l3-histoire-rejlander` is not

## 3. Integration checks

- [x] 3.1 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`. Verify both pass
- [x] 3.2 Build the site and run `npm run verifier:projection` and `npm run verifier:liens`. Verify both pass and nothing references `l3-histoire-rejlander.jpg`
- [x] 3.3 Open `/lecons/3/histoire/la-photo-devient-un-art/` on the built site at 16:9 and 4:3. Check that « Fading Away » is on the left and « Bringing Home the May » on the right. Check that the footer reads « Photo de gauche : Henry Peach Robinson, 1858 … · Photo de droite : Henry Peach Robinson, 1862 … », and that no text on the screen names Rejlander
- [x] 3.4 Run `openspec validate replace-rejlander-two-ways --strict`. Verify the change is valid

## Workflow follow-up

- Archive the change once implemented and reviewed. Then check that `openspec/specs/demo-media/spec.md` carries the no-nudity requirement and that the `lessons` history requirement has the second-screen scenario.
