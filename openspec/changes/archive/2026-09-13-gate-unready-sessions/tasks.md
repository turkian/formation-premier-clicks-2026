## 1. Readiness marker and gating signal

- [x] 1.1 Add a `pret` boolean field (default `false`) to the `lecons` collection schema in
      `src/src/content.config.ts`, and verify `astro check` / `npm run verifier:modele` passes
      with the field present on all three lesson files.
- [x] 1.2 Set `pret: true` in `src/src/content/lecons/1.yaml` and leave (or set explicitly)
      `pret: false` in `2.yaml` and `3.yaml`; verify by reading the parsed collection (e.g. a
      short check script or `astro check`) that the values load as expected.
- [x] 1.3 Add a small helper (e.g. `src/src/lib/publication.ts`) that returns whether the
      current build is gated: `true` when `import.meta.env.PROD` is set and the
      `SEANCES_TOUJOURS_PRETES` override env var is not present, `false` otherwise (dev server,
      or the override present). Verify with a unit-level check or by logging the value from
      both `astro dev` and a local `astro build`.

## 2. Gate the lesson summary route

- [x] 2.1 In `src/src/pages/lecons/[numero]/index.astro`, when gating is active and the
      lesson's `pret` is `false`, render a neutral work-in-progress notice (no timing claim —
      e.g. "Cette séance n'est pas encore publiée.") instead of the blocks/screens list. Verify
      by running `npm run build` locally (gate active) and inspecting
      `dist/lecons/2/index.html` and `dist/lecons/3/index.html` for the notice and the absence
      of block/screen content.
- [x] 2.2 Verify that with `astro dev`, `/lecons/2/` and `/lecons/3/` still render their full
      summaries (open both routes and confirm blocks and screens are listed).
- [x] 2.3 Verify that `/lecons/1/` renders its full summary in both a gated build and dev
      server, unaffected by the change.

## 3. Gate individual screen routes

- [x] 3.1 In `src/src/pages/lecons/[...chemin].astro`'s `getStaticPaths`, skip generating any
      path for a lesson whose `pret` is `false` when gating is active. Verify by running
      `npm run build` and confirming `dist/lecons/2/` and `dist/lecons/3/` contain no
      per-screen subdirectories, only the summary `index.html`.
- [x] 3.2 Verify that `astro dev` still serves every screen route for sessions 2 and 3 (spot
      check one screen from each).

## 4. Keep `copie-locale` fully unlocked

- [x] 4.1 Add `SEANCES_TOUJOURS_PRETES: '1'` (or equivalent) to the `env` object passed to the
      `astro build` call in `src/scripts/copie-locale.mjs`, next to the existing `BASE_PATH`/
      `SITE_URL` overrides, with a short comment explaining why. Verify by running
      `npm run copie-locale` and confirming the produced copy's `lecons/2/index.html` and
      `lecons/3/index.html` contain full summaries and that per-screen files exist under
      `lecons/2/` and `lecons/3/`.

## 5. CI safety net

- [x] 5.1 Extend `scripts/verifier-modele.mjs` (or add a check alongside it) to fail if any
      lesson file is missing the `pret` field or has a non-boolean value. Verify by
      temporarily removing the field from a test fixture (or a scratch file) and confirming
      the check fails, then restoring it.
- [x] 5.2 Run `npm run build && npm run verifier:modele && npm run verifier:contenu` (the same
      steps `.github/workflows/deploy.yml` runs) locally and confirm they pass with sessions 2
      and 3 gated.

## 6. End-to-end confirmation

- [x] 6.1 Run `npm run build` (gate active, no override) and confirm in a browser served from
      `dist/`: the home page still shows all three séance cards as identical peer links; séance
      1 opens normally; séance 2 and séance 3 show the work-in-progress notice at their summary
      route and 404 on any guessed per-screen URL.
- [x] 6.2 Run `npm run dev` and confirm all three séances are fully navigable, including every
      screen.
