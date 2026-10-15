/**
 * Vérification du mode hors ligne.
 *
 * Le scénario reproduit est celui de la salle : l'animateur ouvre une leçon,
 * puis le réseau tombe au milieu de la séance. Ce qui doit alors continuer de
 * fonctionner :
 *
 *   — la navigation entre les écrans de la leçon déjà ouverte ;
 *   — les composants interactifs de ces écrans ;
 *   — les fiches de référence et les pages de lexique déjà visitées.
 *
 * S'y ajoute le scénario d'un déploiement qui remplace une photo sous le même
 * nom : elle doit apparaître au rechargement ordinaire, et hors ligne la
 * dernière version reçue doit s'afficher.
 *
 * On coupe vraiment le réseau du contexte plutôt que de simuler, sinon la
 * vérification ne prouve rien.
 */
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { cp, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { servir } from './serveur.mjs';

const echecs = [];
let passes = 0;

function verifier(condition, message) {
  if (condition) {
    passes += 1;
    console.log(`  ✓ ${message}`);
  } else {
    echecs.push(message);
    console.log(`  ✗ ${message}`);
  }
}

const site = await servir(new URL('../dist', import.meta.url).pathname);
const navigateur = await chromium.launch({ channel: 'chrome' });
const contexte = await navigateur.newContext({ serviceWorkers: 'allow' });
const page = await contexte.newPage();

/** Attend que le service travailleur soit installé et maître de la page. */
async function attendreServiceTravailleur() {
  await page.waitForFunction(
    () => navigator.serviceWorker.controller !== null,
    undefined,
    { timeout: 15000 },
  );
}

console.log('\nAvec le réseau — l’animateur prépare sa séance');

const parcours = [
  '/lecons/1/ouverture-et-profondeur-de-champ/la-definition/',
  '/lecons/1/ouverture-et-profondeur-de-champ/ce-qui-change-l-epaisseur/',
  '/lecons/1/ouverture-et-profondeur-de-champ/explorer-la-zone-nette/',
  '/fiches/ma-photo-est-ratee/',
  '/lexique/canon/',
];

await page.goto(site.url('/'), { waitUntil: 'networkidle' });
await attendreServiceTravailleur();
verifier(true, 'le service travailleur s’installe et prend la main');

for (const chemin of parcours) {
  const reponse = await page.goto(site.url(chemin), { waitUntil: 'networkidle' });
  verifier(reponse?.status() === 200, `${chemin} est visitée`);
}

console.log('\nLe réseau tombe');
await contexte.setOffline(true);

for (const chemin of parcours) {
  await page.goto(site.url(chemin), { waitUntil: 'domcontentloaded' });
  const titre = await page.locator('h1, .claim').first().textContent().catch(() => null);
  verifier(Boolean(titre && titre.trim()), `${chemin} s’affiche encore hors ligne`);
}

console.log('\nLa navigation continue');
await page.goto(site.url('/lecons/1/ouverture-et-profondeur-de-champ/la-definition/'), {
  waitUntil: 'domcontentloaded',
});
await page.keyboard.press('ArrowRight');
// La touche déclenche une navigation : il faut l'attendre explicitement, sinon
// on interroge encore l'ancienne page et l'on conclut à tort qu'elle a échoué.
const navigue = await page
  .waitForURL(/ce-qui-change/, { timeout: 8000 })
  .then(() => true)
  .catch(() => false);
verifier(navigue, 'la touche → mène à l’écran suivant, sans réseau');

await page.keyboard.press('ArrowLeft');
const revenu = await page
  .waitForURL(/la-definition/, { timeout: 8000 })
  .then(() => true)
  .catch(() => false);
verifier(revenu, 'la touche ← revient à l’écran précédent, sans réseau');

console.log('\nLes composants répondent encore');
await page.goto(site.url('/lecons/1/ouverture-et-profondeur-de-champ/explorer-la-zone-nette/'), {
  waitUntil: 'domcontentloaded',
});
await page.waitForSelector('[data-pdc]');

const avant = await page.locator('[data-sortie="epaisseur"]').textContent();
await page.locator('[data-levier="distance"]').evaluate((curseur) => {
  const c = curseur;
  c.value = String(Number(c.value) - 4);
  c.dispatchEvent(new Event('input', { bubbles: true }));
});
const apres = await page.locator('[data-sortie="epaisseur"]').textContent();

verifier(Boolean(avant?.trim()), `le composant affiche une lecture hors ligne (${avant?.trim()})`);
verifier(avant !== apres, `déplacer un levier change la lecture (${avant?.trim()} → ${apres?.trim()})`);

const bande = await page.locator('[data-sortie="bande"]').textContent();
verifier(Boolean(bande?.includes('«')), `la bande qualitative est affichée (${bande?.trim()})`);

await contexte.close();
await site.fermer();

/*
 * Une photo remplacée sous le même nom.
 *
 * Le scénario qui a motivé l'empreinte `?v=` : une photo d'essai est remplacée
 * par la vraie, sous le même nom de fichier, et le navigateur qui avait déjà
 * vu l'ancienne doit montrer la nouvelle à un rechargement ordinaire — puis,
 * hors ligne, la dernière qu'il a reçue plutôt qu'une image cassée.
 *
 * On travaille sur une copie de `dist/` pour pouvoir y simuler un déploiement
 * sans toucher au site construit. La photo de remplacement a d'autres
 * dimensions que l'originale : c'est sa largeur qui prouve laquelle s'affiche.
 */
const copie = await mkdtemp(join(tmpdir(), 'premiers-clics-deploiement-'));
await cp(new URL('../dist', import.meta.url).pathname, copie, { recursive: true });
const siteCopie = await servir(copie);
const contexteCopie = await navigateur.newContext({ serviceWorkers: 'allow' });
const pageCopie = await contexteCopie.newPage();
const CACHE = 'premiers-clicks-v2';
const REMPLACEMENT = 'l2-lumiere-f2-8.jpg';

/** Largeur réelle de la première image dont l'adresse contient `fichier`. */
async function largeurAffichee(fichier) {
  const image = pageCopie.locator(`img[src*="${fichier}"]`).first();
  await image.scrollIntoViewIfNeeded();
  return image.evaluate(
    (img) =>
      new Promise((fini) => {
        const mesurer = () => fini(img.naturalWidth);
        if (img.complete) return mesurer();
        img.addEventListener('load', mesurer, { once: true });
        img.addEventListener('error', mesurer, { once: true });
      }),
  );
}

/** Les adresses en cache dont le chemin contient `fichier`. */
const enCache = (fichier) =>
  pageCopie.evaluate(
    async ([nom, f]) => (await (await caches.open(nom)).keys()).map((r) => r.url).filter((u) => u.includes(f)),
    [CACHE, fichier],
  );

/**
 * Simule un déploiement qui remplace `fichier` : nouveaux octets, et nouvelle
 * empreinte dans toutes les pages. Retourne la nouvelle empreinte.
 */
async function deployerRemplacement(fichier) {
  const octets = await readFile(join(copie, 'demos', REMPLACEMENT));
  await writeFile(join(copie, 'demos', fichier), octets);
  const nouvelle = createHash('sha256').update(octets).digest('hex').slice(0, 10);
  const motif = new RegExp(`${fichier.replaceAll('.', '\\.')}\\?v=[0-9a-f]{10}`, 'g');
  for (const html of await pagesHtml(copie)) {
    const avant = await readFile(html, 'utf8');
    const apres = avant.replace(motif, `${fichier}?v=${nouvelle}`);
    if (apres !== avant) await writeFile(html, apres);
  }
  return nouvelle;
}

async function pagesHtml(dossier) {
  const trouvees = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) trouvees.push(...(await pagesHtml(chemin)));
    else if (entree.name.endsWith('.html')) trouvees.push(chemin);
  }
  return trouvees;
}

