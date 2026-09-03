// @ts-check
import { defineConfig } from 'astro/config';
import { remarkTypo } from './src/lib/remark-typo.mjs';
import { rehypeTableaux } from './src/lib/rehype-tableaux.mjs';
import { verifierContenu } from './src/integrations/verifier-contenu.mjs';

/**
 * Le site est servi depuis l'URL de projet GitHub Pages par défaut :
 * https://<compte>.github.io/formation-premier-clicks-2026/
 *
 * `base` porte donc le nom du dépôt. Tout lien interne doit passer par
 * l'utilitaire `lien()` (src/lib/lien.ts) plutôt que par un chemin absolu écrit
 * à la main, sinon il fonctionne en local et casse en production.
 *
 * En intégration continue, SITE_URL et BASE_PATH sont fournis par le workflow,
 * ce qui évite d'avoir à retoucher ce fichier si le dépôt est renommé ou
 * transféré. Les valeurs par défaut ci-dessous servent au développement et à la
 * copie locale.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://exemple.github.io',
  base: process.env.BASE_PATH ?? '/formation-premier-clicks-2026',
  trailingSlash: 'always',
  markdown: {
    // Les conventions typographiques françaises sont appliquées au rendu, à
    // tout le contenu Markdown du site, sans que les fichiers de contenu aient
    // à porter des espaces insécables invisibles.
    remarkPlugins: [remarkTypo],
    rehypePlugins: [rehypeTableaux],
    smartypants: false,
  },
  build: {
    format: 'directory',
    assets: 'ressources',
  },
  integrations: [verifierContenu()],
  devToolbar: { enabled: false },
});
