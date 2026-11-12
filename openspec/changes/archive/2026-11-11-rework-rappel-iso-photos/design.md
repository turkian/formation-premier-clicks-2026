# Design

## Context

See proposal.md for the motivation and specs/lessons/spec.md for the required behavior.

A static panel with no drawing renders on one column, and its text sits at the top of the screen.
A panel with `colonnes` renders its cards side by side, and the photographs take the remaining
height. `rappel-vitesse` already uses this layout. A card image is an ordinary demonstration slot
and accepts `cadrage`, which `Panneau.astro` already passes to the image. The loupe is reserved
for comparison series on demonstration screens.

## Goals / Non-Goals

**Goals:**

- Fill the screen with content that shows the callout's point.
- Match the structure of the recap panel just before it.

**Non-Goals:**

- No change to the panel layout or its CSS.
- No new photograph.

## Decisions

**1. Fixed resting crop, plus a linked loupe.**
The grain only shows when zoomed in. A `cadrage` shared by both cards shows it at rest, with no
interaction, on a projector or printed. On the projector it was still too faint, so the panel also
declares `loupe: { zoom: 8 }`. The zoom is relative to the whole image, and the resting crop
already shows 3×, so 8 is about 2.7× more than the resting view. The loupe is the session 2 one,
moved into `lib/loupe-liee.ts` and started on any `[data-loupe]` container; `Panneau.astro` puts
that attribute on its columns only when the screen declares `loupe`. A panel declares it only when
all its columns show the same scene. Clicking a card still opens the full frame.

**2. The pair: high ISO, and low ISO brightened afterwards.**
These two photographs are the counter-intuitive pair: the one with the lower ISO is the noisier.
That is exactly the callout's point. The third photograph of the series (low ISO, slow speed,
blurred) is about where the light came from. It belongs to the session 2 demonstration, not to
this recap.

**3. New slot ids, same files.**
`l3-rappel-iso-haut` and `l3-rappel-iso-bas` point to `l2-iso-nette-bruitee.jpg` and
`l2-iso-eclaircie.jpg`, priority `complement`, as `l3-rappel-figer` does. The session 3 shot list
stays complete, and the image files are not duplicated.

**4. « En dernier » goes to `rappel-m-iso-auto`.**
That panel already lists the order 1 · aperture, 2 · speed, 3 · ISO. Its third item becomes
« **L'ISO**, en dernier, qui expose bien — l'appareil. » The claim is unchanged. The ISO claim
becomes « L'ISO, c'est le volume. Il amplifie la lumière captée ; il n'en ajoute pas. »

**5. Starting crop: `{ point: [40, 62], zoom: 3 }`.**
This is around the propane cabinet: the lit white wall, the dark hedge and the cabinet's shadows
in one view. The values are a starting point, to be checked on the projector.

**6. Both cards keep the same text height.**
`cadrage` scales the image inside its box, so a box with a different shape shows a different area.
The box height depends on the text above the photo. The right card's title is therefore
« Le volume en bas » rather than « Le volume en bas, éclairci après », and its caption is
« ISO bas, éclaircie après. Plus de bruit, pas moins. » Both boxes measure the same at
1024 × 768, 1280 × 720, 1920 × 1080 and on the phone.

## Risks / Trade-offs

- [The grain is still too faint at zoom 3 on the projector] → Raise the zoom, up to 4 or 5, and
  move the point to the hedge or the asphalt.
- [The resting crop hides that the two photographs are the same scene] → The captions say
  « même lumière », and clicking opens the full frame.
- [The card text plus the claim and callout go past the size limit] → Each card has one short
  sentence. The panel stays well under 100 words.
