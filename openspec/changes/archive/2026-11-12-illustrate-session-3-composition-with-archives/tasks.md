## 1. Settle the rights

- [x] 1.1 Open each McCord Stewart accession number of design D1 on the museum's site and record its rights line, exact date, photographer and largest download size; verify each is marked public domain or « no known restrictions », and that the photographer and date match D1
- [x] 1.2 Look for a publication in 1930 or earlier of *Bobsleighing at Ste. Agathe* (VIEW-4871): a newspaper, a Notman catalogue, a postcard; verify that either a dated publication is recorded, or `quatre-coins` is switched to the hospital fallback of design D3
- [x] 1.3 Check the Notre-Dame interior (VIEW-1190) at full resolution for nude or partly nude figures in paintings or statues; verify it passes, or switch `symetrie` to the C.P.R. car (II-93008) and repeat 1.1 for it
- [x] 1.4 Confirm the five international pictures' pages (Met 267426 and 283222, Rijksmuseum RP-F-2008-51-2170-112, Turnbull Library *Grotto in an iceberg*, LoC 96513079) still show their open-access or « no known restrictions » statement; verify each, and that none of the sixteen shows nudity

## 2. Image files

- [x] 2.1 Download the sixteen files (by hand for the McCord Stewart), crop museum mounts, captions and page margins, resize like the other demos and save them as `src/public/demos/l3-compo-<slot>.jpg` under the existing slot ids; verify `ls src/public/demos/l3-compo-*` lists sixteen files of a size comparable to `l3-au-dela-*.jpg`
- [x] 2.2 Compare the sixteen files with every other `l3-*.jpg`; verify no picture, or another print of the same negative, appears twice in session 3

## 3. Lesson content

- [x] 3.1 In `src/src/content/lecons/3.yaml`, add a rights comment above the `composition` block listing, for each picture: author (death year, or « opérateur non nommé » with the D3 basis), date, title, collection and reference, US basis; verify it covers all sixteen slots
- [x] 3.2 For each of the sixteen `image` entries, rewrite `specification` to name the picture, author and date, add an `alt` in French describing what is in the frame, and a `credit` « Auteur, année, collection » per design D2, keeping `id` and `priorite` unchanged; verify every entry has `specification`, `alt` and `credit`, and that « Indian » appears nowhere in visible text
- [x] 3.3 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass
- [x] 3.4 Run `npm run liste-de-prises-de-vue -- --manquantes`; verify no `l3-compo-*` slot is listed as missing and the first-tier slots are still `essentiel`

## 4. Integration checks

- [x] 4.1 Build with `SEANCES_TOUJOURS_PRETES=1`, then run `npm run verifier:projection` and `npm run verifier:telephone`; verify no composition screen overflows at 1024 × 768 or 16:9 and the columns stack at phone width
- [x] 4.2 Read the composition block on the built site; verify each photograph shows the technique of its column (the cliff edge on a thirds line for « Les tiers », three girls for « Le nombre impair »…) and each credit is readable when the photograph is enlarged
- [x] 4.3 Run `npm run verifier:tout` in `src/` and `openspec validate illustrate-session-3-composition-with-archives --strict`; verify both pass

## Workflow follow-up

- Decide the design's open question: mention the photographers' shadows of the bobsleigh picture in the `nettoyer` aside, if that picture is kept.
- Archive the change once implemented and reviewed, then check that `openspec/specs/lessons/spec.md` and `openspec/specs/demo-media/spec.md` carry the new requirements.
