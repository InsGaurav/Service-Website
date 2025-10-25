import React, { useState, useEffect } from "react";
import Testimonials from "../Components/Testimonials";
import "../styles/Home.css";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState(null);
  const [features, setFeatures] = useState([]);
  const [services, setServices] = useState([]);
  const [tools, setTools] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [additionalIndustryImages, setAdditionalIndustryImages] = useState([]);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          heroRes, featuresRes, servicesRes,
          toolsRes, industriesRes, addIndRes, ctaRes
        ] = await Promise.all([
          fetch(`${API_URL}/homepage/hero`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/features`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/services`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/tools`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/industries`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/additional-industry-images`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/homepage/ctas`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (heroRes.ok) {
          let data = await heroRes.json();
          // Only use the first non-empty hero entry
          const nonEmptyHero = data.find(h =>
            h &&
            (h.title || h.heroImage || h.bgShape || h.bgAbstract || (h.partners && h.partners.length))
          );
          setHero(nonEmptyHero || null);
        }
        if (featuresRes.ok) {
          const data = await featuresRes.json();
          setFeatures(data.filter(f => f && (f.heading || f.description)));
        }
        if (servicesRes.ok) {
          const data = await servicesRes.json();
          setServices(data.filter(s => s && (s.id || s.title)));
        }
        if (toolsRes.ok) {
          const data = await toolsRes.json();
          setTools(data.filter(t => t && (t.src || typeof t === "string")));
        }
        if (industriesRes.ok) {
          const data = await industriesRes.json();
          setIndustries(data.filter(i => i && i.images && i.images.length));
        }
        if (addIndRes.ok) {
          const data = await addIndRes.json();
          setAdditionalIndustryImages(data.filter(img => img && img.src));
        }
        if (ctaRes.ok) {
          const data = await ctaRes.json();
          setCta(data.length ? data[1] : null);
          console.log("CTA Data:", data);
          
        }
      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <div>Loading homepage...</div>;

  return (
    <div>
      {/* Hero Section */}
      {hero && (
        <section className="hero-section">
          <img src={hero.bgShape} alt="Background Shape" className="bg-shape" />
          <img src={hero.bgAbstract} alt="Abstract BG" className="bg-abstract" />

          <div
            className="hero-content"
            dangerouslySetInnerHTML={{ __html: `<h1>${hero.title}</h1><p>${hero.description}</p>` }}
          />

          <button className="about-btn">
            <span>About Us</span>
          </button>

          <div className="hero-image float-animation">
            <img src={hero.heroImage} alt="3D Robot" />
          </div>

          <div className="partner-logos">
            {hero.partners?.map((logo, idx) => (
              <img src={logo} alt={`Partner ${idx}`} key={idx} />
            ))}
          </div>

          <div className="bottom-fade"></div>
        </section>
      )}

      {/* Features Section */}
      {features.length > 0 &&
        features.map((data) => (
          <div className="feature-wrapper" key={data._id}>
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
                <h3>{data.testimonial?.name}</h3>
                <p>{data.testimonial?.quote}</p>
              </div>
            </section>
          </div>
        ))}

      {/* Services and Tools Section */}
     {/* Services Section with Unique Classes */}
<section className="home-services-section">
  <div className="home-services-container">
    <div className="home-services-header">
      <h2>Design Service We<br />Provide Our Clients</h2>
      <Link to="/services" className="home-services-view-btn">
        VIEW ALL
      </Link>
    </div>
    <div className="home-services-grid">
      {services.map((service) => (
        <div className="home-service-item" key={service._id}>
          <div className="home-service-number">{service.id}</div>
          <p className="home-service-desc">{service.description}</p>
          <div className="home-service-card">
            <img src={service.image} alt={service.title} />
            <div className="home-service-overlay">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Tools Section with Unique Classes */}
<section className="home-tools-section">
  <div className="home-tools-container">
    <div className="home-tools-content">
      <div className="home-tools-text">
        <h2>Tool That We Use For Our Projects</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
          libero risus semper habitant arcu eget. Et integer facilisi eget.
        </p>
      </div>
      <div className="home-tools-grid">
        {tools.map((toolImg, idx) => (
          <img 
            src={toolImg.src || toolImg} 
            alt={`Tool ${idx + 1}`} 
            key={toolImg._id || idx}
            className="home-tool-image"
          />
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Industries, Additional Industry Images, and CTA Section */}
      <section className="industry-section">
        <div className="industry-container">
          <h2 className="industry-title">Industry We Service Provide</h2>
          <p className="industry-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
            imperdiet sed id elementum. Quam vel aliquam sit vulputate.
            Faucibus nec gravida ipsum pulvinar vel.
          </p>

          <div className="industry-grid">
            {industries.map((col, idx) => (
              <div
                key={`col-${idx}`}
                className={
                  col.type === "left-col"
                    ? "industry-column"
                    : col.type === "middle-col"
                    ? "industry-column"
                    : "right-column"
                }
              >
                {col.images.map((img, idy) =>
                  img.src ? (
                    <div
                      key={`img-${idy}`}
                      className={
                        img.large ? "image-wrapper large-image-wrapper" : "image-wrapper"
                      }
                    >
                      <img
                        src={img.src}
                        alt="Industry"
                        className={
                          img.large ? "large-image" : "industry-image"
                        }
                      />
                      {img.overlay && <div className="overlay"><p className="overlay-text">{img.overlay}</p></div>}
                      {img.cardTitle && <h3 className="card-title">{img.cardTitle}</h3>}
                    </div>
                  ) : img.bg ? (
                    <div
                      key={`bg-${idy}`}
                      className="bg-card"
                      style={{ backgroundImage: `url(${img.bg})` }}
                    >
                      <h3 className="card-title">{img.cardTitle}</h3>
                    </div>
                  ) : null
                )}
              </div>
            ))}
            {additionalIndustryImages.map((img, idx) =>
              img.belowText ? (
                <div key={`addimg-${idx}`} className="text-image">
                  <img src={img.src} alt="Industry" className="industry-image" />
                  <p className="below-text">{img.belowText}</p>
                </div>
              ) : (
                <div key={`addimg-${idx}`} className="image-wrapper small">
                  <img src={img.src} alt="Industry" className="industry-image" />
                  {img.overlay && <div className="overlay"><p className="overlay-text">{img.overlay}</p></div>}
                </div>
              )
            )}
          </div>
        </div>
      </section>

            
      {cta && (
        <section className="cta-section">
          <img src={cta.bg} alt="CTA Background" className="cta-bg" />
          <div className="cta-content">
            <div className="cta-inner">
              <div className="cta-label">
                <div className="cta-line" />
                <span className="cta-tag">{cta.label}</span>
              </div>
              <h2 className="cta-title">{cta.title}</h2>
              <button className="cta-button">{cta.buttonLabel}</button>
            </div>
            <img src={cta.mask} alt="Decorative" className="cta-mask" />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section id="testimonials" className="section section--testimonials">
        <div className="container">
          <Testimonials />
        </div>
      </section>
    </div>
  );
};

export default Home;
