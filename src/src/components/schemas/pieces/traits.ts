/**
 * Styles de trait partagés par les schémas de position d'éclairage.
 *
 * Le trait de lumière et la ligne de visée de l'appareil doivent rester
 * impossibles à confondre : l'un est plein et de la couleur d'accent, l'autre
 * est pointillé et neutre, avec une pointe de flèche vers le sujet.
 */
export const traitLumiere = {
  stroke: 'var(--accent)',
  'stroke-width': 2,
  'stroke-linecap': 'round',
} as const;

export const traitVisee = {
  stroke: 'var(--texte-3)',
  'stroke-width': 1.5,
  'stroke-dasharray': '4 3',
  'stroke-linecap': 'round',
} as const;

function tourner(cx: number, cy: number, x: number, y: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

/**
 * Chemin SVG d'une petite pointe de flèche dont la pointe est en (x, y),
 * orientée vers angleDeg (0° = pointe vers la droite, sens de rotation SVG).
 */
export function pointeVisee(x: number, y: number, angleDeg: number, taille = 7): string {
  const arriere1 = tourner(x, y, x - taille, y - taille * 0.6, angleDeg);
  const arriere2 = tourner(x, y, x - taille, y + taille * 0.6, angleDeg);
  return `M ${x} ${y} L ${arriere1.x.toFixed(1)} ${arriere1.y.toFixed(1)} L ${arriere2.x.toFixed(1)} ${arriere2.y.toFixed(1)} Z`;
}
