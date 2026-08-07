import React from 'react';
import './Skills.css';
import { SiGo, SiJavascript, SiReact, SiVite, SiHtml5, SiCss, SiPython, SiMysql, SiGit, SiGithub } from 'react-icons/si';

const getSkillIcon = (name) => {
  if (name.includes('Golang')) return <SiGo className="skill-icon" style={{ color: '#00ADD8' }} />;
  if (name.includes('JavaScript')) return <SiJavascript className="skill-icon" style={{ color: '#F7DF1E' }} />;
  if (name.includes('React / Vite')) return (
    <div className="skill-icons-group">
      <SiReact className="skill-icon" style={{ color: '#61DAFB' }} />
      <SiVite className="skill-icon" style={{ color: '#646CFF' }} />
    </div>
  );
  if (name.includes('HTML & CSS')) return (
    <div className="skill-icons-group">
      <SiHtml5 className="skill-icon" style={{ color: '#E34F26' }} />
      <SiCss className="skill-icon" style={{ color: '#1572B6' }} />
    </div>
  );
  if (name.includes('Python')) return <SiPython className="skill-icon" style={{ color: '#3776AB' }} />;
  if (name.includes('MySQL')) return <SiMysql className="skill-icon" style={{ color: '#4479A1' }} />;
  if (name.includes('Git & GitHub')) return (
    <div className="skill-icons-group">
      <SiGit className="skill-icon" style={{ color: '#F05032' }} />
      <SiGithub className="skill-icon" style={{ color: '#ffffff' }} />
    </div>
  );
  return null;
};

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
                <div className="skill-title-wrapper">
                  {getSkillIcon(skill.name)}
                  <h3>{skill.name} <span className="skill-percent">{skill.level}%</span></h3>
                </div>
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
