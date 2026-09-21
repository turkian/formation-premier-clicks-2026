## Why

`src/README.md` was written on 2026-09-03 ("first version") and hasn't been
touched since, while ~50 commits have since landed, including a whole new
`content/exercices/` type and `/exercices/[numero]` page that it never
mentions. The site's GitHub Pages URL is also never stated as a literal
link — only described as a pattern — making it harder to find than it should
be for anyone opening the README to see the live site.

## What Changes

- Add the live GitHub Pages URL (`https://turkian.github.io/formation-premier-clicks-2026/`)
  near the top of `src/README.md`, stated as a literal, clickable link rather
  than only described as a pattern.
- Add `content/exercices/<n>.yaml` to the "Écrire du contenu" table (self-paced
  practice exercises per session), alongside the existing `lecons`, `marques`,
  and `fiches` rows.
- Remove the paragraph describing `docs/` as the animateur's private carnet
  (intro section) now that `docs/` no longer exists, per the companion
  `remove-docs-folder` change.
- Everything else in the README was checked against the current codebase
  (npm scripts, content paths, code references, deploy workflow) and found
  accurate — no other removals are needed.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — documentation-only change with no change to the site's observable
behavior; `skip_specs: true` is set for this change)

## Impact

- `src/README.md` only. No code, build, or deploy changes.
- Depends on the `remove-docs-folder` change for the `docs/`-removal context
  (can be sequenced either way, but both should land together so the README
  never describes a `docs/` that no longer exists).
