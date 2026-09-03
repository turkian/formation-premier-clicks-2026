## Why

The three-session beginner photography formation is fully written in `docs/`, but as
**facilitator run-of-show scripts** — timings, stage directions, and what the animator says.
Delivering it as a PowerPoint loses the two things this content most needs: interactive
demonstrations for concepts that are impossible to explain with static images (depth of field,
the `f/` notation, motion blur), and a durable reference the participants can consult for the
three months after the last session, which README principle #7 identifies as where the
formation's actual goal is realized.

A static site on GitHub Pages replaces the deck, keeps the pedagogy the scripts encode, and
gives the club a support that outlives the three evenings.

## What Changes

- **A new static website** (Astro, deployed to GitHub Pages) becomes the delivery support for
  the formation, replacing the planned PowerPoint.
- **Four distinct presentation genres in one site**, because the audiences and media differ:
  - a **home hub** to reach everything;
  - **three lessons** as projected screens, driven from the keyboard;
  - the **lexique** as a classic browsable site with an 8-brand selector;
  - the **references** as an extensible set of one-page sheets designed to print cleanly on Letter.
- **The facilitator script is adapted, not annexed.** No presenter notes and no side panel.
  Doc blockquotes become on-screen copy; room-facing stage directions (« à main levée, personne
  n'est nommé ») become on-screen affordances the participants also read; pure logistics
  (timings, staffing, matériel) stay in `docs/`.
- **Lessons are organized as one dense panel per pedagogical block**, not one idea per slide.
  A concept panel stays on screen for 5–8 minutes while the animator converses with the room;
  demonstration screens are kept separate from concept panels to preserve usable space.
- **Five panels accumulate in place** rather than revealing across slides, to protect the
  question-first / answer-last sequences the scripts depend on (notably the `f/2.4` vs `f/22`
  hands-up vote).
- **Interactive components** replace explanations that prose or photographs cannot carry —
  depth of field with its four levers, `f/` as a real division, shutter speed, ISO noise,
  the mode dial, and the diagnostic tree.
- **Depth-of-field figures are computed, not asserted**, per sensor format, and reported as a
  number plus a qualitative band (« très mince », « tout est net »). This supersedes the
  scripts' instruction to avoid giving figures.
- **Lessons are readable on a phone as well as projected**, with a QR handoff on the screens
  where phone use actually helps.
- **`docs/` is retained** as the private production playbook (préparation, suivi, fiches
  d'animateurs). Concept explanations become canonical on the site.

## Capabilities

### New Capabilities

- `site-shell`: the home hub, cross-section navigation, French-Québec typography conventions,
  GitHub Pages deployment, and offline resilience for a room with unreliable wifi.
- `lessons`: the three lesson decks — screen model (concept panel / demonstration / interactive /
  repère / appareil en main), block navigation and index, the accumulating-panel reveal states,
  the four named panel regions rendered for both projection and phone, and the QR handoff.
- `lexicon`: the per-manufacturer glossary as a browsable site — eight brands of identical
  structure, a selector whose choice is remembered, and search.
- `printable-references`: an extensible collection of one-page reference sheets that each print
  clean on Letter — the three aide-mémoire cards, the diagnostic tree, the export recipes, and
  future additions.
- `interactive-components`: the widget set, including the depth-of-field model (per-format
  circle of confusion, hyperfocal, qualitative bands) and the `f/`-as-division geometry.
- `demo-media`: the contract for demonstration photographs — asset slots that degrade
  gracefully to their own spec when a photo is missing, plus the shot list the animator works from.

### Modified Capabilities

None — this is the project's first change and `openspec/specs/` is empty.

## Impact

- **New**: `src/` (currently empty) gains the Astro site; a GitHub Actions workflow for Pages;
  `openspec/config.yaml` gains the project `context` block (stack, typography, projection
  legibility floors).
- **Content**: the three `formation_photo_session_N.md` run-of-shows, `aide-memoire-participants.md`,
  the eight `lexique-par-fabricant/` sheets, and `feuillets-a-remettre.md` are adapted into site
  content. `docs/` files are not deleted.
- **Dependencies**: Astro; no runtime backend, no third-party realtime service (a static host
  cannot push, and a realtime dependency would fail precisely when club wifi is weak).
- **Content correction carried into the site**: the scripts' « 50 mm `f/1.8` à 1 m ≈ 4 cm » figure
  is a full-frame number placed among APS-C figures it invites comparison with. On APS-C the
  computed value is 2,6 cm. The site must state one sensor format per comparison.
- **New standing deliverable for the animator**: roughly 45–55 demonstration photographs,
  about 20 of them essential; the site must be projectable before any of them exist.
