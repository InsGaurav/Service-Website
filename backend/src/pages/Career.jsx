import React, { useState } from "react";
import jobOpenings from "../data/jobOpenings";
import "../styles/Career.css";

const Career = ({ jobs = jobOpenings }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            Join our team and help shape the future of tech with creativity and
            innovation.
          </p>
        </div>
      </section>

      <main className="main-content">
        {/* Job Openings Section */}
        <section className="job-openings">
          <div className="section-header">
            <h2 className="section-title">Open Positions</h2>
            <p className="section-description">
              We’re always looking for creative, talented self-starters to join
              the team. Check out our open roles below.
            </p>
          </div>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <img
                  src="/CareerAsset/rectangle-4421.svg"
                  alt={job.title}
                  className="job-image"
                />
                <div className="job-content">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-description">{job.description}</p>
                  <p className="job-experience">{job.experience}</p>
                  <button className="apply-btn">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form Section */}
        <section className="application-form">
          <div className="form-header">
            <h2 className="form-title">Apply Now</h2>
            <p className="form-description">
              Fill out the form below and upload your resume. Our team will get
              back to you shortly.
            </p>
          </div>
          <form className="job-form" onSubmit={handleSubmit}>
            {/* Form rows... unchanged */}
            {/* Full Name, Email, Phone, Position Select, Resume Upload */}
            {/* Position select options dynamically from jobs prop */}
            <div className="form-row">
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
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Other form fields */}
            {/* Submit button */}
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>

          {success && (
            <div className="success-message">
              <div className="success-content">
                <h3>Application Submitted!</h3>
                <p>
                  Thank you for applying. We’ll review your application and get
                  back to you soon.
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
