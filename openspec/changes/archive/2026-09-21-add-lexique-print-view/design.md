## Context

`[marque].astro` imports `lexique.css`, which has no `@media print` block at all today — printing
a brand page currently outputs the live page verbatim (chrome, brand switcher, framing text,
search box included). `fiche.css`, used only by the `Fiche` layout (`printable-references`
capability), already solves the adjacent problem: it hides site chrome via a small selector list
(`.sans-impression`, `nav`, `.fil`, `.pied-site`), sets `@page { size: letter }`, and applies a
compact type/column scale, including a `data-densite="serree"` variant for content-heavy sheets.
See proposal.md for why this page needs the same treatment.

## Goals / Non-Goals

**Goals:**
- Printing a brand page outputs only that brand's content, at the most compact layout the content
  allows.
- Reuse the existing chrome-hiding and compact-print conventions rather than inventing new ones.

**Non-Goals:**
- No dedicated "print" button or UI affordance — printing stays a browser action (`Ctrl+P`), same
  as `printable-references` pages, which have none either.
- No change to on-screen behavior, search logic, or brand content data.
- No guarantee of a single printed page — best-effort compaction only, per the proposal.

## Decisions

**Duplicate the small chrome-hiding rule into `lexique.css`, rather than centralizing it in
`carrefour.css`.** `carrefour.css` is imported by both genres and does define `.pied-site`, so
centralizing is possible. But `Base.astro` states its own genres deliberately don't share header
chrome because their needs differ, and `fiche.css` already keeps this rule genre-local rather than
global. Duplicating ~6 lines keeps `lexique.css` self-contained and consistent with that existing
precedent, at the cost of two copies to keep in sync if the rule ever changes.

**Rely on the existing `nav`/`.fil`/`.pied-site` selectors instead of tagging elements with
`sans-impression`.** `SelecteurMarque` already renders a `<nav>`, and the breadcrumb is already
`.fil` — both are already covered structurally, so they need no template change. Only the cadrage
note, the reading-instructions paragraph, and the search block have no existing hookable class;
each gets `sans-impression` added directly (the cadrage `<div>` already has a class to extend; the
reading-instructions `<p>` and `RechercheLexique`'s root `<div class="recherche">` gain the class).

**Force-show `[hidden]` entries and sections at print; force-hide the "no results" message.** The
in-page search sets the native `hidden` attribute on non-matching `.entree` elements and, when a
whole section has no match, on the section itself (`RechercheLexique.astro`'s `filtrer()`). If a
participant prints while a search filter is active, that attribute would otherwise carry into the
printed output and silently drop entries — contradicting the "every numbered section with its
entries" requirement. The print block overrides `[hidden]` back to visible for `.entree` and
`.section-lexique` specifically, and separately force-hides `.aucun-resultat` (the "no match"
status message), which would otherwise print alongside now-visible entries and contradict itself.
No JavaScript changes — this is a pure CSS override of a state JS already sets.

**Collapse each `.entree` to the existing narrow single-column layout at print, regardless of
outer page columns.** Lexique entries render as a 2-column CSS grid (formation term | appareil
term); `lexique.css` already has a narrower single-column fallback with a "→" separator for phones
(`@media (max-width: 40rem)`). A newspaper-style `column-count: 2` at the page level (borrowed from
`fiche.css`, for compaction) would otherwise nest that entry grid inside a narrow print column,
likely wrapping the two sides awkwardly. Reusing the already-tuned narrow-width entry layout inside
each print column avoids that, instead of designing a new print-specific entry layout.

**Give `.section-lexique`, `.entree`, `.exception`, and `.note-section` `break-inside: avoid`,
mirroring `fiche.css`'s treatment of its own blocks.** Prevents a single entry or note from
splitting across a column or page break.

## Risks / Trade-offs

- **Nested content inside CSS multi-column layout is somewhat print-engine-dependent** (Chrome vs.
  Firefox print-to-PDF can differ in column-balancing) → mitigated by keeping each `.entree`'s
  internal layout simple (single column, per the decision above) so there's little left to render
  inconsistently.
- **Content-heavy brands still spill past one page** → accepted trade-off, confirmed with the user;
  nothing is dropped to force a fit.
- **Two copies of the chrome-hiding selector list** (`fiche.css` and `lexique.css`) can drift if one
  is edited without the other → accepted for now, consistent with the codebase's existing
  genre-local styling; revisit only if a third genre needs the same rule.

## Migration Plan

CSS-only plus a few `class` attribute additions in one template; no data, no flags, no rollback
concerns beyond a normal revert. Ships in the next regular deploy.
