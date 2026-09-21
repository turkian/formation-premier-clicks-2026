## Context

See proposal.md - Why. `src/README.md` is a single documentation file that has
drifted from the codebase over ~50 commits. This is a prose-accuracy change
scoped entirely to that one file — no code, build, or deploy behavior changes,
and `skip_specs: true` applies.

## Goals / Non-Goals

**Goals:**
- Every concrete claim left in `src/README.md` after this change matches the
  current repo state (npm scripts, content paths, code references, deploy URL).
- The README never describes `docs/` after the `remove-docs-folder` change lands.

**Non-Goals:**
- Restructuring or expanding the README beyond fixing drift (no new sections,
  no style rewrite).
- Auditing files other than `src/README.md`.

## Decisions

- **State the GitHub Pages URL as a literal link, sourced from the deploy
  workflow's env vars rather than typed by hand.** `.github/workflows/deploy.yml`
  derives the URL from `repository_owner`/`repository_name`
  (`https://<owner>.github.io/<repo>/`); task 1.1 verifies the literal string
  against that pattern instead of trusting recall, so the link can't silently
  diverge from what the workflow actually publishes.
- **Add one table row for `content/exercices/<n>.yaml`, verified against the
  actual files and route.** The existing "Écrire du contenu" table already
  documents `lecons`, `marques`, and `fiches` the same way (path → route); the
  new row follows that convention rather than introducing a new one. Verified
  against `src/content/exercices/` and `src/pages/exercices/[numero].astro`
  directly, not against a description of the feature.
- **No ordering dependency between this change's `docs/` paragraph removal and
  the `remove-docs-folder` change's actual deletion of the folder.** They edit
  disjoint files, so either can be implemented first. The only constraint
  (recorded in the proposal's Impact section) is that both land together, so
  there is never a published state where the README still describes a `docs/`
  that no longer exists, or `docs/` still exists but the README omits it.
- **Re-verify every remaining concrete claim as a final pass, not just the
  three edited spots.** Task 4.1 cross-checks npm scripts against
  `package.json`, content paths against `src/content/`, and code references
  against `src/lib/`/`src/styles/` — the drift that motivated this change
  (proposal - Why) was general, not limited to the three items being fixed, so
  the verification step covers the whole file.

## Risks / Trade-offs

- [The literal GitHub Pages URL becomes stale if the repo is ever renamed or
  transferred] → Mitigated by deriving it from the deploy workflow's own env
  var pattern at write time (task 1.1); a future rename is out of scope here
  and would need its own follow-up edit regardless of link format.
- [The `docs/` paragraph is removed here before `remove-docs-folder` actually
  deletes the folder, or vice versa, leaving a temporarily inconsistent repo
  state if only one change lands] → Mitigated by treating "land together" as
  an explicit coordination note (proposal - Impact) rather than a hard
  sequencing rule enforced by tooling.
- [The final audit (task 4.1) misses a stale claim outside the three edited
  areas] → Mitigated by scoping the audit to concrete, checkable categories
  (scripts, paths, code references) rather than a general re-read, matching
  how the drift was originally found while writing the proposal.
