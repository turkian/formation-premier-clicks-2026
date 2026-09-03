/**
 * Le modèle de profondeur de champ.
 *
 * Les scripts d'animation demandaient de ne pas donner de chiffres (« ne donne
 * pas ces chiffres comme des mesures »). L'animateur a tranché autrement : les
 * chiffres sont bienvenus **s'ils sont calculés correctement**, et accompagnés
 * d'une description qualitative. C'est ce que fait ce module.
 *
 * Modèle classique :
 *   cercle de confusion   c = diagonale du capteur / 1500
 *   hyperfocale           H = f² / (N·c) + f
 *   limite proche         s(H − f) / (H + (s − f))
 *   limite lointaine      s(H − f) / (H − (s − f))     — infinie si s ≥ H
 *
 * Toutes les longueurs sont en **millimètres** à l'intérieur du module. Les
 * conversions vers le mètre n'ont lieu qu'à l'affichage : mêler les unités dans
 * un calcul d'optique est la façon la plus sûre de produire un chiffre faux et
 * plausible, et ce chiffre serait projeté devant trente personnes.
 */

export interface Format {
  id: string;
  nom: string;
  /** Largeur et hauteur du capteur, en millimètres. */
  largeur: number;
  hauteur: number;
  /** Rapport à la diagonale du plein format, pour situer les focales. */
  facteur: number;
}

/**
 * Les formats offerts. Le sélecteur est porteur : avec de vrais chiffres à
 * l'écran dans une salle où les appareils diffèrent, le composant doit dire de
 * quel appareil il parle.
 */
export const FORMATS: Format[] = [
  { id: 'plein-format', nom: 'Plein format', largeur: 36, hauteur: 24, facteur: 1 },
  { id: 'aps-c', nom: 'APS-C', largeur: 23.6, hauteur: 15.7, facteur: 1.53 },
  { id: 'quatre-tiers', nom: '4/3', largeur: 17.3, hauteur: 13, facteur: 2 },
  { id: 'un-pouce', nom: '1 pouce', largeur: 13.2, hauteur: 8.8, facteur: 2.72 },
  { id: 'cellulaire', nom: 'Cellulaire', largeur: 9.6, hauteur: 7.2, facteur: 3.6 },
];

export function format(id: string): Format {
  const trouve = FORMATS.find((f) => f.id === id);
  if (!trouve) throw new Error(`Format de capteur inconnu : « ${id} ».`);
  return trouve;
}

/** Cercle de confusion du format, en millimètres. */
export function cercleDeConfusion(f: Format): number {
  return Math.hypot(f.largeur, f.hauteur) / 1500;
}

/** Distance hyperfocale, en millimètres. */
export function hyperfocale(focaleMm: number, ouverture: number, f: Format): number {
  const c = cercleDeConfusion(f);
  return (focaleMm * focaleMm) / (ouverture * c) + focaleMm;
}

export interface Resultat {
  /** Limite proche de la zone nette, en mètres. */
  proche: number;
  /** Limite lointaine, en mètres. `Infinity` au-delà de l'hyperfocale. */
  lointaine: number;
  /** Épaisseur de la zone nette, en mètres. `Infinity` si elle va à l'infini. */
  epaisseur: number;
  /** Hyperfocale du réglage courant, en mètres. */
  hyperfocale: number;
  /** Vrai quand la mise au point atteint ou dépasse l'hyperfocale. */
  jusquALInfini: boolean;
}

/**
 * Calcule la zone nette.
 *
 * @param distanceM distance de mise au point, en mètres
 * @param focaleMm  focale réelle de l'objectif, en millimètres
 * @param ouverture nombre `f` — le 5.6 de `f/5.6`
 */
