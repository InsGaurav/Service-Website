import React, { useState, useEffect } from "react";
import "../../styles/dashboard/JobOpeningsManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

const JobOpeningsManager = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch job openings");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setLocation("");
    setType("");
    setDescription("");
    setEditIndex(null);
  };

  // Add job
  const handleAdd = async () => {
    if (!title || !location || !type || !description) {
      alert("All fields are required!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, location, type, description })
      });
      if (!res.ok) throw new Error("Failed to add job");
      const newJob = await res.json();
      setJobs([...jobs, newJob]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit job (prefill form)
  const handleEdit = (index) => {
    const job = jobs[index];
    setEditIndex(index);
    setTitle(job.title);
    setLocation(job.location);
    setType(job.type);
    setDescription(job.description);
  };

  // Save edited job
  const handleSave = async () => {
    if (!title || !location || !type || !description) {
      alert("All fields are required!");
      return;
    }
    try {
      const jobToEdit = jobs[editIndex];
      const res = await fetch(`${API_URL}/jobs/${jobToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, location, type, description })
      });
      if (!res.ok) throw new Error("Failed to update job");
      const updatedJob = await res.json();
      setJobs(jobs.map((j, i) => (i === editIndex ? updatedJob : j)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Job Openings</h2>
      <div className="job-form">
        <input
          type="text"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Job Type</option>
          {jobTypes.map((jt) => (
            <option key={jt} value={jt}>
              {jt}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Job description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {editIndex !== null ? (
          <button className="btn btn-edit" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-add" onClick={handleAdd}>
            Add Job
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading job openings...</p>
      ) : (
        <div className="job-list">
          {jobs.length === 0 ? (
            <p>No job openings posted yet.</p>
          ) : (
            jobs.map((job, index) => (
              <div key={job._id || index} className="job-card">
                <h3>{job.title}</h3>
                <p className="meta">
                  {job.type} • {job.location}
                </p>
                <p className="desc">{job.description}</p>
                <div className="job-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(job._id)}
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

export default JobOpeningsManager;
