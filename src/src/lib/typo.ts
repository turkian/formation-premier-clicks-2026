/**
 * Typographie française du Québec.
 *
 * Le contenu est rédigé normalement — « ouverture : f/5.6 » — et cette fonction
 * pose les espaces insécables au rendu. Écrire les insécables à la main dans les
 * fichiers de contenu serait invisible à la relecture et impossible à vérifier.
 *
 * Trois familles de règles :
 *   1. espace fine insécable avant les ponctuations doubles `:` `;` `!` `?`
 *   2. guillemets français `« »` avec espaces insécables intérieures
 *   3. espace insécable entre un nombre et son unité, et à l'intérieur des
 *      nombres composés — `1 h 50`, `f/5.6`, `10 × 15 cm`, `50 mm`, `1/250 s`
 *
 * Une ligne ne peut donc jamais se couper entre un nombre et son unité, ni
 * laisser un `:` orphelin en début de ligne.
 */

/** Espace insécable pleine chasse (U+00A0). */
export const INSEC = ' ';
/** Espace fine insécable (U+202F) — celle qui précède `:` `;` `!` `?`. */
export const FINE = ' ';

/** Unités qui doivent rester collées au nombre qui les précède. */
const UNITES = [
  'mm', 'cm', 'm', 'km',
  'kg', 'g',
  's', 'ms', 'h', 'min',
  'MP', 'Mo', 'Go', 'ko',
  'ISO', 'EV', 'IL',
  'px', 'pt', 'po', '°', '%', '×',
];

const UNITES_MOTIF = UNITES
  .slice()
  .sort((a, b) => b.length - a.length)
  .map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|');

/**
 * Applique les conventions à une chaîne. Idempotente : la repasser sur un texte
 * déjà traité ne change rien.
 */
export function typo(entree: string): string {
  if (!entree) return entree;
  let t = entree;

  // Les segments déjà insécables sont normalisés d'abord, pour l'idempotence.
  t = t.replace(/[  ]/g, ' ');

  // 1. Ponctuations doubles : espace fine insécable avant, jamais après un
  //    chiffre isolé collé (« 10:30 » reste une heure, pas une énumération).
  t = t.replace(/\s*([;!?])/g, `${FINE}$1`);
  t = t.replace(/(\S)\s*:(?!\/\/)/g, (_m, avant: string) =>
    /\d/.test(avant) ? `${avant}:` : `${avant}${FINE}:`,
  );

  // 2. Guillemets français : insécable à l'intérieur, de chaque côté.
  t = t.replace(/«\s*/g, `«${INSEC}`);
  t = t.replace(/\s*»/g, `${INSEC}»`);

  // 3a. Nombre + unité. La virgule décimale et l'apostrophe typographique
  //     comptent comme faisant partie du nombre.
  t = t.replace(
    new RegExp(`(\\d(?:[.,]\\d+)?)\\s+(${UNITES_MOTIF})\\b`, 'g'),
    `$1${INSEC}$2`,
  );
  // 3b. Le signe × d'une dimension et le nombre qui le suit : « 10 × 15 cm ».
  t = t.replace(/(\d)\s*×\s*(\d)/g, `$1${INSEC}×${INSEC}$2`);
  // 3c. Heures composées : « 1 h 50 ».
  t = t.replace(new RegExp(`(\\d)${INSEC}h\\s+(\\d)`, 'g'), `$1${INSEC}h${INSEC}$2`);
  // 3d. Séparateur de milliers à la française : « 1 500 » → insécable.
  t = t.replace(/(\d)\s(\d{3})(?!\d)/g, `$1${INSEC}$2`);
  // 3e. `f/5.6`, `f/1.8` : la notation ne se coupe pas, et on garde le point
  //     décimal, qui est la façon dont les appareils l'écrivent.
  t = t.replace(/\bf\s*\/\s*(\d)/g, `f/$1`);
  // 3f. Une fraction de seconde reste entière : « 1/250 s ».
  t = t.replace(/(\b1\/\d+)\s+s\b/g, `$1${INSEC}s`);

  return t;
}

/**
 * Version pour les gabarits littéraux, afin d'écrire
 * `{fr`ouverture : f/5.6`}` dans un composant.
 */
export function fr(morceaux: TemplateStringsArray, ...valeurs: unknown[]): string {
  return typo(morceaux.reduce((acc, m, i) => acc + m + (i < valeurs.length ? String(valeurs[i]) : ''), ''));
}

/** Nombre à la française : virgule décimale, milliers insécables. */
export function nombre(valeur: number, decimales = 0): string {
  const s = valeur.toLocaleString('fr-CA', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
  // `toLocaleString` pose une espace fine ou normale selon la plateforme :
  // on force l'insécable pour que le rendu soit identique partout.
  return s.replace(/[\s  ]/g, INSEC);
}
