import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Project.css";


const categories = [
  "ALL PROJECTS",
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "UI/UX DESIGN",
  "GAME DEVELOPMENT",
];

const Portfolio = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");

  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  const filteredProjects =
    activeCategory === "ALL PROJECTS"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className={`portfolio-item ${project.size || ""} project-card-link`}
          >
            <img src={project.image} alt={project.title} />
            <div className="portfolio-overlay">
              <h3>{project.title}</h3>
              {/* Use detailsId directly, no nested _id */}
              {project.detailsId ? (
                <Link
                  to={`/project-details/${project.detailsId}`}
                  className="know-more-btn"
                >
                  Know More
                </Link>
              ) : (
                <button disabled className="know-more-btn-disabled">
                  Details unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
