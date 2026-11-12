## Context

See proposal.md — Why. The relevant current state:

- Every reference to a file in `src/public/` already goes through `asset()` in `src/src/lib/lien.ts`:
  demonstration photos (`EmplacementDemo.astro`, `DisquesLumiere.astro`), fonts (`Polices.astro`,
  both the `@font-face` rule and the `preload` link), the icon (`Base.astro`, the manifest), and the
  service worker's precache list. `lien.ts` is only imported from component frontmatter and
  endpoints, never from a client `<script>` — it runs at build time, in Node.
- `asset()` is also called for two URLs that are **not** files in `public/`: the service worker
  script (`/service-travailleur.js`, an endpoint) and its scope (`/`). The manifest
  (`/manifeste.webmanifest`) is likewise an endpoint.
- GitHub Pages serves every file with `cache-control: max-age=600` and an ETag; response headers set
  in an Astro endpoint are discarded by the static build.
- The service worker (`service-travailleur.js.ts`) decides cache-first by file **extension**, and
  its cache name `premiers-clicks-v1` has never changed, so its `activate` cleanup never runs.
- `copie-locale.mjs` turns `${BASE}/` prefixes into relative paths with a plain string replace and
  registers no service worker (`file://`).

## Goals / Non-Goals

**Goals:**

- Fingerprinting decided by file content, computed at build time, with no change to how photos are
  added (drop a file in `public/demos/`).
- One rule for the service worker: "cache-first if and only if the URL is fingerprinted".
- Offline behavior that never shows a broken image because of a version mismatch.

**Non-Goals:**

- Image optimisation or moving photos into Astro's asset pipeline (`src/assets/`, `<Image>`).
- Prefetching the next screen's photos for offline use — today only the next page's HTML is
  prefetched; this change does not alter that.
- Controlling GitHub Pages' HTTP headers (not configurable).

## Decisions

### D1 — Content hash in the query string, added by `asset()`

`asset(chemin)` appends `?v=<hash>` when `chemin` names an existing file in `public/`, where
`<hash>` is the first 10 hex characters of the SHA-256 of the file's bytes. When no such file exists
— endpoints, the scope `/`, or a demonstration photo not yet shot — the URL is returned unchanged.

- **Why the query string, not the file name:** renaming would require a build step that copies or
  renames `public/` output and rewrites references; the query string needs no file to move, and
  every caller already goes through `asset()`.
- **Why content, not a build ID:** a build ID would change every URL on every deploy and force all
  photos to download again over the room's network, violating the spec's "deploy that leaves a
  photo untouched" scenario.
- **Why "file exists" as the trigger:** it excludes the service worker script and scope without a
  list of exceptions. Keeping the service worker script's URL stable matters: a new script URL is
  treated as a different registration.
- **Alternatives considered:** Astro's `<Image>`/`import.meta.glob` (real fingerprinted names and
  optimisation, but changes the drop-a-photo workflow and how `fichier` resolves — rejected as out
  of scope); a separate `demo()` helper (would leave fonts and the icon unversioned for no gain).

**Locating `public/`:** `lien.ts` is bundled at build time, so `import.meta.url` does not point at
the source tree. The public directory's absolute path is injected from `astro.config.mjs` (a Vite
`define` derived from the config file's own location) and read with `node:fs`/`node:crypto`.
Hashes are memoised per path for the build; in development, where no service worker runs, the memo
may be bypassed so a replaced photo is picked up without a restart.

### D2 — Service worker: fingerprint decides, not extension

| Request | Strategy |
|---|---|
| Page (navigation / HTML) | Network first with `cache: 'no-cache'` (revalidate with the ETag, a cheap `304` when unchanged); on failure, cached page, else the site root |
| `/ressources/*` (Astro-hashed) | Cache first |
| URL with `?v=` | Cache first on the exact URL; on miss, network, then store (see D3); offline miss, see D3 |
| Anything else (unversioned file) | Network first, cache as offline fallback |

