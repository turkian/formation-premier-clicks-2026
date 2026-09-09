## Why

The lesson toolbar's three controls (`Index`, `Plein écran`, `Sommaire`) have accumulated
overlapping and, in one case, broken behavior. A `data-plein-ecran` attribute is used both as a
CSS-only marker on `<html>` (kiosk-mode scroll lock) and as the DOM hook the fullscreen button's
script looks up with `document.querySelector('[data-plein-ecran]')`. Because that selector matches
by attribute presence and returns the first match in document order, it resolves to `<html>`
instead of the button — so the click listener is attached to the whole page, and every click
anywhere on a slide toggles fullscreen. The toolbar's other two controls also overlap in purpose
(a block-jump modal and a full lesson-summary link both existed as separate one-click escape
hatches), which the animator no longer wants — a plain "back to the room's screens" affordance
(the lesson start) and a "leave the deck" affordance (the site root) cover what's actually used.

## What Changes

- **BREAKING**: The block-index modal (`i` key, "Index" button, `IndexBlocs.astro`) is removed
  entirely. There is no longer an in-lesson way to jump directly to an arbitrary block; the
  animator falls back to the site root and re-entering the lesson.
- Fix the `data-plein-ecran` selector collision so the fullscreen button's click listener attaches
  to the actual button, not to `<html>`. This is what stops clicking the slide body from toggling
  fullscreen, and also fixes `aria-pressed` never reflecting the real fullscreen state on the
  visible button.
- Rename the button that used to open the block-index modal to **"Premiers clics"** and repoint it
  to the site root (`/`), matching the label already used for the same destination in the lesson
  summary page's breadcrumb.
- Rename the "Sommaire" link to **"Début"** and repoint it from the lesson summary page to the
  lesson's first screen (`/lecons/{numero}/{blocs[0].id}/{blocs[0].ecrans[0].id}`).
- Reorder the toolbar left to right as: Plein écran, Début, Premiers clics — least disruptive
  (view toggle) to most disruptive (leave the lesson) action.
- Remove the `i` keyboard shortcut and its hint text; `f` (fullscreen) is unchanged. No new
  keyboard shortcuts are added for the renamed controls (the animator's remote sends only
  arrows/PageUp/PageDown/space).

## Capabilities

### Modified Capabilities
- `lessons`: the "Keyboard navigation, block index, and position indicator" requirement changes —
  the in-lesson block-index affordance (button, keyboard shortcut, "running late" scenario) is
  dropped, and the toolbar's remaining controls are given precise navigation targets (site root,
  lesson start, fullscreen toggle) instead of describing only fullscreen and the index.

## Impact

- `src/src/layouts/Ecran.astro` — toolbar markup (reorder, relabel, retarget hrefs) and script
  (drop index/dialog wiring, fix the fullscreen selector).
- `src/src/components/IndexBlocs.astro` — deleted.
- `src/src/styles/lecon.css` — remove now-unused `dialog.index-blocs` rules.
- `openspec/specs/lessons/spec.md` — requirement text and scenarios updated (delta in this change).
- No route, content, or build-config changes; no other lesson screens reference the removed modal.
