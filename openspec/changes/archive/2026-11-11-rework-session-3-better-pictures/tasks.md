## 1. Frame the lesson and clear the old content

- [x] 1.1 In `src/src/content/lecons/3.yaml`, set `question` to « comment faire de meilleures photos ? », update `titre` (working title « Composer, choisir, montrer ») and `filConducteur`, keep `pret: false`, and rewrite the header comment (drop decision D11 and the seven gestures); verify `npm run build` succeeds in `src/`
- [x] 1.2 Delete the blocks `fichiers`, `lire-une-image`, `sept-gestes`, `masques-nettete-bruit` and `trier-exporter`, first noting the hints to reuse in task 5.4 (two sorting passes, never develop before sorting, vibrance rather than saturation, keep a copy of the original); verify `grep -n 'l3-dev\|trier-exporter\|sept-gestes' src/src/content/lecons/3.yaml` returns nothing and the build succeeds

## 2. Recap of session 2

- [x] 2.1 Add a `retour` block after `diaporama` with `bilan` (repère/ouverture, « depuis la séance 2 », photos in general, no exercise and no animateur photographs); verify the screen names the session by rank only
- [x] 2.2 Add `rappel-vitesse` (panneau, two `colonnes` figer / laisser voir, with new `l3-*` slots pointing via `fichier` at `l2-figer.jpg` and `l2-laisser-voir.jpg`, and the two blurs); verify both photographs render and the panel stays around 100 words
- [x] 2.3 Add `rappel-iso` (ISO is the volume, chosen last; noise comes from a lack of light) and `rappel-m-iso-auto` (`M` with ISO auto, then the `+/−` button); verify neither mentions composition or phones
- [x] 2.4 Add `ce-que-l-appareil-ne-decide-pas` (repère/transition, two `colonnes`: what the camera can decide — sharpness, exposure — and what it never decides — framing) as the block's last screen; verify by reading the five screens in order against the session 3 recap scenario in `specs/lessons/spec.md`

## 3. History of composition rules

- [x] 3.1 Select the archival images: an engraving from John Thomas Smith's *Remarks on Rural Scenery* (1797) with the horizon on a third, plus the page where he names the rule, Rejlander's *The Two Ways of Life* (1857), and a page of Robinson's *Pictorial Effect in Photography* (1869) carrying a composition diagram; for each, record author, death year, date and source; verify every image is public domain in Canada and the US
- [x] 3.2 Download, resize like the other demos and save them as `src/public/demos/l3-histoire-smith.jpg`, `l3-histoire-smith-regle.jpg`, `l3-histoire-rejlander.jpg` and `l3-histoire-robinson-effet.jpg`; keep `l3-histoire-robinson.jpg`; delete the six unused files (`niepce`, `daguerre`, `muybridge`, `stieglitz-hiver`, `stieglitz-entrepont`, `atget`); verify `ls src/public/demos/l3-histoire-*` lists exactly five files
- [x] 3.3 Replace the `histoire` block's four screens with `avant-la-photo` (Smith; the aside says the rule meant a proportion of masses, not the nine-box grid), `la-photo-devient-un-art` (Rejlander, Robinson 1858) and `les-regles-s-ecrivent` (the *Pictorial Effect* page, Price 1860 in the aside, a handover to composition); update the block's `titre`, `resume` and rights comment; verify every image has a `credit` with author, date and source, and `grep -n 'Niépce\|Daguerre\|Muybridge\|Stieglitz\|Atget\|Cartier-Bresson' src/src/content/lecons/3.yaml` returns nothing
- [x] 3.4 Add to the `placer` aside that the rule of thirds was named in 1797, for drawing; verify it is the only historical reference in the `composition` block

## 4. Composition

- [x] 4.1 Rewrite the `composition` block's `ouverture` and replace `cinq-reflexes`, `avant-apres-distance` and `avant-apres-hauteur` with the technique screens of design D1 (`simplifier`, `nettoyer`, `placer`, `donner-de-la-profondeur`, `guider-l-oeil`, `structurer`, `respirer`), each a panneau whose title names its effect and whose `colonnes` carry a name, one sentence and an `image` slot; verify the order puts tiers 1, 2 and 3 in sequence
- [x] 4.2 Reuse the before/after specifications for « se rapprocher » and « le point de vue », mark tier 1 slots `essentiel` and tiers 2–3 `utile`, and keep the aside « la règle des tiers est un point de départ » on `placer`; verify with `npm run liste-de-prises-de-vue` that the priorities match `specs/demo-media/spec.md`
- [x] 4.3 Move `cinq-fois-le-meme-objet` to the end of the block, unchanged; verify it asks for no setting and keeps its phone note
- [x] 4.4 Check `simplifier` and `respirer` (three columns) at 1024 × 768 and 16:9 on a build with `SEANCES_TOUJOURS_PRETES=1`, using `npm run verifier:projection`; if either overflows, split it into two two-column screens and verify again

## 5. Mes apprentissages

- [x] 5.1 Add the `apprentissages` block after `pause` with an `ouverture` repère naming the animateur (full name or initials, as the animateur chooses); verify the block reads as a testimony to someone who was not in the room
- [x] 5.2 Add `pourquoi-pour-qui` with its claim addressed to the participants (« aimez vos photos d'abord ») and its body in the first person; verify the claim contains no « je » and the body stays around 100 words
- [x] 5.3 Add `le-raw`, merging what still matters from the old `deja-developpee` and `le-raw` (the JPEG is already developed, RAW looks flat on purpose, RAW + JPEG), with the brand file extensions and section 4 pointer in the aside; verify it is the only RAW screen in the lesson
- [x] 5.4 Add `mon-flux` (import → back up → sort → develop → export) and `mes-astuces` (the hints noted in 1.2, rewritten in the animateur's voice, plus room for later tips); verify neither walks through individual editing controls
- [x] 5.5 Add `imprimer` and `montrez-vos-photos` (demonstration with an `l3-expositions` montage slot whose specification describes the montage, credited to the animateur); verify the slot shows its specification while the image is absent and `montrez-vos-photos` is the block's last screen

## 6. Et maintenant

- [x] 6.1 Rewrite `le-processus-complet` for the new arc (see a scene → light → settings → compose → choose → show), keep `la-suite`, `rester-dans-le-mouvement` (with the editing workshop) and `la-question-de-fin`; verify no screen still mentions export recipes or the seven gestures

## 7. Integration checks

- [x] 7.1 Run `npm run verifier:modele` and `npm run verifier:contenu` in `src/`; verify both pass, including rank-based session names, the `soir` stem and the address rule
- [x] 7.2 Build with `SEANCES_TOUJOURS_PRETES=1` and run `npm run verifier` (projection, phone, links); verify no session 3 screen overflows at 1024 × 768 or 16:9 and no link is broken
- [x] 7.3 Read session 3 from start to end on the built site; verify the block order matches `specs/lessons/spec.md` and the screen count is about 32
- [x] 7.4 Run `openspec validate rework-session-3-better-pictures --strict`; verify the change is valid

## Workflow follow-up

- Supply the essential images (tier 1 composition, the exhibition montage) and the further tips; setting `pret: true` is a separate decision.
- Archive the change once implemented and reviewed, then check that the `lessons` and `demo-media` specs carry the new requirements.
