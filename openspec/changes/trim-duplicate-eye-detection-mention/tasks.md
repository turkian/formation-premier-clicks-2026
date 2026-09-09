## 1. Content edit

- [ ] 1.1 In `src/src/content/lecons/1.yaml`, remove the `reflex` field from the
      `designer-le-point` écran (bloc `mise-au-point`).
- [ ] 1.2 Re-read the `autofocus` écran's closing bullet (slide 10) and confirm it still reads
      cleanly as the sole place this claim appears in the bloc.

## 2. Verification

- [ ] 2.1 Run the project's content build/verification scripts to confirm the YAML still
      validates against `src/src/content.config.ts`'s `ecranAppareilEnMain` schema (the
      `reflex` field is optional there, so removing it is a no-op for the schema).
