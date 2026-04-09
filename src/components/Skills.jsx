import React from 'react';
import './Skills.css';
export default function Skills({ t }) {
  return (
    <section id="skills" className="skills-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">02.</span> {t.title}
        </h2>
        <p className="skills-subtitle">{t.subtitle}</p>
        
        <div className="skills-grid">
          {t.items.map((skill, index) => (
            <div key={index} className="skill-card glass-panel animate-fade-up" style={{transitionDelay: `${(index % 3) * 100}ms`}}>
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <span className="skill-category">{skill.category}</span>
              </div>
              <div className="skill-bar-bg">
                <div 
                  className="skill-bar-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
