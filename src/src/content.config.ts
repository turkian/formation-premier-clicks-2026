/**
 * Modèle d'écriture du contenu.
 *
 * Trois collections :
 *   — `lecons`   : les trois leçons, en blocs et en écrans (YAML)
 *   — `marques`  : les huit feuilles du lexique (YAML)
 *   — `fiches`   : les fiches de référence imprimables (Markdown)
 *
 * Les leçons sont en YAML plutôt qu'en Markdown parce qu'un panneau de concept
 * a quatre régions nommées et, parfois, des états ordonnés : une structure que
 * l'entête d'un fichier Markdown ne porte pas honnêtement. Le texte de chaque
 * région est écrit en Markdown à l'intérieur du YAML et rendu par `lib/md.ts`.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ──────────────────────────────────────────────────────────────────────────
   Médias de démonstration
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Une photographie de démonstration à produire.
 *
 * `fichier` nomme l'image attendue dans `public/demos/`. Tant qu'elle est
 * absente, l'emplacement affiche sa propre `specification` — jamais une image
 * brisée. `priorite` alimente la liste de prises de vue.
 */
const emplacementDemo = z.object({
  id: z.string(),
  /** La consigne de prise de vue, telle qu'affichée quand l'image manque. */
  specification: z.string(),
  fichier: z.string().optional(),
  priorite: z.enum(['essentiel', 'utile', 'complement']).default('utile'),
  /** Texte alternatif de l'image, une fois qu'elle existe. */
  alt: z.string().optional(),
  /**
   * Réglages de la prise de vue, servant à la vérification de construction :
   * dans une série comparative, une seule de ces clés a le droit de varier.
   */
  reglages: z.record(z.string()).default({}),
  /** Ce que vaut la variable déclarée de la série, pour cette image. */
  valeur: z.string().optional(),
});

/**
 * Une série comparative : plusieurs images qui ne diffèrent que par **une**
 * variable, nommée en légende. Une série qui en déclare plus d'une est rejetée
 * à la construction (voir `scripts/check-screens.mjs`).
 */
const serieComparative = z.object({
  /** La seule chose qui change d'une image à l'autre. */
  variable: z.string(),
  /** Les réglages identiques d'une image à l'autre, énoncés sous la série. */
  constantes: z.record(z.string()).default({}),
  images: z.array(emplacementDemo).min(2),
  legende: z.string().optional(),
});

/* ──────────────────────────────────────────────────────────────────────────
   Écrans
   ────────────────────────────────────────────────────────────────────────── */

/** Un schéma dessiné : un composant SVG, résolu par nom. */
const schemaDessine = z.object({
  composant: z.string(),
  props: z.record(z.any()).default({}),
  /** Légende sous le schéma, dans le plus petit palier. */
  legende: z.string().optional(),
});

/**
 * Les quatre régions nommées d'un panneau de concept (décision D4).
 *
 *   claim  — l'énoncé, une phrase complète, lisible du fond de la salle
 *   corps  — le développement structuré, lisible du milieu
 *   schema — le dessin, qui fait partie de l'explication
 *   aparte — le détail sans coût : rien de nécessaire pour suivre le bloc
 */
const regions = z.object({
  claim: z.string().optional(),
  corps: z.string().optional(),
  schema: schemaDessine.optional(),
  aparte: z.string().optional(),
});

/**
 * Un état d'un panneau cumulatif.
 *
 * Avancer d'un état **ajoute** ces régions à l'écran ; rien de ce qui est déjà
 * affiché n'est retiré ni remplacé. Au dernier état, le panneau est
 * l'explication complète du bloc et sert de résumé écrit (décision D3).
 */
const etatPanneau = regions.extend({
  /** Étiquette de l'état dans l'indicateur de progression. */
  etiquette: z.string().optional(),
  /** Encadré mis en évidence — la réponse, la règle, la phrase qui protège. */
  encadre: z.string().optional(),
  ton: z.enum(['neutre', 'reponse', 'regle', 'avertissement']).default('neutre'),
});

const baseEcran = z.object({
  /** Identifiant stable : il fait l'adresse de l'écran, il ne change pas. */
  id: z.string(),
  titre: z.string().optional(),
});

/** 1 · Panneau de concept — dense, autonome, tenu cinq à huit minutes. */
const ecranPanneau = baseEcran.extend({
  genre: z.literal('panneau'),
  claim: z.string(),
  corps: z.string().optional(),
  schema: schemaDessine.optional(),
  aparte: z.string().optional(),
  /**
   * Encadré mis en évidence sur un panneau statique — le pivot de l'argument,
   * distinct du corps ordinaire. Rendu après le corps, sans jamais rendre le
   * panneau cumulatif : contrairement aux états, il n'y a rien à avancer.
   */
  encadre: z.string().optional(),
  ton: z.enum(['neutre', 'reponse', 'regle', 'avertissement']).default('neutre'),
  /** Icône Iconify (ex. « lucide:triangle-alert ») affichée dans l'encadré. */
  icone: z.string().optional(),
  /** Texte statique rendu après l'encadré — la conclusion, hors de la boîte. */
  suite: z.string().optional(),
  /** États cumulatifs, dans l'ordre. Absent = panneau statique. */
  etats: z.array(etatPanneau).optional(),
});

/**
 * 2 · Démonstration — les photographies occupent l'écran, seules.
 *
 * Un écran peut porter plus d'une série : trois comparaisons courtes sur la
 * lumière se lisent mieux ensemble que sur trois écrans successifs. Chaque
 * série garde sa propre variable et sa propre légende — la règle d'une seule
 * variable porte sur la série, jamais sur l'écran.
 */
