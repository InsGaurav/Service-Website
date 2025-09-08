// src/components/dashboard/FaqManager.jsx
import React, { useState, useEffect } from "react";
import "../../styles/dashboard/FaqManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch FAQs from the backend API on mount
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/faqs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [token]);

  // Reset form fields
  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setEditIndex(null);
  };

  // Add new FAQ (API & UI)
  const handleAdd = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please fill both Question and Answer!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer })
      });
      if (!res.ok) throw new Error("Failed to add FAQ");
      const newFaq = await res.json();
      setFaqs([...faqs, newFaq]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete FAQ from API and state
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await fetch(`${API_URL}/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete FAQ");
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Start editing FAQ (prefill form)
  const handleEdit = (index) => {
    const faq = faqs[index];
    setEditIndex(index);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  // Save edited FAQ (API & state)
  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please fill both Question and Answer!");
      return;
    }
    try {
      const faqToEdit = faqs[editIndex];
      const res = await fetch(`${API_URL}/faqs/${faqToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer })
      });
      if (!res.ok) throw new Error("Failed to update FAQ");
      const updatedFaq = await res.json();
      setFaqs(faqs.map((faq, i) => (i === editIndex ? updatedFaq : faq)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage FAQs</h2>

      <div className="faq-form">
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>

        <div className="form-actions">
          {editIndex !== null ? (
            <button className="btn btn-edit" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-add" onClick={handleAdd}>
              Add FAQ
            </button>
          )}
          <button className="btn btn-reset" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        <div className="faq-list">
          {faqs.length === 0 ? (
            <p>No FAQs added yet.</p>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq._id || index} className="faq-card">
                <h3>Q: {faq.question}</h3>
                <p>A: {faq.answer}</p>
                <div className="faq-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(faq._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FaqManager;
