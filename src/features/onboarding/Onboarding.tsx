import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import slides from "./slides";

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const slide = slides[current];

  return (
    <div className="onboarding">
      <button
  className="start-btn"
  onClick={() => navigate("/auth")}
>
  Get Started
</button>

      <div className="icon">{slide.icon}</div>

      <h1>{slide.title}</h1>

      <p>{slide.description}</p>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
          ></span>
        ))}
      </div>

      {current !== slides.length - 1 ? (
        <button className="next-btn" onClick={nextSlide}>
          Next →
        </button>
      ) : (
        <button
  className="start-btn"
  onClick={() => navigate("/auth")}
>
  Get Started
</button>
      )}
    </div>
  );
}

export default Onboarding;