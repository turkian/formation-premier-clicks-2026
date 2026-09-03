/**
 * Registre des schémas dessinés.
 *
 * Explicite, afin qu'un nom erroné dans un fichier de contenu interrompe la
 * construction plutôt que de produire un trou dans un panneau projeté.
 */
import ZoneNette from './ZoneNette.astro';
import DiametreOuverture from './DiametreOuverture.astro';
import QuatreLeviers from './QuatreLeviers.astro';
import DirectionLumiere from './DirectionLumiere.astro';
import PointEtZone from './PointEtZone.astro';

export const SCHEMAS = {
  'zone-nette': ZoneNette,
  'diametre-ouverture': DiametreOuverture,
  'quatre-leviers': QuatreLeviers,
  'direction-lumiere': DirectionLumiere,
  'point-et-zone': PointEtZone,
};
