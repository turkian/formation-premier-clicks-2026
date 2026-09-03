/**
 * Construction de liens et d'URL d'assets sous le chemin de base du dépôt.
 *
 * Le site est déployé sur une URL de projet GitHub Pages
 * (`/formation-premier-clicks-2026/`). Un chemin absolu écrit à la main
 * (`/lecons/1/`) fonctionne au développement et renvoie une 404 en production :
 * tout passe donc par ici.
 */

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
 *   asset('/images/demo/pdc-1m.jpg')  →  /formation-premier-clicks-2026/images/demo/pdc-1m.jpg
 */
export function asset(chemin: string): string {
  if (/^(https?:)?\/\//.test(chemin) || chemin.startsWith('data:')) return chemin;
  return `${baseNette}/${chemin.replace(/^\/+/, '')}`;
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
