

import React, { useState, useEffect } from "react";
import HeroSection from "../pages/HeroSection";
import Feature from "./Feature";
import ServiceHome from "./ServiceHome";
import Resources from "./Resources";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// Import the data that will replace hardcoded content
import { homeData } from "../data/homeData";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from backend/dashboard
    // Replace with real API call when backend available
    setData(homeData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-wrapper">
      
      <HeroSection data={data.hero} />
      <Feature data={data.features} />
      <ServiceHome services={data.services} tools={data.tools} />
      <Resources industries={data.industries} additionalImages={data.additionalIndustryImages} cta={data.cta} />
      
    </div>
  );
}

export default Home;
