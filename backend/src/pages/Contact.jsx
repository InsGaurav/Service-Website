import React from "react";
import "../styles/Contact.css"; // adjust the path if needed

import FAQSection from "../hooks/Contact/FaqSection";

const ContactPage = () => {
  

 

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero-section1">
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-header">
          <h2 className="contact-title">Want to Know More Contact Us</h2>
          <p className="contact-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
            libero risus semper habitant arcu eget. Et integer facilisi eget.
          </p>
        </div>

        <form className="contact-form">
          <div className="form-fields">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input type="text" id="firstName" name="firstName" placeholder="First name" className="form-input" />
              </div>
              <div className="form-field">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Last name" className="form-input" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" placeholder="you@company.com" className="form-input" />
            </div>

            <div className="form-field">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <div className="phone-input">
                <div className="country-selector">
                  <span>US</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" className="phone-number-input" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" rows="6" className="form-textarea"></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn">CONTACT US</button>
        </form>
      </section>

      {/* FAQ Section */}
       <section className="faq-section">
      
        <FAQSection />
      </section> 
    </div>
  );
};

export default ContactPage;
