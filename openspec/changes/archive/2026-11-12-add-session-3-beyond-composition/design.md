## Context

The change edits `src/src/content/lecons/3.yaml` only, plus new archival files under
`src/public/demos/`. The content model already covers every screen: a `repere` screen can carry
two or three `colonnes` (title, short body, icon) to announce ideas without explaining them, and a
`panneau` can carry two or three `colonnes`, each with an `image`, plus an `encadre` and an
`aparte`, as the composition block does. Session 3 is `pret: false`, so removing screens breaks
no public link, and no script references `cinq-fois-le-meme-objet`, `la-pause` or
`vos-questions`.

See proposal.md for motivation and `specs/lessons/spec.md` for the requirements.

## Goals / Non-Goals

**Goals:**
- A block that reads as an opening, not a second composition course: five screens against
  composition's eight.
- Tool screens that look like composition's, so the room recognizes the format.
- Draft wording close enough to final that implementation is mostly transcription and fitting.

**Non-Goals:**
- Any change to components, the schema, styles or scripts.
- Reworking « Le processus complet » or « Pourquoi, et pour qui »; the new block hands over to
  them as they are.
- The club's own photographs: they may replace archival slots later, with no structural change.

## Decisions

### D1. Screen sequence

```
composition   ouverture … respirer                     unchanged; cinq-fois-le-meme-objet removed
pause         la-pause           repere/pause          « Pause et questions » — one screen
au-dela       ouverture          repere/ouverture      3 colonnes: captiver · faire ressentir · faire imaginer
              captiver           panneau, 2 col        la tension · les relations
              faire-ressentir    panneau, 3 col        le calme · la vulnérabilité · l'inquiétude + encadré
              faire-imaginer     panneau, 2 col        ce qu'on ne montre pas · l'avant et l'après
              pourquoi           repere/transition     the closing question; 3 colonnes recap
apprentissages ouverture, pourquoi-pour-qui, …         unchanged
```

The screen count goes from 30 to 33. `la-pause` keeps its id, so the merged screen keeps the
address of the old first pause screen; `vos-questions` disappears.

*Alternative considered:* keeping both pause screens. Rejected by the animateur: a single break
before a new block is enough, and a second questions screen slows the session down.

### D2. Three intentions as the frame, five tools inside it

The source material offers two overlapping lists: five tools (tension, mystery, emotion,
relationships, before/after) and three objectives (captiver, faire ressentir, faire imaginer).
Teaching both side by side gives beginners two taxonomies for one idea. The three objectives
become the screen titles, as composition's screens are titled by what they do (*Simplifier*,
*Nettoyer*…), and the five tools become columns under them. Emotion, a single tool in the source,
becomes three contrasting emotions on its own screen, because a column per emotion is what can
be shown.

*Alternative considered:* one screen per tool (five panels plus opener and closing, seven
screens). Rejected: as long as composition, against the animateur's request.

### D3. Draft wording

Wording is a starting point; panels stay around 100 words, and the tasks fit them on screen.

**Pause** (`la-pause`, repère/pause) — titre « Pause et questions » · claim « Dix minutes, et vos
questions. » · corps « Sur la composition, ou sur n'importe quoi d'autre : matériel, choix
d'objectif, « pourquoi mes photos ne ressemblent pas à celles d'Instagram ». C'est aussi le
moment de venir montrer une photo sur votre écran. » · aparte: the existing workshop line.

**Ouverture** (repère/ouverture) — titre « Au-delà de la composition » · claim « Une photo peut
être parfaitement composée, et ne rien dire. » · colonnes:
- *Captiver* — « Donner une raison de s'arrêter. »
- *Faire ressentir* — « Créer une émotion, une atmosphère. »
- *Faire imaginer* — « Suggérer ce qui n'est pas dans l'image. »

**Captiver** — claim « Une photo forte arrête celui qui la regarde. »
- *La tension* — « Un regard vers nous, un sujet au bord du cadre : l'image est instable. »
- *Les relations* — « Deux éléments qui se répondent ou se contredisent. Le sujet, c'est le
  lien. »
- aparte: Elliott Erwitt, *New York City*, 1974, named and linked.

