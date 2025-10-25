// src/App.jsx
import React, { useEffect , useState} from "react";
import "../styles/AboutUs.css";
import teamMembers  from "../data/teamData";
import FaqSec from "../hooks/AboutHooks/Faq";





const AboutUs = () => {
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL ;

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll("section, .hero-section").forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });

    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ""));
      const suffix = counter.textContent.replace(/\d/g, "");
      let current = 0;
      const increment = target / 100;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            counterObserver.unobserve(entry.target);
          }
        });
      });

      counterObserver.observe(counter);
    });
  }, []);



  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch(`${API_URL}/team`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
        }
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
    }
    fetchTeam();
  }, [token]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section-about">
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">Web Design & Development</h2>
            <p className="about-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus
              semper habitant arcu eget. Et integer facilisi eget diam.
            </p>
            <button className="about-btn">
              <svg
                className="arrow-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m18 6-6 6-6-6" />
              </svg>
              Get In Touch
            </button>
          </div>
          <div className="about-image">
            <img
              src="/AboutAsset/f93d7b003ee0abb7797acec0d99adae6-1.png"
              alt="Web development illustration"
            />
          </div>
        </div>
      </section>


     
      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="achievements-header">
          <h2 className="achievements-title">Our Achievement</h2>
          <p className="achievements-description">
            Access all your company documents in one centralized location — from shared folders to internal policies and manuals, everything you need is always at your fingertips. Access all your company documents in one centralized location — from shared folders to
            internal policies and manuals, everything you need is always at your fingertips.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore porro unde accusamus, tenetur doloremque modi, recusandae ipsam repellendus itaque incidunt debitis? Soluta ipsam, commodi minus molestiae et perspiciatis illo!
            Illum perferendis iusto corporis eius error beatae minima at, cupiditate sit pariatur nostrum aperiam sapiente magni necessitatibus, numquam qui perspiciatis. Temporibus, autem cumque cum vel rerum neque qui delectus impedit!
          </p>
        </div>
        <div className="achievements-stats">
          <div className="stat-item">
            <h3 className="stat-number">200+</h3>
            <p className="stat-label">Companies</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">5+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Employees</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-number">20+</h3>
            <p className="stat-label">County's Software</p>
          </div>
        </div>
      </section>

      <br />
      

      {/* Partners Section */}
      <section className="partners-section">
        <h2 className="partners-title">Company That Work With Us</h2>
        <img src="/AboutAsset/logos.svg" alt="Company Logos" className="partners-logos" />
      </section>

      <br />


      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-content">
          <div className="vision-image">
            <img src="/AboutAsset/rectangle-4422-1.svg" alt="Vision illustration" />
          </div>
          <div className="vision-text">
            <h2 className="vision-title">Our Visions</h2>
            <p className="vision-description">
              Access all your company documents in one centralized location — from shared folders
              to internal policies and manuals, everything you need is always at your fingertips.
            </p>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />
            {/* Values Section */}
       <section className="values-section">
        <div className="values-content">
          <div className="values-text">
            <h2 className="values-title">Our Values</h2>
            <p className="values-description">
              Access all your company documents in one centralized location — from shared folders
              to internal policies and manuals, everything you need is always at your fingertips.
              Access all your company documents in one centralized location — from shared folders
              to internal policies and manuals, everything you need is always at your fingertips.
            </p>
          </div>
          <div className="values-image">
            <img src="/AboutAsset/rectangle-4422.svg" alt="Our Values" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="team-title">Our Team</h2>
        <div className="team-grid">
          {teamMembers.length === 0 ? (
            <p>Loading team members...</p>
          ) : (
            teamMembers.map((member, index) => (
              <div className="team-member" key={member._id || index}>
                <div
                  className="team-member-image"
                  style={{ backgroundImage: `url(${member.photo || member.image})` }}
                ></div>
                <div className="team-member-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <div className="team-member-social">
                    {member.socialIcons?.map((icon, i) =>
                      icon.src.endsWith(".svg") ? (
                        <img key={i} src={icon.src} alt={icon.alt} />
                      ) : (
                        <div
                          key={i}
                          style={{
                            backgroundImage: `url(${icon.src})`,
                            backgroundSize: "100% 100%",
                            width: "20px",
                            height: "20px"
                          }}
                        ></div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        
        <FaqSec />
      </section>
    </div>
  );
};

export default AboutUs;
