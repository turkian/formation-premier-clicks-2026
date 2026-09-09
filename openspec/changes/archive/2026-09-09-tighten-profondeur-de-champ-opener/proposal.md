## Why

The `ouverture` repère écran that opens the `profondeur-de-champ` bloc (slide 15) was flagged as
an out-of-scope note during `clarify-mise-au-point-terms` ("has a similar mid-sentence
forward-reference… noted during exploration but is not addressed by this change"). Looking at it
now: the reference itself is *accurate* this time (the `ouverture` bloc really is next), so it
isn't the same "wrong claim" bug as the mise-au-point opener. But its `corps` — "L'ouverture,
qu'on verra juste après, n'est qu'un des moyens de la contrôler — et pas le plus accessible" —
tips off the room, on the bloc's very first screen, that aperture is not the most accessible way
to control depth of field. That is exactly the reveal three écrans build toward:
`ce-qui-change-l-epaisseur` (three factors), `le-facteur-invisible` (a screen whose own authoring
comment calls it "la surprise du bloc," explicitly built so it can't land if the payoff is
already known), and `les-quatre-leviers` ("un seul est un réglage"). The opener spoils its own
bloc's punchline before the cumulative panels get to deliver it.

## What Changes

- Shorten the `ouverture` écran's `corps` to the bare question the claim already poses (`claim:
  Quelle épaisseur est nette ?`), dropping the sentence that names aperture and pre-ranks it
  against the other levers. The screen becomes a pure question-opener, matching what the
  `mise-au-point` bloc-opener now does after its own revision.
- No new claim or forward-reference is added in its place — like the mise-au-point fix, the
  point is to stop asserting something the room hasn't earned yet, not to phrase it more
  carefully.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

(none — wording-only trim, no requirement changes)

## Impact

- `src/src/content/lecons/1.yaml`: shorten the `corps` field of the `profondeur-de-champ` bloc's
  `ouverture` écran (slide 15).
