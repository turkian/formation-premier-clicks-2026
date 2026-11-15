# Tasks

## 1. Header layout

- [x] 1.1 In `src/src/styles/lecon.css`, change the `.colonne header` rule from a wrapping row to a column with the icon and title aligned to the start; verify in the dev server that « Captiver », « Faire ressentir » and « Faire imaginer » on `lecons/3/au-dela/ouverture` each sit below their icon, with titles and bodies starting at the same height
- [x] 1.2 Check that no column on any screen uses `etiquette` (its `margin-left: auto` assumes a row); verify with a search of `src/src/content/lecons/*.yaml` under `colonnes:`, and if one does, give the label its own placement so it doesn't end up under the title by accident

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify no screen with icon columns overflows at 1024 × 768 or 16:9, in particular session 3's composition panels with photographs, and that every screen fits phone width
- [x] 2.2 Open session 2's « La vitesse / L'ISO » screen and session 3's repère screens with icon columns (« Ce qu'il peut décider », « Composer / Choisir / Toucher ») in the dev server; verify icons are above titles on each card
- [x] 2.3 Run `npm run verifier:tout` in `src/` and `openspec validate stack-column-card-icons --strict`; verify both pass

## Workflow follow-up

- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` contains the requirement « A column card places its icon above its title ».
