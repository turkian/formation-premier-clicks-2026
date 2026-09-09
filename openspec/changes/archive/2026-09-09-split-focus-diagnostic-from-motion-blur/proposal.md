## Why

Lesson 1's screen `ou-le-point-a-ete-fait` (block `mise-au-point`) currently mixes two unrelated
diagnostics under one claim about *where the autofocus point landed*: a clean 3-image series doing
exactly that, plus two bolted-on images (`l1-hors-focus`, `l1-bouge`) that were never declared as
part of that series because they vary more than one thing at once — a comment in the YAML already
flags this. `l1-bouge` in particular is a shutter-speed / camera-shake example, and lesson 1 has no
block about shutter speed at all; that topic (« Le mouvement et la vitesse ») is lesson 2's, and its
`deux-flous` panel already teaches the exact distinction `l1-bouge` illustrates — but that panel has
no photographs today, because `demo-media/spec.md` already requires demonstration photographs to
live on their own screen, never inside a concept panel.

`demo-media/spec.md` also already names two *separate* essential demonstrations in this territory —
« the out-of-focus versus camera-shake pair » and « the subject-blur versus camera-shake pair » —
but only the first is actually declared in content today, and even that one is entangled with the
focus-location series it doesn't belong to. This change untangles both.

## What Changes

- Lesson 1, screen `ou-le-point-a-ete-fait`: remove `l1-bouge` and its accompanying "can't be
  declared as a series" comment. Keep the 3-image focus-location series and keep `l1-hors-focus` as
  a fourth example on that same screen — a focus miss is still a focus diagnostic, just an extreme
  one, unlike camera shake.
- Lesson 2, block `vitesse`: add a new demonstration screen immediately after `deux-flous` (and
  before `explorer-le-mouvement`) carrying two images: `l1-bouge`, reused as-is for the "toute
  l'image floue" row, and a new demonstration slot for "subject-blur" (the subject moved, the décor
  stayed sharp — caused by motion, not a focus error) for the "seul le sujet est flou" row. This
  closes the pre-existing gap where `demo-media/spec.md` already called the subject-blur pairing
  essential but no content declared it.
- No spec-level behavior changes: this reorganizes which screen shows which already-permitted kind
  of content, and fulfills a demonstration that `demo-media/spec.md` already requires — it doesn't
  change what any requirement says. `skip_specs: true` is set accordingly.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
(none — see "No spec-level behavior changes" above)

## Impact

- `src/src/content/lecons/1.yaml`: trim `ou-le-point-a-ete-fait`'s loose `images:` list from two
  entries to one (`l1-hors-focus`); delete the now-obsolete comment explaining why the pair
  couldn't be a series.
- `src/src/content/lecons/2.yaml`: add one new `genre: demonstration` screen in the `vitesse` block,
  between `deux-flous` and `explorer-le-mouvement`, with two `emplacementDemo` entries.
- No component or schema changes; no changes to `public/demos/` beyond what the shot list already
  expects (one new slot to shoot, plus the existing `l1-bouge` slot now serving two contexts).
