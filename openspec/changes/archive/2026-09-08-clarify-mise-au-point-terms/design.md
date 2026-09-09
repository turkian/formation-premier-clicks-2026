## Context

The `repere` genre (`src/src/components/ecrans/Repere.astro`) currently renders four fields
from the content YAML: `claim`, `corps`, `aparte`, and — for variante `activite` — an
ordered list inside `corps`. There is no existing field for a bare, unexplained pair of
terms; the `ouverture` screen for the `mise-au-point` bloc (`src/src/content/lecons/1.yaml`)
today only has its misleading `corps` sentence. See `proposal.md` for why that sentence is
being removed and replaced with a two-term prompt.

The content collection has a Zod schema (`src/src/content.config.ts`) with a discriminated
union per `genre`; `ecranRepere` lists its allowed fields explicitly (`claim`, `corps`,
`aparte`) and, being a plain (non-strict) `z.object`, silently drops any key not in that
list rather than erroring. A new field therefore needs a one-line schema addition, not just
a component change, or it is dropped before `Repere.astro` ever sees it. Beyond this schema,
there are targeted content rules in `src/scripts/verifier-contenu-final.mjs` (e.g. the
"soir" check, panel-accumulation checks) that don't concern shape.

## Goals / Non-Goals

**Goals:**
- Let a repère `ouverture` screen carry exactly two bare term labels, rendered side by side.
- Keep the existing `repere` contract (claim / corps / aparte) unchanged for every screen
  that doesn't use this field — no visual or markup change for `pause`, `questions`,
  `activite`, or an `ouverture` screen without terms.
- Stay legible at the projection floor (4:3 at 1024×768) and collapse cleanly to the phone
  arrangement, consistent with every other two-column layout in `lecon.css`.

**Non-Goals:**
- No definition, teaser, or timing text under either term — the spec (`lessons`) forbids it
  outright; this design doesn't need to accommodate it.
- No generalization to more than two terms, and no reuse for the `profondeur-de-champ`
  bloc's own opening screen — out of scope per the proposal.
- No change to how `activite`'s numbered-step list works.

## Decisions

**Data shape: a flat two-string tuple, `termes: [string, string]`, added to `ecranRepere` in
`content.config.ts` as `z.tuple([z.string(), z.string()]).optional()`.**
Not a list of objects (e.g. `termes: [{mot: ...}]`). There is nothing else to attach to a
term — no definition, no icon, no tone — so an object would only add a key
(`mot`/`terme`/…) with no second field to justify a record shape. Using `z.tuple` rather
than `z.array` means the schema itself rejects one term or three at build time — "exactly
two, nothing else" is enforced, not just visually implied by the YAML shape.

**Rendering: gated on the field's presence, not hard-coded to `variante: ouverture`.**
`Repere.astro` renders the `termes` block whenever `ecran.termes` is present, the same way
`activite`'s numbered-step rendering is keyed off markdown structure (an `<ol>` inside
`corps`) rather than a variante check in the component. The spec restricts the *authoring*
convention (this belongs on an `ouverture` screen) but the component itself stays a thin
renderer of whatever content is given it — consistent with how the rest of `Repere.astro`
already works (it doesn't validate `corps` against `variante` either).

**Layout: a new `.termes` grid in `lecon.css`, styled after the existing `.repere[data-variante="activite"] .corps ol` block** —
same file, same section, same numbered-circle visual language the codebase already uses for
"this is a distinct, structured piece of the repère." Two fixed columns
(`grid-template-columns: 1fr 1fr`) rather than `.variantes`'s `auto-fit` — there are always
exactly two terms, never more, so an auto-fit grid would just be solving a problem that
doesn't exist here. Collapses to a single column inside the existing
`@media (max-width: 44rem)` phone block, matching every other two-column-to-one-column
transition already in this file (the `.panneau` grid areas immediately above it).

**No new component.** This is four lines of template and a CSS rule, not a new screen genre
or a new Astro island — adding a component would be over-scoped for "render two strings
side by side."

## Risks / Trade-offs

- **[Risk]** A future author could put more than two terms in `termes`, or one term. →
  **Resolved by construction**: `termes` is declared as `z.tuple([z.string(), z.string()])`
  in `content.config.ts`, so the content collection's own build-time validation rejects
  anything but exactly two strings — no separate check needed.
- **[Risk]** Bare, undefined terms read as an editing mistake ("why does this say nothing?")
  to someone skimming the deployed site outside the live session, rather than as a deliberate
  prompt. → **Mitigation**: this is the room-facing design decision already made and
  confirmed with the user (explore mode) — the `claim` above it ("Où est le point net ?")
  and corps question frame it as a question to sit with, and the very next screen resolves
  it, so a phone reader scrolling through afterwards reaches the answer within one screen.

## Migration Plan

None needed — this is a content and presentation addition, not a data migration. The one
existing `ouverture` screen being edited (`mise-au-point` bloc) is updated in place as part
of this change's tasks.
