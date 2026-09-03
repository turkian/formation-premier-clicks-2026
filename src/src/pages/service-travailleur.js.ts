/**
 * Le service travailleur.
 *
 * Il est **engendré** plutôt que statique : il doit connaître le chemin de base
 * du dépôt, ce qu'un fichier de `public/` ne peut pas savoir, et il doit
 * préremplir son cache avec les ressources partagées du site — polices et
 * feuilles de style — dont les noms portent une empreinte de construction.
 *
 * Stratégie, dictée par la salle plutôt que par la mode (décision D9) :
 *
 *   — **le réseau d'abord, le cache en secours** pour les pages. L'animateur
 *     doit voir la version déployée, pas celle de la semaine dernière ; mais si
 *     le wifi tombe en pleine séance, toute page déjà visitée continue de
 *     s'afficher.
 *   — **le cache d'abord** pour les ressources versionnées — polices, CSS, JS,
 *     images. Leur nom change quand leur contenu change, donc une version en
 *     cache n'est jamais périmée.
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
const VERSION = 'premiers-clicks-v1';
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

/** Une ressource dont le nom porte une empreinte ne périme jamais. */
const estVersionnee = (url) =>
  /\\.(woff2|css|js|svg|png|jpe?g|webp|avif)$/.test(new URL(url).pathname);

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;

  const url = new URL(requete.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(RACINE)) return;

  if (estVersionnee(requete.url)) {
    // Cache d'abord : son contenu ne peut pas être périmé.
    evenement.respondWith(
      caches.match(requete).then(
        (enCache) =>
          enCache ??
          fetch(requete).then((reponse) => {
            mettreEnCache(requete, reponse);
            return reponse;
          }),
      ),
    );
    return;
  }

  // Réseau d'abord : l'animateur doit voir la version déployée. Le cache prend
  // le relais dès que le réseau ne répond plus — c'est le cas de la salle.
  evenement.respondWith(
    fetch(requete)
      .then((reponse) => {
        mettreEnCache(requete, reponse);
        return reponse;
      })
      .catch(() =>
        caches.match(requete).then((enCache) => enCache ?? caches.match(RACINE)),
      ),
  );
});

function mettreEnCache(requete, reponse) {
  if (!reponse || !reponse.ok || reponse.type === 'opaque') return;
  const copie = reponse.clone();
  caches.open(VERSION).then((cache) => cache.put(requete, copie));
}
`;

  return new Response(source, {
    headers: {
      'content-type': 'text/javascript; charset=utf-8',
      // Le service travailleur lui-même ne doit jamais être servi depuis un
      // cache périmé, sinon une correction ne se propage plus.
      'cache-control': 'no-cache',
    },
  });
};