console.log('\nLes photos restées coincées avant l’empreinte sont purgées');
// Un navigateur qui a connu l'ancien service travailleur : son cache v1 tient
// une vieille photo. On l'amorce depuis une page sans enregistrement.
await pageCopie.goto(siteCopie.url('/amorce-sans-service-travailleur/'));
await pageCopie.evaluate(async (url) => {
  const ancien = await caches.open('premiers-clicks-v1');
  await ancien.put(url, new Response('ancienne photo', { headers: { 'content-type': 'image/jpeg' } }));
}, siteCopie.url('/demos/l2-figer.jpg'));
await pageCopie.goto(siteCopie.url('/'), { waitUntil: 'networkidle' });
await pageCopie.waitForFunction(() => navigator.serviceWorker.controller !== null, undefined, {
  timeout: 15000,
});
const nomsDeCaches = await pageCopie.evaluate(() => caches.keys());
verifier(
  !nomsDeCaches.includes('premiers-clicks-v1') && nomsDeCaches.includes(CACHE),
  `le cache v1 disparaît à l’activation (${nomsDeCaches.join(', ')})`,
);

console.log('\nUne photo remplacée apparaît au rechargement ordinaire');
const ecranFiger = '/lecons/2/vitesse/la-decision/';
await pageCopie.goto(siteCopie.url(ecranFiger), { waitUntil: 'networkidle' });
const largeurOriginale = await largeurAffichee('l2-figer.jpg');

