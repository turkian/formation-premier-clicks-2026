# Photographies de démonstration

Déposez les images ici. **Le nom du fichier est l'identifiant de l'emplacement**,
suivi de son extension — par exemple `l1-pdc-distance-1m.jpg`. Rien d'autre n'est
à modifier : la photographie remplace d'elle-même sa consigne de prise de vue au
prochain déploiement.

Extensions acceptées : `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Pour savoir ce qu'il reste à photographier :

```
npm run liste-de-prises-de-vue                 # tout
npm run liste-de-prises-de-vue -- --manquantes # ce qui manque
npm run liste-de-prises-de-vue -- --essentielles
```

Tant qu'une image est absente, l'écran affiche sa consigne à sa place. **Les trois
leçons sont projetables sans aucune photographie** — c'est voulu, et c'est vérifié
à chaque construction.
