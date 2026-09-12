## 1. Construire le bloc fusionné

- [x] 1.1 Dans `src/src/content/lecons/1.yaml`, relire les blocs `ouverture` (lignes ~470–656) et
      `profondeur-de-champ` (lignes ~308–467) au complet, et confirmer que les 18 écrans
      correspondent exactement à ceux listés dans `design.md` Décision 2 (aucun écran ajouté ou
      supprimé depuis la rédaction du design).
- [x] 1.2 Remplacer les deux entrées de bloc par une seule entrée `id:
      ouverture-et-profondeur-de-champ` avec le `titre` et le `resume` de `design.md` Décision 1,
      et vérifier que le fichier reste un YAML valide (`npm run verifier:modele`).
- [x] 1.3 Réordonner les 17 écrans conservés selon `design.md` Décision 2, en supprimant l'écran
      `repère` d'ouverture de `profondeur-de-champ` (`claim: Quelle épaisseur est nette ?`), et
      vérifier que le bloc contient exactement 17 écrans dans l'ordre listé (comparaison visuelle
      avec la Décision 2).

## 2. Réécrire les champs qui dépendent de la position

- [x] 2.1 Réécrire `legende` de `demo-ouverture` selon `design.md` Décision 4 et vérifier que le
      texte ne compare plus l'écran aux « trois » démonstrations.
- [x] 2.2 Réécrire `legende` et `aparte` de `demo-la-distance` selon `design.md` Décision 4 (le
      `titre` reste inchangé) et vérifier que `aparte` ne contient plus la promesse « dans trois
      minutes ».
- [x] 2.3 Relire chaque `claim`, `aparte` et `legende` du bloc fusionné une dernière fois pour
      confirmer qu'aucun autre champ ne fait référence à l'ordre ou à la position des écrans
      (recherche des occurrences de « des trois », « tout à l'heure », « plus tard », « avant »,
      « après » dans le bloc).

## 3. Vérifier le résultat

- [x] 3.1 Lancer `npm run verifier:contenu` et confirmer qu'il passe, en particulier la règle
      13.5 sur le radical « soir ».
- [x] 3.2 Lancer `npm run verifier` (ou au minimum `verifier:projection` et
      `verifier:telephone`) et confirmer qu'il n'y a aucune régression de lisibilité sur les
      écrans déplacés ou réécrits.
- [x] 3.3 Lancer `npm run build` et confirmer que la leçon 1 compile sans erreur, avec un total de
      39 écrans (au lieu de 40) et que les URLs des écrans de l'ancien bloc `ouverture` et
      `profondeur-de-champ` pointent maintenant vers
      `/lecons/1/ouverture-et-profondeur-de-champ/*`.
- [x] 3.4 Lancer `npm run dev` et parcourir manuellement le bloc fusionné du début (`ouverture`)
      à la fin (`tourner-la-molette`) pour confirmer que l'enchaînement est cohérent : le
      mécanisme de l'ouverture est enseigné avant que `trois-frustrations` et
      `paysage-deux-causes` n'utilisent des valeurs f, et que `demo-ouverture` /
      `demo-la-distance` suivent bien la révélation qu'ils illustrent.
