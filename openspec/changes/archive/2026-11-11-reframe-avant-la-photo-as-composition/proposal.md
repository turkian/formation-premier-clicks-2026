## Why

The first history screen of session 3, `avant-la-photo`, claims « La règle des tiers est plus
vieille que la photographie. » This brings in the rule of thirds two blocks before it is taught,
on the `placer` screen. The recap has just ended on « Jamais du cadrage », and the word
*composition* has not been named yet, so this screen should introduce composition itself. The
screen has two more problems: its aside repeats the loupe hint that `IndiceLoupe` already shows
under the images, and it mentions the camera's nine-box grid, which adds nothing here.

While checking the new aside, we found that a `:` written right after bold, italic or inline code
(`**comment l'arranger** :`) renders with a plain, breakable space instead of the thin
non-breaking one. The `:` can then start a line on its own. About seventeen existing passages
across the lessons, brand sheets and reference sheets have the same problem, so it is fixed here
for the whole site rather than worked around in this one aside.

## What Changes

- The claim of `avant-la-photo` becomes « La composition est plus vieille que la photographie. »
- The aside is rewritten. Smith, 1797, gives advice on *how to arrange* a landscape (where the
  sky, the land and the water go), and that is what composing means. It no longer names the
  rule of thirds, no longer mentions the camera's nine-box grid, and no longer tells the reader
  to hold Shift.
- The image captions (`valeur`) no longer mention thirds:
  - `l3-histoire-smith`: « Smith, 1797 — le ciel, la terre, l'eau : chacun à sa place »
  - `l3-histoire-smith-regle`: « Smith, 1797 — des règles pour arranger un paysage »
- The page scan `l3-histoire-smith-regle` stays on the screen, along with its loupe and its alt
  text.
- No other screen changes. The `placer` screen keeps its aside, including the 1797 origin of the
  rule of thirds and the camera grid.
- The French typography step adds the thin non-breaking space before a `:` that directly follows
  bold, italic or inline code, as it already does after plain text. This applies to all
  Markdown content on the site; no content file is edited for it.
- `verifier:contenu` gains a check that renders the site's Markdown content and fails if a `:`
  is preceded by a breakable space.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the requirement « The history block shows where composition rules come from » now
  has its first stage as composition older than photography, not a rule older than photography.
  The scenario for the first history screen no longer requires the rule of thirds or the
  nine-box grid.
- `site-shell`: the requirement « French-Québec typographic conventions » gains a scenario: a `:`
  after emphasized or code text keeps its non-breaking space.

## Impact

- `src/src/content/lecons/3.yaml`: the `avant-la-photo` screen (claim, aside, two `valeur`
  captions).
- `src/src/lib/typo.ts`: the colon rule. Every Markdown passage with `:` after bold, italic or
  inline code renders differently (a thin non-breaking space instead of a plain space); nothing
  else changes.
- `src/scripts/verifier-contenu-final.mjs`: one new check.
- `openspec/specs/lessons/spec.md`: one requirement and one scenario.
- `openspec/specs/site-shell/spec.md`: one scenario added to an existing requirement.
- No change to components, schemas, styles or assets.
