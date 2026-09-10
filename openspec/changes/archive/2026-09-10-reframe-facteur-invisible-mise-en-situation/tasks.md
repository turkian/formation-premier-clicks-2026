## 1. Comparative diagram component

- [x] 1.1 Create `components/schemas/DistanceSujet.astro`, reusing `pieces/Vous.astro` and
  `pieces/Sujet.astro`, drawing two independent ground lines side by side (same visual grammar as
  `ZoneNette.astro`), each labelled only with its distance — no gradient or blur cue.
- [x] 1.2 Register the component as `distance-sujet` in `components/schemas/registre.ts`.

## 2. Rework `le-facteur-invisible`

- [x] 2.1 In `content/lecons/1.yaml`, rewrite the panel's `corps` to state capteur APS-C, objectif
  courant réglé à 50 mm, and `f/5.6` as this lens's ouverture maximale at that focale (the point
  where it lets in the most light), replacing the "zoom de kit" / "tout ce qu'il peut faire"
  wording, before the existing question.
- [x] 2.2 Add a panel-level `schema` field referencing `distance-sujet` with distances 1 m and 3 m
  (matching the question text) and a short légende.
- [x] 2.3 Check French Québec typography in the new text (espaces insécables before `:`, unit
  spacing, decimal commas) per the project's shared conventions.
- [x] 2.4 (found during verification) Fix `components/ecrans/Panneau.astro`: no existing CSS grid
  reserves a `schema` region for a "dense" (cumulative-état) panel, so the diagram was orphaned by
  grid auto-placement and clipped the `Les chiffres` table at États 2/3. The panel's `schema` now
  renders only pre-reveal (`dense ? undefined : cumule.schema`); `data-sans-schema` is scoped to
  the non-dense case so it doesn't collide with the dense `.claim` sizing rule. Verified this
  doesn't affect any other dense panel in the site (none currently define a `schema`).

## 3. Downstream terminology cleanup

- [x] 3.1 In `demo-la-distance`, simplify the `objectif: zoom de kit` constante and the two
  `specification` strings to plain `50 mm`.
- [x] 3.2 In `demo-ouverture-et-fond`, simplify the `f/5.6 au zoom de kit` / `Au zoom de kit`
  occurrences (`valeur`, `specification`, `legende`) to plain wording, without repeating "objectif
  courant" (already introduced once at `le-facteur-invisible`).
- [x] 3.3 Confirm the "pourquoi votre kit dit `f/3.5-5.6`" passage in `deux-retombées` is left
  unchanged (out of scope — see design.md Non-Goals).

## 4. Verification

- [x] 4.1 Run the site locally and view `le-facteur-invisible` at 4:3 (1024 × 768) and 16:9 to
  confirm the panel plus the new diagram stay within the projection readability floors. Checked
  all three états at 4:3 (the tightest case) via a headless-browser screenshot: État 1 shows the
  setup text, question, and diagram side by side with room to spare; États 2/3 show the full
  `Les chiffres` table and `Le rapport` callout with no clipping (see task 2.4 — this is what
  surfaced the Panneau.astro fix). Also re-checked an existing dense panel elsewhere in the lesson
  (`le-quatrieme-facteur`) to confirm no regression.
- [x] 4.2 Run `src/scripts/verifier-contenu-final.mjs` (or the project's build/lint script) to
  confirm no typography or content-rule regressions. Also ran `verifier:modele` (30/30 pass) and a
  full `astro build` (122 pages, no errors).
- [x] 4.3 Run `openspec validate --strict` for this change.
