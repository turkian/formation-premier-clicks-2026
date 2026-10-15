/**
 * Vérifications sur le site construit.
 *
 * Ce que le contenu promet, cette commande le vérifie dans un vrai navigateur,
 * sur les vraies URL de production :
 *
 *   impression  — chaque fiche de référence tient sur **une** page Letter
 *   telephone   — aucune page ne défile horizontalement à la largeur d'un
 *                 téléphone
 *   projection  — aucun écran de leçon ne déborde en 4:3 (1024 × 768) ni en 16:9
 *   liens       — tout lien interne résout sous le sous-chemin du dépôt, et
 *                 tout fichier de `public/` est référencé avec son empreinte
 *   alignement  — deux éléments côte à côte sur une rangée font la même hauteur
 *
 * Usage : node scripts/verifier.mjs [impression|telephone|projection|liens|alignement|tout]
 */
import { chromium } from 'playwright';
import { readdir, readFile } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { servir } from './serveur.mjs';
import { nombreDePages } from './pdf.mjs';

const RACINE = new URL('../dist/', import.meta.url);
const TELEPHONE = { width: 390, height: 844 };
const PROJECTION_43 = { width: 1024, height: 768 };
const PROJECTION_169 = { width: 1280, height: 720 };
const BUREAU = { width: 1600, height: 1200 };

/** Pages ouvertes en même temps. `VERIFIER_CONCURRENCE=1` rend l'exécution séquentielle. */
const CONCURRENCE =
  Number(process.env.VERIFIER_CONCURRENCE) || Math.min(8, Math.max(2, availableParallelism() - 1));

const echecs = [];
const reussites = [];

function verifier(condition, ou, message) {
  if (condition) reussites.push(`${ou} — ${message}`);
  else echecs.push(`${ou} — ${message}`);
}

/** Toutes les pages HTML du site construit, en chemins relatifs. */
async function pages(dossier = RACINE, prefixe = '/') {
  const trouvees = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    if (entree.isDirectory()) {
      trouvees.push(...(await pages(new URL(`${entree.name}/`, dossier), `${prefixe}${entree.name}/`)));
    } else if (entree.name === 'index.html') {
      trouvees.push(prefixe);
    }
  }
  return trouvees.sort();
}

/**
 * Un contexte de vérification. Le service travailleur est bloqué : il mettrait
 * le site en cache à chaque nouveau contexte, ce qui ralentit tout sans rien
 * mesurer — le hors-ligne a sa propre vérification (`verifier:hors-ligne`).
 */
const nouveauContexte = (navigateur, options = {}) =>
  navigateur.newContext({ serviceWorkers: 'block', ...options });

/**
 * Applique `travail` à chaque élément, `n` à la fois. Les résultats reviennent
 * dans l'ordre des éléments, pour que le rapport reste stable d'une exécution
 * à l'autre malgré le parallélisme.
 */
async function enParallele(elements, travail, n = CONCURRENCE) {
  const resultats = new Array(elements.length);
  let suivant = 0;
  const ouvrier = async (no) => {
    while (suivant < elements.length) {
      const i = suivant++;
      resultats[i] = await travail(elements[i], no);
    }
  };
  await Promise.all(Array.from({ length: Math.min(n, elements.length) }, (_, no) => ouvrier(no)));
  return resultats;
}

/** Comme `enParallele`, chaque ouvrier disposant de sa propre page dans `contexte`. */
async function surPages(contexte, chemins, travail) {
  const onglets = await Promise.all(
    Array.from({ length: Math.min(CONCURRENCE, chemins.length) }, () => contexte.newPage()),
  );
  try {
    return await enParallele(chemins, (chemin, no) => travail(onglets[no], chemin));
  } finally {
    await Promise.all(onglets.map((o) => o.close()));
  }
}

/**
 * Le site est statique : l'événement `load` suffit, sans l'attente de 500 ms
 * de silence réseau qu'impose `networkidle`. Restent les polices et les images
 * paresseuses qu'un changement de taille fait entrer dans la fenêtre : on les
 * attend avant de mesurer quoi que ce soit.
 */
async function charger(page, url) {
  const reponse = await page.goto(url, { waitUntil: 'load' });
  await stabiliser(page);
  return reponse;
}

