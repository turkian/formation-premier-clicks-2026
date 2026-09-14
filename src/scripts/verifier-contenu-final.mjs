/**
 * Vérifications de contenu de la section 13.
 *
 * Ce sont les promesses que ni le typage ni la mise en page ne peuvent tenir :
 * elles portent sur ce qui est écrit et sur ce qui paraît à l'écran. Elles sont
 * automatisées plutôt qu'affirmées, parce qu'un rajout de contenu la semaine
 * prochaine pourrait les casser sans que personne s'en aperçoive avant la salle.
 */
import { readdir, readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const LECONS = new URL('../src/content/lecons/', import.meta.url);
const MARQUES = new URL('../src/content/marques/', import.meta.url);

const echecs = [];
let passes = 0;
const verifier = (condition, message) => {
  if (condition) { passes += 1; console.log(`  ✓ ${message}`); }
  else { echecs.push(message); console.log(`  ✗ ${message}`); }
};

async function charger(dossier) {
  const noms = (await readdir(dossier)).filter((f) => f.endsWith('.yaml')).sort();
  return Promise.all(
    noms.map(async (nom) => ({ nom, donnees: parse(await readFile(new URL(nom, dossier), 'utf8')) })),
  );
}

const lecons = await charger(LECONS);
const marques = await charger(MARQUES);

/** Tout le texte destiné à l'écran, écran par écran. */
function textesDEcran(lecon) {
  const sortie = [];
  for (const bloc of lecon.blocs) {
    for (const ecran of bloc.ecrans) {
      const morceaux = [];
      const ajouter = (v) => {
        if (typeof v === 'string') morceaux.push(v);
        else if (Array.isArray(v)) v.forEach(ajouter);
        else if (v && typeof v === 'object') Object.values(v).forEach(ajouter);
      };
      for (const [cle, valeur] of Object.entries(ecran)) {
        // `id`, `genre` et `composant` sont des identifiants techniques, pas du
        // texte affiché : les inclure produirait de faux positifs.
        if (['id', 'genre', 'composant', 'variante', 'fichier', 'priorite'].includes(cle)) continue;
        ajouter(valeur);
      }
      // Les consignes de prise de vue sont, par nature, des instructions de
      // production — et le contrat de `demo-media` exige qu'elles soient
      // affichées à la place de l'image manquante. Elles sont donc exclues de
      // cette règle, qui porte sur le discours de l'écran.
      const sansSpecs = morceaux.filter(
        (m) => !JSON.stringify(ecran).includes(`"specification":${JSON.stringify(m)}`),
      );
      sortie.push({ bloc: bloc.id, ecran: ecran.id, texte: sansSpecs.join('\n'), objet: ecran });
    }
  }
  return sortie;
}

/* ── 13.1 · Ni minutage, ni équipe, ni préparation, ni adresse à l'animateur ── */

console.log('\n13.1 · Aucun écran ne porte de logistique ni ne s’adresse à l’animateur');

/** Marqueurs de minutage : « 0:12–0:18 », « 12 min », « douze minutes de contenu ». */
const MINUTAGE = [
  /\b\d{1,2}\s*:\s*\d{2}\s*[–-]\s*\d{1,2}\s*:\s*\d{2}\b/,
  /\b\d{1,3}\s*(?:min|minutes)\s*(?:de|pour)\b/i,
];

/**
 * Tutoiement : la marque d'un texte écrit **à l'animateur**. Le site s'adresse
 * toujours aux participants, donc au « vous ».
 *
 * Les bornes sont écrites en Unicode et non avec `\b` : `\b` ne connaît que
 * l'alphabet ASCII, si bien que « vous **êtes** » contient une frontière de mot
 * avant « tes » et déclenchait une fausse alerte à chaque écran. Sur un contenu
 * entièrement français, c'est l'erreur qui rend une vérification inutilisable —
 * on finit par ignorer ses résultats.
 */
const HORS_MOT = String.raw`(?<![\p{L}\p{M}'’-])`;
const FIN_MOT = String.raw`(?![\p{L}\p{M}])`;

const TUTOIEMENT = [
  new RegExp(`${HORS_MOT}(?:tu|toi|ton|ta|tes)${FIN_MOT}`, 'iu'),
  // Impératif suivi d'un pronom, en début de phrase seulement : « Fais-le »,
  // « Projette les trois ». Ailleurs, « elle montre le facteur » est un
  // indicatif parfaitement adressé aux participants.
  new RegExp(
    `(?:^|[.!?:]\\s+|\\n\\s*[-*]?\\s*)(?:fais|dis|projette|annonce|remets|distribue|prépare|laisse|coupe|insiste|évite|choisis)(?:-| )(?:le|la|les|leur|lui|y|en)${FIN_MOT}`,
    'ium',
  ),
  new RegExp(`${HORS_MOT}ne (?:t'|te )`, 'iu'),
];

/**
 * Vocabulaire de production réservé à `docs/`.
 *
 * Le mot « animateur » n'y figure pas : un écran peut légitimement dire aux
 * participants à qui s'adresser. Ce qui est proscrit, c'est la **consigne de
 * production** — le minutage, l'équipe, le matériel, les plans de repli.
 */
const LOGISTIQUE = [
  /\bfiche d'îlot/i, /\bplan B\b/i, /\bmatériel requis\b/i,
  /\bavant la séance\b/i, /\bfeuille de rotation\b/i, /\bclé USB\b/i,
  /\bles cinq groupes\b/i, /\bsignal sonore\b/i, /\bmembres qui circulent\b/i,
];

for (const { nom, donnees } of lecons) {
  const ecrans = textesDEcran(donnees);
  const fautifs = { minutage: [], tutoiement: [], logistique: [] };

  for (const { bloc, ecran, texte } of ecrans) {
    const ou = `${bloc}/${ecran}`;
    // Le texte entre accents graves est du vocabulaire d'appareil (« AF-C »,
    // « Tv ») : il ne relève pas de ces règles.
    const propre = texte.replace(/`[^`]*`/g, ' ');
    if (MINUTAGE.some((r) => r.test(propre))) fautifs.minutage.push(ou);
    if (TUTOIEMENT.some((r) => r.test(propre))) fautifs.tutoiement.push(ou);
    if (LOGISTIQUE.some((r) => r.test(propre))) fautifs.logistique.push(ou);
  }

  verifier(fautifs.minutage.length === 0, `séance ${donnees.numero} — aucun minutage${liste(fautifs.minutage)}`);
  verifier(fautifs.tutoiement.length === 0, `séance ${donnees.numero} — aucun écran ne s’adresse à l’animateur${liste(fautifs.tutoiement)}`);
  verifier(fautifs.logistique.length === 0, `séance ${donnees.numero} — aucune consigne de production${liste(fautifs.logistique)}`);
}

/* ── 13.2 · Les panneaux cumulatifs retiennent leur réponse ─────────────── */

console.log('\n13.2 · Les panneaux cumulatifs retiennent leur réponse au premier état');

const cumulatifs = [];
for (const { donnees } of lecons) {
  for (const bloc of donnees.blocs) {
    for (const ecran of bloc.ecrans) {
      if (ecran.genre === 'panneau' && ecran.etats?.length > 1) {
        cumulatifs.push({ lecon: donnees.numero, bloc: bloc.id, ecran });
      }
    }
  }
}

verifier(cumulatifs.length >= 4, `${cumulatifs.length} panneaux cumulatifs déclarés (au moins 4 attendus)`);

for (const { lecon, bloc, ecran } of cumulatifs) {
  const ou = `séance ${lecon} · ${bloc}/${ecran.id}`;

  // Le premier état est le contenu de base seul : il ne doit apporter ni corps
  // ni encadré, sinon la réponse serait à l'écran pendant qu'on pose la question.
  const premier = ecran.etats[0];
  verifier(
    !premier.corps && !premier.encadre,
    `${ou} — le premier état n’ajoute rien : la question est seule à l’écran`,
  );

  // Et un état ultérieur doit bien apporter quelque chose, sinon le panneau
  // n'accumule pas et son découpage ne sert à rien.
  const apporte = ecran.etats.slice(1).some((e) => e.corps || e.encadre);
  verifier(apporte, `${ou} — les états suivants ajoutent du contenu`);

  // Rien n'est jamais retiré : le schéma ne connaît aucun mécanisme de
  // suppression, on vérifie simplement qu'aucun état ne tente d'en simuler un.
  const suppression = ecran.etats.some((e) => e.corps === '' || e.encadre === '');
  verifier(!suppression, `${ou} — aucun état ne retire de contenu`);
}

/* ── Le marqueur de disponibilité à la publication ──────────────────────── */

console.log('\nLa disponibilité à la publication est déclarée sur chaque séance');

/**
 * Le schéma de contenu (`content.config.ts`) donne `pret` une valeur par
 * défaut (`false`) : un fichier qui l'omet construit quand même, gaté en
 * silence — le mode de défaillance sûr, mais silencieux. Cette vérification
 * lit le YAML brut, sans ce défaut, pour distinguer « omis » de « faux » et
 * faire échouer la construction bruyamment plutôt que de laisser une séance
 * gatée par oubli.
 */
for (const { nom, donnees } of lecons) {
  verifier(
    typeof donnees.pret === 'boolean',
    `séance ${donnees.numero ?? nom} — le champ « pret » est déclaré et booléen`,
  );
}

/* ── 13.4 · « Section 2 de votre feuille » vaut pour les huit marques ───── */

console.log('\n13.4 · Les quatre sections, dans le même ordre, sur les huit marques');

const SECTIONS_ATTENDUES = [1, 2, 3, 4];
verifier(marques.length === 8, `${marques.length} marques dans le lexique (8 attendues)`);

for (const { nom, donnees } of marques) {
  const numeros = donnees.sections.map((s) => s.numero).sort((a, b) => a - b);
  verifier(
    JSON.stringify(numeros) === JSON.stringify(SECTIONS_ATTENDUES),
    `${donnees.nom} — sections ${numeros.join(', ')}`,
  );

  // La section 2 est la mise au point sur les huit feuilles : c'est ce qui rend
  // « regardez la section 2 de votre feuille » vrai pour toute la salle.
  const section2 = donnees.sections.find((s) => s.numero === 2);
  const contenu = JSON.stringify(section2).toLowerCase();
  verifier(
    /mise au point|af-s|af-c|collimateur|point unique|touchez l'écran/.test(contenu),
    `${donnees.nom} — la section 2 traite bien de la mise au point`,
  );
}

/* ── 13.5 · Une séance se nomme par son rang, jamais par un moment ──────── */

console.log('\n13.5 · Aucun texte ne situe une séance dans le temps du lecteur');

/**
 * Le site est lu deux fois : le soir de la séance, et des mois plus tard par
 * quelqu'un qui n'était pas dans la salle. Tout ce qui est écrit doit rester
 * vrai dans les deux cas — donc « la séance 2 », jamais « ce soir » ni « la
 * prochaine séance ».
 *
 * La règle se vérifie ici plutôt que de se rappeler : le risque n'est pas le
 * texte corrigé aujourd'hui, c'est celui qu'on écrira dans six mois en
 * adaptant un passage de `docs/`, où « ce soir » est parfaitement légitime.
 */

/**
 * Le radical `soir` — « ce soir », « soirée », « soirées ».
 *
 * Les bornes viennent de `HORS_MOT` / `FIN_MOT` et non de `\b` : « soirée »
 * finit par une lettre accentuée, que `\b` ne reconnaît pas comme lettre.
 */
const SOIR = new RegExp(`${HORS_MOT}soir\\p{L}*${FIN_MOT}`, 'giu');

/**
 * Une séance située par rapport au lecteur plutôt que nommée par son rang.
 *
 * « dernière » n'y figure pas : sur la séance 3, « notre dernière séance
 * ensemble » énonce un fait de structure, pas une position dans l'agenda de
 * qui lit.
 */
const SEANCE_RELATIVE = new RegExp(
  `${HORS_MOT}(?:prochaine|précédente)\\s+séance${FIN_MOT}`
    + `|${HORS_MOT}séance\\s+(?:prochaine|précédente)${FIN_MOT}`,
  'giu',
);

/**
 * Les emplois de « soirée » qui ne désignent pas une séance de la formation.
 *
 * Cette liste est volontairement close : toute nouvelle occurrence fait échouer
 * la vérification, et c'est un humain qui décide, une fois, dans un diff, s'il
 * s'agit d'une exception de plus ou d'une rechute.
 */
const SOIR_AUTORISE = [
  { fichier: '2.yaml', phrase: 'photos de soirée', raison: 'une fête photographiée, pas une séance' },
  { fichier: '3.yaml', phrase: 'soirée critique', raison: 'le nom d’une activité du club' },
];

const OU_MODIFIER = 'src/scripts/verifier-contenu-final.mjs · SOIR_AUTORISE';

/** Toutes les chaînes du document, avec le chemin où elles se trouvent. */
function chaines(valeur, chemin = '') {
  if (typeof valeur === 'string') return [{ chemin, texte: valeur }];
  if (Array.isArray(valeur)) return valeur.flatMap((v, i) => chaines(v, `${chemin}[${i}]`));
  if (valeur && typeof valeur === 'object') {
    return Object.entries(valeur).flatMap(([c, v]) => chaines(v, chemin ? `${chemin}.${c}` : c));
  }
  return [];
}

/** Le radical trouvé fait-il partie d'une tournure explicitement autorisée ? */
function autorise(fichier, texte, position) {
  return SOIR_AUTORISE.some(({ fichier: f, phrase }) => {
    if (f !== fichier) return false;
    for (let i = texte.indexOf(phrase); i !== -1; i = texte.indexOf(phrase, i + 1)) {
      if (position >= i && position < i + phrase.length) return true;
    }
    return false;
  });
}

/** Le texte autour de la faute, pour qu'on la reconnaisse sans ouvrir le fichier. */
function extrait(texte, position, longueur) {
  const debut = Math.max(0, position - 30);
  const fin = Math.min(texte.length, position + longueur + 30);
  return `${debut > 0 ? '…' : ''}${texte.slice(debut, fin).replace(/\s+/g, ' ')}${fin < texte.length ? '…' : ''}`;
}

for (const { nom, donnees } of [...lecons, ...marques]) {
  const fautes = [];

  for (const { chemin, texte } of chaines(donnees)) {
    for (const t of texte.matchAll(SOIR)) {
      if (autorise(nom, texte, t.index)) continue;
      fautes.push({ chemin, phrase: t[0], extrait: extrait(texte, t.index, t[0].length) });
    }
    for (const t of texte.matchAll(SEANCE_RELATIVE)) {
      fautes.push({ chemin, phrase: t[0], extrait: extrait(texte, t.index, t[0].length) });
    }
  }

  // Toutes les fautes sont listées, pas seulement les quatre premières : cette
  // sortie est l'inventaire de travail de la correction.
  for (const f of fautes) {
    console.log(`      ${nom} · ${f.chemin} — « ${f.phrase} » : ${f.extrait}`);
  }

  verifier(
    fautes.length === 0,
    fautes.length === 0
      ? `${nom} — une séance y est nommée par son rang`
      : `${nom} — ${fautes.length} mention(s) temporelle(s) d’une séance.`
        + ` Corriger le texte, ou, si « soirée » n’y désigne pas une séance,`
        + ` ajouter la tournure à ${OU_MODIFIER}`,
  );
}

function liste(items) {
  return items.length === 0 ? '' : ` — ${items.slice(0, 4).join(', ')}${items.length > 4 ? '…' : ''}`;
}

console.log(`\n${passes} vérification(s) passée(s).`);
if (echecs.length > 0) {
  console.error(`\n${echecs.length} échec(s) :`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('Le contenu tient ses promesses.');