await deployerRemplacement('l2-figer.jpg');
const largeurRemplacement = await pageCopie.evaluate(
  (url) => new Promise((fini) => { const i = new Image(); i.onload = () => fini(i.naturalWidth); i.src = url; }),
  siteCopie.url(`/demos/${REMPLACEMENT}`),
);

await pageCopie.reload({ waitUntil: 'networkidle' });
const largeurApres = await largeurAffichee('l2-figer.jpg');
verifier(
  largeurOriginale !== largeurRemplacement && largeurApres === largeurRemplacement,
  `la nouvelle photo s’affiche sans rechargement forcé (${largeurOriginale} px → ${largeurApres} px)`,
);

const copiesFiger = await enCache('/demos/l2-figer.jpg');
verifier(
  copiesFiger.length === 1,
  `une seule copie de la photo est gardée (${copiesFiger.length} en cache)`,
);

console.log('\nHors ligne, une page en cache montre la dernière version reçue');
// L'écran du nageur est mis en cache avec l'ancienne empreinte de sa photo…
const ecranNageur = '/lecons/2/vitesse/le-flou-choisi/';
await pageCopie.goto(siteCopie.url(ecranNageur), { waitUntil: 'networkidle' });
await largeurAffichee('l2-nageur.jpg');

// …puis un déploiement remplace la photo, et le navigateur en reçoit la
// nouvelle version en visitant une autre page, sans revenir à cet écran.
const empreinteNageur = await deployerRemplacement('l2-nageur.jpg');
await pageCopie.goto(siteCopie.url('/'), { waitUntil: 'networkidle' });
await pageCopie.evaluate(
  (url) => fetch(url).then((r) => r.blob()),
  `${siteCopie.url('/demos/l2-nageur.jpg')}?v=${empreinteNageur}`,
);

await contexteCopie.setOffline(true);
await pageCopie.goto(siteCopie.url(ecranNageur), { waitUntil: 'domcontentloaded' });
const pageAncienne = await pageCopie
  .locator('img[src*="l2-nageur.jpg"]')
  .first()
  .getAttribute('src');
const largeurHorsLigne = await largeurAffichee('l2-nageur.jpg');
verifier(
  !pageAncienne?.includes(empreinteNageur) && largeurHorsLigne === largeurRemplacement,
  `la photo s’affiche, dans sa dernière version (${largeurHorsLigne} px), même si la page demande l’ancienne`,
);

await navigateur.close();
await siteCopie.fermer();
await rm(copie, { recursive: true, force: true });

console.log(`\n${passes} vérification(s) passée(s).`);
if (echecs.length > 0) {
  console.error(`\n${echecs.length} échec(s) :`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('La leçon survit à une perte de réseau.');
