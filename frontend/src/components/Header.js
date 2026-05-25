import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "photo", href: "#photo", img: "/img/fblock/pg.webp" },
  { id: "video", href: "#video", img: "/img/fblock/vg.webp" },
  { id: "albume", href: "#albume", img: "/img/fblock/al.webp" },
  { id: "recenzii", href: "#recenzii", img: "/img/fblock/nn.webp" },
  { id: "contacte", href: "#contacte", img: "/img/fblock/co.webp" },
];

const LETTERS = [
  { ch: "S", size: 40 },
  { ch: "E", size: 30 },
  { ch: "L", size: 30 },
  { ch: "F", size: 30 },
  { ch: "I", size: 30 },
  { ch: "E", size: 30 },
  { ch: "R", size: 40 },
  { ch: "I", size: 40 },
  { ch: "N", size: 40 },
  { ch: "G", size: 40 },
];

function smoothScrollTo(targetId) {
  const el = document.querySelector(targetId);
  if (!el) return;
  const offset = window.innerWidth < 768 ? 56 : 70;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function useFixedOnScroll() {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const handler = () => {
      const intro = document.getElementById("intro");
      const introHeight = intro ? intro.offsetHeight : 600;
      setFixed(window.scrollY > introHeight);
    };
    handler();
    window.addEventListener("scroll", handler);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return fixed;
}

function Logo({ onClick }) {
  return (
    <div
      className="header__logo"
      data-testid="header-logo"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div>
        <h2>
          {LETTERS.map((l, i) => (
            <span
              key={`${l.ch}-${i}`}
              style={{ "--i": i + 1, fontSize: l.size }}
            >
              {l.ch}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}

export default function Header() {
  const fixed = useFixedOnScroll();
  const [navOpen, setNavOpen] = useState(false);

  const onLinkClick = (e, href) => {
    e.preventDefault();
    setNavOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={`header${fixed ? " fixed" : ""}`}
      id="header"
      data-testid="site-header"
    >
      <div className="container">
        <div className="header__inner">
          <Logo onClick={(e) => onLinkClick(e, "#intro")} />

          <nav
            className={`nav${navOpen ? " show" : ""}`}
            id="nav"
            data-testid="site-nav"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className="nav__link"
                href={item.href}
                data-testid={`nav-link-${item.id}`}
                onClick={(e) => onLinkClick(e, item.href)}
              >
                <img src={item.img} alt={item.id} />
              </a>
            ))}
          </nav>

          <button
            className="burger"
            type="button"
            id="navToggle"
            data-testid="nav-burger"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="burger__item">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export { smoothScrollTo };
