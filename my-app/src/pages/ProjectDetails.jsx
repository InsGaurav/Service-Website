import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const res = await fetch(`${API_URL}/project-details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Project details not found.");
        const data = await res.json();
        setProjectDetails(data);
      } catch (err) {
        setError(err.message || "Failed to load project details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjectDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!projectDetails) return <div className="not-found">Project not found.</div>;

  return (
    <main className="project-article">
      <h1>{projectDetails.title}</h1>
      <p className="description">{projectDetails.description}</p>
      {projectDetails.image && (
        <img src={projectDetails.image} alt={projectDetails.title} />
      )}
      <article
        className="article-content"
        dangerouslySetInnerHTML={{
          __html: projectDetails.details || "<p>No details available</p>",
        }}
      ></article>
    </main>
  );
};

export default ProjectDetails;
