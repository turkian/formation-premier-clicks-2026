/**
 * Vérification du modèle de profondeur de champ contre les chiffres des leçons.
 *
 * Ces chiffres sont projetés devant trente personnes et servent d'appui à tout
 * le bloc le plus difficile de la séance 1. Ils sont donc contrôlés à chaque
 * construction, pas une fois à l'écriture.
 *
 * Usage : node scripts/verifier-modele.mjs
 */
import {
  profondeurDeChamp,
  format,
  bande,
  hyperfocale,
  ouvertureMaxKit,
  diametre,
  cercleDeConfusion,
} from '../src/lib/profondeur-de-champ.ts';

const echecs = [];
let passes = 0;

function proche(obtenu, attendu, tolerance, quoi) {
  const ecart = Math.abs(obtenu - attendu) / attendu;
  if (ecart <= tolerance) {
    passes += 1;
    console.log(`  ✓ ${quoi} — ${arrondi(obtenu)} (attendu ≈ ${arrondi(attendu)})`);
  } else {
    echecs.push(`${quoi} — obtenu ${arrondi(obtenu)}, attendu ≈ ${arrondi(attendu)}`);
    console.log(`  ✗ ${quoi} — ${arrondi(obtenu)} (attendu ≈ ${arrondi(attendu)})`);
  }
}

function egal(obtenu, attendu, quoi) {
  if (obtenu === attendu) {
    passes += 1;
    console.log(`  ✓ ${quoi} — « ${obtenu} »`);
  } else {
    echecs.push(`${quoi} — obtenu « ${obtenu} », attendu « ${attendu} »`);
    console.log(`  ✗ ${quoi} — « ${obtenu} », attendu « ${attendu} »`);
  }
}

const apsc = format('aps-c');
const pleinFormat = format('plein-format');

console.log('\nZoom de kit à 50 mm, f/5.6, APS-C — les trois distances de la séance 1');
for (const [distance, attendu] of [[1, 0.08], [3, 0.77], [10, 10.3]]) {
  const r = profondeurDeChamp(distance, 50, 5.6, apsc);
  proche(r.epaisseur, attendu, 0.2, `sujet à ${distance} m`);
}

console.log("\nLe rapport que la séance met en avant : de 3 m à 1 m, la zone est divisée par dix");
{
  const a = profondeurDeChamp(3, 50, 5.6, apsc).epaisseur;
  const b = profondeurDeChamp(1, 50, 5.6, apsc).epaisseur;
  proche(a / b, 10, 0.25, 'rapport 3 m / 1 m');
}

console.log('\nLe 50 mm f/1.8 à 1 m — la correction de contenu (décision D6)');
{
  const surApsc = profondeurDeChamp(1, 50, 1.8, apsc);
  proche(surApsc.epaisseur, 0.026, 0.2, 'sur APS-C — le chiffre à projeter');
  const surPleinFormat = profondeurDeChamp(1, 50, 1.8, pleinFormat);
  proche(surPleinFormat.epaisseur, 0.04, 0.25, 'sur plein format — le chiffre des scripts');
  const rapport = profondeurDeChamp(1, 50, 5.6, apsc).epaisseur / surApsc.epaisseur;
  proche(rapport, 3, 0.25, 'de f/5.6 à f/1.8 sur APS-C : environ ÷3, non ÷10');
}

console.log('\nLes bandes qualitatives');
egal(bande(0.04, false).nom, 'très mince', '4 cm');
egal(bande(0.008, false).nom, 'extrêmement mince', '8 mm');
egal(bande(0.3, false).nom, 'mince', '30 cm');
egal(bande(1.2, false).nom, 'moyenne', '1,2 m');
egal(bande(5, false).nom, 'épaisse', '5 m');
egal(bande(Infinity, true).nom, 'tout est net', 'au-delà de l’hyperfocale');

console.log('\nHyperfocale et net-jusqu’à-l’infini');
{
  // H = f² / (N·c) + f, avec c = 28,3 mm / 1500 = 0,0189 mm sur APS-C.
  // Sur plein format le même réglage donne ≈ 15,5 m : l'écart entre les deux
  // est exactement la raison pour laquelle le sélecteur de format est porteur.
  const H = hyperfocale(50, 5.6, apsc);
  proche(H / 1000, 23.6, 0.05, 'hyperfocale du 50 mm f/5.6 sur APS-C');
  proche(hyperfocale(50, 5.6, pleinFormat) / 1000, 15.5, 0.05, 'la même, sur plein format');
  const auDela = profondeurDeChamp(H / 1000 + 1, 50, 5.6, apsc);
  egal(auDela.jusquALInfini, true, 'au-delà de l’hyperfocale, tout est net jusqu’à l’infini');
  egal(auDela.lointaine, Infinity, 'la limite lointaine est infinie');
  const enDeca = profondeurDeChamp(2, 50, 5.6, apsc);
  egal(enDeca.jusquALInfini, false, 'en deçà, la zone reste finie');
}

console.log('\nLe format du capteur change la réponse');
{
  const parFormat = ['plein-format', 'aps-c', 'quatre-tiers', 'un-pouce', 'cellulaire'].map(
    (id) => profondeurDeChamp(3, 50, 5.6, format(id)).epaisseur,
  );
  const croissant = parFormat.every((v, i) => i === 0 || v < parFormat[i - 1]);
  egal(croissant, true, 'à réglages égaux, un plus petit capteur donne une zone plus mince');
  proche(cercleDeConfusion(pleinFormat), 0.029, 0.05, 'cercle de confusion du plein format');
}

console.log('\nLe zoom de kit 18-55 mm f/3.5-5.6');
proche(ouvertureMaxKit(18), 3.5, 0.01, 'à 18 mm');
proche(ouvertureMaxKit(55), 5.6, 0.01, 'à 55 mm');
egal(ouvertureMaxKit(35) > 3.5 && ouvertureMaxKit(35) < 5.6, true, 'à 35 mm, entre les deux');

console.log('\nLe f/ est une division — les diamètres de la séance 1');
proche(diametre(50, 2), 25, 0.001, '50 mm à f/2');
proche(diametre(50, 4), 12.5, 0.001, '50 mm à f/4');
proche(diametre(50, 16), 3.125, 0.001, '50 mm à f/16');
proche(diametre(50, 5.6), 8.93, 0.01, 'le kit à 50 mm, f/5.6');
proche(diametre(24, 2.8), 8.57, 0.01, '24 mm à f/2.8');
proche(diametre(200, 2.8), 71.4, 0.01, '200 mm à f/2.8');
proche(diametre(400, 2.8), 142.9, 0.01, '400 mm à f/2.8 — le téléobjectif blanc');

function arrondi(v) {
  if (!Number.isFinite(v)) return '∞';
  return v.toLocaleString('fr-CA', { maximumFractionDigits: 4 });
}

console.log(`\n${passes} vérification(s) passée(s).`);
if (echecs.length > 0) {
  console.error(`\n${echecs.length} échec(s) :`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('Le modèle reproduit les chiffres des leçons.');
