import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#photo", img: "/img/fblock/pg.webp" },
  { href: "#video", img: "/img/fblock/vg.webp" },
  { href: "#albume", img: "/img/fblock/al.webp" },
  { href: "#recenzii", img: "/img/fblock/nn.webp" },
  { href: "#contacte", img: "/img/fblock/co.webp" },
];

const LETTERS = ["S", "E", "L", "F", "I", "E", "R", "I", "N", "G"];

function smoothScrollTo(targetId) {
  const el = document.querySelector(targetId);
  if (!el) return;
  const offset = window.innerWidth < 768 ? 56 : 70;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Header() {
  const [fixed, setFixed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const intro = document.getElementById("intro");
      const introHeight = intro ? intro.offsetHeight : 600;
      setFixed(window.scrollY > introHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
          <div
            className="header__logo"
            data-testid="header-logo"
            onClick={(e) => onLinkClick(e, "#intro")}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h2>
                {LETTERS.map((ch, i) => {
                  const idx = i + 1;
                  const isEdge = idx === 1 || idx >= 7;
                  return (
                    <span
                      key={i}
                      style={{ "--i": idx, fontSize: isEdge ? 40 : 30 }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </h2>
            </div>
          </div>

          <nav
            className={`nav${navOpen ? " show" : ""}`}
            id="nav"
            data-testid="site-nav"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                className="nav__link"
                href={item.href}
                data-testid={`nav-link-${item.href.slice(1)}`}
                onClick={(e) => onLinkClick(e, item.href)}
              >
                <img src={item.img} alt="nav" />
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
