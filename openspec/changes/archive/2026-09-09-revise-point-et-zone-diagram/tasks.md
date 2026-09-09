## 1. Shared piece

- [x] 1.1 Create `src/src/components/schemas/pieces/Vous.astro`, taking `x: number` and
      `y: number` props, rendering the rect + « vous » label `ZoneNette.astro` already
      draws inline (`<g transform="translate(x,y)"><rect x="-14" y="-22" width="28"
      height="18" rx="3" .../><text .../></g>`) — same markup, now parameterized.
- [x] 1.2 In `ZoneNette.astro`, replace the inline `<g transform="translate(60,168)">…</g>`
      with `<Vous x={60} y={168} />` and import it from `./pieces/Vous.astro`. Output
      should be pixel-identical to before.

## 2. `point-et-zone` diagram

- [x] 2.1 In `PointEtZone.astro`, change the `viewBox` from `0 0 640 250` to a narrower,
      taller box (per `design.md`, roughly `320×480` — adjust to fit real text metrics)
      and stack the two panels (mise au point / profondeur de champ) vertically instead of
      side by side, each keeping its existing internal geometry (ground line, gradient
      sharp-zone rect(s), point marker(s), caption text) shifted into its own vertical
      band. **Revised after 3.2's first real measurement**: an initial `300×500` attempt
      (ratio 1.67) overflowed badly (see 3.2's notes) — real available ratio is ≤~0.88 at
      the tightest breakpoint (1280×720). Landed on a compact `300×236` (ratio 0.79,
      margin under the ceiling): smaller type (12/10 instead of 15/13), tighter rect/line
      spacing, and the panel-A arrow annotation dropped (the solid/dashed marker pair plus
      the caption text already say "the point moves," per user direction to keep stacking
      and compact instead of reverting to side-by-side).
- [x] 2.2 Add a `<Vous x={…} y={…} />` marker at the near (left) end of each panel's
      ground line, imported from `./pieces/Vous.astro`.
- [x] 2.3 Rotate the divider between the two panels from a vertical line to a horizontal
      one.
- [x] 2.4 Update the `aria-label` on the `<svg>` and the component's top doc comment —
      both currently describe a left/right arrangement ("à gauche… à droite…") and need to
      describe top/bottom instead.

## 3. Verification

- [x] 3.1 Run `npm run verifier:contenu`.
- [x] 3.2 Run `npm run verifier:projection` and `npm run verifier:telephone`. If the new
      `point-et-zone` viewBox overflows at the 4:3/1024×768 projection floor, reduce the
      target height (per `design.md`'s Risks section) until both pass clean.
      **First pass was against a stale `dist/`** (ran before task 3.3's build) and falsely
      read as clean. Re-run after building found real overflow at the initial `300×500`
      attempt: `point-ou-zone` cropped 199px at 1024×768 and 442px at 1280×720. Also
      discovered a second call site sharing the same overflow: `lecons/3 →
      lire-une-image/definir-une-intention` (not mentioned in the original
      `design.md`/`proposal.md` — `point-et-zone` is reused there as a callback panel).
      Measured the real available ratio via Playwright (budget ÷ column width) at both
      breakpoints — worst case ~0.88 at 1280×720 — and rebuilt the diagram compact (see
      2.1) to fit under it with margin. Both verifiers now pass clean on both call sites;
      the only remaining projection failures are the pre-existing, unrelated
      `/lecons/3/et-maintenant/la-suite/` (confirmed via `git stash` against `main`,
      unrelated to this change).
- [x] 3.3 Run `npm run build` to confirm the site builds clean.
- [x] 3.4 View the `point-ou-zone` screen (leçon 1) in the dev server at a projector-width
      viewport: confirm both panels are stacked, each shows a `vous` marker anchoring its
      ground line, and nothing overflows. Confirmed via Playwright screenshot at both
      1024×768 and 1280×720 — both panels fully visible with room to spare, `vous` marker
      anchors both ground lines.
- [x] 3.5 View the `la-definition` and `ce-qui-change-l-epaisseur` screens (leçon 1,
      `zone-nette` usages) in the dev server: confirm they render identically to before the
      `Vous` extraction — no visual regression from the shared-piece refactor. Confirmed:
      the `zone-nette` diagram itself (with its `vous` marker) is pixel-identical to before
      on both screens (verified `la-definition` byte-for-byte via `git stash` against
      `main`). Both screens also show a pre-existing corps/aparte text overlap at the
      bottom — confirmed present on `main` before this change too, unrelated to the
      `Vous` refactor, out of scope here.
- [x] 3.6 View the `definir-une-intention` screen (leçon 3, `lire-une-image` bloc) — the
      second `point-et-zone` call site found during 3.2 — in the dev server: confirm the
      compact stacked diagram renders correctly there too, not just on `point-ou-zone`.
      Confirmed via screenshot: both panels render cleanly, both `vous` markers visible, no
      overflow, no overlap.
