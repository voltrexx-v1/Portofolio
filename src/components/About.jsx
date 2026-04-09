import React from 'react';
import './About.css';

export default function About({ t }) {
  return (
    <section id="about" className="about-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">01.</span> {t.title}
        </h2>
        
        <div className="about-content">
          <div className="about-text glass-panel">
            <p>{t.description1}</p>
            <br/>
            <p>{t.description2}</p>
          </div>
          
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <div className="image-overlay"></div>
              {/* Using a placeholder gradient since no image is provided yet */}
              <div className="placeholder-image">
                <span className="gradient-text">M</span>
              </div>
            </div>
            <div className="image-frame"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
