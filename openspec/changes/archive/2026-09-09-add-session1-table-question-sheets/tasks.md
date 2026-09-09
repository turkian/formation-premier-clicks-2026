## 1. Site content — `content/lecons/1.yaml`

- [x] 1.1 Rewrite écran `la-pause` (bloc `pause`): replace the wall/papillons instruction
      with the table sheet — a sheet appears on the table at the start of the pause,
      anyone may write a question on it during the break.
- [x] 1.2 Rewrite écran `vos-questions`: frame it as a cross-table catch for whatever a
      table's own pass couldn't answer; make clear any participant may answer, not only
      the animateur; do not promise unresolved questions carry to session 2.
- [x] 1.3 Confirm the `tour-de-table` écran's fiche d'îlot instruction
      (`content/lecons/1.yaml`) is unchanged — it must still read as the same object it
      was, distinct from the new question sheet. Clarified `la-pause`'s wording
      ("pas celle du tour de table") to remove ambiguity between the two sheets.

## 2. Animateur run-of-show — `docs/Session 1/formation_photo_session_1.md`

- [x] 2.1 Rewrite `0:50–1:02 — Pause`: table sheet appears at the start of the pause,
      replacing the "feuille au mur et des papillons adhésifs" instruction.
- [x] 2.2 Rewrite `1:02–1:12 — Vos questions`: in-table pass first, then the cross-table
      catch; remove the "tableau à questions" / "commence par les papillons" guidance;
      state explicitly that nothing here carries over to session 2. Also added an
      explicit facilitator-facing callout naming the lost anonymity trade-off (per
      design.md - Risks), so it's watched for rather than silently dropped.

## 3. Prep checklist — `docs/Session 1/avant-la-seance.md`

- [x] 3.1 Replace the "tableau à questions" room-setup item (line ~66) with the new
      per-table question sheet (copies needed: one per table, plus pens) — mirror the
      fiche d'îlot's existing prep entry as a model. Added a matching "La feuille de
      questions" subsection with a template box, alongside the existing "Les fiches
      d'îlot" one.
- [x] 3.2 Remove the "il sert aux trois séances, prépare-le une fois" wall note from this
      file, since session 1 no longer sets it up.

## 4. Prep checklist — session 2 (carry the wall prep forward)

- [x] 4.1 Add the "tableau à questions" (wall + papillons + crayons) room-setup item to
      session 2's own prep checklist (`docs/Session 2/avant-la-seance.md`, `### Matériel`),
      since sessions 2 and 3 still need it and it can no longer be prepped as a side
      effect of session 1's setup.

## 5. Verification

- [x] 5.1 Run `npm run verifier:contenu` (from `src/`) to confirm the rewritten screens
      pass the French-Québec typography and no-relative-session-reference checks. 56/56
      checks passed, including 13.1 (no animateur-facing logistics leaked onto a screen)
      and 13.5 (no session referenced relative to the reader).
- [x] 5.2 Read through the rewritten `la-pause` / `vos-questions` screens and the run-of-
      show sections together, end to end, to confirm the timing and hand-off between
      them (table pass → cross-table catch) reads coherently as one sequence. Confirmed.