**Faire ressentir** — claim « Une photo n'a pas besoin de raconter pour faire ressentir. »
- *Le calme* — « Peu d'éléments, une lumière douce, des lignes horizontales. »
- *La vulnérabilité* — « Un petit sujet devant quelque chose de très grand. »
- *L'inquiétude* — « Un regard ailleurs, un geste retenu, rien pour rassurer. »
- encadré (ton `regle`) « **Pas des formules.** Une photo sombre n'est pas forcément triste.
  Demandez-vous d'abord : **qu'est-ce que je veux faire ressentir ?** »
- aparte: « Pour plus tard : la même personne deux fois, pour deux émotions — en ne changeant que
  la lumière, la distance ou l'angle. »

**Faire imaginer** — claim « Ce que la photo ne montre pas, celui qui la regarde l'invente. »
- *Ce qu'on ne montre pas* — « Assez d'indices pour imaginer, pas assez pour savoir. »
- *L'avant et l'après* — « Un geste pas fini : on devine la suite. »
- aparte: Stieglitz waited three hours in a snowstorm for this moment; Henri Cartier-Bresson will
  call it « l'instant décisif » (*Derrière la gare Saint-Lazare*, 1932); Gregory Crewdson stages
  stories that never end. Named, linked where useful, never shown.

**Pourquoi** (repère/transition) — titre « Pourquoi » · claim « Avant de vous demander comment
composer votre photo, demandez-vous pourquoi vous voulez la prendre. » · colonnes:
- *Composer* — « Où va le regard ? »
- *Choisir* — « Qu'est-ce que je veux dire ? »
- *Toucher* — « Que va ressentir ou imaginer celui qui regarde ? »

The source's « demande-toi » becomes « demandez-vous »: the site addresses participants with
« vous » throughout. « Storytelling » is not used; *faire imaginer* covers it.

### D4. Archival photographs

All `utile`. Ids follow `l3-au-dela-<auteur>[-<sujet>]`. Credits follow the existing
« Auteur, année, collection » form.

| Column | Photograph | Author († ) | Likely source |
|---|---|---|---|
| La tension | *Bandit's Roost*, 1888 | Jacob Riis († 1914) | Museum of the City of New York / LoC |
| Les relations | *The Steerage*, 1907 (publ. 1911) | Alfred Stieglitz († 1946) | LoC / Met |
| Le calme | *Gathering Water-Lilies*, 1886 | P. H. Emerson († 1936) | Met / Getty |
| La vulnérabilité | *Sadie Pfeifer*, 1908 | Lewis Hine († 1940) | LoC, NCLC collection |
| L'inquiétude | *Migrant Mother*, 1936 | Dorothea Lange († 1965) | LoC, FSA/OWI |
| Ce qu'on ne montre pas | an empty Paris street or courtyard, 1900–1920s | Eugène Atget († 1927) | BnF / Musée Carnavalet / MoMA |
| L'avant et l'après | *Winter, Fifth Avenue*, 1893 | Alfred Stieglitz († 1946) | LoC / Met |

Every author died before 1972 (public domain in Canada). In the United States, the works were
published before 1929 or are federal works (Lange, FSA), and are therefore public domain. Each
file's US status and the absence of nudity are still checked one by one before it is added.

*Alternative considered:* the photographs named in the source (Cartier-Bresson, Crewdson,
Erwitt). Rejected: their authors died after 1971 or are alive; the site names and links them.

## Risks / Trade-offs

- [Three columns plus an encadré and an aparte overflow `faire-ressentir` at 1024 × 768] → drop
  the aparte first, then shorten the encadré; if it still overflows, move the encadré's question
  to the claim.
- [Archival photographs look dated next to composition's modern photographs] → the slots are
  `utile` and can take the club's own photographs later without touching the structure.
- [*Migrant Mother* is famous, and its subject, Florence Owens Thompson, objected to how it was
  used] → no caption says anything about her beyond what the photograph shows; if the animateur
  prefers, another FSA photograph by Lange (federal work) fills the same slot.
- [Atget is named but no single photograph is chosen yet] → the slot's specification describes
  the intended picture (an empty street, a door, a courtyard, no people), and the choice is made
  during the rights check.
- [Session 3 loses its only hands-on exercise] → accepted by the animateur; the « deux fois, deux
  émotions » idea survives as a line in an aside, and the monthly challenge can take it up.

## Migration Plan

Content-only; session 3 stays `pret: false`. Rollback is reverting the commit.
