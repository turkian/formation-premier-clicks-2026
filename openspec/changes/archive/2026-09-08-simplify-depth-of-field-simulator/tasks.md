## 1. Aperture scale (`src/src/lib/profondeur-de-champ.ts`)

- [x] 1.1 Add the `CRANS_OUVERTURE_PLEINS` full-stop export (`1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16,
      22`), with a one-line comment noting `CRANS_OUVERTURE` (third-stop) stays for
      `OuvertureDivision.astro` and `CRANS_OUVERTURE_PLEINS` is for `ProfondeurDeChamp` only.
- [x] 1.2 Generalize `cranLePlusOuvert` to take an optional `stops: number[] = CRANS_OUVERTURE`
      parameter instead of closing over `CRANS_OUVERTURE` directly.
- [x] 1.3 Confirm `OuvertureDivision.astro`'s imports and behavior are unaffected (it keeps using
      the default `stops` value — no edits expected there).

## 2. Format control (`src/src/components/interactifs/ProfondeurDeChamp.astro`)

- [x] 2.1 Replace the `.segments` button group with a `<select>` built from the existing `formats`
      list, initialized to the current `format`.
- [x] 2.2 Replace the per-button click/`aria-pressed` wiring in the `<script>` with a single
      `change` listener on the select that updates `etat.format` and calls `rendre()`.
- [x] 2.3 Remove the now-unused `data-format-choix` query and the `aria-pressed` update loop from
      `rendre()`.

## 3. Text simplification

- [x] 3.1 Remove the "un réglage" / "gratuit" badge spans from the four lever labels; leave the
      existing accent border/background/thumb color on the aperture lever as the only
      distinguisher.
- [x] 3.2 Change the fond readout from `` `${fond} m derrière` `` to `` `${fond} m` `` (plain
      removal, as asked — measurement in 3.3 showed a distinguishing prefix doesn't fit alongside
      the full label).
- [x] 3.3 Shorten "Distance du sujet au fond" to "Distance au fond"; re-check levers 1–3's labels
      once the badges are gone and shorten any that still risk wrapping at the sidebar's width.

## 4. Layout stability (`src/src/styles/interactif.css`)

- [x] 4.1 Add a small, narrowly-scoped rule for the new `<select>` (not a `.segments` edit), styled
      against the existing token set (`--trait-fort`, `--accent`, `--fond-3`).
- [x] 4.2 Increase `.levier .refus`'s `min-height` to fit the longest kit-lens refusal string
      ("À {focale} mm, votre zoom de kit ne s'ouvre pas plus que f/{limite}. Ce n'est pas un
      réglage : c'est l'objectif.") at the sidebar's fixed column width, so its appearance/
      disappearance no longer changes the sidebar's total height.
- [x] 4.3 Verify all four lever cards render their labels on one line at both the 60rem breakpoint
      and the short-projector compaction breakpoint (`min-width: 60rem and max-height: 50rem`).
      Confirmed with Playwright at 1600×1000 and at 1024×768 (the compaction breakpoint) — all four
      labels single-line at both sizes, screenshots reviewed.

## 5. Verification

- [x] 5.1 Run the dev server against `lecons/1/profondeur-de-champ` (`explorer-la-zone-nette`, the
      only usage, with `kit: true`): drag every lever and switch every sensor format, confirming
      the sidebar's height and the two-column layout never shift. Automated: every lever driven to
      both extremes and every format selected — measured sidebar height constant (0px variance)
      across all 14 states.
- [x] 5.2 Confirm the kit-lens forbidden zone and refusal message still appear/disappear correctly
      against the new full-stop scale as focal length changes. Confirmed: at 300 mm the forced
      minimum aperture is `f/5.6` (matches `ouvertureMaxKit(300)` clamped to 55 mm → `f/5.6`, which
      exists exactly in the full-stop list) and the refusal message renders without affecting
      sidebar height.
- [x] 5.3 Confirm `OuvertureDivision.astro` ("Le `f/` est une division") is visually and
      behaviorally unchanged. Confirmed: route `lecons/1/ouverture/le-f-est-une-division/` renders,
      no console/page errors, its aperture readout (`f/2.8`) unaffected.
- [x] 5.4 Check the new readout and shortened labels against the project's French-Québec
      typography rules (nbsp before punctuation, decimal comma, `typo()` usage) before merging.
      The fond readout still goes through `typo()` exactly as before (only the string template
      changed, not the typography pipeline); no new punctuation was introduced.

## 6. Follow-up: drop the kit-lens cap on this screen

- [x] 6.1 User feedback after using the shipped component: at the default 50 mm, the kit-lens
      preset (`kit: true` in `content/lecons/1.yaml`'s `explorer-la-zone-nette` entry) capped the
      widest reachable aperture at `f/5.6`, blocking the lower half of the new full-stop scale —
      pre-existing kit-lens behavior, but far more visually obvious now that the scale is coarser.
      Confirmed with the user this specific screen should explore the full `f/1`–`f/22` range
      freely rather than stay kit-constrained. Removed `kit: true` from this screen's props and the
      aparte paragraph explaining the kit cap (no longer accurate once the prop is gone).
      **Note**: this was the only content usage of `profondeur-de-champ` with `kit: true` anywhere
      in the site, so the `interactive-components` spec's kit-lens-preset requirement (the aperture
      control visibly refusing to open past the kit's limit) is no longer demonstrated live on any
      screen, even though the component's `kit` prop still implements it. Flagged to the user;
      not resolved here since re-adding that demonstration elsewhere is a separate content
      decision.
