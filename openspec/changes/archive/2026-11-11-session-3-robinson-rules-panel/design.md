# Design

## Context

`les-regles-s-ecrivent` is a `demonstration` screen with one free image and `loupeImages.zoom: 3`.
A demonstration screen has no body, by definition. A `panneau` has a body. Its projection grid is
`claim / corps schema / aparte` (`lecon.css` `.panneau`), with the body on the left and the schema on
the right. On a phone it becomes a single column with the schema first. A panel can already hold
images, but only in `colonnes`. Panels don't declare free images or illustrations.

The single-image loupe already exists. `lib/loupe-liee.ts` starts on any container with
`data-loupe`. With `data-loupe-mode="seule"`, only the image under the pointer is magnified.
`IndiceLoupe.astro` draws the hint.

Image slots are enumerated in several places that read `colonnes`, `images` and `series`:
`lib/demos.ts` (`creditDeLEcran`), `scripts/liste-de-prises-de-vue.mjs`,
`pages/fiches/[id].astro` and `Repere.astro`.

## Goals / Non-Goals

**Goals:**
- Add one generic, optional panel region that this screen uses and that other archival pages can
  reuse.
- Reuse `EmplacementDemo`, the `seule` loupe and `IndiceLoupe` as they are.

**Non-Goals:**
- Showing an illustration and a schema on the same panel.
- Combining an illustration with cumulative states (`etats`), `colonnes` or `cartes`.
- Restyling the body's lists or adding a new typographic tier.

## Decisions

**1. Use a panel `illustration` field, not a body on `demonstration`.**
The spec defines a demonstration as photographs with no body text competing for their space.
Adding `corps` to it would break that for every demonstration screen. A panel is already
"statement + body + drawing", so an archival page that the body quotes fits there. The
`lessons` delta records this as an explicit exception.
*Alternative considered:* a third genre (`document`). We rejected it because it would duplicate
the panel's claim, body and aside handling for one screen.

**2. Shape: `illustration: emplacementDemo & { loupe?: { zoom } }`.**
It is the same slot schema as everywhere else, so `id`, `specification`, `alt`, `valeur`,
`credit` and `priorite` keep working, and so does the "missing photograph shows its
specification" fallback. The loupe sits on the illustration rather than on the screen, because
the panel's `loupe` field already means "linked loupe across the columns".
The schema refuses an `illustration` combined with `schema`, `etats`, `colonnes` or `cartes`
(`superRefine`), so the unsupported combinations from the Non-Goals can't be written.

**3. Layout: a `data-illustre` attribute with the illustration on the left.**
On projection:
```
'claim         claim'
'illustration  corps'
'aparte        aparte'
```
The columns are `minmax(0, 0.55fr) minmax(0, 1.45fr)`. The scan is portrait and its height
limits it, so a wider column would only add empty margins around it. The right column needs the
width for ten rules. The statement drops its usual `max-width` here and runs on two lines instead
of three. *(Implementation finding: the first plan, `0.8fr / 1.2fr` with a three-line statement,
overflowed by 127 px at 1024 × 768 and by 4 px at 1280 × 720.)* On the phone and in print the order is
claim, illustration, corps, aparte, matching the existing phone rule that puts the image before the
body. The illustration keeps its caption (`valeur`) below it in projection, like the
`etiquettes: survol` default today. The loupe hint goes once, under the illustration.

**4. Body: a `corps` with four bold group headings, each followed by a short list.**
The plain markdown is rendered through the shared `typo` utility, so it gets the French spacing.
The groups always go in a two-column flow (`columns: 2`). A group never breaks across the two
columns, and the line-height is 1.3 inside this body only. On a phone the body is a single column.
Under the 4:3 query (`min-width: 60rem and max-height: 50rem`), the statement shrinks to ×0.8 and
the body to ×0.95 (about 22.5 px, against 16.6 px for the aside; ×0.9 before the loupe hint and the closing aside line were removed). This follows the same query's
existing ×0.86 for cumulative callouts. We didn't use `cartes`: its `titre / valeur` pair is meant for situation →
value, and ten cards are heavier than ten lines.

**5. Content (French, as rendered):**

> **Le point de vue**
> - Changer de place : quelques pas changent les lignes.
> - De biais plutôt que de face.
>
> **Les lignes**
> - Pas de lignes parallèles ; sous un horizon droit, un premier plan ondulé.
> - Quelques droites parmi les courbes.
> - Jamais les sujets empilés en ligne.
>
> **L'équilibre**
> - Jamais de symétrie miroir.
> - Une rue ou une rivière, jamais depuis le centre.
> - Jamais l'horizon au milieu.
>
> **Le cadre**
> - Une image fermée sur ses bords.
> - Une arche jamais appuyée sur le bord du cadre.

Source: archive.org OCR of the 1869 Piper & Carter edition, ch. IX, pp. 47–49 (ten precepts).

**6. Slot enumerators include `ecran.illustration`.**
`creditDeLEcran` (the footer credit), the shot-list script and the printable sheets already gather
`colonnes[].image`. Each one adds `illustration` beside it. Otherwise the footer would lose its
« Photo : Henry Peach Robinson… » credit when the screen changes genre.

## Risks / Trade-offs

- [At 1024 × 768, the ten rules and a portrait scan overflow] → This was confirmed during
  implementation and resolved with decisions 3 and 4: a narrower scan column, a two-line
  statement, a two-column body, and at 4:3 only, a statement ×0.8 and a body ×0.95. Measured with
  Playwright, the region fits exactly (`scrollHeight = clientHeight`) at 1024 × 768, 1280 × 720 and
  1920 × 1080.
- [About 75 words of rules plus the aside goes past the ~100-word panel guideline] → The aside is
  the cost-free tier and is unchanged. The body alone stays under 100 words.
- [A forgotten slot enumerator silently drops the credit or the shot-list entry] → Task 3 lists
  every consumer found by `grep "\.colonnes"`. Only `lib/demos.ts` and the shot-list script read
  panel images. `Repere.astro` has text-only columns, and `fiches/[id].astro` reads a different
  collection. The build check confirms the footer credit.

## Migration Plan

The content and the component change ship in one commit on the current branch. The deep link
`les-regles-s-ecrivent` is unchanged. Rollback is reverting the commit.
