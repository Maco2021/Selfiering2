# Tech Stack

## Overview
Plain HTML/CSS/JavaScript — no build system, no bundler, no package manager. Everything runs directly in the browser.

## Languages
- HTML5
- CSS3 (vanilla, no preprocessor)
- JavaScript (ES5/ES6, no TypeScript)

## Libraries (CDN-loaded)
| Library | Version | Purpose |
|---|---|---|
| jQuery | 3.7.0 | DOM manipulation, smooth scroll, event handling |
| Slick Carousel | 1.8.1 | Carousel/slider (loaded via CDN + local copy in `/slick/`) |
| Swiper | 8 | Swiper bundle CSS (loaded but not actively used in current code) |
| Font Awesome | 6.3.0 | Icons (social links, UI icons) |
| EmailJS Browser SDK | 4 | Contact form email delivery (no backend required) |
| Google Fonts | — | Anton, Dancing Script, Montserrat |

## EmailJS Configuration
Keys are inlined in `index.html` at the bottom of `<body>`:
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

Do not move these to external files without also updating the `emailjs.init()` call.

## Local Vendor Files
A local copy of Slick Carousel lives in `/slick/` (CSS, JS, fonts). Both the local copy and the CDN version are linked — the CDN version takes precedence for JS.

## No Build / No Compile
There is no `package.json`, `Makefile`, or any build step. To "run" the project, open `index.html` directly in a browser or serve the `.cursor/` directory with any static file server, e.g.:

```
npx serve .cursor
# or
python -m http.server 8080 --directory .cursor
```

## No Tests
There is no test framework configured.
