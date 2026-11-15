# Design

## Context

See proposal.md for the motivation. The required behavior is in `specs/lessons/spec.md`.

- The `composition/placer` panel in `src/src/content/lecons/3.yaml` has two columns (`tiers`,
  `centre`) and an `aparte`. Panels already accept three columns, and `aparte` is optional.
- The photo credit line is built from each column's `credit`. `src/src/lib/demos.ts` already labels
  three photos (« de gauche », « du centre », « de droite » at projection width, « du haut »,
  « du milieu », « du bas » or ordinals on a phone), so the line updates itself.
- The `composition` block starts with a rights comment that lists each of its sixteen archival
  photographs (author and death year, date, title, collection and reference, rights basis, crop).
  It also states the block's rights rule: author dead before 1972 in Canada; in the United States,
  published before 1931 or author dead more than 70 years ago; « Wm. Notman & Son » after 1891
  judged on the photograph's date.
- An image slot with no file shows its `specification`. `npm run liste-de-prises-de-vue` reports
  essential slots that are still missing, but a missing file does not block the build.

## Goals / Non-Goals

**Goals:**

- One new archival photograph that shows room in front of the subject clearly enough to point at
  from the front of the room.
- Keep « Placer » fully visible at 1024 × 768 and 16:9 with three cards, with its claim on one
  line at 16:9.

**Non-Goals:**

- Moving the 1797 reference, the "starting point" line or the camera-grid tip to another screen,
  the history block or a printed sheet.
- Adding an exercise. Session 3 keeps its « no camera-in-hand exercise » choice.
- Changing the claim, the existing two cards, their photographs or their order.

## Decisions

### D1 · Card order: « Les tiers », « Le centre assumé », « L'espace devant »

The two existing cards stay where they are, and the new rule is added after them. The new card says
*which side* to leave room on once the subject is off centre. It comes last because it builds on
the first two.

*Alternative considered:* « Les tiers », « L'espace devant », « Le centre assumé », grouping the two
off-centre placements in the claim's order (« Décentré ou centré »). Rejected: it moves a card the
presenter already knows, and the claim reads correctly either way.

### D2 · The new column

- `titre`: « L'espace devant ».
- `icone`: `lucide:move-right`. It shows a direction, and no other card uses it. A plain arrow would
  look like navigation.
- `corps`: « Plus de place du côté où le sujet regarde ou avance. » This describes the image, as
  the card rule requires.
- `image.id`: `l3-compo-espace-devant`, with `priorite: essentiel`. Placing the subject decisively is
  first-tier, like the two other cards on the panel.
- `specification`, `alt` and `credit` follow the block's format: the specification names the
  picture, author, date and collection, then says where the space is. The alt text describes in
  French what is in the frame. The credit reads « Auteur, année, collection ».

### D3 · Choosing the photograph

Selection criteria, in order:

1. Public domain in Canada, with a collection record that can be cited. US status is not required
   (decided during implementation). The block's rights comment now states the requirement as
   Canadian public domain and notes which pictures also pass the US test.
2. The direction is obvious at a glance: a person or animal in profile, or a vehicle, boat or
   sleigh moving across the frame, not toward the camera.
3. The subject sits in the outer third on the side it turns away from, so most of the frame lies
   ahead of it. A landscape-format picture makes this easier to see.
4. Not already used in session 3, in any print (« No photograph is shown twice in session 3 »).
5. Prefer a Québec or Canadian collection (Musée McCord Stewart, BAnQ, Bibliothèque et Archives
   Canada), like eleven of the block's sixteen pictures. A photographer other than Watkins and
   Vallée gives the panel more variety, but this is not required.

If no candidate passes 2 and 3 clearly, the slot ships with its `specification` and stays listed by
`liste-de-prises-de-vue`, rather than using a weak picture.

### D4 · Rights comment

Add a `espace-devant` line to the block's rights comment, between `centre` and `accroupi`, in the
same format as the others. Change « Les seize photographies » to « Les dix-sept photographies »,
and update the Québec count if the new picture comes from a Québec collection.

### D5 · Chosen photograph (decided during implementation)

Conrad Poirier, « Cycling. Rules for Cyclists », Montréal, 13 May 1942. BAnQ, fonds Conrad Poirier,
P48,S1,P7745, marked « Domaine public au Canada » (Poirier died in 1968). It is probably still under
copyright in the United States, and the presenter accepted that. The cyclist rides diagonally
toward the left and glances at the camera. The crop removes the black negative edges, the damaged
corner and the empty road at the bottom. It also trims the right side, so she sits in the right
third and the street ahead of her fills the rest. The file is 1220 × 975, the source's native
resolution, with no upscaling.

## Risks / Trade-offs

- [The cyclist looks into the camera, so part of the room may read « she's looking at us »
  before « the space is in front of her »] → The card body says « regarde **ou avance** ». The
  direction of travel carries the rule, and the presenter points at the street ahead of her.

- [Three cards are narrower, so the photographs get smaller at 4:3] → Removing the aside frees
  vertical space. `verifier:projection` checks for overflow, and task 4.2 checks by eye that the
  thirds line and the room in front can still be pointed at.
- [Losing the only on-screen link between Smith in 1797 and the rule of thirds] → Accepted. The
  presenter can say it, and spec:1048 keeps the history block's first screen free of the rule of
  thirds.
- [No suitable archival photograph is found quickly] → D3's fallback: the specification shows in
  place of the picture. The slot remains on the essential shot list, so the club's own photograph
  can fill it later.
