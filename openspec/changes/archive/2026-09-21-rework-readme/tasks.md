## 1. Surface the GitHub Pages URL

- [x] 1.1 Add the live site URL (`https://turkian.github.io/formation-premier-clicks-2026/`) as a literal, clickable link near the top of `src/README.md`, and verify the link matches the pattern produced by `.github/workflows/deploy.yml`'s `SITE_URL`/`BASE_PATH` env vars (`https://<repository_owner>.github.io/<repository_name>/`)

## 2. Document the missing content type

- [x] 2.1 Add a row for `content/exercices/<n>.yaml` to the "Écrire du contenu" table, and verify it accurately describes the files in `src/content/exercices/` and the `/exercices/[numero]` route in `src/pages/exercices/[numero].astro`

## 3. Remove outdated content

- [x] 3.1 Remove the paragraph in the intro describing `docs/` as the animateur's private carnet, and verify `grep -n "docs/" src/README.md` returns nothing (coordinate with the `remove-docs-folder` change so both land together)

## 4. Verify

- [x] 4.1 Re-check every remaining concrete claim in `src/README.md` (npm scripts against `package.json`, content paths against `src/content/`, code references against `src/lib/`/`src/styles/`) and confirm each still matches the current repo state