const ecranDemonstration = baseEcran.extend({
  genre: z.literal('demonstration'),
  claim: z.string().optional(),
  series: z.array(serieComparative).default([]),
  /** Images hors série comparative (une seule image, ou un ensemble libre). */
  images: z.array(emplacementDemo).optional(),
  aparte: z.string().optional(),
});

/** 3 · Interactif — un composant qui fonctionne sans aucune photographie. */
const ecranInteractif = baseEcran.extend({
  genre: z.literal('interactif'),
  claim: z.string().optional(),
  composant: z.string(),
  props: z.record(z.any()).default({}),
  aparte: z.string().optional(),
});

/** 4 · Repère — ouverture de bloc, pause, questions, transition, activité. */
const ecranRepere = baseEcran.extend({
  genre: z.literal('repere'),
  variante: z.enum(['ouverture', 'pause', 'questions', 'transition', 'cloture', 'activite']),
  claim: z.string(),
  corps: z.string().optional(),
  aparte: z.string().optional(),
});

/** 5 · Appareil en main — les gestes à poser, reconnaissable du fond. */
const ecranAppareil = baseEcran.extend({
  genre: z.literal('appareil-en-main'),
  claim: z.string(),
  /** Les gestes, dans l'ordre. */
  gestes: z.array(z.string()).min(1),
  /** L'équivalent pour qui photographie avec un cellulaire. */
  cellulaire: z.string().optional(),
  /** Ce qu'un reflex fait différemment, quand ça compte. */
  reflex: z.string().optional(),
  aparte: z.string().optional(),
});

const ecran = z.discriminatedUnion('genre', [
  ecranPanneau,
  ecranDemonstration,
  ecranInteractif,
  ecranRepere,
  ecranAppareil,
]);

/** Un bloc pédagogique : l'unité de la leçon (décision D2). */
const bloc = z.object({
  id: z.string(),
  titre: z.string(),
  /** Une phrase qui dit ce que le bloc règle. Affichée sur l'ouverture. */
  resume: z.string().optional(),
  ecrans: z.array(ecran).min(1),
});

const lecons = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/lecons' }),
  schema: z.object({
    numero: z.number().int().min(1).max(3),
    titre: z.string(),
    /** Le fil conducteur de la soirée, affiché à l'ouverture de la leçon. */
    filConducteur: z.string(),
    /** Ce que la soirée règle, en une phrase. */
    question: z.string().optional(),
    blocs: z.array(bloc).min(1),
  }),
});

/* ──────────────────────────────────────────────────────────────────────────
   Lexique
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Une entrée du lexique : le mot de la formation d'abord, le mot de l'appareil
 * ensuite. L'ordre n'est pas décoratif — c'est ce que le participant cherche.
 */
const entreeLexique = z.object({
  formation: z.string(),
  appareil: z.string(),
  /** Chemin de menu, quand le réglage n'est pas sur une commande physique. */
  chemin: z.string().optional(),
  note: z.string().optional(),
});

/**
 * Les sections du lexique sont numérotées et **toujours dans le même ordre**,
 * sur les huit marques : « regardez la section 2 de votre feuille » doit être
 * vrai pour tout le monde. L'ordre est imposé par la clé `numero`, pas par
 * l'ordre d'écriture du fichier.
 */
const sectionLexique = z.object({
  numero: z.number().int().min(1).max(4),
  entrees: z.array(entreeLexique).default([]),
  /**
   * Explication propre à la marque, quand ses commandes ne se rabattent pas sur
   * le modèle de la formation — le cas Fujifilm. Rendue avant les entrées.
   */
  exception: z.string().optional(),
  note: z.string().optional(),
});

const marques = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/marques' }),
  schema: z.object({
    nom: z.string(),
    /** Ordre d'affichage dans le sélecteur. */
    rang: z.number().int(),
    /** Ce que la marque appelle son propre système, quand c'est utile. */
    sousTitre: z.string().optional(),
    genre: z.enum(['appareil', 'cellulaire']).default('appareil'),
    /**
     * Le menu rapide de la marque — `Q`, `i`, `Fn`, `Q.MENU`… C'est le raccourci
     * qui évite les menus neuf fois sur dix, et il mérite d'être vu avant eux.
     */
    menuRapide: z.string().optional(),
    /** Extension des fichiers RAW de la marque : `.CR3`, `.NEF`, `.RAF`… */
    extensionRaw: z.string().optional(),
    sections: z.array(sectionLexique).length(4),
    /** Où chercher quand un réglage reste introuvable. */
    introuvable: z.array(z.string()).default([]),
  }),
});

/* ──────────────────────────────────────────────────────────────────────────
   Fiches de référence imprimables
   ────────────────────────────────────────────────────────────────────────── */

const fiches = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/fiches' }),
  schema: z.object({
    titre: z.string(),
    /** Une ligne sous le titre, sur la fiche comme dans l'index. */
    sousTitre: z.string().optional(),
    /** Rang dans l'index. Une nouvelle fiche s'insère sans toucher à l'index. */
    rang: z.number().int().default(100),
    /** Séance dont la fiche est issue, pour le classement de l'index. */
    seance: z.number().int().min(1).max(3).optional(),
    /** Mise en page de l'impression : une ou deux colonnes sur la page Letter. */
    colonnes: z.enum(['une', 'deux']).default('deux'),
    /**
     * Densité de l'impression. `serre` réduit le corps et l'interligne pour
     * les fiches dont le contenu est exigé en entier sur une page — la fiche
     * de diagnostic doit porter tous les symptômes, toutes les causes et
     * toutes les corrections, et c'est la mise en page qui cède, pas le
     * contenu.
     */
    densite: z.enum(['normale', 'serree']).default('normale'),
  }),
});

export const collections = { lecons, marques, fiches };
