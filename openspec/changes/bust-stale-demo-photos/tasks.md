# Tasks

## 1. Content-versioned asset URLs (design D1)

- [x] 1.1 In `src/astro.config.mjs`, inject the absolute path of `src/public/` as a Vite `define`
      derived from the config file's own location (not `process.cwd()`), with a comment explaining
      why `lien.ts` cannot use `import.meta.url`; verify `npm run build` still succeeds from `src/`.
- [x] 1.2 In `src/src/lib/lien.ts`, make `asset()` append `?v=<first 10 hex of SHA-256>` when the
      path names an existing file in `public/`, and return the URL unchanged otherwise (endpoints,
      `/`, photos not yet shot). Memoise per path in production; bypass the memo in development.
      Update the doc comment's examples. Verify in `dist/` that a lesson page references
      `/demos/<photo>.jpg?v=…`, `Polices`'s `@font-face` and `preload` carry `?v=`, the icon
      carries `?v=`, and `service-travailleur.js` and the registration scope do not.
- [x] 1.3 Verify the hash is content-derived: rebuild without changes and confirm a given photo's
      `?v=` is identical; change one byte of a scratch copy of that photo under `public/demos/`,
      rebuild, and confirm only that photo's `?v=` changes (restore the original afterwards).
- [x] 1.4 Verify a demonstration slot whose photo file is absent still renders its specification
      placeholder (spec `demo-media`, "A missing photograph displays its own specification"), by
      viewing such a screen in `npm run preview`.

## 2. Service worker strategy (design D2, D3, D4, D6)

- [x] 2.1 In `src/src/pages/service-travailleur.js.ts`, bump `VERSION` to `premiers-clicks-v2` and
      keep `NOYAU` built from `asset()` so the precached fonts and icon carry `?v=`; verify in
      `dist/service-travailleur.js` that `NOYAU` URLs match the ones in a built page exactly.
- [x] 2.2 Replace the extension-based `estVersionnee` with a fingerprint test: path under
      `/ressources/` or URL with a `v` search parameter. Unversioned files fall through to network
      first. Verify by reading the generated `dist/service-travailleur.js`.
- [x] 2.3 Make the page (network-first) fetch use `cache: 'no-cache'`, keeping the cached-page and
      site-root fallbacks; verify in DevTools against `npm run preview` that a page reload sends a
      conditional request (`If-None-Match`) through the worker.
- [x] 2.4 For `?v=` requests: on cache miss, fetch, then delete same-path entries with
      `ignoreSearch` before storing, awaited in that order; on network failure, answer with
      `caches.match(url, { ignoreSearch: true })`. Verify by reading the generated worker that the
      delete precedes the put and both are awaited before the response is stored.
- [x] 2.5 Remove the endpoint's ineffective `'cache-control': 'no-cache'` header and replace it with
      a comment stating that GitHub Pages ignores it and that update checks rely on the browser
      bypassing the HTTP cache for worker scripts; update the file's header comment so the strategy
      described matches D2 (fingerprint decides, not extension). Verify `npm run build` succeeds.

## 3. Local copy (design D5)

- [x] 3.1 In `src/scripts/copie-locale.mjs`, strip `?v=<hex>` from asset URLs during the rewrite and
      add a numbered point to the file's header comment explaining why; verify
      `npm run copie-locale` produces pages with no `?v=` and `npm run verifier:copie-locale` passes,
      with photos and the Inter typeface displaying when opened over `file://`.

  Note: `npm run verifier:copie-locale` fails **before and after** this change, at the same step
  (`a.carte` no longer exists on the lesson summary page; the script dates from the first commit).
  The `file://` behavior was verified directly instead: lesson 2 screens load all photos and Inter
  with no `?v=` left in the copy. Repairing that script is outside this change.

## 4. Verification of the deploy scenario (design D7)

- [x] 4.1 In `src/scripts/verifier.mjs` (`liens` mode), add a check that no built page references a
      file under `/demos/`, `/polices/` or `icone.svg` without `?v=`; verify it passes on the
      current build and fails when one `asset()` call is temporarily bypassed.
- [x] 4.2 In `src/scripts/verifier-hors-ligne.mjs`, add a scenario served from a copy of `dist/`:
      visit a screen with a demonstration photo, simulate a deploy in the copy (replace that photo's
      bytes with an image of different dimensions and rewrite its `?v=` in every page), reload
      normally, and assert the displayed image has the new dimensions (spec scenario "A placeholder
      photo is replaced by the real shot").
- [x] 4.3 In the same script, after 4.2, assert the worker's cache holds a single entry for that
      photo's path (spec "Only the newest copy of an asset is kept"); then cut the network, open a
      page still cached with the old `?v=`, and assert the photo displays with the new dimensions
      (spec "A photo was replaced after a page was cached").
- [x] 4.4 Add a migration scenario: seed a `premiers-clicks-v1` cache holding a stale photo in a
      fresh browser context, load the site, and assert that cache is
      gone after the `v2` worker activates (spec "Visitors with photos already stuck from earlier
      deploys"). Verify `npm run verifier:hors-ligne` passes with the existing scenarios unchanged.

## 5. Integration

- [x] 5.1 Run `npm run build && npm run verifier:tout && npm run verifier:copie-locale` from `src/`
      and verify everything passes.

  Note: everything this change touches passes — `verifier:modele` (30), `verifier:contenu` (70),
  `verifier` liens/impression/téléphone/QR/alignement with the new empreinte check (803),
  `verifier:hors-ligne` (20, of which 4 new), and the `file://` copy. Two failures are
  **pre-existing and identical without this change**: `verifier projection` reports `.marco`
  overflowing on the two `lecons/1/lumiere/la-lumiere-en-images-angles-*` screens (153–196 px), and
  `verifier:copie-locale` times out on `a.carte` (see 3.1).
- [ ] 5.2 After deploying to `https://turkian.github.io/formation-premier-clicks-2026/`, in a browser
      that showed the stale `l2-figer.jpg` before, reload once normally and verify the current photo
      appears and DevTools > Application > Cache Storage shows only `premiers-clicks-v2`.

## Workflow follow-up

- Sync the `site-shell` delta into `openspec/specs/site-shell/spec.md` and archive the change with
  `/opsx:archive` once 5.2 is confirmed on the deployed site.
