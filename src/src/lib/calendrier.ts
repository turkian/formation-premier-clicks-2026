/**
 * Dates des trois séances.
 *
 * Elles servent à mettre en évidence la leçon du soir sur le carrefour : à
 * l'arrivée dans la salle, l'animateur ouvre le site et doit pouvoir cliquer
 * sans lire trois libellés.
 *
 * Tant qu'une date n'est pas renseignée, la mise en évidence retombe sur la
 * première leçon — un défaut sûr, jamais une erreur.
 */

/** Format `AAAA-MM-JJ`, ou `null` tant que la date n'est pas fixée. */
export const DATES: Record<number, string | null> = {
  1: null,
  2: null,
  3: null,
};

/**
 * Numéro de la séance à mettre en évidence : la prochaine qui n'est pas encore
 * passée, ou la première si aucune date n'est fixée.
 */
export function seanceCourante(aujourdHui = new Date()): number {
  const jour = aujourdHui.toISOString().slice(0, 10);
  for (const numero of [1, 2, 3]) {
    const date = DATES[numero];
    if (date && date >= jour) return numero;
  }
  const fixees = Object.values(DATES).filter(Boolean);
  // Toutes les séances sont passées : on met en évidence la dernière.
  return fixees.length === 3 ? 3 : 1;
}

/** Date lisible, ou `null`. */
export function dateLisible(numero: number): string | null {
  const date = DATES[numero];
  if (!date) return null;
  const [a, m, j] = date.split('-').map(Number);
  return new Date(Date.UTC(a!, m! - 1, j!)).toLocaleDateString('fr-CA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
