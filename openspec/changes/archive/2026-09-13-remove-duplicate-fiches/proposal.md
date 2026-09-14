## Why

Four of the seven printable reference sheets (« fiches ») restate a lesson block word-for-word —
« La méthode et les quatre leviers » repeats `lecons/1.yaml`'s `les-quatre-leviers` screen,
« Composer, et choisir sa vitesse » repeats `lecons/3.yaml`'s `cinq-reflexes` screen,
« Développer en sept gestes » and « Recettes d'exportation » repeat `lecons/3.yaml`'s
`sept-gestes` and `exporter` screens. The same explanation is maintained in two places and can
drift. With only three sheets left after removing the duplicates, the dedicated `/fiches` index
page also stops earning its keep: the home page already lists every sheet individually as a full
card (`index.astro`'s « Les fiches, une par une »), one click away, per the site-shell hub
requirement.

## What Changes

- Remove four fiches whose content is already taught in a lesson: `la-methode-et-les-leviers.md`,
  `composer-et-figer.md`, `developper-en-sept-gestes.md`, `recettes-d-exportation.md`.
- Keep the three fiches with no lesson duplicate: `avant-de-declencher.md`, `ma-photo-est-ratee.md`,
  `lexique-des-termes.md`.
- **BREAKING**: Remove the `/fiches` index page and its route (`src/src/pages/fiches/index.astro`).
  The home page's existing card grid becomes the only listing.
- Update `Fiche.astro`: the breadcrumb and footer links that pointed at `/fiches` (now a dead
  route) point back to the home page instead.
- Update `index.astro`: remove the "Fiches de référence" summary card in the Consulter section —
  redundant once `/fiches` is gone, since "Les fiches, une par une" already lists all three
  remaining sheets directly below it.
- No change to `plan-de-cours.astro`: checked its "Contenu" bullets against all three lessons
  during exploration, everything still matches.

## Capabilities

### Modified Capabilities
- `printable-references`: drop the "listed in an index" clause from the "independent one-page
  sheets" requirement (site-shell's home-hub requirement already guarantees one-click
  reachability, this was a duplicate rule pointing at a page that no longer exists); narrow the
  "formation's own reference sheets are included" requirement to the three sheets that remain.

## Impact

- Content: `src/src/content/fiches/` — 4 files removed.
- Pages: `src/src/pages/fiches/index.astro` removed; `src/src/pages/index.astro` edited.
- Layout: `src/src/layouts/Fiche.astro` edited (breadcrumb + footer link).
- Specs: `openspec/specs/printable-references/spec.md` — 2 requirements revised.
- No impact on `lecons/*.yaml` — they already contain the canonical content, nothing moves.