async function stabiliser(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const visibles = [...document.images].filter((image) => {
      if (image.complete) return false;
      const b = image.getBoundingClientRect();
      return b.bottom > 0 && b.right > 0 && b.top < innerHeight && b.left < innerWidth;
    });
    const chargee = (image) =>
      new Promise((ok) => {
        image.addEventListener('load', ok, { once: true });
        image.addEventListener('error', ok, { once: true });
      });
    await Promise.race([
      Promise.all(visibles.map(chargee)),
      new Promise((ok) => setTimeout(ok, 3000)),
    ]);
    await new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok)));
  });
}

/** Redimensionne la fenêtre, puis attend que la mise en page soit stable. */
async function redimensionner(page, viewport) {
  await page.setViewportSize(viewport);
  await stabiliser(page);
}

/** Largeur de défilement excédentaire, en pixels. 0 = rien ne déborde. */
const debordementHorizontal = () =>
  Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);

async function main() {
  const quoi = process.argv[2] ?? 'tout';
  const site = await servir(new URL('.', RACINE).pathname);
  const navigateur = await chromium.launch({ channel: 'chrome' });

  try {
    const toutes = await pages();
    const fiches = toutes.filter((p) => /^\/fiches\/.+\//.test(p));
    const ecrans = toutes.filter((p) => /^\/lecons\//.test(p));

    if (quoi === 'tout' || quoi === 'liens') await verifierLiens(navigateur, site, toutes);
    if (quoi === 'tout' || quoi === 'impression') await verifierImpression(navigateur, site, fiches);
    if (quoi === 'tout' || quoi === 'telephone') await verifierTelephone(navigateur, site, toutes);
    if (quoi === 'tout' || quoi === 'projection') await verifierProjection(navigateur, site, ecrans);
    if (quoi === 'tout' || quoi === 'qr') await verifierCodesQr(navigateur, site, ecrans);
    if (quoi === 'tout' || quoi === 'alignement') await verifierAlignement(navigateur, site, toutes);
  } finally {
    await navigateur.close();
    await site.fermer();
  }

  console.log(`\n${reussites.length} vérification(s) passée(s).`);
  if (echecs.length > 0) {
    console.error(`\n${echecs.length} échec(s) :`);
    for (const e of echecs) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log('Aucun échec.');
}

/* ── Liens internes sous le sous-chemin du dépôt ───────────────────────────
   Un lien écrit `/fiches/` au lieu de `lien('/fiches')` fonctionne en
   développement et renvoie une 404 en production. On suit donc tous les liens
   internes de toutes les pages, contre le serveur qui reproduit le sous-chemin. */
async function verifierLiens(navigateur, site, toutes) {
  const contexte = await nouveauContexte(navigateur);

  // D'abord relever les liens de chaque page…
  const relevees = await surPages(contexte, toutes, async (page, chemin) => {
    const reponse = await page.goto(site.url(chemin), { waitUntil: 'domcontentloaded' });
    const liens = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    return { statut: reponse?.status(), liens };
  });

  // …puis interroger chaque cible une seule fois, au premier endroit où elle paraît.
  const cibles = new Map();
  toutes.forEach((chemin, i) => {
    for (const href of relevees[i].liens) {
      if (!href || /^(https?:|mailto:|#)/.test(href)) continue;
      const cible = new URL(href, site.url(chemin)).toString();
      if (!cibles.has(cible)) cibles.set(cible, { chemin, href });
    }
  });
  const statuts = await enParallele([...cibles.keys()], async (cible) =>
    (await contexte.request.get(cible)).status(),
  );
  const statutDe = new Map([...cibles.keys()].map((cible, i) => [cible, statuts[i]]));

  toutes.forEach((chemin, i) => {
    const { statut } = relevees[i];
    verifier(statut === 200, chemin, `la page répond ${statut}`);
    for (const [cible, origine] of cibles) {
      if (origine.chemin !== chemin) continue;
      const s = statutDe.get(cible);
      verifier(s === 200, chemin, `le lien ${origine.href} résout (${s}) sous le sous-chemin du dépôt`);
    }
  });
  await contexte.close();

  await verifierEmpreintes(toutes);
}

/* ── Les fichiers de `public/` portent l'empreinte de leur contenu ─────────
   Le service travailleur garde pour toujours ce qui porte `?v=`, et revalide
   le reste. Une photo, une police ou l'icône référencée sans passer par
   `asset()` perdrait son empreinte : remplacée sous le même nom, elle
   n'apparaîtrait qu'au rechargement suivant. On lit donc le HTML construit —
   attributs, styles en ligne et `@font-face` compris. */
async function verifierEmpreintes(toutes) {
  const reference =
    /\/(?:(?:demos|polices)\/[\w.-]+\.(?:jpe?g|png|webp|avif|svg|woff2)|icone\.svg)(\?v=[0-9a-f]{10})?/g;
  for (const chemin of toutes) {
    const html = await readFile(new URL(`.${chemin}index.html`, RACINE), 'utf8');
    const sansEmpreinte = [...html.matchAll(reference)].filter(([, v]) => !v).map(([url]) => url);
    verifier(
      sansEmpreinte.length === 0,
      chemin,
      sansEmpreinte.length === 0
        ? 'chaque fichier de public/ porte son empreinte ?v='
        : `fichier de public/ sans empreinte ?v= : ${[...new Set(sansEmpreinte)].join(', ')}`,
    );
  }
}

/* ── Une fiche = une page Letter ─────────────────────────────────────────── */
async function verifierImpression(navigateur, site, fiches) {
  const contexte = await nouveauContexte(navigateur);
  const mesures = await surPages(contexte, fiches, async (page, chemin) => {
    await charger(page, site.url(chemin));

    // `page.pdf()` rend en média « print » — sauf si une émulation est encore
    // active, auquel cas c'est elle qui gagne. On remet donc l'émulation à zéro
    // avant chaque impression, sans quoi la deuxième fiche serait mesurée avec
    // la feuille de l'écran.
    await page.emulateMedia({ media: null });
    const pdf = await page.pdf({ format: 'Letter', printBackground: true });
    const n = nombreDePages(pdf);

    // Le mobilier de site ne doit pas survivre à l'impression.
    await page.emulateMedia({ media: 'print' });
    const mobilier = await page.$$eval('nav, .sans-impression, .saut-au-contenu', (elements) =>
      elements.filter((e) => getComputedStyle(e).display !== 'none').length,
    );
    const attribution = await page.$$eval('.fiche-pied', (elements) =>
      elements.some((e) => (e.textContent ?? '').includes('club')),
    );
    await page.emulateMedia({ media: null });
    return { n, mobilier, attribution };
  });

  fiches.forEach((chemin, i) => {
    const { n, mobilier, attribution } = mesures[i];
    verifier(n === 1, chemin, `s'imprime sur exactement une page Letter (obtenu : ${n})`);
    verifier(mobilier === 0, chemin, `n'imprime aucun mobilier de site (${mobilier} élément(s) visible(s))`);
    verifier(attribution, chemin, "conserve l'attribution du club à l'impression");
  });
  await contexte.close();
}

/* ── Rien ne défile horizontalement sur un téléphone ──────────────────────── */
async function verifierTelephone(navigateur, site, toutes) {
  const contexte = await nouveauContexte(navigateur, {
    viewport: TELEPHONE,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const debords = await surPages(contexte, toutes, async (page, chemin) => {
    await charger(page, site.url(chemin));
    return page.evaluate(debordementHorizontal);
  });
  toutes.forEach((chemin, i) => {
    const trop = debords[i];
    verifier(trop === 0, chemin, `ne défile pas horizontalement à ${TELEPHONE.width} px (débord : ${trop} px)`);
  });
  await contexte.close();
}

/* ── Le relais téléphone n'apparaît que là où il aide ──────────────────────
   Décision D5 : pendant un panneau de concept, l'animateur veut des yeux levés,
   et trente personnes sur leur téléphone est le mode de défaillance. Pendant un
   « appareil en main », les têtes sont penchées sur les appareils et l'écran est
   derrière eux — c'est exactement là que les consignes doivent être en main.
   La règle porte sur le rendu, pas sur l'intention : on la vérifie donc sur les
   pages produites. */
async function verifierCodesQr(navigateur, site, ecrans) {
  const contexte = await nouveauContexte(navigateur);
  const etats = await surPages(contexte, ecrans, async (page, chemin) => {
    await page.goto(site.url(chemin), { waitUntil: 'domcontentloaded' });
    return page.evaluate(() => ({
      qr: document.querySelectorAll('[data-qr]').length,
      genre: document.querySelector('[data-scene]')?.getAttribute('data-genre') ?? '',
      variante: document.querySelector('.repere')?.getAttribute('data-variante') ?? '',
    }));
  });
  let avec = 0;

  ecrans.forEach((chemin, i) => {
    const etat = etats[i];

    const autorise =
      etat.genre === 'appareil-en-main' ||
      (etat.genre === 'repere' && (etat.variante === 'ouverture' || etat.variante === 'activite'));

    if (etat.qr > 0) avec += 1;
    verifier(
      autorise ? etat.qr === 1 : etat.qr === 0,
      autorise
        ? `${chemin} — porte le code à scanner (${etat.genre})`
        : `${chemin} — ne porte aucun code à scanner (${etat.genre})`,
    );
  });

  verifier(avec > 0, `${avec} écran(s) portent le relais téléphone`);
  await contexte.close();
}

/* ── Aucun écran de leçon ne déborde en 4:3 ni en 16:9 ────────────────────── */
async function verifierProjection(navigateur, site, ecrans) {
  const formats = [PROJECTION_43, PROJECTION_169];
  const contexte = await nouveauContexte(navigateur, { viewport: formats[0] });

  // Chaque état d'un panneau cumulatif a sa propre adresse : ils figurent donc
  // déjà tous dans la liste. Inutile — et trompeur — de simuler la navigation
  // au clavier ici ; on mesure chaque arrêt là où il est.
  //
  // Chaque page n'est chargée qu'une fois : on la redimensionne d'un format à
  // l'autre. Le HTML ne change pas avec la fenêtre, seule la mise en page.
  const parPage = await surPages(contexte, ecrans, async (page, chemin) => {
    await charger(page, site.url(chemin));
    const mesures = [];
    for (const format of formats) {
      if (format !== formats[0]) await redimensionner(page, format);
      mesures.push(await page.evaluate(() => {
        const scene = document.querySelector('[data-scene]');
        if (!scene) return null;

        /*
         * Mesurer la scène ne suffit pas : ses régions sont dimensionnées par la
         * grille et leurs boîtes restent donc dans les clous même quand leur
         * contenu déborde et se fait rogner par `overflow: hidden`. Ce qui est
         * illisible au fond de la salle est justement ce contenu-là. On inspecte
         * donc **tout** ce qui masque son dépassement.
         */
        let pire = { selecteur: '', debord: 0 };
        const candidats = [scene, ...scene.querySelectorAll('*')];
        for (const element of candidats) {
          const style = getComputedStyle(element);
          const masque = /hidden|clip/.test(style.overflowY) || /hidden|clip/.test(style.overflowX);
          if (!masque) continue;
          const debord = Math.max(
            element.scrollHeight - element.clientHeight,
            element.scrollWidth - element.clientWidth,
          );
          if (debord > pire.debord) {
            pire = {
              selecteur:
                element.className && typeof element.className === 'string'
                  ? `.${element.className.trim().split(/\s+/).join('.')}`
                  : element.tagName.toLowerCase(),
              debord,
            };
          }
        }

        // Et un chevauchement franc entre deux régions du panneau se voit à la
        // superposition de leurs boîtes.
        let chevauchement = 0;
        const regions = [...scene.querySelectorAll('.ecran > *')].map((r) => r.getBoundingClientRect());
        for (let i = 0; i < regions.length; i += 1) {
          for (let j = i + 1; j < regions.length; j += 1) {
            const a = regions[i], b = regions[j];
            const h = Math.min(a.right, b.right) - Math.max(a.left, b.left);
            const v = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (h > 2 && v > 2) chevauchement = Math.max(chevauchement, Math.round(v));
          }
        }

        return { pire, chevauchement };
      }));
    }
    return mesures;
  });

  for (const [f, format] of formats.entries()) {
    const nom = `${format.width} × ${format.height}`;
    ecrans.forEach((chemin, i) => {
      const mesure = parPage[i][f];
      if (!mesure) return;
      // Deux pixels de tolérance : les arrondis de sous-pixel ne sont pas des
      // débordements.
      const rogne = mesure.pire.debord > 2;
      verifier(
        !rogne && mesure.chevauchement === 0,
        chemin,
        rogne
          ? `déborde en ${nom} : ${mesure.pire.selecteur} rogne ${mesure.pire.debord} px`
          : mesure.chevauchement > 0
            ? `deux régions se chevauchent sur ${mesure.chevauchement} px en ${nom}`
            : `tient entièrement en ${nom}`,
      );
    });
  }
  await contexte.close();
}

/* ── Deux éléments sur une rangée font la même hauteur ─────────────────────
   Une liste peut être de la prose ou une mise en page. Quand elle est une mise
   en page, ses éléments sont étirés à la hauteur de leur rangée — mais c'est la
   **boîte de marge** qui est étirée, pas la boîte de bordure : une marge sur
   l'élément est retirée de ce que le lecteur voit. Une marge de prose héritée
   rendait ainsi chaque carte plus courte que sa rangée, sauf la dernière, d'un
   écart d'une dizaine de pixels — assez pour être vu, trop peu pour être vu à
   coup sûr. Une inspection à l'œil a déjà laissé passer celui-là.

   Le regroupement se fait donc par géométrie — les `li` qui partagent un bord
   supérieur —, jamais par classe ni par `display`. C'est ce qui fait que la
   vérification survit à une mise en page construite autrement : grille, flex,
   flex qui se replie, ou ce qu'une section future emploiera. */
async function verifierAlignement(navigateur, site, toutes) {
  const vues = [
    ['téléphone', TELEPHONE],
    ['projection 4:3', PROJECTION_43],
    ['bureau', BUREAU],
  ];

  const contexte = await nouveauContexte(navigateur, { viewport: vues[0][1] });

  // Une seule visite par page, redimensionnée d'une vue à l'autre.
  const parPage = await surPages(contexte, toutes, async (page, chemin) => {
    await charger(page, site.url(chemin));
    const mesures = [];
    for (const [, viewport] of vues) {
      if (viewport !== vues[0][1]) await redimensionner(page, viewport);
      mesures.push(await page.evaluate(() => {
        // Un `<dialog>` fermé ne se mesure pas. L'index des blocs est une
        // grille de `li` comme une autre : on l'ouvre pour la mesurer.
        for (const dialogue of document.querySelectorAll('dialog:not([open])')) {
          dialogue.setAttribute('open', '');
        }

        const trouvees = [];
        for (const liste of document.querySelectorAll('ul, ol')) {
          const elements = [...liste.children].filter((e) => e.tagName === 'LI');
          if (elements.length < 2) continue;

          const rangees = new Map();
          for (const element of elements) {
            const boite = element.getBoundingClientRect();
            if (boite.height === 0) continue;
            const cle = Math.round(boite.top);
            if (!rangees.has(cle)) rangees.set(cle, []);
            rangees.get(cle).push(Math.round(boite.height * 10) / 10);
          }

          for (const hauteurs of rangees.values()) {
            if (hauteurs.length < 2) continue;
            // Un demi-pixel de tolérance : les pistes d'une grille ne tombent
            // pas sur des largeurs entières (452,797 px contre 452,812 px), et
            // l'égalité exacte serait le mauvais test.
            const ecart = Math.max(...hauteurs) - Math.min(...hauteurs);
            if (ecart > 0.5) {
              trouvees.push({
                liste: liste.className || `<${liste.tagName.toLowerCase()}>`,
                hauteurs,
                ecart: Math.round(ecart * 10) / 10,
              });
            }
          }
        }
        return trouvees;
      }));
    }
    return mesures;
  });

  for (const [v, [nom]] of vues.entries()) {
    toutes.forEach((chemin, i) => {
      const inegales = parPage[i][v];
      verifier(
        inegales.length === 0,
        chemin,
        inegales.length === 0
          ? `aligne toutes ses rangées en ${nom}`
          : `désaligne ${inegales.length} rangée(s) en ${nom} : ` +
            inegales
              .map((r) => `${r.liste} ${r.hauteurs.join('/')} px (écart ${r.ecart} px)`)
              .join(' ; '),
      );
    });
  }
  await contexte.close();
}

await main();
