## Context

See `proposal.md` — Why. This section covers only what shapes the approach.

Three facts about the current stylesheet decide the implementation.

**The defect is a cascade fact, not a layout fact.** A grid or flex item with `align-self: stretch`
— the default — is sized so its *margin box* fills the row track. `margin-bottom` on the item is
therefore subtracted from what the reader sees:

```
                  piste de rangée = 104,45 px
   ┌──────────────────────────────┐  ┌──────────────────────────────┐
   │ ┌──────────────────────────┐ │  │ ┌──────────────────────────┐ │
   │ │ REPÈRE                   │ │  │ │ CONCEPT                  │ │
   │ │ Bienvenue                │ │  │ │ Les quatre questions     │ │
   │ │   boîte de bordure 93,7  │ │  │ │                          │ │
   │ └──────────────────────────┘ │  │ │  boîte de bordure 104,45 │ │
   │ ░░░ margin-bottom 10,752 ░░░ │  │ └──────────────────────────┘ │
   └──────────────────────────────┘  └──────────────────────────────┘
      li:not(:last-child)               li:last-child — aucune marge
```

Nothing inside the `<li>` can recover that space, which is why the flex fix from
`unify-hub-card-treatment` — correct in itself, and kept — could not close the gap.

**Every prose scope that cares about its rhythm already declares it.** `.corps li` sets `0.3em`
(`lecon.css`), `.fiche-corps li` sets `0.18em` (`fiche.css`), `.introuvable li` sets `0.6rem`
(`lexique.css`). All three sit at specificity (0,1,1) in stylesheets that load after `base.css`,
so they already beat both global rules today. The global `li` pair is the *default* for exactly
two live consumers: the plan de cours and the lexique's index list.

**Layout lists have had to disarm the default by hand, twice.** `dialog.index-blocs li { margin: 0 }`
(`lecon.css`) and `.gestes li { … margin: 0 }` (`lecon.css`) exist for no other reason. Neither
says so. A third and fourth consumer — `.liste-simple` and `.jetons-marques` — never got the memo.

## Goals / Non-Goals

**Goals:**

- A list used as a layout inherits no prose spacing, and needs no rule to suppress any.
- Every prose context keeps its computed spacing unchanged — the same number of pixels, from the
  same declaration, in the same cascade position relative to its own override.
- The alignment contract is checked by machine, at a precision the eye does not have.

**Non-Goals:**

- Changing any spacing *value*. `0.32em`, `0.3em`, `0.18em`, `0.6rem` all stay.
- Consolidating the three per-scope overrides into one. They differ deliberately — projection,
  paper, and screen are three typographic scales — and merging them is a separate argument.
- Touching `.liste-simple li { display: flex }`. It is right for its own reason.
- Introducing a CSS reset, a utility layer, or `@layer`. One file, two declarations.

## Decisions

### D1 — Invert the default: prose opts in, layout gets nothing

The two global rules in `base.css` are **deleted**, and replaced by the same pair scoped to the
site's four prose contexts:

```css
:where(.prose, .corps, .aparte, .fiche-corps) :where(ul, ol) > :where(li) { margin-bottom: 0.32em; }
:where(.prose, .corps, .aparte, .fiche-corps) :where(ul, ol) > :where(li:last-child) { margin-bottom: 0; }
```

No `li { margin-bottom: 0 }` reset is added: the user-agent default for `<li>` is already zero, and
`base.css` already zeroes `ul, ol`. Adding a reset would in fact *break* the design — at (0,0,1) it
outranks the scoped rules below it, which is worth stating because it is the obvious thing to write
and it silently flattens the plan de cours.

**Alternative rejected — suppress in layout contexts, keep the global.** Adding
`.liste-simple li, .jetons-marques li { margin: 0 }` is two lines and fixes today's two bugs. It is
the same move that was already made twice, and it leaves the trap armed for the next list. The
user's judgement — that this will recur in the other séances — is what rules it out; it has already
recurred four times.

**Alternative rejected — infer prose from the absence of a class**
(`:where(ul, ol):not([class]) > li`). It happens to classify every list on the site correctly today:
prose lists come from the markdown renderer and carry no class, layout lists carry one because they
need styling. It is also a coincidence rather than a rule. Adding a class to a prose list for an
unrelated reason — a border, a column count — would silently delete its rhythm, and the selector
gives a reader no way to see that coming.

### D2 — `:where()` everywhere, so the rules carry zero specificity

Every part of both selectors is wrapped: `:where(.prose, …)`, `:where(ul, ol)`, and — the one that
matters — `:where(li:last-child)`. `:last-child` is a pseudo-class worth (0,1,0); left bare, the
second rule lands at (0,1,1), **ties** `.corps li`, and wins on document order. Measured, that
changes the last item of every `.corps` list from `10,08 px` to `0`.

