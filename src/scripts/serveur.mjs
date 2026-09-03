/**
 * Serveur statique minimal pour les vérifications.
 *
 * Il sert `dist/` sous le même chemin de base que la production, afin que les
 * vérifications rencontrent exactement les URL déployées — un lien profond
 * cassé sous le sous-chemin du dépôt doit être détecté ici, pas dans la salle.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/**
 * Démarre le serveur et retourne `{ origine, base, url(chemin), fermer() }`.
 * `url('/fiches/')` produit une URL absolue correcte sous le chemin de base.
 */
export async function servir(racine, base = '/formation-premier-clicks-2026') {
  const baseNette = base.replace(/\/+$/, '');

  const serveur = createServer(async (requete, reponse) => {
    try {
      let chemin = decodeURIComponent(new URL(requete.url, 'http://x').pathname);

      if (baseNette && !chemin.startsWith(baseNette)) {
        // Hors du sous-chemin du dépôt : c'est exactement la 404 que la
        // production renverrait. On la reproduit plutôt que de la masquer.
        reponse.writeHead(404).end('hors du chemin de base');
        return;
      }
      chemin = chemin.slice(baseNette.length) || '/';

      let fichier = join(racine, chemin);
      const info = await stat(fichier).catch(() => null);
      if (info?.isDirectory()) fichier = join(fichier, 'index.html');
      else if (!info) {
        reponse.writeHead(404).end('introuvable');
        return;
      }

      const contenu = await readFile(fichier);
      reponse.writeHead(200, {
        'content-type': TYPES[extname(fichier)] ?? 'application/octet-stream',
      });
      reponse.end(contenu);
    } catch {
      reponse.writeHead(404).end('introuvable');
    }
  });

  await new Promise((resoudre) => serveur.listen(0, '127.0.0.1', resoudre));
  const { port } = serveur.address();
  const origine = `http://127.0.0.1:${port}`;

  return {
    origine,
    base: baseNette,
    url: (chemin) => `${origine}${baseNette}${chemin.startsWith('/') ? chemin : `/${chemin}`}`,
    fermer: () => new Promise((resoudre) => serveur.close(resoudre)),
  };
}
