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
 * On coupe vraiment le réseau du contexte plutôt que de simuler, sinon la
 * vérification ne prouve rien.
 */
import { chromium } from 'playwright';
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
  '/lecons/1/profondeur-de-champ/la-definition/',
  '/lecons/1/profondeur-de-champ/ce-qui-change-l-epaisseur/',
  '/lecons/1/profondeur-de-champ/explorer-la-zone-nette/',
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
await page.goto(site.url('/lecons/1/profondeur-de-champ/la-definition/'), {
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
await page.goto(site.url('/lecons/1/profondeur-de-champ/explorer-la-zone-nette/'), {
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

await navigateur.close();
await site.fermer();

console.log(`\n${passes} vérification(s) passée(s).`);
if (echecs.length > 0) {
  console.error(`\n${echecs.length} échec(s) :`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('La leçon survit à une perte de réseau.');
