## Context

See `proposal.md` — Why. This section covers only what shapes the approach.

Decision numbers below are local to this document. Decisions from the earlier change are cited
as `build-formation-site D<n>`.

Three facts about the current codebase determine how this is implemented:

- **The project already has a build-halting content-check pattern.** `src/integrations/verifier-contenu.mjs`
  runs on `astro:build:start` and throws, and `src/scripts/verifier-contenu-final.mjs` runs
  post-build under `npm run verifier:contenu`. The latter already loads **both** `content/lecons/`
  and `content/marques/` — precisely the two corpora the session-reference rule governs. Its own
  docstring states the reason such checks exist: « un rajout de contenu la semaine prochaine
  pourrait les casser sans que personne s'en aperçoive avant la salle. »
- **The failure being corrected is exactly that failure.** `site-shell`'s « the current session's
  lesson is identifiable » shipped, looked implemented, and never worked, because `DATES` was
  never filled in and the `??` fallback masked it. A rule recorded only as prose is the same
  bet that already lost.
- **`openspec/specs/` is unsynced.** `build-formation-site` holds six delta specs that have
  never been applied to main specs, so this change's MODIFIED delta has no base yet. This is a
  planning-workflow ordering problem, not a code problem.

`docs/` keeps its « ce soir » narration untouched, per `build-formation-site D7`: it is the
animator's private production playbook and is not rendered.

## Goals / Non-Goals

**Goals:**

- The session-reference rule is enforced by tooling that fails the build, not by an author or
  agent remembering it.
- The content pass provably terminates: a single command answers "are there any left?"
- The two polysemous « soirée » uses survive the pass by construction, not by care.
- Removals leave nothing dead behind — no orphaned attribute, CSS rule, import, or binding.

**Non-Goals:**

- **No autonomous-vs-group mode.** No toggle, no flag, no conditional rendering. One site that
  reads correctly in both situations. Introducing a mode would trade a small copy problem for a
  permanent branching concern in every template.
- **No change to in-deck position affordances.** The accumulating-panel state dots, the
  « Bloc 3 / 7 » header, and the « 14 / 31 » footer all stay. They indicate position within a
  deck, which is true whenever it is read; they are unrelated to the cohort schedule.
- **No relocation of the reveal-state mechanic.** `build-formation-site D3` stands unchanged.
- **No reconciliation of the unused `transition` value** in the `repere` variante enum.

## Decisions

### D1 — The rule is enforced by a check, not only recorded in `openspec/config.yaml`

The proposal calls for the vocabulary rule to land in the project `context` block. That is kept,
but it is authoring guidance, read by whoever writes the next screen. It is not enforcement.

The rule is additionally implemented as an automated check. The two are complementary: `context`
tells an author what to write, the check tells them when they got it wrong.

*Alternative considered — `context` only.* Rejected on the evidence in this very change: the
formation site already shipped one requirement that was satisfied in appearance and not in fact.
The recurring risk is not the 27 sites fixed here, it is site 28, written months from now by
someone adapting a `docs/` passage that says « ce soir ».

### D2 — The check extends `scripts/verifier-contenu-final.mjs`, over source YAML

It goes in the existing post-build content verifier rather than a new script or the
`astro:build:start` integration, because that file already loads both corpora, already has the
pass/fail reporting shape, and is already wired into `npm run verifier:tout`. The rule is the
same class of promise as the checks living there: something written, that typing cannot hold.

*Alternative considered — scan rendered `dist/**/*.html` instead.* Attractive, because it would
catch template literals as well as content, and would ignore code comments for free. Rejected as
disproportionate: it means new infrastructure, and the template sites are two fixed strings
corrected once under review, whereas the authored corpus is where drift recurs. The gap is
accepted and named in Risks.

*Alternative considered — the build-halting integration.* Rejected: halting a build on a copy
nit is heavier than this warrants, and the animator building a local copy before a session
should not be blocked by wording.

### D3 — The check is a deny-list plus an enumerated allowlist, and fails closed

Two patterns, applied to every rendered string value in `content/lecons/*.yaml` and
`content/marques/*.yaml`:

- **The stem `soir`** (matching « ce soir », « soirée », « soirées ») — every occurrence must
  appear in an explicit allowlist keyed by file and exact phrase. The allowlist ships with
  exactly two entries: « photos de soirée » in `lecons/2.yaml`, and « soirée critique » in
  `lecons/3.yaml`.
- **A session qualified by position rather than by ordinal** — « prochaine séance », « séance
  précédente ». No allowlist; there is no legitimate use. « la séance 2 » is the approved form
  and does not match.

  « dernière » is deliberately excluded from this list. The spec forbids describing a session as
  « next, previous, or upcoming », and « dernière » is none of those: on séance 3, « notre
  dernière séance ensemble » states a fact about the formation's structure, not a position in
  the reader's calendar. The cost is that a relative « à la dernière séance », meaning *the
  previous one*, would pass unremarked — accepted, since this corpus writes that sense as
  « la séance précédente ».

