## Context

The composition block of `src/src/content/lecons/3.yaml` declares sixteen `image` slots
(`l3-compo-*`), each with a `specification` describing a picture to shoot and a priority
(`essentiel` for the first tier, `utile` for the rest). A file dropped in `src/public/demos/` under
the slot's id replaces the specification at the next build; nothing else is needed. The `histoire`
and `au-dela` blocks already host archival pictures this way, with a rights comment above the
block. See proposal.md for the motivation and `specs/` for the requirements.

## Goals / Non-Goals

**Goals:**
- One checked picture per slot, with a fallback where the rights are not settled.
- Quebec pictures wherever one shows the technique as clearly as an international one.
- Specifications, `alt` and credits close enough to final that implementation is mostly
  transcription.

**Non-Goals:**
- Changing slot ids, priorities, technique wording or screen layout. The `l3-compo-accroupi` id
  stays, although its picture is taken from above: the column is « Le point de vue », and its
  text already says « ou levez l'appareil ».
- The club's own photographs: they can replace any slot later with no structural change.

## Decisions

### D1. The sixteen pictures

★ marks a Quebec collection. Notman = William Notman († 1891); Notman & Son = the studio after
him, operator unnamed (D3); Henderson = Alexander Henderson († 1913); Vallée = Louis-Prudent
Vallée († 1905). Titles are as shown on each record.

| Slot | Picture | Collection, ref. | US basis |
|---|---|---|---|
| `un-seul-sujet` | ★ Notman & Son, *Louis Rubenstein, championship figure skater*, 1893 | McCord Stewart II-99946 | made > 120 years ago |
| `pres` | Julia Margaret Cameron († 1879), *Julia Jackson*, 1867 | Met 267426 | pre-1931 |
| `remplir-le-cadre` | Karl Blossfeldt († 1932), *Urformen der Kunst*, pl. 55, 1928 | Rijksmuseum RP-F-2008-51-2170-112 | published 1928 |
| `quatre-coins` | ★ Notman & Son, *Montreal General Hospital, Dorchester Street*, c. 1890 (D3 fallback) | McCord Stewart VIEW-2548.1 | made > 120 years ago |
| `arriere-plan` | ★ Notman, *Child as St. Jean Baptiste*, 1867 | McCord Stewart I-27995.1 | pre-1931 |
| `tiers` | Carleton Watkins († 1916), *Cape Horn near Celilo*, 1867 | Met 283222 | pre-1931 |
| `centre` | ★ Vallée, *Monument Wolfe*, plaines d'Abraham, c. 1880 | BAnQ P1000,S4,D60,P9 | pre-1931 |
| `accroupi` | ★ Notman & Son, *View of the harbour from the Notre-Dame-de-Bon-Secours Chapel*, c. 1900 | McCord Stewart VIEW-3212.1 | made > 120 years ago |
| `premier-plan` | ★ Henderson, *Montreal Wharves in Winter*, 1872 (the record dates the print 1878–1879) | McCord Stewart MP-1968.31.1.50 | pre-1931 |
| `lignes` | ★ Notman & Son, *Little Champlain Street, Quebec City*, c. 1890 | McCord Stewart VIEW-2335.0 | made > 120 years ago |
| `cadre-dans-le-cadre` | Herbert Ponting († 1935), *Grotto in an iceberg*, 1911 | Alexander Turnbull Library, NZ | published 1913 |
| `symetrie` | ★ Notman & Son, *Interior first class C.P.R. car*, August 1890 | McCord Stewart II-93008 | made > 120 years ago |
| `repetition` | ★ Henderson, *Snowshoers in Indian file, Mount Royal*, 1879 | McCord Stewart MP-0000.261.3 | pre-1931 |
| `espace-negatif` | ★ Henderson, *Spring Inundation near Montreal*, 1865 | McCord Stewart MP-0000.308.5 | pre-1931 |
| `diagonales` | ★ Notman, *Construction of Victoria Bridge*, 1858–1860 | Library and Archives Canada PA-181435 | pre-1931 (see D5) |
| `nombre-impair` | Clarence H. White († 1925), *The Ring Toss*, 1899 | Library of Congress 96513079 | pre-1931 |

The first list changed during implementation, once each record was opened:
- `quatre-coins`: the bobsleigh picture (VIEW-4871, 1911) has no publication on record, so the
  D3 fallback is used.
- `symetrie`: the Notre-Dame interior (VIEW-1190) is not on the museum's site, so the C.P.R. car
  fallback is used.
- `centre`: *Mile End Road* (N-0000.193.61.1) is now marked « In Copyright – Non-commercial Use
  Permitted » with no download, so it is replaced by Vallée's Wolfe monument, a lone column dead
  in the middle (D5).
- `premier-plan`: MP-0000.1452.50 does not exist on the museum's site. The same picture is
  MP-1968.31.1.50.
- `remplir-le-cadre`: the page is printed « 55 ». « 112 » was the end of the Rijksmuseum
  inventory number.

Eleven Quebec, five international. The international five stay where no Quebec candidate was as
clear: no close-up (`pres`, `remplir-le-cadre`), Henderson's thirds picture only roughly on the
lines, Ponting's ice cave unmatched, and the only Quebec « three » (the Coles sisters, 1916) by an
unnamed photographer made after 1906.

