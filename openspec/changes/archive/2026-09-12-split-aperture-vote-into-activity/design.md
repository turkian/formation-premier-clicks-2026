## Context

See `proposal.md` for the motivation. This document pins down the exact content so `tasks.md`
is pure execution: which screens get which id, order, and copy, in
`src/src/content/lecons/1.yaml`, bloc `ouverture-et-profondeur-de-champ` (screen `le-vote`,
plus the doc comment immediately above it).

## Goals / Non-Goals

**Goals:**
- Fix the exact `id`, `titre`, `claim`, `corps`, `encadre`, `ton` for the two replacement
  screens, so no wording decision is left open for the apply step.
- Decide what happens to every field and état of the current `le-vote` screen (nothing is
  silently dropped without a stated reason).
- Confirm, with evidence from the component source, that dropping the `Pourquoi` état loses no
  content the room would otherwise see.

**Non-Goals:**
- No change to `le-f-est-une-division` (the `OuvertureDivision` interactive component) or its
  props. See Decision 3 — its existing default render already covers what the dropped
  `Pourquoi` état said.
- No change to any other screen in the bloc, and no change to `lecon.ts`, the `Ecran` layout,
  or any `.astro` component — this is a content-only change, which is why `skip_specs: true`
  holds.
- No attempt to reintroduce "petit chiffre, grand trou, fond flou" elsewhere in this change.
  Confirmed absent everywhere else in `lecons/1.yaml`; the animator decided to drop it rather
  than relocate it (see proposal.md).

## Decisions

### 1. Screen ids and order

Replace `le-vote` in place, in bloc `ouverture-et-profondeur-de-champ`, with two screens in
this order, immediately before the unchanged `le-f-est-une-division`:

```
la-question   (repère, variante activite)
la-reponse    (panneau, static)
```

Rationale: `le-vote`'s own `titre` was already "La question" — but keeping the id `le-vote`
on either half would be stale the moment there's no vote (per the precedent set by
`align-ecran-ids-with-titles`: an écran id doubles as its URL segment and is expected to
describe current content). `la-question` and `la-reponse` name each screen after what it
actually shows, matching the naming style already used for split static panels elsewhere in
this file (`le-probleme` / `la-solution`).

### 2. `la-question` — the activity screen

```yaml
- id: la-question
  genre: repere
  variante: activite
  titre: La question
  claim: Entre `f/2.4` et `f/22`, lequel laisse passer le plus de lumière ?
  corps: |
    **Une minute.** À votre table, mettez-vous d'accord sur une réponse.
```

