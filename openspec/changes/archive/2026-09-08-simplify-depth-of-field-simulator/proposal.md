## Why

The depth-of-field simulator (`ProfondeurDeChamp.astro`) works, but its sidebar carries more text
and controls than the projection-legibility constraints of this project call for, and part of its
layout is unstable: the sensor-format buttons wrap onto three uneven rows at the sidebar's fixed
width, and lever labels/readouts shift height depending on their content. Both problems show up on
the exact screen (`explorer-la-zone-nette`, lesson 1) that a room is looking at live.

## What Changes

- Remove the "un réglage" / "gratuit" text badges from the four lever labels. The aperture lever
  keeps its existing accent border/background/thumb color as the sole visual distinguisher from the
  three free levers — the block's claim heading ("Quatre leviers. Un seul est un réglage.") already
  states the distinction in prose.
- Drop "derrière" from the subject-to-background readout ("`3 m derrière`" → "`3 m`"), as asked.
  It now reads the same as the focus-distance readout when both happen to be `3 m`, but the two
  levers aren't adjacent (the focal-length lever sits between them), and each value still sits next
  to its own label — implementation surfaced that the alternative considered during design (a `+`
  prefix to keep them visually distinct) doesn't fit the sidebar's fixed width once combined with
  the full "Distance au fond" label, so it was dropped in favor of the plain removal actually
  requested. See design.md.
- Replace the five sensor-format buttons (`Plein format`, `APS-C`, `4/3`, `1 pouce`, `Cellulaire`)
  with a single `<select>`. This is the first `<select>` in the component library — trading the
  buttons' at-a-glance side-by-side comparison for a control that cannot wrap regardless of format
  count or label length.
- Shorten lever labels that currently wrap at the sidebar's fixed width — "Distance du sujet au
  fond" → "Distance au fond" and "Votre distance au sujet" → "Distance au sujet" — so every lever
  card renders its label on one line and all four cards keep a consistent height as values change.
- Reserve fixed height for the kit-lens refusal message (`data-refus`) so its appearance and
  disappearance while dragging the aperture/focal-length levers no longer changes the sidebar's
  total height.
- Replace the 21-value third-stop aperture scale (`1.4 … 22`) with the classic full-stop scale
  `f/1, f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16, f/22`, keeping `f/5.6` as the default, now
  centered in the scale instead of sitting near its low end.
- Drop the kit-lens preset (`kit: true`) from this screen's content entry (and the aparte paragraph
  explaining it). With the coarser full-stop scale, the kit cap made roughly half the slider
  unreachable at the default 50 mm — a pre-existing constraint made much more visually obvious by
  the switch to full stops. This screen should let the room explore the full `f/1`–`f/22` range
  freely instead. **Note**: this was the only content usage of the component with `kit: true`, so
  the `interactive-components` spec's kit-lens-preset requirement is no longer demonstrated live
  anywhere, though the component's `kit` prop still implements it in full. Flagged, not resolved
  here.

None of these are **BREAKING**: the component's props (`format`, `distance`, `focale`, `ouverture`,
`fond`, `kit`) are unchanged in name and type; only the aperture step values and the on-screen text
change.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ The `interactive-components` spec requires the three free levers to be "visually
distinguished" from the aperture lever (satisfied by color alone, no requirement mandates text) and
does not pin down the sensor-format control's widget type or the aperture scale's exact step values
— both stay implementation details after this change, not spec-level requirements.

## Impact

- `src/src/components/interactifs/ProfondeurDeChamp.astro` — markup (badges, format control,
  labels, readout strings) and its inline script (state/index handling for the new aperture scale,
  format `<select>` wiring).
- `src/src/lib/profondeur-de-champ.ts` — adds a new 10-value full-stop list alongside the existing
  `CRANS_OUVERTURE` (kept as-is: it's also used by `OuvertureDivision.astro`, out of scope here);
  `cranLePlusOuvert` (kit-lens forbidden-zone math) is generalized to accept which stop list to
  snap against. See design.md for why.
- `src/src/styles/interactif.css` — `.segments` (format buttons) styling is replaced or repurposed
  for the `<select>`; `.levier .refus` gets a fixed reserved height; label sizing/wrapping rules for
  `.levier .etiquette`.
- `src/src/content/lecons/1.yaml` — the `explorer-la-zone-nette` entry drops `kit: true` and its
  now-inaccurate kit-lens aparte paragraph. No other lesson content or component references
  `profondeur-de-champ`'s aperture scale or format control, so the blast radius is this one
  component and its one content usage.
