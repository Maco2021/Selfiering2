import React from "react";

const SLIDES = Array.from({ length: 16 }, (_, i) =>
  `/img/album/${String(i + 1).padStart(2, "0")}.webp`
);

export default function Album() {
  // Duplicate the slides for a seamless marquee; key includes a copy index
  // so React still has stable, unique keys across the two passes.
  const tracks = [
    { copy: "a", slides: SLIDES },
    { copy: "b", slides: SLIDES },
  ];
  return (
    <div className="slider" id="albume" data-testid="album-section">
      <div className="slide-track">
        {tracks.flatMap(({ copy, slides }) =>
          slides.map((src) => (
            <div className="slide" key={`${copy}-${src}`}>
              <img src={src} alt="#" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
