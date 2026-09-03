/**
 * Ordre d'affichage des marques du lexique.
 *
 * L'ordre suit le parc d'appareils attendu dans la salle plutôt que
 * l'alphabet : la feuille qu'on cherche doit être vue avant qu'on lise la
 * liste. Les deux cellulaires ferment la liste parce qu'ils forment un groupe
 * à part — pas d'ouverture réglable, pas de molette.
 */
export const MARQUES_ORDRE = [
  'canon',
  'nikon',
  'sony',
  'fujifilm',
  'lumix',
  'olympus-om-system',
  'iphone',
  'android',
] as const;

export type IdentifiantMarque = (typeof MARQUES_ORDRE)[number];

/** Les quatre sections du lexique, dans l'ordre imposé à toutes les marques. */
export const SECTIONS = [
  { numero: 1, titre: 'Les modes' },
  { numero: 2, titre: 'La mise au point' },
  { numero: 3, titre: "L'exposition" },
  { numero: 4, titre: 'Où trouver ces réglages dans les menus' },
] as const;
