/**
 * La liste de prises de vue de l'animateur.
 *
 * Elle est **dérivée** des emplacements déclarés dans les leçons, jamais tenue à
 * la main : une photographie qui apparaît dans une leçon apparaît ici, et une
 * photographie livrée disparaît d'elle-même de la colonne « à faire ». Une liste
 * entretenue séparément aurait divergé dès la deuxième semaine.
 *
 * Usage :
 *   node scripts/liste-de-prises-de-vue.mjs            liste complète
 *   node scripts/liste-de-prises-de-vue.mjs --manquantes
 *   node scripts/liste-de-prises-de-vue.mjs --essentielles
 *   node scripts/liste-de-prises-de-vue.mjs --json
 */
import { readdir, readFile, access } from 'node:fs/promises';
import { parse } from 'yaml';

const LECONS = new URL('../src/content/lecons/', import.meta.url);
const DEMOS = new URL('../public/demos/', import.meta.url);

const ORDRE_PRIORITE = { essentiel: 0, utile: 1, complement: 2 };

/** Parcourt les leçons et rassemble tout emplacement déclaré. */
async function rassembler() {
  const fichiers = (await readdir(LECONS)).filter((f) => f.endsWith('.yaml')).sort();
  const emplacements = [];

  for (const fichier of fichiers) {
    const lecon = parse(await readFile(new URL(fichier, LECONS), 'utf8'));
    for (const bloc of lecon.blocs ?? []) {
      for (const ecran of bloc.ecrans ?? []) {
        if (ecran.genre !== 'demonstration') continue;

        const groupes = [
          ...(ecran.series ?? []).map((s) => ({ variable: s.variable, images: s.images ?? [] })),
          { variable: null, images: ecran.images ?? [] },
        ];

        for (const groupe of groupes) {
          for (const image of groupe.images) {
            emplacements.push({
              id: image.id,
              specification: image.specification,
              priorite: image.priorite ?? 'utile',
              lecon: lecon.numero,
              titreLecon: lecon.titre,
              bloc: bloc.titre,
              ecran: ecran.titre ?? ecran.id,
              serie: groupe.variable,
              valeur: image.valeur ?? null,
              fichier: image.fichier ?? `${image.id}.jpg`,
              present: Boolean(await presente(image.id, image.fichier)),
            });
          }
        }
      }
    }
  }

  return emplacements.sort(
    (a, b) =>
      ORDRE_PRIORITE[a.priorite] - ORDRE_PRIORITE[b.priorite] ||
      a.lecon - b.lecon ||
      a.id.localeCompare(b.id, 'fr'),
  );
}

/**
 * Même règle de nommage que le site : `<id>.jpg` par défaut, plusieurs
 * extensions acceptées. Elle est définie dans `src/lib/demos.ts` ; ce script la
 * répète parce qu'il tourne hors du graphe de construction d'Astro.
 */
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

async function presente(id, fichier) {
  const candidats = fichier ? [fichier] : EXTENSIONS.map((e) => `${id}.${e}`);
  for (const candidat of candidats) {
    const existe = await access(new URL(candidat, DEMOS)).then(() => true).catch(() => false);
    if (existe) return candidat;
  }
  return null;
}

const emplacements = await rassembler();
const options = new Set(process.argv.slice(2));

let liste = emplacements;
if (options.has('--manquantes')) liste = liste.filter((e) => !e.present);
if (options.has('--essentielles')) liste = liste.filter((e) => e.priorite === 'essentiel');

if (options.has('--json')) {
  console.log(JSON.stringify(liste, null, 2));
  process.exit(0);
}

const ETIQUETTES = { essentiel: 'ESSENTIEL', utile: 'utile', complement: 'complément' };

console.log('\nLISTE DE PRISES DE VUE — Premiers clics\n');

for (const priorite of ['essentiel', 'utile', 'complement']) {
  const groupe = liste.filter((e) => e.priorite === priorite);
  if (groupe.length === 0) continue;

  const faites = groupe.filter((e) => e.present).length;
  console.log(`── ${ETIQUETTES[priorite]} — ${faites}/${groupe.length} prêtes\n`);

  for (const e of groupe) {
    console.log(`  ${e.present ? '✓' : '○'} ${e.specification}`);
    const ou = `séance ${e.lecon} · ${e.bloc} · ${e.ecran}`;
    console.log(`      ${ou}${e.serie ? ` · série « ${e.serie} » → ${e.valeur}` : ''}`);
    if (!e.present) console.log(`      fichier attendu : public/demos/${e.fichier}`);
  }
  console.log('');
}

const total = emplacements.length;
const prêtes = emplacements.filter((e) => e.present).length;
const essentielles = emplacements.filter((e) => e.priorite === 'essentiel');
const essentiellesPretes = essentielles.filter((e) => e.present).length;

console.log(`${prêtes} / ${total} photographies prêtes.`);
console.log(
  `${essentiellesPretes} / ${essentielles.length} des essentielles — ce sont celles sans lesquelles un bloc perd sa démonstration.`,
);

/*
 * S'il ne fallait en préparer qu'une : la série de la distance de mise au point.
 * L'effet de l'ouverture, la salle le verra elle-même en manipulant l'appareil
 * trois minutes plus tard. L'effet de la distance, non — il faut le lui montrer.
 */
const distance = emplacements.filter((e) => e.serie === 'la distance de mise au point');
if (distance.length > 0) {
  const faites = distance.filter((e) => e.present).length;
  console.log(
    `\nS'il ne fallait en préparer qu'une : la série « la distance de mise au point » ` +
      `(${faites}/${distance.length} prêtes). C'est la seule dont l'effet ne se découvre pas ` +
      `en manipulant son propre appareil.`,
  );
}

// Aucune photographie n'est déclarée pour un concept qu'un composant interactif
// porte déjà : la géométrie de l'ouverture, les leviers de profondeur de champ,
// la molette des modes et l'arbre de diagnostic sont dessinés ou calculés.
console.log(
  "\nRien n'est à photographier pour : la division du f/, les leviers de profondeur de champ,\n" +
    "la molette des modes, l'arbre de diagnostic — des composants les portent.\n",
);
