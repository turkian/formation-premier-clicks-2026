# Tasks

## 1. Header layout

- [x] 1.1 In `src/src/styles/lecon.css`, restore `.colonne header` as a wrapping row (icon beside the title when they fit) and move the stacked column layout to `.repere .colonne header`; verify by reading the rule that only repère cards are selected for the stacked layout

## 2. Integration checks

- [x] 2.1 Build and run `npm run verifier:projection` and `npm run verifier:telephone` in `src/`; verify no screen overflows at 1024 × 768 or 16:9, in particular session 3's photo panels, and that every screen fits phone width
- [x] 2.2 Screenshot `lecons/3/au-dela/captiver` and `lecons/3/au-dela/ouverture` at projection width; verify « La tension » and « Les relations » sit beside their icon, and « Captiver », « Faire ressentir », « Faire imaginer » sit below theirs
- [x] 2.3 Run `npm run verifier:tout` in `src/` and `openspec validate scope-stacked-card-icons-to-reperes --strict`; verify both pass

## Workflow follow-up

- Archive the change, then check that `openspec/specs/lessons/spec.md` names the requirement « A repère card places its icon above its title ».
