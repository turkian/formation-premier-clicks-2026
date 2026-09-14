/**
 * La copie locale — le vrai repli de la soirée (décision D9).
 *
 * Le service travailleur couvre une **perte** de réseau en cours de séance. Il
 * ne couvre pas le cas plus dur : arriver dans la salle sans réseau du tout, ou
 * avec un hébergement injoignable. Cette copie s'ouvre alors par un double-clic,
 * depuis une clé USB, sans serveur et sans installation.
 *
 * Ce que la transformation doit régler, et que la version déployée n'a pas à
 * connaître :
 *
 *   1. `file://` n'a pas de racine de site : tout chemin absolu est réécrit en
 *      chemin **relatif**, calculé depuis la profondeur de chaque page ;
 *   2. `file://` ne sert pas `index.html` pour un répertoire : chaque lien de
 *      répertoire reçoit son `index.html` explicite ;
 *   3. un script de **module** est toujours récupéré avec les règles CORS, et
 *      l'origine d'un `file://` est opaque : les composants interactifs ne se
 *      chargeraient pas. Chaque module est donc regroupé en script classique et
 *      inséré dans la page ;
 *   4. le préchargement de police porte `crossorigin`, ce qui échoue pour la
 *      même raison. Il est retiré — la déclaration `@font-face`, elle, charge
 *      normalement ;
 *   5. le service travailleur ne s'enregistre pas sur `file://` — c'est sans
 *      conséquence, tout est déjà local.
 *
 * Usage : npm run copie-locale
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, relative, dirname, sep, resolve } from 'node:path';
import { build as regrouper } from 'esbuild';

const executer = promisify(execFile);

const RACINE = new URL('..', import.meta.url).pathname;
const SORTIE = join(RACINE, 'copie-locale');
const BASE = '/COPIE-LOCALE';

console.log('Construction de la copie locale…\n');

await rm(SORTIE, { recursive: true, force: true });

await executer('npx', ['astro', 'build', '--outDir', SORTIE], {
  cwd: RACINE,
  env: {
    ...process.env,
    BASE_PATH: BASE,
    SITE_URL: 'https://exemple.invalid',
    // Le vrai repli de la soirée : toutes les séances, prêtes ou non — jamais
    // la restriction de publication qui gate un `astro build` ordinaire.
    SEANCES_TOUJOURS_PRETES: '1',
  },
});

/** Tous les fichiers réécrivables de la copie. */
async function fichiers(dossier) {
  const trouves = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) trouves.push(...(await fichiers(chemin)));
    else if (/\.(html|css|js|webmanifest)$/.test(entree.name)) trouves.push(chemin);
  }
  return trouves;
}

/**
 * Regroupe un module en script classique, exécutable depuis `file://`.
 *
 * Le résultat est mis en cache : la même poignée de composants revient sur des
 * dizaines d'écrans, et les regrouper une fois chacun suffit.
 */
const cacheScripts = new Map();

async function scriptClassique(chemin) {
  if (cacheScripts.has(chemin)) return cacheScripts.get(chemin);
  const { outputFiles } = await regrouper({
    entryPoints: [chemin],
    bundle: true,
    format: 'iife',
    minify: true,
    write: false,
    target: 'es2020',
    logLevel: 'silent',
  });
  const code = outputFiles[0].text;
  cacheScripts.set(chemin, code);
  return code;
}

let reecrits = 0;
let liens = 0;
let scripts = 0;

for (const fichier of await fichiers(SORTIE)) {
  const original = await readFile(fichier, 'utf8');

  /*
   * Le préfixe relatif qui ramène à la racine de la copie depuis ce fichier :
   * `./` à la racine, `../` un niveau plus bas, et ainsi de suite.
   */
  const profondeur = relative(SORTIE, dirname(fichier)).split(sep).filter(Boolean).length;
  const versLaRacine = profondeur === 0 ? './' : '../'.repeat(profondeur);

  let contenu = original.replaceAll(`${BASE}/`, versLaRacine);

  if (fichier.endsWith('.html')) {
    /*
     * Un lien vers un répertoire doit désigner son `index.html` : sans cela, un
     * double-clic ouvre un listage de dossier, ou rien du tout.
     */
    contenu = contenu.replace(
      /(href|src)="((?:\.\.?\/)[^"]*?\/)"/g,
      (_correspondance, attribut, chemin) => {
        liens += 1;
        return `${attribut}="${chemin}index.html"`;
      },
    );
    // La racine elle-même, écrite « ./ » ou « ../ », suit la même règle.
    contenu = contenu.replace(/(href)="((?:\.\.\/)+|\.\/)"/g, (_c, a, chemin) => {
      liens += 1;
      return `${a}="${chemin}index.html"`;
    });

    // Le préchargement de police est retiré : `crossorigin` échoue en `file://`,
    // et la déclaration `@font-face` charge la police de toute façon.
    contenu = contenu.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, () => '');

    /*
     * Chaque script de module devient un script classique auto-suffisant. Sans
     * cela, aucun composant interactif ne fonctionnerait dans la copie — et ce
     * sont eux qui portent les blocs les plus difficiles de la formation.
     */
    const modules = [...contenu.matchAll(/<script type="module" src="([^"]+)"><\/script>/g)];
    for (const [balise, src] of modules) {
      const surDisque = resolve(dirname(fichier), src);
      const code = await scriptClassique(surDisque);
      /*
       * Le remplacement passe par une **fonction**, jamais par une chaîne :
       * `String.replace` interprète `$&`, `$'` et `$1` dans une chaîne de
       * remplacement, et du JavaScript minifié en est rempli. Avec une chaîne,
       * le script inséré se retrouve mêlé de fragments de la page elle-même,
       * ce qui referme la balise en plein milieu et affiche le code à l'écran.
       */
      const sur = code.replace(/<\/script/gi, '<\\/script');
      contenu = contenu.replace(balise, () => `<script>${sur}</script>`);
      scripts += 1;
    }
  }

  if (contenu !== original) {
    await writeFile(fichier, contenu);
    reecrits += 1;
  }
}

// Un mot d'accueil, à côté du point d'entrée, pour qui trouve la clé sans mode
// d'emploi — c'est-à-dire n'importe qui d'autre que la personne qui l'a faite.
await writeFile(
  join(SORTIE, 'LISEZMOI.txt'),
  `Premiers clics — copie locale de la formation
===============================================

Ouvrez « index.html » d'un double-clic. Aucun serveur, aucune installation,
aucun réseau : tout le site est dans ce dossier.

C'est le plan de repli des soirées : si l'hébergement est injoignable en
arrivant dans la salle, projetez à partir d'ici. Les leçons, le lexique et les
fiches de référence fonctionnent, les composants interactifs aussi.

Ce que cette copie n'a pas :
  — les codes QR mènent au site en ligne, donc ils ne servent à rien hors réseau ;
  — l'impression des fiches fonctionne, mais passez par le navigateur.

Copie produite le ${new Date().toLocaleDateString('fr-CA')}.
`,
);

console.log(
  `\n${reecrits} fichier(s) réécrit(s), ${liens} lien(s) de répertoire complété(s), ` +
    `${scripts} script(s) rendu(s) exécutable(s) en file://.`,
);
console.log(`\nCopie prête : ${SORTIE}`);
console.log("Ouvrez index.html d'un double-clic — aucun serveur n'est nécessaire.\n");
