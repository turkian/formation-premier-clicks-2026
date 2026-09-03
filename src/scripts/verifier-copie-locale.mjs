/**
 * Vérification de la copie locale.
 *
 * Elle est ouverte en `file://`, **sans serveur**, exactement comme un
 * double-clic depuis une clé USB dans une salle sans réseau. Ce qui doit
 * fonctionner : le carrefour, la navigation vers une leçon, le passage d'un
 * écran au suivant, un composant interactif, une fiche et une page de lexique.
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const COPIE = new URL('../copie-locale/', import.meta.url).pathname;
const fichier = (chemin) => pathToFileURL(join(COPIE, chemin)).href;

const echecs = [];
let passes = 0;
const verifier = (condition, message) => {
  if (condition) { passes += 1; console.log(`  ✓ ${message}`); }
  else { echecs.push(message); console.log(`  ✗ ${message}`); }
};

const navigateur = await chromium.launch({ channel: 'chrome' });
const page = await navigateur.newPage();

// Un chemin absolu resté dans la copie se voit ici : `file:///lecons/…`
// n'existe pas, la requête échoue, et on l'enregistre.
const manquants = new Set();
page.on('requestfailed', (requete) => {
  const url = requete.url();
  if (url.startsWith('file://') && !/favicon/.test(url)) manquants.add(url);
});

console.log('\nLa copie s’ouvre sans serveur');

await page.goto(fichier('index.html'), { waitUntil: 'networkidle' });
verifier((await page.locator('h1').first().textContent()) === 'Premiers clics', 'le carrefour s’affiche');

const versLecon = await page.locator('a.carte').first().getAttribute('href');
verifier(Boolean(versLecon && !versLecon.startsWith('/')), `les liens sont relatifs (${versLecon})`);

console.log('\nLa navigation fonctionne');
await page.locator('a.carte').first().click();
await page.waitForLoadState('networkidle');
verifier(page.url().includes('lecons'), 'le premier clic mène à la leçon');

await page.locator('a.carte').first().click();
await page.waitForLoadState('networkidle');
verifier(Boolean(await page.locator('[data-scene]').count()), 'le premier écran de la leçon s’affiche');

const avantTouche = page.url();
await page.keyboard.press('ArrowRight');
const avance = await page.waitForURL((u) => u.href !== avantTouche, { timeout: 8000 })
  .then(() => true).catch(() => false);
verifier(avance, 'la touche → passe à l’écran suivant');

console.log('\nUn composant interactif répond');
await page.goto(
  fichier('lecons/1/profondeur-de-champ/explorer-la-zone-nette/index.html'),
  { waitUntil: 'networkidle' },
);
await page.waitForSelector('[data-pdc]');
const avant = await page.locator('[data-sortie="epaisseur"]').textContent();
await page.locator('[data-levier="ouverture"]').evaluate((c) => {
  c.value = String(Number(c.value) + 5);
  c.dispatchEvent(new Event('input', { bubbles: true }));
});
const apres = await page.locator('[data-sortie="epaisseur"]').textContent();
verifier(Boolean(avant?.trim()) && avant !== apres, `le composant calcule (${avant?.trim()} → ${apres?.trim()})`);

console.log('\nLes fiches et le lexique');
await page.goto(fichier('fiches/ma-photo-est-ratee/index.html'), { waitUntil: 'networkidle' });
verifier(Boolean(await page.locator('.fiche-corps h2').count()), 'une fiche de référence s’affiche');

await page.goto(fichier('lexique/fujifilm/index.html'), { waitUntil: 'networkidle' });
verifier(
  (await page.locator('.section-lexique').count()) === 4,
  'une page de lexique affiche ses quatre sections',
);

console.log('\nLa typographie survit');
const police = await page.evaluate(() => {
  const sonde = document.createElement('span');
  sonde.style.fontFamily = "'Inter Variable'";
  sonde.textContent = 'ÉÀÇ « » f/5.6';
  document.body.append(sonde);
  return document.fonts.check("16px 'Inter Variable'");
});
verifier(police, 'la police auto-hébergée est chargée depuis la copie');

verifier(manquants.size === 0, `aucune ressource introuvable (${manquants.size})`);
for (const m of [...manquants].slice(0, 5)) console.log(`      manquant : ${m}`);

await navigateur.close();

console.log(`\n${passes} vérification(s) passée(s).`);
if (echecs.length > 0) {
  console.error(`\n${echecs.length} échec(s) :`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('La copie locale s’ouvre et se navigue sans serveur.');
