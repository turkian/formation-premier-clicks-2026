## Context

See `proposal.md` — Why. Three constraints shape everything below.

**The source content is a facilitator script, not participant material.** `docs/` holds
~3 200 lines of run-of-show: timings, stage directions, and what the animator says. It was
written to structure the training, not to be displayed.

**The animator's delivery style is conversational, not click-driven.** A screen goes up and stays
up for five to eight minutes while he talks with the room and asks questions; then he switches to
the demonstration. This rules out a slide deck in the usual sense — an earlier design of nine
slide archetypes at one idea per screen assumed a 30–60 second tempo and was rejected as wrong
for this delivery.

**Some blocks depend on information being unavailable.** The aperture block is explicitly built
question-first, rule-last (« n'énonce pas la règle tout de suite »), and lesson 2's
compensation-in-manual question is described as the test that proves comprehension. A design that
puts all of a block's content on screen at once destroys these.

Delivery is also time-boxed by reality: the three sessions run sequentially, so lesson 1 must be
finished before lesson 2 is started, and the animator's photographs arrive over the same period.

## Goals / Non-Goals

**Goals:**

- One repository, one deploy, one visual language, serving four genres at three typographic
  scales — projection, phone, and paper.
- Lessons projectable from day one, before any demonstration photograph exists.
- Computed rather than asserted figures wherever a number is shown.
- Adding a reference sheet later costs one file.

**Non-Goals:**

- No presenter notes, notes pane, speaker view, or second-window display. Decided against by the
  animator; the stage directions that matter are published on the screens instead.
- No live sync between the projector and participants' phones (see Decisions).
- No account, login, or per-participant server state.
- No authoring UI. Content is edited as files in the repository.
- The animator-facing logistics in `docs/` (préparation, suivi, fiches d'animateurs, minutage)
  are not ported to the site.
- No cross-brand search in the lexique. Search is scoped to the selected brand, which is what a
  participant looking up their own camera needs; searching all eight at once would return seven
  irrelevant matches.
- No custom domain. The site is served from the default `github.io` project path.

## Decisions

### D1 — Astro, over a presentation framework or hand-written HTML

The site has to be four different things at once. Astro was chosen because the reference sheets
and the eight lexique pages are content collections almost by definition, interactive components
can be islands so the lexique and print pages ship no JavaScript at all, and everything builds to
static files a GitHub Pages project path can serve. The site is served from the default
`github.io` project path, so the base path is the repository name.

*Alternatives considered.* **Slidev / reveal.js** give keyboard navigation, fit-to-screen, and
speaker view for free, and were the strongest option for the lessons alone — but the lexique and
reference halves are a website, not a deck, and splitting the project across two toolchains would
double the surface and fracture the visual language. Their headline feature, speaker notes, is
explicitly unwanted here. **Hand-written HTML/CSS/JS** avoids all dependencies but means
re-implementing content collections badly for eight identically structured lexique pages.
**A React/Next SPA** is disproportionate for a static club site.

### D2 — The block is the unit: one dense panel per pedagogical block

Each run-of-show block becomes a small number of screens — typically a concept panel, then a
demonstration, then « appareil en main ». Concept panels are dense and self-sufficient; a
participant reading only that screen understands the concept.

This yields roughly eighteen screens per lesson, about fifty-four in total, or one screen per six
to seven minutes. The rejected one-idea-per-slide model implied around 190.

Demonstrations stay on their own screens rather than sharing a panel, at the animator's direction,
so both keep full usable space. Diagrams remain inside concept panels, since a diagram is part of
the explanation rather than evidence for it.

A useful side effect: eighteen dense screens is a reviewable document, where seventy slides is
not. The panel at rest is the block's own summary.

### D3 — Progressive reveal is an in-place panel state, and an exception

Rather than splitting a reveal across screens, a panel accumulates: advancing adds content to the
same screen and never removes what is already shown. At its final state the panel is the complete
explanation — the reveal mechanism and the review artifact are the same object.

This is used in five places only, not as the general architecture:

| Lesson · block | What must stay hidden |
|---|---|
| L1 · ouverture | `f/2.4` vs `f/22` — the hands-up vote |
| L1 · profondeur de champ | the 1 m / 3 m / 10 m table; the ratio is the surprise |
| L2 · compensation en manuel | « le test qui prouve qu'ils ont compris » |
| L2 · les trois échecs du posemètre | the corrected exposure, after the room guesses |
| L2 · arbre de diagnostic | the cause, after the room proposes one |

Everywhere else the panel is static. *Alternative considered:* gating every panel, which would
reintroduce the click-driven tempo the animator rejected.

### D4 — Named regions with two authored arrangements, not scale-to-fit

A concept panel is authored as four named regions — `claim`, `corps`, `schéma`, `aparté` — and
laid out by one grid template for projection (claim across the top, body and diagram side by
side, aside small at the bottom) and another for phone width (single column, diagram before body,
because the diagram orients before the table explains). Per-panel overrides only where a panel
needs one. Diagrams are inline SVG, so they are resolution-independent in both.

*Alternatives considered.* **A fixed canvas scaled to fit** preserves composition exactly and is
the standard answer for projection, but a scaled 16:9 panel is unreadable on a phone, and
phone-readable lessons are a requirement. **Naive responsive reflow** — letting a single stylesheet
collapse the layout — loses the intended spatial relationship between a diagram and the table it
illustrates. Authoring two arrangements costs one design decision shared across ~22 panels rather
than twenty-two decisions, and is the only option that serves both targets honestly.

Consequence for projection: content must remain fully visible at 4:3 as well as 16:9, since club
projectors are not reliably widescreen. This is a spec requirement, and needs an authoring check
at 1024 × 768 rather than trust.

### D5 — Phone handoff by on-screen QR, not realtime sync

A static host cannot push. The projector itself becomes the broadcast channel: a screen displays
a scannable code encoding the deep link to that same screen, so a participant points a phone at
the projection and lands exactly there. Zero infrastructure.

The code appears only on block openers and « appareil en main » screens. This is a pedagogical
decision as much as a technical one: during a concept panel the animator wants eyes up and
conversation, and thirty people on phones is the failure mode. During « appareil en main » their
heads are down over their cameras and the instruction screen is behind them — that is exactly
when the instructions need to be in their hands.

*Alternative considered:* a third-party realtime service (Firebase, Ably, PubNub) for true
push-sync. Rejected because it adds an account and a dependency that fails precisely when club
wifi is weak, for a benefit the QR already delivers.

### D6 — Depth of field is computed per sensor format, and reported in two tiers

The scripts instruct the animator not to give figures (« ne donne pas ces chiffres comme des
mesures »). The animator has overridden this: figures are welcome when computed correctly, and
should be accompanied by a range or a qualitative description.

Model: circle of confusion `c = diagonale / 1500` per format; hyperfocal `H = f² / (N·c) + f`;
near and far limits `s(H−f) / (H ± (s−f))`; thickness is their difference, or infinite at or
beyond `H`. Readout is the computed figure, the qualitative band, and the near and far limits —
bands and thresholds are normative in `specs/interactive-components/spec.md`.

Two consequences worth stating.

**The sensor-format selector becomes load-bearing rather than decorative.** With real figures on
screen in a room of mixed gear, the component must say whose camera it is describing. This is
what the scripts already knew (« ils varient selon la taille du capteur ») but could not act on
in prose.

**Computing exposes an inconsistency in the source content.** The scripts' kit-lens figures —
8 cm at 1 m, 77 cm at 3 m, 10,3 m at 10 m, and the ÷10 ratio — are all correct for APS-C. The
adjacent « 50 mm `f/1.8` à 1 m ≈ 4 cm » is a full-frame figure, and the text invites a direct
comparison with the APS-C numbers above it (« votre zone tombera à… »). On APS-C the honest pair
is 8 cm → 2,6 cm, a ÷3 drop. The narrative survives; the comparison must be restated in one
format. Tracked as a content task.

### D7 — `docs/` is retained as the production playbook; the site becomes canonical for concepts

The adaptation from script to screen follows a near-mechanical rule, which keeps the split clean:

| `docs/` element | Becomes |
|---|---|
| Blockquotes (already written in « vous ») | screen copy, nearly verbatim |
| Tables | screen content directly |
| Room-facing stage directions | on-screen affordances the participants also read |
| Animator-only pacing and preparation | dropped from the site, kept in `docs/` |
| Timings, équipe, matériel, plans de repli | stays in `docs/` only |

Blockquotes account for the large majority of screen copy, which is why the adaptation is
tractable rather than a rewrite. Room-facing directions are *published* rather than hidden — a
room of thirty nervous beginners reading « à main levée, personne n'est nommé » is the point of
the instruction, and it works better visible than in a notes pane.

Drift risk is accepted with a rule: once a lesson is on the site, the site is canonical for
concept explanations and `docs/` retains logistics. Trimming the concept prose out of the
run-of-show files is deliberately left out of this change's scope.

### D8 — Print is CSS, one sheet per reference page, Letter

Reference sheets print through a print stylesheet, one Letter page per sheet, with site furniture
suppressed. The 10 × 15 cm laminated-postcard geometry from the scripts is deliberately dropped
in favour of a clean Letter page — duplex-aligned card geometry with crop marks is fiddly to get
right and was not wanted.

Print is in scope for the reference sheets only. Lessons and lexique pages are not designed for
print; the projected PDF fallback in D9 is a separate concern.

### D9 — Offline by service worker, with a local copy as the real fallback

A projector laptop with no network on the first evening would be a single point of failure for a
two-hour session with thirty people. A service worker caching visited lessons, sheets, and
components covers a mid-session network loss. For the harder case — no network at arrival — the
repository supports producing a local copy that opens and navigates without a server, which is
also the rollback path in D10.

The scripts' own instruction (« prépare le plan B projeté même si tu comptes faire les démos en
direct ») applies to the site as much as to the demos.

### D10 — Typeface: a modern legible Google Fonts face

The type has to survive three very different jobs: a headline claim read from the back of a room,
a table read from the middle of it, and a reference sheet read on paper at arm's length. The face
is chosen from Google Fonts for a modern, highly legible sans with a genuine range of weights, a
tall x-height, unambiguous figures, and complete coverage of French punctuation and accents
including small-caps-safe `« »` and the accented capitals Québec French requires.

Self-hosting the font files rather than linking the Google CDN, so that D9's offline behaviour and
the local-copy fallback do not silently lose the typeface when the room has no network.

### D11 — Lesson 3's development demonstration uses pre-rendered image states

The seven-gestures block stays a live demonstration, but its fallback and its on-screen support
are **pre-rendered images: one starting photograph plus seven cumulative states**, one per geste.

This makes the block behave like every other demonstration in the formation — declared slots with
specifications, degrading to their spec when absent — instead of being a special case. It also
means the block is deliverable if the editing software misbehaves on the night, which for a
30-minute live demo in front of thirty people is a real possibility.

*Alternatives considered.* **A recorded screen pass** shows the gestures but cannot be paused
against a question from the room, and cannot be reordered when the animator chooses to skip a
geste. **CSS-filter simulation** was rejected as dishonest about what RAW development does.

These seven states are *derived* assets, not additional photographs: they are exports from a
single editing pass on one image, so they add almost nothing to the shooting workload described in
`specs/demo-media`.

## Risks / Trade-offs

**Thirty phones on club wifi at once** → « Appareil en main » pages are text-only and small and
will survive; the widget-heavy pages will not. Mitigated by limiting the QR handoff to the light
pages (D5), by the service worker, and by printing "open the site before you arrive" on the
séance-1 feuillet.

**A dense panel held for eight minutes has a hard content budget** — roughly 100 words plus one
diagram or table before the back of the room stops reading → Panels are designed for legibility
at three distances: the headline claim and the diagram's shape from the back, the table rows from
the middle, and only cost-free detail in the smallest tier. Nothing load-bearing in the smallest
tier is a spec requirement, not a style preference.

**Phone-readable lessons cost composition fidelity** → Accepted. Two authored arrangements (D4)
keep both usable, but the projection arrangement is the one that gets design attention; the phone
arrangement is for review, not for delivery.

**Lesson 3's seven-gestures development demonstration is the least screen-shaped block in the
formation** — 30 minutes of live editing → Left as a live demonstration with screens carrying the
fixed order and the principle repeated at each gesture, backed by the pre-rendered cumulative
states of D11 so the block survives a software failure on the night.

**The site depends on ~45–55 photographs the animator must shoot**, about 20 of them essential →
The asset-slot contract (`specs/demo-media`) makes every lesson projectable with zero photographs
and improves as they land, and the shot list is derived from the declared slots rather than
maintained by hand.

**Computed figures are auditable, and the source content is not yet internally consistent** →
D6 flags the one discrepancy found; the same exposure applies to any future figure added to a
lesson, which is a benefit rather than a cost.

**Content drift between `docs/` and the site** → D7's canonicality rule. Not eliminated, bounded.

## Migration Plan

There is no system being replaced, but delivery is sequenced by the sessions themselves.

1. **Shell first** — hub, navigation, typography, print pipeline, Pages deployment via GitHub
   Actions on push to `main`. Verify a deep link resolves under the repository sub-path.
2. **Reference sheets and lexique next.** They are the least dependent on design decisions still
   settling, they are the artifacts participants receive at session 1, and they validate the print
   pipeline early.
3. **Lesson 1**, including the depth-of-field and `f/`-division components, which carry its
   hardest block. Must be complete before session 1.
4. **Lesson 2**, then **lesson 3** — each before its own session, with photographs from the
   preceding session folded in.

**Rollback.** At any point the local copy from D9 is projectable without hosting or network. If
the site itself is not ready for a given evening, that session falls back to the existing `docs/`
run-of-show and the scripts' own projected plan B — the formation was designed to be deliverable
without the site.