Failing closed is the point. A new legitimate use of « soirée » — another club event, another
low-light scene — breaks the build and forces a deliberate allowlist entry with a reason. A new
accidental « ce soir » breaks the build too. The check cannot tell them apart, and should not
try; a human decides, once, in a diff.

*Alternative considered — allow bare « soirée » and forbid only « ce soir » / « cette soirée ».*
Rejected: it permits « toute la soirée » and « de la soirée », which are 6 of the sites being
fixed here, and would let the same drift back in unremarked.

### D4 — The calendrier is deleted, not neutralized

`src/src/lib/calendrier.ts` is removed as a file, along with `data-courante`, both
`.carte[data-courante]` CSS rules, and the surtitre date suffix. Nothing is left commented out
and no empty `DATES` table is retained "in case dates are set later."

Retaining an unpopulated hook is what produced the defect: `DATES = {1: null, 2: null, 3: null}`
was a placeholder that read as a feature. If a future change wants dated sessions, it should
propose them against a spec that says so.

### D5 — The « Commencer » card is deleted whole; its content is not relocated

The card carried two facts beyond its link: « 7 blocs · 31 écrans », and the keyboard contract
« Les flèches pour naviguer, `i` pour l'index, `f` pour le plein écran ». Both go.

The block list immediately below already conveys the lesson's structure with more precision than
a total, and `Index` / `Plein écran` are visible controls in the écran header, so the functions
stay discoverable — only the key bindings become undocumented, which costs the animator one
learning occasion and costs a phone reader nothing.

Removing the card also removes an invalid `<p><a><h3>…<p>…</p></a></p>` nesting and the
`class="carte"` + `style="display:inline-block"` override that fought the hub's grid component.

*Alternative considered — keep the counts in the page header.* Rejected as re-adding, under a
different name, the thing being removed. If session length turns out to matter to a self-paced
reader, that is a content decision worth its own proposal.

### D6 — `build-formation-site` is synced, not retroactively edited

Because `build-formation-site` is complete but unarchived, its `site-shell` delta could simply be
edited in place to drop the offending scenario line, and this change would need no MODIFIED
delta at all.

Rejected. That change did specify the current-session affordance and did ship it; erasing the
line rewrites the record to say it never happened, and destroys the only evidence of how the
defect entered. The MODIFIED delta is the honest form, and it costs one sync step.

## Risks / Trade-offs

- **A mechanical find-and-replace during implementation destroys correct French.**
  → The two exceptions are enumerated in D3's allowlist *before* the content pass begins, and
  encoded as a spec scenario. The pass is site-by-site against the inventory, never `sed`.
- **The check does not cover page templates**, so a future « cette soirée » in an `.astro` file
  passes. → Accepted, per D2. Mitigated by the two template sites being fixed in this change and
  by the `context` rule covering authors of either kind of file.
- **The check's stem match will flag legitimate future copy.** → That is the designed behaviour,
  not a defect; the failure message must name the allowlist and the file to edit, so the fix is
  obvious rather than a puzzle.
- **The hub loses the animator's one-glance target** — `calendrier.ts` existed so the animator
  could « cliquer sans lire trois libellés ». → Accepted. Three large ordinal-labelled cards, and
  the animator knows which session they are running. This is now stated in `site-shell` as the
  three lessons being peers.
- **`lecons/3.yaml:548`'s rewritten claim grows from 77 to 95 characters** at the largest
  typographic tier. → Within the established range (existing claims reach 113, several sit at
  90–107), but it should be eyeballed at 4:3 projection, since `claim` has no enforced maximum
  and the projection floors are a `site-shell` requirement.
- **Archiving this change before syncing `build-formation-site` leaves the MODIFIED delta with
  no base.** → Migration Plan step 1.

## Migration Plan

1. **Sync first.** Run `openspec sync` (or archive) on `build-formation-site` so
   `openspec/specs/` holds the six capabilities. This change's MODIFIED delta then has a base.
   This is a planning step and touches no application code.
2. **Add the check before the content pass**, with the allowlist populated. Run it against the
   current content: it should report the full set of violations, which becomes the working
   inventory. The pass is done when the check passes.
3. **Code removals** (calendrier, « Commencer » card, CSS), then `npm run check` to confirm the
   orphaned imports and bindings are gone rather than merely unused.
4. **Content pass**, site by site, re-running the check.
5. **Verify** with `npm run verifier:tout`, plus a look at the hub and one lesson sommaire at
   projection and phone widths.

**Rollback**: a static site deployed from `main` by GitHub Actions. Reverting the commit and
pushing redeploys the previous build. No data, no migration state, nothing to undo beyond the
commit.

## Open Questions

- Should the offline-behaviour note stay in an aparté on séance 1's `le-defi` screen, or become
  site-wide furniture? It describes the whole site, not that lesson. Deferrable: the wording is
  settled either way, only its location is open, and moving it later changes no spec.
- Should the `repere` variante enum's unused `transition` value be removed or given a use? Out
  of scope here and independent of this change's specs and tasks.
