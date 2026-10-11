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

/**
 * Au-delà de cette longueur, un code littéral est un libellé de menu qui doit
 * pouvoir passer à la ligne ; en deçà, c'est une valeur — `1/50 s`, `f/5.6`,
 * `50 mm` — qu'une coupure rendrait illisible.
 */
const LONGUEUR_VALEUR = 12;

export function remarkTypo() {
  return (arbre) => {
    visit(arbre, 'text', (noeud) => {
      noeud.value = typo(noeud.value);
    });
    // Une valeur courte ne se coupe pas, sans toucher à ses caractères : la
    // classe porte la règle, la chaîne recopiée reste exacte.
    visit(arbre, 'inlineCode', (noeud) => {
      if (noeud.value.length > LONGUEUR_VALEUR) return;
      noeud.data ??= {};
      noeud.data.hProperties = { ...noeud.data.hProperties, className: ['valeur'] };
    });
  };
}
