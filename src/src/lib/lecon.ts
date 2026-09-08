/**
 * Aplatissement d'une leçon en une suite d'arrêts.
 *
 * La navigation avant ne parcourt pas des écrans mais des **arrêts** : un écran
 * ordinaire vaut un arrêt, un panneau cumulatif en vaut autant qu'il a d'états.
 * Avancer fait donc progresser l'état avant de changer d'écran, ce qu'exige la
 * pédagogie question-d'abord des cinq panneaux à révélation (décision D3).
 *
 * Les liens profonds, l'indicateur `bloc N / M` et la cible du code QR découlent
 * tous de cette même liste, plutôt que d'être trois mécanismes distincts qui
 * dériveraient les uns des autres.
 */
import type { CollectionEntry } from 'astro:content';

type Lecon = CollectionEntry<'lecons'>['data'];
type Bloc = Lecon['blocs'][number];
type Ecran = Bloc['ecrans'][number];

export interface Arret {
  /** Rang dans la leçon entière, à partir de 0. */
  index: number;
  bloc: Bloc;
  /** Rang du bloc dans la leçon, à partir de 1 — l'indicateur de position. */
  numeroBloc: number;
  ecran: Ecran;
  /** Rang de l'écran dans son bloc, à partir de 1. */
  numeroEcran: number;
  /** État du panneau, à partir de 0. Vaut 0 pour un écran sans états. */
  etat: number;
  /** Nombre total d'états de cet écran. Vaut 1 s'il n'en a pas. */
  totalEtats: number;
  /** Adresse stable de cet arrêt, relative à la racine du site. */
  chemin: string;
  /** Premier arrêt de l'écran : c'est lui qui porte l'ancre partagée. */
  premierDeLEcran: boolean;
}

/** Nombre d'états d'un écran. Un écran non cumulatif en a exactement un. */
export function nombreEtats(ecran: Ecran): number {
  return ecran.genre === 'panneau' && ecran.etats?.length ? ecran.etats.length : 1;
}

/**
 * Construit la suite d'arrêts d'une leçon.
 *
 * L'adresse d'un arrêt est `/lecons/<n>/<bloc>/<ecran>/` pour le premier état, et
 * `…/<ecran>/etat-<k>/` ensuite. Le premier état n'a donc pas de suffixe : un
 * lien vers un écran mène à son début, ce qui est le comportement attendu quand
 * on partage une adresse.
 */
export function aplatir(lecon: Lecon): Arret[] {
  const arrets: Arret[] = [];

  lecon.blocs.forEach((bloc, iBloc) => {
    bloc.ecrans.forEach((ecran, iEcran) => {
      const totalEtats = nombreEtats(ecran);
      for (let etat = 0; etat < totalEtats; etat += 1) {
        const base = `/lecons/${lecon.numero}/${bloc.id}/${ecran.id}`;
        arrets.push({
          index: arrets.length,
          bloc,
          numeroBloc: iBloc + 1,
          ecran,
          numeroEcran: iEcran + 1,
          etat,
          totalEtats,
          chemin: etat === 0 ? base : `${base}/etat-${etat + 1}`,
          premierDeLEcran: etat === 0,
        });
      }
    });
  });

  return arrets;
}

/**
 * Le code QR n'apparaît que sur les ouvertures de bloc, les écrans
 * « appareil en main » et les écrans repère d'activité (décision D5).
 *
 * Ce n'est pas un choix technique : pendant un panneau de concept, l'animateur
 * veut des yeux levés, et trente personnes sur leur téléphone est le mode de
 * défaillance. Pendant un « appareil en main » ou une activité en équipe, les
 * têtes sont tournées vers les appareils ou les tablées et l'écran de
 * consignes est derrière elles — c'est exactement là que les consignes
 * doivent être dans leurs mains.
 */
export function porteLeCodeQr(ecran: Ecran): boolean {
  if (ecran.genre === 'appareil-en-main') return true;
  return ecran.genre === 'repere' && (ecran.variante === 'ouverture' || ecran.variante === 'activite');
}

/**
 * Les régions visibles d'un panneau à un état donné : la base, plus tous les
 * états jusqu'à celui-ci inclus. Rien n'est jamais retiré — au dernier état, le
 * panneau est l'explication complète du bloc et son résumé écrit.
 */
export interface Ajout {
  /** Prose ou tableau ajouté par l'état. */
  corps?: string;
  /** Encadré mis en évidence — la réponse, la règle, l'avertissement. */
  encadre?: string;
  ton: string;
  /** Vrai pour ce que l'état courant vient tout juste de faire paraître. */
  revele: boolean;
}

export function regionsCumulees(ecran: Extract<Ecran, { genre: 'panneau' }>, etat: number) {
  const cumule = {
    claim: ecran.claim,
    /** Le contenu de base, présent dès le premier état. */
    corps: [] as string[],
    schema: ecran.schema,
    aparte: [] as string[],
    /**
     * Ce que les états ont ajouté, dans l'ordre d'apparition.
     *
     * Séparé du corps de base parce que c'est aussi une distinction de mise en
     * page : sur un panneau cumulatif, ce qui vient d'apparaître occupe sa
     * propre colonne. Le lecteur voit du même coup ce qui était là au départ et
     * ce que la discussion a fait émerger.
     */
    ajouts: [] as Ajout[],
  };
  if (ecran.corps) cumule.corps.push(ecran.corps);
  if (ecran.aparte) cumule.aparte.push(ecran.aparte);

  for (const [i, e] of (ecran.etats ?? []).entries()) {
    if (i > etat) break;
    if (e.claim) cumule.claim = e.claim;
    if (e.schema) cumule.schema = e.schema;
    if (e.aparte) cumule.aparte.push(e.aparte);
    if (e.corps || e.encadre) {
      cumule.ajouts.push({
        corps: e.corps,
        encadre: e.encadre,
        ton: e.ton,
        revele: i === etat && i > 0,
      });
    }
  }

  return cumule;
}
