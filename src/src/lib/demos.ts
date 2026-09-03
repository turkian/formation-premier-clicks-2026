/**
 * Où vit une photographie de démonstration, et si elle est déjà là.
 *
 * **La règle de nommage est unique et implicite** : un emplacement d'identifiant
 * `l1-pdc-distance-1m` attend `public/demos/l1-pdc-distance-1m.jpg`. Le contenu
 * n'a donc pas à répéter un nom de fichier, et l'animateur n'a rien d'autre à
 * faire que déposer l'image au bon nom — le site la prend en charge sans qu'une
 * ligne de contenu soit modifiée.
 *
 * `fichier` reste possible pour une image qui ne suit pas la règle.
 *
 * La présence est vérifiée sur le disque à la construction plutôt que déclarée :
 * un contenu qui affirmerait posséder une image absente projetterait un cadre
 * vide devant trente personnes.
 */
import { access } from 'node:fs/promises';
import { resolve } from 'node:path';

/*
 * Le chemin est ancré sur la racine du projet, et non sur `import.meta.url` :
 * Astro regroupe les modules serveur dans un dossier temporaire à la
 * construction, où un chemin relatif au fichier source ne mène nulle part. Le
 * symptôme serait silencieux — toutes les photographies déclarées absentes.
 */
const DOSSIER = resolve(process.cwd(), 'public/demos');

/** Extensions acceptées, dans l'ordre où elles sont cherchées. */
export const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

const cache = new Map<string, string | null>();

/** Nom de fichier attendu par défaut pour un emplacement. */
export function fichierAttendu(id: string): string {
  return `${id}.${EXTENSIONS[0]}`;
}

/**
 * Retourne le nom du fichier présent pour cet emplacement, ou `null`.
 * L'appelant affiche alors la consigne de prise de vue à sa place.
 */
export async function trouverImage(id: string, fichier?: string): Promise<string | null> {
  const cle = fichier ?? id;
  if (cache.has(cle)) return cache.get(cle)!;

  const candidats = fichier ? [fichier] : EXTENSIONS.map((e) => `${id}.${e}`);
  let trouve: string | null = null;
  for (const candidat of candidats) {
    const existe = await access(resolve(DOSSIER, candidat))
      .then(() => true)
      .catch(() => false);
    if (existe) {
      trouve = candidat;
      break;
    }
  }

  cache.set(cle, trouve);
  return trouve;
}
