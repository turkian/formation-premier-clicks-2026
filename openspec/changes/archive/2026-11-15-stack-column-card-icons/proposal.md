## Why

On a screen with column cards, each card's header lets its icon and title share a line when they
fit, and wraps the title below the icon when they don't. The layout therefore depends on the length
of the title: on session 3's « Au-delà de la composition » opening screen, « Captiver » sits beside
its icon while « Faire ressentir » and « Faire imaginer » drop below theirs. Three parallel ideas
end up with three headers that don't line up, and the room reads a difference that isn't there.

## What Changes

- A column card's icon always sits on its own line, above the card's title, on every screen that
  shows column cards (repère screens and concept panels alike), whatever the title's length.
- Titles and bodies on the same screen start at the same height from card to card when their icons
  are the same size.
- Cards without an icon are unchanged: the title opens the card.
- Concept panels with columns give one header line to the icon. Their demonstration photographs
  shrink by that height. They must still fit at 1024 × 768 and 16:9.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: **ADDED** a requirement that a column card places its icon above its title,
  regardless of the title's length.

## Impact

- `src/src/styles/lecon.css`: the `.colonne header` rule (currently a wrapping row).
- Screens affected: every repère screen and concept panel whose columns carry icons — among them
  session 2's « La vitesse / L'ISO » screen and session 3's opening screens and composition panels.
- Content, schema, components, scripts, assets: none.
