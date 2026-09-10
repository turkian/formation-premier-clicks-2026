## Why

The « le facteur invisible » panel (lesson 1, bloc profondeur-de-champ) poses its question in
prose only: it names the camera/lens/aperture setup and asks the question, but has no way to show
the physical scenario — a subject at 1 m versus a subject at 3 m — before the room is asked to
guess. It also frames the lens as a « zoom de kit » that's « tout ce qu'il peut faire » (all it
can do), which reads as apologetic about the gear rather than stating it plainly. The animator
wants this screen to read as a clear mise en situation: state the setup (capteur APS-C, objectif
courant, f/5.6 as that lens's maximum aperture — the point where it lets in the most light), show
it, then ask the question — without spoiling the numeric answer the panel's later états reveal.

## What Changes

- Rework `le-facteur-invisible`'s `corps` text to state the setup (capteur APS-C, objectif courant
  réglé à 50 mm, f/5.6 as its maximum aperture at that focal length) before the question, replacing
  the « zoom de kit » / « c'est tout ce qu'il peut faire » framing.
- Add a new drawn diagram (`distance-sujet` schema component) to `le-facteur-invisible`, showing
  the photographer-to-subject setup at 1 m and at 3 m side by side — without indicating the
  resulting depth of field, which stays withheld for the panel's later états.
- Register the new `distance-sujet` component in `components/schemas/registre.ts`.
- Simplify the downstream « zoom de kit » phrasing in `demo-la-distance` and
  `demo-ouverture-et-fond` (later in the same lesson, in the `ouverture` bloc) to plain « 50 mm »,
  now that the lens has already been introduced as a common lens earlier in the lesson and doesn't
  need re-justifying. The unrelated « pourquoi votre kit dit f/3.5-5.6 » explanation
  (deux-retombées panel, same `ouverture` bloc) is substantively about
  variable-aperture zoom optics and is out of scope.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `distance-diagrams`: add a requirement that a distance diagram may present two distances side by
  side for direct comparison, and that such a comparison must not reveal the outcome (e.g. the
  resulting depth of field) the comparison is meant to provoke a guess about.

## Impact

- `src/src/content/lecons/1.yaml`: reworked `corps` and new `schema` on `le-facteur-invisible`;
  wording simplification in `demo-la-distance` and `demo-ouverture-et-fond`.
- `src/src/components/schemas/`: new schema component reusing the existing `pieces/Vous.astro` and
  `pieces/Sujet.astro`, registered in `registre.ts` alongside `zone-nette`, `diametre-ouverture`,
  etc.
- `src/src/components/ecrans/Panneau.astro`: the panel's `schema` region now only renders when the
  panel isn't "dense" (i.e. before any état has been revealed) — see design.md Decisions for why.
- No changes to the `panneau`/`demonstration` content schema (`content.config.ts`), to any
  `demonstration` screen structure, or to image assets.
