# Proposal

## Why

The session 3 recap panel on ISO (`rappel-iso`) is text only. On the projector its claim, two
paragraphs and callout fill the top of the screen and leave the bottom half empty. It is also the
only recap panel without an image: the shutter-speed panel just before it shows two session 2
photographs side by side. Its callout claims that noise comes from a lack of light, not from ISO,
but the panel only states this, while session 2 already has the photographs that show it.

## What Changes

- `rappel-iso` becomes a two-column panel, like `rappel-vitesse`. Each column reuses a session 2
  photograph of the gas-station series:
  - high ISO, well exposed: sharp, a little grain;
  - low ISO, brightened afterwards: **more** noise, not less.
- Both photographs open on the same resting crop, zoomed in on a shadow next to a lit area. The
  grain cannot be seen in the full frame at projection size.
- The two photographs share a linked loupe, as the session 2 series does: the resting crop alone
  did not make the grain visible enough on the projector. A panel can now declare a `loupe` for
  its column photographs.
- The claim no longer says that ISO comes last. It states what ISO is: the volume, which
  amplifies the light captured and adds none.
- The two body paragraphs are removed. The callout (« Le bruit vient du manque de lumière… »)
  stays unchanged.
- « En dernier » moves to the next recap panel, `rappel-m-iso-auto`, whose ordered list already
  shows the order of the choices.
- The linked-loupe script moves out of `Demonstration.astro` into a shared module, and the hint
  into a small component, so the panel can use both.

## Capabilities

### New Capabilities

_None._ (`demo-media` gains a requirement, below.)

### Modified Capabilities

- `lessons`: the session 3 recap scenario now puts « ISO chosen last » on the manual-mode panel,
  and the ISO recap panel must show the noise with two cropped photographs.
- `demo-media`: a panel whose columns show the same scene may declare a linked loupe.

## Impact

- `src/src/content/lecons/3.yaml`: the `rappel-iso` and `rappel-m-iso-auto` screens.
- Reuses `public/demos/l2-iso-nette-bruitee.jpg` and `l2-iso-eclaircie.jpg` under new
  session 3 slot ids. No new image file.
- The session 3 shot list gains two `complement` slots that point to files that already exist.
- `content.config.ts` (panel `loupe`), `Panneau.astro`, `Demonstration.astro`, new
  `lib/loupe-liee.ts` and `components/IndiceLoupe.astro`.
- `scripts/verifier.mjs`: the projection check no longer counts a resting crop as an overflow.
- The crop and loupe values must be checked on the projector.
