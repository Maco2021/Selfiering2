import React from "react";
import { smoothScrollTo } from "./Header";

export default function Intro() {
  const onClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
  };
  return (
    <div
      className="intro"
      id="intro"
      data-testid="intro-section"
      style={{
        background: "url(/img/footer.webp) center no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="intro__innera">
          <div className="rotate-block">
            <div className="change-img">
              <div className="front-side-img">
                <a
                  href="#photo"
                  data-testid="intro-photo-link"
                  onClick={(e) => onClick(e, "#photo")}
                >
                  <img src="/img/04.png" alt="photo" />
                </a>
              </div>
            </div>
          </div>
          <div className="rotate-block">
            <div className="change-img">
              <div className="front-side-img">
                <a
                  href="#video"
                  data-testid="intro-video-link"
                  onClick={(e) => onClick(e, "#video")}
                >
                  <img src="/img/05.png" alt="video" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
