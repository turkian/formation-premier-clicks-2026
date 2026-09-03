/**
 * L'arbre de diagnostic : symptôme → causes → correction.
 *
 * L'ordre n'est pas négociable. Un débutant ne connaît que le **symptôme** —
 * c'est la seule chose qu'il voit sur son écran. Partir de la cause reviendrait
 * à lui demander la réponse qu'il est venu chercher.
 *
 * Le même arbre alimente le composant interactif de la séance 2 et la fiche de
 * référence imprimable : une seule source, deux rendus.
 */

export interface Cause {
  cause: string;
  correction: string;
  /** Ce qu'aucun développement ne rattrapera, quand c'est le cas. */
  irreversible?: boolean;
}

export interface Symptome {
  id: string;
  symptome: string;
  /** Ce que le participant voit, dit dans ses mots. */
  indice: string;
  causes: Cause[];
}

export const SYMPTOMES: Symptome[] = [
  {
    id: 'floue',
    symptome: 'Ma photo est floue',
    indice: 'Regardez d’abord si le décor, lui, est net. C’est ça qui tranche.',
    causes: [
      {
        cause: 'Le décor est net, le sujet est flou',
        correction:
          'La mise au point s’est faite ailleurs, ou le sujet a bougé pendant la pose. Mettez le collimateur sur le sujet, passez en `AF-C` s’il bouge, et montez la vitesse.',
      },
      {
        cause: 'Toute l’image est floue, dans le même sens',
        correction:
          'C’est vous qui avez bougé : la vitesse était trop lente pour votre main. Montez la vitesse, calez vos coudes, ou appuyez-vous. Aucun développement ne le rattrape.',
        irreversible: true,
      },
      {
        cause: 'Le sujet est net, mais presque rien autour ne l’est',
        correction:
          'La zone nette est plus mince que votre sujet : grande ouverture, ou sujet très près. Fermez l’ouverture — chiffre `f/` plus grand — ou reculez d’un pas.',
      },
      {
        cause: 'Un œil est net, l’autre flou',
        correction:
          'La même chose, à l’échelle d’un visage. C’est de la physique, pas une erreur : passez à `f/2.8` ou `f/4` plutôt que `f/1.8`, ou reculez d’un pas.',
      },
    ],
  },
  {
    id: 'sombre',
    symptome: 'Ma photo est trop sombre',
    indice: 'Demandez-vous ce que l’appareil a vu de plus clair que la scène.',
    causes: [
      {
        cause: 'La scène était claire : neige, ciel, mur blanc',
        correction:
          'L’appareil a voulu ramener tout ce blanc vers le gris. Compensation **`+1`**, et regardez le résultat.',
      },
      {
        cause: 'Le sujet était à contre-jour',
        correction:
          'L’appareil a exposé pour le fond lumineux. Compensation **`+1`** ou **`+2`**, ou déplacez-vous pour changer la direction de la lumière.',
      },
      {
        cause: 'Il n’y avait pas assez de lumière',
        correction:
          'Montez l’ISO, ouvrez davantage, ou changez de lumière. Une photo nette et bruitée vaut mieux qu’une photo propre et floue.',
      },
    ],
  },
  {
    id: 'claire',
    symptome: 'Ma photo est trop claire',
    indice: 'C’est l’inverse : l’appareil a vu une scène plus sombre qu’elle ne l’est.',
    causes: [
      {
        cause: 'La scène était sombre : fond noir, salle peu éclairée',
        correction: 'Compensation **`−1`**. L’appareil a voulu éclaircir ce noir vers le gris.',
      },
      {
        cause: 'Une zone est complètement blanche',
        correction:
          'Cette zone-là est perdue : il n’y a plus aucune information à récupérer. C’est la seule erreur d’exposition irréversible — dans le doute, sous-exposez légèrement.',
        irreversible: true,
      },
    ],
  },
  {
    id: 'bruitee',
    symptome: 'Ma photo est bruitée',
    indice: 'Le grain coloré, surtout visible dans les zones sombres.',
    causes: [
      {
        cause: 'L’ISO était élevé, faute de lumière',
        correction:
          'C’est le prix, et il est souvent le bon. Plus de lumière, une plus grande ouverture, ou acceptez le grain : **nette et bruitée vaut mieux que propre et floue.**',
      },
      {
        cause: 'La photo était sous-exposée et a été remontée au développement',
        correction:
          'Remonter une image sombre fait apparaître le bruit. Exposez correctement à la prise de vue plutôt qu’au développement.',
      },
    ],
  },
  {
    id: 'sujet-perdu',
    symptome: 'Mon sujet se perd dans l’image',
    indice: 'Techniquement réussie, et pourtant on ne sait pas où regarder.',
    causes: [
      {
        cause: 'L’arrière-plan est aussi lisible que le sujet',
        correction:
          'Éloignez le sujet du fond, ou rapprochez-vous de lui. C’est gratuit, et ça marche mieux qu’une grande ouverture.',
      },
      {
        cause: 'Le sujet est trop petit dans le cadre',
        correction: 'Approchez-vous. Trois pas de plus, puis accroupissez-vous.',
      },
      {
        cause: 'Il y a plusieurs sujets',
        correction:
          'Si vous ne pouvez pas dire votre sujet en un mot, la photo n’est pas prête. Choisissez, et recadrez.',
      },
    ],
  },
  {
    id: 'couleurs',
    symptome: 'Les couleurs sont fausses',
    indice: 'Trop jaune sous une ampoule, trop bleue à l’ombre.',
    causes: [
      {
        cause: 'La balance des blancs a mal deviné',
        correction:
          'En RAW, corrigez-la au développement sans aucune perte — c’est même son principal avantage. En JPEG, il faut refaire la photo.',
      },
    ],
  },
];
