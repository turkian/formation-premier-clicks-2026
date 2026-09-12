## Context

See `proposal.md` for the motivation. This document pins down the exact content so `tasks.md`
is pure execution: the merged bloc's identity, the full screen order, and every field that
needs rewording because its surrounding screens changed — in `src/src/content/lecons/1.yaml`,
blocs `ouverture` (lines 470–656) and `profondeur-de-champ` (lines 308–467) as they stand today.

## Goals / Non-Goals

**Goals:**
- Fix the merged bloc's `id`, `titre`, `resume`, and the exact order of its 17 screens, so no
  sequencing decision is left open for the apply step.
- Identify every field whose wording depends on screen adjacency that this merge changes, and
  decide new wording for each — nothing is silently left stale.

**Non-Goals:**
- No change to any screen's `claim`, `corps`, table, schema, or image `reglages` beyond the
  fields listed in Decision 4 below. This is a reordering and regrouping change, not a rewrite.
- No new photographs, no change to any `l1-*` image id or its `priorite`.
- No change to any other bloc in leçon 1, or to `lecon.ts`, `Ecran`, `Demonstration`, or any
  other component — content-only, which is why `skip_specs: true` holds.

## Decisions

### 1. Merged bloc identity

```yaml
- id: ouverture-et-profondeur-de-champ
  titre: L'ouverture et la profondeur de champ
  resume: Ce que change le trou de l'objectif — la lumière, et l'épaisseur de ce qui est net.
```

Rationale: keeping the `id` as bare `ouverture` would misdescribe roughly half the bloc's
content (the four-lever / depth-of-field material), the same staleness problem
`align-ecran-ids-with-titles` and `split-fourth-factor-screen` were each written to avoid. The
compound id costs nothing — no participant navigates by memorized screen URL, the slideshow is
used sequentially — and it names the bloc for what it now is: one continuous explanation from
"what the hole is" to "what you do with it." `resume` is rewritten to cover both halves; the two
current resumes (`Une question d'abord, la règle en conclusion.` / `L'épaisseur de la zone
nette, et les quatre choses qui la changent.`) each described only one half.

Alternative considered: keep `id: profondeur-de-champ` (the more "final destination" of the two
topics) — rejected because the bloc opens on aperture's mechanism for four full screens before
depth of field is even named, so leading with that id would misdescribe the opening the same way
`ouverture` alone would misdescribe the close.

### 2. Screen order — 17 screens, one dropped

```
1.  ouverture                     (repère)         — unchanged, from ouverture
2.  le-vote                       (panneau)        — unchanged, from ouverture
3.  le-f-est-une-division         (interactif)     — unchanged, from ouverture
4.  deux-retombees                (panneau)        — unchanged, from ouverture
5.  les-quatre-leviers            (panneau)        — unchanged content, from ouverture
6.  la-definition                 (panneau)        — unchanged, from profondeur-de-champ
7.  ce-qui-change-l-epaisseur     (panneau)        — unchanged, from profondeur-de-champ
8.  demo-ouverture                (demonstration)  — legende rewritten, from ouverture
9.  le-facteur-invisible          (panneau)        — unchanged, from profondeur-de-champ
10. demo-la-distance              (demonstration)  — titre/legende/aparte rewritten, from ouverture
11. explorer-la-zone-nette        (interactif)     — unchanged, from profondeur-de-champ
12. trois-frustrations            (panneau)        — unchanged, from profondeur-de-champ
13. paysage-deux-causes           (panneau)        — unchanged, from profondeur-de-champ
14. le-probleme                   (panneau)        — unchanged, from profondeur-de-champ
15. la-solution                   (panneau)        — unchanged, from profondeur-de-champ
16. exemple-fond-flou             (demonstration)  — unchanged, from profondeur-de-champ
17. tourner-la-molette            (appareil-en-main) — unchanged, from ouverture
```

