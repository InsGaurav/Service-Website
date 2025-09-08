import React, { useState } from "react";
import faqData from "../../data/Faq";
import "../../styles/Contact.css";

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

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
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openFaq === index ? "active" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleFaq(index)}>
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
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
