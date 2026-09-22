## Why

On slide 30 of séance 1 (`explorer-la-zone-nette`), the depth-of-field simulator's focal-length
lever tops out at 300 mm and its subject-distance lever tops out at 50 m — both narrower than the
range of gear and scenes the club actually shoots (super-telephoto wildlife/sports lenses past
300 mm, and landscape or distant-subject shots well past 50 m). Widening both levers lets the
simulator cover that range without changing anything about how it explains depth of field.

## What Changes

- Extend the `FOCALES` step list (currently 18–300 mm) down to 9 mm and up to 600 mm.
- Extend the `DISTANCES` step list (currently 0.3–50 m) up to 300 m; the 0.3 m floor is unchanged.
- Rescale the top-down scene drawing's log axis (currently `MIN=0.2, MAX=80`) and its graduation
  marks so the new far end of the distance range stays on-screen and legible.
- No constraint is added between focal length and subject distance: combinations no real lens can
  physically focus at (e.g. 600 mm at 0.3 m) remain selectable and are computed like any other
  point, consistent with the component's existing "nothing hidden or faked" design.
- Default values (`format: aps-c`, `distance: 3`, `focale: 50`, `ouverture: 5.6`, `fond: 3`) are
  unchanged — they already land on a common, textbook combination.

## Capabilities

No spec-level behavior changes. The existing `interactive-components` requirements describe the
depth-of-field component's behavior (four levers, band thresholds, kit-preset constraint, format
support) without pinning down the numeric range of any lever — that range is an implementation
constant, not a documented requirement. This change only widens those constants and their visual
scale; it does not add, remove, or alter a requirement. See `.openspec.yaml` (`skip_specs: true`).

## Impact

- `src/src/lib/profondeur-de-champ.ts` is unaffected — the depth-of-field formula is generic over
  focal length and distance; no code change needed there.
- `src/src/components/interactifs/ProfondeurDeChamp.astro`: the `FOCALES` and `DISTANCES` arrays,
  the scene drawing's `MIN`/`MAX` constants, and its graduation marks.
- `src/src/content/lecons/1.yaml` (`ouverture-et-profondeur-de-champ` bloc, `explorer-la-zone-nette`
  écran / slide 30): no change — its props already select values inside the widened ranges.
