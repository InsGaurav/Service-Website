// src/components/dashboard/ProjectsManager.jsx
import React, { useState, useEffect } from "react";
import "../../styles/dashboard/ProjectsManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("medium");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch projects from backend API on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setCategory("");
    setImage("");
    setSize("medium");
    setEditIndex(null);
  };

  // Add project (API & state)
  const handleAdd = async () => {
    if (!title.trim() || !category.trim() || !image.trim()) {
      alert("Please fill all fields before adding!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, category, image, size })
      });
      if (!res.ok) throw new Error("Failed to add project");
      const newProject = await res.json();
      setProjects([...projects, newProject]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete project (API & state)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((proj) => proj._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit project (prefill form)
  const handleEdit = (index) => {
    const proj = projects[index];
    setEditIndex(index);
    setTitle(proj.title);
    setCategory(proj.category);
    setImage(proj.image);
    setSize(proj.size);
  };

  // Save edited project (API & state)
  const handleSave = async () => {
    if (!title.trim() || !category.trim() || !image.trim()) {
      alert("Please fill all fields before saving!");
      return;
    }
    try {
      const projectToEdit = projects[editIndex];
      const res = await fetch(`${API_URL}/projects/${projectToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, category, image, size })
      });
      if (!res.ok) throw new Error("Failed to update project");
      const updatedProject = await res.json();
      setProjects(
        projects.map((p, i) => (i === editIndex ? updatedProject : p))
      );
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Projects</h2>
      <div className="project-form">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
          </div>
        )}
        <div className="form-actions">
          {editIndex !== null ? (
            <button className="btn btn-edit" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-add" onClick={handleAdd}>
              Add Project
            </button>
          )}
          <button className="btn btn-reset" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="project-list">
          {projects.length === 0 ? (
            <p>No projects added yet.</p>
          ) : (
            projects.map((proj, index) => (
              <div key={proj._id || index} className="project-card">
                <img src={proj.image} alt={proj.title} />
                <h3>{proj.title}</h3>
                <p>{proj.category}</p>
                <p>Size: {proj.size}</p>
                <div className="project-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(proj._id)}
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

export default ProjectsManager;
