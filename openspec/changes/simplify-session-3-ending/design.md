## Context

`Repere.astro` sets `data-dense` when a screen has a `corps` or `colonnes`. Without it, `.repere`
in `lecon.css` already centers the screen's block vertically (`align-content: center`) and
horizontally (`max-width: 62ch; margin: 0 auto`), and gives the claim its large size
(`--t-enonce × 1.02`, `max-width: 24ch`). What it does not do is center the text: `.repere` sets
`text-align: left` and `justify-items: start` for every variante.

A non-dense repère can still carry `termes` or an `aparte`. No repère on the site is title-only
today; after this change, exactly two are (`apprentissages/ouverture` and
`apprentissages/pourquoi-pour-qui`).

## Goals / Non-Goals

**Goals:**
- Center the label and claim of a title-only repère, line by line, on projection and on phone.
- Leave every other repère pixel-identical.

**Non-Goals:**
- No per-screen layout field in the content schema.
- No change to the label text or to the variantes' set.

## Decisions

### Derive « title-only » in the component, expose it as a data attribute

`Repere.astro` computes `titreSeul = !corps && !colonnes && !ecran.termes && !aparte` and renders
`data-titre-seul` when it holds. The CSS keys on `.repere[data-titre-seul]`: `text-align: center`,
`justify-items: center`, and the claim's `max-width` box centered with it.

*Alternative: a CSS-only `:not(:has(.corps, .colonnes, .termes, .aparte))` selector.* Rejected:
it duplicates the component's knowledge of what a repère can carry, and silently breaks when a
new optional part is added. The component already decides `data-dense` the same way, so the two
states stay side by side.

*Alternative: a `disposition: centree` field in the YAML.* Rejected: the layout follows from the
content, as `data-dense` does. A title-only repère that is left-aligned would never be wanted.

### « Pourquoi, et pour qui » becomes a repère `transition`

A `panneau` lays out from the top-left and has no title-only mode; a repère is what the site uses
for a screen that only tells the room where it is. `transition` gives « On enchaîne »;
`cloture` would print « Pour finir » twice in a row, since the discussion screen keeps it.
The screen keeps its `id`, so its address does not change.

## Risks / Trade-offs

- [The `.repere` mobile rule (`height: auto`) drops vertical centering on phones] → Only
  horizontal centering is required at phone width; the screen is short enough that this reads fine.
- [« Aimez vos photos. » loses the « pour qui » idea the screen's title still names] → Accepted: the
  title stays as the screen's address and navigation label; the « pour qui » question is said
  out loud.

## Migration Plan

Content and one CSS rule. Session 3 is published (`pret` set by commit `93d3e55`); no screen id
changes, so no deep link breaks. Rollback is a revert.
