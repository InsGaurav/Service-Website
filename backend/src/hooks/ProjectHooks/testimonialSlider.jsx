import React, { useState } from "react";
import testimonials from "../../data/TestimonialsData";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <>
      <div className="testimonial-card">
        <div className="testimonial-content">
          <img src={t.image} alt={t.name} className="testimonial-image" />
          <div className="testimonial-text">
            <h3 className="testimonial-name">{t.name}</h3>
            <p className="testimonial-quote">"{t.quote}"</p>
            <span className="testimonial-company">{t.company}</span>
          </div>
        </div>
      </div>

      <div className="testimonial-nav">
        <button className="nav-btn" onClick={prev}>❮</button>
        <button className="nav-btn" onClick={next}>❯</button>
      </div>
    </>
  );
}
