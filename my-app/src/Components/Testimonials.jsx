import React from "react";
import TestimonialSlider from "../hooks/ProjectHooks/testimonialSlider";
import testimonials from "../data/TestimonialsData";
import "../styles/Testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-bg">
        <img src="/ProjectAsset/rectangle-4410.png" alt="Background" />
        <img
          src="/ProjectAsset/polygon-1-68.svg"
          alt="Polygon"
          className="polygon-right"
        />
        <img
          src="/ProjectAsset/polygon-1.svg"
          alt="Polygon"
          className="polygon-left"
        />
      </div>

      <div className="testimonials-content">
        <h2 className="testimonials-title">What Our Clients Says</h2>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