Dropped: `profondeur-de-champ`'s current opening `repère` (`id: ouverture`, `titre: La
profondeur de champ`, `claim: Quelle épaisseur est nette ?`) — 18 screens minus this one gives
17.

Rationale for the drop: that screen's only job was to open the second topic with a question. In
the merged bloc, `les-quatre-leviers` (item 5) already does that job one screen later — it opens
with "Pour contrôler ce qui est flou, vous avez quatre leviers," which poses the same "what
makes things sharp or not" question `Quelle épaisseur est nette ?` was asking, but does it while
also handing the room the roadmap for the rest of the bloc. Keeping both would put two
transition screens back to back, which is the exact "restart the chapter" feeling this merge is
meant to remove.

Rationale for where `les-quatre-leviers` and the demo screens land: `les-quatre-leviers` slots in
right where the dropped repère used to sit — no additional decision needed, it already occupied
that position in the old `ouverture` bloc's own sequence (item 5 of 8, right after the
mechanism screens). `demo-ouverture` moves to sit immediately after `ce-qui-change-l-epaisseur`,
the screen that first names aperture as a factor — so the photographic proof lands right beside
the claim it proves, matching the precedent `split-fourth-factor-screen` set for
`exemple-fond-flou`. `demo-la-distance` moves the same way, immediately after
`le-facteur-invisible`'s numeric reveal.

Alternative considered: keep all three demonstration screens (`demo-ouverture`,
`demo-la-distance`, `exemple-fond-flou`) grouped as a trio, just relocated together to the very
end of the merged bloc, right before `tourner-la-molette` — minimizes rewriting, since none of
their "des trois" (of the three) phrasing would need to change. Rejected: it would keep the
exact structural flaw this change exists to fix elsewhere in the lesson — proof separated from
the claim it backs by several intervening screens, which is precisely what
`split-fourth-factor-screen` already fixed for the fourth factor. Pairing each demo with its own
reveal is more rewriting up front but is the whole point of the merge for these two screens.

### 3. `les-quatre-leviers` — moved verbatim, no rewrite

Its `claim`, `corps`, `schema`, and `aparte` all still read correctly at its new position:
`corps`'s closing line ("C'est le message à retenir du bloc, davantage que la mécanique de
l'ouverture") reads even better as an opener now — it explicitly frames what follows as more
important than the mechanics the room just finished learning. Its `aparte` ("Ceux qui avaient
répondu `f/22` tout à l'heure ne le rediront plus jamais") still refers back to `le-vote`, which
still precedes it in the same bloc. No field changes.

### 4. Fields that must change because their neighbors changed

Two demonstration screens currently word themselves as part of a trio shown back to back
(`demo-ouverture`, `demo-la-distance`, `exemple-fond-flou`, all near the end of the old
`ouverture` bloc). Once split apart, three phrases stop being true:

**`demo-ouverture`** — `legende` currently reads "Celle que vous attendez, et la moins
surprenante des trois." (comparing it to the other two, implying a viewing order). New:

```yaml
legende: Rien de surprenant ici : plus le trou est grand, plus le fond se dissout.
```

Rationale: keeps the same substance (this is the expected, unsurprising factor) without a
comparison to demos that no longer sit beside it.

**`demo-la-distance`** — three fields reference the trio:
- `titre: La série la plus importante` — kept as-is. It still reads correctly standing alone:
  the distance effect is the lesson's single most surprising demonstration on its own merits,
  not only by comparison to its former neighbors.
- `legende` currently: "C'est la série la plus importante des trois : elle montre le facteur
  invisible. Le même réglage donne un fond fondu dans un cas et un fond parfaitement lisible
  dans l'autre." New:

```yaml
legende: >-
  Elle montre le facteur invisible : le même réglage donne un fond fondu dans un cas et un
  fond parfaitement lisible dans l'autre.
```

- `aparte` currently: "Si une seule série pouvait être préparée, ce serait celle-là. L'effet de
  l'ouverture, vous le verrez vous-même dans trois minutes en manipulant votre appareil. L'effet
  de la distance, non — il faut vous le montrer." The "dans trois minutes" promise was true when
  `tourner-la-molette` sat two screens later (old `ouverture` bloc); in the merged order,
  `tourner-la-molette` is now the bloc's closing screen, six screens after `demo-la-distance`
  (items 11–16 intervene). New:

```yaml
aparte: |
  Si une seule série pouvait être préparée, ce serait celle-là. L'effet de l'ouverture, vous le
  sentirez vous-même plus tard dans ce bloc, en manipulant votre appareil. L'effet de la
  distance, non — il faut vous le montrer maintenant.
```

Rationale: keeps the contrast the aparte exists to make (aperture: you'll feel it hands-on;
distance: it must be shown) without a timing claim ("trois minutes") the new position no longer
supports.

No other screen's fields reference position, order, or adjacency, so no further rewrites are
needed — confirmed by re-reading every `claim`, `aparte`, and `legende` in both blocs against
the new order in Decision 2.

## Risks / Trade-offs

- [The merged bloc runs 17 screens, longer than any other single bloc in leçon 1] → Acceptable
  and intended: the proposal's motivation is specifically that these two topics are one
  continuous idea (tool, then its effect), and the `lessons` spec's block/screen requirements
  place no upper bound on screens per bloc — only screens per lesson, which this change reduces.
- [`les-quatre-leviers`' `aparte` refers back to `le-vote` across four intervening screens] →
  Unchanged risk from before the merge: it already referred back across four screens in the old
  `ouverture` bloc (items 1→5). Position relative to `le-vote` is identical after the merge.
- [Renaming the bloc `id` changes every screen's URL segment
  (`/lecons/1/ouverture/*` and `/lecons/1/profondeur-de-champ/*` both become
  `/lecons/1/ouverture-et-profondeur-de-champ/*`)] → Same class of change already precedented by
  `split-fourth-factor-screen`'s `demo-ouverture-et-fond` → `demo-ouverture` rename: no
  participant navigates by memorized screen URL, the slideshow is used sequentially.

## Migration Plan

Single-file content edit, no runtime migration: in `src/src/content/lecons/1.yaml`, replace the
two bloc entries `ouverture` and `profondeur-de-champ` with one bloc
`ouverture-et-profondeur-de-champ` containing the 17 screens in the order fixed in Decision 2,
carrying the field rewrites fixed in Decision 4. No other file changes. Reversible by reverting
that one commit.
