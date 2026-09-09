## Why

The `autofocus` panneau (leçon 1, bloc `mise-au-point`) bundles two related but distinct
camera settings onto one screen: the AF mode (AF-S vs AF-C — does the subject move?) gets a
proper table, while the AF area mode (collimateur unique / zone / détection visage-œil —
how do you designate where to focus?) is squeezed into a bullet list underneath it. The
lessons spec caps a concept panel at roughly 100 words plus **one** table or diagram; this
screen effectively wants two tables and gets one table plus a list instead, which is why the
two settings read as one blurred idea rather than two clear ones. The screen's `aparte`
about brand-naming differences (Canon `One Shot`/`AI Servo`, Olympus `S-AF`/`C-AF`) is also
scoped only to the AF-S/AF-C wording, but sits at the bottom of a panel that's about to hold
a second, unrelated setting — a natural moment to also finish converting it to the
structured `encadre` callout, a promotion the prior `refine-point-ou-zone-screen` change
explicitly deferred as out of scope for a later change.

## What Changes

- Splits the `autofocus` screen into two concept panels:
  - `autofocus` (id unchanged) keeps the claim and the AF-S/AF-C table only.
  - A new screen, id `zone-af`, titre `Désigner où viser`, claim `Et pour désigner où :
    trois façons.`, carries a new table (`Méthode | Quand | Ce qu'il fait`) for collimateur
    unique, zone, and détection visage/œil.
- Converts the `autofocus` screen's `aparte` into an `encadre` (tone `avertissement`, icône
  `lucide:triangle-alert` — the same pairing already used elsewhere in this lesson),
  simplified to a single sentence (`Toutes les marques n'utilisent pas les mêmes mots.`),
  dropping the Canon/Olympus specifics and the pointer to the reference sheet.
- The `zone-af` screen ships with no `aparte`/`encadre` of its own.

Out of scope: the détection visage/œil row states only what the feature does (detects the
face, then the eye if visible, and focuses on it); the source text's aside calling it
"probably the best feature of your generation of cameras, and most people never turn it on"
is dropped rather than carried over, since it's editorializing rather than describing
behavior.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ Both screens use capabilities the `lessons` spec already grants a static concept
panel — free-form `corps` markdown (including a table) and one optional `encadre` callout
with a tone and icon. No requirement changes; `skip_specs: true` is set accordingly.

## Impact

- Content: `src/src/content/lecons/1.yaml` — the `mise-au-point` bloc's `autofocus` screen,
  split into `autofocus` and a new `zone-af` screen immediately after it.
