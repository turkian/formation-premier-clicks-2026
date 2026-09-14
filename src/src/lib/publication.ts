/**
 * La construction est-elle gatée ?
 *
 * Gatée : un `astro build` ordinaire (`PROD`, sans dérogation). Non gatée :
 * `astro dev`, où tout doit rester navigable pour la relecture, et la copie
 * locale (`scripts/copie-locale.mjs`), qui pose sa propre dérogation parce
 * qu'elle produit le vrai repli de la soirée, prêt ou non.
 */
export function constructionGatee(): boolean {
  return import.meta.env.PROD && !import.meta.env.SEANCES_TOUJOURS_PRETES;
}
