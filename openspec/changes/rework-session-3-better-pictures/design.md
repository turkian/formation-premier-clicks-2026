## Context

The change rewrites `src/src/content/lecons/3.yaml` block by block. The content model already
has everything it needs: `repere` screens with `colonnes`, `panneau` screens with two or three
`colonnes` that each carry an `image` (the session 2 decision screen), `demonstration` screens
with up to three photographs and an optional loupe, `fichier` to point a new slot at an existing
file, and `credit` on any image. No component, schema or style change is planned.

Session 3 is `pret: false`, so its route is gated. No public deep link to its current screens
exists, and no `l3-*` image has been supplied. No script references session 3's screen ids.

See proposal.md for motivation and `specs/` for the requirements. Project constraints that shape
the work: sessions named by rank, the `soir` stem refused in lesson content, about 100 words plus
one diagram or table per concept panel, and everything visible at 1024 × 768 and 16:9.

## Goals / Non-Goals

**Goals:**
- A session of about 33 screens. Sessions 1 and 2 have 38 and 27, so the spec's "approximately
  eighteen" is already loose in practice.
- A layout of composition screens that reads from the back of the room with three photographs.
- A first-person block that still follows the rule that lesson text speaks to the participants.

**Non-Goals:**
- Any change to components, the content schema, styles or the verification script.
- Choosing the animateur's exhibition photographs and writing the tips still to come: the block
  has room for them, and the content is supplied later.
- A session 3 exercise page.

## Decisions

### D1. Screen sequence

```
diaporama        le-diaporama                    demonstration     kept as is
retour           bilan                           repere/ouverture  « Avez-vous pris des photos depuis la séance 2 ? »
                 rappel-vitesse                  panneau, colonnes figer / laisser voir, the two blurs
                 rappel-iso                      panneau           the volume, chosen last; noise = lack of light
                 rappel-m-iso-auto               panneau           M + ISO auto, then +/−
                 ce-que-l-appareil-ne-decide-pas repere/transition colonnes: decides (sharpness, exposure)
                                                                   vs never decides (framing)
histoire         la-technique                    demonstration     Niépce, Daguerre (loupe on the man), Muybridge
                 imiter-la-peinture              demonstration     Robinson 1858, Stieglitz 1893
                 ce-que-seule-la-photo-peut      demonstration     Stieglitz 1907, Atget
                 l-instant-decisif               panneau           text + external link, no image
composition      ouverture                       repere/ouverture
                 simplifier                      panneau, 3 col    un seul sujet · se rapprocher · remplir le cadre
                 nettoyer                        panneau, 2 col    les quatre coins · l'arrière-plan d'abord
                 placer                          panneau, 2 col    les tiers · le centre assumé
                 donner-de-la-profondeur         panneau, 2 col    le point de vue · le premier plan
                 guider-l-oeil                   panneau, 2 col    les lignes · le cadre dans le cadre
                 structurer                      panneau, 2 col    la symétrie · la répétition
                 respirer                        panneau, 3 col    l'espace négatif · les diagonales · le nombre impair
                 cinq-fois-le-meme-objet         appareil-en-main  kept as is, at the end of the block
pause            la-pause, vos-questions         repere            kept as is
apprentissages   ouverture                       repere/ouverture  signed: whose experience this is
                 pourquoi-pour-qui               panneau
                 le-raw                          panneau           merges today's deja-developpee and le-raw
                 mon-flux                        panneau           import → back up → sort → develop → export
                 mes-astuces                     panneau           first hints; later tips extend here
                 imprimer                        panneau
                 montrez-vos-photos              demonstration     exhibition montage
et-maintenant    le-processus-complet            panneau           rewritten for the new arc
                 la-suite, rester-dans-le-mouvement, la-question-de-fin   kept
```

The recap has five screens (one prompt, three panels, one transition). That matches the session 2
recap and its seven-minute budget. The hands-on screen closes the composition block, so the pause
follows naturally, and its steps (far, close, crouched, raised, background) practise tiers 1 and 2
without any setting.

Alternative considered: placing the exercise right after tier 1. Rejected because it would split
the ladder in two, with a hands-on screen between tiers that are meant to be read in one go.

### D2. Composition screens reuse the panel's columns

Each technique screen is a `panneau` with `colonnes`: the title names the effect (« Simplifier »),
and each column carries the technique's name, one sentence and an `image` slot. This is exactly
the session 2 decision screen, so projection and phone layouts are already handled and covered by
the checks.

