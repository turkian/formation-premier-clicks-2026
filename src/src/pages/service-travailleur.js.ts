/**
 * Le service travailleur.
 *
 * Il est **engendré** plutôt que statique : il doit connaître le chemin de base
 * du dépôt, ce qu'un fichier de `public/` ne peut pas savoir, et il doit
 * préremplir son cache avec les ressources partagées du site — polices et
 * icône — sous l'URL exacte que les pages demandent, empreinte comprise.
 *
 * Stratégie, dictée par la salle plutôt que par la mode (décision D9, précisée
 * par le changement bust-stale-demo-photos) :
 *
 *   — **le réseau d'abord, le cache en secours** pour les pages. L'animateur
 *     doit voir la version déployée, pas celle de la semaine dernière ; mais si
 *     le wifi tombe en pleine séance, toute page déjà visitée continue de
 *     s'afficher.
 *   — **le cache d'abord** pour ce qui porte une empreinte, et seulement pour
 *     cela : les fichiers regroupés par Astro (`/ressources/`) et les fichiers
 *     de `public/` dont l'URL porte `?v=` (voir `asset()`). Leur URL change
 *     quand leur contenu change, donc une version en cache n'est jamais
 *     périmée. C'est l'empreinte qui décide, pas l'extension : une photo
 *     remplacée sous le même nom restait autrefois figée pour toujours.
 *   — **une seule copie par fichier.** Quand une nouvelle version d'un fichier
 *     arrive, les autres versions du même chemin sont effacées ; hors ligne,
 *     cette copie sert quelle que soit la version qu'une page en cache demande.
 *     Hors ligne, on voit donc la dernière version reçue, jamais une image
 *     cassée.
 *
 * Ce qui compte le soir venu : une leçon ouverte une fois reste **navigable**,
 * ses écrans suivants compris — c'est le préchargement de `Ecran.astro` qui les
 * a mis en cache pendant que le réseau était encore là.
 */
import type { APIRoute } from 'astro';
import { asset, lien } from '../lib/lien';

export const GET: APIRoute = async () => {
  const racine = lien('/');

  /*
   * Le noyau : ce sans quoi une page ne s'affiche pas correctement. Les polices
   * sont préchargées explicitement — sans elles, la projection perdrait sa
   * typographie au pire moment, et un repli sur une police système change
   * toutes les mesures de mise en page vérifiées à la construction.
   */
  const noyau = [
    racine,
    asset('/icone.svg'),
    asset('/polices/inter-latin-wght-normal.woff2'),
    asset('/polices/inter-latin-ext-wght-normal.woff2'),
  ];

  const source = `/* Engendré par src/pages/service-travailleur.js.ts — ne pas modifier à la main. */
const VERSION = 'premiers-clicks-v2';
const RACINE = ${JSON.stringify(racine)};
const NOYAU = ${JSON.stringify(noyau)};

self.addEventListener('install', (evenement) => {
  evenement.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(NOYAU)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(
    caches
      .keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim()),
  );
});

/** Une URL qui porte une empreinte de contenu ne périme jamais. */
const porteEmpreinte = (url) =>
  url.pathname.startsWith(RACINE + 'ressources/') || url.searchParams.has('v');

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;

  const url = new URL(requete.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(RACINE)) return;

  if (porteEmpreinte(url)) {
    // Cache d'abord : son contenu ne peut pas être périmé.
    evenement.respondWith(
      caches.match(requete).then(
        (enCache) =>
          enCache ??
          fetch(requete)
            .then(async (reponse) => {
              await remplacerVersions(requete, reponse);
              return reponse;
            })
            // Hors ligne : la dernière version reçue de ce fichier, quelle que
            // soit celle que demande la page.
            .catch(() =>
              caches
                .match(requete, { ignoreSearch: true })
                .then((autre) => autre ?? Response.error()),
            ),
      ),
    );
    return;
  }

  // Réseau d'abord : l'animateur doit voir la version déployée. \`no-cache\`
  // revalide auprès du serveur plutôt que d'accepter le cache HTTP du
  // navigateur, que GitHub Pages fixe à dix minutes — une page périmée y
  // désignerait encore l'ancienne photo. On repart de l'URL : une requête de
  // navigation ne peut pas être recopiée avec des options.
  evenement.respondWith(
    fetch(requete.url, { cache: 'no-cache', redirect: requete.redirect })
      .then((reponse) => {
        mettreEnCache(requete, reponse);
        return reponse;
      })
      .catch(() =>
        caches
          .match(requete)
          .then((enCache) => enCache ?? caches.match(RACINE))
          .then((enCache) => enCache ?? Response.error()),
      ),
  );
});

const conservable = (reponse) => reponse && reponse.ok && reponse.type === 'basic';

function mettreEnCache(requete, reponse) {
  if (!conservable(reponse)) return;
  const copie = reponse.clone();
  caches.open(VERSION).then((cache) => cache.put(requete, copie));
}

/** Range la nouvelle version d'un fichier après avoir effacé les précédentes. */
async function remplacerVersions(requete, reponse) {
  if (!conservable(reponse)) return;
  const copie = reponse.clone();
  const cache = await caches.open(VERSION);
  await cache.delete(requete, { ignoreSearch: true });
  await cache.put(requete, copie);
}
`;

  /*
   * Aucun en-tête de cache ici : la construction statique n'écrit que le corps,
   * et GitHub Pages sert ce fichier avec son propre `max-age=600`. Ce n'est pas
   * un problème : pour vérifier une mise à jour, le navigateur contourne son
   * cache HTTP pour le script du service travailleur (`updateViaCache:
   * 'imports'` par défaut).
   */
  return new Response(source, {
    headers: { 'content-type': 'text/javascript; charset=utf-8' },
  });
};
