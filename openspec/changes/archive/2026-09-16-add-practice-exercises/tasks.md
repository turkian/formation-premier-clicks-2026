## 1. Content collection

- [x] 1.1 Add the `exercices` collection (schema per design.md: `numero`, `titre`, `exercices: [{id, titre, consigne, cellulaire?}]`) to `src/content.config.ts` and register it in `export const collections`; verify `npm run check` passes with the new collection defined and zero content files
- [x] 1.2 Write `src/content/exercices/1.yaml` with six session-1 exercise prompts (two on light, two on mise au point, two on the depth-of-field levers), each phrased device-agnostically, with a `cellulaire` note only where a phone cannot control the aperture directly; verify `npm run verifier:contenu` passes on the new file (extending its `content/lecons/` + `content/marques/` scope to include `content/exercices/` first, per the "séance named by ordinal, never by a moment relative to the reader" rule in `openspec/config.yaml`)

## 2. Route and page

- [x] 2.1 Add `src/pages/exercices/[numero].astro` generating one static page per entry in the `exercices` collection via `getStaticPaths`, rendering the session's title and its list of prompts (title, consigne, `cellulaire` note when present) as stacked cards; verify `npm run build` produces `dist/exercices/1/index.html` (and equivalent for any other session file present)
- [x] 2.2 Style the page for phone-width reading only — no print stylesheet, reuse existing typography tiers — and verify `npm run verifier:telephone` passes on the new route

## 3. Hub integration

- [x] 3.1 Add an "Exercices" section to `src/pages/index.astro`, reusing the `.section-carrefour` / `.grille` / `.carte` markup already used for "Les trois séances," with one card per session in the `exercices` collection linking to `/exercices/{numero}` via `lien()`; verify the three cards render on `npm run dev` and each link resolves
- [x] 3.2 Give each hub card a label naming its kind (séance ordinal), a title, and one line stating the page is a set of practice prompts, distinct from the lesson; verify `npm run verifier:alignement` passes for the new row (same-height requirement) and `npm run verifier:liens` passes for the new links

## 4. Whole-site verification

- [x] 4.1 Run `npm run verifier:tout` and `npm run check` and confirm both pass with the new collection, route, and hub section in place
- [x] 4.2 Run `npm run verifier:hors-ligne` and confirm the new exercise pages are included in the offline-capable set, since `site-shell`'s "lessons remain usable without network access" requirement extends to any page visited once
