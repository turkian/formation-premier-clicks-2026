## Why

The `point-ou-zone` panneau (leçon 1, bloc `mise-au-point`) names the mixup it's trying to
prevent instead of just preventing it — "c'est la confusion la plus fréquente chez les
débutants" tells the room a confusion exists without doing anything to resolve it, and adds
a sentence to a panel that's meant to hold ~100 words. The panel also never says that
« focus » is the word most participants already use for *mise au point* — leaving them to
silently map their own vocabulary onto the term themselves mid-lesson. Separately, the
panel's `aparte` about what autofocus actually does is real, load-bearing content (it
corrects a common wrong assumption: that autofocus reads your mind), but today it renders
in the panel's smallest, bottom-of-screen typographic tier — the tier the lessons spec
reserves for "detail with no cost."

## What Changes

- Removes the "c'est la confusion la plus fréquente..." sentence from `point-ou-zone`'s
  `corps`. The two bullets already state the distinction; naming the confusion adds nothing
  a beginner can act on.
- Adds a short parenthetical to the *mise au point* bullet linking it to « le focus », the
  anglicism most participants will already know, so the correct term and the word they've
  heard resolve into the same concept instead of sitting side by side unconnected.
- Promotes the autofocus `aparte` ("ce que fait réellement l'autofocus…") to the panel's
  `encadre` (highlighted callout), with an icon. This uses the existing static-panel-callout
  capability — the panel has no callout today, so nothing is displaced.

Out of scope: the `autofocus` screen's own `aparte` about Canon/Olympus AF naming keeps its
current manually-typed ⚠️ emoji; converting that one to the structured callout was
considered and deferred to a separate change if wanted.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ Both edits use capabilities the `lessons` spec already grants a static concept
panel — an optional highlighted callout with a tone and icon, and free-form `corps` prose.
No requirement changes.

## Impact

- Content: `src/src/content/lecons/1.yaml` — the `point-ou-zone` screen's `corps` and
  `aparte`/`encadre` fields.
