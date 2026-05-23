import React from "react";

const SLIDES = Array.from({ length: 16 }, (_, i) =>
  `/img/album/${String(i + 1).padStart(2, "0")}.webp`
);

export default function Album() {
  // Duplicate for seamless marquee
  const all = [...SLIDES, ...SLIDES];
  return (
    <div className="slider" id="albume" data-testid="album-section">
      <div className="slide-track">
        {all.map((src, idx) => (
          <div className="slide" key={idx}>
            <img src={src} alt="#" />
          </div>
        ))}
      </div>
    </div>
  );
}
