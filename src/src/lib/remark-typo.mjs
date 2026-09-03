/**
 * Applique les conventions typographiques françaises à tout le contenu Markdown.
 *
 * Le contenu est rédigé normalement dans les fichiers ; les espaces insécables
 * sont posées ici, au rendu. Le code littéral (`f/5.6` entre accents graves) et
 * les blocs de code sont laissés intacts : y insérer une insécable casserait la
 * chaîne pour un lecteur qui la recopie.
 */
import { visit } from 'unist-util-visit';
import { typo } from './typo.ts';

export function remarkTypo() {
  return (arbre) => {
    visit(arbre, 'text', (noeud) => {
      noeud.value = typo(noeud.value);
    });
  };
}
