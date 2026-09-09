## Why

The `ouverture` repère screen that opens the `mise-au-point` bloc (leçon 1, écran 8) tells
the room that "deux mots se ressemblent" without ever naming them, then claims the second
one is addressed "au bloc suivant." It isn't: the terms are *la mise au point* and *la
profondeur de champ*, and profondeur de champ is actually addressed two blocs later (bloc
5, `profondeur-de-champ`), after the pause bloc — not in the very next bloc. The room is
left guessing what the two words are, and forms a wrong expectation of when the second one
is coming.

## What Changes

- The `ouverture` screen of the `mise-au-point` bloc names both terms — *la mise au point*
  and *la profondeur de champ* — as two bare column headers, with no definition and no
  timing claim under either one. It functions as a discussion prompt: the room sits with
  the two names for a minute before the very next screen (`point-ou-zone`) resolves the
  distinction.
- Removes the inaccurate "on règle le premier maintenant, le second au bloc suivant"
  sentence. No replacement scheduling claim is added — timing isn't asserted on this
  screen at all, which is what made the original claim wrong in the first place.
- Adds a small new capability to the `repere` screen genre: an optional two-term prompt
  (two short labels rendered side by side), distinct from the existing `activite`
  variant's numbered step list. Scoped to the `ouverture` variant.

Out of scope: the `profondeur-de-champ` bloc's own opening screen (bloc 5) has a similar
mid-sentence forward-reference ("l'ouverture, qu'on verra juste après..."). It was noted
during exploration but is not addressed by this change.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `lessons`: a repère screen with variante `ouverture` can carry a two-term prompt — two
  bare term labels shown side by side, with no definition and no timing text — displayed
  before the labels are explained on a later screen.

## Impact

- Content: `src/src/content/lecons/1.yaml` — the `ouverture` screen of the `mise-au-point`
  bloc (removes the misleading `corps` sentence, adds the two term labels).
- Component: `src/src/components/ecrans/Repere.astro` — renders the optional two-term
  prompt.
- Styles: `src/src/styles/lecon.css` — two-column layout for the term prompt, readable at
  the 4:3/16:9 projection floor.
