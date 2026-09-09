## Context

See proposal.md for motivation. Two implementation facts shape the approach:

- The fullscreen bug is a naming collision, not a missing guard: `Base.astro:31` sets
  `data-plein-ecran="oui"` on `<html>` (a CSS-only kiosk-mode marker), and `Ecran.astro:49` sets a
  bare `data-plein-ecran` on the fullscreen button. `Ecran.astro:156`'s
  `document.querySelector('[data-plein-ecran]')` matches by attribute presence and returns the
  first hit in document order — `<html>`, not the button — so the click listener ends up on the
  whole page.
- The block-index modal (`IndexBlocs.astro`) is self-contained: it's rendered once from
  `Ecran.astro:85`, its only inbound reference is the `data-ouvrir-index` button and the `i`
  keyduring shortcut, both in `Ecran.astro`, and nothing else in the codebase links to or imports
  it.

## Goals / Non-Goals

**Goals:**
- Make the fullscreen button's DOM lookup unambiguous, permanently — not just for this bug, but so
  the same collision can't recur if another `data-plein-ecran`-named element is added later.
- Keep the toolbar's implementation as simple as it is today: plain attributes, no client-side
  framework, no new state management.

**Non-Goals:**
- Replacing the vanilla `<script>` approach with a component framework or a shared "toolbar"
  abstraction — three controls in one layout file don't need one.
- Any keyboard-shortcut redesign beyond dropping `i` (see proposal.md).

## Decisions

**Rename the button's attribute instead of just scoping the selector.** Two fixes were
considered: (a) keep `data-plein-ecran` on the button but scope the query to
`.commandes [data-plein-ecran]`, or (b) give the button a distinct attribute name
(e.g. `data-bouton-plein-ecran`) so no collision is possible regardless of where it's queried
from. (b) is chosen: (a) still leaves two unrelated elements sharing one attribute name, which is
the actual defect — a future refactor that queries `[data-plein-ecran]` from a different scope
would reintroduce the exact same bug. Renaming the button's attribute removes the shared name
entirely. `<html data-plein-ecran="oui">` keeps its name and purpose unchanged (it's CSS-only,
matched by a `html[data-plein-ecran='oui']` selector in `Base.astro`, never by `querySelector`).

**Delete `IndexBlocs.astro` rather than keep it unused.** Nothing will reference it after this
change (confirmed: its only callers are the two removed affordances in `Ecran.astro`). Keeping an
orphaned component around invites the same "is this still used?" uncertainty this change is
already resolving for the toolbar itself.

**"Début" reuses the existing first-screen URL shape.** `IndexBlocs.astro:27` already builds
`/lecons/{numero}/{bloc.id}/{bloc.ecrans[0].id}` for each block; "Début" needs the same pattern
anchored to `lecon.blocs[0]` instead of an arbitrary block. No new routing concept, no new
utility — just reads `lecon.blocs[0].id` and `lecon.blocs[0].ecrans[0].id` at the same call site
that used to render the "Sommaire" `<a>`.

## Risks / Trade-offs

- **[Risk]** Removing the block-index modal removes the only documented recovery path for an
  animator running behind schedule (see the removed requirement's rationale in the `lessons`
  spec delta). → Accepted per explicit product decision (see proposal.md); mitigation is the
  existing lesson-summary page, still reachable via Home → lesson card → summary.
- **[Risk]** `scripts/verifier.mjs liens` (the link checker) or `verifier-contenu-final.mjs` may
  assert something about the toolbar's current labels or the index route. → Run
  `npm run verifier:liens` and `npm run verifier:contenu` after the edit, before considering the
  change done; fix any assertion that still expects the old labels/behavior rather than silencing
  it.

## Migration Plan

Static-site content change with no data migration. Build and manually verify one lesson screen at
each viewport tier (projection width, phone width) after the edit, then run the full verification
suite (`npm run verifier:tout`).
