import React, { useEffect, useState } from "react";
import TestimonialSlider from "../hooks/ProjectHooks/testimonialSlider";
import "../styles/Testimonials.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${API_URL}/testimonials`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    }
    fetchTestimonials();
  }, [token]);

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
