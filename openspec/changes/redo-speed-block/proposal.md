## Why

Session 2's speed block is a long talk followed by one exercise at the very end. It never says
what shutter speed *is* mechanically, it shows only mistakes (two kinds of blur) and never what
different speeds are good for, and the room touches a camera only once. The recap also still ends
on « Le programme », a screen that repeats « deux façons de faire entrer la lumière » right after
the screen that introduced speed and ISO, and is no longer needed.

## What Changes

- Remove `le-programme` from the `retour` block. « Deux nouveaux leviers » now hands over
  directly to the speed block.
- Open the speed block with a new interactive **shutter** demonstration: the front curtain
  uncovers the sensor, the sensor is exposed, the back curtain covers it again, slowed down and
  steppable. At fast speeds it stays physically honest: the two curtains travel together as a
  slit and the sensor is never fully uncovered at once. A short note says that an electronic
  shutter has no curtains and reads the sensor line by line, with a similar result.
- Interleave three **« appareil en main »** exercises with the explanations instead of one at the
  end, all in `S` / `Tv` with ISO auto (the settings participants arrive with from session 1,
  apart from the mode):
  1. **la main qui s'agite** at `1/500` then `1/15`: the principle (the current exercise, moved
     to the start of the block);
  2. **light trails** with a phone flashlight, camera resting still: the subject's blur, chosen;
  3. **intentional camera movement**: your own blur, chosen.
  Exercises 2 and 3 mirror the existing « deux flous » screen: the same two blurs, done on purpose.
  Each keeps a phone equivalent.
- Add two **demonstrations** of what speeds are for:
  - « une scène, trois vitesses »: one street, `1/500`, `1/30`, `1/2 s`;
  - « le flou choisi »: light trails, intentional camera movement, panning.
- Keep the existing core screens (`la-decision`, `points-de-depart`, `deux-flous`, its
  demonstration, `explorer-le-mouvement`) unchanged in content.
- Out of scope, left to the coming ISO redo: manual mode with ISO auto, and exposure
  compensation in `M` when ISO auto is on (which today contradicts « La question qui prouve »).
  The ISO block is not touched.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `lessons`: the session 2 recap no longer hands over to a programme screen; the speed block
  alternates explanation and hands-on practice, opens with the shutter mechanism, and pairs the
  two blurs with two creative exercises.
- `interactive-components`: a shutter component showing two curtains crossing the sensor, honest
  at fast speeds, slowed down and steppable.
- `demo-media`: the street three-speed series and two of the « flou choisi » images (light trails,
  intentional camera movement) are marked essential.

## Impact

- `src/src/content/lecons/2.yaml`: `le-programme` removed; the `vitesse` block reordered, with
  the shutter screen, two new demonstrations and two new exercises added, and
  `la-molette-de-vitesse` moved and rewritten.
- `src/src/components/interactifs/Obturateur.astro` (new) and `registre.ts`.
- Shot list: five new demonstration slots (three street speeds, light trails, intentional camera
  movement) plus panning, on top of the two speed slots still missing.
- Session 2 grows by four screens net; it is already well past the spec's approximately
  eighteen screens. Cuts are deferred to a later pass.
- `npm run verifier:contenu`, `npm run verifier` and `npm run verifier:liens` must still pass
  (no animateur-facing text, sessions named by rank, no `soir`, nothing overflowing at
  1024 × 768 and 16:9, no link to the removed screen).
- No new dependencies. Session 1, the ISO block and everything after the break are unchanged.
