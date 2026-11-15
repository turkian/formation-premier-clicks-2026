## Why

`stack-column-card-icons` put a column card's icon on its own line above the title on every screen
with column cards. Repère screens needed it: their cards hold only a title and a short body, and
titles of different lengths gave neighbouring cards different shapes. Concept panels did not need
it. There, the extra header line comes out of the demonstration photographs, which are the reason
those screens exist (session 3's « Captiver » panel, for example). Their cards should go back to
the earlier header.

## What Changes

- Only cards on **repère screens** (the section-divider screens, whose cards carry no photograph)
  put their icon on its own line above the title.
- Cards on **concept panels** go back to the earlier header: the icon sits beside the title when
  both fit on one line, and the title moves below the icon when they don't. This applies to every
  concept panel, with or without photographs.
- Concept-panel photographs get back the height of one header line.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `lessons`: the requirement « A column card places its icon above its title » is renamed and
  narrowed to repère screens. A scenario now covers concept panels, where the icon sits beside the
  title when they fit.

## Impact

- `src/src/styles/lecon.css`: the `.colonne header` rule. The stacked layout moves to repère cards
  only, and the wrapping row comes back as the default.
- Screens that change back: every concept panel with icon cards. In session 2: « La décision »,
  « Qu'est-ce que l'ISO », « Le raisonnement ». In session 3: the speed and ISO reminders, the seven
  composition panels, « Captiver », « Faire ressentir » and « Faire imaginer ».
- Screens that keep the stacked layout: the repère screens with cards. In session 2: « Deux nouveaux
  leviers ». In session 3: the opening screen, « Ce que l'appareil ne décide pas » and « Pourquoi ».
- Content, schema, components, scripts and assets do not change.
