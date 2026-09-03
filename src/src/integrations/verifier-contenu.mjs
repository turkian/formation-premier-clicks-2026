/**
 * Intégration Astro : vérifie le contenu **avant** que la construction produise
 * quoi que ce soit.
 *
 * Une série comparative invalide ne doit pas atteindre la salle : elle serait
 * projetée devant trente personnes et ne démontrerait rien. La vérification
 * s'exécute donc au démarrage de la construction et l'interrompt, plutôt que
 * dans un composant, où une série jamais rendue passerait entre les mailles.
 */
import { readdir, readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { verifierSerie } from '../lib/verifier-series.ts';

const DOSSIER = new URL('../content/lecons/', import.meta.url);

export function verifierContenu() {
  return {
    name: 'verifier-contenu',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        const problemes = await rassemblerProblemes();
        if (problemes.length === 0) {
          logger.info('séries comparatives : aucune variable en trop');
          return;
        }
        for (const p of problemes) logger.error(`${p.ou} — ${p.message}`);
        throw new Error(
          `${problemes.length} problème(s) de contenu. La construction est interrompue.`,
        );
      },
    },
  };
}

async function rassemblerProblemes() {
  let fichiers = [];
  try {
    fichiers = (await readdir(DOSSIER)).filter((f) => f.endsWith('.yaml'));
  } catch {
    return [];
  }

  const problemes = [];
  for (const fichier of fichiers) {
    const lecon = parse(await readFile(new URL(fichier, DOSSIER), 'utf8'));
    for (const bloc of lecon?.blocs ?? []) {
      for (const ecran of bloc.ecrans ?? []) {
        for (const serie of ecran.series ?? []) {
          problemes.push(
            ...verifierSerie(serie, `leçon ${lecon.numero} · ${bloc.id} · ${ecran.id}`),
          );
        }
      }
    }
  }
  return problemes;
}
