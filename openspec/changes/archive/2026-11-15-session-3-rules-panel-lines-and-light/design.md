# Design

## Context

`les-regles-s-ecrivent` is already a `panneau` with an `illustration` (scan on the left, body on
the right), set up by the archived change `2026-11-11-session-3-robinson-rules-panel`. That
change fixed the column ratio and checked the 4:3 fit for a body of four headings, ten bullets and
about 60 words. This change touches only content and one image file. See proposal.md for the
motivation.

## Goals / Non-Goals

**Goals:**
- Replace the body and the scan without touching the panel's layout, schema or components.

**Non-Goals:**
- A loupe on the new scan. The room reads the principles on the right, not the page, as before.
- Explaining the diagram in the body. The caption names it, and the bullet about the diagonal is
  enough.

## Decisions

**1. Group by theme, not by author.**
The two sources overlap: Lake Price's dominant direction and Robinson's counter-line become one
bullet, and Lake Price's masses and contours and Robinson's concentrated contrast collapse into
two. Author columns would repeat ideas and double the word count.
*Alternative considered:* two blocks, *Lake Price, 1860* and *Robinson, 1869*. Rejected: about
140 words, over the panel floor.

**2. Three headings, with the camera move under *Les lignes*.**
Lake Price's "move the camera a few metres" has no partner. Alone, it would be a one-bullet
heading. It goes under *Les lignes* because its stated purpose is to balance the frame and keep
disturbing shapes out of the lines.

**3. « Un peu à côté du centre », not « jamais au centre ».**
Robinson advises *slightly* above, below or beside the crossing of the diagonals. A « jamais »
would overstate him and would clash with the composition block's screen that defends centring
(`l3-compo-centre`).

**4. Drop the most specific examples.**
The Ostade interior (Lake Price) and the rising or setting sun as the centre of light are left
out. They cost the most words and need the most explanation. The "mood" bullet keeps the gist:
brume, orage, plein soleil.

**5. The body, as authored.**

```yaml
corps: |
  **Le sujet**

  - Un sujet principal : tout y mène l'œil.
  - Un peu à côté du centre.
  - En portrait, le visage net, éclairé, de l'espace devant.

  **Les lignes**

  - Une direction dominante, une ligne contraire.
  - Des groupes discrets en triangle, en diagonale, en cercle.
  - Une forme reprise, plus faible.
  - Quelques mètres de côté pour équilibrer le cadre.

  **L'ombre et la lumière**

  - De grandes masses, pas des taches.
  - Le clair entre dans le sombre, et l'inverse.
  - Le plus fort contraste à un seul endroit ; des contours fondus ailleurs.
  - Leur dosage fait l'ambiance : brume, orage, plein soleil.
```

That's about 80 words, headings included. The *Le sujet* and *Les lignes* bullets are the
shortened wording from the 4:3 fit check (see Risks): the first draft ran about 95 words and
pushed the last *Les lignes* bullet under the footer at 1024 × 768. The shared typography utility adds the non-breaking
spaces before `:` and `;`.

**6. Page 24, same file name.**
The source is archive.org `pictorialeffecti00robi` (Getty Research Institute, 1869 Piper &
Carter edition), leaf 30 = printed page 24. It's the same copy as page 47, so the credit
« Henry Peach Robinson, 1869, Getty Research Institute » is unchanged. The file keeps the name
`l3-histoire-robinson-effet.jpg`, and the slot keeps the id `l3-histoire-robinson-effet`.
« effet » names the book (*Pictorial Effect*), not the page, so nothing else has to follow.
Resize it to match the current file: portrait, 2048 px tall, JPEG.

New illustration fields:
- `specification`: Henry Peach Robinson, Pictorial Effect in Photography, 1869, page 24 —
  chapitre « Balance of Lines and Contrast » : un rectangle coupé d'une seule diagonale (fig. 2),
  puis une falaise et une plage composées sur cette diagonale (fig. 3). Getty Research Institute.
- `alt`: Une page de livre de 1869 avec deux petits dessins : un rectangle coupé en diagonale,
  puis une falaise et une plage qui suivent la même diagonale
- `valeur`: « Robinson, 1869 — la diagonale »

**7. No aside.**
The old aside named William Lake Price and Henry Peach Robinson, then listed « l'équilibre, les
lignes, le triangle, l'ombre et la lumière ». With the new body, that list repeats the headings,
and the dates repeat the statement. Removed on review. Robinson stays named by the caption and the
credit. Lake Price is no longer named on the screen: the body synthesises him without attribution.

## Risks / Trade-offs

- [At 1024 × 768, the longer body (about 95 vs 60 words, 11 bullets that run longer) overflows]
  → Check by hand at 4:3 and 16:9 and run `npm run verifier:projection`. If it overflows, shorten
  bullets first: the portrait bullet and the contrast bullet are the longest. Never shrink the body
  size.
  *Outcome:* removing the aside (decision 7) freed about 60 px, not enough. Shortening the seven
  bullets of the middle column (*Le sujet* + *Les lignes*, kept in one column because the panel's
  CSS never splits a list) brought the last bullet about 30 px above the footer at 4:3. Every
  principle in the spec is kept.
- [The diagonal on page 24 is a thin line and may fade on a weak projector] → It's a clean
  line drawing on a light page, sharper than the castle engravings it replaces. Check it on the
  dev server at projection width.
- [Light and shade appear only here, as history] → Intended (see proposal). The scenario "The
  principles are reported as history" records it, so a later review doesn't remove it as off-topic.
