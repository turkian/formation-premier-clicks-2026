## Context

See `proposal.md` for the motivation. Most of the items in that proposal are single-field
text trims with no open wording decision. This document exists only for the two items that
restructure a screen — where the exact split needs to be pinned down before `tasks.md` is pure
execution — and for the three callout conversions, where the exact `ton`/`icone` and the exact
split between `aparte` and `encadre` needs to be fixed. All of this is in
`src/src/content/lecons/2.yaml`.

## Goals / Non-Goals

**Goals:**
- Fix the exact `id`, `titre`, `claim`, and body copy for the two new screens (`points-de-depart`,
  and the `la-question-de-vitesse`/`vos-reponses` pair replacing `quatre-situations`), so no
  wording decision is left open for the apply step.
- Decide the exact `ton` and `icone` for each of the three new callouts, and which sentence of
  the current `aparte` moves into each one.
- Confirm nothing is silently dropped: every field of `la-decision` and `quatre-situations`
  is accounted for below.

**Non-Goals:**
- No change to any `.astro` component, to `lecon.ts`, or to the `lessons` spec — every pattern
  used here already exists in the rendering code and is already exercised by session 1.
- No change to `quand-l-appareil-se-trompe` or `la-compensation-en-manuel` — they stay
  cumulative panels (see proposal.md for why those two are unlike `quatre-situations`).
- No change to any demonstration image, interactif component, or to `pret: false`.

## Decisions

### 1. `la-decision` → `la-decision` + `points-de-depart`

Current screen mixes a two-item concept list, a five-row reference table, and an aparte. Split
in place, in bloc `vitesse`, `la-decision` immediately followed by a new `points-de-depart`:

```yaml
- id: la-decision
  genre: panneau
  titre: La décision
  claim: Face à quelque chose qui bouge, vous avez deux réponses. Aucune n'est meilleure.
  corps: |
    - **Figer** — on lit le détail, l'instant est suspendu.
    - **Laisser le mouvement apparaître** — on lit la vitesse, l'énergie.
  aparte: |
    Votre choix dépend de ce que vous voulez raconter : c'est **la question 3** de votre fiche.

- id: points-de-depart
  genre: panneau
  titre: Des points de départ
  claim: Des points de départ, pas des règles.
  corps: |
    | Situation | Point de départ |
    |---|---|
    | Personne qui marche | `1/250 s` |
    | Enfant qui court, chien | `1/500 s` |
    | Sport, oiseau en vol | `1/1000 s` et plus |
    | Filé — suivre un sujet qui passe | `1/30 s` |
    | Eau de rivière soyeuse | `1/4 s` à `1 s`, sur trépied |
```

Rationale: the dropped "Ces chiffres sont des points de départ, pas des règles" aside is not
lost — it becomes `points-de-depart`'s claim, which is a stronger placement (a claim is read
before the table; an aparte is read, if at all, after). Alternative considered: keep one screen
and move only the table into a `schema`-less second region — rejected, panels don't have a
"second table region" distinct from `corps`, and it would still leave `corps` carrying two
unrelated shapes (list + table).

### 2. `quatre-situations` → `la-question-de-vitesse` + `vos-reponses`

Follows the precedent set by session 1's `split-aperture-vote-into-activity`: an `activite`
poses the question the room answers aloud; a following static `panneau` reveals the answer
table. Replace in bloc `exposition`, in the same position:

```yaml
- id: la-question-de-vitesse
  genre: repere
  variante: activite
  titre: Quatre situations
  claim: Quel mode, et pourquoi ? Partez de la question, pas du réglage.
  corps: |
    1. Portrait dehors, détacher la personne du fond.
    2. Un enfant qui court.
    3. Paysage, tout net du premier plan à l'horizon.
    4. Concert sombre.

- id: vos-reponses
  genre: panneau
  titre: Vos réponses
  claim: Il n'y a pas toujours une seule bonne réponse.
  corps: |
    | | La réponse |
    |---|---|
    | Portrait, détacher du fond | **`A · Av`** — l'épaisseur de la zone nette |
    | Un enfant qui court | **`S · Tv`** — la question est le mouvement |
    | Paysage, tout net | **`A · Av`** — l'épaisseur, en sens inverse |
    | Concert sombre | **`S · Tv`** pour tenir la vitesse — et surtout **`−1`** |
```

Rationale: the four situations are read aloud and answered by the room per the source script
("le groupe répond à voix haute"), which is what `activite` screens are for; the current
`aparte` ("Il n'y a pas toujours une seule bonne réponse…") is promoted to `vos-reponses`'s
claim because it is the actual point of showing the table, not a footnote to it. Alternative
considered: leave as a two-état cumulative panel — rejected per the proposal's density
argument, and because `quatre-situations`'s états never build on each other the way
`quand-l-appareil-se-trompe`'s three states do (the second état here just answers the first;
it doesn't add a new layer of explanation).

### 3. The three callout conversions

All three use `ton: avertissement` and `icone: lucide:triangle-alert` — the exact pairing
session 1 uses on `avant-chaque-photo` and `autofocus`, both "don't let this trip you up"
moments, which is what all three of these are.

- `le-raisonnement`: the existing `corps` line "Ce que ça coûte : du bruit, de la perte de
  détail fin, une dynamique réduite." becomes the `encadre`. The `aparte` keeps only "Activez
  l'ISO automatique avec une limite haute — 3200 ou 6400 selon votre appareil."
- `qui-decide-quoi`: `aparte` keeps only the `Av`/`A`, `Tv`/`S` synonym sentence. The Fujifilm
  exception and "section 1" pointer becomes the `encadre`.
- `l-effet-secondaire`: the current `⚠️ **L'ouverture n'est pas la mise au point.**` aparte
  becomes the `encadre`, verbatim minus the hand-typed emoji (the `icone` field renders the
  warning glyph).

## Risks / Trade-offs

- [Splitting two screens grows bloc `vitesse` and bloc `exposition` by one screen each, shifting
  every later screen's deep link and position indicator] → Session 1 absorbed the same effect
  from its own precedent splits without incident; no external link depends on a mid-lesson
  screen's exact position.
- [`vos-reponses`'s claim ("Il n'y a pas toujours une seule bonne réponse.") no longer sits next
  to the four situations, only next to the answer table] → Acceptable: the activité screen
  states the four situations plainly, and the point about multiple valid answers is more useful
  attached to the table where the room can see it demonstrated (concert sombre has two valid
  answers listed) than as an abstract aside before the answers exist.
