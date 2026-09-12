## Context

See `proposal.md` for the motivation. This document pins down the exact content so `tasks.md`
is pure execution: the new `claim`, `corps`, and `encadre` for the single screen `la-solution`,
in `src/src/content/lecons/1.yaml`, bloc `ouverture-et-profondeur-de-champ`.

For reference, the current screen:

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

## Goals / Non-Goals

**Goals:**
- Fix the exact `claim`, `corps` (the table), and `encadre` for `la-solution`, so no wording
  decision is left open for the apply step.
- Keep the screen a static panel (no `etats`) with exactly one callout, per the `lessons`
  requirement already governing this screen's shape.

**Non-Goals:**
- No change to `le-probleme` or `exemple-fond-flou` — confirmed in the proposal, restated here
  because it bounds every decision below (nothing here may lean on rewording either neighbor).
- No change to `les-quatre-leviers` or `ce-qui-change-l-epaisseur` (the screens that first
  introduce the four levers and how each affects zone thickness) — this screen reuses their
  vocabulary, it does not re-derive or restate their explanations.
- No new diagram or schema — the table is the only new visual element, and `Panneau.astro`
  already renders an arbitrary markdown table as a static panel's `corps`.

## Decisions

### 1. Table orientation: lever as row, goal as column

```yaml
corps: |
  | Levier | Fond flou | Fond net |
  |---|---|---|
  | **Ouverture** | ouvrez (`f/1.8`) | fermez (`f/11`) |
  | **Distance au sujet** | rapprochez-vous | éloignez-vous |
  | **Focale** | zoomez | dézoomez |
  | **Distance du fond** | éloignez-le du sujet | rapprochez-le du sujet |
```

Rationale: a goal-as-row layout (`Fond flou` / `Fond net` as the two rows, one column per lever)
would be five columns wide — wider than any table in the three lessons today (the current widest,
in `lecons/3.yaml`, is four columns: `Destination | Format | Qualité | Dimensions`). `Panneau.astro`
optimizes for being read "depuis le fond de la salle"; an unprecedented five-column table is a
real readability risk on a 4:3 projector. Lever-as-row keeps it to three columns and directly
mirrors `ce-qui-change-l-epaisseur` three screens earlier in the same bloc (also lever-as-row,
also bold row labels), so it reads as a familiar shape rather than a new kind of table.

Row order follows `les-quatre-leviers`' own order (ouverture, distance au sujet, focale, distance
du fond) rather than alphabetical or "easiest first" — reusing an order the room already saw
keeps the two screens' four-item lists recognizable as the same list. `Distance du fond` is last
because it is the lever `le-probleme`, the immediately preceding screen, just spent its own claim
on — ending the table there gives the most recently taught idea the strongest position (last row,
read last) instead of burying it first.

Alternative considered: two separate two-column tables (one per goal), stacked. Rejected — it
would repeat the four lever names twice and cost roughly double the vertical space for no added
clarity, working against the "~100 words plus a table" budget for a concept panel.

### 2. Aperture values reuse the exact numbers already photographed

`ouvrez (`f/1.8`)` / `fermez (`f/11`)` cite the two extremes of `demo-ouverture`'s own photo
series a few screens later in the `ouverture` bloc (`f/1.8` / `f/5.6` / `f/11`), rather than
generic instructions ("ouvrez" / "fermez" with no number, or different numbers). When the room
reaches `demo-ouverture`, the numbers on screen will already be familiar from this table instead
of being introduced cold.

Alternative considered: no numbers, verbs only (`ouvrez` / `fermez`), matching the three
distance-based rows exactly (which carry no numbers either, since "how far" is not fixed).
Rejected: aperture is the one lever in this table with a concrete, reusable on-screen number
already in this lesson; leaving it bare would be consistent but would waste that connection.

### 3. `claim` names the reversibility directly, reusing "leviers" vocabulary

```yaml
claim: Les quatre leviers marchent dans les deux sens : le même geste qui floute le fond peut aussi le garder net.
```

Rationale: this is the one new idea this screen adds on top of what `les-quatre-leviers` and
`ce-qui-change-l-epaisseur` already taught — not "here are four levers" (already known) but
"each one is reversible depending on what you want." Reusing "leviers" rather than inventing new
vocabulary ("facteurs", "réglages") keeps it addressable as the same four things introduced
earlier in the bloc.

Alternative considered: keep a single-instruction claim (as today) and let the table carry the
"two goals" idea silently. Rejected — a claim is meant to be readable from the back of the room
standing alone (per this project's three-tier typography rule); "éloignez votre sujet du fond, ou
rapprochez-vous de lui" as a claim above a table that also covers ouverture and focale would
misdescribe the table sitting right under it.

### 4. `corps` is the table alone, no lead-in sentence

No prose precedes the table in `corps` — it starts directly with the table markdown, matching
`trois-frustrations` and `paysage-deux-causes` (both: `corps` is a table with no introductory
sentence, because the claim already frames it).

Alternative considered: one lead sentence before the table (e.g. "Chaque levier, dans un sens ou
dans l'autre :"). Rejected as redundant — the claim already states the reversibility; repeating it
in `corps` would spend words without adding information, working against the ~100-word budget.

### 5. `encadre` replaces the "free vs. expensive lens" framing with a knowledge framing

```yaml
encadre: |
  Vous n'avez peut-être pas besoin d'un nouvel objectif : vous avez besoin de comprendre
  comment il fonctionne.
```

Rationale: this is the explicit rewrite requested — the current encadré pits distance (free)
against aperture (an objectif à mille dollars), which now sits awkwardly beside a table that
treats aperture as one legitimate lever among four rather than the thing to avoid buying. The new
line subordinates gear to understanding without dismissing aperture as a lever the table itself
just listed. `ton: regle` is unchanged — it is still the screen's one callout, carrying the
takeaway a participant should leave with.

Alternative considered: keep an explicit "distance is free" line alongside the new framing.
Rejected — the point of dropping it was to stop ranking the levers against each other by cost; a
softened version of the same ranking would partially reintroduce what the rewrite is meant to
remove.

## Risks / Trade-offs

- [The table asks a reader to hold four rows × two columns in mind, denser than the single
  sentence it replaces] → Acceptable and intended: the proposal's own justification is that the
  single sentence was incomplete (silent on aperture, focale, and the inverse goal); the table is
  the minimum shape that covers both goals across all four levers without repeating itself.
- [`Distance du fond`'s cell wording ("éloignez-le du sujet" / "rapprochez-le du sujet") reads
  slightly differently from the other three rows, which are single verbs] → Acceptable: the
  background is the grammatical object here ("le" = le fond), not the person being instructed,
  so a single bare verb would be ambiguous about what moves; the current `la-solution` claim
  already uses this same slightly longer phrasing ("Éloignez votre sujet du fond").
- [Reusing `f/1.8` / `f/11` here duplicates numbers that also appear in `demo-ouverture`] →
  Intended, not a duplication problem: these are stable facts about the lesson's own lens/demo
  setup restated at their point of use, not two independent sources of truth that could drift
  apart from each other.

## Migration Plan

Single-file content edit, no runtime migration: replace `la-solution`'s `claim`, `corps`, and
`encadre` in place (same position in the bloc's `ecrans` list, same `id`/`titre`/`genre`/`ton`) in
`src/src/content/lecons/1.yaml`. No other file changes. Reversible by reverting that one commit.
