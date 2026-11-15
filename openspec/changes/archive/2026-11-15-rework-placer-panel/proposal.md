# Proposal

## Why

The « Placer » panel in session 3 ends with an aside under its cards: « **La règle des tiers est un
point de départ, pas une loi.** Smith l'a nommée en 1797, pour le dessin. La grille de votre
appareil ou de votre téléphone trace les tiers pour vous. » The claim and the two cards already
make the point. The camera grid is already covered in session 1 and on the iPhone and Android
pages. The presenter can say the rest in the room.

The panel also leaves out a placement rule that the lesson names but never shows: room in front of
the subject. The Robinson summary panel lists « En portrait, le visage net, éclairé, de l'espace
devant », but no composition card illustrates it.

## What Changes

- Remove the `aparte` from the `composition/placer` panel in `src/src/content/lecons/3.yaml`.
- Add a third card, « L'espace devant », after « Les tiers » and « Le centre assumé ». Its body
  reads « Plus de place du côté où le sujet regarde ou avance. » Its photograph is an archival
  public-domain photograph where a subject, seen in profile or moving, has clearly more room on
  the side it faces.
- Keep the claim « Décentré ou centré — franchement. Jamais entre les deux. » unchanged. Room in
  front is one reason to move the subject off centre, so the claim still covers all three cards.
- Update the panel's photo credit line to name the third photograph.
- The composition block no longer makes any historical reference: the 1797 origin of the rule of
  thirds leaves the screen and is not moved elsewhere.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: session 3's « Placer » panel shows three cards and no aside. The composition block
  makes no historical reference. The rule of thirds is shown as one of three ways to place the
  subject, not as a starting point.

## Impact

- `src/src/content/lecons/3.yaml`: the `placer` panel loses its `aparte` and gains a third
  column with an image slot (`priorite: essentiel`).
- `src/public/demos/`: one new archival photograph for the « L'espace devant » card.
- No schema or component change: `aparte` is already optional, and panels already accept three
  columns.
- The screen must still show everything at 1024 × 768 and 16:9, keep its claim on one line at
  16:9, and stack the cards at phone width. The three cards are narrower than the current two, and
  removing the aside frees vertical space.
