## Why

Session 3's composition block teaches participants how to organize an image: where the eye goes,
what stays out of the frame. It never asks why some well-composed photographs leave us cold while
others stay with us. The session should end its teaching by opening that question: a photograph
can also stop the viewer, make them feel something, or make them imagine more than they see. The
block introduces the idea and gives a few tools; it stays shorter than composition, because
participants still need to practise composition first.

The block is heavy after eight composition screens, so a break comes first.

## What Changes

- **Remove** the « appareil en main » screen `cinq-fois-le-meme-objet` (slide 17). Session 3 no
  longer has a hands-on exercise.
- **Merge** the two pause screens (`la-pause`, `vos-questions`) into a single question break,
  « Pause et questions », right after the composition block. It invites questions about
  composition or anything else, and invites participants to show a photograph on their screen.
  The sticky-notes wall and the « dernière séance ensemble » line are dropped.
- **Add a block « Au-delà de la composition »** after the pause and before « Mes apprentissages »,
  five screens:
  1. an opener: a well-composed photograph is not yet a strong photograph; it announces three
     intentions side by side — *captiver*, *faire ressentir*, *faire imaginer*;
  2. *Captiver* — la tension · les relations;
  3. *Faire ressentir* — le calme · la vulnérabilité · l'inquiétude, with a callout that these are
     not formulas;
  4. *Faire imaginer* — ce qu'on ne montre pas · l'avant et l'après;
  5. a transition ending on « Avant de vous demander comment composer votre photo, demandez-vous
     pourquoi vous voulez la prendre. », which hands over to « Pourquoi, et pour qui ».

  The three tool screens follow the composition block's layout: a title naming what the tools do,
  two or three columns, one photograph per column.
- **Illustrate with public-domain archival photographs** (Riis, Stieglitz, Emerson, Hine, Lange,
  Atget), as `utile` slots the animateur may later replace with the club's own photographs.
  Protected photographers (Cartier-Bresson, Crewdson, Erwitt) are named and linked in asides,
  never shown.
- Not taken from the source material: the five-concept table, the seven-emotion table, the
  three-question looking exercise, the three-step bench example as its own screen, and the « deux
  fois, deux émotions » exercise. They go beyond an introduction or exceed a panel's budget; the
  bench example and the exercise survive as one line each in an aside.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: session 3's block order gains « Au-delà de la composition » between the pause and the
  experience block, and the pause becomes a single question-break screen; new requirements for the
  beyond-composition block (an opener announcing three intentions, three tool screens in columns
  with photographs, fewer screens than composition, a closing question that hands over to the
  experience block); **REMOVED** the requirement that composition be practised hands-on.

`demo-media` is unchanged: its public-domain, credit and no-nudity rules already govern the new
archival slots, and the new slots are `utile`, which the essential-slot list does not enumerate.

## Impact

- `src/src/content/lecons/3.yaml`: `cinq-fois-le-meme-objet` removed; `pause` block reduced to one
  screen; new block `au-dela` (five screens); header comment and a rights comment for the new
  archival images.
- `src/public/demos/l3-au-dela-*.jpg`: up to seven new archival files, rights checked one by one.
  No earlier copy exists in git history.
- Components, schema, styles and scripts: none. Repère screens already carry `colonnes`, concept
  panels already carry two or three `colonnes` with an `image`, and no script references the
  removed screen ids.
- Session 3 is `pret: false`: its routes are gated, so removing `cinq-fois-le-meme-objet` and
  `vos-questions` breaks no public deep link.
- Screen count goes from 30 to 33.
