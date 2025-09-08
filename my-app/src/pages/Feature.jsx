


import React from "react";
import "../styles/Feature.css";

function Feature({ data }) {
  return (
    <div className="feature-wrapper">
      <section className="feature-section">
        <div className="feature-container">
          <div className="feature-text">
            <h2>{data.heading}</h2>
            <p>{data.description}</p>
            <div className="feature-buttons">
              <button>
                <div>
                  <img src={data.vectorIcon} alt="Icon" />
                </div>
                <span>Get In Touch</span>
              </button>
              <button>
                <div>
                  <img src={data.vectorIcon} alt="Icon" />
                </div>
                <span>Get In Touch</span>
              </button>
            </div>
          </div>

          <div className="feature-image-block">
            <div className="outer-box">
              <div className="inner-box"></div>
              <img src={data.image} alt="Product" className="product-image" />

              <img src={data.star} alt="Star" className="star-top-left" />
              <img src={data.star} alt="Star" className="star-bottom-right" />

              <div className="circle-outline"></div>

              <div className="label-ergonomic">
                <p>{data.ergonomic}</p>
              </div>
              <div className="label-award">
                <p>{data.award}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="testimonial-section"
        style={{
          backgroundImage: `url(${data.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="testimonial-container">
          <h3>{data.testimonial.name}</h3>
          <p>{data.testimonial.quote}</p>
        </div>
      </section>
    </div>
  );
}

export default Feature;
