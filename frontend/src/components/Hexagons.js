import React from "react";

const CLIENTS = [
  null,
  "/img/clients/fenix.webp",
  "/img/clients/zen.webp",
];
const CLIENTS_ROW2 = [
  "/img/clients/exp.webp",
  "/img/clients/jus.webp",
  "/img/clients/lt.webp",
];

export default function Hexagons() {
  return (
    <section id="lab" data-testid="hexagons-section">
      <div className="container">
        <div className="sectionheader">
          <h1>
            <img src="/img/fblock/hex.webp" alt="#" />
          </h1>
        </div>
        <article>
          {CLIENTS.map((bg, idx) => (
            <div className="lab_item" key={`r1-${idx}`}>
              <div className="hexagon hexagon2">
                {bg && (
                  <div className="hexagon-in1">
                    <div
                      className="hexagon-in2"
                      style={{ backgroundImage: `url(${bg})` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="lab_item2">
            <div className="hexagon hexagon2"></div>
          </div>

          {CLIENTS_ROW2.map((bg, idx) => (
            <div className="lab_item" key={`r2-${idx}`}>
              <div className="hexagon hexagon2">
                <div className="hexagon-in1">
                  <div
                    className="hexagon-in2"
                    style={{ backgroundImage: `url(${bg})` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
