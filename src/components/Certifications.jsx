import React from 'react';
import './Certifications.css';
import { Award } from 'lucide-react';

export default function Certifications({ t }) {
  if (!t || !t.items || t.items.length === 0) return null;

  return (
    <section id="certifications" className="certifications-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">04.</span> {t.title}
        </h2>
        <p className="certifications-subtitle">{t.subtitle}</p>
        
        <div className="certifications-grid">
          {t.items.map((cert, index) => (
            <div key={index} className="cert-card glass-panel animate-fade-up" style={{transitionDelay: `${(index % 3) * 100}ms`}}>
              <div className="cert-icon-wrapper">
                <Award size={24} className="cert-icon" />
              </div>
              <div className="cert-info">
                <h3>{cert.name}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
