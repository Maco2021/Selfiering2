# Project Structure

All source files live inside the `.cursor/` directory. This is the web root.

```
.cursor/
├── index.html          # Single entry point — the entire site
├── css/
│   └── style.css       # All styles (single file, no preprocessor)
├── js/
│   └── app.js          # All custom JS (jQuery-based)
├── slick/              # Local vendor copy of Slick Carousel
│   ├── slick.css
│   ├── slick-theme.css
│   ├── slick.min.js
│   └── fonts/
└── img/                # All media assets
    ├── footer.webp     # Hero / contact section background
    ├── intro.jpg
    ├── r1.jpg, r2.jpg
    ├── 04.png, 05.png  # Intro rotating product images
    ├── 0101.png
    ├── album/          # Auto-scroll strip images (01–16.webp)
    ├── blog/           # Review/testimonial photos (1–9.webp)
    ├── clients/        # Partner logos for hexagon section
    ├── fblock/         # Navigation & section header icons (.webp)
    ├── fotoblock/      # Photo gallery card images (01–09.webp)
    ├── icon/           # Favicon + social SVG icons
    └── video/          # Video files (video1–4.mp4)
```

## Conventions

### HTML
- One file: `index.html`. All sections are `<div>` or `<section>` blocks with IDs matching nav `data-scroll` targets: `#intro`, `#photo`, `#video`, `#albume`, `#recenzii`, `#contacte`.
- Inline `<script>` blocks are used for small, section-specific logic (e.g., `videoslider()`, EmailJS init). Larger reusable logic goes in `js/app.js`.
- Section IDs are in Romanian (`recenzii`, `contacte`, `albume`).

### CSS
- Single file `css/style.css`. No CSS variables except inside `#lab article` for hexagon geometry.
- BEM-like class naming: `block__element` (e.g., `header__inner`, `team__item`).
- Brand accent color: `#7b310d` (dark orange/brown). Secondary glow: `#ce690b`. Error red: `#e84545`.
- Responsive breakpoints: 1200px, 991px, 900px, 767px, 640px, 580px, 576px, 480px, 384px, 360px.
- Mobile nav hidden by default; toggled via `.show` class added by jQuery.

### JavaScript
- All jQuery code is in `app.js`, wrapped in `$(function() { ... })`.
- Smooth scroll uses `data-scroll="#sectionId"` attributes on anchor tags.
- Card slider autoplay interval: 5000ms.
- No ES modules — all scripts load globally via `<script>` tags.

### Images
- Prefer `.webp` for photos, `.png` for graphics with transparency, `.svg` for icons.
- All image paths are relative to `index.html` (e.g., `./img/album/01.webp`).
- Adding new gallery images: place in the appropriate subfolder and add a matching `<div class="slide">` or `<div class="card">` in `index.html`.
