## Why

In leçon 1, the bloc `profondeur-de-champ` (right after the pause) names aperture as one of
three factors and uses specific f-numbers in its troubleshooting tables (`trois-frustrations`:
"Fermez à `f/2.8` ou `f/4`" from `f/1.8`; `paysage-deux-causes`: "Fermez un peu — `f/5.6` ou
`f/8`") before aperture itself is ever defined. The bloc `ouverture`, which comes after it,
opens with `le-vote` — a hands-up vote on whether `f/2.4` or `f/22` lets in more light, whose
entire payoff is the counter-intuitive fact that a bigger f-number means a smaller hole. By the
time participants reach that vote, two tables have already used "fermer" (close) to mean "go to
a bigger number," so the reveal the vote is built to produce has already partly happened. The
two blocs also each state the "four levers that control blur" (aperture, focus distance, focal
length, background distance): once implicitly across `ce-qui-change-l-epaisseur` /
`le-probleme` / `la-solution` in `profondeur-de-champ`, once explicitly as `les-quatre-leviers`
in `ouverture`.

## What Changes

- Merges the two blocs `ouverture` and `profondeur-de-champ` into a single bloc, ordered so the
  aperture mechanism (what the hole is, the f-number trap, why it is a division, why zooms and
  telephotos are priced the way they are) is taught in full before any screen uses an f-number
  to mean "wider" or "narrower."
- Drops the `profondeur-de-champ` bloc's own opening `repère` ("Quelle épaisseur est nette ?"):
  once merged, `les-quatre-leviers` takes over that transitional role (see design.md), so the
  two back-to-back transition screens collapse into one. Net effect: leçon 1 goes from 40 to 39
  screens.
- Relocates `les-quatre-leviers` from the tail of the old `ouverture` bloc to serve as the
  opening of the merged bloc's second half — the roadmap for "depth of field" once the tool
  that controls it is already understood.
- Relocates the two photo-demonstration screens `demo-ouverture` and `demo-la-distance` so each
  sits immediately after the reveal it proves (aperture's effect, then the distance "invisible
  factor"), instead of both appearing back-to-back near the end of the old `ouverture` bloc.
  Rewrites `demo-la-distance`'s `aparte`, which currently assumes it is shown right after
  `demo-ouverture` — that assumption no longer holds once the two are separated.
- Keeps `tourner-la-molette` (the hands-on aperture-dial exercise) as the bloc's closing screen,
  immediately before `repartir` — unchanged in substance, since it already serves as the
  practical capstone the merge is meant to end on.
- No wording changes to any screen's core claim beyond the one `aparte` above; this is a
  reordering and regrouping of existing screens, not a rewrite of their content.

## Capabilities

### New Capabilities
_None._

### Modified Capabilities
_None._ This reorders and regroups existing screen kinds (concept panel, demonstration,
interactive, repère, appareil en main) already covered by the `lessons` spec; no new screen
kind, field, or behavior is introduced. `skip_specs: true` is set accordingly.

## Impact

- Content: `src/src/content/lecons/1.yaml`
  - Blocs `ouverture` and `profondeur-de-champ` (currently 8 + 10 = 18 screens) become one bloc
    of 17 screens — 18 minus the one dropped `repère` (see design.md for the exact id, order,
    and the rewritten fields).
  - No change to any screen outside these two blocs, and no change to any demo image's `id`,
    `reglages`, or `priorite`.
- Navigation: leçon 1's total screen count drops from 40 to 39 (one dropped `repère`,
  everything else relocated, none removed). Screen positions (`N / 39`) are computed from list
  order, not stored, so no other file needs updating.
