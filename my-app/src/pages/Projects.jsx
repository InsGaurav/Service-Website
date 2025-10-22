import React, { useState, useEffect } from "react";
import Portfolio from "../hooks/ProjectHooks/Portfolio";
import SmoothScroll from "../hooks/ProjectHooks/SmoothScroll";
import ScrollAnimations from "../hooks/ProjectHooks/ScrollAnimation";
import Testimonials from "../Components/Testimonials";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    fetchProjects();
  }, [token]);

  return (
    <div className="main-container">
      <SmoothScroll />
      <ScrollAnimations />

      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1 className="portfolio-title">Our Portfolio</h1>
          <p className="portfolio-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      <Portfolio projects={projects} />

      <section className="services-intro">
        <div className="services-card">
          <div className="services-content">
            <div className="services-text">
              <h2 className="services-title">Our Services</h2>
              <p className="services-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Faucibus in libero risus semper habitant arcu eget. Et integer
                facilisi eget diam.
              </p>
            </div>

            <div className="services-grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="service-item">
                  <div className="service-icon">
                    <img
                      src="/ProjectAsset/lettering-3d-text-3.png"
                      alt="3D Services"
                    />
                  </div>
                  <div className="service-info">
                    <h3>3D Services</h3>
                    <p>We have done +50 3D Projects</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Project;
