## Why

The "Les quatre questions" screen (`content/lecons/1.yaml`, écran `avant-chaque-photo`)
buries its pivot — automatic mode answers the four questions badly — inside a plain
paragraph, between the four-question list and the closing line. The paragraph carries
the argument's turning point but reads with the same weight as everything around it, so
it doesn't land. The existing `.encadre`/`ton` visual language already exists for exactly
this ("la réponse, la règle, la phrase qui protège") but is currently wired only to
cumulative, click-through panels (`etats`) — a static panel like this one cannot use it.
While making this static-panel capability reusable, we're also introducing the project's
first icon so the callout can carry a small visual marker instead of color alone.

## What Changes

- Extend the `panneau` screen schema so a **static** panel (no `etats`) can render one
  boxed callout (`encadre` + `ton`), reusing the existing `.encadre` visual language
  instead of requiring the cumulative-reveal mechanism.
- Add an icon reference to the callout (e.g. `icone: lucide:triangle-alert`) and render
  it inline inside the box.
- Add `astro-icon` plus one Iconify JSON collection (e.g. `@iconify-json/lucide`) as new
  build-time dependencies — **first UI/icon dependency in this codebase** — chosen
  specifically because `astro-icon` inlines literal `<svg>` markup at build time, so the
  offline mode and the `file://` local copy (`copie-locale.mjs`) keep working with no
  runtime fetch.
- Rewrite the `avant-chaque-photo` screen's content:
  - Drop "Toute la formation consiste à les traiter une par une." from the `claim`.
  - Move the automatic-mode paragraph and the closing line into one `encadre`
    (`ton: avertissement`), ending on the closing line as the payoff.
  - Drop "ce n'est pas devenir technique" from that closing line.

## Capabilities

### Modified Capabilities
- `lessons`: a static concept panel can carry one highlighted callout (encadre + ton +
  icon) without becoming a cumulative, click-through panel.

## Impact

- `src/src/content.config.ts` — schema: add `encadre`/`ton`/`icone` to `ecranPanneau`.
- `src/src/components/ecrans/Panneau.astro` — render the static encadre (with icon)
  after `corps`, independent of the `etats`/`dense` cumulative path.
- `src/src/styles/lecon.css` — icon sizing/alignment inside `.encadre`.
- `src/src/content/lecons/1.yaml` — content restructure of the `avant-chaque-photo`
  écran (see What Changes).
- `src/package.json` — new dependencies: `astro-icon`, `@iconify-json/lucide` (or
  equivalent collection).
