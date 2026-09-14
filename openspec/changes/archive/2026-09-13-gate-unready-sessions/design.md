## Context

See proposal.md - Why. The site is a fully static Astro build (`src/`); every route is
generated once by `getStaticPaths`, and the same build artifact is whatever gets deployed —
there is no server-side branching available at request time. The project already distinguishes
build targets by env var: CI (`.github/workflows/deploy.yml`) injects `SITE_URL`/`BASE_PATH`;
everything else falls back to defaults in `astro.config.mjs`. `scripts/copie-locale.mjs` also
runs `astro build`, with its own env overrides, to produce the animator's offline fallback
copy — described in its own header as "le vrai repli de la soirée," meant to contain the real,
current content of every session regardless of review status.

## Goals / Non-Goals

**Goals:**
- Gate publication of a not-yet-ready lesson (`/lecons/<numero>/` and its screens) so a public
  GitHub Pages build cannot reach its content.
- Keep the dev server and `copie-locale`'s offline build fully unlocked, since both are used to
  review and rehearse the actual content before it is ready.
- Leave the home hub and `site-shell` spec untouched — a gated lesson stays a peer link.

**Non-Goals:**
- Gating printable reference sheets (`fiches`) tied to a session — out of scope, to be handled
  in a separate change.
- A content-authored "draft" flag per lesson file, or a review workflow — readiness here is a
  small, deliberate per-lesson marker plus a build-target switch, not a CMS-style status field.
- Changing anything about how a *ready* lesson behaves.

## Decisions

**Readiness signal: `import.meta.env.DEV`/`PROD`, not a new CI-only env var.**
The initial framing considered a dedicated CI-only flag (mirroring `SITE_URL`/`BASE_PATH`), so
that only the actual GitHub Pages build would be gated and any local `astro build` would behave
like dev. That was dropped once the requirement was confirmed as "only `astro dev` must show
everything, everything else gated is fine" — Astro's built-in `DEV`/`PROD` distinction already
draws that line with no new plumbing, and one exception (`copie-locale`) already needs an
explicit override regardless of which signal is chosen.

**`copie-locale.mjs` opts out explicitly, not implicitly.**
Its `astro build` invocation already passes `BASE_PATH`/`SITE_URL` overrides in its `env` object
(`scripts/copie-locale.mjs`); one more variable in that same object (e.g.
`SEANCES_TOUJOURS_PRETES=1`) unlocks every lesson for that build specifically. Astro.config
reads it the same way it reads the other two — a value present only where this script sets it,
absent (and therefore inert) everywhere else, including a plain developer `astro build`.

**Per-lesson readiness lives beside the content, not in code.**
Each `content/lecons/<n>.yaml` gets a small readiness marker (e.g. a `pret: boolean`, default
`false`) read by the content schema in `content.config.ts`. This keeps "session 1 is ready,
2 and 3 are not" a content-editor decision — flipping one file's marker when a lesson is
actually reviewed — rather than something requiring a code change to publish. Alternative
considered: hard-coding the gated lesson numbers directly in the page templates; rejected
because it would need a code change (and a new PR) at the exact moment a lesson becomes ready,
for no benefit over a one-line content edit.

**Gate at the route, not at the hub.**
`/lecons/[numero]/index.astro` renders the work-in-progress notice itself when its lesson is
not ready and the build is gated (`PROD` and no override present); `/lecons/[...chemin].astro`'s
`getStaticPaths` skips generating any screen path for a not-ready lesson under the same
condition. `src/pages/index.astro` needs no change: it links to `/lecons/<numero>/` exactly as
it does today, and that route always exists — it just renders different content depending on
gating. This keeps `site-shell`'s "reachable in one click" / "presented as peers" requirement
true without a spec change there, and avoids the dead-link risk a hub-level omission would
create (`scripts/verifier.mjs`'s `liens` check follows every built `<a href>` and fails on a
404).

**No placeholder needed for individual screens.**
Since sessions 2 and 3 have not launched, no screen address has ever been shared, projected, or
QR-coded — there is nothing an existing link could point at. Not generating those routes at all
in a gated build is simpler than generating a placeholder for each one, and there is no
deep-link continuity to preserve.

## Risks / Trade-offs

- **A lesson becoming ready mid-review could be forgotten.** Flipping `pret: true` in the wrong
  content file, or forgetting to flip it, silently keeps a finished lesson gated (safe failure
  mode) or exposes one meant to stay hidden (unsafe). Mitigation: `verifier-modele.mjs` (already
  run in CI before deploy) can assert the marker is present and typed correctly on every lesson,
  so a missing or malformed marker fails the build loudly rather than defaulting silently.
- **`copie-locale`'s override is easy to lose in a future refactor of that script.** Mitigation:
  keep the override alongside the existing `BASE_PATH`/`SITE_URL` overrides in the same `env`
  object, with a comment referencing why, so the three travel together.
- **Wording of the notice.** The site has a hard rule against asserting timing ("jamais...
  « bientôt », « la prochaine séance »" — see project context and `site-shell`'s "Site copy is
  true whenever it is read"). The exact copy for the work-in-progress notice is written during
  implementation, not fixed here, but it must state only the current fact ("cette séance n'est
  pas encore publiée") with no promise of when.

## Migration Plan

Additive: existing lessons keep working. Session 1's content file is marked `pret: true`;
sessions 2 and 3 default to `pret: false` (or are marked explicitly) until each is reviewed and
flipped. No rollback concern beyond reverting the marker or the gating code — nothing is
destructive.
