import React, { useState } from "react";
import projectData from "../../data/ProjectData";
import "../../styles/Project.css";

const categories = [
  "ALL PROJECTS",
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "UI/UX DESIGN",
  "GAME DEVELOPMENT",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");

  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  const filteredProjects =
    activeCategory === "ALL PROJECTS"
      ? projectData
      : projectData.filter((project) => project.category === activeCategory);

  return (
    <section className="portfolio-section">
      <div className="portfolio-filters">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleFilterClick(cat)}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className={`portfolio-item ${project.size}`}>
            <img src={project.image} alt={project.title} />
            <div className="portfolio-overlay">
              <h3>{project.title}</h3>
              <button className="know-more-btn">Know More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
