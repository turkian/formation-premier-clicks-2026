/**
 * Enveloppe chaque tableau dans un conteneur défilant.
 *
 * Un tableau à quatre colonnes — celui des quatre combinaisons Fujifilm, par
 * exemple — ne se replie pas à 390 px. Sans conteneur, c'est la page entière
 * qui s'élargit, et le participant défile latéralement pour lire la colonne
 * qu'il est venu consulter. Avec, le tableau défile seul et la page reste fixe.
 *
 * Fait au rendu plutôt qu'au chargement : le contenu ne doit pas dépendre du
 * JavaScript pour être lisible, et une fiche imprimée n'exécute rien.
 */
import { visit } from 'unist-util-visit';

export function rehypeTableaux() {
  return (arbre) => {
    visit(arbre, 'element', (noeud, index, parent) => {
      if (noeud.tagName !== 'table' || !parent || index === null) return;
      if (parent.type === 'element' && parent.properties?.className?.includes?.('defile-x')) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['defile-x'] },
        children: [noeud],
      };
      // On ne redescend pas dans le tableau qu'on vient de déplacer.
      return ['skip'];
    });
  };
}
