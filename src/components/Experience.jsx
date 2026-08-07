import React from 'react';
import './Experience.css';
import { Briefcase } from 'lucide-react';

export default function Experience({ t }) {
  if (!t || !t.items || t.items.length === 0) return null;

  return (
    <section id="experience" className="experience-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">03.</span> {t.title}
        </h2>
        <p className="experience-subtitle">{t.subtitle}</p>
        
        <div className="timeline">
          {t.items.map((item, index) => (
            <div key={index} className="timeline-item animate-fade-up" style={{transitionDelay: `${index * 100}ms`}}>
              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
              <div className="timeline-content glass-panel">
                <h3>{item.role}</h3>
                <h4 className="company-name">{item.company}</h4>
                <span className="period">{item.period}</span>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
