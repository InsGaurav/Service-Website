import React from "react";

// No import for background image needed if in public folder, just use URL string
import "../styles/Footer.css";

import logo from "/assets/images/img_path_white_a700.svg";
import locationIcon from "/assets/images/img_path.svg";
import phoneIcon from "/assets/images/img_social_media_twitch.svg";
import mailIcon from "/assets/images/img_star.svg";

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.6) 100%
          ),
          url('/assets/ProjectAsset/frame-14637.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <div className="footer-main">
        <div className="footer-logo">
          <img src={logo} alt="Company Logo" />
          <p>
            We turn your concepts into realistic 3D visuals to power up your
            digital presence.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/career">Careers</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="/services">3D Avatars</a>
              </li>
              <li>
                <a href="/services">AR Filters</a>
              </li>
              <li>
                <a href="/services">Virtual Try-ons</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get in Touch</h4>
            <ul className="contact-info">
              <li>
                <img src={locationIcon} alt="Location" /> India, Remote
              </li>
              <li>
                <img src={phoneIcon} alt="Phone" /> +91 12345 67890
              </li>
              <li>
                <img src={mailIcon} alt="Email" /> hello@example.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
