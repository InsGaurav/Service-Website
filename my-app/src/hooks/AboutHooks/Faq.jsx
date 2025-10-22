import React, { useState, useEffect } from "react";
import "../../styles/AboutUs.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${API_URL}/faqs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchFaqs();
  }, [token]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">FAQ's</h2>
        <p className="faq-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
          libero risus semper habitant arcu eget. Et integer facilisi eget.
        </p>
      </div>

      <div className="faq-accordion">
        {faqs.length === 0 ? (
          <p>Loading FAQs...</p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq._id || index}
              className={`faq-item ${openFaq === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)} type="button" aria-expanded={openFaq === index}>
                <span>{faq.question}</span>
                <svg
                  className="faq-icon"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQSection;
