/**
 * Registre des composants interactifs.
 *
 * Chacun fonctionne sans aucune photographie de démonstration : ils calculent
 * ou dessinent leur propre contenu. C'est ce qui rend une leçon projetable le
 * premier soir, avant que la moindre image ait été prise.
 */
import ProfondeurDeChamp from './ProfondeurDeChamp.astro';
import OuvertureDivision from './OuvertureDivision.astro';
import VitesseEtMouvement from './VitesseEtMouvement.astro';
import IsoEtBruit from './IsoEtBruit.astro';
import MoletteDesModes from './MoletteDesModes.astro';
import ArbreDeDiagnostic from './ArbreDeDiagnostic.astro';

export const COMPOSANTS = {
  'profondeur-de-champ': ProfondeurDeChamp,
  'ouverture-division': OuvertureDivision,
  'vitesse-et-mouvement': VitesseEtMouvement,
  'iso-et-bruit': IsoEtBruit,
  'molette-des-modes': MoletteDesModes,
  'arbre-de-diagnostic': ArbreDeDiagnostic,
};
