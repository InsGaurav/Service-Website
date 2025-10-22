import React, { useState, useEffect } from "react";
import "../styles/Career.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const token = localStorage.getItem("token");

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null
  });
  const [success, setSuccess] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_URL}/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement resume upload and form submission logic here,
    // possibly involving uploading the resume file to server or cloud storage,
    // then sending form data with resume URL.

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        resume: null
      });
    }, 3000);
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <section className="header-section">
        <div className="header-content1">
          <h1 className="header-title">Careers</h1>
          <p className="header-description">
            Join our team and help shape the future of tech with creativity and innovation.
          </p>
        </div>
      </section>

      <main className="main-content">
        {/* Job Openings Section */}
        <section className="job-openings">
          <div className="section-header">
            <h2 className="section-title">Open Positions</h2>
            <p className="section-description">
              We’re always looking for creative, talented self-starters to join the team. Check out our open roles below.
            </p>
          </div>
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <p>Loading job openings...</p>
            ) : (
              jobs.map(job => (
                <div key={job._id} className="job-card">
                  <img
                    src="/CareerAsset/rectangle-4421.svg"
                    alt={job.title}
                    className="job-image"
                  />
                  <div className="job-content">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-description">{job.description}</p>
                    <p className="job-experience">{job.type} - {job.location}</p>
                    <button className="apply-btn" onClick={() => setFormData(prev => ({...prev, position: job.title}))}>
                      Apply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Application Form Section */}
        <section className="application-form">
          <div className="form-header">
            <h2 className="form-title">Apply Now</h2>
            <p className="form-description">
              Fill out the form below and upload your resume. Our team will get back to you shortly.
            </p>
          </div>
          <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position Applied For</label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Position</option>
                  {jobs.map((job) => (
                    <option key={job._id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="resume">Upload Resume</label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>

          {success && (
            <div className="success-message">
              <div className="success-content">
                <h3>Application Submitted!</h3>
                <p>
                  Thank you for applying. We’ll review your application and get back to you soon.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Career;
