## Context

See proposal.md - Why. Relevant implementation facts:

- `ProfondeurDeChamp.astro`'s `.visuel` column currently holds one `<svg class="scene-svg" data-scene-pdc">`, drawn top-down on a **logarithmic** distance axis (`enX()`, `MIN=0.2`/`MAX=400`), plus a text `.lecture` readout below it that already states the figures in words. The column's width is fixed by `.composant`'s `grid-template-columns: minmax(0, 19rem) minmax(0, 1fr)` (`interactif.css`); the sidebar (`.commandes`) must not change height or width as state changes — this was a deliberate, hard-won constraint from the `simplify-depth-of-field-simulator` change (log: sidebar height measured at 0px variance across all lever states before that change shipped).
- Background blur is already computed in `dessiner()`: `dehors = max(0, distance + fond − r.lointaine)`, `flou = min(6, sqrt(dehors) * 1.9)` px, applied as `filter: blur()` plus a small opacity reduction on `[data-fond-groupe]`.
- Four other interactive components (`MoletteDesModes`, `VitesseEtMouvement`, `ArbreDeDiagnostic`, `OuvertureDivision`) already implement a two/three-way toggle with the same markup shape: `<div class="segments" role="group" aria-label="…"><button type="button" data-x aria-pressed={…}>…</button>…</div>`, styled by the existing `.segments`/`.segments button` CSS, with a click handler that sets `aria-pressed` on the buttons and re-renders.
- `AppareilPhoto.astro` and `Sujet.astro` (the top-down diagram's shared pieces) use `astro-icon`'s `lucide:*` collection for figures (`lucide:camera`, `lucide:user-round`), styled via `color: var(--texte-2)`/`var(--texte)` — no image assets, nothing that depends on demo photographs.

## Goals / Non-Goals

**Goals:**
- Add the simulated view and its toggle without changing the sidebar's size/behavior or the top-down diagram's existing math, markup, or IDs.
- Keep the simulated view exactly as data-driven as the top-down one: no state the two views could disagree about.

**Non-Goals:**
- Scaling the simulated view geometrically (true relative sizes/positions for subject/background/foreground) — see Decision 1.
- Reworking `.segments` styling or generalizing the toggle pattern beyond this one use.
- Any change to `profondeur-de-champ.ts`'s formulas.

## Decisions

**1. The simulated view is a fixed three-layer composition, not a scaled scene.**
The top-down diagram is geometric on purpose (a log-scale axis so 0.3 m and 300 m can coexist). The simulated view answers a different question — "what does it look like," not "how far is it" — so it does not need scale at all. Foreground, subject, and background are drawn at fixed screen positions/sizes (foreground large and low, subject centered, background small and offset), and only their **blur amount** is computed from live state. This sidesteps every log-scale/clamping concern the top-down view has to handle (e.g., a foreground point at 0.4 × a 0.3 m focus distance would be 12 cm from the camera — meaningless to place accurately on an axis, fine to just draw as "the closest layer").

*Alternative considered*: reuse `enX()` and place foreground/subject/background at their true relative depths, with size scaled by distance (closer = bigger). Rejected — adds real complexity (perspective sizing, occlusion between layers at extreme values) for a screen whose whole point is the qualitative blur/sharp read, not a second geometry lesson; the top-down view already carries the geometry.

**2. Second `<svg>` element, toggled with `hidden`, not one SVG with mode-switched content.**
Add `<svg class="scene-svg scene-pdc-apercu" data-scene-pdc-apercu hidden>` as a sibling of the existing `data-scene-pdc` SVG, same `viewBox="0 0 640 260"` so the `.visuel` column's aspect ratio never changes on toggle. The toggle handler flips `hidden` on both SVGs (and, later, could as easily flip a class) rather than tearing down/rebuilding markup. `rendre()` keeps computing `r` once and calls both `dessiner()` (existing, top-down) and a new `dessinerApercu()` (simulated) every time, regardless of which is visible — simplest correctness argument: both views are always in sync because both are always redrawn, and switching visibility never triggers a recompute or a stale frame.

*Alternative considered*: only draw the hidden view lazily, on first toggle to it. Rejected — the state machine is simpler with "always redraw both" than with "redraw on toggle-in," for a cost (one extra small SVG update per drag) that's irrelevant at this scale.

**3. Toggle reuses the existing `.segments` pattern verbatim, positioned in the format-chip row.**
`<div class="segments" role="group" aria-label="Vue"><button type="button" data-vue="schema" aria-pressed="true">Schéma</button><button type="button" data-vue="apercu" aria-pressed="false">Aperçu</button></div>` (unchanged buttons/attributes), styled by the existing `.segments` CSS with no new rules needed beyond positioning. It shares the row with `.etiquette-format` ("Chiffres pour : …"), right-aligned, rather than owning a row of its own. This reclaims the dedicated `auto` row `.scene-conteneur` gave the toggle when it first shipped: `.scene-conteneur` now only stacks the two SVGs (still both present, still toggled via `hidden`/`toggleAttribute`, still both redrawn on every `input`) — its `grid-template-rows` collapses to a single row. Default state on load is still `schema`; nothing about the toggle's mechanism changes, only its position. This is the same control shape already used four times elsewhere in this component library, so it needs no new interaction pattern, no new touch-target sizing decision, and no new accessibility pattern (`role="group"` + `aria-pressed` already established).

*Alternative considered*: a single icon button that cycles (matches "alternate" wording literally). Rejected — a two-state toggle where both states are always visible and labeled is more discoverable and more consistent with the codebase's existing `.segments` convention than a cycling icon whose current state isn't self-evident at a glance from the back of the room.

**4. Foreground blur mirrors the background formula exactly, on the near side.**
Foreground fixed position: `distanceAvantPlan = distance * 0.4`. Its blur uses the same shape as the existing background calculation, mirrored: `dehors = max(0, r.proche − distanceAvantPlan)`, `flou = min(6, sqrt(dehors) * 1.9)`. This is the same function applied to the opposite edge of the sharp zone, so the two blurs will visibly behave the same way (same ramp, same cap) — a participant who's understood "far edge blur" from the top-down diagram reads "near edge blur" on the simulated view without learning a second visual rule. When the sharp zone's near limit reaches or passes `distanceAvantPlan` (e.g., a small aperture at a middling focus distance), `dehors` is 0 and the foreground renders sharp — this is expected, not special-cased away, per proposal.md.

*Alternative considered*: give the foreground element its own independent, larger fixed distance so it's "almost always" blurred regardless of settings, for a more dramatic default. Rejected — `0.4×` keeps the foreground meaningfully inside the range where zone width actually decides its sharpness across the component's existing lever ranges, which is the more honest demonstration; a foreground that's blurred unconditionally would misleadingly look data-driven while actually being decorative.

**5. Icon choices.**
Subject reuses `lucide:user-round` (already the top-down view's subject icon, `Sujet.astro`'s exact choice) so the same figure reads as "the same subject" across both views. Background: `lucide:trees`. Foreground: `lucide:leaf`. Both are existing `lucide` names available through the same `astro-icon` integration already used for `lucide:camera`/`lucide:user-round`; verified available in task 1.

**6. Distance labels are camera-relative, reusing already-computed values — three numbers, not a ruler.**
Each simulated-view element gets one small `<text>` label, same visual pattern as the top-down SVG's existing "vous"/"sujet"/"fond" labels: avant-plan shows `distance × 0.4`, sujet shows `distance`, fond shows `distance + fond` — all three already computed for the top-down view or in `dessinerApercu()`, so this adds no new math, only new text output. All three are measured **from the camera**, matching how every other figure in this component is already framed (the sidebar's "distance au sujet," the top-down axis, the wall's position) — not from the subject, which would need a subtraction and introduce a second, inconsistent mental model. Formatted through the existing `distanceLisible()`/`typo()` helpers, the same formatters the top-down view and the sidebar already use, so the numbers match in style (decimal comma, `m`/`cm` unit switch, thin non-breaking space) without new formatting code.

*Alternative considered*: labeling distance from the subject instead of the camera. Rejected — every other number in this component is camera-relative already; this would be the one figure in the whole component measured a different way, for no legibility gain.

## Risks / Trade-offs

- A fixed-composition (non-scaled) simulated view could read as inconsistent with the top-down diagram's careful geometric honesty → Mitigated by keeping the *readout text* (`.lecture`, unchanged) as the single source of truth for figures; the simulated view is explicitly framed as qualitative (what it looks like), the top-down diagram as quantitative (how far). The aria-label on the new SVG states this plainly. → Partly superseded by Decision 6: the simulated view now also carries three camera-distance numbers. `.lecture` remains the single source of truth for the *sharp-zone* figures (épaisseur, limites, hyperfocale) — the three new labels are anchor positions only, not a restatement of those figures — but the aria-label wording should be revisited since "qualitative, not quantitative" no longer fully describes the view once numbers are visible.
- Always redrawing both views on every input event is marginally more work per frame → Negligible at this scale (a handful of DOM attribute writes on `input`); no measurable impact expected given the existing component already redraws its full top-down SVG on every drag tick.
- `lucide:trees`/`lucide:leaf` may render less legibly than a custom shape at small, blurred sizes on a projector → Mitigated by verifying at the same two breakpoints already used to verify this component (1600×1000 and the 1024×768 compaction breakpoint) before considering the task done; swap icon names if illegible, no design change needed.

## Migration Plan

Purely additive to one component and its one content usage's rendering; no data migration. Ships as a normal PR: implement, verify at both breakpoints (see Risks), merge. Rollback is a plain revert — no persisted state, no schema change.
