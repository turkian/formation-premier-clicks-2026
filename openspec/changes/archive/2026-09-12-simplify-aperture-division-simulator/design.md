## Context

See `proposal.md` for motivation. This pins down the exact component shape, prop contract, and
copy so `tasks.md` is pure execution.

Current implementation, for reference:
- `src/src/components/interactifs/OuvertureDivision.astro` takes `focale?`, `ouverture?`,
  `comparaison?` (boolean). One shared focale slider and one shared ouverture slider drive a
  single lens; `comparaison: true` hardcodes a second, fixed focal length (200 mm) at the *same*
  ouverture as the slider, and three preset buttons (`24-200`, `kit`, `400`) jump to fixed
  states. The generated readout branches on whether a second lens is present: single-lens text
  claims "f/N donne la même exposition sur n'importe quel objectif..."; two-lens text claims
  "...et pourtant la même exposition."
- `src/src/content/lecons/1.yaml` (`le-f-est-une-division`) is the component's only caller,
  passing `comparaison: true` and a matching `aparte` that repeats the same exposure claim.
- `CRANS_OUVERTURE` in `profondeur-de-champ.ts` is `[1.4, 1.8, 2, 2.8, 3.5, 4, 4.5, 5, 5.6, 6.3,
  7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22]` — no `2.4`. Its own doc comment already says it is
  used only by `OuvertureDivision.astro` (the depth-of-field simulator uses the separate
  `CRANS_OUVERTURE_PLEINS`), so adding `2.4` here cannot affect that other component.

## Goals / Non-Goals

**Goals:**
- Replace the single-lens-plus-hardcoded-comparison model with two fully independent lens
  panels (own focale slider, own ouverture slider each), so the screen's default state can be
  "both lenses at 50 mm, one at `f/2.4`, one at `f/22`" without special-casing.
- Remove every exposure-equivalence claim from generated text, replacing it with a statement of
  the two diameters and their ratio only.
- Keep the component reusable for any focale/ouverture pair a presenter drags to, including the
  same-`f`-number-different-focal-length case the old `comparaison` mode showed — just without
  a dedicated mode or claim attached to it.

**Non-Goals:**
- No change to the depth-of-field simulator (`ProfondeurDeChamp.astro`) or its own kit-zoom
  toggle — it already satisfies the (now depth-of-field-only) kit-zoom requirement correctly.
- No new capability for a kit-zoom preset on the aperture component — explicitly dropped, per
  the modified spec requirement.
- No change to `diametre()` or the true-relative-scale drawing math in
  `profondeur-de-champ.ts` beyond the `CRANS_OUVERTURE` list addition — the geometry is correct
  today; only the accompanying claims and the controls change.

## Decisions

### 1. Props: two independent focale/ouverture pairs, no `comparaison` flag

```ts
interface Props {
  focaleA?: number;
  ouvertureA?: number;
  focaleB?: number;
  ouvertureB?: number;
}
const { focaleA = 50, ouvertureA = 2.4, focaleB = 50, ouvertureB = 22 } = Astro.props;
```

