import React, { useState, useEffect } from "react";
import "../styles/Service.css";
import { Link } from "react-router-dom";
import Testimonials from "../Components/Testimonials"; // Existing testimonial component

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const ArrowRightIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7-11-7z" />
  </svg>
);

const ExternalLinkIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M21 14v6a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1h6"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const Emoji = ({ char, size = 22 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>{char}</span>
);

const Services = () => {
  const [stats, setStats] = useState([]);
  const [serviceCards, setServiceCards] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/services/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    const fetchServiceCards = async () => {
      try {
        const res = await fetch(`${API_URL}/services/services`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setServiceCards(data);
        }
      } catch (err) {
        console.error("Failed to fetch service cards", err);
      }
    };
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/services/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    const fetchStack = async () => {
      try {
        const res = await fetch(`${API_URL}/services/stack`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStack(data);
        }
      } catch (err) {
        console.error("Failed to fetch tech stack", err);
      }
    };

    fetchStats();
    fetchServiceCards();
    fetchProjects();
    fetchStack();
  }, [token]);

  return (
    <div className="page">
      {/* Hero Section */}
      <section
        id="home"
        className="hero"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="hero__inner container">
          <h1 className="hero__title gradient-text">3D Services</h1>
          <p className="hero__subtitle">
            Transform your digital presence with cutting-edge 3D web development,
            immersive experiences, and innovative design solutions.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary">
              Get Started <ArrowRightIcon />
            </button>
            <button className="btn btn--ghost">
              <span className="btn__play">
                <PlayIcon />
              </span>
              Watch Demo
            </button>
          </div>
          <div className="hero__stats">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="stat__value">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-indicator__mouse">
            <div className="scroll-indicator__wheel" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <div className="section__header">
            <div className="badge">
              <span className="badge__dot" />
              <span className="badge__icon">&lt;/&gt;</span>
            </div>
            <h2 className="section__title">
              Tool That We For <br />
              <span className="gradient-text">Our Projects</span>
            </h2>
            <p className="section__lead">
              We leverage cutting-edge technologies and proven methodologies to deliver
              exceptional digital solutions that drive business growth and user engagement.
            </p>
          </div>

          <h3 className="section__sub">
            View Related Web Development <br /> Services & Solutions
          </h3>

          <div className="card-grid">
            {serviceCards.map((card, i) => (
              <article className="card" key={card._id || i}>
                <div className="card__icon">
                  <Emoji char={card.iconChar} />
                </div>
                <h4 className="card__title">{card.title}</h4>
                <p className="card__text">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="companies">
            {["Facebook", "Instagram", "LinkedIn", "Twitter", "YouTube", "TikTok"].map((c) => (
              <div key={c} className="company-pill">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section section--projects">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">
              Web Development <br />
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="section__lead">
              Explore our portfolio of successful projects that showcase our
              expertise in creating innovative digital solutions for businesses worldwide.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <article className="project" key={p._id || i}>
                <div
                  className="project__image"
                  style={{ backgroundImage: `url(${p.image || p.img})` }}
                >
                  <div className="project__overlay">
                    <ExternalLinkIcon />
                  </div>
                </div>
                <div className="project__body">
                  <div className="project__category">{p.category}</div>
                  <h4 className="project__title">{p.title}</h4>
                  <p className="project__text">{p.description || p.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="center">
             <Link to="/projects" className="btn btn-pink">
                <span >VIEW ALL</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">
              Tool We Use For <br />
              <span className="gradient-text">Web Development</span>
            </h2>
            <p className="section__lead">
              We utilize industry-leading technologies and frameworks to build robust,
              scalable, and high-performance web applications.
            </p>
          </div>

          <div className="tech-grid">
            {stack.map((t, i) => (
              <div className="tech" key={`${t.name}-${i}`}>
                <div className="tech__icon">{t.emoji}</div>
                <div className="tech__name">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section section--testimonials">
        <div className="container">
          <Testimonials />
        </div>
      </section>
    </div>
  );
};

export default Services;
