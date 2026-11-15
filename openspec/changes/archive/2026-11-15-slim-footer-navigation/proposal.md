# Proposal

## Why

On screens with long photo credits, such as session 3's « Placer » panel with three archive
credits, the footer navigation gets squeezed until it breaks over three lines: « ← / Précédent »,
« 12 / / / 25 », « Suivant / → ». The words take room the credit needs. The bigger problem is that
nothing stops the navigation from shrinking, so even the screen counter falls apart.

## What Changes

- The footer's previous and next links show only their arrows (`←`, `→`). The words
  « Précédent » and « Suivant » are removed from what's shown.
- Each arrow link keeps an accessible name (« Précédent », « Suivant »), so screen readers don't
  announce a bare "left arrow".
- The arrow links get a tap target larger than the glyph, so they stay usable on a phone.
- The footer navigation (arrows and the `n / total` counter) always stays on one line and never
  shrinks. When the footer runs short of room, the photo credit wraps instead.
- The greyed-out arrow on the first and last screen stays, as a lone faded arrow.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: adds a requirement that the lesson footer's navigation shows only arrows and the
  screen counter, keeps accessible names on the arrows, and never wraps, whatever the length of
  the photo credit.

## Impact

- `src/src/layouts/Ecran.astro`: the footer `.navigation` markup (link text, `aria-label`).
- `src/src/styles/lecon.css`: `.pied-ecran .navigation` (no shrinking, no wrapping) and the
  padding on the footer links.
- No content, schema or keyboard-navigation change. The arrow keys work as before.
- The credit gets more horizontal room, so on long-credit screens the footer should be the same
  height or shorter at 4:3 and 16:9. On phones the footer already wraps (`flex-wrap`), and the
  navigation will now wrap as a whole unit.
- Out of scope: the « ◀ Précédente / Suivante ▶ » buttons inside the Obturateur interactive.
  They're a different control.
