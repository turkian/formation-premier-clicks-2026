## Context

The screen `la-photo-devient-un-art` (session 3, block `histoire`) has two images in
`src/src/content/lecons/3.yaml`: `l3-histoire-rejlander` (1775×961) on the left and
`l3-histoire-robinson` (« Fading Away », 2048×1304) on the right. The footer's « Photo de gauche /
Photo de droite » credit line comes from the order of the images (`src/src/lib/demos.ts`), so
swapping the YAML entries also swaps the footer. The rights comment above the block lists each
archival image with its author's death year. See proposal.md for why the image goes.

## Goals / Non-Goals

**Goals:**
- Keep the screen's argument (staged, multi-negative composition borrowed from painting) with a
  clothed scene.
- Keep the curved-top, wide format of the image it replaces, so the layout barely moves.

**Non-Goals:**
- Editing the archived change `2026-11-11-rework-session-3-better-pictures`. It records what was
  decided then, Rejlander included.
- Mentioning Rejlander anywhere else on the site, or explaining why he is gone.

## Decisions

**Source: the 1901 halftone on Wikimedia Commons.**
`File:Bringing_Home_the_May,_H._P._Robinson,_The_Practical_and_junior_photographer,_vol_1,_No_9,_April_1901,_p_257.jpg`,
2479×1038, grayscale, {{PD-1923}}, scanned by the Internet Archive
(`practicaljuniorp1190unse`, p. 256–257). It shows the whole composition: a curved top, about a
dozen clothed women and girls, no nudity.

Alternatives considered:
- The Harry Ransom Center print (ca. 1862–1863, albumen). It is the better object, but there is
  only a small blog image with no rights statement.
- The Tokyo Photographic Art Museum's nine separate studies. They show the parts, not the
  assembled tableau the screen is about.
- Rejlander's *Hard Times* (1860). It would keep Rejlander, but it is a second dark bedside
  interior next to *Fading Away*.
- Cropping *The Two Ways of Life*. The nudes are spread across the whole frame.

**Crop and export like the other demos.** Remove the printed caption band (« Bringing Home the
May. H. P. Robinson. ») and the white margin under the image's bottom edge. Keep the curved top
with its black border. Save as an sRGB JPEG with no resampling, since 2479 px wide is already
above the other demos, as `src/public/demos/l3-histoire-robinson-mai.jpg`.

**New id rather than reusing `l3-histoire-rejlander`.** The id names the image. Keeping the old id
would leave a misleading name in the content and the shot list.

**Order: « Fading Away » then « Bringing Home the May ».** Date order (1858, 1862). The screen
also builds from five negatives to nine, and from an interior scene to a landscape.

**Wording.** The aside becomes « Robinson a d'abord étudié la peinture. Il **met en scène** : des
modèles qui posent, des groupes placés, plusieurs négatifs réunis en une seule image. La
composition se décide avant le déclenchement. » The caption (`valeur`) is « Robinson, 1862 — neuf
négatifs, un seul paysage ». The credit gives the archive the file comes from, like the Smith
credit: « Henry Peach Robinson, 1862, Internet Archive ». The longer
form (« …, The Practical and Junior Photographer, 1901 ») wrapped the 16:9 footer onto two lines
and broke the previous/next navigation, so the full reference lives in the image's
`specification` and in the rights comment instead.

## Risks / Trade-offs

- [A halftone looks greyer and flatter than the « Fading Away » scan beside it] → Accepted. At
  half-screen width the dot screen is not visible. If it looks too flat once projected, a mild
  levels adjustment at export is allowed. No sharpening, which would bring out the dots.
- [The loupe, if the screen offers one, magnifies the halftone dots] → The screen declares no
  `loupeImages`, so nothing changes. Do not add a loupe here.
- [« Neuf négatifs » is the commonly cited count; some sources hedge] → The Ransom Center's
  conservation note and the Tokyo museum's nine studies both give nine. Keep it.
- [Two images by the same photographer may read as repetitive] → The two are visually opposite
  (indoor and intimate, outdoor and wide), and the next screen is also Robinson's, so the block
  reads as one thread.