*Alternatives considered:* the first all-international list. Rejected or replaced after checking:
Rodchenko and Renger-Patzsch (in copyright in their home countries, so no legal downloadable
copy), Curtis's *Canyon de Chelly* (riders at about 82 % of the height, below the thirds line),
Lange's unretouched *Migrant Mother* (same negative as « Au-delà »'s). Ward M of the Montreal
General Hospital (Notman & Son, 1910) was a strong « lignes » picture, replaced by Little
Champlain Street because 1910 fails D3 without a known publication.

### D2. Credits, `alt` and specification

Credits follow the existing form « Auteur, année, collection », in French:
« William Notman, 1867, Musée McCord Stewart », « Wm. Notman & Son, vers 1900, Musée McCord
Stewart », « Alexander Henderson, 1879, Musée McCord Stewart », « William Notman, vers 1859,
Bibliothèque et Archives Canada ». Original titles are kept in the rights comment; the visible
`alt` describes what is in the frame, in French. Each `specification` is rewritten to name the
picture, its author and date, so an empty slot still says which picture it waits for. « Indian
file » is not carried into visible text: the `alt` says « en file ».

### D3. Unnamed studio operators

After 1891, « Wm. Notman & Son » pictures were made by unnamed staff, so the death-date rule
cannot be checked. They are judged on dates instead (`specs/demo-media`): made before 1949 for
Canada; for the US, published in 1930 or earlier, or made more than 120 years ago (the US term for
unpublished anonymous and corporate works). Rubenstein (1893), the harbour (c. 1900) and Little
Champlain (c. 1890) pass on age. So do the C.P.R. car (1890) and the hospital (c. 1890). The
bobsleigh picture (1911) would pass only with a publication in 1930 or earlier (a newspaper, a
Notman catalogue, a postcard). None was found, on its record or in a web search. It is not hosted,
and `quatre-coins` takes the fallback: ★ Notman & Son, *Montreal General Hospital, Dorchester
Street*, c. 1890 (McCord Stewart VIEW-2548.1): poles and wires across the façade, and corners
darkened by the lens.

Little Champlain Street's record gives a date range of 1890–1930. Its negative number comes
before the hospital's VIEW-2548 (c. 1890) in the studio's sequence, so the picture was taken
around 1890, which passes on age.

### D4. Sources and files

The McCord Stewart allows free use of its public-domain images at full resolution. It blocks
scripted access, and so do BAnQ and Library and Archives Canada. Their files are downloaded by
hand, in a browser, from each record's page. The Met and the Rijksmuseum serve their files to
scripts. The Library of Congress and Turnbull Library files come from their institutions'
master copies on Wikimedia Commons. Commons copies of McCord Stewart pictures (about 768 px) are
a last resort, and none was used.

Every file is resized like the other demos (2048 px on its long side) and saved as
`src/public/demos/<slot id>.jpg`. Museum mounts, captions and page margins are cropped, as the
`au-dela` block's are. So are a scanner's color card (`espace-negatif`) and the captions scratched
into the negatives (`lignes`, `symetrie`, `premier-plan`). The handwritten « Indian file » on the
`repetition` print is cropped as well, consistent with D2. `symetrie` is re-centered on the
aisle. Two files are below the usual size and were accepted because nothing larger exists:
`centre` (741 px, BAnQ's only size) and `diagonales` (1000 px, LAC's largest). Neither is
enlarged.

### D5. Rights labels that need a judgment

A rights label is read for what it says about copyright, and the hosting rule decides
(`specs/demo-media`).

- BAnQ marks the Wolfe monument « Droit d'auteur non évalué ». That means BAnQ has not assessed
  it, not that it restricts it. Vallée died in 1905, so the picture is in the public domain in
  Canada and in the US, and it is hosted.
- LAC marks PA-181435 « Copyright: Expired », but its download form asks the downloader to agree
  to « research and private study purposes only ». That is a term of LAC's copy, not of the
  copyright. The animator kept the file on that basis. The rights comment in `3.yaml` names both
  the label and the terms, so the choice is visible to whoever edits the slot next.

## Risks / Trade-offs

- [The bobsleigh picture's publication is never found] → happened. The hospital fallback in D3 is
  used, and the « quatre coins » aside does not depend on which picture is shown.
- [A file is only available at low resolution] → use the largest available. If it is under about
  1200 px on its long side, try the Commons copy or the next candidate from the research. This
  happened for `centre` and `diagonales`: no larger copy exists, and both were accepted (D4). They
  read well on the panel but are soft when enlarged.
- [The Notre-Dame interior shows paintings or statues with nude figures] → moot: the record could
  not be found, and `symetrie` uses the C.P.R. car. None of the sixteen shows nudity. The bare
  shoulder of the child dressed as Saint John the Baptist (`arriere-plan`) is a period costume and
  passes.
- [A credit is dimmed when its photograph is enlarged] → the enlarging component keeps the
  screen's foot under its dark backdrop, so credits stay legible but at low contrast. This applies
  to every block and is left to a component change.
- [Archival pictures look old next to the modern pictures of sessions 1 and 2] → accepted: the
  room already sees archives in the history and « Au-delà » blocks, and the club's photographs can
  replace any slot later.
- [Eleven Quebec pictures make the block feel like one collection] → accepted: it reads as one
  place, Montreal and Quebec City, which is the point. The five international pictures break it
  up.

## Migration Plan

Content and image files only; session 3 stays `pret: false`. Rollback is reverting the commit.

## Open Questions

_None._ The `nettoyer` aside about the photographers' shadows in the bobsleigh picture is
dropped: that picture is not hosted (D3).
