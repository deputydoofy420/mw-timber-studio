# MW Timber Studio — Project Notes

Handmade **cutting board** shop site (NOT a lumber company). Formerly "Matt's Wood". Plaid/lumberjack *aesthetic* theme, but strictly **no lumberjacks and no people imagery** anywhere — only plaid patterns, wood grain, trees, tools-as-decor.

## Stack
Plain static site — no build step, no dependencies.
- `index.html` — home page
- `end-grain.html`, `edge-grain.html`, `serving-boards.html`, `custom-engraved.html` — product pages
- `styles.css` — all styling/animations
- `script.js` — interactions + cart (all guarded by element existence, safe on every page)

## Run locally
```bash
python3 -m http.server 8420 --directory ~/matts-wood
```
Live at http://localhost:8420 (server may already be running from a previous session).

## Production
- Live: **https://deputydoofy420.github.io/mw-timber-studio/** (GitHub Pages, public repo `deputydoofy420/mw-timber-studio`, deploys from `main` automatically on push)
- Deploy = `git push` (remote `origin` already configured; auth via gh/GitHub credentials)

## Design system
- Colors: plaid red `#8e1c22`, dark `#23100f`, ink `#171310`, cream `#f2e8d5`, tan `#c89f65`, tan-bright `#e0b87a`
- Buffalo plaid = layered `repeating-linear-gradient`s (see `.hero-plaid`); tile size var `--tile: 68px`; animate via `plaidDrift` keyframes
- Fonts: **Playfair Display** (headings, italic gold-gradient accents) + Inter (body, letterspaced uppercase kickers) via Google Fonts
- High-end/artisanal tone — flashy but NOT futuristic; no people/lumberjack imagery
- Icons: inline SVG, stroke-based (`stroke: tan-bright`), each needs a `<title>` (linter requires it)

## Features implemented
- Preloader (plaid bars), sawdust particle canvas (+ click bursts), animated plaid hero + letter-by-letter title
- Parallax hero w/ layered treelines, plaid rotates on scroll, marquee ticker, scroll reveals (IntersectionObserver)
- 3D tilt product cards w/ real photography + grain sweep, self-drawing tree-rings SVG, spinning saw blade
- Count-up stats, clip-path species swatch wall, mobile nav, reduced-motion support
- Letter-staggered section titles, scroll progress ruler, magnetic CTAs, cross-document view transitions (JS fade fallback)
- **Cart**: localStorage (`mw-timber-cart-v1`), drawer UI injected via JS (no per-page markup), qty/remove, mailto checkout, toast + fly-to-cart chip animation
- Product pages: real product photos in `img/` (via ImageMagick, 900px tall, ~150KB each), size pills w/ live price flip, qty stepper, live engraving preview on custom-engraved.html
- Index cards feature real product photography (no more SVG icons)

## Products (cutting boards only) — ids in script.js `PRODUCTS`; nothing priced under $75
1. End-Grain Classics — `end-grain` — from $140 → end-grain.html
2. Edge-Grain Everyday — `edge-grain` — from $75 → edge-grain.html
3. Serving & Cheese Boards — `serving` — from $95 → serving-boards.html
4. Custom Engraved — `engraved` — from $115 → custom-engraved.html

## Photos
- `img/end-grain.jpg` — checkerboard board in oak and maple
- `img/edge-grain.jpg` — fine-striped edge-grain (walnut/maple)
- `img/serving.jpg` — carving shot (roast on board)
- `img/workshop.jpg` — three boards on bench
- `img/kitchen.jpg` — board on kitchen counter
- All processed to 900px height, JPEG q82, ~150KB each
- Engraved page keeps its interactive CSS monogram preview (the configurator)

## Ideas / not done yet
- Real photos of boards (currently all CSS/SVG art)
- Real checkout backend (currently mailto order summary)
- Testimonials section
