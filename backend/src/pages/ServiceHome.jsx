import React from "react";
import "../styles/ServiceHome.css";

function ServiceHome({ services, tools }) {
  return (
    <div className="service-wrapper">
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2>Design Service We Provide Our Clients</h2>
            <button className="view-all-button">
              <span>VIEW ALL</span>
            </button>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <h3>{service.id}</h3>
                <p>{service.description}</p>
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="card-overlay">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="container">
          <div className="tools-content">
            <div className="tools-text">
              <h2>Tool That We For Our Projects</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
                libero risus semper habitant arcu eget. Et integer facilisi eget.
              </p>
            </div>
            <div className="tools-grid">
              {tools.map((toolImg, idx) => (
                <img src={toolImg} alt={`Tool ${idx + 1}`} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceHome;
