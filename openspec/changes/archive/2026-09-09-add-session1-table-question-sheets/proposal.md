## Why

Session 1's pause currently routes every question through one wall-mounted "tableau à
questions" — a shared sheet and sticky notes that only the animateur reads and answers,
in front of the whole room. That mechanism ignores a resource the evening has already
built: the tables are seated in mixed-experience groups from the opening tour de table,
and a question a tablemate could answer in ten seconds still has to wait for the
animateur's attention. It also gives every question the same weight and the same
audience, whether or not the room needed to hear it.

## What Changes

- **BREAKING** (session 1 only): remove the wall + sticky-note question mechanism
  ("tableau à questions", "papillons adhésifs") from session 1. Sessions 2 and 3 keep
  it for now — this change does not touch them.
- Add a second per-table sheet, distinct from the fiche d'îlot, that appears on each
  table at the start of the pause (`0:50`) and stays through the return from break.
  Anyone at the table may write a question on it during the pause.
- On return (`1:02`), each table first tries to answer the questions written on its own
  sheet, among its own members, before anything goes to the room.
- The former "vos questions" slot (`1:02–1:12`) becomes a short cross-table catch: a
  question a table couldn't answer is opened to the whole room, and any participant —
  not only the animateur — may answer it.
- No mechanism carries an unresolved question past the end of the session. Session 1's
  groups are not the same people who will sit together in session 2, so there is no
  sheet or wall for a leftover question to land on next time; whatever isn't resolved
  in-room during session 1 simply isn't resolved by this mechanism.

## Capabilities

### Modified Capabilities
- `lessons`: the pause/questions block for session 1 routes questions through tables and
  a cross-table catch instead of a shared wall; add the requirement describing this
  screen behavior.

## Impact

- `src/src/content/lecons/1.yaml` — écrans `la-pause` and `vos-questions` (bloc `pause`)
  rewritten: table sheet instead of wall/papillons, cross-table catch instead of
  animateur-read wall.
- `docs/Session 1/formation_photo_session_1.md` — the `0:50–1:02 Pause` and
  `1:02–1:12 Vos questions` sections rewritten: table sheet logistics, in-table pass,
  cross-table catch: no carry-over to session 2.
- `docs/Session 1/avant-la-seance.md` — add the new question-table-sheet to the prep
  checklist and room setup; remove session 1's copy of the "tableau à questions" setup
  item, but keep a prep note that the wall material still needs to exist for session 2
  (it currently says "il sert aux trois séances, prépare-le une fois" from session 1's
  prep list — that note needs to move, not disappear).
- No change to the fiche d'îlot (`prénom · marque · frustration`) content or its
  collection at the start of the pause; the new question sheet is a separate object on
  the same table.
- No change to sessions 2 or 3 content, timing, or the existing wall mechanism there.
