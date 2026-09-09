## Context

See [proposal.md](proposal.md) for motivation. Relevant existing structure:

- `ou-le-point-a-ete-fait` ([1.yaml](../../../src/src/content/lecons/1.yaml)) is a `demonstration`
  screen: a 3-image `series` (variable: where the AF point landed) plus a loose `images:` list
  holding `l1-hors-focus` and `l1-bouge`, kept out of the series because they vary more than one
  thing at once.
- `deux-flous` ([2.yaml](../../../src/src/content/lecons/2.yaml)) is a `panneau` screen: a
  markdown table contrasting two causes of blur (subject moved vs. photographer moved), with no
  photographs — `panneau` has no image field in the schema, and `lessons/spec.md` requires
  demonstrations to live on their own screen regardless.
- `emplacementDemo` (`content.config.ts`) already supports a bare `fichier`/`specification` pair
  with no series membership, which is the shape both moved/added images use here.

## Goals / Non-Goals

**Goals:**
- Each screen's photographs match its own stated claim: `ou-le-point-a-ete-fait` is only about
  where focus landed; the new lesson-2 screen is only about which kind of blur occurred.
- Reuse `l1-bouge` as-is (same file, same specification) rather than shooting it twice, since it's
  the same photograph fulfilling two legitimate contexts.
- Declare the missing "subject-blur" slot so `deux-flous`'s own table has a photographic backing,
  closing the gap already named essential in `demo-media/spec.md`.

**Non-Goals:**
- No schema change (`content.config.ts` is untouched — the `panneau` genre still carries no image
  field; `demonstration` already supports everything needed).
- No change to `Panneau.astro` or `Demonstration.astro` rendering.
- Not attempting to also resolve the `interactive` screen `explorer-le-mouvement` — it already
  covers the same distinction live, and this change doesn't touch it.

## Decisions

**A new `demonstration` screen, not images inside `deux-flous`.** Considered adding an optional
`images` field to `ecranPanneau` instead — rejected: no other panel anywhere carries a photo, and
`lessons/spec.md:68-71` already requires demonstrations to be separate screens "so that both keep
full usable space." Converting `deux-flous` itself to `genre: demonstration` was also considered
and rejected — it would drop the comparison table, which is the panel's actual teaching device, or
force a partial rebuild for no benefit.

**Placement: immediately after `deux-flous`, before `explorer-le-mouvement`.** The table names the
distinction, the new screen shows it, the interactive lets participants produce it themselves — the
existing reading order in the block already matches this progression once the new screen is
inserted.

**New screen identity:**
- `id: deux-flous-en-images`
- `genre: demonstration`
- `titre: Les deux flous, en images`
- `claim: Un sujet flou sur un décor net. Une image entièrement floue. Ce n'est pas le même flou.`
- `images:` (no `series:` — the two images differ in more than the one variable a series requires,
  same reasoning as the pair being split out of lesson 1)
  - `l1-bouge` — unchanged: reused with its existing `specification`, `valeur`, and `priorite:
    essentiel`.
  - a new slot, id `l2-sujet-bouge` — `specification: Sujet en mouvement, décor net · vitesse
    insuffisante pour le figer`, `valeur: c'est le sujet qui a bougé — le décor est net`, `priorite:
    essentiel`.

**`l1-hors-focus` stays in lesson 1, not lesson 2.** It's a focus-placement failure (the AF point
locked onto the wrong thing), not a motion failure — it doesn't belong on a screen about "who
moved." It becomes the loose `images:` list's only entry on `ou-le-point-a-ete-fait`, still outside
the 3-image series for the same reason as before (its `reglages` vary more than the series' single
declared variable).

## Risks / Trade-offs

- **A beginner could still confuse "subject motion blur" with "out-of-focus subject"** — both show
  a blurred subject against a sharp décor, and the two failure modes now live in different lessons.
  Mitigation: this is a pre-existing risk, not one this change introduces; `deux-flous`'s own claim
  (« Le sujet a bougé, ou c'est vous ») and the new screen's claim both name the actual cause, and
  resolving the two-screen distinction further is out of scope here.
- **`l1-bouge` now serves two contexts (lesson 1's shot list, conceptually, and lesson 2's
  screen)** — since it's being removed from lesson 1 entirely rather than kept in both places, in
  practice it's just relocated, not duplicated; no shot-list entry ends up declared twice.

## Migration Plan

Content-only change, no build/runtime migration. Order of edits (also see tasks.md):
1. Add the new `deux-flous-en-images` screen to `2.yaml` first (so `l1-bouge` exists somewhere at
   every point in the edit sequence).
2. Remove `l1-bouge` and the obsolete series-comment from `1.yaml`.
3. Run the project's content build/validation (`check-screens.mjs` and equivalent) to confirm no
   broken references remain.