Rationale: `claim` is the current `le-vote` claim, unchanged — the animator explicitly said
they like the question and want it kept. `corps` replaces "À main levée. Personne n'est
nommé... Qui dit `f/2.4` ? Qui dit `f/22` ?..." with the one-minute table-discussion
instruction the animator asked for, using "à votre table" rather than "en équipe" to match the
vocabulary this file already uses for the small-group unit (`tour-de-table`: "les gens de
votre table"; `la-pause`: "une feuille est posée sur votre table... votre table essaie d'y
répondre"). The current `aparte` ("c'est presque toujours moitié-moitié...") is dropped
entirely, per the animator's answer — it was calibrated to observing a room-wide hand-split,
which a table discussion doesn't produce.

`genre: repere` / `variante: activite` (rather than keeping `genre: panneau`) matches the
`lessons` spec's own carve-out for this exact moment ("A block MAY include a repère screen
with variante `activite`, carrying the instructions for a participant exercise to run
immediately") and the two existing screens already built on it (`tour-de-table`, `la-pause`) —
both are plain single-view instructions with no reveal, exactly this screen's shape now.

Alternative considered: keep `genre: panneau` with a silent first état (as today), just
reword its `corps`/`aparte`. Rejected — a `repere`/`activite` screen already exists in this
project for exactly "single-view room instruction, no reveal," and `panneau`'s cumulative
`corps`/`aparte` never leave the screen once shown (confirmed: `regionsCumulees` pushes them
in before the états loop and nothing is ever removed), so the one-minute instruction would
otherwise still be sitting on screen once `f/2.4` is revealed — an active imperative that's
visibly over by then. Splitting into two screens avoids that.

### 3. `la-reponse` — the reveal, as a static panel

```yaml
- id: la-reponse
  genre: panneau
  titre: La réponse
  claim: C'est `f/2.4`.
  corps: |
    Le chiffre après le `f/` est plus grand pour `f/22` — et pourtant c'est l'inverse : plus
    ce chiffre est grand, plus le trou est petit.
  encadre: |
    **C'est `f/2.4`.** Si vous avez répondu `f/22`, votre raisonnement était logique : 22 est
    plus grand que 2,4. **C'est la notation qui est piégeuse, pas vous.**
  ton: reponse
```

Rationale: this is the current état 2 (`La réponse`) lifted out of the cumulative chain into
its own static panel — the `lessons` spec explicitly allows a static panel "exactly one
highlighted callout, distinct from its ordinary body text," rendered after the body, which is
exactly this shape (`corps` then `encadre`). Every existing static panel in this file pairs
`corps` with its `encadre` rather than using the callout alone (verified: all 14 static
`panneau` screens in `lecons/1.yaml` carry `corps`), so `corps` states the neutral setup — the
notation reads backwards — before `encadre` delivers the reveal and the reassurance, carried
over verbatim from the current wording. `claim` restates the answer directly, mirroring the
`la-solution` precedent where `claim` repeats the encadré's own opening sentence.

### 4. Dropping `Pourquoi` — confirmed redundant with `le-f-est-une-division`

The current état 3 (`50 mm ÷ 5,6 ≈ 9 mm`, "un quart de tarte est plus petit qu'un demi") is cut
with no replacement text anywhere. Read `src/src/components/interactifs/OuvertureDivision.astro`
to confirm: its `rendre()` function computes and displays the division equation
(`{focale} ÷ {ouverture} = {d} mm`) and the sentence "Plus le diviseur est grand, plus le
résultat est petit — comme un quart de tarte est plus petit qu'un demi" for whatever
focale/ouverture pair is current — unconditionally, on first render, independent of the
`comparaison` prop or any interaction. `le-f-est-une-division` sets `comparaison: true`, so its
first render lands on 24 mm at f/2.8 rather than the 50 mm/f/5.6 kit example the current
`Pourquoi` état used — but the mechanic and the tarte analogy are the same sentence, verbatim,
just computed against different numbers. Nothing pedagogically distinct is lost by cutting the
static duplicate; the specific "50 mm kit" framing remains reachable via that screen's own
"Le kit à 50 mm, f/5.6" preset button for a presenter who wants it, unprompted by any text this
change would add.

Alternative considered: add a line to `la-reponse` or to `le-f-est-une-difference` nudging
toward the 50 mm/f/5.6 case specifically. Rejected as unnecessary — the room-facing content
rule ("aucun écran ne s'adresse à l'animateur") means any such nudge would have to be
participant-facing prose, and the analogy already renders unprompted; adding text solely to
point at a specific preset button would be new copy justified by nothing the proposal asked
for.

### 5. Dropping `La règle` — confirmed not reproduced elsewhere

The current état 4 ("Petit chiffre, grand trou, fond flou" plus the mise-au-point-vs-
profondeur-de-champ warning) is cut with no replacement. Confirmed by
`grep -n "grand trou" src/src/content/lecons/1.yaml` (before this change) that this exact
six-word rule appears nowhere else in the file. This is a deliberate scope reduction the
animator confirmed after being shown that fact, not an oversight this design is papering over.

### 6. The doc comment above the screen

The comment block currently reading:

```yaml
# ★ Panneau cumulatif nº 2 : le vote.
#
#   La réponse et la règle ne peuvent pas être à l'écran pendant qu'on
#   vote — sinon il ne reste rien à comprendre. Le panneau accumule donc,
#   et son budget est réparti sur les quatre états : chacun ajoute un
#   encadré court, jamais un nouveau tableau. Au dernier état, le panneau
#   entier tient encore sur l'écran et sert de résumé écrit du bloc.
```

is removed and replaced with a short comment describing the new two-screen shape (activity,
then a static reveal panel), so a future reader doesn't find a stale rationale for a cumulative
panel that no longer exists at this id.

## Risks / Trade-offs

- [Cutting `La règle` removes the only on-screen statement of "petit chiffre, grand trou, fond
  flou" from the lesson] → Accepted, explicitly, by the animator after being shown it's not
  reproduced elsewhere (see proposal.md and Decision 5). Not a silent regression.
- [The bloc grows by one screen (4-état single screen → 2 single-view screens), shifting the
  on-screen position counter for every later screen in the lesson] → Already called out in the
  proposal; positions are computed from list order (`lecon.ts`'s `aplatir`), not stored, so
  nothing needs updating beyond the yaml content itself — same accepted trade-off as the
  precedent `split-fourth-factor-screen` change.
- [Losing the whole-room show-of-hands means the room never sees how the group's opinion was
  actually split] → Accepted: this was the explicit ask (table discussion instead of a public
  vote); the safety-in-numbers effect is preserved (tables reason together, no one is asked to
  answer alone in front of the room), only the visible-room-wide-split moment is traded away.

## Migration Plan

Single-file content edit, no runtime migration: replace the `le-vote` entry (and the doc
comment above it) with the two new entries (`la-question`, `la-reponse`), same position in the
bloc's `ecrans` list, in `src/src/content/lecons/1.yaml`. No other file changes. Reversible by
reverting that one commit.
