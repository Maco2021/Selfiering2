# SelfieRing

Landing page for the SelfieRing photo-booth business (Romanian / Moldovan).

This repository contains **two** runnable versions of the same site:

## 1. Static HTML (no build) — `index.html` at the repo root

Just open `index.html` in any browser, or host it as a plain static site.

### Run locally
```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

### Host on GitHub Pages
1. Repo **Settings → Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `master` (or `main`) · **Folder:** `/ (root)`
4. Save — your site will be live at `https://<owner>.github.io/<repo>/`.

All assets (CSS, JS, images, videos) live in `.cursor/` and the root `index.html`
references them via relative paths, so the page works directly from any static
file host with no build step.

## 2. React rewrite — `frontend/` + `backend/`

A component-based React migration of the same page is in `frontend/`,
backed by a minimal FastAPI shell in `backend/`. To run it locally:

```bash
# Backend (port 8001)
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001

# Frontend (port 3000)
cd ../frontend
yarn install
yarn start
```

The React app is what the live Emergent preview serves.

## Sections

- Animated `SELFIERING` header + image-based navigation
- Flip-card hero (Photo / Video CTAs)
- Auto-rotating stacked photo gallery
- Video gallery (4 selectable demo clips)
- Infinite-scrolling album marquee
- Client testimonials (Romanian)
- Hexagonal client logos
- Contact form (EmailJS) with honeypot, in-memory CSRF, rate-limit
- Instagram link → [@cabinafotoring](https://www.instagram.com/cabinafotoring/)
