# Novara Marketplace

Novara is a dependency-free premium games and apps marketplace landing page. It uses HTML, CSS, and vanilla JavaScript only.

## Run locally

Serve this folder through any static HTTP server. Service workers and the installable PWA experience require HTTPS in production (or `localhost` while developing).

For example, use your editor's static-server extension, or any simple local HTTP server. Open the served `index.html` URL in a modern browser.

## Project files

- `index.html` — page structure, SEO metadata, and content sections.
- `styles.css` — responsive visual system and all component styles.
- `script.js` — catalog data, filtering, modals, gallery, and interactions.
- `manifest.json` — installable PWA metadata.
- `sw.js` — offline cache and navigation fallback.
- `offline.html` — offline screen.
- `icon.svg` — favicon and PWA icon.

## Customize site information

Update the production URL in `index.html` for the canonical, Open Graph, and Twitter metadata. Replace `https://novara.example/` with the deployed domain.

Update the `brand` content in `index.html` and the `:root` variables at the top of `styles.css` to change colors, typography tokens, and visual emphasis.

## Customize catalog data

All catalog entries are stored in the `apps` array in `script.js`. Each object supports these fields:

```js
{
  name: 'App name',
  description: 'Short card description',
  rating: '4.9',
  downloads: '2.4M',
  version: '1.0.0',
  size: '120 MB',
  updated: 'Today',
  category: 'Productivity',
  icon: 'A',
  colors: '#123456,#789abc',
  badges: ['Verified', 'Premium'],
  groups: ['Featured Apps', 'Apps']
}
```

Available badge names are `Verified`, `Premium`, `MOD`, `New`, `Trending`, and `Editor’s Choice`. Catalog sections are controlled by the `sections` array. App detail copy, screenshots, developer data, reviews, and related items are generated from this same normalized data model.

## Connect the install action

Every install control has exactly this attribute:

```html
onclick="_kb()"
```

There is one integration point in `script.js`:

```js
const SITE_CONFIG = { installHandler: () => {} };
```

Replace the empty function body with the approved CPA, analytics, or installation callback. Do not change each individual button.

## PWA and caching

`sw.js` caches the application shell and sends navigation requests to `offline.html` if the connection is unavailable. Increment the `CACHE` version in `sw.js` whenever you deploy a breaking asset change so returning users receive the updated shell.

The PWA requires production HTTPS. Keep `manifest.json`, `sw.js`, `offline.html`, and `icon.svg` at the site root unless you also update their references in `index.html` and `sw.js`.

## Accessibility and performance

The page includes keyboard modal controls, visible focus states, a skip link, lazy screenshot thumbnails, reduced-motion support, responsive layouts, and no framework runtime. Keep decorative images empty of meaningful text and always provide meaningful `alt` text for any real screenshots or product images added later.
