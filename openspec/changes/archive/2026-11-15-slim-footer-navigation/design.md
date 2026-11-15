# Design

## Context

The footer (`.pied-ecran` in `src/src/layouts/Ecran.astro`) is a single flex row: state dots,
QR code, photo credit, then `.navigation`, pushed right by `margin-left: auto`. No child sets
`flex-shrink`, so all of them shrink, and the long italic credit wins. Inside `.navigation`, the
counter is built as `typo(\`${n} / ${total}\`)`, and `typo()` turns neither space around the slash
into a non-breaking space. That's why the counter itself broke into `12`, `/`, `25` in the
screenshot. See proposal.md (Why) for the symptom, and the `lessons` delta for the required
behavior.

## Goals / Non-Goals

**Goals:**

- Make the navigation a rigid unit, so wrapping is impossible however long the credit or however
  narrow the screen.
- Give each arrow an accessible name without adding any visible text.

**Non-Goals:**

- Changing `typo()` so that `n / total` becomes non-breaking everywhere. The block indicator
  « Bloc 3 / 6 » sits in the top bar, which already uses `white-space: nowrap` with an ellipsis.
  A rule specific to the footer is enough.
- Restyling the footer: its font size, colours and the credit's two wordings stay as they are.
- Moving the inline `style="opacity:0.4"` into a class. That would be nice, but it isn't needed.

## Decisions

**1. Make the navigation rigid with `flex: none` and `white-space: nowrap` on `.pied-ecran
.navigation`.**
`flex: none` stops the footer from narrowing the navigation. `nowrap` stops its inner spaces from
breaking, including the two around the slash. The credit stays `flex: 1 1 auto` by default, so it
takes all the squeeze and wraps over more lines.
*Alternative:* a fixed `min-width` on the navigation. It would be brittle, since the counter goes
from `1 / 9` to `25 / 25` and the projection, phone and 4:3 scales all differ.
*Alternative:* non-breaking spaces in the counter string. That keeps the counter in one piece,
but the navigation can still shrink and squeeze the arrows. Only the flex rule fixes the cause.

**2. Give the accessible name with `aria-label`, not a visually hidden span.**
Markup shape: `<a rel="prev" aria-label="Précédent">←</a>`. The label replaces the link's text as
its accessible name, so the arrow isn't read as "flèche gauche", and voice control ("cliquer
Précédent") still matches it.
*Alternative (tried, rejected):* a `.visuellement-cache` span holding the word, with the arrow set
to `aria-hidden`. Screen readers handle it the same way, but `verifier:projection` flags any
element whose content overflows an `overflow: hidden` box. The 1px hidden span is exactly that, so
every screen failed at 1280 × 720. Adding an exemption to the verifier would have weakened a check
that guards the projection floor, all to keep two words in the content.

**3. The faded ends keep only the arrow, hidden from assistive technology.**
The inactive `<span>` on the first and last screen becomes `<span aria-hidden="true"
style="opacity:0.4">←</span>`. Without a link, its name would mean nothing to a screen reader, and
the counter already says « 1 / 25 ». Keeping the span holds the counter in place between the first
screen and the next one.

**4. Enlarge the tap target with padding, and cancel it visually with a negative margin.**
Footer links get `padding: 0.4em 0.6em; margin: -0.4em -0.6em;` (or put the padding inside the
flex `gap`). The hit area grows about 3× around the glyph, while the visible spacing and the footer
height stay the same. The existing `:hover` (accent colour) and the global `:focus-visible`
outline then draw around the larger box, which is good for keyboard users too.
*Alternative:* bigger arrow glyphs. They would make the footer heavier on the projector, which is
the opposite of this change's aim.

## Risks / Trade-offs

- [The credit wraps onto one more line on long-credit screens and makes the footer taller at 4:3]
  → Dropping the words gives back about 150 px first, so on balance the « Placer » footer should be
  the same height or shorter. Check « Placer » at 1024 × 768 against the projection floor.
- [The negative margin makes the hit areas of `←` and the counter overlap] → The counter isn't
  interactive, so an overlap only widens the arrows' targets. Keep the margin no larger than the
  `gap` (`var(--pas)`), so the two arrows never overlap each other.
- [A lone `→` is less self-explanatory than « Suivant → » to a first-time phone reader] → The
  arrow next to `n / total` is a common slide-deck convention, and the hover colour and keyboard
  arrows back it up. This is accepted.

## Migration Plan

This is a presentation change only, with no content or URLs touched. Deploy it with the usual
GitHub Pages build. To roll back, revert the commit.
