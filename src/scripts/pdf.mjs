/**
 * Compte les pages d'un PDF produit par Chrome.
 *
 * L'arbre de pages porte un `/Count` : c'est la seule information dont on a
 * besoin, et elle ne dépend d'aucune bibliothèque.
 */
export function nombreDePages(octets) {
  const texte = Buffer.from(octets).toString('latin1');
  const comptes = [...texte.matchAll(/\/Type\s*\/Pages[\s\S]{0,400}?\/Count\s+(\d+)/g)].map((m) =>
    Number(m[1]),
  );
  if (comptes.length > 0) return Math.max(...comptes);
  // Repli : compter les objets page eux-mêmes.
  return [...texte.matchAll(/\/Type\s*\/Page[^s]/g)].length;
}
