## Context

The change edits content only: `src/src/content/lecons/3.yaml`, one line of
`src/src/lib/lexique.ts`, and one phrase in each of two brand sheets. The content model already
covers the new screen: a `repere` with `variante: cloture` renders the label « Pour finir », the
claim in the statement tier and the body in the body tier. As with every `repere`, its `titre` is
used for navigation and the page title, not projected. Session 3 is `pret: false`, so removing
screens breaks no public link, and no script references the removed ids.

See proposal.md for motivation and `specs/lessons/spec.md` for the requirements.

## Goals / Non-Goals

**Goals:**
- A last screen that can stay up for the whole discussion: few words, readable from the back, and
  useful to someone who reads it alone months later.
- Draft wording close enough to final that implementation is transcription.

**Non-Goals:**
- Any change to components, the schema, styles, scripts or assets.
- Keeping the removed screens elsewhere on the site (an appendix, a printable sheet). They can come
  back in a later change, for example as a reference sheet on RAW and the workflow.
- Naming or presenting the guest photographers.

## Decisions

### D1. Screen sequence of the experience block

```
apprentissages   ouverture          repere/ouverture   rewritten: shared, animateur first
                 pourquoi-pour-qui  panneau            unchanged
                 progresser         repere/cloture     new: last screen of session 3
```

The block keeps its id `apprentissages`; only its `titre` and `resume` change. Session 3 goes from
33 screens in 7 blocks to 25 screens in 6.

*Alternative considered:* keeping « Et maintenant ? » after the discussion. Rejected by the
animateur: the session ends on the discussion, and the club's logistics are not part of the site's
content.

### D2. The discussion is a `repere`, not a `panneau`

A `panneau` explains a concept. This screen does not explain anything: it marks where the session
is and keeps the questions in view. `cloture` is the variant `la-question-de-fin` used for the same
role, so the session still ends on « Pour finir ».

### D3. Draft wording

Session header:

```yaml
titre: Composer, puis progresser
filConducteur: Apprendre à voir → composer → aller au-delà → progresser
```

Experience block:

```yaml
- id: apprentissages
  titre: Ce que la pratique nous apprend
  resume: Aimer ses photos, puis progresser — des photographes du club racontent.
  ecrans:
    - id: ouverture
      genre: repere
      variante: ouverture
      titre: Ce que la pratique nous apprend
      claim: Prenez ce qui vous sert. C'est une pratique, pas une règle.
      corps: |
        **Jean-Pierre Bluteau**, animateur de la formation « Premiers clics », commence. Puis des
        photographes du club racontent ce qu'ils ont appris en photographiant, en se trompant et
        en montrant leurs photos.

    # pourquoi-pour-qui: unchanged

    - id: progresser
      genre: repere
      variante: cloture
      titre: Progresser, et continuer d'aimer ça
      claim: Comment devient-on meilleur photographe, sans perdre le plaisir ?
      corps: |
        Des photographes du club racontent leur parcours.

        - **Qu'est-ce qui vous a fait progresser le plus ?** Une personne, un livre, une
          contrainte, une erreur.
        - **Quel moment vous a fait passer un cap ?**
        - **Qu'auriez-vous aimé savoir à vos débuts ?**
        - **Quand l'envie baisse, qu'est-ce qui vous ramène à la photo ?**
```

The body is about 60 words: under a panel's budget and readable from the middle of the room. The
questions use « vous » for the guests; a reader alone months later can answer them for themselves,
so the screen stays true outside the room.

Content corrections:

- `lexique.ts`, `INTROUVABLE`: « À un animateur pendant la séance, à votre parrain ensuite, ou sur
  le groupe du club. » becomes « À un animateur pendant la séance, à un membre ensuite, ou sur le
  groupe du club. »
- `iphone.yaml`: drop « — c'est aussi le logiciel utilisé à la séance 3, donc autant l'installer
  tout de suite »; the sentence ends at « contrôles manuels complets. »
- `android.yaml`: drop « C'est aussi le logiciel utilisé à la séance 3. »

### D4. Header comment of `3.yaml`

The comment describes the editorial intent and would contradict the file if left as is. It changes
in three places: « passe la main au témoignage » becomes a hand-over to a shared block that ends
in a discussion with the club's photographers; the paragraph about « Et maintenant ? » and the
editing workshop goes; the paragraph about « Mes apprentissages » describes the shared block. The
comment above the block (« décision D5 ») is updated the same way.

## Risks / Trade-offs

- [RAW, the workflow and printing are no longer taught anywhere] → Each brand sheet still gives the
  RAW extension and setting; the topics may come up in the discussion. A reference sheet can bring
  them back later without touching session 3.
- [The session no longer closes the loop with session 1's show of hands] → Accepted by the
  animateur. Session 1's spec does not require the echo.
- [The questions don't fit the guests who come] → They are prompts, not a script. The animateur can
  ask others aloud; the screen stays useful as a reminder of the topic.
