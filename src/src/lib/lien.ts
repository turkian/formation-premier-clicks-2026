/**
 * Construction de liens et d'URL d'assets sous le chemin de base du dépôt.
 *
 * Le site est déployé sur une URL de projet GitHub Pages
 * (`/formation-premier-clicks-2026/`). Un chemin absolu écrit à la main
 * (`/lecons/1/`) fonctionne au développement et renvoie une 404 en production :
 * tout passe donc par ici.
 *
 * Ce module ne s'exécute qu'à la construction (en-têtes de composants et
 * points d'accès), jamais dans un script client : il peut lire le disque.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE = import.meta.env.BASE_URL;

/** Base normalisée : commence par « / », ne finit jamais par « / » (sauf la racine). */
const baseNette = BASE === '/' ? '' : BASE.replace(/\/+$/, '');

/**
 * Lien interne vers une page. Le résultat porte toujours une barre oblique
 * finale, conformément à `trailingSlash: 'always'`.
 *
 *   lien('/lecons/1/bloc-2')  →  /formation-premier-clicks-2026/lecons/1/bloc-2/
 *   lien('/')                 →  /formation-premier-clicks-2026/
 */
export function lien(chemin: string): string {
  if (/^(https?:)?\/\//.test(chemin) || chemin.startsWith('#') || chemin.startsWith('mailto:')) {
    return chemin;
  }
  const [avantFragment, fragment] = separerFragment(chemin);
  const propre = `/${avantFragment.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  const avecBarre = propre === '/' ? '/' : `${propre}/`;
  return `${baseNette}${avecBarre}${fragment}`;
}

/**
 * URL d'un fichier de `public/`. Pas de barre oblique finale : un fichier n'est
 * pas un répertoire.
 *
 * Quand le fichier existe dans `public/`, l'URL porte l'empreinte de son
 * contenu (`?v=`). Une photo remplacée sous le même nom change donc d'URL, et
 * le service travailleur — qui garde pour toujours ce qui porte une empreinte —
 * ne peut plus servir l'ancienne. Une URL qui ne désigne pas un fichier de
 * `public/` (le service travailleur, sa portée, une photo pas encore prise)
 * reste telle quelle.
 *
 *   asset('/demos/l2-figer.jpg')       →  /formation-premier-clicks-2026/demos/l2-figer.jpg?v=3f9a0c12be
 *   asset('/service-travailleur.js')   →  /formation-premier-clicks-2026/service-travailleur.js
 */
export function asset(chemin: string): string {
  if (/^(https?:)?\/\//.test(chemin) || chemin.startsWith('data:')) return chemin;
  const relatif = chemin.replace(/^\/+/, '');
  const version = empreinte(relatif);
  return `${baseNette}/${relatif}${version ? `?v=${version}` : ''}`;
}

/** Injecté par `astro.config.mjs` : chemin absolu de `public/`. */
declare const __DOSSIER_PUBLIC__: string;

const empreintes = new Map<string, string | null>();

/**
 * Les 10 premiers caractères hexadécimaux du SHA-256 du fichier, ou `null` s'il
 * n'existe pas. Mémorisé en production ; relu à chaque appel en développement,
 * pour qu'une photo remplacée apparaisse sans redémarrer le serveur.
 */
function empreinte(relatif: string): string | null {
  if (import.meta.env.PROD && empreintes.has(relatif)) return empreintes.get(relatif)!;
  const fichier = join(__DOSSIER_PUBLIC__, relatif);
  const resultat =
    relatif !== '' && existsSync(fichier) && statSync(fichier).isFile()
      ? createHash('sha256').update(readFileSync(fichier)).digest('hex').slice(0, 10)
      : null;
  empreintes.set(relatif, resultat);
  return resultat;
}

/** URL absolue, pour les codes QR et les métadonnées de partage. */
export function lienAbsolu(chemin: string, site: URL | undefined): string {
  const relatif = lien(chemin);
  if (!site) return relatif;
  return new URL(relatif, site).toString();
}

function separerFragment(chemin: string): [string, string] {
  const index = chemin.indexOf('#');
  if (index === -1) return [chemin, ''];
  return [chemin.slice(0, index), chemin.slice(index)];
}