The component's own defaults are set to the quiz-continuation state (both 50 mm, `f/2.4` and
`f/22`), since it has exactly one caller and that caller wants this state. `lecons/1.yaml` still
passes the props explicitly (matching this file's existing convention of stating a screen's
`props` even when they equal a component's default), so the yaml stays self-documenting:

```yaml
- id: le-f-est-une-division
  genre: interactif
  titre: Le `f/` est une division
  claim: `f/2.4` et `f/22`, sur le même 50 mm : deux trous très différents.
  composant: ouverture-division
  props:
    focaleA: 50
    ouvertureA: 2.4
    focaleB: 50
    ouvertureB: 22
  aparte: |
    <!-- shortened aparte — see Decision 3 -->
```

Rejected alternative: keep a single `comparaison` boolean and infer the second lens's ouverture
from the first (today's behaviour). Rejected because the whole point of continuing the quiz is
showing **two different apertures** on the **same** focal length — the old model can only vary
focal length between the two sides, never aperture, so it cannot express the target default
state at all.

### 2. Markup: two symmetric panels, one shared comparison line

Each panel (`A`, `B`) gets its own focale slider, own ouverture slider, own division equation
(`50 ÷ 2,4 = 20,8 mm`), and its own disk drawn in the shared `<svg>` at true relative scale
(reusing the existing `enPixels`/`rayonMax` scaling, now driven by two independently computed
diameters instead of a shared `ouverture` across `objectifs`). Below both panels, a single
generated paragraph replaces today's per-mode `exposition` text:

- States both diameters and how many times larger one is than the other (e.g. "trou de 20,8 mm"
  / "trou de 2,3 mm — presque 9 fois plus petit"), computed continuously from whatever the two
  panels currently show — not hardcoded to the default `f/2.4`/`f/22` pair.
- Keeps, once (not duplicated per panel), the existing "diviseur" framing sentence ("Plus le
  chiffre `f/` est grand, plus le trou est petit — comme un quart de tarte est plus petit qu'un
  demi"), since it explains the mechanism generically and doesn't need restating per lens.
- Makes no claim, in any wording, about exposure being equal or unequal between the two lenses.
- The existing static "refus" sentence ("Vous n'avez pas à retenir que c'est à l'envers...")
  is unchanged.

The `data-paire` preset buttons and their click handlers are deleted outright; the `input`
listener simplifies to updating whichever panel's slider fired, with no `focaleComparee`
state to track.

### 3. Yaml `claim` and `aparte`, rewritten

`claim` changes from "Le même chiffre `f/`, deux objectifs, deux trous complètement
différents." (which describes the old same-f-number framing) to something naming the actual
default state and tying it to the quiz, e.g.:

> `f/2.4` et `f/22`, sur le même 50 mm : deux trous très différents.

`aparte` drops the exposure-equivalence paragraph entirely. Given the component's own generated
text now states the diameters and their ratio, the `aparte` either shrinks to a short remark not
already said on screen or is removed if there is nothing left worth adding "for free" — final
call left to whoever writes the copy in the apply step, per the project's own aparte convention
(a detail with no cost to skip, not a restatement of the body).

### 4. `CRANS_OUVERTURE` gains `2.4`

Added to `src/src/lib/profondeur-de-champ.ts`'s `CRANS_OUVERTURE` array, in ascending order
between `2` and `2.8`. Confirmed single-consumer (`OuvertureDivision.astro`) by the array's own
doc comment; the depth-of-field simulator reads `CRANS_OUVERTURE_PLEINS` instead, so this is not
a shared-state risk.

## Risks / Trade-offs

- [`2.4` is not a standard photographic third-stop marking, and now lives in a general-purpose
  aperture list] → Accepted: the list is already non-standard in places (e.g. `4.5`, `6.3`,
  `7.1`), it's confirmed single-consumer, and the alternative (approximating with the nearest
  real stop) would make the simulator's default state not actually match the quiz it's meant to
  continue.
- [Removing the preset buttons removes a fast path back to the old 24 mm/200 mm/kit/400 mm talking
  points] → Accepted per the animator's explicit choice; two free slider pairs reach the same
  states by hand, at the cost of a few extra drags mid-presentation.
- [Two-panel UI is visually busier than one shared slider pair] → Mitigated by the panels being
  symmetric and by removing the preset-button row and the branchy single-lens text, so total
  on-screen text is lower than today despite the extra slider.

## Migration Plan

Content- and component-only change, no data migration:
1. Add `2.4` to `CRANS_OUVERTURE`.
2. Rework `OuvertureDivision.astro`'s props, markup, and script per Decisions 1–2.
3. Update `lecons/1.yaml`'s `le-f-est-une-division` screen per Decision 3.
4. Apply the `interactive-components` spec delta.

Reversible by reverting the commit; no other screen references this component, so no
cross-screen follow-up is needed.
