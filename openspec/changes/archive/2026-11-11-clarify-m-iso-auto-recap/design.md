# Design

## Context

The change touches one recap panel (see proposal.md - Why). On a screen, the projected headline
is the `claim`. The `titre` only appears in the browser tab and in the session's list of screens,
so the room never sees it. The design records the wording choices so that a later edit does not
undo them without seeing why.

## Goals / Non-Goals

**Goals:**

- Correct the « `M` = manuel » reading in the projected headline, where the room reads it.

**Non-Goals:**

- Matching the session 2 screen `m-et-iso-auto`. Session 2 has been given, so the recap will no
  longer use the same title as that screen. This is accepted.
- Reworking the « Qui décide quoi » table on the « Avant de déclencher » sheet.

## Decisions

1. **The headline names the kind of mode, not the letter.** Claim: « Un mode à moitié
   automatique : vous gardez l'ouverture et la vitesse, l'appareil choisit l'ISO. » Title:
   « Un mode à moitié automatique ».
   - *Rejected, after seeing it projected:* « Sur la molette, c'est `M`. Avec l'ISO auto, vous
     gardez… » with the title « M, mais pas tout manuel ». The correction was only in the title,
     which is not projected. The headline opened on a large monospace `M`, so the slide still read
     as "the manual slide".
   - *Rejected:* a headline that negates `M` (« Avec l'ISO auto, `M` n'est plus du manuel »).
     The letter would still be the first thing read.
   - « À moitié automatique » also describes `A` and `S`, where the camera keeps one choice. That
     is accurate: the difference is how many choices the photographer keeps, and the list says it.

2. **`M` goes in the body, as where to find the mode.** A line after the list: « Sur la molette :
   `M`, avec l'ISO auto. » Participants still have to find `M` on the dial. In the body, at the
   middle text size, it reads as a location rather than as the meaning of the mode.

3. **« choisit l'ISO » rather than « règle le volume ».** The volume image belongs to the ISO
   panel just before. Without that panel next to it, « le volume » leaves the reader to work out
   that it means the ISO. The headline says it directly.

4. **No « vrai manuel » line.** Adding « Avec un ISO fixe, là, c'est du vrai manuel » would show
   the whole range of modes. It was left out: this is a recap panel with a word budget, and the
   fixed-ISO case is not something the session asks participants to use.

5. **Keep the `id`.** The URL ends in `rappel-m-iso-auto`. Links and printed references may point
   to it, and the id is not displayed.

## Risks / Trade-offs

- [The headline is longer and wraps to more lines in 4:3] → `npm run verifier:projection` checks
  the fit at 1024 × 768 and in 16:9.
- [Typography: the `:` in the claim and in the body line needs a thin non-breaking space] → Typed
  with an ordinary space in the YAML; the shared typography utility converts it.
