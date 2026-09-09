## 1. Lesson 2 — add the new demonstration screen

- [x] 1.1 In `src/src/content/lecons/2.yaml`, block `vitesse`, add a new screen `deux-flous-en-images`
      (`genre: demonstration`) immediately after `deux-flous` and before `explorer-le-mouvement`,
      per design.md's screen identity.
- [x] 1.2 Move `l1-bouge` into that screen's `images:` list, unchanged (`specification`, `valeur`,
      `priorite: essentiel`).
- [x] 1.3 Add the new `l2-sujet-bouge` slot to the same `images:` list, per design.md's
      specification/valeur/priorite.

## 2. Lesson 1 — trim the focus-diagnostic screen

- [x] 2.1 In `src/src/content/lecons/1.yaml`, screen `ou-le-point-a-ete-fait`, remove the
      `l1-bouge` entry from the loose `images:` list, leaving only `l1-hors-focus`.
- [x] 2.2 Delete the now-obsolete comment above `images:` explaining why `l1-hors-focus` and
      `l1-bouge` couldn't be declared as a series (it no longer applies to a single remaining
      image).

## 3. Verify

- [x] 3.1 Run the project's content build/validation (e.g. `check-screens.mjs` and the site build)
      and confirm no broken references, orphaned ids, or series-validation failures.
- [x] 3.2 Visually check both screens in the running site: `ou-le-point-a-ete-fait` shows the
      3-image series plus `l1-hors-focus` only; `deux-flous-en-images` shows `l1-bouge` and
      `l2-sujet-bouge` immediately after the `deux-flous` table.
