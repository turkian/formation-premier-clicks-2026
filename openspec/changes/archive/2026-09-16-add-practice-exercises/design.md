## Context

See proposal.md — Why. Two existing content collections set the precedent this design follows:
`lecons` (YAML, one file per session, structured fields for a projected block-by-block flow) and
`fiches` (Markdown, one file per sheet, prose meant for print). Practice exercises are neither: a
short, structured, repeated item (title + prompt + optional device note), grouped one set per
session, never projected, never printed.

## Goals / Non-Goals

**Goals:**
- Reuse the site's existing content-collection and hub-card conventions rather than introducing
  a new pattern.
- Keep the exercise pages simple enough that adding a fourth session later, or a seventh exercise
  to an existing session, is a content-only change.

**Non-Goals:**
- No interactivity, no client-side state, no way to mark an exercise done (the spec explicitly
  rules this out).
- No print stylesheet or Letter-page layout for exercise pages.
- No change to the `lecons` or `fiches` schemas, and no change to any projected lesson content.

## Decisions

**A new `exercices` content collection, YAML, one file per session.**
Mirrors `lecons/1.yaml`, `2.yaml`, `3.yaml` in shape (`numero`, `titre`, a list of items) rather
than `fiches`' Markdown-with-frontmatter shape, because each exercise is a structured repeated
item, not flowing prose. Loaded with the same `glob` loader pattern already used for `lecons` and
`marques` in `src/content.config.ts`.

Schema sketch:
```ts
const exercice = z.object({
  id: z.string(),
  titre: z.string(),
  consigne: z.string(),
  // Present only when a phone cannot perform a step a camera can (e.g. choosing the
  // aperture directly); states the limitation and the phone-appropriate alternative.
  cellulaire: z.string().optional(),
});

const exercices = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/exercices' }),
  schema: z.object({
    numero: z.number().int().min(1).max(3),
    titre: z.string(),
    exercices: z.array(exercice).min(1),
  }),
});
```
`cellulaire` reuses the field name already established in `lecons` for phone-specific text
(`appareil-en-main` screens), so the convention reads the same across collections even though its
sense here is narrower (a limitation-and-alternative note, not a general phone instruction).

**A new route, `src/pages/exercices/[numero].astro`, alongside `lecons/[numero]/` and
`fiches/[id].astro`.** One page per session, statically generated via `getStaticPaths` over the
`exercices` collection — same pattern as the existing per-session and per-fiche routes. The page
renders a simple stacked/wrapped card list; no block navigation, no keyboard-driven screens like
the lesson route needs, since there is no run-of-show to step through.

**Hub section reuses the existing card markup and CSS (`.section-carrefour`, `.grille`,
`.carte`)** already defined in `carrefour.css` for "Les trois séances," rather than introducing a
new visual component. Three cards, one per session, linking to `/exercices/1`, `/2`, `/3` via the
existing `lien()` helper. This is also what makes the `site-shell` "items sharing a row occupy
the same height" requirement apply for free — it's the same card component, not a new one that
would need to independently satisfy that contract.

**No hard-coded count.** The spec says "several," and the proposal's "around six" is editorial
guidance for session 1's first draft, not a constraint the schema or the page enforces — a
session with five or seven exercises is not a bug.

## Risks / Trade-offs

- **Duplicating the `cellulaire` field name across two collections with a narrower meaning in
  one of them** could confuse a future editor. Mitigated by the schema comment above; if this
  becomes a real source of mistakes, a rename (e.g. `limiteCellulaire`) is a content-only,
  non-breaking follow-up.
- **A fourth "peer" section on the hub** (sessions, exercises, consult, fiches) adds visual
  weight to a page whose stated design goal is "one click to everything, nothing nested." Kept in
  check by using the same card treatment as the existing sections rather than a heavier layout.
