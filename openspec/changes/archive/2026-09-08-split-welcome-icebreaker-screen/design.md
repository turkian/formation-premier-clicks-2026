## Context

See proposal.md - Why. The `repere` genre's `variante` enum
(`content.config.ts` → `ecranRepere.variante`) currently has five values, each with a fixed badge
in `Repere.astro`'s `ÉTIQUETTES` map, and `ouverture` additionally carries the block's "Bloc N sur
M" position indicator. The scannable-code rule (`porteLeCodeQr` in `lecon.ts`) is duplicated as a
build-time check in `verifier.mjs` (`verifierCodesQr`), which reads the rendered DOM back out
rather than importing `porteLeCodeQr` — the two must be kept in sync by hand.

## Goals / Non-Goals

**Goals:**
- Give the icebreaker exercise its own screen without borrowing the `ouverture` badge, which
  would make two consecutive screens both read "Bloc 1 sur 7".
- Keep the QR/no-QR rule expressed in exactly the concepts the spec already uses (block opener,
  « appareil en main », now also `activite`), in both places it's enforced.

**Non-Goals:**
- Generalizing `activite` into a full new screen genre. Only one such exercise exists in the
  content today (`docs/` shows no other icebreaker-style, camera-free participant activity that
  needs its own screen); a fifth `variante` on the existing `repere` genre is the smaller change
  and the existing precedent (`ateliers` bloc in `2.yaml` already pairs a `repere`/`ouverture`
  framing screen with a separate activity screen, there via `appareil-en-main`).
- Rewording the icebreaker's copy beyond what the split requires (see tasks.md for the literal
  text move).

## Decisions

**`activite` as a `repere` variante, not a new genre.** The screen has no diagram, no
photographs, no interactive component, and no camera gestures — it's a claim, a body, and an
aside, exactly the shape `ecranRepere` already provides. Reusing the genre avoids adding a sixth
branch to the `ecran` discriminated union and to every component that switches on `genre` for one
screen.

**Badge label: "Activité".** Matches the terse, single-word style of the existing labels
(`Pause`, `Vos questions`, `On enchaîne`, `Pour finir`).

**QR code extended to `activite`.** Per the spec delta: during this screen the room is turned
toward tablemates, not the projector, mirroring the rationale already documented in `lecon.ts`
for `appareil-en-main`. Both `porteLeCodeQr` (`lecon.ts`) and the independent build-time check in
`verifier.mjs` need the added condition — they currently express the same rule twice, and this
change doesn't collapse that duplication (out of scope: see Non-Goals), it only keeps both copies
correct.

**Screen split point.** The three framing bullets stay under `bienvenue`; everything from "À
votre table, chacun se présente aux autres" onward (including the numbered questions and the
`aparte` about the third one) moves to the new `tour-de-table` screen, its own `claim` stating the
instruction directly rather than inheriting `bienvenue`'s claim.

## Risks / Trade-offs

- **Two places encode the QR rule** (`lecon.ts` and `verifier.mjs`) → both are touched in the
  same change; `verifier.mjs` (build check) will fail loudly if one is missed, so the risk is
  caught before merge, not silently.
- **A `variante` used by exactly one screen today** → acceptable per Non-Goals; if a second
  camera-free exercise shows up in a future séance, it reuses `activite` rather than prompting
  another enum addition.
