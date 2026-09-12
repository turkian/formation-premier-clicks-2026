## Why

The `le-vote` screen (leçon 1, bloc `ouverture-et-profondeur-de-champ`) frames its opening
question — `Entre f/2.4 et f/22, lequel laisse passer le plus de lumière ?` — as a whole-room,
anonymous show-of-hands vote (`corps`: "À main levée... Qui dit `f/2.4` ? Qui dit `f/22` ?"),
adapted directly from the source script's `docs/Session 1/formation_photo_session_1.md`
facilitation notes. The animator running this lesson wants this moment run instead as a
one-minute small-table discussion, matching the `activite` pattern already used elsewhere in
this same lesson (`tour-de-table`, `la-pause`). The current screen's `corps` and `aparte` are
written for the show-of-hands mechanic specifically (the "à main levée" instruction, and the
"c'est presque toujours moitié-moitié" aside calibrated to watching a room-wide split) and
don't describe what will actually happen in the room under the new format.

The question itself (the `claim`) is kept as-is — only the activity mechanic around it, and the
screen's structure, change.

## What Changes

- Replaces the single 4-état cumulative `le-vote` panel with two screens, in the same position
  in the bloc's `ecrans` list:
  - `la-question` (repère, `variante: activite`) — the question as `claim`, unchanged; `corps`
    instructs tables to discuss for one minute and agree on an answer. Drops the "à main levée"
    instruction and the "c'est presque toujours moitié-moitié" aside (written for a room-wide
    hand-split that a table discussion doesn't produce).
  - `la-reponse` (panneau, static — no `etats`) — reveals the answer (`f/2.4`) and the
    reassurance for tables that answered `f/22`, carried over from the current state 2 wording.
- **Drops** the current états 3 (`Pourquoi`, the `50 mm ÷ 5,6 ≈ 9 mm` arithmetic and the "quart
  de tarte" analogy) and 4 (`La règle`, "petit chiffre, grand trou, fond flou" plus the
  mise-au-point-vs-profondeur-de-champ warning) from this screen. Confirmed: the `Pourquoi`
  arithmetic and analogy are already demonstrated live, unprompted, on the very next screen
  (`le-f-est-une-division`, the `OuvertureDivision` interactive component) — that screen renders
  the division equation and the "quart de tarte" sentence for whatever focal length/aperture is
  selected from first render, with no interaction required, so nothing is lost by cutting the
  static duplicate. **The `La règle` rule ("petit chiffre, grand trou, fond flou") is not
  reproduced anywhere else in `lecons/1.yaml`** — this is a deliberate content removal, decided
  with the animator, not an oversight.
- Updates the doc comment above the screen (currently "★ Panneau cumulatif nº 2 : le vote")
  to describe the new two-screen structure instead of a single cumulative panel.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ The `lessons` spec already grants everything used here: a repère screen with
`variante: activite` carrying room-facing exercise instructions, and a static concept panel
(no ordered states) with exactly one highlighted callout rendered after its ordinary body text.
No requirement changes; `skip_specs: true` is set accordingly.

## Impact

- Content: `src/src/content/lecons/1.yaml`
  - Bloc `ouverture-et-profondeur-de-champ`: `le-vote` (1 screen, 4 états) replaced by
    `la-question`, `la-reponse` (2 screens, no états), in that order, immediately before the
    unchanged `le-f-est-une-division`.
  - No change to `le-f-est-une-division` or any other screen: the interactive component
    already carries the "why" arithmetic that used to live in `le-vote`'s dropped `Pourquoi`
    état.
- Navigation: the bloc grows by one screen (one état-based screen becomes two single-view
  screens, net +1 stop); every later screen's position indicator shifts by one, same as the
  precedent `split-fourth-factor-screen` change.
