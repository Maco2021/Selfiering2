# SelfieRing Landing Page — PRD

## Original Problem Statement
"Build a landing page: Review the project. Once you've reviewed it, don't send me a reply—just run the project for me right away so I can see it. If you run into any issues while running it, make the necessary changes so you can get it to work."

User chose **Option C**: migrate the existing static HTML/CSS/JS landing page (located in `/app/.cursor/`) into a proper React component structure on the existing /app/frontend pipeline.

## What this is
A photo-booth services landing page for "SelfieRing" (Romanian/Moldovan business) showcasing:
- Animated SELFIERING header logo + image-based navigation
- Two flip-card intro CTAs (Photo / Video)
- Photo gallery with auto-rotating stacked cards
- Video gallery with selectable thumbnails (4 demo videos)
- Infinite-scrolling album marquee (16 album images)
- 8 client testimonials in Romanian
- Hexagonal honeycomb client logos
- Contact form (EmailJS) with honeypot, CSRF, rate-limit

## Architecture
- Frontend: React 18 (CRA) on port 3000
- Backend: minimal FastAPI on port 8001 (`/api/`, `/api/health`)
- MongoDB available but unused (no backend persistence required)
- All original assets (~50MB images + videos) copied from `/app/.cursor/img/` to `/app/frontend/public/img/`
- Original `style.css` (1727 lines) preserved as `/app/frontend/src/App.css`, with only the two `url(../img/...)` CSS background paths moved to inline JSX styles (CRA css-loader limitation)
- EmailJS configuration preserved from original (public keys baked into ContactForm.js)

## Components
- `Header.js` — sticky animated logo, nav, burger menu, scroll-fixed behavior
- `Intro.js` — hero with flip-card images
- `PhotoGallery.js` — jQuery card-stack animation reimplemented with vanilla JS + refs
- `VideoSection.js` — video player + thumbnail selector
- `Album.js` — duplicated images for seamless marquee
- `Reviews.js` — 8 Romanian testimonials
- `Hexagons.js` — honeycomb client logo layout
- `ContactForm.js` — EmailJS submit with honeypot/CSRF/rate-limit
- `GoToBtn.js` — scroll-to-top FAB

## Implemented (this session, 2026-01-23)
- Full migration from static HTML to React component structure
- Backend skeleton + .env files
- Frontend running cleanly on supervisor (no lint errors)
- Visual parity with original site verified via screenshots across all sections

## Backlog / Next Action Items
- P1: Replace placeholder Lorem ipsum copy in photo section with real business description
- P1: Add real social media URLs (Facebook, Telegram, Viber currently `href="#"`)
- P2: Wire contact form to an owned backend endpoint instead of EmailJS public key (currently uses original EmailJS keys baked into the page)
- P2: Lazy-load videos (~50MB asset budget)
- P3: Add SEO meta tags, OpenGraph, sitemap, robots.txt
- P3: Replace `0101.png` (unused) and clean unused assets
