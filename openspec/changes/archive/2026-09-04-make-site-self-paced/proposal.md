## Why

The site was built assuming a cohort in a room on a known evening. It asserts a schedule it
does not have: `lib/calendrier.ts` computes which séance is « ce soir » from today's date, but
`DATES` has been `{1: null, 2: null, 3: null}` since it was written, so `seanceCourante()` has
always returned `1` and `dateLisible()` has always returned `null`. The hub therefore badges
Séance 1 as « ce soir » on every page load, in every month, forever — and the `date ?? filConducteur`
fallback is why nobody noticed: the date branch has never once rendered.

The premise itself is wrong, not just the implementation. Participants either work through the
site **autonomously, at their own pace**, or attend **sessions organized as a group**. Neither
mode wants the site telling them which evening it is, and the autonomous mode is actively
misled by it. The same premise is baked into the on-screen copy — « ce soir », « la prochaine
séance », « en partant ce soir » — which is read months later by someone who was never in the room.

The unifying rule this change establishes: **the site may state what is true whenever it is
read, and nothing that is true only at a particular moment.**

## What Changes

- **Remove the cohort calendar.** Delete `src/src/lib/calendrier.ts` entirely (`DATES`,
  `seanceCourante`, `dateLisible`), its three call sites, and the `.carte[data-courante]` CSS.
  The hub's three séance cards become peers; each shows its `filConducteur` unconditionally,
  which the `??` fallback already renders today.
- **Remove the « Commencer » card** from the lesson sommaire. The sommaire's own docstring
  already states the design intent — « la liste complète des blocs et de leurs écrans plutôt
  qu'un simple bouton « commencer » » — and the card contradicts it. A participant clicks
  directly on the bloc or écran they want. This orphans `arrets`, `premier`, and the `aplatir`
  import, and removes an invalid `<p><a><h3>…<p>…</p></a></p>` nesting whose rendered DOM does
  not match its source tree.
- **Adopt a content vocabulary rule**: refer to a session by its ordinal (« la séance 2 »),
  never by a clock (« ce soir », « la prochaine séance », « cette soirée »). Applied across
  roughly 27 sites in `content/lecons/*.yaml`, `content/marques/*.yaml`, and two page templates.
  The site already owns the correct vocabulary and merely uses it inconsistently: in
  `lecons/2.yaml`, one table column contains both « séance 1 » and « ce soir » for the same
  kind of fact, two lines apart.
- **Two false positives are explicitly out of scope.** « soirée » is polysemous in this corpus:
  `lecons/2.yaml:105` « vos photos de soirée sont floues » means a *party*, and
  `lecons/3.yaml:558` « La soirée critique » is a *named club event*. Both are correct French
  that a mechanical replacement would destroy.
- **Group-mode screens are kept, wording only.** The five `repere` screens with
  `variante: pause` or `variante: questions` are room staging — a ten-minute break, a
  sticky-note wall, « notre dernière soirée ensemble ». They stay, because group mode still
  exists and the animator needs the projected cue; an autonomous reader understands them as
  artifacts of the group format. Their `soirée` → `séance` wording is corrected like everything else.
- **Two lines require editorial rewriting rather than substitution**, settled during exploration:
  - `lecons/1.yaml:727` is an imperative with a deadline — « Ouvrez ce site avant d'arriver à
    la prochaine séance » — which has no anchor when read self-paced. It becomes a statement of
    capability: « Ce site fonctionne hors ligne une fois qu'il a été ouvert une première fois —
    utile si le réseau de la salle faiblit. »
  - `lecons/3.yaml:548`, the closing claim of séance 3, becomes « Ce qui compte ne se joue pas
    pendant ces trois séances. Ça se joue dans les six prochains mois. » This is not merely
    mode-neutral, it is more accurate: the closing screen of the *last* session should say the
    whole formation is not the point, which is what README principle #7 argues.
- **The vocabulary rule is recorded in `openspec/config.yaml` `context`**, beside the existing
  French-typography rules, so future content authoring is self-checking rather than dependent
  on this conversation being remembered.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-shell`: the hub no longer identifies a « current » séance; the three séances are
  presented as peers with no schedule attached. Adds the site-wide rule that rendered copy must
  be true whenever it is read — which governs lexique brand sheets and reference sheets as well,
  in the same cross-cutting way the French-Québec typographic conventions already do.
- `lessons`: the lesson sommaire no longer offers a privileged « Commencer » entry point;
  participants enter a lesson at whichever block or screen they choose.

`lexicon` needs no delta of its own: its brand-sheet prose changes, but the behavior contract
governing that prose lives in `site-shell` alongside the typography rule, and none of the
lexique's own requirements change.

**The current-séance highlight is specified, not incidental.** `site-shell`'s « Home hub reaches
all content » requires that « the current session's lesson is identifiable without reading link
text in full ». `lib/calendrier.ts` is that requirement's implementation, so removing it is a
genuine requirement change rather than a cleanup.

**Sequencing.** `openspec/specs/` and `openspec/changes/archive/` are both empty:
`build-formation-site` reached 95/95 tasks but was never synced or archived, so its six
capabilities exist as delta specs inside that change rather than as main specs. Its deltas were
the source for the MODIFIED requirement block copied here. `build-formation-site` must be synced
or archived before this change is archived, so that this change's MODIFIED delta has a main spec
to apply against.

## Impact

- **Deleted**: `src/src/lib/calendrier.ts`.
- **Modified — templates**: `src/src/pages/index.astro` (import, `courante`, `data-courante`,
  « · ce soir », unconditional `filConducteur`, « Trois soirées » → « Trois séances »);
  `src/src/pages/lecons/[numero]/index.astro` (import, `const date`, surtitre date suffix,
  « Commencer » card, `arrets`/`premier`/`aplatir`, « Cette soirée », « revenir dans trois
  semaines », docstring); `src/src/styles/carrefour.css` (two `.carte[data-courante]` rules).
- **Modified — content**: `content/lecons/1.yaml`, `2.yaml`, `3.yaml`; `content/marques/canon.yaml`,
  `android.yaml`, `iphone.yaml`, `olympus-om-system.yaml`.
- **Modified — config**: `openspec/config.yaml` gains the session-reference vocabulary rule.
- **No dependency, build, or deployment change.** All edits are deletions or copy; no new
  concept, no mode toggle, no runtime behaviour is introduced.
- **Not in scope**: `docs/` is the animator's private playbook and keeps its « ce soir »
  narration untouched. The `repere` variante enum's unused `transition` member is noted but
  not reconciled here.
- **Regression risk is concentrated in the content pass.** The two polysemous « soirée » uses
  above must survive it, so the vocabulary rule cannot be applied by search-and-replace.
