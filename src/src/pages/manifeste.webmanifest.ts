/**
 * Le manifeste est généré plutôt que statique : `start_url` et l'icône doivent
 * porter le chemin de base du dépôt, qu'un fichier de `public/` ne connaît pas.
 */
import type { APIRoute } from 'astro';
import { asset, lien } from '../lib/lien';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: 'Premiers clics — formation photo',
        short_name: 'Premiers clics',
        description:
          'Le support des trois séances de la formation photo du club, et les références à garder après.',
        lang: 'fr-CA',
        dir: 'ltr',
        start_url: lien('/'),
        scope: lien('/'),
        display: 'standalone',
        background_color: '#15171b',
        theme_color: '#15171b',
        icons: [{ src: asset('/icone.svg'), sizes: 'any', type: 'image/svg+xml' }],
      },
      null,
      2,
    ),
    { headers: { 'content-type': 'application/manifest+json; charset=utf-8' } },
  );
