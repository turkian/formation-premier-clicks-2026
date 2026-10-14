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

/**
 * Les images libres d'un écran de démonstration, par rangs de `imagesParRang`
 * tels que la projection les dispose ; absent, toutes sur un seul rang. L'écran
 * et son crédit lisent ici les mêmes rangs : « rangée du bas » ne peut pas
 * désigner autre chose que ce qu'on voit.
 */
export function rangsLibres(ecran: any): any[][] {
  const libres: any[] = ecran.images ?? [];
  const parRang: number = ecran.imagesParRang ?? Math.max(libres.length, 1);
  const rangs: any[][] = [];
  for (let i = 0; i < libres.length; i += parRang) rangs.push(libres.slice(i, i + parRang));
  return rangs;
}

/** Le crédit d'un écran, formulé pour chacune de ses deux dispositions. */
export interface CreditEcran {
  /** Projection : les photos en rangées — « Photo de droite : … ». */
  large: string;
  /** Téléphone : les photos l'une sous l'autre — « Troisième photo : … ». */
  etroit: string;
}

const HORIZONTAL: Record<number, string[]> = {
  2: ['de gauche', 'de droite'],
  3: ['de gauche', 'du centre', 'de droite'],
};
const VERTICAL: Record<number, string[]> = {
  2: ['du haut', 'du bas'],
  3: ['du haut', 'du milieu', 'du bas'],
};
const ORDINAUX = ['première', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième', 'huitième', 'neuvième'];

const capitale = (texte: string) => texte.charAt(0).toUpperCase() + texte.slice(1);

/**
 * Le crédit des photographies qu'un écran montre réellement. Une consigne de
 * prise de vue n'est l'œuvre de personne : tant que l'image manque, son crédit
 * reste muet.
 *
 * Quand l'écran mêle des photos de plusieurs auteurs — celles de l'animateur,
 * non créditées, et celles d'un invité —, le crédit dit **laquelle** : « Photo de
 * droite ». Sur téléphone, les rangées deviennent une seule colonne et la
 * gauche n'existe plus ; le crédit compte alors dans l'ordre de lecture.
 */
export async function creditDeLEcran(ecran: any): Promise<CreditEcran | null> {
  /* Les rangées telles que la projection les dispose. Une colonne sans photo
     garde sa place : c'est elle qui fait la gauche et la droite. */
  const rangees: any[][] = [
    ...(ecran.colonnes ? [ecran.colonnes.map((c: any) => c.image)] : []),
    ...(ecran.series ?? []).map((s: any) => s.images),
    ...rangsLibres(ecran),
  ];

  const photos: { credit?: string; large: string; etroit: string }[] = [];
  let rang = 0;
  for (const [r, rangee] of rangees.entries()) {
    for (const [c, e] of rangee.entries()) {
      if (!e) continue;
      rang += 1;
      if (!(await trouverImage(e.id, e.fichier))) continue;
      const h = HORIZONTAL[rangee.length]?.[c] ?? (rangee.length > 1 ? `nᵒ ${c + 1}` : null);
      const v = VERTICAL[rangees.length]?.[r] ?? (rangees.length > 1 ? `de la rangée ${r + 1}` : null);
      photos.push({
        credit: e.credit,
        large: ['photo', h, v && (h ? `, rangée ${v}` : v)].filter(Boolean).join(' ').replace(' ,', ','),
        etroit: `${ORDINAUX[rang - 1] ?? `${rang}ᵉ`} photo`,
      });
    }
  }

  const auteurs = [...new Set(photos.map((p) => p.credit).filter(Boolean))] as string[];
  if (auteurs.length === 0) return null;

  // Un seul auteur pour toutes les photos de l'écran : inutile de les désigner.
  if (photos.every((p) => p.credit === auteurs[0])) {
    const simple = `${photos.length > 1 ? 'Photos' : 'Photo'} : ${auteurs[0]}`;
    return { large: simple, etroit: simple };
  }

  const formuler = (disposition: 'large' | 'etroit') =>
    auteurs
      .map((a) => {
        const lesquelles = photos.filter((p) => p.credit === a).map((p) => p[disposition]);
        return `${capitale(lesquelles.join(' et '))} : ${a}`;
      })
      .join(' · ');

  return { large: formuler('large'), etroit: formuler('etroit') };
}
