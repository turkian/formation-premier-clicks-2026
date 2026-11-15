# Proposal

## Why

The « Captiver » panel in session 3's « Au-delà de la composition » block ends with an aside under
its cards: « Un exemple célèbre, qu'on ne peut pas montrer ici : Elliott Erwitt, *New York City*,
1974 — un petit chien entre les bottes de sa maîtresse et les pattes d'un très grand chien. » The
aside describes a photo that the screen cannot show. The claim and the two archive photographs
(Riis, Stieglitz) already make the point. The presenter can mention Erwitt in the room.

## What Changes

- Remove the `aparte` from the `au-dela/captiver` panel in `src/src/content/lecons/3.yaml`.
- The panel keeps its claim, its two columns (titles, icons, bodies, images, credits) and its photo
  credit line.
- Update the comment above the `au-dela` block, which says Erwitt is « nommé en aparté ». Only
  Cartier-Bresson and Crewdson are still named in an aside (« Faire imaginer »).
- The « Faire imaginer » aside (Stieglitz's wait, Cartier-Bresson, Crewdson) is unchanged.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that session 3's « Captiver » panel shows no aside under its cards.

## Impact

- `src/src/content/lecons/3.yaml`: the `aparte` block of `captiver` is removed (four lines) and the
  `au-dela` header comment is reworded.
- No schema or component change: `aparte` is already optional on `panneau` screens.
- The screen gets shorter at 4:3 and 16:9. This only frees space, so the projection and phone
  checks should still pass.
