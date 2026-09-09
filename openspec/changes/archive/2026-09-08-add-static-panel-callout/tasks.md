## 1. Dependencies

- [x] 1.1 Add `astro-icon` and an Iconify collection (e.g. `@iconify-json/lucide`) to
      `src/package.json`; wire `astro-icon` into `astro.config.*` per its integration
      setup.
- [x] 1.2 Confirm the build output embeds the chosen icon as inline `<svg>` (inspect
      `dist/` output), not a separate asset request.

## 2. Schema

- [x] 2.1 In `src/src/content.config.ts`, add `encadre` (`z.string().optional()`),
      `ton` (`z.enum(['neutre', 'reponse', 'regle', 'avertissement']).default('neutre')`),
      and `icone` (`z.string().optional()`) to `ecranPanneau`.

## 3. Rendering

- [x] 3.1 In `src/src/components/ecrans/Panneau.astro`, render `ecran.encadre` (when
      present) as `.encadre[data-ton]`, positioned in `region-corps` immediately after
      the existing `corps` blocks, independent of the `etats`/`ajouts`/`dense` path.
- [x] 3.2 Render `ecran.icone` (when present) inside that box via `<Icon name={...} />`.
- [x] 3.3 In `src/src/styles/lecon.css`, size and align the icon within `.encadre`
      (e.g. inline at the start of the box, matching the box's padding/line-height).

## 4. Content: `avant-chaque-photo`

- [x] 4.1 In `src/src/content/lecons/1.yaml`, trim the `claim` to drop "Toute la
      formation consiste à les traiter une par une."
- [x] 4.2 Move the automatic-mode paragraph out of `corps` into a new `encadre` field
      (`ton: avertissement`, an appropriate `icone`), and drop "ce n'est pas devenir
      technique" from the closing line, appending the closing line to the same
      `encadre` as the payoff.
- [x] 4.3 Follow-up (post-review): move the closing line back out of the `encadre` into
      a new `suite` field on `ecranPanneau` (rendered after the encadre, in
      `Panneau.astro`), so the box holds only the automatic-mode paragraph. Increase
      `.corps li` spacing and give `.encadre` explicit top/bottom margin in `lecon.css`
      for more breathing room between the four questions and around the box.

## 5. Verification

- [x] 5.1 `npm run dev` and view `/lecons/1/accueil/avant-chaque-photo/`: confirm the
      callout renders as a bounded, tone-colored box with the icon, after the four
      questions, with nothing hidden behind an advance.
- [x] 5.2 `npm run build && npm run copie-locale`, then open the local copy's
      `avant-chaque-photo` page from `file://`: confirm the icon still renders (no
      broken/missing icon, no network request).
- [x] 5.3 `npm run verifier:hors-ligne`: confirm it still passes with the new dependency
      and markup in place.
