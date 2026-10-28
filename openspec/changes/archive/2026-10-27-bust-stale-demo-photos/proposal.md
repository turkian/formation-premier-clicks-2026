## Why

On the deployed site (`https://turkian.github.io/formation-premier-clicks-2026/`), a demonstration
photo that is replaced under the same filename keeps showing its old version; only a hard reload
(Ctrl+F5) reveals the new one. The service worker treats every URL ending in an image, font, CSS or
JS extension as fingerprinted and serves it cache-first forever — but files copied from `public/`
(`/demos/*.jpg`, `/polices/*.woff2`, `/icone.svg`) carry no fingerprint, so a cached copy can never
be replaced. This already happened: `l2-figer.jpg` and `l2-file.jpg` were modified in place, and
more placeholder photos are going to be swapped for real shots the same way.

## What Changes

- Assets referenced from `public/` (demonstration photos, fonts, icon) are referenced with a
  content-derived version in their URL, so a changed file gets a new URL and an unchanged file
  keeps its URL across deploys.
- The service worker serves an asset cache-first only when its URL carries a fingerprint — either
  Astro's bundled `/ressources/` files or a content-versioned `public/` file. An unversioned asset
  is never cached as permanent again.
- The service worker keeps only the most recent version it has seen of each asset path, and,
  without network, serves that version even when a cached page asks for a different one — offline,
  the site shows the latest copy it had rather than a broken image.
- Page fetches made by the service worker revalidate with the server instead of accepting the
  browser's HTTP cache, so a deploy's pages (and the new asset URLs they reference) are not held
  back by GitHub Pages' fixed ten-minute `max-age`.
- The service worker's cache name is bumped once (`v1` → `v2`) to purge photos already stuck in
  visitors' browsers. Offline copies cached under `v1` are lost once; this is accepted.
- The ineffective `cache-control: no-cache` header on the generated service worker (GitHub Pages
  ignores it in a static build) is removed or documented as such.
- The offline verification script gains a scenario reproducing the bug: a replaced photo appears
  on an ordinary reload, and still displays once the network is cut.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `site-shell`: the "Lessons remain usable without network access" requirement is extended so
  that offline display uses the latest cached version of each asset, and a new requirement states
  that a deployed replacement of a photo or other static asset appears on an ordinary reload,
  without a forced refresh.

## Impact

- `src/src/lib/lien.ts` — `asset()` (or a sibling helper) appends a content hash for files under
  `public/`.
- `src/src/components/EmplacementDemo.astro`, `src/src/components/schemas/pieces/DisquesLumiere.astro`
  — demonstration image URLs go through the versioned helper.
- `src/src/pages/service-travailleur.js.ts` — caching strategy, cache-name bump, precache list.
- `src/scripts/verifier-hors-ligne.mjs` — new stale-photo and offline-latest scenarios.
- Design decision D9 (offline by service worker) is amended.
- `src/scripts/copie-locale.mjs` — it registers no service worker (`file://`), but its
  absolute-to-relative path rewrite must keep working on asset URLs that now carry a `?v=` query;
  `npm run verifier:copie-locale` must still pass.
- No new dependencies, no route changes, no change to the `public/demos/` drop-a-photo workflow.
