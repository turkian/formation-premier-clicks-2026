## 1. Content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, set the `pause` block's `titre` to « Pause » and its `resume` to a line without questions; set `la-pause`'s `titre` to « Pause », its `claim` to « On prend une pause de 5 minutes. », remove `corps` and `aparte`, add `minuterie: 5`. Verify with `npm run verifier:contenu` (from `src/`).

## 2. Timer

- [x] 2.1 Add `minuterie` (optional positive integer, minutes) to the repère schema in `src/src/content.config.ts`. Verify `npm run build` passes with session 3's new field and fails on `minuterie: 0`.
- [x] 2.2 In `Repere.astro`, keep `titreSeul` true when only a timer is added, and render a `<button>` timer reading the full duration (`m:ss`, not passed through `typo()`) with the client script only in that branch. Verify that the built `lecons/3/pause/la-pause/` page contains the timer and that another repère page (for example session 1's `la-pause`) contains no timer markup or script.
- [x] 2.3 Implement the script per design: state `arret / marche / pause / fini` computed from an end timestamp; click toggles; dblclick resets; display stops at `0:00`; refresh on `visibilitychange`; state kept in `sessionStorage` under `minuterie:<pathname>` with `try/catch`; `aria-label` updated on state change only. Verify by hand in `npm run dev`: start, pause, resume, double-click reset, go to the next screen and back (still running, correct time), let it reach `0:00` (stays, silent).
- [x] 2.4 Add timer styles to `src/src/styles/lecon.css` (tabular digits, four visual states, pulse disabled under `prefers-reduced-motion`, size via `clamp()`). Verify `npm run verifier:projection` passes (no overflow at 1024 × 768 and 16:9) and check each state by eye on the projected size.
- [x] 2.5 Check that keyboard navigation is unchanged: after clicking the timer, Space and → move to the next screen and ← moves back. Verify by hand in the browser.

## 3. Integration

- [x] 3.1 Run `npm run verifier:tout` from `src/` and verify it passes (content, browser checks, offline / local copy include the timer script).
- [x] 3.2 Run `openspec validate session-3-pause-timer --strict` and verify it passes.

## Workflow follow-up

- Archive the change once the screen has been checked on the projector.
