## Context

See proposal.md - Why. The rendering path involved is
`Demonstration.astro` (lays out `series[]` and `images[]` as rows of `EmplacementDemo`) and
`lecon.ts`'s `aplatir()` (turns each authored `écran` into one or more `arrêts`/navigation stops —
today, only `panneau` screens with `etats` produce more than one arrêt per écran). Two content-
authoring options were weighed in explore mode: split at author time in the YAML (one écran per
≤3-image group, no engine change) versus auto-paginate at render time (extend `aplatir()` to turn
an oversized `demonstration` écran into multiple arrêts automatically). The author-time option was
chosen (see explore-mode discussion) because it matches the existing precedent
(`ouverture-et-profondeur-de-champ` is already three separate screens) and avoids inventing new,
non-cumulative pagination semantics distinct from the cumulative `etats` model `aplatir()` already
implements for `panneau`.

## Goals / Non-Goals

**Goals:**
- Every demonstration screen in the three lessons shows three or fewer photographs.
- The three-image cap is enforced automatically, not just documented, so it survives future
  content edits.
- Each newly split-off screen reads as a complete, self-sufficient stop (own `claim`), consistent
  with how every other demonstration screen is authored.

**Non-Goals:**
- No change to `Demonstration.astro`, `EmplacementDemo.astro`, `lecon.ts`, or the content schema
  (`content.config.ts`). The screen and series shapes are unchanged; only the number of écrans in
  the four affected blocks changes.
- No automatic/algorithmic pagination. Where a single series itself exceeds three images (the
  lumière-en-images "direction" series), how to group the split (which two images share the first
  screen) is an editorial decision made once, by hand, in the diff — not computed.
- No retroactive relabeling of unaffected screens (e.g. `trois-versions`, at exactly three images,
  is unchanged).

## Decisions

**Author-time split over render-time pagination.** Splitting in the YAML keeps one écran
definition mapping to exactly one arrêt everywhere in the codebase, which is the invariant
`aplatir()` currently relies on for every screen genre except `panneau` states. Introducing
per-genre auto-pagination would mean `demonstration` joins `panneau` as a second genre that can
expand into multiple arrêts, but with opposite semantics (replace vs. accumulate) — two mental
models where the content author currently only has to hold one. The manual split keeps that
invariant intact and matches how a near-identical case (`ouverture-et-profondeur-de-champ`) was
already resolved, by a human, in content.

**Enforcement lives in `verifier-contenu-final.mjs`, not in the Zod schema
(`content.config.ts`).** The three-image cap is a cross-field count (`series[].images.length`
summed with `images.length`), not a shape constraint a single field's Zod type can express
cleanly, and the project's existing convention for this kind of rule (the `soir` check, section
13.5) already lives in this script rather than in the schema. Keeping the count check alongside
that precedent, as a new section, keeps all "written correctly but semantically wrong" checks in
one place. The check counts per `écran` with `genre: demonstration`: `total = images.length +
series.flatMap(s => s.images).length`, and fails when `total > 3`.

**The lumière-en-images 4-image series splits 2+2 as an editorial call, made in this change.**
Per the explore-mode discussion, grouping "frontale + latérale" (common angles) against
"contre-jour + du dessus" (special angles) reads better than a mechanical first-half/second-half
split, but this is a content judgment, not a derivable rule — flagged here so a reviewer knows to
look at it deliberately in the diff, the same way the project already asks a human to adjudicate
each `soir` occurrence rather than silently allow or reject it.

## Risks / Trade-offs

- [Splitting a 4-image series into two screens weakens the "compare all four at a glance" framing
  the original single screen had] → Accepted trade-off per the answer to the explore-mode
  question: legibility of each photograph takes priority over one-glance comparison across four
  images. The two new screens' claims are written to still connect the pair they compare to the
  pair on the sibling screen (e.g., referencing "the other two angles" or similar), so the
  comparison survives across the block even though it no longer fits one screen.
- [New screens mean new deep links; anything that hard-coded the old écran `id` as "the light
  demonstration" now points at only part of it] → No such external reference exists today (QR
  codes and the lesson summary are generated from content, not hand-authored), so this is a
  one-time, self-contained shift with nothing else in the repo to update.
- [The new build-time check could false-positive on a legitimate future screen that needs 4+
  images for some reason not yet anticipated] → The check fails loud and specific (identifies the
  screen), matching the project's stance that this kind of judgment call belongs to a human
  looking at a diff, not a silent pass. If a real exception ever arises, the check can gain the
  same kind of explicit, named exemption the `soir` check already uses for its two allowed
  phrases.

## Migration Plan

1. Add the image-count check to `verifier-contenu-final.mjs` first, run it against current content
   to confirm it flags exactly the four known screens and nothing else.
2. Split each of the four screens in its lesson YAML (`la-lumiere-en-images`,
   `le-cas-du-posemetre`, `avant-apres`, `ou-le-point-a-ete-fait`), authoring a new `claim` for
   each newly created screen.
3. Re-run the full verification suite (`verifier:tout`) and rebuild with
   `SEANCES_TOUJOURS_PRETES=1` to confirm every split screen renders correctly and no longer
   crowds its photographs, at both 4:3 and 16:9.
4. No rollback complexity: this is a content-only change plus one additive check; reverting the
   commit reverts both cleanly.

## Open Questions

- Exact wording of the new `claim` text for each of the five newly created screens is left to be
  written during implementation, following the voice already established by the sibling screens
  in each block (e.g. the `ouverture-et-profondeur-de-champ` screens' claims as a model). This
  does not change the spec, the approach, or the task breakdown — only the copy.
