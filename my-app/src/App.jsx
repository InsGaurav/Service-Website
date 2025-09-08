import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";
import Career from "./pages/Career";
import Signup from "./pages/sign-up";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ServiceHome from "./pages/ServiceHome";
import  AdminDashboard  from "./Components/dashboard/adminDashboard";
import {
  stats,
  serviceCards,
  projects,
  stack,
 
} from "./data/servicesData";

import Project from "./pages/Projects"; // Assuming you have a Project page
import Contact from "./pages/Contact"; // Assuming you have a Contact page

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Feature />} />
          // In your App or parent component rendering pages:
          <Route
            path="/services"
            element={
              <Services
                stats={stats}
                serviceCards={serviceCards}
                projects={projects}
                stack={stack}
                
              />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/career" element={<Career />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/service-home" element={<ServiceHome />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
