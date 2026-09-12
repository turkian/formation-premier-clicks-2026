## Why

The take-home challenge given at the end of session 1 (« Cinq photos. Cinq exercices. ») asks
for two photos testing frozen and visible motion. Motion control (shutter speed) is not covered
anywhere in session 1 — the leçon only covers light, mise au point/autofocus, and aperture/depth
of field. Shutter speed is introduced at the very start of session 2 (`vitesse` bloc, "Le
mouvement et la vitesse"). The other three exercises already map cleanly onto session 1 content
(two onto aperture/depth of field, one onto light), and the mise au point bloc — a full session 1
topic with its own live exercise — isn't represented in the challenge at all.

## What Changes

- Replace the "mouvement figé" and "mouvement visible" items in the five-photo challenge with:
  - a mise au point item: a photo where the participant, not the camera, chose the precise focus
    point;
  - a second light item, more specific than the existing open-ended one: a photo where the
    direction the light comes from is clearly visible.
- Apply this wording consistently in the three places the challenge appears:
  - `src/src/content/lecons/1.yaml` — the `le-defi` screen's `corps` list (the on-screen/projected
    version);
  - `docs/Session 1/formation_photo_session_1.md` — the facilitator's run-of-show notes for "Le
    défi";
  - `docs/Documents/feuillets-a-remettre.md` — the printed handout (Feuillet 1) participants take
    home.
- No change to the challenge's framing text ("si elles sont ratées, elles sont encore plus
  utiles", "rien à envoyer") or to any other part of session 1 or its screens.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — this is a content/copy change to the wording of one screen's exercise list, kept in sync
across its docs/ source and its printed handout. No `lessons` requirement changes: the `le-defi`
screen stays a `panneau` screen with the same structure, and no new screen genre or capability is
introduced. `skip_specs: true` is set in this change's `.openspec.yaml`.)

## Impact

- `src/src/content/lecons/1.yaml`: the `le-defi` écran's `corps` field (two of five list items).
- `docs/Session 1/formation_photo_session_1.md`: the "Le défi" section's five-item list.
- `docs/Documents/feuillets-a-remettre.md`: the "Feuillet 1 · Le défi" printed checklist.
