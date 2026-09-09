## Why

The project's own projection-legibility rule (`openspec/config.yaml`) states: "rien de nécessaire
pour suivre le bloc ne peut reposer sur le plus petit palier" — nothing needed to follow the
block can rest on the smallest typographic tier. The `configurez-maintenant` écran (slide 30)
breaks that rule: its fourth geste tells the room to find the exposure-compensation dial by
touch, but the actual operating rule for that dial — "si votre photo est trop sombre, tournez
vers le `+`. Trop claire, vers le `−`." — sits in the `aparte` field, the smallest tier, alongside
an unrelated pointer to the handout's vocabulary sections. The screen's own text even flags this
rule as load-bearing ("une seule consigne pour l'instant, sans théorie… C'est tout, et ça
marche."), which is precisely the kind of claim `add-static-panel-callout` established shouldn't
be left resting on plain aside text.

## What Changes

- Fold the exposure-compensation rule ("si votre photo est trop sombre, tournez vers le `+`…")
  directly into the fourth `geste` of `configurez-maintenant`, where the dial is introduced —
  `ecranAppareil.gestes` is already a plain string array, so no schema change is needed.
- Keep the handout pointer ("les mots changent d'une marque à l'autre — sections 1 et 4") as the
  écran's `aparte`, now carrying one job instead of two.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — content moves within existing fields, no requirement changes)

## Impact

- `src/src/content/lecons/1.yaml`: rewrite the fourth `geste` and the `aparte` of the
  `configurez-maintenant` écran (bloc `repartir`).
