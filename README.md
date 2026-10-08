https://fadhilsaheer.me

> built with Astro, Tailwind & existential crises

## Production performance

- `public/_headers` gives public HTML a 60-second browser cache lifetime so Astro's viewport prefetch can be reused during navigation. An open browser can show the previous deployment for up to one minute. Netlify must serve these headers, and upstream Cloudflare rules must not override them.
- Styles are inlined to avoid a route-specific CSS request before the page swap. DM Sans is self-hosted and preloaded; its license is in `src/assets/fonts/OFL.txt`.
- `node scripts/optimize-logos.mjs` regenerates the small raster logos from retained PNG originals. Vector logos render inline through `Logo.astro`.
- `node scripts/generate-favicon.mjs` regenerates the 32px favicon, Apple icon, and small WebP animation sprite.

Validate with `npm run check` and `npm run build`. After deploying, check the HTML cache headers and confirm prefetched route requests transfer zero bytes while fresh. Astro's preview server does not apply Netlify's `_headers` file.
