## Why

Session 3's pause screen says too much and times nothing. Its claim, body and aside (questions on
any subject, come show a photograph, unanswered questions become workshop topics) are said out loud
in the room; the wall only needs to say that this is a break and how long is left. A visible
countdown lets the room pace itself without the animateur calling the time.

## What Changes

- **Pause block (`pause`)**: its title becomes « Pause » (was « Pause et questions »). Its `resume`
  no longer mentions questions.
- **Pause screen (`la-pause`)**: its title becomes « Pause », its claim becomes « On prend une
  pause de 5 minutes. », and its body and aside are removed. The « Pause » label stays.
- **New: a repère screen can carry a countdown timer.** A repère screen MAY declare a duration in
  minutes; it then shows a large countdown under its claim, set to that duration and stopped.
  - a click starts it; a click while it runs pauses it; a click while paused resumes it;
  - a double-click resets it to the full duration, stopped;
  - it reaches `0:00` and stays there, silently, with a visual change of state;
  - leaving the screen and coming back in the same browser tab keeps its state (running, paused
    or finished) and the remaining time.
- Only session 3's pause screen declares a timer. Session 1's pause screen is unchanged.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: « Session 3's pause is a single question break » becomes a timed break without
  questions; « Session 3 answers how to make better photographs » names the block « the pause »
  rather than « the pause and questions ». **ADDED**: a repère screen can carry a countdown timer.

## Impact

- `src/src/content.config.ts`: an optional duration field on the repère schema.
- `src/src/components/ecrans/Repere.astro`: renders the timer and its small client script when the
  field is set. It is the first repère screen to ship JavaScript; no other repère screen changes.
- `src/src/styles/lecon.css`: timer styles (size readable from the back of the room, stopped /
  running / paused / finished states).
- `src/src/content/lecons/3.yaml`: the `pause` block and its `la-pause` screen.
- Navigation (`Ecran.astro`) is unchanged: Space and arrow keys still change screen.
- Session 3 keeps 25 screens and 6 blocks.
