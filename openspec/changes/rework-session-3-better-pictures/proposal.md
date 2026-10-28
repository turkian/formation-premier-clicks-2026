## Why

Session 3 (« Composer, développer, continuer ») spends most of its screens on editing software:
JPEG and RAW, reading an image, seven development gestures, masks, sorting and export. Editing is
poorly learned by thirty people at once, and the site already sends it to a later small-group
workshop. The last session should answer the question participants actually bring after two
sessions of settings: **how do I make better photographs?** Sessions 1 and 2 dealt with what the
camera can decide for you; composition is the one thing it never decides.

## What Changes

- Reorient session 3 around « comment faire de meilleures photos ? ». New `question`,
  `filConducteur` and `titre` (working title « Composer, choisir, montrer »). The lesson stays
  `pret: false` until its images are supplied.
- **Add a recap of session 2**, using the pattern already used for session 2: an open question on
  what participants photographed and learned since session 2, then one story: shutter speed
  (freeze or let motion show, the two blurs) → ISO as the volume, chosen last → `M` with ISO auto
  and the `+/−` button. It hands over to « ce que l'appareil ne décide jamais » : the framing.
- **Add a history block on the first photographers** and how they learned to see, in four
  stages: the technique as the challenge → pictorialism imitating painting → straight
  photography doing what only photography can do → the decisive moment. Painting is mentioned
  where history puts it (pictorialism), not as a parallel for each composition rule. Images are
  public-domain archival photographs (for example Niépce, Daguerre's *Boulevard du Temple*,
  Muybridge, Robinson, Stieglitz 1893 and 1907, Atget). Photographers still under copyright
  (Cartier-Bresson, Strand, Steichen) are named and linked, not shown.
- **Rework the composition block** as techniques ordered from most to least impact, in three
  tiers, all presented in the session. Two or three techniques share a screen as side-by-side
  columns, each with its photograph, under a title naming what they do to the image:
  - tier 1 — *Simplifier*, *Nettoyer*, *Placer* ;
  - tier 2 — *Donner de la profondeur*, *Guider l'œil* ;
  - tier 3 — *Structurer*, *Respirer*.

  The five current reflexes become tier 1. The two before/after series are removed as separate
  screens, and their photographs illustrate the matching columns. The « cinq fois le même objet »
  hands-on screen is kept.
- **Add a « Mes apprentissages » block** in the animateur's own voice, signed and illustrated:
  why you take pictures and for whom (you must like your pictures first) → RAW on a single
  screen → the animateur's workflow (import → back up → sort → develop → export) with a few
  hints → print → show your pictures, with a montage of photographs from the animateur's
  exhibitions. The block has room for further tips added later.
- **BREAKING (content)**: remove the blocks `fichiers` (except one RAW screen), `lire-une-image`,
  `sept-gestes`, `masques-nettete-bruit` and `trier-exporter`, including the export-recipe table.
  The table is not turned into a printable sheet.
- Keep the participants' montage, the pause and questions block, and « Et maintenant ? »
  (trimmed where it repeats the removed process screen).

## Capabilities

### New Capabilities

_None._ Archival images are demonstration slots; their rights rules belong to `demo-media`.

### Modified Capabilities

- `lessons`: the recap requirement gains a session 3 scenario (the session 2 story and its
  handover to framing); new requirements for the history block, the composition block (ordered
  by impact, two or three techniques per screen in columns with photographs, all three tiers
  presented) and the first-person experience block (a signed testimony that still addresses the
  participants and stays true for a later reader); session 3 no longer carries a development
  demonstration.
- `demo-media`: **REMOVED** the requirement for the seven cumulative development states; the
  essential-slot list drops the composition before/after pairs and the development states and
  adds the first-tier composition-technique photographs; new requirement that a third-party archival image
  be public domain both in Canada (author died before 1972) and in the United States, and carry
  its author, date and source as a credit.

## Impact

- `src/src/content/lecons/3.yaml`: rewritten block by block (`diaporama` kept, `retour` new,
  history block new, `composition` rewritten, `pause` kept, experience block new,
  `et-maintenant` trimmed; five blocks removed).
- `src/public/demos/l3-*`: new slots for composition techniques, archival photographs, the RAW
  screen and the exhibition montage. No `l3-*` file exists yet, so nothing is deleted.
- Components: none expected. Concept panels already accept two or three `colonnes`, each with
  an `image` (`src/src/content.config.ts`); the session 2 recap pattern and repère columns are
  reused as they are.
- `openspec/specs/lessons/spec.md`, `openspec/specs/demo-media/spec.md`: deltas above.
- The checks in `src/scripts/verifier-contenu-final.mjs` must still pass: sessions named by rank,
  no `soir` stem outside the allowed phrases, about 100 words per concept panel, and everything
  visible at 1024 × 768 and 16:9. No script references session 3's current screen ids.
- Out of scope: a session 3 exercise page (`exercices/3.yaml`), and the editing workshop that
  « Et maintenant ? » announces.
