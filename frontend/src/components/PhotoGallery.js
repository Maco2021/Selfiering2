import React, { useEffect, useRef } from "react";

const IMAGES = [
  "/img/fotoblock/01.webp",
  "/img/fotoblock/02.webp",
  "/img/fotoblock/03.webp",
  "/img/fotoblock/04.webp",
  "/img/fotoblock/05.webp",
  "/img/fotoblock/06.webp",
  "/img/fotoblock/07.webp",
  "/img/fotoblock/08.webp",
  "/img/fotoblock/09.webp",
];

export default function PhotoGallery() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getCards = () => Array.from(wrapper.querySelectorAll(".card"));

    const init = () => {
      const cards = getCards();
      if (cards.length === 0) return;
      cards[cards.length - 1].classList.add("active");
      if (cards.length >= 2) cards[cards.length - 2].classList.add("next");
    };
    init();

    const interval = 5000;
    let timer = null;
    let clickInProgress = false;

    const advance = () => {
      if (clickInProgress) return;
      clickInProgress = true;

      const cards = getCards();
      const active = wrapper.querySelector(".card.active");
      const next = wrapper.querySelector(".card.next");
      if (!active || !next) {
        clickInProgress = false;
        return;
      }

      cards.forEach((c) => (c.style.pointerEvents = "none"));

      active.classList.add("animate-leave");
      active.classList.remove("active");
      next.classList.add("active");
      next.classList.remove("next");

      const remaining = getCards();
      // last - prev - prev => third from end becomes next
      if (remaining.length >= 3) {
        remaining[remaining.length - 3].classList.add("next");
      } else if (remaining.length >= 2) {
        remaining[remaining.length - 2].classList.add("next");
      }

      setTimeout(() => {
        const leaving = wrapper.querySelector(".card.animate-leave");
        if (leaving) {
          leaving.classList.add("animate-back");
          leaving.classList.remove("animate-leave");
          wrapper.insertBefore(leaving, wrapper.firstChild);
        }
      }, 300);

      setTimeout(() => {
        const back = wrapper.querySelector(".card.animate-back");
        if (back) back.classList.remove("animate-back");
        getCards().forEach((c) => (c.style.pointerEvents = "auto"));
        clickInProgress = false;
      }, 700);
    };

    timer = setInterval(advance, interval);

    const onClick = () => {
      clearInterval(timer);
      advance();
      timer = setInterval(advance, interval);
    };

    getCards().forEach((c) => c.addEventListener("click", onClick));

    return () => {
      clearInterval(timer);
      getCards().forEach((c) => c.removeEventListener("click", onClick));
    };
  }, []);

  return (
    <div className="container" id="photo" data-testid="photo-section">
      <div className="features">
        <section className="sss">
          <div className="jstext">
            <div className="selfi">SELFIERING</div>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              voluptatibus dolor aliquid, blanditiis distinctio provident
              eveniet assumenda? Reprehenderit autem, explicabo id doloribus
              sint provident ea, nihil accusamus necessitatibus, sed non?
            </h1>
          </div>

          <div className="js-slider">
            <div id="wrapper">
              <div className="card-wrapper" ref={wrapperRef}>
                {IMAGES.map((src, idx) => (
                  <div
                    key={src}
                    className={`card ${idx % 2 === 0 ? "left-card" : "right-card"}`}
                    data-testid={`photo-card-${idx}`}
                  >
                    <div className="card-bg">
                      <div className="card-img">
                        <img src={src} alt="#" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