- **Why `cache: 'no-cache'` on pages:** without it, the service worker's `fetch()` may be answered
  by the browser's HTTP cache for up to ten minutes after a deploy, returning an old page that still
  points to the old `?v=` photo.
- **Why unversioned files become network first:** they are the class that caused the bug; any future
  file that bypasses `asset()` degrades to "fresh online, cached offline" instead of "stuck forever".

### D3 — One copy per path; offline falls back to any version

When a `?v=` response is stored, the service worker first deletes every cached entry for the same
path regardless of query (`cache.delete(url, { ignoreSearch: true })`), then stores the new one —
in that order, awaited. When a `?v=` request misses the exact URL and the network fails, it answers
with `caches.match(url, { ignoreSearch: true })`.

- This satisfies "offline shows the latest version it had": the only copy left is the newest one
  seen, and it is served whichever version an older cached page asks for.
- It also bounds the cache to one entry per asset, so repeated photo swaps do not accumulate.
- **Alternative considered:** pruning against a build-time manifest of current hashes on `install`.
  Rejected: it would delete the version a still-cached older page references before the new one has
  been fetched, which is exactly the broken-image case offline.

### D4 — One-time cache name bump, `v1` → `v2`

The existing `activate` handler deletes every cache whose name differs from `VERSION`. Changing the
name once purges photos stuck under `v1`. The name stays constant afterwards: D1–D3 make per-deploy
wipes unnecessary, and per-deploy wipes would discard offline copies of pages not revisited since.

### D5 — Local copy strips the version query

`copie-locale.mjs` removes `?v=<hex>` from asset URLs as part of its rewrite. On `file://` there is
no service worker and no HTTP cache, so the query has no purpose there, and dropping it avoids
relying on how each browser treats a query string on a `file://` image or font.

### D6 — The service worker's `cache-control` header is removed

The `'cache-control': 'no-cache'` set on the generated service worker never reaches the browser on
GitHub Pages. It is removed and replaced by a comment stating that update checks rely on the
browser's default of bypassing the HTTP cache for service worker scripts (`updateViaCache:
'imports'`), so the code no longer implies a guarantee it does not provide.

### D7 — Verification reproduces the deploy, not just the strategy

`verifier-hors-ligne.mjs` gains a scenario that serves a **copy** of `dist/`, visits a screen with a
demonstration photo, then simulates a deploy in that copy (replace the photo's bytes and rewrite
its `?v=` in the HTML) and asserts that an ordinary reload shows the new photo. It then cuts the
network and asserts that a page cached with the old `?v=` still displays an image. A build check
asserts that no page in `dist/` references a file under `/demos/` or `/polices/` without `?v=`.

This change amends decision D9 of `2026-09-04-build-formation-site`: the cache-first rule applies
to fingerprinted URLs, not to file types.

## Risks / Trade-offs

- [A file referenced without `asset()` (hard-coded path in CSS or Markdown) gets no hash] → D2 makes
  it network first, so it is never stuck; the D7 build check flags `/demos/` and `/polices/`
  references without `?v=`.
- [Hashing reads every referenced photo at build time] → ~40 files, memoised; negligible next to
  the existing Playwright verifications.
- [The `v2` bump discards visitors' existing offline cache once] → Accepted. The next visit online
  refills it; the local copy remains the fallback for a session with no network at all.
- [Within ten minutes of a deploy, the photo request itself may hit the HTTP cache] → It cannot be
  stale: a changed photo has a new URL, which has never been cached.
- [`ignoreSearch` deletion also matches the same path with an unrelated query] → `public/` assets
  are only ever requested with `?v=` or with no query; no other query is used on them.

## Migration Plan

1. Deploy as a normal push to `main`. Browsers check the service worker script on navigation,
   install `v2`, and `activate` deletes `premiers-clicks-v1`.
2. Visitors with an open tab keep the old worker until the tab reloads. `skipWaiting()` and
   `clients.claim()` are already in place, so a single reload is enough.
3. Rollback: revert the commit. The old worker's `v1` name differs from `v2`, so its own `activate`
   deletes `v2` cleanly. The only thing that comes back is the original bug.