That would arguably be an improvement — a trailing margin under the last bullet is probably
unintended — but it is a change to how lesson bodies render, made as a side effect of a change
about card alignment, and this change has no mandate for it. At (0,0,0) all three existing
overrides win exactly as they do today, for last children as well as for the rest.

Verified in a browser across ten pages before writing this: with the zero-specificity form, every
`.corps`, `.region-corps`, `.introuvable`, and `.prose` value is identical before and after, and
the only computed margins that change are the three the change intends to change.

### D3 — The scope list is a named set, in one place

`.prose`, `.corps`, `.aparte`, `.fiche-corps` — repeated in both declarations rather than factored
into a custom property, because CSS cannot interpolate a selector and a preprocessor is not in this
stack. The comment above them states the rule in words, so extending the set is a one-line edit at
the place a reader looking for list spacing will already be.

`.aparte` currently renders no list anywhere on the site. It is in the set because it is a markdown
render target and a future aside may well contain one — the cost of listing it is nil and the cost
of omitting it is a silent regression.

### D4 — The lexique index gets a prose scope, not a private rule

The lexique's numbered list of sections is the one list on the site that reads as prose while
sitting outside every prose container. Its wrapper takes the `prose` class. The alternative — a
`.cadre-lexique ol { … }` rule — would be a fifth place that spacing is decided, which is what this
change exists to stop.

The scope wraps *the list*, in a `<div class="prose">`, not the enclosing `<section>`. Measured
during implementation: `prose` on the section makes `.prose h2` (0,1,1) tie
`.section-carrefour > h2` (0,1,1) and win on document order, moving the heading from `24 px` /
`14,4 px` of bottom margin to `24,8 px` / `11,2 px`. The list asked for its rhythm, not for a
different heading.

### D5 — The check belongs in `verifier.mjs`, alongside the other things the eye cannot judge

A new `alignement` mode, wired into `tout`. For every `<ul>`/`<ol>` on every built page, it groups
the `<li>` children by rounded `top` offset, and fails any group of two or more whose heights differ
by more than half a pixel — naming page, list, and the heights.

Grouping by `top` rather than by CSS is what makes it independent of *how* the row was built: it
catches grid, flex, wrapped flex, and whatever a future section uses, without the script knowing any
class name. Run at the three widths `verifier.mjs` already uses, this reports **36 ragged rows**
today and **0** with D1 applied.

The half-pixel threshold, not zero: subpixel column widths (the sommaire's tracks measure
`452,797 px` and `452,812 px`) make exact equality the wrong test.

**Alternative rejected — a unit test on the CSS.** Asserting that `.liste-simple li` computes to
`margin-bottom: 0` tests the fix, not the contract. The next list would pass it while being broken.

## Risks / Trade-offs

- **A future markdown list rendered outside the four scopes gets no rhythm at all.** → Every
  markdown render point on the site is inside `.corps`, `.aparte`, `.fiche-corps`, or `.prose`
  today; D4 removes the last exception. The failure is visible on first look rather than silent,
  and the fix is adding one name to the set in D3.
- **The scoped selectors are less obvious than `li { … }`.** → The comment carries the rule in
  words. This is the trade the change is buying: a default that is harder to read once, instead of
  a default that is wrong in a way nobody sees.
- **Removing `margin: 0` from `.gestes li` and `dialog.index-blocs li` depends on D1 being right.**
  → Both are covered by the same verifier check, on pages the suite already visits, so a mistake
  here fails the build rather than reaching a projector. `.gestes li` keeps its other declarations;
  only the `margin` shorthand goes.
- **Rows on the sommaires get 10,7 px shorter, so pages reflow slightly.** → In the direction that
  helps: the sommaires are long and this removes stray space. The projection check in
  `verifier.mjs` guards the case that matters — nothing may overflow at 1024 × 768 — and shorter
  rows cannot break it.
- **`:where()` support.** → Baseline in every browser since 2021; the site already targets modern
  Chrome for its own verification and ships to evergreen browsers only.

## Migration Plan

Not applicable — a stylesheet change to a static site with no persisted state. Rollback is the
revert of a single commit; nothing is written, cached, or versioned outside the built output.

One deployment note, because the service worker serves assets cache-first: it can do so safely
only because Astro emits stylesheets under content-hashed names. A changed `base.css` produces a
new filename, so no participant's cache can hold the old rules — the mechanism the service worker's
own comment relies on (« leur nom change quand leur contenu change »). Nothing about this change
requires bumping the worker's cache key.
