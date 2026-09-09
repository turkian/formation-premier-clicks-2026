## 1. Point the default the other way

- [x] 1.1 In `src/src/styles/base.css`, delete `li { margin-bottom: 0.32em; }` and
      `li:last-child { margin-bottom: 0; }`
- [x] 1.2 In their place, add the two prose-scoped rules from design D1/D2, every part wrapped in
      `:where()` — including `:where(li:last-child)`, so both land at specificity (0,0,0)
- [x] 1.3 Do **not** add a `li { margin-bottom: 0 }` reset: at (0,0,1) it outranks the rules
      above and flattens the plan de cours (design D1)
- [x] 1.4 Comment the pair with the rule in words — vertical rhythm belongs to prose, a list laid
      out in a grid or a row is spaced by its own `gap` — not with the property it sets

## 2. Give the one unscoped prose list a scope

- [x] 2.1 In `src/src/pages/lexique/index.astro`, add the `prose` class to the wrapper of the
      numbered `<ol>` of sections, so it is spaced by the same declaration as the plan de cours
- [x] 2.2 Confirm no other rendered list on the site sits outside `.prose`, `.corps`, `.aparte`,
      and `.fiche-corps` — the check in 5.2 answers this

## 3. Remove the suppressions that are now redundant

- [x] 3.1 In `src/src/styles/lecon.css`, drop `margin: 0` from `.gestes li`, keeping its other
      declarations
- [x] 3.2 In `src/src/styles/lecon.css`, drop `margin: 0` from `dialog.index-blocs li`, keeping
      `counter-increment: b`
- [x] 3.3 In `src/src/styles/carrefour.css`, update the comment above `.liste-simple li` so it
      names what that rule actually does — the link fills its `<li>` when a title wraps — and no
      longer implies it is what makes rows align. The rule itself does not change

## 4. Make the contract checkable

- [x] 4.1 In `src/scripts/verifier.mjs`, add an `alignement` mode: for every `<ul>`/`<ol>` on
      every built page, group `<li>` children by rounded `top` offset and fail any group of two
      or more whose heights differ by more than 0,5 px
- [x] 4.2 Report page, list (class or tag), and the differing heights, in the format the existing
      `verifier()` helper uses
- [x] 4.3 Group by geometry, never by class name or `display` — that is what makes the check
      survive a layout built a different way (design D5)
- [x] 4.4 Run it at the widths the suite already defines: `TELEPHONE`, `PROJECTION_43`, and a
      desktop width
- [x] 4.5 Wire `alignement` into the `tout` mode and into the usage comment at the top of the file
- [x] 4.6 Add an `npm run verifier:alignement` script to `src/package.json`, matching the naming
      of the existing per-mode scripts

## 5. Verification

- [x] 5.1 `npm run build` — no error, same page count as before the change
- [x] 5.2 `npm run verifier:alignement` — **0 ragged rows**. The same check reports 36 against the
      current build, across three widths and ten pages; that number is the before-state to beat
- [x] 5.3 Confirm the computed `margin-bottom` of every `.corps`, `.region-corps`, `.fiche-corps`,
      `.introuvable`, and `.prose` list item is unchanged — `10,08 px`, `0,18em`, `9,6 px`, and
      `10,752 px` respectively, for last children as well as the rest (design D2)
- [x] 5.4 On `/lecons/1`, confirm « Bienvenue » and « Les quatre questions » now measure the same
      height, and that the row is `10,7 px` shorter than before rather than taller
- [x] 5.5 On `/lexique`, confirm the rows of brand chips are separated by the `0,4 rem` the
      stylesheet declares, not `17,1 px`
- [x] 5.6 `npm run verifier` — print, phone, projection, and links all still pass
- [x] 5.7 `npm run verifier:tout` — the full suite

## Definition of Done

- No list item anywhere on the site carries prose spacing because it is a list item; it carries it
  because it is in prose.
- The three séances' sommaires and the lexique's brand selector have no ragged rows, at phone,
  projection, and desktop widths.
- Every prose context renders at exactly the spacing it rendered before, from its own declaration.
- No stylesheet contains a `margin: 0` whose only purpose is to disarm a site-wide list rule.
- A future list laid out in a grid inherits nothing to suppress, and a regression fails
  `npm run verifier:tout` instead of reaching a projector.
