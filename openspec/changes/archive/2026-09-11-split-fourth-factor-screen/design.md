## Context

See `proposal.md` for the motivation. This document pins down the exact content so `tasks.md`
is pure execution: which screens get which id, order, and copy, in
`src/src/content/lecons/1.yaml`, bloc `profondeur-de-champ` (screen `le-quatrieme-facteur`) and
bloc `ouverture` (screen `demo-ouverture-et-fond`).

## Goals / Non-Goals

**Goals:**
- Fix the exact `id`, `titre`, `claim`, `corps`, `encadre`, `ton` for the three replacement
  screens, and for the rewritten `demo-ouverture-et-fond`, so no wording decision is left open
  for the apply step.
- Decide what happens to every field of the current `le-quatrieme-facteur` screen (nothing is
  silently dropped without a stated reason).

**Non-Goals:**
- No new photographs beyond the existing `l1-pdc-fond-colle` / `l1-pdc-fond-loin` pair — this
  change only relocates an already-declared, already-`essentiel` comparison series.
- No change to the aperture series' own images, `reglages`, or `priorite` in
  `demo-ouverture-et-fond`.
- No change to any other screen in either bloc, and no change to `lecon.ts`, the `Ecran`
  layout, or the `Demonstration`/`EmplacementDemo` components — this is a content-only change,
  which is why `skip_specs: true` holds.

## Decisions

### 1. Screen ids and order

Replace `le-quatrieme-facteur` in place, in `profondeur-de-champ`, with three screens in this
order:

```
le-probleme            (panneau, static)
la-solution             (panneau, static)
exemple-fond-flou       (demonstration)
```

Rename `demo-ouverture-et-fond` (bloc `ouverture`) to `demo-ouverture`.

Rationale: the prior change `align-ecran-ids-with-titles` established that an écran id is
expected to describe current content, since it doubles as the screen's URL segment
(`/lecons/${numero}/${bloc.id}/${ecran.id}`) and stale ids are "a small maintenance trap for
anyone reading the source later." `demo-ouverture-et-fond` naming "et-fond" would be false the
moment its background-distance series leaves; renaming it is the same kind of cosmetic,
non-breaking rename that change already precedents (no participant navigates by memorized
screen URL — the slideshow is used sequentially). Alternative considered: keep the old id to
minimize the diff — rejected because it would immediately reintroduce the exact staleness the
prior change was written to eliminate.

### 2. `le-probleme` — merges states 1 ("Le quatrième facteur") and 2 ("Le malentendu")

```yaml
- id: le-probleme
  genre: panneau
  titre: Le problème
  claim: La distance entre votre sujet et le fond ne change pas la zone nette. Elle change
    tout au flou du fond.
  corps: |
    Ce quatrième facteur est d'une autre nature que les trois autres : il **ne modifie pas**
    l'épaisseur de la zone nette, mais **plus l'arrière-plan est loin en dehors de cette
    zone, plus il paraît flou**.
  encadre: |
    **`f/1.8` ne garantit pas un arrière-plan flou.** Si le mur derrière votre sujet est dans
    la zone nette, ou juste à côté, aucune ouverture n'y change grand-chose.
  ton: neutre
```

