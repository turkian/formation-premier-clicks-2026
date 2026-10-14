## Why

Some comparisons rest on a fine-grained detail that the projected slide cannot show. On
`nette-ou-propre`, three 2048 px photographs share one row, so each is drawn about 580 px wide on
a 1080p projector — every screen pixel averages roughly 3.5 × 3.5 source pixels, which smooths
away the very noise the slide exists to prove. The grain and the colour blotches are present in
the files at 1:1; they are lost only in the display. The existing click-to-enlarge shows one
photograph at a time, so the room can no longer compare the three side by side at the moment the
difference becomes visible.

## What Changes

- Add an optional `loupe` declaration on a comparison series, carrying a per-series
  magnification (`loupe: { zoom: 4 }`). Absent, the series behaves exactly as today.
- On a series that declares it, holding **Shift** while the pointer is over one of its
  photographs shows a magnifying loupe at that point on **every** photograph of the series at
  once, all centred on the same point of the scene. Releasing Shift or leaving the photograph
  removes the loupes.
- A permanent hint under such a series tells the presenter how to call the loupe
  (« Maintenir Maj pour agrandir un détail »).
- Desktop only: the loupe and its hint exist only on a device with a fine pointer that can hover;
  on phones and tablets, and on paper, the series renders as today and click-to-enlarge remains
  the way to see detail.
- Click-to-enlarge, the resting crop (`cadrage`) and the on-hover label keep their current
  behaviour.
- Enable the loupe on two lesson 2 series: `nette-ou-propre` (noise) and `trois-vitesses`
  (sharp scenery vs moving cars). `deux-flous-en-images` and `le-flou-choisi` are deliberately
  left out — the first is not a series, the second compares three different scenes.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `demo-media`: adds an opt-in, per-series linked loupe called by holding Shift, with its on-screen
  hint, limited to hover-capable fine-pointer devices.

## Impact

- `src/src/content.config.ts` — `serieComparative` gains an optional `loupe: { zoom }` field.
- `src/src/components/ecrans/Demonstration.astro` — marks a series that declares a loupe, renders
  the hint, and passes the magnification down.
- `src/src/components/EmplacementDemo.astro` — loupe element per photograph and the client script
  that maps the pointer to image coordinates and drives every loupe of the series.
- `src/src/content/lecons/2.yaml` — `loupe` added to `nette-ou-propre` and `trois-vitesses`.
- No change to `src/src/lib/demos.ts`, the shot list, the missing-photograph placeholder, the
  keyboard navigation in `Ecran.astro` (Shift is not bound there), or any fiche.
