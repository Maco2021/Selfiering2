import React, { useRef, useState } from "react";

const VIDEOS = [
  "/img/video/video1.mp4",
  "/img/video/video2.mp4",
  "/img/video/video3.mp4",
  "/img/video/video4.mp4",
];

export default function VideoSection() {
  const [current, setCurrent] = useState(VIDEOS[0]);
  const mainRef = useRef(null);

  const select = (src) => {
    setCurrent(src);
    // ensure reload + play
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.load();
        const p = mainRef.current.play();
        if (p && p.catch) p.catch(() => {});
      }
    }, 50);
  };

  return (
    <div className="container" id="video" data-testid="video-section">
      <div className="sections">
        <video
          ref={mainRef}
          src={current}
          className="slider"
          autoPlay
          loop
          muted
          playsInline
          controls
          data-testid="video-main"
        />
        <ul>
          {VIDEOS.map((v, i) => (
            <li
              key={v}
              onClick={() => select(v)}
              data-testid={`video-thumb-${i}`}
            >
              <video src={v} muted playsInline />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
