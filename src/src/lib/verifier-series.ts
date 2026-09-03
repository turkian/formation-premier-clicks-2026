/**
 * Vérification des séries comparatives.
 *
 * Une démonstration comparative ne vaut que si **une seule** chose change d'une
 * image à l'autre : c'est ce que la légende annonce, et c'est ce que la salle
 * doit pouvoir lire dans les images. Une série où deux réglages bougent ne
 * démontre rien — elle ne permet pas d'attribuer la différence.
 *
 * La vérification est donc structurelle, pas décorative : elle compare les
 * réglages déclarés image par image et rejette la série si plus d'une clé varie.
 */

export interface ImageSerie {
  id: string;
  reglages?: Record<string, string>;
  valeur?: string;
}

export interface SerieAVerifier {
  variable: string;
  constantes?: Record<string, string>;
  images: ImageSerie[];
}

export interface ProblemeSerie {
  ou: string;
  message: string;
}

/** Retourne la liste des problèmes. Une liste vide vaut « série valide ». */
export function verifierSerie(serie: SerieAVerifier, ou: string): ProblemeSerie[] {
  const problemes: ProblemeSerie[] = [];

  const cles = new Set<string>();
  for (const image of serie.images) {
    for (const cle of Object.keys(image.reglages ?? {})) cles.add(cle);
  }

  const variantes: string[] = [];
  for (const cle of cles) {
    const valeurs = new Set(serie.images.map((i) => i.reglages?.[cle] ?? '—'));
    if (valeurs.size > 1) variantes.push(cle);
  }

  if (variantes.length > 1) {
    problemes.push({
      ou,
      message:
        `la série « ${serie.variable} » déclare ${variantes.length} variables ` +
        `(${variantes.join(', ')}). Une série comparative n'en admet qu'une : ` +
        `la différence entre les images ne serait attribuable à aucune des deux.`,
    });
  }

  // Un réglage annoncé comme constant sous la série ne peut pas varier d'une
  // image à l'autre : la légende mentirait à la salle.
  for (const cle of Object.keys(serie.constantes ?? {})) {
    if (variantes.includes(cle)) {
      problemes.push({
        ou,
        message: `« ${cle} » est annoncé comme constant sous la série, mais varie d'une image à l'autre.`,
      });
    }
  }

  // Chaque image doit dire ce que vaut la variable chez elle, sans quoi la
  // série ne peut pas être légendée image par image.
  const valeurs = serie.images.map((i) => i.valeur);
  if (valeurs.some((v) => !v)) {
    problemes.push({
      ou,
      message: `chaque image de la série « ${serie.variable} » doit déclarer sa « valeur » de cette variable.`,
    });
  } else if (new Set(valeurs).size !== valeurs.length) {
    problemes.push({
      ou,
      message: `deux images de la série « ${serie.variable} » déclarent la même valeur : la série ne compare rien.`,
    });
  }

  return problemes;
}
