import React, { useEffect, useState } from "react";

export default function GoToBtn() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
