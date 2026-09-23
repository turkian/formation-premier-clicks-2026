# Premiers clics — le site de la formation

Site statique de la formation photo du club : trois leçons projetées, le lexique
par fabricant, et les fiches de référence à imprimer.

Site en ligne : <https://turkian.github.io/formation-premier-clicks-2026/>

La racine du projet Astro est le dossier `src/`.

## Au quotidien

```bash
npm install
npm run dev          # http://localhost:4321/formation-premier-clicks-2026/
npm run build
```

## Écrire du contenu

| Quoi | Où | Coût d'un ajout |
|---|---|---|
| Une leçon | `src/content/lecons/<n>.yaml` | — |
| Une feuille de lexique | `src/content/marques/<marque>.yaml` | un fichier |
| Une fiche de référence | `src/content/fiches/<nom>.md` | **un fichier**, l'index se met à jour seul |
| Des exercices de pratique autonome | `src/content/exercices/<n>.yaml` | — |

Le texte est écrit normalement : les espaces insécables du français
(`ouverture : f/5.6`, `« comme ceci »`, `50 mm`) sont posées au rendu.

### Les photographies de démonstration

Déposez l'image dans `public/demos/` **sous le nom de son emplacement**
(`l1-pdc-distance-1m.jpg`). Rien d'autre à modifier : elle remplace d'elle-même
sa consigne de prise de vue.

```bash
npm run liste-de-prises-de-vue -- --manquantes
```

**Les trois leçons sont projetables sans aucune photographie.** C'est vérifié à
chaque construction.

## Vérifier

Ces commandes contrôlent dans un vrai navigateur ce que le contenu promet.

```bash
npm run verifier              # liens, impression, téléphone, projection, codes QR
npm run verifier:modele       # les chiffres de profondeur de champ des leçons
npm run verifier:contenu      # ni logistique ni tutoiement ; les révélations retiennent leur réponse
npm run verifier:hors-ligne   # une leçon survit à une perte de réseau
npm run verifier:copie-locale # la copie s'ouvre en file://, sans serveur
```

Ce qu'elles refusent, concrètement :

- une **série comparative** où plus d'une variable change — la démonstration ne
  démontrerait rien ;
- un **écran qui déborde** en 1024 × 768 ou en 16:9 — les projecteurs de salle ne
  sont pas tous larges ;
- une **fiche qui déborde** sur une seconde page Letter ;
- une page qui **défile horizontalement** à la largeur d'un téléphone ;
- un **lien interne** qui ne résout pas sous le sous-chemin du dépôt ;
- un **code QR** ailleurs que sur une ouverture de bloc ou un « appareil en main ».

## La copie locale — le repli de la soirée

```bash
npm run copie-locale
```

Produit `copie-locale/`, qui s'ouvre d'un double-clic sur `index.html` : aucun
serveur, aucun réseau, aucune installation. C'est le plan de repli si
l'hébergement est injoignable en arrivant dans la salle.

## Déploiement

Sur poussée vers `main`, GitHub Actions construit et publie sur Pages
(`.github/workflows/deploy.yml`). Le chemin de base est le nom du dépôt : tout
lien interne passe par `lien()` de `src/lib/lien.ts`, jamais par un chemin absolu
écrit à la main.

## Repères de code

| Fichier | Ce qu'il porte |
|---|---|
| `src/lib/lecon.ts` | l'aplatissement d'une leçon en **arrêts** — un par état de panneau |
| `src/lib/profondeur-de-champ.ts` | le modèle optique : cercle de confusion, hyperfocale, bandes |
| `src/lib/typo.ts` | les conventions typographiques du français québécois |
| `src/lib/lien.ts` | les liens sous le sous-chemin du dépôt |
| `src/styles/lecon.css` | les **trois arrangements** : projection, panneau cumulatif, téléphone |
