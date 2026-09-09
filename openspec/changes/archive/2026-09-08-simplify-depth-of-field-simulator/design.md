## Context

See proposal.md - Why. Two implementation facts shape the approach below:

- `CRANS_OUVERTURE`, the current 21-value third-stop aperture list in
  `src/src/lib/profondeur-de-champ.ts`, is also imported by `OuvertureDivision.astro` (the "f/ is a
  division" demo) for its own slider and for two hardcoded presets
  (`CRANS_OUVERTURE.indexOf(2.8)`, `.indexOf(5.6)`). It cannot be replaced in place without changing
  that unrelated component's behavior, which proposal.md scoped out.
- `.segments` / `.segments button`, the pill-button CSS this change stops using for the format
  control, is shared by four other interactive components (`MoletteDesModes`, `VitesseEtMouvement`,
  `ArbreDeDiagnostic`, `OuvertureDivision`) for their own segmented controls.

## Goals / Non-Goals

**Goals:**
- Ship the four changes from proposal.md without changing any other interactive component's
  markup, styles, or behavior.
- Keep `profondeur-de-champ.ts`'s existing exports source-compatible for `OuvertureDivision.astro`.

**Non-Goals:**
- Restyle or consolidate `.segments` across the four other components still using it.
- Establish a general-purpose `<select>` style for the design system beyond this one control.
- Change the kit-lens interpolation math (`ouvertureMaxKit`) — only which list its result is
  snapped against.

## Decisions

**1. Add a second stop list instead of touching `CRANS_OUVERTURE`.**
New export `CRANS_OUVERTURE_PLEINS = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22]` in
`profondeur-de-champ.ts`. `CRANS_OUVERTURE` (third-stop, 21 values) stays untouched, so
`OuvertureDivision.astro` keeps its current granularity and its two hardcoded presets keep
resolving — both `2.8` and `5.6` exist in both lists, but nothing about that component changes
because it keeps importing the old constant.

`cranLePlusOuvert(limite)`, used by the kit-lens forbidden-zone logic, currently searches
`CRANS_OUVERTURE` by closure. Give it a second parameter, `stops: number[] = CRANS_OUVERTURE`, so
`ProfondeurDeChamp` can call `cranLePlusOuvert(ouvertureMaxKit(focale), CRANS_OUVERTURE_PLEINS)`
and get a limit that actually exists in its own slider's list. Without this, the kit constraint on
`explorer-la-zone-nette` (the only screen using `kit: true`) would compute a limit such as `f/3.7`
that doesn't exist in the full-stop list, and the subsequent `.indexOf()` would silently return
`-1`.

*Alternative considered*: duplicate `cranLePlusOuvert`/`ouvertureMaxKit` locally inside
`ProfondeurDeChamp`'s script instead of touching the shared lib. Rejected — it would be the same
function re-scoped for no reason, and the shared lib is exactly where this domain model already
lives.

**2. Format control: a new, narrowly-scoped `<select>` style, not a repurposed `.segments`.**
Add a small new rule (scoped to this component's format control) rather than editing `.segments`,
since the four other components depend on the pill-button look for controls that are a genuinely
different shape (mode dial, diagnostic tree, prepared comparisons) and shouldn't inherit whatever
styling the format `<select>` ends up needing.

Native `<select>`, not a custom listbox: matches the "operable without looking, large touch
targets" brief already stated in `interactif.css`'s own header comment, with no extra
keyboard/focus-management code to write or test. Native selects can't be fully skinned
(chevron, open popup) — accepted as a minor visual cost for the reliability this component already
prioritizes everywhere else. The five `<option>`s come from the existing `FORMATS`/`formats` list
already built in the component's frontmatter — no new data source.

**3. Label shortening is text-only, not a column-width change — and settles the readout wording too.**
"Distance du sujet au fond" → "Distance au fond" and "Votre distance au sujet" → "Distance au
sujet". The sidebar's fixed column width (`.composant`'s `grid-template-columns`) is left alone —
narrowing text to fit the existing column keeps the SVG scene column exactly as wide as today,
since that drawing is where the actual teaching content lives.

Measured against the live component: each lever's label and value share one flex row that's 280px
wide with `justify-content: space-between`; the value doesn't shrink, so the label gets whatever's
left. "Distance au fond" fits that leftover space in one line — but only when the value reads plain
`3 m`. Pairing the same label with a `+3 m` value (an earlier idea, meant to keep this readout
visually distinct from lever 2's once "derrière" was dropped) pushes the row 11px past the point
where the label starts wrapping instead. That measurement is what settled it: drop "derrière"
outright with no replacement, exactly as proposal.md asked, rather than add a marker. The two
readouts can coincide on `3 m`, but the levers aren't adjacent (the focal-length lever sits between
them) and each value still sits right next to its own label.

*Alternative considered*: widen the sidebar column. Rejected — it would shrink the scene, which is
the part of the block doing the explaining; the labels are the part that can afford to be terser.

**4. Reserve the refusal message's height with CSS, not by always rendering text.**
`.levier .refus` already has `min-height: 1.3em`, tuned for a one-line message. Measure the longest
string this component can actually produce — "À {focale} mm, votre zoom de kit ne s'ouvre pas plus
que f/{limite}. Ce n'est pas un réglage : c'est l'objectif." — at the sidebar's fixed width, and set
`min-height` to fit that at however many lines it wraps to, so the sidebar's total height stops
depending on whether the message is empty or shown.

*Alternative considered*: keep the paragraph always rendered at fixed height and toggle
`visibility: hidden` when empty. Equivalent outcome; the simpler `min-height` bump is enough since
the element is already always in the DOM and already `aria-live="polite"`.

## Risks / Trade-offs

- Full stops are a coarser aperture control than before — an animator who previously nudged
  between f/5 and f/5.6 can no longer do that on this screen → Accepted per proposal.md's
  simplification intent; the third-stop list remains in the module for any component that needs
  it.
- Native `<select>` can't fully match the accent-colored pill look used for every other control in
  this component → Style what's controllable (border, background, focus ring) to the existing
  token set (`--trait-fort`, `--accent`); accept the native chevron/popup as-is.
- Shortened labels ("Distance au fond") drop the word "sujet" — a participant skimming could
  momentarily read it as background-to-camera rather than subject-to-background distance → The SVG
  scene beside it already labels "sujet" and "fond" directly on the drawing, so the full phrase
  isn't the only place the distinction is made.
- `CRANS_OUVERTURE_PLEINS` and `CRANS_OUVERTURE` living side by side in the same module is an easy
  place for a future edit to assume there's only one stop list and touch the wrong one → Named
  distinctly (`_PLEINS` = full stops) and documented inline with a one-line comment pointing at
  which components use which list.
