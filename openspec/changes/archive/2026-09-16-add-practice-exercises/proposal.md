## Why

Each lesson currently ends with a single fixed list of shots (the « défi ») embedded in the
projected, linear lesson flow. Once a session is over, a participant has no separate,
browsable place to keep practicing that session's concepts at their own pace — nothing they can
open on a phone weeks later and pick from freely, the way they can already browse the lexique or
a reference sheet independently of a lesson.

## What Changes

- Add a new, independent set of practice-exercise pages, one per session, each offering around
  six short, playful, replayable prompts tied to that session's concepts (for session 1: light,
  mise au point, and the four depth-of-field levers).
- Each exercise is phrased so it is doable with either a phone or a camera. Where a phone cannot
  do something a camera can (for example, controlling the aperture directly), the exercise
  carries a short note saying so and what to do instead — the same way lesson screens already
  carry a `cellulaire` note where a gesture differs by device.
- Add a new « Exercices » section to the home hub, presented with the same card treatment as the
  existing « Les trois séances » section, linking to each session's exercise page.
- These pages are read-only, phone-first, and carry no print layout — unlike the `fiches`
  collection, they are not designed to be printed.

## Capabilities

### New Capabilities

- `practice-exercises`: a set of per-session pages, each offering several short, self-directed
  practice prompts tied to that session's concepts, meant to be browsed independently on a
  phone after the session.

### Modified Capabilities

- `site-shell`: the home hub's "reaches all content in one click" requirement gains the practice
  exercises as a new reachable section, alongside the lessons, the lexique, and the reference
  sheets.

## Impact

- New Astro content collection (e.g. `exercices`), one entry per session, alongside the existing
  `lecons`, `marques`, and `fiches` collections in `src/content.config.ts`.
- New route rendering one page per session's exercise list, alongside the existing
  `lecons/[numero]/` and `fiches/[id].astro` routes.
- `src/pages/index.astro`: new hub section listing the three sessions' exercise pages.
- No backend, no new dependency, no change to the projected lesson flow or to any existing
  content collection's schema.
