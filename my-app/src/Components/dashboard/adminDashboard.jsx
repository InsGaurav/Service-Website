import React, { useState } from "react";
import "../../styles/dashboard/adminDashboard.css";

// Import real components
import ProjectsManager from "./ProjectsManager"; // ✅ use actual file
// Later you can create and import FaqManager, ServicesManager, etc.
import FaqManager from "./FaqManager";

import TeamManager from "./TeamManager";
import TestimonialsManager from "./TestimonialsManager";
import ServicesManager from "./ServicesManager";
import JobOpeningsManager from "./JobOpeningsManager";


const DashboardHome = () => <h2>Welcome to Admin Dashboard</h2>;


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Function to render selected section
  const renderSection = () => {
    switch (activeSection) {
      case "faq":
        return <FaqManager />;
      case "services":
        return <ServicesManager />;
      case "projects":
        return <ProjectsManager />; // ✅ now real manager will load
      case "team":
        return <TeamManager />;
      case "testimonials":
        return <TestimonialsManager />;
      case "jobs":
        return <JobOpeningsManager />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Admin Panel</div>
        <ul>
          <li onClick={() => setActiveSection("home")}>Dashboard</li>
          <li onClick={() => setActiveSection("faq")}>Manage FAQs</li>
          <li onClick={() => setActiveSection("services")}>Manage Services</li>
          <li onClick={() => setActiveSection("projects")}>Manage Projects</li>
          <li onClick={() => setActiveSection("team")}>Manage Team</li>
          <li onClick={() => setActiveSection("jobs")}>Manage JOB Openings</li>
          <li onClick={() => setActiveSection("testimonials")}>
            Manage Testimonials
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">{renderSection()}</main>
    </div>
  );
};

export default AdminDashboard;
