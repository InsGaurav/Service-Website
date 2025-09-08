
// import React from "react";
// import "../styles/Project.css";

// import Portfolio from "../hooks/ProjectHooks/Portfolio";
// import TestimonialSlider from "../hooks/ProjectHooks/testimonialSlider";

// import SmoothScroll from "../hooks/ProjectHooks/SmoothScroll";
// import ScrollAnimations from "../hooks/ProjectHooks/ScrollAnimation";

// import projectData from "../data/ProjectData";
// import testimonials from "../data/TestimonialsData";

// const Project = () => {
//   return (
//     <div className="main-container">
//       <SmoothScroll />
//       <ScrollAnimations />

//       {/* Portfolio Hero Section */}
//       <section className="portfolio-hero">
//         <div className="portfolio-hero-content">
//           <h1 className="portfolio-title">Our Portfolio</h1>
//           <p className="portfolio-subtitle">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </div>
//       </section>

//       {/* Portfolio Filter Section */}
//       <section className="portfolio-section">
//         <Portfolio projects={projectData} />
//       </section>

//       {/* Services Section */}
//       <section className="services-intro">
//         <div className="services-card">
//           <div className="services-content">
//             <div className="services-text">
//               <h2 className="services-title">Our Services</h2>
//               <p className="services-description">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 Faucibus in libero risus semper habitant arcu eget. Et integer
//                 facilisi eget diam.
//               </p>
//             </div>

//             <div className="services-grid">
//               {/* Service items can also be data-driven later */}
//               {[...Array(4)].map((_, index) => (
//                 <div key={index} className="service-item">
//                   <div className="service-icon">
//                     <img
//                       src="/ProjectAsset/lettering-3d-text-3.png"
//                       alt="3D Services"
//                     />
//                   </div>
//                   <div className="service-info">
//                     <h3>3D Services</h3>
//                     <p>We have done +50 3D Projects</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <div className="testimonials-bg">
//           <img src="/ProjectAsset/rectangle-4410.png" alt="Background" />
//           <img
//             src="/ProjectAsset/polygon-1-68.svg"
//             alt="Polygon"
//             className="polygon-right"
//           />
//           <img
//             src="/ProjectAsset/polygon-1.svg"
//             alt="Polygon"
//             className="polygon-left"
//           />
//         </div>

//         <div className="testimonials-content">
//           <h2 className="testimonials-title">What Our Clients Says</h2>
//           <TestimonialSlider testimonials={testimonials} />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Project;



import React from "react";
import "../styles/Project.css";

import Portfolio from "../hooks/ProjectHooks/Portfolio";
import SmoothScroll from "../hooks/ProjectHooks/SmoothScroll";
import ScrollAnimations from "../hooks/ProjectHooks/ScrollAnimation";

import projectData from "../data/ProjectData";

import Testimonials from "../Components/Testimonials"; // import the new component

const Project = () => {
  return (
    <div className="main-container">
      <SmoothScroll />
      <ScrollAnimations />

      {/* Portfolio Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1 className="portfolio-title">Our Portfolio</h1>
          <p className="portfolio-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Portfolio Filter Section */}
      <section className="portfolio-section">
        <Portfolio projects={projectData} />
      </section>

      {/* Services Section */}
      <section className="services-intro">
        <div className="services-card">
          <div className="services-content">
            <div className="services-text">
              <h2 className="services-title">Our Services</h2>
              <p className="services-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Faucibus in libero risus semper habitant arcu eget. Et integer
                facilisi eget diam.
              </p>
            </div>

            <div className="services-grid">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="service-item">
                  <div className="service-icon">
                    <img
                      src="/ProjectAsset/lettering-3d-text-3.png"
                      alt="3D Services"
                    />
                  </div>
                  <div className="service-info">
                    <h3>3D Services</h3>
                    <p>We have done +50 3D Projects</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section moved to separate component */}
      <Testimonials />
    </div>
  );
};

export default Project;
