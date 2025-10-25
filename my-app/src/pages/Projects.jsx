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

      

      
      <Testimonials />
    </div>
  );
};

export default Project;
