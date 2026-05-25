import React, { useEffect, useState } from "react";

export default function GoToBtn() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = () => setActive(window.scrollY > 150);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const click = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="container">
      <div
        className={`gotobtn${active ? " active" : ""}`}
        onClick={click}
        data-testid="go-to-top-btn"
        role="button"
        aria-label="Go to top"
      />
    </div>
  );
}
