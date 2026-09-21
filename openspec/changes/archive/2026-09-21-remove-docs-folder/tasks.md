## 1. Delete the folder

- [x] 1.1 Delete `docs/` in its entirety and verify `ls docs/` fails and `git status` shows the directory removed

## 2. Clean dangling references

- [x] 2.1 Remove the "Partage docs/ ↔ site" section from `openspec/config.yaml` and verify `grep -n "docs/" openspec/config.yaml` returns nothing
- [x] 2.2 Update the provenance comments in `src/content/lecons/1.yaml`, `2.yaml`, `3.yaml` that cite `docs/Session N/...` as their source, and verify `grep -rn "docs/" src/content/lecons/` returns nothing
- [x] 2.3 Update the comment in `src/pages/plan-de-cours.astro` that cites `docs/Documents/plan-de-cours.md`, and verify `grep -n "docs/" src/pages/plan-de-cours.astro` returns nothing
- [x] 2.4 Reword the two comments in `src/scripts/verifier-contenu-final.mjs` (near the `LOGISTIQUE` list and near the `soir`-radical check) that justify the checks by referencing `docs/`, without changing the `LOGISTIQUE` array or any regex logic, and verify `grep -n "docs/" src/scripts/verifier-contenu-final.mjs` returns nothing

## 3. Verify

- [x] 3.1 Run `grep -rn "docs/" --include="*.mjs" --include="*.ts" --include="*.astro" --include="*.yml" --include="*.yaml" --include="*.json" .` from the repo root (excluding `node_modules`) and confirm the only remaining hits are inside `openspec/changes/` (this change's own artifacts and the archived history)
- [x] 3.2 Run `npm run verifier:contenu` from `src/` and confirm it still passes — the reworded comments must not change what the checks reject
- [x] 3.3 Run `npm run build` from `src/` and confirm it completes without error (`docs/` was never part of the Astro build, so this should be unaffected — a failure here would indicate a missed reference)
