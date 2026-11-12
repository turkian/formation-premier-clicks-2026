/**
 * Loupe liée, partagée par l'écran de démonstration et le panneau.
 *
 * Tout conteneur qui porte `data-loupe` (une série comparative, un rang
 * d'images libres, les colonnes d'un panneau qui la déclarent) reçoit la loupe :
 * le module se démarre seul, une fois, à son import.
 *
 * Maj maintenue, le pointeur sur une photographie de la série : chaque
 * photographie de la série montre, dans une loupe, le même point de la scène
 * au même grossissement. La salle compare le grain côte à côte, sans qu'on
 * déplace la souris d'une photo à l'autre.
 *
 * Le point est calculé une fois, en coordonnées de l'image (u, v ∈ [0, 1]) :
 * on défait le cadrage de repos, puis les bandes de `object-fit: contain`.
 * Chaque loupe refait le chemin inverse dans son propre cadre.
 *
 * Un rang d'images libres (`loupeImages`) emprunte le même chemin, mais en
 * mode `seule` : ses images ne montrent pas la même scène, et seule celle
 * qu'on pointe s'agrandit.
 */
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  for (const serie of document.querySelectorAll<HTMLElement>('[data-loupe]')) {
    demarrer(serie);
  }
}

interface Geometrie {
  /** Taille de l'image entière telle que dessinée par `contain`, et son décalage. */
  dw: number; dh: number; ox: number; oy: number;
  /** Cadrage de repos : origine en pixels du cadre, et grossissement. */
  cx: number; cy: number; cz: number;
  largeur: number; hauteur: number;
}

function geometrie(marco: HTMLElement, img: HTMLImageElement): Geometrie | null {
  const { naturalWidth: nw, naturalHeight: nh } = img;
  const largeur = marco.clientWidth;
  const hauteur = marco.clientHeight;
  if (!nw || !nh || !largeur || !hauteur) return null;
  const s = Math.min(largeur / nw, hauteur / nh);
  const dw = nw * s;
  const dh = nh * s;
  const cz = Number(marco.dataset.cadrageZoom ?? 1);
  return {
    dw, dh,
    ox: (largeur - dw) / 2,
    oy: (hauteur - dh) / 2,
    cx: (Number(marco.dataset.cadrageX ?? 50) / 100) * largeur,
    cy: (Number(marco.dataset.cadrageY ?? 50) / 100) * hauteur,
    cz,
    largeur, hauteur,
  };
}

function demarrer(serie: HTMLElement) {
  const zoom = Number(serie.dataset.loupe);
  // Images libres : des scènes différentes, aucun « même point » à comparer.
  // Seule l'image pointée montre sa loupe.
  const seule = serie.dataset.loupeMode === 'seule';
  const cadres = [...serie.querySelectorAll<HTMLElement>('.marco')];

  let majTenue = false;
  let survole: { marco: HTMLElement; x: number; y: number } | null = null;

  function cacher() {
    for (const marco of cadres) marco.removeAttribute('data-loupe-active');
  }

  function rafraichir() {
    if (!majTenue || !survole) return cacher();

    const { marco, x, y } = survole;
    const img = marco.querySelector('img');
    const g = img && geometrie(marco, img);
    if (!g) return cacher();

    // Écran → image : défaire le cadrage de repos, puis les bandes.
    const px = g.cx + (x - g.cx) / g.cz;
    const py = g.cy + (y - g.cy) / g.cz;
    const u = (px - g.ox) / g.dw;
    const v = (py - g.oy) / g.dh;
    if (u < 0 || u > 1 || v < 0 || v > 1) return cacher();

    if (seule) {
      for (const autre of cadres) if (autre !== marco) autre.removeAttribute('data-loupe-active');
      placer(marco, u, v);
    } else {
      for (const autre of cadres) placer(autre, u, v);
    }
  }

  function placer(marco: HTMLElement, u: number, v: number) {
    const img = marco.querySelector('img');
    const fenetre = marco.querySelector<HTMLElement>('.fenetre-loupe');
    const loupe = marco.querySelector<HTMLElement>('.loupe');
    const g = img && geometrie(marco, img);
    if (!g || !fenetre || !loupe) return;

    // Image → écran, dans ce cadre-ci.
    const versEcranX = (x: number) => g.cx + (x - g.cx) * g.cz;
    const versEcranY = (y: number) => g.cy + (y - g.cy) * g.cz;

    // La fenêtre : la partie de la photographie réellement visible, pour que
    // la loupe ne pende pas dans les bandes de `contain`.
    const gauche = Math.max(0, versEcranX(g.ox));
    const haut = Math.max(0, versEcranY(g.oy));
    const droite = Math.min(g.largeur, versEcranX(g.ox + g.dw));
    const bas = Math.min(g.hauteur, versEcranY(g.oy + g.dh));
    fenetre.style.left = `${gauche}px`;
    fenetre.style.top = `${haut}px`;
    fenetre.style.width = `${droite - gauche}px`;
    fenetre.style.height = `${bas - haut}px`;

    const x = versEcranX(g.ox + u * g.dw) - gauche;
    const y = versEcranY(g.oy + v * g.dh) - haut;
    const diametre = 0.6 * Math.min(droite - gauche, bas - haut);
    const largeurFond = g.dw * zoom;
    const hauteurFond = g.dh * zoom;

    loupe.style.width = loupe.style.height = `${diametre}px`;
    loupe.style.left = `${x - diametre / 2}px`;
    loupe.style.top = `${y - diametre / 2}px`;
    loupe.style.backgroundSize = `${largeurFond}px ${hauteurFond}px`;
    loupe.style.backgroundPosition =
      `${diametre / 2 - u * largeurFond}px ${diametre / 2 - v * hauteurFond}px`;
    marco.setAttribute('data-loupe-active', '');
  }

  serie.addEventListener('pointermove', (evenement) => {
    const marco = (evenement.target as HTMLElement).closest<HTMLElement>('.marco');
    if (!marco || !cadres.includes(marco)) {
      survole = null;
    } else {
      const boite = marco.getBoundingClientRect();
      survole = { marco, x: evenement.clientX - boite.left, y: evenement.clientY - boite.top };
    }
    majTenue = evenement.shiftKey;
    rafraichir();
  });
  serie.addEventListener('pointerleave', () => {
    survole = null;
    rafraichir();
  });

  document.addEventListener('keydown', (evenement) => {
    if (evenement.key !== 'Shift') return;
    majTenue = true;
    rafraichir();
  });
  document.addEventListener('keyup', (evenement) => {
    if (evenement.key !== 'Shift') return;
    majTenue = false;
    rafraichir();
  });
  // Maj relâchée pendant qu'une autre fenêtre avait le clavier : la loupe ne
  // doit pas rester figée à l'écran.
  window.addEventListener('blur', () => {
    majTenue = false;
    rafraichir();
  });
}

// Un module, pas un script global : ses fonctions ne fuient pas.
export {};
