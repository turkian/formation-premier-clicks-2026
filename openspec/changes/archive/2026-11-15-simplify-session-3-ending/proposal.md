## Why

The last three screens of session 3 say too much. The room needs one idea to keep on each of the
first two, not a paragraph: that the rules shown all evening are there to be used, and bent when
needed, and that liking your own photographs comes first. Their bodies (who speaks, the
animateur's first-person reasoning) are said out loud in the room and do not need to be on the
wall. The opener's claim also undersells the point: « C'est une pratique, pas une règle » describes
the block, when the message to promote is to go around a rule when it gets in the way.

## What Changes

- **Opener (`ouverture`)**: its claim becomes « Prenez ce qui vous sert. Contournez les règles quand
  c'est nécessaire. ». Its body (Jean-Pierre Bluteau speaks first, then photographers from the club)
  is removed. The screen keeps its title, variante and « Bloc 6 sur 6 » label.
- **« Pourquoi, et pour qui » (`pourquoi-pour-qui`)**: becomes a repère screen, variante
  `transition` (label « On enchaîne »), whose only claim is « Aimez vos photos. ». Its three
  first-person paragraphs are removed. `transition` rather than `cloture` so that « Pour finir »
  stays unique to the last screen.
- **Discussion screen (`progresser`)**: the line « Des photographes du club racontent leur
  parcours. » is removed. Its title, claim and four questions are unchanged; it stays session 3's
  last screen.
- **Title-only repère screens are centered**: a repère screen that carries only its label and claim
  (no body, no columns) is centered both vertically and horizontally, with its claim centered line
  by line. No such screen exists today, so only the two screens above are affected.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the experience block's opener no longer has to name the animateur and the club's
  photographers; « Pourquoi, et pour qui » states « Aimez vos photos. » as a repère; the discussion
  screen's body no longer says who tells their story. **ADDED**: a title-only repère screen is
  centered.

## Impact

- `src/src/content/lecons/3.yaml`: the `apprentissages` block's three screens (`ouverture`,
  `pourquoi-pour-qui`, `progresser`). The block's `resume` (« …des photographes du club
  racontent. ») is kept: it becomes the only text that says who the discussion is with.
- `src/src/styles/lecon.css`: one rule for title-only repère screens. `Repere.astro` may need to
  expose that state (it already derives `data-dense` from the presence of a body or columns).
- Schema, scripts, assets: none. `transition` is an existing variante; no script references these
  screen ids.
- Session 3 keeps 25 screens and 6 blocks.
