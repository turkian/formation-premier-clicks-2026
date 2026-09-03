/**
 * Rendu Markdown pour le contenu structuré.
 *
 * Le contenu des leçons vit dans des fichiers YAML — un panneau a quatre régions
 * nommées, un panneau cumulatif a des états ordonnés, structures qu'un fichier
 * Markdown ne porte pas. Les régions sont écrites en Markdown à l'intérieur du
 * YAML, et rendues ici.
 *
 * On réutilise le processeur d'Astro plutôt qu'une seconde bibliothèque, afin
 * que ce contenu traverse exactement la même chaîne que les fichiers `.md` —
 * greffon typographique français compris.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { remarkTypo } from './remark-typo.mjs';
import { rehypeTableaux } from './rehype-tableaux.mjs';

const processeur = await createMarkdownProcessor({
  remarkPlugins: [remarkTypo],
  rehypePlugins: [rehypeTableaux],
  smartypants: false,
  gfm: true,
});

/** Rend un bloc Markdown en HTML. */
export async function md(source: string | undefined | null): Promise<string> {
  if (!source) return '';
  const { code } = await processeur.render(source);
  return code;
}

/**
 * Rend un fragment en ligne : le résultat n'est pas enveloppé dans un `<p>`.
 * Sert aux libellés, aux énoncés et aux cellules de tableau.
 */
export async function mdEnLigne(source: string | undefined | null): Promise<string> {
  const html = await md(source);
  const seul = html.trim();
  const m = seul.match(/^<p>([\s\S]*)<\/p>$/);
  return m && !m[1]!.includes('<p>') ? m[1]! : seul;
}
