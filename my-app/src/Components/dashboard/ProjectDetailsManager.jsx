import React, { useState, useEffect } from "react";
import "../../styles/dashboard/ProjectDetailsManager.css";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const ProjectDetailsManager = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/project-details`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDetails("");
    setImage("");
    setEditIndex(null);
  };

  // Add new project details
  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill title and description");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/project-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, details, image }),
      });
      if (!res.ok) throw new Error("Failed to add project details");
      const newProject = await res.json();
      setProjects([...projects, newProject]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete project details
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_URL}/project-details/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete project details");
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Start editing
  const handleEdit = (index) => {
    const proj = projects[index];
    setEditIndex(index);
    setTitle(proj.title);
    setDescription(proj.description);
    setDetails(proj.details || "");
    setImage(proj.image || "");
  };

  // Save edits
  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill title and description");
      return;
    }
    try {
      const projToEdit = projects[editIndex];
      const res = await fetch(`${API_URL}/project-details/${projToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, details, image }),
      });
      if (!res.ok) throw new Error("Failed to update project details");
      const updatedProject = await res.json();
      setProjects(projects.map((p, i) => (i === editIndex ? updatedProject : p)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Project Details</h2>

      <div className="project-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <textarea
          placeholder="Long Details (HTML or Markdown)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={8}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="form-actions">
          {editIndex !== null ? (
            <button className="btn btn-edit" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-add" onClick={handleAdd}>
              Add Project Details
            </button>
          )}
          <button className="btn btn-reset" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading project details...</p>
      ) : projects.length === 0 ? (
        <p>No project details added yet.</p>
      ) : (
        <div className="project-list">
          {projects.map((proj, index) => (
            <div key={proj._id || index} className="project-card">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <img src={proj.image} alt={proj.title} />

              <div className="project-actions">
                <button className="btn btn-edit" onClick={() => handleEdit(index)}>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsManager;