Rationale: `claim` and `corps` are the current écran-level fields, carried over unchanged —
they were already a neutral statement of the factor, not part of what needed restating. The
`encadre` restates the current état-2 encadré, generalized from a specific anecdote ("le mur
derrière votre sujet **était** dans la zone nette... aucune ouverture au monde **n'y aurait
changé**") to a plain, present-tense problem statement, and drops `ton: avertissement` for
`ton: neutre` (no `icone`) per your instruction to restate this plainly rather than as a
flagged warning. The état-2 `aparte` ("beaucoup achètent un objectif lumineux...") is dropped
per the proposal — it editorializes about photographer behavior rather than stating the
problem.

Alternative considered: reshape as a `Problème | Pourquoi | Comment faire` table, matching the
two sibling screens `trois-frustrations` and `paysage-deux-causes` earlier in the same bloc.
Rejected: those tables each cover several short, independent scenarios; this screen is one
deeper claim that needs its explanation read in order before the punchline, which is what its
existing prose already does — reshaping it into a table would lose that.

### 3. `la-solution` — state 3 ("La solution"), given its own claim

```yaml
- id: la-solution
  genre: panneau
  titre: La solution
  claim: Éloignez votre sujet du fond, ou rapprochez-vous de lui.
  corps: |
    Ce n'est pas un réglage : c'est une position. Le fond ne se floute pas parce que
    l'objectif est lumineux, mais parce qu'il est loin **derrière** la zone nette — et vous
    choisissez cette distance en bougeant.
  encadre: |
    **Éloignez votre sujet du fond, ou rapprochez-vous de lui.** C'est gratuit, et ça marche
    mieux qu'un objectif à mille dollars.
  ton: regle
```

Rationale: the current état 3 has no `claim` of its own (it inherits the écran-level claim,
which is now `le-probleme`'s), so a standalone screen needs one — restating the encadré's own
opening sentence as the claim keeps it exact rather than inventing new wording. `corps` is new:
one sentence naming the mechanism (position, not a setting) so the screen isn't only a callout
— matching the static-panel convention used throughout this file (e.g. `mise-au-point-ou-profondeur-de-champ`,
`autofocus`: `claim` + `corps` + `encadre`). The encadré's "objectif à mille dollars" line is
kept verbatim: it is the rule's own punchline, not an aside.

### 4. `exemple-fond-flou` — the moved comparison series

```yaml
- id: exemple-fond-flou
  genre: demonstration
  titre: Collé au mur, ou loin derrière
  claim: Même objectif, même ouverture. Seule la distance entre le sujet et le fond change.
  series:
    - variable: la distance entre le sujet et le fond
      constantes:
        ouverture: f/5.6
        focale: 50 mm
        distance au sujet: 2 m
      legende: Avec le même objectif — la preuve qu'il n'y a rien à acheter. Celle qui
        démonte le mythe du f/1.8.
      images:
        - id: l1-pdc-fond-colle
          specification: 50 mm, f/5.6 · sujet collé au mur · photographe à 2 m
          valeur: sujet collé au mur
          priorite: essentiel
          reglages: { fond: collé, ouverture: f/5.6, focale: 50 mm }
        - id: l1-pdc-fond-loin
          specification: 50 mm, f/5.6 · sujet à 3 m du mur · photographe à 2 m
          valeur: sujet à 3 m du mur
          priorite: essentiel
          reglages: { fond: 3 m, ouverture: f/5.6, focale: 50 mm }
```

Rationale: `constantes`, `legende`, and both `images` (including their `id`s, so the shot list
in `demo-media` keeps tracking the same declared slots rather than orphaning one pair and
declaring new ones) move verbatim — the proposal's "moves the series" is literal, not a
re-shoot. `titre` follows the contrastive-pair naming already used by sibling demonstration
screens (`Nette et bruitée, ou propre et floue`) rather than a generic label like "Le fond, en
photos". `claim` mirrors the existing sibling pattern for a single-variable series (`La série
la plus importante`: "Même objectif, même ouverture. Seule la distance change.") — every
demonstration screen in this project carries a `claim`, so this one does too.

### 5. `demo-ouverture` (renamed from `demo-ouverture-et-fond`) — aperture-only

```yaml
- id: demo-ouverture
  genre: demonstration
  titre: L'ouverture, en photos
  claim: Même sujet, même distance, même focale. Seul le chiffre `f/` change.
  series:
    - variable: l'ouverture
      constantes:
        sujet: le même
        distance: 2 m
        focale: 50 mm
      legende: Celle que vous attendez, et la moins surprenante des trois.
      images:            # unchanged: l1-pdc-ouverture-18 / -56 / -11, as today
        ...
  # aparte: dropped — see rationale
```

Rationale: `titre`/`claim` are rewritten because the current ones ("L'ouverture, et la distance
au fond" / "L'une demande un réglage. L'autre ne demande que de bouger.") explicitly contrast
two factors that no longer both live here. The current `aparte` ("La deuxième série s'obtient
avec l'objectif que vous avez déjà. Sans elle, la moitié de la salle conclut de la première
qu'il lui faut acheter un objectif.") is about the series being removed; its substance — you
don't need to buy a lens — already survives on `la-solution`'s encadré, so it is dropped rather
than reworded, instead of leaving a screen that gestures at a comparison no longer beside it.

## Risks / Trade-offs

- [Downgrading `le-probleme` from `ton: avertissement` to `ton: neutre` removes the flagged
  visual callout style (icon-eligible tone) for this myth] → Acceptable: this was the explicit
  ask (restate plainly, not as a warning); the claim itself is unchanged and still bolded in the
  encadré, so the content's weight on screen is the same, only its framing as "beware" vs "here
  is the fact" changes.
- [The bloc `profondeur-de-champ` grows from 8 to 10 screens, shifting the on-screen position
  counter for every screen after it in the lesson] → Already called out in the proposal;
  positions are computed from list order (`lecon.ts`'s `aplatir`), not stored, so nothing needs
  updating beyond the yaml content itself.
- [`demo-ouverture` now shows only one series (3 images) where it used to show two] → Intended
  outcome, not a regression: each demonstration screen now varies exactly one thing, which is
  what the `demo-media` spec already asks of a comparison series — this screen was previously
  carrying two independent series under one claim written to bridge both.

## Migration Plan

Single-file content edit, no runtime migration: replace the `le-quatrieme-facteur` entry with
the three new entries (same position in the bloc's `ecrans` list), and edit
`demo-ouverture-et-fond` in place (including its `id` key) in
`src/src/content/lecons/1.yaml`. No other file changes. Reversible by reverting that one
commit.
