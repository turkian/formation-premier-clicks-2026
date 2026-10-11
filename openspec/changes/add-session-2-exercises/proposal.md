## Why

Session 1 has a browsable practice-exercise page (`/exercices/1`); session 2 does not. Its new
concepts — shutter speed, the two kinds of blur, ISO and noise, `M` with ISO auto, and exposure
compensation — have nowhere for a participant to practise them alone, weeks later, on a phone.
The lesson's own hands-on screens are written for the room (« votre voisin », a dimmed hall) and
do not transfer to someone at home.

## What Changes

- Add `src/src/content/exercices/2.yaml`, titled « L'exposition », with enough self-directed
  exercises to cover every concept session 2 introduces (eleven, in the draft coverage map in
  `design.md`) — not a count matched to session 1's six.
- Each exercise is doable alone, with household or street subjects, and is phrased for a camera
  or a phone; a `cellulaire` note appears wherever a phone lacks the control (nearly all of
  them, except the two exposure-compensation exercises).
- Exercises may point to the brand sheet of the lexique by section number (section 1 for modes,
  section 3 for ISO auto and `+/−`).
- The page and its hub card are published as soon as the file exists, even though leçon 2 is
  still `pret: false`: the exercises stand on their own, as `practice-exercises` already
  requires, and are not gated.
- No change to `exercices/1.yaml`, to the `exercices` schema, to the exercise page, or to any
  lesson.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — `practice-exercises` already requires one exercise page per session and that adding one
session's set touches no other. This is a content-only change; `skip_specs: true` is set in this
change's `.openspec.yaml`.)

## Impact

- New file: `src/src/content/exercices/2.yaml`.
- `/exercices/2` is generated, and a second card appears in the hub's « Exercices » section,
  through the existing collection — no code change.
- `scripts/verifier-contenu-final.mjs` §13.5 now also scans this file: no « soir » radical and no
  séance situated relative to the reader.
