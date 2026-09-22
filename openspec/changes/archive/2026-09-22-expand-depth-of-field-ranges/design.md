## Context

The depth-of-field simulator (`ProfondeurDeChamp.astro`, used on slide 30 of séance 1) drives its
four range sliders from fixed step lists rather than continuous `min`/`max`: `FOCALES`,
`DISTANCES`, `FONDS`, and `CRANS_OUVERTURE_PLEINS`. Each slider's `max` is set to `liste.length - 1`
and the displayed value is looked up by index, so widening a lever means adding entries to its
list, not changing a numeric bound. The physics (`profondeurDeChamp` in
`src/src/lib/profondeur-de-champ.ts`) is a closed-form formula with no dependency on the step
lists — it is correct for any focal length and distance already. See proposal.md for the "why".

The scene drawing (`dessiner()`, same file) is separate from the physics: it places the subject,
focus-zone edges, and background wall on a hardcoded logarithmic axis (`MIN=0.2, MAX=80` metres)
with graduation marks at fixed metre values. That axis is sized for the *current* distance range
plus background offset, not derived from `DISTANCES`/`FONDS`.

## Goals / Non-Goals

**Goals:**
- Widen `FOCALES` to reach 9 mm and 600 mm.
- Widen `DISTANCES` to reach 300 m at the top, keeping the existing 0.3 m floor.
- Keep the scene drawing legible at the new distance extreme.
- Leave every existing step, and every existing default prop, exactly as is.

**Non-Goals:**
- Changing `FONDS` (subject-to-background distance) — not requested, and unrelated to the two
  levers named in the proposal. It stays 0.1–50 m.
- Adding any constraint between focal length and subject distance (e.g. modeling a lens's minimum
  focus distance). Decided against: physically impossible corners (600 mm at 0.3 m) stay
  selectable, matching the component's existing stance of computing and showing the real number
  rather than hiding a combination.
- Changing `CRANS_OUVERTURE_PLEINS` or the kit-zoom preset — untouched by this change.

## Decisions

**FOCALES step values.** Extend the existing list on both ends rather than re-deriving it, so
every currently-referenced value (50 mm in the yaml default, 85 mm elsewhere in séance 1) stays a
selectable step:

```
9, 12, 16, 18, 24, 28, 35, 50, 70, 85, 105, 135, 200, 300, 400, 500, 600
└── new: wide end ──┘  └────────── unchanged (existing 11 steps) ─────────┘  └ new: tele end ┘
```

9/12/16 mm cover ultra-wide/action-cam-class lenses; 400/500/600 mm continue the existing
progression (…135, 200, 300…) at the same rough step ratio, matching real super-telephoto
marketing numbers.

**DISTANCES step values.** Extend only the top; the bottom (0.3–50 m, 20 steps, deliberately dense
below 3 m where the depth-of-field effect changes fastest) is unchanged:

```
0.3 … 30, 50, 75, 100, 150, 200, 300
              └── new: 5 coarse far steps ──┘
```

This preserves the spec's worked example (APS-C/50 mm/f5.6 at 1 m → 3 m → 10 m ≈ 8 cm/77 cm/10 m)
exactly, since none of those three values move.

**Scene drawing rescale.** Change `MAX` from 80 to 400 m — enough to place a 300 m subject plus the
existing worst-case 50 m background offset (`distance + fond`) without clipping (the far wall was
already clamped to the right edge past the old `MAX`, so this only extends where that clamp kicks
in). `MIN` stays 0.2 m: it already sits below the 0.3 m distance floor as a small margin, and
that margin need doesn't change with this update. Add graduation marks at 100 m and 300 m to the
existing `[0.3, 1, 3, 10, 30]`, so the axis keeps a readable landmark near the new top end instead
of a long unlabeled stretch.

**No focal-length/distance coupling.** Considered adding a kit-preset-style "refus" (the way
`ouvertureMaxKit` visibly refuses apertures a kit zoom can't reach) for physically-impossible
focal-length/distance pairs. Rejected: a lens's minimum focus distance doesn't follow a single
formula the way maximum aperture does (it's per-lens, not purely a function of focal length), so
modeling it accurately would need data this component doesn't have and isn't about to acquire.
Decided with the user: leave every combination reachable.

## Risks / Trade-offs

- **Denser slider, same physical width.** Both sliders gain 5–6 more steps at their existing pixel
  width, so each drag covers less perceptual distance. Mitigated by concentrating new steps only
  at the ends, where fine control matters least (the existing dense region near 1–3 m / 18–50 mm
  is untouched).
- **Implausible combinations now reachable.** A presenter could dial in 600 mm at 0.3 m live and
  get a number for a shot no lens could take. Accepted per the Non-Goals decision above — the
  component's job is to compute correctly, not to gatekeep gear realism.
