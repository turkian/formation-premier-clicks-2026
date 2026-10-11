## Context

See proposal.md — Why. The `exercices` collection, the `/exercices/[numero]` route and the hub
card already exist (archived change `add-practice-exercises`); session 1's `exercices/1.yaml` is
the model. Leçon 2 (`src/src/content/lecons/2.yaml`) is the source of the concepts. This design
records the editorial decisions so the YAML can be written without re-deciding them.

## Goals / Non-Goals

**Goals:**
- Every concept session 2 introduces has at least one exercise, unless it is understanding-only.
- Every exercise can be attempted alone, without the room, a neighbour or dimmable lights.

**Non-Goals:**
- Readiness gating for exercise pages (decided against; see Decisions).
- Grouping exercises under headings — the schema stays a flat list.
- Any exercise for the session 1 recap block (`retour`): it is not new content.

## Decisions

**Coverage drives the count, not session 1's six.** Draft map, in file order:

| # | id | concept in leçon 2 | solo subject / gesture | `cellulaire` |
|---|---|---|---|---|
| 1 | `figer-ou-laisser-voir` | figer / laisser voir, and the range between (`la-decision`, `trois-vitesses`) | a running tap at 1/1000, 1/60, 1/4, camera braced | yes |
| 2 | `qui-a-bouge` | two blurs, two causes (`deux-flous`) | same slow speed, a moving subject with the camera braced, then hand-held | yes |
| 3 | `votre-vitesse-limite` | hand-held rule `1/focale` | a still scene, slowing down one step at a time until it blurs | yes |
| 4 | `dessiner-la-lumiere` | chosen blur: light trails | camera set down, 10 s self-timer, 2 s pose, drawing with one's own phone light — or car headlights at night | yes |
| 5 | `le-flou-voulu` | chosen blur: camera movement | 1/4 s, sweeping the camera over something colourful | yes |
| 6 | `le-file` | chosen blur: panning | following a passing car or cyclist at 1/30 | yes |
| 7 | `l-iso-eclaircit` | ISO brightens (`l-iso-eclaircit`) | `M`, the same room at ISO 100 / 800 / 6400 | yes |
| 8 | `ne-sous-exposez-pas` | noise comes from missing light; noise lives in the shadows (`d-ou-vient-le-bruit`, `le-bruit-dans-l-ombre`, `nette-ou-propre`) | dim room: high ISO well exposed vs low ISO brightened afterwards; zoom into the shadows | yes |
| 9 | `m-et-iso-auto` | ISO comes last; `M` + ISO auto (`le-raisonnement`, `m-et-iso-auto`) | decide what matters, set aperture and speed, read the ISO the camera chose | yes |
| 10 | `le-blanc-et-le-noir` | `+/−`: white turns grey, black turns grey | a white sheet at 0 then +1; a black object at 0 then −1 | no |
| 11 | `le-contre-jour` | `+/−`: backlight makes a silhouette | someone in front of a window at 0, then +1 to +2 | no |

Understanding-only, no exercise: the shutter's mechanics (`l-obturateur`), the history of ISO
and ASA (`qu-est-ce-que-l-iso`).

Merged rather than split: the three-speed range goes into #1, and noise in the shadows into #8,
since zooming into the shadows is how #8's comparison is read. Split rather than merged: the
`+/−` exercise becomes #10 and #11 — different symptoms, different amounts of correction.
Considered dropping #9 to stay near six; kept, because it is the only exercise that practises the
reasoning rather than a single control.

**File order follows the lesson: speed → ISO → `+/−`.** It reads naturally on a long phone
scroll without implying a required order, which `practice-exercises` forbids. Optional groups in
the schema were considered and rejected: a code and spec change for a reading convenience.

**Solo subjects only.** The lesson's hands-on screens rely on a neighbour and a dimmed room; each
exercise here is rewritten around something found at home or in the street.

**Lexique pointers by section number.** Instructions may say « section 1 de votre feuille de
marque » (modes `S`/`Tv`, `M`) or « section 3 » (ISO auto, its upper limit, `+/−`). The sections are
numbered identically across all eight brands, so the pointer is true for everyone. `cellulaire`
stays reserved for a phone limitation and its alternative, as in session 1.

**No gating.** The page is published as soon as the file exists, although leçon 2 is
`pret: false`. Making exercises follow the lesson's `pret` was considered (one flag for the
whole séance) and declined: the spec already requires exercises to stand alone, and gating them
would need code and a spec delta.

## Risks / Trade-offs

- [Session 2's exercises go public before its lesson] → Accepted: they are understandable on
  their own; the hub card does not claim the lesson is available.
- [Nearly every exercise carries a `cellulaire` note, unlike session 1] → Accepted: it reflects
  what phones expose; notes stay short and give the alternative (`Pro` mode, Live Photo « Pose
  longue »), never just the limitation.
- [Eleven items is a long list on a phone] → Lesson-order file ordering; titles kept short so the
  list is scannable.
- [Night/darkness wording trips §13.5 of the content verifier] → Use « la nuit », « dans le
  noir », never the « soir » radical.
