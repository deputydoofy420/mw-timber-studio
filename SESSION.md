# MW Timber Studio — Session Notes

## Project Summary
High-end handmade cutting board e-commerce website. Static HTML/CSS/JS, no build step. Deployed to GitHub Pages.

## Live URL
**https://deputydoofy420.github.io/mw-timber-studio/**

## Repo
`deputydoofy420/mw-timber-studio` — deploys from `main` on push.

## Brand
- **Name:** MW Timber Studio (rebranded from "Matt's Wood")
- **Voice:** First person ("I started making...")
- **Tone:** High-end/artisanal, flashy polished, NOT futuristic
- **Hero:** "TIMBER" (wood grain) / "STUDIO" (metallic gold shimmer)
- **Logo chip:** Plaid red + dark plaid pattern

## File Structure
```
~/matts-wood/
├── index.html              # Homepage
├── end-grain.html          # End-Grain Classics ($140+)
├── edge-grain.html         # Edge-Grain Everyday ($75+)
├── serving-boards.html     # Serving & Cheese Boards ($95+)
├── custom-engraved.html    # Custom Engraved ($115+) — MW monogram preview
├── styles.css              # All styling (~1200+ lines)
├── script.js               # All JS (~600+ lines, IIFE)
├── AGENTS.md               # Project notes
├── SESSION.md              # This file
├── serve.sh                # python3 -m http.server 8420
├── .nojekyll               # GitHub Pages config
└── img/
    ├── end-grain.jpg       # ~150KB, 900px tall
    ├── edge-grain.jpg
    ├── serving.jpg
    ├── workshop.jpg
    └── kitchen.jpg
```

## Design System
- **Colors:** plaid red `#8e1c22`, dark `#23100f`, ink `#171310`, cream `#f2e8d5`, tan `#c89f65`, tan-bright `#e0b87a`, gold `#d4a632`, gold-bright `#ffe680`
- **Fonts:** Playfair Display (headings, italic accents) + Inter (body, kickers) via Google Fonts
- **Plaid:** `repeating-linear-gradient` layers, `--tile: 68px`, `plaidDrift` keyframes
- **Full-page plaid:** Body has `background-attachment: fixed` buffalo plaid, sections at `rgba(23,19,16,0.88)` semi-transparent

## Content Rules
- Cutting boards ONLY, nothing under $75
- NO cedar, NO poplar species
- NEVER mention sanding/grit — care = oil + board-butter buffing
- NO lumberjacks/people imagery — only plaid, wood grain, trees, tools
- All SVG `<title>` elements required (linter)
- All JS animations guarded by `prefers-reduced-motion`

## Products (script.js PRODUCTS)
1. `end-grain` — End-Grain Classics, from $140
2. `edge-grain` — Edge-Grain Everyday, from $75
3. `serving` — Serving & Cheese Boards, from $95
4. `engraved` — Custom Engraved, from $115

## Key Features
- Preloader (plaid bars), sawdust particle canvas, animated hero
- Letter-by-letter TIMBER/STUDIO title with wood grain + metallic gold
- Parallax treelines, marquee ticker, scroll reveals
- 3D tilt product cards with real photography + grain sweep
- Self-drawing tree-rings SVG, spinning saw blade
- Count-up stats, species swatch wall, mobile nav
- Cart: localStorage `mw-timber-cart-v1`, drawer UI via JS, mailto checkout
- Product pages: real photos, size pills, qty stepper, live engraving preview
- Metallic gold site-wide: gradient text, gold buttons/borders/SVGs

## Gold System
- `--gold: #d4a632`, `--gold-gradient: linear-gradient(135deg, ...)` 15-stop metallic
- `metalShine` keyframe: `background-position` sweep, 3.5s
- Applied to: kicker, prices, stats, section titles em, cart, toast, buttons, borders, SVGs
- `.stat .num` has its own gold rule (higher specificity than `.num`)

## Desktop Bug Fixes Applied
1. TIMBER `line-1` class was missing from HTML → added
2. Stat numbers gold gradient lost to `.stat .num` specificity → fixed
3. Footer had no max-width on wide screens → added `max-width: 1120px`
4. Product pages had no background → added semi-transparent bg
5. Product hero grid unbalanced → changed to `1fr 1fr`
6. Duplicate `:root` blocks → merged
7. TIMBER wood grain too dark → lightened to honey/maple tones

## Run Locally
```bash
python3 -m http.server 8420 --directory ~/matts-wood
```
Live at http://localhost:8420

## Git
- Remote: `https://github.com/deputydoofy420/mw-timber-studio.git`
- Auth: `gh auth` (keyring)
- Deploy: `git push` (auto-deploys from main)