export function profondeurDeChamp(
  distanceM: number,
  focaleMm: number,
  ouverture: number,
  f: Format,
): Resultat {
  const s = distanceM * 1000;
  const H = hyperfocale(focaleMm, ouverture, f);

  const proche = (s * (H - focaleMm)) / (H + (s - 2 * focaleMm));
  const denominateurLointain = H - (s - 2 * focaleMm);
  const jusquALInfini = denominateurLointain <= 0;
  const lointaine = jusquALInfini ? Infinity : (s * (H - focaleMm)) / denominateurLointain;

  return {
    proche: proche / 1000,
    lointaine: lointaine / 1000,
    epaisseur: jusquALInfini ? Infinity : (lointaine - proche) / 1000,
    hyperfocale: H / 1000,
    jusquALInfini,
  };
}

/**
 * Les bandes qualitatives.
 *
 * Un chiffre seul ne dit rien à un débutant : « 8 cm » ne devient utile que
 * traduit en « un œil net, l'autre flou ». Les seuils sont normatifs.
 */
export interface Bande {
  nom: string;
  sens: string;
}

const BANDES: { max: number; bande: Bande }[] = [
  { max: 0.02, bande: { nom: 'extrêmement mince', sens: 'la macro : un seul pétale' } },
  { max: 0.1, bande: { nom: 'très mince', sens: "un œil net, l'autre flou" } },
  { max: 0.5, bande: { nom: 'mince', sens: 'un visage entier, mais pas deux personnes' } },
  { max: 2, bande: { nom: 'moyenne', sens: 'un rang de personnes' } },
  { max: 10, bande: { nom: 'épaisse', sens: 'une scène de rue, tout est lisible' } },
];

const TOUT_EST_NET: Bande = {
  nom: 'tout est net',
  sens: 'paysage — inutile de fermer davantage',
};

/** La bande correspondant à une épaisseur, en mètres. */
export function bande(epaisseurM: number, jusquALInfini: boolean): Bande {
  if (jusquALInfini) return TOUT_EST_NET;
  for (const { max, bande: b } of BANDES) {
    if (epaisseurM < max) return b;
  }
  return TOUT_EST_NET;
}

/**
 * Le zoom de kit 18–55 mm `f/3.5-5.6`.
 *
 * L'ouverture maximale se referme à mesure qu'on zoome, et presque personne
 * dans la salle ne sait pourquoi : à 18 mm, `f/3.5` demande un trou de 5 mm ;
 * à 55 mm, il en faudrait un de 16 mm, et l'objectif deviendrait gros et cher.
 * L'interpolation est faite en `log2` du nombre `f`, qui est l'échelle réelle
 * des diaphragmes — une interpolation linéaire donnerait une courbe fausse.
 */
export function ouvertureMaxKit(focaleMm: number): number {
  const f = Math.min(55, Math.max(18, focaleMm));
  const t = (Math.log2(f) - Math.log2(18)) / (Math.log2(55) - Math.log2(18));
  const valeur = 2 ** (Math.log2(3.5) + t * (Math.log2(5.6) - Math.log2(3.5)));
  return valeur;
}

/** Les crans d'ouverture d'un tiers de diaphragme, tels qu'affichés en salle. */
export const CRANS_OUVERTURE = [
  1.4, 1.8, 2, 2.8, 3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22,
];

/** Le cran disponible le plus ouvert, une fois la limite du zoom appliquée. */
export function cranLePlusOuvert(limite: number): number {
  return CRANS_OUVERTURE.find((cran) => cran >= limite - 1e-9) ?? CRANS_OUVERTURE[0]!;
}

/** Diamètre réel de l'ouverture, en millimètres : `f/N` est une division. */
export function diametre(focaleMm: number, ouverture: number): number {
  return focaleMm / ouverture;
}

/** Distance en mètres, rendue lisiblement : « 8 cm », « 77 cm », « 10,3 m ». */
export function distanceLisible(metres: number): string {
  if (!Number.isFinite(metres)) return "l'infini";
  if (metres < 0.01) return `${arrondir(metres * 1000, 0)} mm`;
  if (metres < 1) return `${arrondir(metres * 100, metres < 0.1 ? 1 : 0)} cm`;
  return `${arrondir(metres, metres < 10 ? 2 : 1)} m`;
}

function arrondir(valeur: number, decimales: number): string {
  return valeur.toLocaleString('fr-CA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimales,
  });
}
