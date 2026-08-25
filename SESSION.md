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
- **Logo:** Circular medallion photo (`img/logo.jpg`, 512x512) — engraved on dark walnut. Replaced the CSS plaid chip in nav + footer across all pages. Also displayed centered above TIMBER STUDIO in the hero section.

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
    ├── logo.jpg            # MW Timber Studio medallion (512x512, user-cropped)
    ├── studio.jpg          # Brand collage (1350x900) — logo, cards, boards
    ├── doofy.gif           # Site credit logo (Officer Doofy salute, 790x500)
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

## Session Log — Aug 25 2026

### Images added from ~/Downloads
- **IMG_2602.JPG** → `img/logo.jpg` (user's final crop: `~/Downloads/matts logo.jpg`, 1010x996, cropped to 996x996 square, resized to 512x512, JPEG q82)
- **IMG_2603.JPG** → `img/studio.jpg` (brand collage, resized to 900px height, JPEG q82)

### Changes made
1. **Nav + footer logo (all 5 pages):** Replaced CSS `.brand-chip` plaid square with `<img class="brand-logo" src="img/logo.jpg" alt="" width="26" height="26" />` (nav) and width/height 20 (footer). Circular, with gold border + shadow, same hover rotate/scale animation.
2. **Hero logo:** Added `<img class="hero-logo reveal" data-delay="150" src="img/logo.jpg" alt="" />` centered between the kicker text and the TIMBER/STUDIO h1. 120px on desktop, 90px on mobile (720px breakpoint).
3. **Brand collage:** Added to "Our Rings" section in `index.html` after the stats div, inside `.rings-copy`. Caption: "One mark, burned into everything that leaves the bench."
4. **CSS additions (styles.css):**
   - `.brand-logo` — 26px circle, gold border, shadow, hover transition
   - `.brand-logo-sm` / `.foot-brand .brand-logo` — 20px for footer
   - `.hero-logo` — 120px circle, gold border, subtle glow, centered with `margin: 0 auto`
   - `.brand-photo` + `.brand-photo img` + `.brand-photo figcaption` — collage styling in rings section (rounded, bordered, shadowed, caption in tan letterspaced uppercase)
   - Mobile: `.hero-logo { width: 90px; height: 90px; }` at 720px breakpoint

### Source images (~/Downloads)
- `IMG_2597.JPG` — workshop bench with 3 boards
- `IMG_2598.JPG` — end-grain board on kitchen counter
- `IMG_2599.JPG` — logo medallion on walnut (alternate take)
- `IMG_2600.JPG` — business card mockup (Aidan Parsons, Founder)
- `IMG_2601.JPG` — stack of end-grain cutting boards
- `IMG_2602.JPG` — logo medallion on walnut (primary source, with white blur on left edge)
- `IMG_2603.JPG` — brand collage (4 panels: logo, card, engraved board, board stack)
- `matts logo.jpg` — user's own crop of the logo medallion (used as final `logo.jpg`)

### Notes for next session
- Matt may want more edits — the collage image (IMG_2603) has unused panels (business card, engraved board close-up) that could go on custom-engraved.html or a new testimonials section
- IMG_2599 is an alternate logo medallion take (slightly different angle) — available if a variant is needed
- The `brand-chip` CSS class is still in styles.css (not used in HTML anymore) — can be cleaned up
- Consider: real checkout backend, testimonials section (both listed in AGENTS.md as "not done yet")

### Site credit added
- **Credit:** "Site made by BrianKaley aka deputy-doofy aka doofus inc."
- **Logo:** `img/doofy.gif` (Officer Doofy salute GIF from gifdb.com, 790x500, displayed at 50x32)
- **Placement:** Below footer on all 5 pages, `.site-credit` div, centered, opacity 0.75
- **CSS:** `.site-credit` — flex center, 11px letterspaced cream text, opacity 0.75, small rounded GIF thumbnail
