/**
 * Contenu partagé par les huit feuilles du lexique.
 *
 * Le cadrage et le « si vous ne trouvez pas » sont identiques d'une marque à
 * l'autre — ils portent une position de la formation, pas un fait technique. Ils
 * vivent donc ici plutôt que recopiés huit fois, où ils dériveraient.
 */

/** Pourquoi les marques diffèrent. Sur toutes les pages, en tête. */
export const CADRAGE = `**Les fabricants d'appareils photo n'emploient pas tous les mêmes mots pour
désigner les mêmes réglages.**

Si vous entendez un terme pendant la formation et que vous ne le trouvez pas sur votre appareil,
ce n'est **jamais** parce qu'il est moins bon : c'est qu'il l'appelle autrement, et la
correspondance est ici.`;

/** Comment lire la page. */
export const MODE_DE_LECTURE = `La colonne de gauche est toujours le mot dit en formation. La
colonne de droite est le mot de votre appareil, ou l'endroit où le trouver.`;

/** Où chercher quand un réglage reste introuvable. Sur toutes les pages, en pied. */
export const INTROUVABLE = [
  `**Essayez le menu rapide.** Neuf fois sur dix le réglage y est, et vous évitez les menus
   complètement.`,
  `**Le manuel de votre appareil est en PDF sur le site du fabricant**, gratuitement, même pour
   un modèle de quinze ans. Cherchez « [votre modèle] manuel PDF ». Il a un index : cherchez-y
   le mot de la colonne de droite, **pas** celui de la formation.`,
  `**Les chemins de menu varient d'un modèle à l'autre**, surtout entre un reflex et un
   sans-miroir de la même marque. La logique, elle, ne change pas : la qualité d'image est dans
   le menu « prise de vue », la mise au point dans le menu « AF ».`,
  `**Demandez.** À un animateur pendant la séance, à votre parrain ensuite, ou sur le groupe du
   club. Personne ne connaît par cœur les menus de tous les appareils — les formateurs non plus.`,
];

/** Clé de mémorisation du choix de marque, sur l'appareil du participant. */
export const CLE_MARQUE = 'premiers-clics:marque';

/** Paramètre d'URL qui empêche la reprise automatique de la marque mémorisée. */
export const PARAM_CHOISIR = 'choisir';
