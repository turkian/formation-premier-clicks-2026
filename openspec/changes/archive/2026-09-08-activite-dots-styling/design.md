## Context

See proposal.md - Why/Impact. Single-file CSS addition plus a one-line content deletion;
no cross-cutting change, new dependency, data-model change, or migration.

## Goals / Non-Goals

**Goals:**
- Reuse the existing `.gestes` circled-counter presentation for `activite` screens.

**Non-Goals:**
- No changes to `panneau` numbered lists (e.g. "Les quatre questions") — see the scope
  decision in proposal.md.
- No new Astro component or content-schema change.

## Decisions

- Key the new rule off `.repere[data-variante="activite"] .corps ol` rather than
  introducing a shared CSS class or modifying `Repere.astro`. `Repere.astro` already
  stamps `data-variante={ecran.variante}` on the screen's root element, so the
  distinction is expressible purely in CSS — no template change needed. Alternative
  considered: add a `.gestes`-equivalent class in the markup; rejected as unnecessary
  indirection when the attribute already exists.
- Give the `activite` rule its own layout mechanism instead of literally sharing
  `.gestes`'s rule bodies. `.gestes` relies on the `<li>` being `display: grid` with the
  counter (`::before`) and the step text as exactly two grid items — which only works
  because `AppareilEnMain.astro` wraps each step in a single `<span>`. Markdown-rendered
  `activite` steps have no such wrapper: a step like "votre **prénom** ;" produces a
  `<li>` whose direct children are a text node, a `<strong>`, and another text node.
  Under `display: grid` those don't merge into one item — each inline element becomes
  its own grid item, auto-placed into the next cell — so the bold word breaks onto its
  own row, misaligned. (Confirmed by rendering the page: `<strong>prénom</strong>`
  measured at the `<li>`'s left edge, i.e. column 1, not next to "votre".) The
  `activite` rule instead keeps the `<li>` in normal flow, positions the numbered
  circle with `position: absolute` in the padding-left gutter it reserves
  (`padding-left: calc(1.7em + var(--pas-2))`), and lets inline content (bold, links,
  etc.) wrap normally. Same visual result as `.gestes`, different mechanism, because the
  DOM shapes differ.

## Risks / Trade-offs

- [Selector match is loose (`.corps ol`) and could pick up a stray `ol` accidentally added to
  an `activite` screen's markdown for non-step content] → Low risk: `activite` screens are
  short, single-purpose exercise instructions: an `ol` there is always the step list.
- [The grid-based `.gestes` mechanism silently breaks (steps misaligned, one word per row)
  the moment list-item content isn't a single wrapped element — this is a general trap for
  any future numbered-list styling in this codebase, not just this change] → Mitigated here
  by using the absolute-position mechanism for markdown-sourced lists; worth remembering if
  `.gestes`-style circles are ever wanted for another markdown-rendered list.
