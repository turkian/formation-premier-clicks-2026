## Why

Session 3's composition block has sixteen photograph slots across seven technique screens, and
none is filled: the room sees sixteen shooting instructions where it should see sixteen
photographs. The rest of session 3 already shows public-domain archives (Smith, Robinson, Riis,
Stieglitz…). The composition block can do the same today. Most of its pictures can come from
Montreal and Quebec (Notman, Henderson), which the room will recognize.

## What Changes

- **Fill all sixteen composition slots** (`l3-compo-*`) with public-domain archival photographs:
  eleven from Quebec collections (McCord Stewart Museum's Notman Photographic Archives,
  Bibliothèque et Archives nationales du Québec, Library and Archives Canada) and five from
  elsewhere (Cameron, Blossfeldt, Watkins, Ponting, C. H. White), where no Quebec picture shows
  the technique as clearly.
- **Rewrite each slot's `specification`** to name the intended picture, its author and its date,
  and give each slot an `alt` and a `credit` « Auteur, année, collection ».
- **Add a rights comment** to the composition block, like the `histoire` and `au-dela` blocks',
  recording each picture's author, death year, date, collection and US public-domain basis.
- Slot ids, priorities, columns and wording of the technique screens are unchanged. The
  first-tier slots stay `essentiel`: an archival picture fills them just as well.
- No photograph appears twice in session 3. A photographer may appear more than once (Notman,
  Henderson, Atget, Hine, Stieglitz), always with a different picture.
- Rejected after checking: Rodchenko and Renger-Patzsch (in copyright in their home countries, no
  legal downloadable copy), Curtis's *Canyon de Chelly* (riders well below the thirds line),
  Lange's unretouched *Migrant Mother* (same negative as the one in « Au-delà »).

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the composition block's photographs are public-domain archives or the club's own
  photographs, and no photograph is shown twice in session 3.
- `demo-media`: an archival photograph by an unnamed studio operator (such as « Wm. Notman &
  Son » after 1891) is judged on its creation and publication dates, since no author's death date
  can be checked. A holder's « rights not evaluated » label does not by itself block hosting, but
  an « In Copyright » label does.

## Impact

- `src/src/content/lecons/3.yaml`: the sixteen `image` entries of the `composition` block
  (`specification`, `alt`, `credit`), plus a rights comment above the block.
- `src/public/demos/l3-compo-*.jpg`: sixteen new archival files, downloaded by hand where the
  source site blocks scripts (McCord Stewart, BAnQ, Library and Archives Canada), resized like
  the other demos. Two are below the usual size because no larger copy exists (`centre`,
  `diagonales`).
- Components, schema, styles and scripts: none.
- Session 3 stays `pret: false`.
