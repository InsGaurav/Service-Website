// import React from 'react';
// import { useEffect } from 'react';
// import '../styles/Resource.css';
// import Navbar from '../Components/Navbar';
// import img1 from '../assets/images/img_rectangle_82.png';
// import img2 from '../assets/images/img__4.png';
// import img3 from '../assets/images/img_rectangle_83.png';
// import img4 from '../assets/images/img_rectangle_85.png';
// import img5 from '../assets/images/img_rectangle_86.png';
// import img6 from '../assets/images/img_rectangle_85_236x301.png';
// import ctaBg from '../assets/images/img_rectangle_4311.png';
// import ctaMask from '../assets/images/img_mask_group.png';

// const Resources = () => {
//   useEffect(() => {
//     // Mobile menu toggle
//     const menuButton = document.querySelector('.menu-button');
//     const mobileMenu = document.querySelector('.mobile-menu');

//     if (menuButton && mobileMenu) {
//       menuButton.addEventListener('click', () => {
//         mobileMenu.classList.toggle('hidden');
//       });
//     }

//     // Smooth scrolling
//     const anchors = document.querySelectorAll('a[href^="#"]');
//     anchors.forEach(anchor => {
//       anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute('href');
//         if (targetId === '#') return;
//         const targetElement = document.querySelector(targetId);
//         if (targetElement) {
//           targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//       });
//     });

//     // Hover effect on cards
//     const serviceCards = document.querySelectorAll('.card-hover');
//     serviceCards.forEach(card => {
//       card.addEventListener('mouseenter', () => {
//         card.style.transform = 'translateY(-10px)';
//       });
//       card.addEventListener('mouseleave', () => {
//         card.style.transform = 'translateY(0)';
//       });
//     });
//   }, []);
//   return (
//     <>
    
//     <section className="industry-section">
//       <div className="industry-container">
//         <h2 className="industry-title">Industry We Service Provide</h2>
//         <p className="industry-subtitle">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus imperdiet sed id elementum. Quam vel aliquam sit vulputate. Faucibus nec gravida ipsum pulvinar vel.
//         </p>

//         <div className="industry-grid">
//           {/* Left Column */}
//           <div className="industry-column">
//             <div className="image-wrapper">
//               <img src={img1} alt="Industry" className="industry-image" />
//               <div className="overlay">
//                 <p className="overlay-text">Lorem ipsum dolor sit amet, consectetur elit.</p>
//               </div>
//             </div>

//             <div className="bg-card" style={{ backgroundImage: `url(${img2})` }}>
//               <h3 className="card-title">Title 2</h3>
//             </div>
//           </div>

//           {/* Middle Column */}
//           <div className="industry-column">
//             <img src={img3} alt="Industry" className="industry-image" />
//             <div className="image-wrapper">
//               <div className="overlay">
//                 <p className="overlay-text">Lorem ipsum dolor sit amet, consectetur elit.</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="right-column">
//             <div className="image-wrapper">
//               <img src={img4} alt="Industry" className="large-image" />
//               <h3 className="card-title-top">Title 1</h3>
//             </div>
//           </div>

//           {/* Additional Images */}
//           <div className="image-wrapper small">
//             <img src={img5} alt="Industry" className="industry-image" />
//             <div className="overlay">
//               <p className="overlay-text">Lorem ipsum dolor sit amet, consectetur elit.</p>
//             </div>
//           </div>

//           <div className="text-image">
//             <img src={img6} alt="Industry" className="industry-image" />
//             <p className="below-text">Lorem ipsum dolor sit amet, consectetur elit.</p>
//           </div>
//         </div>
//       </div>
//     </section><section className="cta-section">
//         <img src={ctaBg} alt="CTA Background" className="cta-bg" />
//         <div className="cta-content">
//           <div className="cta-inner">
//             <div className="cta-label">
//               <div className="cta-line" />
//               <span className="cta-tag">CTA</span>
//             </div>
//             <h2 className="cta-title">Browse our collection of 50+ Webflow Templates</h2>
//             <button className="cta-button">Browse templates</button>
//           </div>
//           <img src={ctaMask} alt="Decorative" className="cta-mask" />
//         </div>
//       </section>
      
     

//       </>

    
//   );
// };

// export default Resources;



import React, { useEffect } from "react";
import "../styles/Resource.css";

function Resources({ industries, additionalImages, cta }) {
  useEffect(() => {
    // Mobile menu toggle
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Smooth scrolling
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Hover effect on cards
    const serviceCards = document.querySelectorAll(".card-hover");
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });
  }, []);

  return (
    <>
      <section className="industry-section">
        <div className="industry-container">
          <h2 className="industry-title">Industry We Service Provide</h2>
          <p className="industry-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
            imperdiet sed id elementum. Quam vel aliquam sit vulputate.
            Faucibus nec gravida ipsum pulvinar vel.
          </p>

          <div className="industry-grid">
            {industries.map((col, idx) => (
              <div
                key={`col-${idx}`}
                className={
                  col.type === "left-col"
                    ? "industry-column"
                    : col.type === "middle-col"
                    ? "industry-column"
                    : "right-column"
                }
              >
                {col.images.map((img, idy) =>
                  img.src ? (
                    <div
                      key={`img-${idy}`}
                      className={
                        img.large ? "image-wrapper large-image-wrapper" : "image-wrapper"
                      }
                    >
                      <img
                        src={img.src}
                        alt="Industry"
                        className={
                          img.large ? "large-image" : "industry-image"
                        }
                      />
                      {img.overlay && <div className="overlay"><p className="overlay-text">{img.overlay}</p></div>}
                      {img.cardTitle && <h3 className="card-title">{img.cardTitle}</h3>}
                    </div>
                  ) : img.bg ? (
                    <div
                      key={`bg-${idy}`}
                      className="bg-card"
                      style={{ backgroundImage: `url(${img.bg})` }}
                    >
                      <h3 className="card-title">{img.cardTitle}</h3>
                    </div>
                  ) : null
                )}
              </div>
            ))}
            {additionalImages.map((img, idx) =>
              img.belowText ? (
                <div key={`addimg-${idx}`} className="text-image">
                  <img src={img.src} alt="Industry" className="industry-image" />
                  <p className="below-text">{img.belowText}</p>
                </div>
              ) : (
                <div key={`addimg-${idx}`} className="image-wrapper small">
                  <img src={img.src} alt="Industry" className="industry-image" />
                  {img.overlay && <div className="overlay"><p className="overlay-text">{img.overlay}</p></div>}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <img src={cta.bg} alt="CTA Background" className="cta-bg" />
        <div className="cta-content">
          <div className="cta-inner">
            <div className="cta-label">
              <div className="cta-line" />
              <span className="cta-tag">{cta.label}</span>
            </div>
            <h2 className="cta-title">{cta.title}</h2>
            <button className="cta-button">{cta.buttonLabel}</button>
          </div>
          <img src={cta.mask} alt="Decorative" className="cta-mask" />
        </div>
      </section>
    </>
  );
}

export default Resources;
