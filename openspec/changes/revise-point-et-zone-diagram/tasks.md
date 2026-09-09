## 1. Shared piece

- [ ] 1.1 Create `src/src/components/schemas/pieces/Vous.astro`, taking `x: number` and
      `y: number` props, rendering the rect + « vous » label `ZoneNette.astro` already
      draws inline (`<g transform="translate(x,y)"><rect x="-14" y="-22" width="28"
      height="18" rx="3" .../><text .../></g>`) — same markup, now parameterized.
- [ ] 1.2 In `ZoneNette.astro`, replace the inline `<g transform="translate(60,168)">…</g>`
      with `<Vous x={60} y={168} />` and import it from `./pieces/Vous.astro`. Output
      should be pixel-identical to before.

## 2. `point-et-zone` diagram

- [ ] 2.1 In `PointEtZone.astro`, change the `viewBox` from `0 0 640 250` to a narrower,
      taller box (per `design.md`, roughly `320×480` — adjust to fit real text metrics)
      and stack the two panels (mise au point / profondeur de champ) vertically instead of
      side by side, each keeping its existing internal geometry (ground line, gradient
      sharp-zone rect(s), point marker(s), caption text) shifted into its own vertical
      band.
- [ ] 2.2 Add a `<Vous x={…} y={…} />` marker at the near (left) end of each panel's
      ground line, imported from `./pieces/Vous.astro`.
- [ ] 2.3 Rotate the divider between the two panels from a vertical line to a horizontal
      one.
- [ ] 2.4 Update the `aria-label` on the `<svg>` and the component's top doc comment —
      both currently describe a left/right arrangement ("à gauche… à droite…") and need to
      describe top/bottom instead.

## 3. Verification

- [ ] 3.1 Run `npm run verifier:contenu`.
- [ ] 3.2 Run `npm run verifier:projection` and `npm run verifier:telephone`. If the new
      `point-et-zone` viewBox overflows at the 4:3/1024×768 projection floor, reduce the
      target height (per `design.md`'s Risks section) until both pass clean.
- [ ] 3.3 Run `npm run build` to confirm the site builds clean.
- [ ] 3.4 View the `point-ou-zone` screen (leçon 1) in the dev server at a projector-width
      viewport: confirm both panels are stacked, each shows a `vous` marker anchoring its
      ground line, and nothing overflows.
- [ ] 3.5 View the `la-definition` and `ce-qui-change-l-epaisseur` screens (leçon 1,
      `zone-nette` usages) in the dev server: confirm they render identically to before the
      `Vous` extraction — no visual regression from the shared-piece refactor.
