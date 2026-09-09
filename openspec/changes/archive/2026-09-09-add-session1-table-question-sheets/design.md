## Context

See proposal.md - Why. Two existing session-1 mechanics constrain this design:

- **The fiche d'îlot** (`docs/Session 1/formation_photo_session_1.md:62`) already puts one
  sheet on each table during the opening tour de table (`prénom · marque d'appareil · ce
  qui me frustre le plus`), and it is collected by the animateur at the moment the pause
  begins (`0:50`) so its data is available for composing session 2's groups.
- **The tableau à questions** (wall + sticky notes) is set up once, in session 1's prep,
  and reused unchanged across all three sessions (`docs/Session 1/avant-la-seance.md:66`
  — "il sert aux trois séances, prépare-le une fois"). This change only removes it from
  session 1; sessions 2 and 3 still need it prepped.

## Goals / Non-Goals

**Goals:**
- Replace session 1's wall-based question mechanic with a table-based one, without
  disturbing the fiche d'îlot's own content or collection timing.
- Keep the room-setup checklist for session 1 accurate once the wall is no longer used
  there, without breaking the (still-needed) prep for sessions 2 and 3.

**Non-Goals:**
- Redesigning the fiche d'îlot itself.
- Deciding the session 2 or 3 mechanic — deferred, see Open Questions.
- Any change to the site's screen schema (`content.config.ts`) or Astro components — the
  affected screens (`repère`, variantes `pause` and `questions`) already render free-form
  `corps`/`aparté` prose, so this is a content change, not a schema change.

## Decisions

### The question sheet is a second, separate physical object from the fiche d'îlot
**Alternative considered:** reuse the fiche d'îlot itself for questions, e.g. by adding a
column to it.
**Rejected because:** the fiche d'îlot is collected by the animateur at `0:50`, the exact
moment the pause (and the question-writing window) begins. A sheet that leaves the table
right when it's needed can't also serve as the table's question sheet during the break.
Keeping them separate means the fiche d'îlot's existing content and collection timing are
untouched.

### The former "vos questions" slot keeps its position and length, changes its content
**Alternative considered:** shorten or drop the `1:02–1:12` slot now that most questions
should already be resolved at the table.
**Rejected for now because:** the slot's actual duration in the room is driven by however
many leftovers surface, not by the schedule line — same as today, where "dix minutes
annoncées, qui en dureront treize" already accounts for this. No evidence yet that the
cross-table catch will consistently run shorter than the wall-reading it replaces; revisit
after running it once.

### The "tableau à questions" prep note moves from session 1 to session 2
**Alternative considered:** delete the wall-prep note from `avant-la-seance.md` outright.
**Rejected because:** sessions 2 and 3 still use the wall mechanic; the material still
needs to exist before session 2. The note ("il sert aux trois séances, prépare-le une
fois") is only true today because session 1 happens first — once session 1 stops using
it, session 2's own prep doc becomes the right place to first mention it.

## Risks / Trade-offs

- **[Risk]** Writing a question on a table sheet is visible to tablemates, unlike an
  unsigned sticky note on a shared wall — this removes the one channel documented as
  reaching "les gens qui décrochent," participants who would never ask out loud
  (`docs/Session 1/formation_photo_session_1.md:246`).
  **Mitigation:** none proposed by this change — accepted as the direct cost of routing
  questions through peer discussion instead of anonymous submission. Worth watching for
  in the first run.
- **[Risk]** A question a table cannot resolve, and that also goes unanswered in the
  cross-table catch, is simply dropped — there is no wall to hold it until session 2.
  **Mitigation:** none — this is the intended behavior once groups are no longer fixed
  across sessions (see proposal.md - What Changes). If this proves costly in practice, an
  animateur-side capture (e.g. the animateur jots down anything that got no answer) is a
  candidate for a later change, not this one.

## Migration Plan

1. Rewrite `content/lecons/1.yaml` screens `la-pause` and `vos-questions`.
2. Rewrite `docs/Session 1/formation_photo_session_1.md` sections `0:50–1:02 — Pause` and
   `1:02–1:12 — Vos questions`.
3. Update `docs/Session 1/avant-la-seance.md`: replace the session-1 question-sheet prep
   item (was: tableau à questions) with the new table sheet (copies, blank, one per
   table); drop the "il sert aux trois séances" wall note from session 1's list.
4. Add the wall-prep note to `docs/Session 2/avant-la-seance.md` (or wherever session 2's
   prep checklist lives) so the material is still prepared before session 2 needs it.
   This step is the one piece of this change that touches session-2 files, and it is
   prep-logistics only — session 2's own screen content and mechanic are untouched.

No rollback concerns beyond reverting the edited files: nothing here is user-facing
outside of the printed/projected material for a single upcoming session.

## Open Questions

- Whether session 2 adopts table sheets too, and if so, where the cross-table catch fits
  in its already-tight schedule (it currently has no plenary questions block at all,
  relying on per-station debriefs instead) — deferred to a future change.
- Whether session 3 adopts the same mechanic, given it has no "next session" to defer
  anything to anyway — deferred to a future change.
