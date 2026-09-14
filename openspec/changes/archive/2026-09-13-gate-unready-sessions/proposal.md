## Why

Sessions 2 and 3 have not been completed and reviewed yet. Session 1 is ready. The public
GitHub Pages deployment must not expose the unfinished lessons while work on them continues,
while every other way of running the site (the dev server, and the animator's own
`copie-locale` offline fallback) must keep showing everything, since that is where the
content actually gets reviewed and rehearsed.

## What Changes

- A lesson's route (`/lecons/<numero>/` and its screens) renders a neutral, no-timing-claim
  "work in progress" notice instead of its summary and screens when the lesson is not yet
  ready and the site is built for publication.
- Readiness is a build-time gate, not per-content authoring: any `astro build` is gated by
  default; `astro dev` always shows every session.
- `scripts/copie-locale.mjs` explicitly opts its own build out of the gate, since it produces
  the animator's real offline fallback and must contain the actual current content of every
  session, ready or not.
- The site's home hub is unaffected: séance 1, 2, and 3 remain three identical peer links,
  satisfying `site-shell`'s existing "reachable in one click" / "presented as peers"
  requirement as written — only the destination page's content differs for a gated session.
- Individual screen routes for a gated lesson are not generated at all in a gated build (there
  is nothing to deep-link to yet: no address for session 2 or 3 has ever been shared or
  projected), so only the two lesson-summary routes need the work-in-progress branch.

## Capabilities

### Modified Capabilities

- `lessons`: adds a carve-out to "A lesson is entered at any point" — a lesson marked not yet
  ready SHALL render a work-in-progress notice at its summary route instead of listing its
  blocks and screens, when the build is gated; this does not change the requirement for a
  ready lesson.

## Impact

- `src/astro.config.mjs` / build tooling: introduce the readiness gate (keyed off
  `import.meta.env.DEV` vs `PROD`, with an explicit override) and a per-lesson readiness flag.
- `src/src/pages/lecons/[numero]/index.astro`: render the work-in-progress notice for a
  not-ready lesson in a gated build.
- `src/src/pages/lecons/[...chemin].astro`: skip generating screen routes for a not-ready
  lesson in a gated build.
- `src/scripts/copie-locale.mjs`: pass the override so its own build is never gated.
- No change to `src/src/pages/index.astro` (home hub) or to the `site-shell` spec.
