## Why

The `ou-le-point-a-ete-fait` écran (leçon 1, bloc `mise-au-point`, slide 12) carries a
three-sentence caption wedged between its 3-image series and the fourth, standalone
`l1-hors-focus` image: the single variable that changes, the settings held constant across
the three images, and a framing note ("le premier exercice de diagnostic… il reviendra à
chaque séance"). The constants sentence duplicates what each image's own specification
already states (`· 85 mm · f/2.8`), and the framing note speaks to the teaching structure
rather than to what the room is looking at. Positioned where it is today, the caption also
reads as belonging only to the 3-image row above it, when the point it makes — where the
autofocus point landed — is exactly what the fourth image demonstrates too.

## What Changes

- On `ou-le-point-a-ete-fait`: drop the serie's `constantes` and `legende` fields, keeping
  only `variable: l'endroit où le point a été fait` (this still drives the caption's bolded
  clause when a serie renders one).
- Add an écran-level `aparte: Seule chose qui change : l'endroit où le point a été fait.` —
  this genre already supports an optional `aparte`, rendered after both image rows, so the
  note now sits below all 4 photographs instead of between the two rows.
- The serie's bolded "Seule chose qui change" clause in `Demonstration.astro` renders
  unconditionally from `variable`, independent of `constantes`/`legende` — dropping those
  two fields alone would leave the figcaption rendering the same sentence a second time
  instead of vacating its spot. Wrap the whole figcaption in a
  `{(serie.constantes || serie.legende) && (...)}` guard so it only renders when a serie
  still has something to say there. Every other demonstration series across the three
  lessons sets both fields, so this is a no-op everywhere except this screen (verified by
  walking every `series` entry in `1.yaml`/`2.yaml`/`3.yaml`).
- Net effect: the figcaption between the rows disappears; the trimmed sentence reappears
  once, below everything. Both the removed caption and the new `aparte` render at the same
  typographic tier (`.legende-serie`, `var(--t-aparte)`) — this is a repositioning and a
  trim, not a demotion in size. It does lose the orange accent color the bolded clause has
  today, since that color rule targets the caption's raw `<b>` markup and `aparte` renders
  through Markdown (`<strong>`), which isn't covered by that rule.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — the `demo-media` spec's "constant settings shared by both images are stated"
requirement is still met: each image's own `specification` field already states
`85 mm`/`f/2.8` individually. This screen stops restating it a second time in the series
caption; no requirement text changes.)

## Impact

- `src/src/content/lecons/1.yaml`: on the `ou-le-point-a-ete-fait` écran, remove the
  serie's `constantes` and `legende` fields, and add an écran-level `aparte` field with the
  trimmed sentence.
- `src/src/components/ecrans/Demonstration.astro`: wrap the serie figcaption in a
  `constantes || legende` guard so an empty caption doesn't render (and duplicate the
  bolded clause the new `aparte` now carries). No visual change for any other
  demonstration screen.
