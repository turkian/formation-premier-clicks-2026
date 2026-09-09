## 1. Component

- [x] 1.1 In `src/src/components/ecrans/Repere.astro`, read `ecran.termes` (an optional
      two-element array of plain strings — no markdown rendering needed, they're bare
      labels) and render it as a `<div class="termes">` with one child per term, placed
      after the existing `corps` block.
- [x] 1.2 Leave the `claim`, `corps`, and `aparte` rendering untouched for every screen
      that doesn't set `termes`.
- [x] 1.3 In `src/src/content.config.ts`, add `termes: z.tuple([z.string(), z.string()]).optional()`
      to `ecranRepere`. Not anticipated in `design.md` — the content collection has a Zod
      schema (missed during design) that silently strips unknown YAML keys, so without this
      the field never reaches the component. The tuple type also enforces "exactly two" at
      build time, which `design.md`'s Risks section had flagged as unenforced.

## 2. Styles

- [x] 2.1 In `src/src/styles/lecon.css`, add a `.termes` rule near the existing
      `.repere[data-variante="activite"] .corps ol` block: `grid-template-columns: 1fr 1fr`,
      matching the numbered-circle visual language already used there (per `design.md`).
- [x] 2.2 Inside the `@media (max-width: 44rem)` block, collapse `.termes` to a single
      column, consistent with the other two-column-to-one-column rules in that block.
- [x] 2.3 Check both terms stay fully visible and legible at the 4:3 (1024×768) projection
      floor — no truncation, no overflow.

## 3. Content

- [x] 3.1 In `src/src/content/lecons/1.yaml`, on the `mise-au-point` bloc's `ouverture`
      screen: remove the "Deux mots se ressemblent... on règle le premier maintenant, le
      second au bloc suivant" sentence from `corps`.
- [x] 3.2 Add `termes: ["La mise au point", "La profondeur de champ"]` (or equivalent
      phrasing) to that same screen, with no definition or timing text attached to either
      term.
- [x] 3.3 Re-read the screen's `claim` ("Où est le point net ?") and remaining `corps` text
      together with the new terms to confirm the screen reads as a coherent prompt, not a
      fragment.

## 4. Verification

- [x] 4.1 Run `npm run verifier:contenu` (content rules, including the `soir` and
      room-facing-text checks).
- [x] 4.2 Run `npm run verifier:projection` and `npm run verifier:telephone` to confirm the
      screen renders correctly at both the projection and phone breakpoints.
- [x] 4.3 Run `npm run build` to confirm the site builds clean.
- [x] 4.4 View the screen in the dev server at both a projector-width and a phone-width
      viewport, and confirm the two terms are legible side by side and the removed sentence
      is gone.
