## 1. Content edit

- [x] 1.1 In `src/src/content/lecons/1.yaml`, on the `ou-le-point-a-ete-fait` écran's serie,
      remove the `constantes` block and the `legende` line, keeping `variable: l'endroit où
      le point a été fait`.
- [x] 1.2 On the same écran, add `aparte: Seule chose qui change : l'endroit où le point a
      été fait.`
- [x] 1.3 Load the screen and confirm: no figcaption renders between the 3-image series and
      `l1-hors-focus`, and the trimmed sentence renders once, below both rows.

## 2. Verification

- [x] 2.1 Run the project's content build/verification scripts to confirm the YAML still
      validates against `src/src/content.config.ts`'s `ecranDemonstration` schema
      (`constantes` defaults to `{}`, `legende` and `aparte` are optional, so this is a
      no-op for the schema).
