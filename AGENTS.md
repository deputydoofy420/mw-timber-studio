# Matt's Wood — Project Notes

Handmade **cutting board** shop site (NOT a lumber company). Plaid/lumberjack *aesthetic* theme, but strictly **no lumberjacks and no people imagery** anywhere — only plaid patterns, wood grain, trees, tools-as-decor.

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

## Design system
- Colors: plaid red `#8e1c22`, dark `#23100f`, ink `#171310`, cream `#f2e8d5`, tan `#c89f65`, tan-bright `#e0b87a`
- Buffalo plaid = layered `repeating-linear-gradient`s (see `.hero-plaid`); tile size var `--tile: 68px`; animate via `plaidDrift` keyframes
- Fonts: Bebas Neue (headings), Inter (body) via Google Fonts with solid fallbacks
- Icons: inline SVG, stroke-based (`stroke: tan-bright`), each needs a `<title>` (linter requires it)

## Features implemented
- Preloader (plaid bars), sawdust particle canvas (+ click bursts), animated plaid hero + letter-by-letter title
- Parallax hero w/ layered treelines, plaid rotates on scroll, marquee ticker, scroll reveals (IntersectionObserver)
- 3D tilt product cards w/ cursor glow + grain sweep, self-drawing tree-rings SVG, spinning saw blade
- Count-up stats, clip-path species swatch wall, mobile nav, reduced-motion support
- Letter-staggered section titles, scroll progress ruler, magnetic CTAs, cross-document view transitions (JS fade fallback)
- **Cart**: localStorage (`mattswood-cart-v1`), drawer UI injected via JS (no per-page markup), qty/remove, mailto checkout, toast + fly-to-cart chip animation
- Product pages: CSS-art board visuals (`.board-*` variants), size pills w/ live price flip, qty stepper, live engraving preview on custom-engraved.html

## Products (cutting boards only) — ids in script.js `PRODUCTS`
1. End-Grain Classics — `end-grain` — from $85 → end-grain.html
2. Edge-Grain Everyday — `edge-grain` — from $45 → edge-grain.html
3. Serving & Cheese Boards — `serving` — from $55 → serving-boards.html
4. Custom Engraved — `engraved` — from $65 → custom-engraved.html

## Ideas / not done yet
- Real photos of boards (currently all CSS/SVG art)
- Real checkout backend (currently mailto order summary)
- Testimonials section
