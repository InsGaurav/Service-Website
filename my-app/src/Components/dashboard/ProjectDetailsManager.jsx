import React, { useState, useEffect } from "react";
import "../../styles/dashboard/ProjectDetailsManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectDetailsManager = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [projects, setProjects] = useState([]); // For linking
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [projectId, setProjectId] = useState(""); // Link to Project
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch project details and projects on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [detailsRes, projectsRes] = await Promise.all([
          fetch(`${API_URL}/project-details`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!detailsRes.ok || !projectsRes.ok) throw new Error("Failed to fetch data");

        const detailsData = await detailsRes.json();
        const projectsData = await projectsRes.json();

        setProjectDetails(detailsData);
        setProjects(projectsData);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDetails("");
    setImage("");
    setProjectId("");
    setEditIndex(null);
  };

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
        body: JSON.stringify({ title, description, details, image, projectId: projectId || null }),
      });
      if (!res.ok) throw new Error("Failed to add project details");
      const newProjectDetail = await res.json();
      setProjectDetails([...projectDetails, newProjectDetail]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project detail?")) return;
    try {
      const res = await fetch(`${API_URL}/project-details/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete project details");
      setProjectDetails(projectDetails.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (index) => {
    const detail = projectDetails[index];
    setEditIndex(index);
    setTitle(detail.title);
    setDescription(detail.description);
    setDetails(detail.details || "");
    setImage(detail.image || "");
    setProjectId(detail.projectId || "");
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill title and description");
      return;
    }
    try {
      const detailToEdit = projectDetails[editIndex];
      const res = await fetch(`${API_URL}/project-details/${detailToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, details, image, projectId: projectId || null }),
      });
      if (!res.ok) throw new Error("Failed to update project details");
      const updatedDetail = await res.json();
      setProjectDetails(projectDetails.map((p, i) => (i === editIndex ? updatedDetail : p)));
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

        {/* Link to Project */}
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">-- Select Project (optional) --</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.title} (ID: {proj._id})
            </option>
          ))}
        </select>

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
      ) : projectDetails.length === 0 ? (
        <p>No project details added yet.</p>
      ) : (
        <div className="project-list">
          {projectDetails.map((detail, index) => (
            <div key={detail._id || index} className="project-card">
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
              {detail.image && <img src={detail.image} alt={detail.title} />}
              <p>Linked Project ID: {detail.projectId || "None"}</p>

              <div className="project-actions">
                <button className="btn btn-edit" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn btn-delete" onClick={() => handleDelete(detail._id)}>
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