Three columns are used only where the photographs explain themselves (« Simplifier »,
« Respirer »). The column body stays to one sentence, so the photographs keep the space.

Alternatives considered: a `demonstration` with free photographs wrapped in columns, rejected
because it does not give each photograph a title and a sentence; and a new "technique card"
component, rejected because the existing columns already do this.

The old before/after series become the images of « Simplifier / se rapprocher » and « Donner de
la profondeur / le point de vue », keeping their slot specifications.

### D3. The recap reuses session 2's photographs through `fichier`

`rappel-vitesse` points new `l3-*` slots at `l2-figer.jpg` and `l2-laisser-voir.jpg`, the
pattern already used for `l3-dev-0-depart-bis`. That keeps slot ids unique per lesson, and the
recap shows the same images participants already saw. No interactive component is used in the
recap. The shutter animation would re-teach instead of recalling.

### D4. Archival photographs are hosted, never hotlinked

Archival images are downloaded from Wikimedia Commons (or the holding institution), resized like
the other demos, and stored as `public/demos/l3-histoire-*.jpg`. Each `credit` gives author, date
and source. Before a file is added, the author's death date is checked against the Canadian rule.

Alternative considered: linking to Commons directly. Rejected because the site works offline
through its service worker and loads nothing from third parties.

The decisive-moment screen shows no photograph. Cartier-Bresson is still protected, so the
screen names him and links to the Fondation Henri Cartier-Bresson. Offline, the link fails, but
the text still carries the idea.

### D5. In the experience block, the claim speaks to the participants and the body is the testimony

Each experience panel keeps its `claim` addressed to the participants, as advice
(« Aimez vos photos d'abord. »). The `corps` is the animateur speaking in the first person (« Ce
que j'ai appris… »). This satisfies both the address rule and the testimony requirement without a
new screen kind or field. The block's opening repère names the animateur once, and the
animateur's photographs carry their name as `credit`.

Alternatives considered: a new `temoignage` genre, rejected because it would be one more variant
to style and check for six screens; and the first person in claims too, rejected because a claim
is what the back of the room reads, and it should be something they can apply.

### D6. RAW is merged into one screen

`le-raw` keeps what today's two screens say that still matters: the JPEG is already developed by
the camera, RAW is a negative and looks flat on purpose, and RAW + JPEG is the practical advice.
The brand file extensions and the pointer to section 4 of the brand sheet move to the aside. The
« trois versions » demonstration and « Ce qu'aucun RAW ne rattrape » are removed. If that last
idea comes back, it goes in as a tip.

### D7. Removals are plain deletions

The blocks `fichiers`, `lire-une-image`, `sept-gestes`, `masques-nettete-bruit` and
`trier-exporter` are deleted from the YAML. Hints worth keeping (two sorting passes, never
develop before sorting, vibrance rather than saturation, keep a copy of the original) are
rewritten into `mon-flux` and `mes-astuces` in the animateur's voice, not carried over verbatim.
The file's header comment (D11, the seven gestures) is updated accordingly.

## Risks / Trade-offs

- **Three columns with photographs may not fit at 1024 × 768** → Check « Simplifier » and
  « Respirer » at 4:3 in the browser. If they overflow, split into two two-column screens. The
  spec allows two or three, and nothing else depends on the count.
- **17 composition photographs to produce** → Tier 1 is essential and tiers 2–3 useful. An absent
  photograph shows its specification, so the session still runs.
- **Archival rights are easy to get wrong** (unknown authors, posthumous publication) → Keep to
  named authors with known death dates before 1972. When in doubt, name and link.
- **External link offline** → The screen's text names the photographer and the idea, so the
  link only adds to it.
- **The animateur's name becomes public on the site** → The opening repère is the only place it
  is written. Credits can use initials if the animateur prefers.
- **The "approximately eighteen screens" requirement** → Session 3 already exceeds it, like
  sessions 1 and 2. Rewording that requirement is out of scope.

## Migration Plan

Content-only. The lesson stays `pret: false` during the rewrite. The site's checks and build must
pass after each block is rewritten. Rolling back means reverting the YAML. Flipping `pret: true`
is a separate decision, made once the essential images are supplied.

## Open Questions

- Which exhibition photographs go into the montage, and the tips still to come. These are content
  for the existing screens, with no structural impact.
- The exact archival file for each stage (resolution, crop), chosen when the images are fetched.
- Whether the animateur signs with their full name or initials.
