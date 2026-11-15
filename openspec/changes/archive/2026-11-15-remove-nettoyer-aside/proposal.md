# Proposal

## Why

The « Nettoyer » panel in session 3 ends with an aside under its cards: « **Personne ne regarde ses
quatre coins naturellement** : tout le monde regarde le sujet. C'est pour ça que ce réflexe-là change
tout. » The claim and the two cards already make the point. The aside repeats the four-corners
advice, which the card bodies stopped giving in `describe-composition-cards`. The presenter can say
it in the room.

## What Changes

- Remove the `aparte` from the `composition/nettoyer` panel in `src/src/content/lecons/3.yaml`.
- The panel keeps its claim, its two columns (titles, icons, bodies, images, credits) and its photo
  credit line.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that session 3's « Nettoyer » panel shows no aside under its cards.

## Impact

- `src/src/content/lecons/3.yaml`: two lines removed (the `aparte` block of `nettoyer`).
- No schema or component change: `aparte` is already optional on `panneau` screens.
- The screen gets shorter at 4:3 and 16:9. This only frees space, so the projection and phone
  checks should still pass.
