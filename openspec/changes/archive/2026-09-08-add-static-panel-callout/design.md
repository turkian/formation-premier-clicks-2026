## Context

See proposal.md - Why. Two existing mechanisms are relevant:

- `.encadre`/`[data-ton]` (`src/src/styles/lecon.css:213-224`) — the visual language for a
  highlighted box (colored left border + tinted background, no icon), already tuned for
  `reponse` / `regle` / `avertissement` / `neutre`.
- `etats` (`src/src/content.config.ts:93-99`, `src/src/lib/lecon.ts:108-144`,
  `src/src/components/ecrans/Panneau.astro:22-41`) — the only current path that produces
  an `.encadre`. It's built for **cumulative, click-through** reveal: each state adds
  content, nothing is removed, and having more than zero states with content flips the
  panel into `dense` (a side-column layout, `Panneau.astro:41`). This is the wrong shape
  for a single static aside — it would silently turn a static panel into a click-through
  one and misplace the box into a side column.

The codebase has zero UI dependencies today (`src/package.json`): every visual asset,
including diagrams, is a hand-authored inline SVG resolved by name (`schemaDessine`,
`src/src/components/schemas/registre.ts`). This is also a strict offline-first site: a
service worker covers a mid-session network loss, and a separate local-copy build
(`scripts/copie-locale.mjs`) runs from `file://` with no server at all, rewriting module
scripts and stripping `crossorigin` attributes because a `file://` origin can't do
cross-origin fetches. Any icon mechanism must resolve to literal `<svg>` markup at build
time — no icon font, no CDN, no runtime fetch.

## Goals / Non-Goals

**Goals:**
- Let a static (no-`etats`) `panneau` screen render one `.encadre` callout, using the
  existing color/tone language, without engaging the `etats`/`dense` cumulative path.
- Add a minimal, build-time-only icon mechanism and use it inside that callout.

**Non-Goals:**
- Multiple callouts on one static panel, or callouts on other screen genres
  (`demonstration`, `interactif`, `repere`, `appareil-en-main`) — only `panneau` is in
  scope.
- Reworking the cumulative `etats` mechanism itself.
- A general-purpose icon system used elsewhere on the site beyond this callout; other
  screens keep using hand-authored SVGs via `schemaDessine` for diagrams.

## Decisions

**Schema placement**: add `encadre` (`z.string().optional()`), `ton`
(`z.enum([...]).default('neutre')`), and `icone` (`z.string().optional()`) directly to
`ecranPanneau` (`content.config.ts`), sibling to its existing top-level `corps`/`schema`/
`aparte`. Alternative considered: reuse `etats` with a single, non-advancing entry —
rejected because it triggers `dense` layout (`ecran.etats?.length` is truthy the moment
one état exists) and implies click-through semantics that don't apply here.

**Render position**: the static `encadre` renders once, inside `region-corps`,
immediately after `corps` — mirroring the existing corps-then-encadre order already used
for cumulative `ajouts` (`Panneau.astro:56-64`), so the two code paths stay visually
consistent even though they're structurally separate.

**Content shape for `avant-chaque-photo`**: the automatic-mode paragraph is the `encadre`
(`ton: avertissement`); the closing line ("Sortir du mode automatique, c'est reprendre
ces quatre décisions") renders as plain text after the box, via a new `suite`
(`z.string().optional()`) field on `ecranPanneau`, rendered in `Panneau.astro`
immediately after the encadre. Superseded decision: an earlier version of this change
folded the closing line into the encadre itself to avoid adding a third field: revisited
after seeing it rendered — a callout is for the pivot the reader must stop on, not the
resolution that follows it, and conflating the two also crowded the box more than the
one-sentence warning needed. `suite` is deliberately not part of `corps`: `corps` renders
*before* the encadre (`Panneau.astro`'s corps-then-encadre order, see Render position
above), so trailing text needs its own slot to land after it.

**Icon mechanism**: `astro-icon` + one Iconify JSON collection (e.g.
`@iconify-json/lucide`), rendered via `<Icon name="..." />` inside `Panneau.astro`.
`astro-icon` resolves to inline `<svg>` at build time (no client JS, no network request),
which satisfies the offline/`file://` constraint the same way the existing hand-authored
diagram SVGs do. Alternative considered: hand-vendor individual SVGs with zero new
dependency, matching the project's existing convention exactly — rejected per explicit
product decision to take on a real icon library despite it being the first UI dependency
in this codebase, in exchange for a full icon set available to future panels.

`icone` stores an Iconify icon identifier (e.g. `lucide:triangle-alert`), resolved
directly by `<Icon name={icone} />` — no local name-to-component registry is needed the
way `schemaDessine`'s `composant` requires one, since Iconify names are already globally
unique.

## Risks / Trade-offs

- [First UI dependency in an otherwise zero-dependency, hand-authored-SVG codebase] →
  accepted as a deliberate, scoped exception; `astro-icon` + an Iconify collection are
  dev-time-only (build-time inlining), so the shipped output stays static HTML/SVG with
  no added runtime surface.
- [`icone` is a free-form string with no validated set of allowed values] → a typo
  resolves to a missing icon at build time; acceptable given the small number of
  authors and screens using this field, consistent with how `schemaDessine.composant`
  is already an unvalidated string resolved by name.
- [Two independent code paths now produce `.encadre` markup — static (`ecranPanneau`
  top-level) and cumulative (`etats`/`ajouts`)] → mitigated by keeping both consumers of
  the same CSS class and the same corps-then-encadre render order, so they stay visually
  identical even though neither shares code with the other.
