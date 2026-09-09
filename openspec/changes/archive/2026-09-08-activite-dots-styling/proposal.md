## Why

The « appareil en main » screen's numbered-step presentation (a counted orange circle
before each instruction, defined by `.gestes` in `lecon.css`) exists precisely so a
hands-on moment is recognizable from the back of the room without reading — that's an
explicit requirement in the `lessons` spec. The `activite` repère screen (e.g.
`tour-de-table`) carries the same kind of content — numbered steps a participant follows
right now — but its list renders through the generic `.corps ol` rule, which is a plain
browser-numbered list with no visual weight. The two screen kinds ask the room to do the
same thing (follow numbered steps immediately) but only one of them looks like it. On
`deux-pas-de-cote` specifically, the closing aparté ("Aucun réglage. C'est volontaire —
…") also restates what the screen already shows and adds nothing once the steps are read.

## What Changes

- Give `activite` repère screens the same recognizable numbered-circle presentation as
  « appareil en main » screens, scoped to `variante: activite` only — other numbered
  lists in `panneau`/`repère` corps content (e.g. "Les quatre questions") are unaffected.
- Remove the `aparte` text from the `deux-pas-de-cote` écran in `content/lecons/1.yaml`.

## Capabilities

### Modified Capabilities
- `lessons`: an `activite` repère screen's numbered instructions SHALL use the same
  recognizable, at-a-glance numbered-step presentation as an « appareil en main » screen.

## Impact

- `src/src/styles/lecon.css` — extend the `.gestes` circled-counter rules to also match
  `.repere[data-variante="activite"] .corps ol` (and its `li`/`li::before`), reusing the
  existing selectors rather than duplicating the component.
- `src/src/content/lecons/1.yaml` — remove the `aparte` field on the `deux-pas-de-cote`
  écran (id `lumiere` block).
