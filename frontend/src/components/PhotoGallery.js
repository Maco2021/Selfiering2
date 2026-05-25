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

const INTERVAL_MS = 5000;
const LEAVE_MS = 300;
const BACK_MS = 700;

function getCards(wrapper) {
  return Array.from(wrapper.querySelectorAll(".card"));
}

function initCards(wrapper) {
  const cards = getCards(wrapper);
  if (cards.length === 0) return;
  cards[cards.length - 1].classList.add("active");
  if (cards.length >= 2) cards[cards.length - 2].classList.add("next");
}

function setPointerEvents(wrapper, value) {
  getCards(wrapper).forEach((c) => (c.style.pointerEvents = value));
}

function promoteNext(wrapper, active, next) {
  active.classList.add("animate-leave");
  active.classList.remove("active");
  next.classList.add("active");
  next.classList.remove("next");

  const remaining = getCards(wrapper);
  const newNextIdx = remaining.length >= 3 ? remaining.length - 3 : remaining.length - 2;
  if (newNextIdx >= 0) remaining[newNextIdx].classList.add("next");
}

function recycleLeavingCard(wrapper) {
  const leaving = wrapper.querySelector(".card.animate-leave");
  if (!leaving) return;
  leaving.classList.add("animate-back");
  leaving.classList.remove("animate-leave");
  wrapper.insertBefore(leaving, wrapper.firstChild);
}

function clearAnimationClasses(wrapper) {
  const back = wrapper.querySelector(".card.animate-back");
  if (back) back.classList.remove("animate-back");
}

function PhotoCard({ src, isLeft, testId }) {
  return (
    <div
      className={`card ${isLeft ? "left-card" : "right-card"}`}
      data-testid={testId}
    >
      <div className="card-bg">
        <div className="card-img">
          <img src={src} alt="#" />
        </div>
      </div>
    </div>
  );
}

function useCardCarousel(wrapperRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    initCards(wrapper);

    let timer = null;
    let busy = false;

    const advance = () => {
      if (busy) return;
      const active = wrapper.querySelector(".card.active");
      const next = wrapper.querySelector(".card.next");
      if (!active || !next) return;

      busy = true;
      setPointerEvents(wrapper, "none");
      promoteNext(wrapper, active, next);

      setTimeout(() => recycleLeavingCard(wrapper), LEAVE_MS);
      setTimeout(() => {
        clearAnimationClasses(wrapper);
        setPointerEvents(wrapper, "auto");
        busy = false;
      }, BACK_MS);
    };

    const onClick = () => {
      clearInterval(timer);
      advance();
      timer = setInterval(advance, INTERVAL_MS);
    };

    timer = setInterval(advance, INTERVAL_MS);
    const cards = getCards(wrapper);
    cards.forEach((c) => c.addEventListener("click", onClick));

    return () => {
      clearInterval(timer);
      cards.forEach((c) => c.removeEventListener("click", onClick));
    };
  }, [wrapperRef]);
}

export default function PhotoGallery() {
  const wrapperRef = useRef(null);
  useCardCarousel(wrapperRef);

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
                  <PhotoCard
                    key={src}
                    src={src}
                    isLeft={idx % 2 === 0}
                    testId={`photo-card-${idx}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
