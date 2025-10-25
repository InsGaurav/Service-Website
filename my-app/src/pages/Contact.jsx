import React, { useState } from "react";
import "../styles/Contact.css";
import FAQSection from "../hooks/Contact/FaqSection";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.msg });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus({ type: 'error', message: data.msg });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="contact-title">Want to Know More? Contact Us</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-fields">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  placeholder="First name" 
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Last name" 
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="you@company.com" 
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+1 (555) 000-0000" 
                  className="phone-number-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'SENDING...' : 'CONTACT US'}
          </button>
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
