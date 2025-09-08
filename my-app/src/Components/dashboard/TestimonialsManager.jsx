import React, { useState, useEffect } from "react";
import "../../styles/dashboard/TestimonialsManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch testimonials from backend API on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/testimonials`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [token]);

  // Reset form fields
  const resetForm = () => {
    setNewName("");
    setNewRole("");
    setNewMessage("");
    setNewImage("");
    setEditIndex(null);
  };

  // Add new testimonial (API & state)
  const handleAdd = async () => {
    if (!newName || !newRole || !newMessage || !newImage) {
      alert("All fields are required!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newName,
          company: newRole,
          quote: newMessage,
          image: newImage
        })
      });
      if (!res.ok) throw new Error("Failed to add testimonial");
      const newTestimonial = await res.json();
      setTestimonials([...testimonials, newTestimonial]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete testimonial (API & state)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit testimonial (prefill form)
  const handleEdit = (index) => {
    const t = testimonials[index];
    setEditIndex(index);
    setNewName(t.name);
    setNewRole(t.company);
    setNewMessage(t.quote);
    setNewImage(t.image);
  };

  // Save edited testimonial (API & state)
  const handleSave = async () => {
    if (!newName || !newRole || !newMessage || !newImage) {
      alert("All fields are required!");
      return;
    }
    try {
      const tToEdit = testimonials[editIndex];
      const res = await fetch(`${API_URL}/testimonials/${tToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newName,
          company: newRole,
          quote: newMessage,
          image: newImage
        })
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      const updated = await res.json();
      setTestimonials(
        testimonials.map((t, i) => (i === editIndex ? updated : t))
      );
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Testimonials</h2>
      <div className="testimonial-form">
        <input
          type="text"
          placeholder="Person's name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role / Company"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <textarea
          placeholder="Testimonial message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Image path / URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        {editIndex !== null ? (
          <button className="btn btn-edit" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-add" onClick={handleAdd}>
            Add Testimonial
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading testimonials...</p>
      ) : (
        <div className="testimonial-grid">
          {testimonials.length === 0 ? (
            <p>No testimonials yet.</p>
          ) : (
            testimonials.map((t, index) => (
              <div key={t._id || index} className="testimonial-card">
                <img src={t.image} alt={t.name} className="testimonial-image" />
                <h3>{t.name}</h3>
                <p className="role">{t.company}</p>
                <p className="message">"{t.quote}"</p>
                <div className="testimonial-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(t._id)}
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

export default TestimonialsManager;
