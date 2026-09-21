## Context

See proposal.md - Why. `docs/` is dead content: a private facilitation carnet for a
workflow no longer used, plus a handful of provenance/justification comments in
`src/` and `openspec/config.yaml` that cite paths inside it. None of those
references are functional imports or build inputs — `docs/` was never read by
Astro, npm scripts, or tooling at runtime — so removal is a content/prose change,
not a code change. `skip_specs: true` applies; there is no observable-behavior
delta to specify.

## Goals / Non-Goals

**Goals:**
- Remove `docs/` and every dangling textual reference to it, leaving no path
  that a future reader could follow into a folder that no longer exists.
- Preserve the exact behavior of `src/scripts/verifier-contenu-final.mjs`'s
  content checks (the `LOGISTIQUE` list and the `soir`-radical rule) — only
  their justification comments change, never the regex/array logic itself.

**Non-Goals:**
- `src/README.md`'s `docs/` mention — owned by the `rework-readme` change.
- Any change to what the verifier accepts or rejects.
- Rewriting or preserving `docs/` content elsewhere (it is discarded, not migrated).

## Decisions

- **Delete `docs/` before cleaning references, then verify with a repo-wide
  grep.** Deleting first turns "find every dangling reference" into a
  mechanical `grep -rn "docs/"` sweep instead of a manual inventory that could
  miss a file. Alternative considered: clean references first, delete last —
  rejected because it requires enumerating references up front (error-prone)
  instead of letting the deletion itself surface them via grep.
- **Reword comments in place; never touch the checks they justify.** The two
  `verifier-contenu-final.mjs` comments explain *why* a check exists, not *what*
  it does. Rewording them to drop the `docs/` framing keeps the check's actual
  behavior (and therefore `npm run verifier:contenu`'s pass/fail results) byte-for-byte
  equivalent, which the task's own verification step confirms.
- **Treat historical mentions of `docs/` in `openspec/changes/` (this change's
  own artifacts, and already-archived changes) as out of scope for the grep
  sweep.** Those are a record of what happened, not live references a reader
  would follow — rewriting archived change history would be revisionist for no
  functional benefit.

## Risks / Trade-offs

- [Deletion is irreversible in the working tree] → Mitigated by git history:
  `docs/` remains recoverable via `git log`/`git revert` for anyone who needs
  the old carnet content later.
- [A reference to `docs/` survives outside the file extensions the final grep
  covers (`.mjs .ts .astro .yml .yaml .json`)] → The proposal's impact list is
  scoped to exactly the files that cite `docs/` today (verified by an initial
  repo-wide grep before this design was written); the task's closing grep
  re-checks that scope rather than trusting the list blindly.
- [A reworded comment accidentally changes adjacent regex/logic] → Mitigated by
  running `npm run verifier:contenu` after the edit and requiring it to still
  pass with the same checks enforced.
