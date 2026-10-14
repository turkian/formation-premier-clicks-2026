## Context

See proposal.md — Why. The relevant current state:

- A demonstration screen (`ecranDemonstration` in `content.config.ts`) carries `series` (comparative,
  one variable each, optional linked `loupe`) and `images` (free photographs, always one row).
  `le-flou-choisi` uses `images`.
- `Demonstration.astro` renders each series as a `.rang`, and the free photographs as one more
  `.rang`; `.rangs` gives every rang an equal share of the height (`grid-auto-rows: minmax(0, 1fr)`).
- The loupe script in `Demonstration.astro` maps the pointer to image coordinates `(u, v)` once,
  then calls `placer()` on **every** `.marco` of the series. `EmplacementDemo.astro` renders the
  `.fenetre-loupe` element when told `loupe`, and refuses Shift + click enlargement inside any
  `[data-loupe]` ancestor.
- `creditDeLEcran` (`lib/demos.ts`) builds the projected rows from `ecran.colonnes` (an **array**
  of columns on the decision screen), the series, and `ecran.images` as a single row.
- The swimmer photograph sits untracked in `images/`, 2048 × 1365, EXIF already stripped — the
  same size as the other three photographs of the slide.

## Goals / Non-Goals

**Goals:**
- Reuse the existing rang layout and loupe geometry; add a mode, not a second implementation.
- Keep every existing screen rendering byte-for-byte the same when the new fields are absent.

**Non-Goals:**
- A loupe on a single image outside a demonstration screen (decision columns, panels).
- Changing the linked loupe, or letting a comparison series opt into the single-photograph mode.
- Recovering the swimmer's shutter speed.

## Decisions

### D1 — Two new screen-level fields, named so they cannot collide

```yaml
images: [...]
imagesParRang: 2          # free photographs per projected row
loupeImages: { zoom: 3 }  # single-photograph loupe on the free photographs
```

Both optional on `ecranDemonstration`, both about `images` only.

- *Rejected: `colonnes: 2`.* `colonnes` already means an array of columns on the decision screen,
  and `creditDeLEcran` reads `ecran.colonnes` generically — a number there would break the credit.
- *Rejected: screen-level `loupe`.* It reads as "a loupe for the screen" and would be confused with
  the per-series `loupe`, whose meaning (linked) is different.
- *Rejected: turning `images` into an object `{ liste, parRang, loupe }`.* Breaks every existing
  screen that uses `images` for a gain in tidiness only.

### D2 — Wrapping = several rangs, not a CSS grid change

`Demonstration.astro` chunks the free photographs into groups of `imagesParRang` and renders each
group as its own `.rang > .serie`, exactly like today's single free row. `nombreDeRangs` counts
them. The existing `.rangs` rule already shares the height equally between rangs, and the phone
breakpoint already stacks everything in order — so 2 × 2 needs no new layout CSS.

When `loupeImages` is declared, each free `.serie` carries `data-loupe` and
`data-loupe-mode="seule"` itself. *(Changed during implementation: a `.libres` wrapper would stop
the free rangs being direct children of `.rangs`, which is what shares the height between them.
In `seule` mode the frames are independent anyway, so one loupe per rang behaves the same — the
pointer leaving one rang hides its loupe, entering the next shows the new one.)* The hint
« Maintenir Maj pour agrandir un détail » is rendered once, in the last free rang. The chunking
lives in one helper, `rangsLibres(ecran)` in `lib/demos.ts`, read by both the screen and its
credit.

- *Rejected: a single `.serie` with `grid-template-columns: repeat(2, …)`.* `.serie` is built on
  `grid-auto-flow: column` and a subgrid for labels; wrapping it means rewriting that rule and its
  phone variant for one screen.

### D3 — One loupe script, two modes

`demarrer(serie)` becomes `demarrer(conteneur)` and reads the mode from `data-loupe-mode`:

```
 pointer → (u, v) in the pointed photograph      (unchanged)
   linked (default) → placer() on every .marco of the container
   seule            → placer() on the pointed .marco, cacher() the others
```

The selector stays `.serie[data-loupe]`; it now also finds the free rangs. The Shift + click guard in `EmplacementDemo.astro`
already keys on any `[data-loupe]` ancestor, so it covers the free photographs unchanged; they
only need to receive `loupe={true}` to render their `.fenetre-loupe`.

### D4 — Credit follows the rangs

`creditDeLEcran` chunks `ecran.images` by `ecran.imagesParRang` (default: all on one row) when
building `rangees`. With two rows of two, the existing tables already yield « photo de gauche,
rangée du bas » at projection width and « quatrième photo » / « troisième photo » by rank on a
phone. No wording changes.

### D5 — Magnification × 3

In 2 × 2 on a 1080p projector each photograph is height-bound to roughly 420 px, i.e. about
630 px of a 2048 px file — about 1 : 3.2. At × 3 the loupe shows close to the file's own pixels:
the face is visibly sharp, the hand visibly soft. Higher, every part goes soft and the contrast the
photograph exists to show disappears; lower, the hand's softness stays hidden.

### D6 — The slot

Fourth in `images`, after `l2-file`:

- `id: l2-nageur`, `priorite: utile`, no `credit` (the animator's own photograph).
- `specification` (the shooting brief, kept for a reshoot): a swimmer or any subject with one fast
  part, camera still, at a speed slow enough for that part to blur but not the face — try
  around 1/60 s.
- `valeur`: « une partie bouge plus vite que le reste — le visage reste net, la main file ».
- `alt`: a backstroke swimmer, face sharp, hand and surrounding water slightly blurred — no speed.

The file moves from `images/` to `src/public/demos/l2-nageur.jpg` unchanged; the `images/` folder
is then empty and removed.

### D7 — Content rule 13.6 gains a loupe exception

`verifier-contenu-final.mjs` caps a demonstration screen at three photographs, because a fourth
shrinks each one below what the room can read. Decided with the animator: the cap stays, except on
a screen where **every** photograph is under a loupe — the loupe is what makes the smaller resting
size acceptable. A screen where only one series has a loupe gets no exception.

- *Rejected: raising the cap to 4* — nothing would then compensate for the smaller photographs.
- *Rejected: a named exception for `le-flou-choisi`* — the reason is the loupe, not the slide.

### D8 — The series subgrid now applies

Found while checking 4:3: `.serie > .emplacement { grid-template-rows: subgrid }` in `lecon.css`
lost to the component's scoped `.emplacement` rule (same specificity, loaded later), so a label
wrapping onto two lines shrank its own photograph instead of lowering the whole row. The selector
becomes `.serie > figure.emplacement`; this applies to every comparison series, as its comment
always intended.

## Risks / Trade-offs

- [The swimmer's blur is subtle even at × 3 on a poor projector] → The loupe is a reveal, not a
  guarantee; the label states the idea in words, and the photo can be swapped for a slower one
  later with no other edit (same slot).
- [2 × 2 shrinks the three existing photographs, which were legible on one row] → Each one now
  gets the full height of a half-screen; on 16:9 they are roughly as tall as before, narrower only
  where `contain` adds side bands. The loupe covers all four, not just the swimmer.
- [4:3 projector: two rows plus claim, hint and footer] → Check `verifier:projection` at
  1024 × 768; the hint uses the smallest tier and carries nothing needed to follow the block.
- [A second loupe mode lives in the same script] → The modes differ in one branch; the linked
  mode's behaviour on `nette-ou-propre` and `trois-vitesses` is verified unchanged.
