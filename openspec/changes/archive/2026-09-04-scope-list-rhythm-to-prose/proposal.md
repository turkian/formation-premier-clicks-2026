## Why

`src/src/styles/base.css` gives every `<li>` on the site `margin-bottom: 0.32em`, and clears it on
`li:last-child`. That is correct prose rhythm and wrong everywhere a list is a *layout*: in a grid
or a flex container, an item stretches so that its **margin box** — not its border box — fills the
row. Every `<li>` except the last therefore renders shorter than its row by exactly one margin, and
the last one, alone, renders at full height.

The symptom is the ragged card rows on the session sommaires (`/lecons/<n>`). Measured in a
browser on `/lecons/1`, the « Bienvenue » card is **93,7 px** and « Les quatre questions » beside it
is **104,5 px** — a difference of **10,752 px**, which is `0.32em` at that list's 33,6 px font size.
Cloning the same `<li>` twice into the grid reproduces it exactly, so it depends on position in the
row, not on the card's content. The defect is present on all three séances.

The previous change, `unify-hub-card-treatment`, addressed this symptom by making `.liste-simple li`
a flex container so the link would stretch inside its `<li>`. That fix is correct and does its job —
the `<a>` now fills its `<li>` exactly. It simply treated the wrong layer: the `<li>` itself was the
element coming up short, and no amount of work inside it can recover a margin that sits outside it.
That change's task 3.6 (« confirm the screen tiles in a block now align ») passed on inspection
while the 10,7 px gap was still there, which is how a difference this size survives a visual check.

A census of every `<li>` rendered across the site — hub, plan de cours, the three sommaires, the
lexique index, a brand sheet, the reference index, and two lesson screens — shows the rule is a net
liability, and that this is not a `.liste-simple` problem:

| Container | `display` | Items carrying the stray margin | Verdict |
|---|---|---|---|
| `ul.liste-simple` (sommaires, séances 1-3) | `grid` | 61 of 85 | **broken** |
| `ul.jetons-marques` (brand chips, lexique) | `flex` | 14 of 16 | **broken** |
| `ol` in `dialog.index-blocs` | `grid` | 0 of 14 | already patched by hand |
| `ol.gestes` (« appareil en main ») | `grid` | 0 | already patched by hand |
| `.prose > ul` (plan de cours) | `block` | 20 of 24 | wanted |
| `.corps > ul`, `.corps > ol` (lesson screens) | `block` | 0 | overridden locally, `0.3em` |
| `.fiche-corps li` (printed sheets) | `block` | 0 | overridden locally, `0.18em` |
| `.introuvable > ol` (lexique) | `block` | 0 | overridden locally, `0.6rem` |
| `ol` in the lexique index | `block` | 3 of 4 | wanted |

Two live consumers want the global; two are broken by it; two more had to disarm it by hand at the
point of use. Every prose scope that cares about its rhythm already sets its own value. The default
is pointed the wrong way, and a third séance's worth of cards is not the last place it will surface —
`.jetons-marques` is already the second one, silently adding 10,7 px between wrapped rows of brand
chips on top of the 6,4 px `gap` that file declares.

## What Changes

- **Vertical rhythm becomes a property of prose, not of `<li>`.** The unscoped
  `li { margin-bottom: 0.32em }` / `li:last-child { margin-bottom: 0 }` pair in
  `src/src/styles/base.css` is replaced by the same pair scoped to the site's prose contexts —
  `.prose`, `.corps`, `.aparte`, `.fiche-corps` — written with `:where()` so its specificity stays
  at zero and every existing per-scope override (`.corps li`, `.fiche-corps li`, `.introuvable li`)
  continues to win without being touched.
- **The lexique index's numbered list joins a prose scope.** It is the one list that reads as prose
  while sitting outside every prose container; it gets the scope class rather than a private rule,
  so it is spaced by the same declaration as the plan de cours.
- **Two layout lists are fixed without being named.** `.liste-simple` cards and `.jetons-marques`
  chips align because they stop inheriting prose spacing at all, not because a rule was added to
  suppress it.
- **Two hand-written suppressions become redundant** — `margin: 0` on `dialog.index-blocs li` and
  on `.gestes li`. They are removed, so no future reader has to work out which defect they disarm.
- **The alignment contract becomes verifiable.** `src/scripts/verifier.mjs` gains a check that
  fails when two items sharing a row in a grid or flex list differ in height. This is what makes
  the change structural rather than another local repair: the next layout list built from `<li>`
  cannot regress silently the way this one did.
- **No change to `.liste-simple li { display: flex }`.** That rule is correct for its own reason —
  the link must fill its `<li>` when a title wraps to two lines — and it stays.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-shell`: gains two requirements — that vertical rhythm belongs to prose rather than to the
  list item, and that items displayed side by side in a row occupy the same height. `site-shell`
  already carries the cross-cutting presentation contracts every section inherits — French
  typography, projection legibility floors — and these are two more of them: they govern the
  sommaires, the lexique's brand chips, and any list a future section lays out in a grid. Both are
  ADDED, not MODIFIED: « Home hub reaches all content » already states the same-height rule for
  hub entries, and that scenario is correct as written — it is scoped to the hub, and what is
  missing is the general rule behind it, not a correction to it.

`lessons` and `lexicon` need no delta. Nothing changes about what a sommaire lists or what a brand
sheet contains — only that rows of them align, which is a shell-level presentation contract.

## Impact

- **Modified — styles**: `src/src/styles/base.css` (the `li` rhythm pair becomes prose-scoped),
  `src/src/styles/lecon.css` (`.gestes li` loses its now-redundant `margin: 0`, and
  `dialog.index-blocs li` likewise), `src/src/styles/carrefour.css` (comment updated to name the
  real cause; no rule removed).
- **Modified — templates**: `src/src/pages/lexique/index.astro` — its `<ol>` gains a prose scope
  class. No other template changes.
- **No content change.** No YAML, no copy, no markdown.
- **No dependency, build, or deployment change.**
- **Modified — verification**: `src/scripts/verifier.mjs` gains a `alignement` mode, wired into
  `tout` alongside `impression`, `telephone`, `projection`, and `liens`.
- **Visible effect, and it is the point**: the sommaires' cards shrink to their row's true height —
  rows get **10,7 px shorter**, not taller — and rows of brand chips on the lexique tighten from
  17,1 px of separation to the 6,4 px the stylesheet asks for. Prose spacing on the plan de cours,
  the lesson bodies, and the printed sheets is unchanged, byte for byte, in the built CSS values.
- **Risk, and where it lands**: a future markdown-rendered list placed outside `.prose`, `.corps`,
  `.aparte`, and `.fiche-corps` would render with no rhythm at all. Today every markdown render
  point on the site is inside one of the four. The mitigation is that the scope list is a single
  declaration in one file, so extending it is a one-line edit at the place a reader would look.
- **Not in scope**: the values themselves. `0.32em`, `0.3em`, `0.18em`, and `0.6rem` stay exactly
  as they are; this change moves where a rule applies, not how much space it asks for.
