## Context

Repère screens (`Repere.astro`) are rendered entirely at build time and ship no JavaScript. Each
screen of a lesson is its own page: `Ecran.astro` changes screen with `location.href`, so any state
held in a page's memory is lost when the animateur moves away. `Ecran.astro`'s keyboard handler
listens on `document` and ignores only `INPUT`, `TEXTAREA` and `SELECT` targets. A repère screen
with only a label and a claim gets `data-titre-seul` and is centered as a poster. That rule
currently assumes that nothing else is on the screen.

## Goals / Non-Goals

**Goals:**

- One reusable timer, switched on by one content field, with no effect on repère screens that do
  not use it.
- A countdown that stays correct across screen changes, background tabs and sleeping laptops.

**Non-Goals:**

- Sound, notifications, or keyboard shortcuts for the timer.
- A timer on session 1's pause screen or on non-repère screens.
- State shared between devices or tabs: the projector's tab is the only one that matters.

## Decisions

### A field on the repère, not an `interactif` component

The repère schema gains `minuterie: z.number().int().positive().optional()` (minutes).
`Repere.astro` renders the timer when it is set.

*Alternative:* a `minuterie` entry in `interactifs/registre.ts`. Rejected because those components
are teaching demonstrations, and the `interactif` genre has no « Pause » label and no poster layout.
The pause would lose what makes it read as a pause.

### The poster layout includes the timer

`titreSeul` becomes "no body, no columns, no terms, no aside". A timer does not count against it,
so the pause screen stays centered, with the timer centered under the claim. The timer is not
`data-dense`, so the claim keeps its full size.

### Time is computed from an end timestamp, never by counting ticks

State is `{ etat: 'arret' | 'marche' | 'pause' | 'fini', fin?: number, reste?: number }`:

- `marche`: `fin = Date.now() + reste` when started or resumed; the displayed value is
  `max(0, fin − Date.now())`, rounded **up** to the second, so that `5:00` stays on screen for the
  first second and `0:00` appears exactly at the end.
- `pause`: `reste` is frozen.
- `arret`: `reste` = full duration.

A `setInterval` of about 250 ms refreshes the display, and a `visibilitychange` refresh catches up
after a background tab. Browsers throttle background timers, so counting ticks would drift. A
timestamp does not.

### State survives navigation through `sessionStorage`

The state is saved under a key derived from the page path (`minuterie:<pathname>`). That keeps
two timers on different screens separate and keeps different tabs separate. It is read when the
page loads: a `marche` state whose `fin` has passed loads as `fini`. Every read and write is
wrapped in `try/catch`. If storage is unavailable, the timer works as before, but it resets
when the screen changes.

*Alternative:* `localStorage`. Rejected because a timer left running would reappear the next time
the lesson is opened, possibly weeks later.

### Click toggles, double-click resets

The browser sends `click`, `click`, `dblclick` for a double-click. The two clicks toggle the state
twice (for example, start then pause). The `dblclick` handler then sets the state to `arret`
whatever happened before, so the reset is always clean, and the meaning of single clicks needs no
delay. The timer is a `<button>`. Its `aria-label` gives the remaining time and the next action
(« 4 minutes 12 restantes — cliquer pour mettre en pause »), and it is updated only when the
state changes, not every second. The visible digits are `aria-hidden` to avoid a per-second
announcement.

### Keyboard focus is left to the existing navigation

`Ecran.astro` is not changed. After a click the button has focus, and Space would normally
activate it. The document `keydown` handler already calls `preventDefault()` on Space and moves to
the next screen, which is what the spec requires. Enter on the focused button activates it, which
is acceptable and is not documented as a feature.

### Digits avoid French typography

The `m:ss` text is written by the script and by the template from a number. It never goes through
`typo()`, which would insert a thin non-breaking space before `:` (« 5 :00 »). The digits use
`font-variant-numeric: tabular-nums` so the width does not jump each second.

### Visual states

| État    | Display                                                               |
|---------|-----------------------------------------------------------------------|
| `arret` | full duration, dimmed (reduced opacity of `--texte`), `--trait` border: looks like "ready" |
| `marche`| `--texte`, `--accent` border                                          |
| `pause` | `--texte`, slow pulse (none under `prefers-reduced-motion`)          |
| `fini`  | `0:00` in `--sur-accent` on an `--accent` background                  |

Sizes use the existing scale (`--t-chiffre` as the starting point); no new color token.

The size is set with `clamp()` against the viewport so the timer remains the largest element at
1024 × 768 and at 16:9 without pushing the claim off screen.

## Risks / Trade-offs

- [The first JavaScript on a repère screen] → The script is emitted only when `minuterie` is set
  (a conditional `<script>` inside the branch, or a small component). The verification build
  confirms that other repère pages contain no timer script.
- [A double-click briefly flickers start → pause before resetting] → It lasts a fraction of a
  second and the final state is always correct. A delayed single click would make every start feel
  sluggish, which is worse.
- [Offline / local copy] → The script is bundled like the other islands and needs no network.
  `verifier:hors-ligne` and `verifier:copie-locale` cover it.
