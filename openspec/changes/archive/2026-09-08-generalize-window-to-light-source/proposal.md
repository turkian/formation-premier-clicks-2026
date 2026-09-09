## Why

On the "La lumière, en images" demonstration screen (`la-lumiere-en-images`, séance 1),
the direction-of-light series names the setup "fenêtre" (window) in its legend and in
every photo specification. The images are still unshot placeholders, and the concept
being taught — that direction relative to *any* light source changes the look of a
subject — is broader than one specific fixture. Naming the setup "window" commits
whoever shoots these photos to using a window, when a controllable lamp is an equally
valid setup already anticipated in `docs/Session 1/avant-la-seance.md`. Using the
generic term "source lumineuse" (light source) keeps the copy accurate regardless of
which fixture ends up being used.

This is scoped to that one screen only. The `direction-lumiere` diagram on the
preceding screen keeps "fenêtre" — it was deliberately redrawn as a concrete window in
the just-completed `clarify-lighting-direction-diagram` change, and that decision
stands. The quality-of-light series on the same screen already frames its example
generically ("une petite source, puis une grande") and mentions "fenêtre" only as one
concrete example of a large source, alongside "ciel couvert" — that occurrence also
stays as-is.

## What Changes

- In `src/src/content/lecons/1.yaml`, screen `la-lumiere-en-images`, series
  "la direction de la lumière": replace the four occurrences of "fenêtre" in the
  `legende` and `specification` fields with generic "source lumineuse" phrasing.
- No change to the `valeur`, `id`, or `reglages` fields of those images — none of them
  mention "fenêtre".
- No change to the `direction-lumiere` diagram, its aria-label, or its `SourceLumiere`
  component label — those stay "fenêtre" by design.
- No change to the quality-of-light series' example mention of "fenêtre" at
  `l1-qualite-douce`.
- No change outside séance 1 — the exposure-compensation screen in `2.yaml` and the
  Session 2 animator docs describe a different concept (backlight metering) and keep
  "fenêtre".

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None — this is a wording change to screen copy, not a change to any documented
requirement or observable behavior._

## Impact

- `src/src/content/lecons/1.yaml` — four string edits, one screen, one series.
