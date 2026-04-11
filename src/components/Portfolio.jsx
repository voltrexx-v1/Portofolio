import React from 'react';
import { ExternalLink, Code } from 'lucide-react';
import './Portfolio.css';
export default function Portfolio({ t }) {
  return (
    <section id="portfolio" className="portfolio-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">03.</span> {t.title}
        </h2>
        <p className="portfolio-subtitle">{t.subtitle}</p>
        
        <div className="projects-grid">
          {t.projects.map((project, index) => (
            <div key={index} className="project-card glass-panel animate-fade-up" style={{transitionDelay: `${(index % 3) * 100}ms`}}>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <ul className="project-tech">
                  {project.tech.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                
                <div className="project-links">
                  {project.links.live && project.links.live !== '#' && (
                    <a href={project.links.live} className="icon-link primary-link" target="_blank" rel="noopener noreferrer" title="Live Demo">
                      <ExternalLink size={20} /> {t.view_live || 'Live Demo'}
                    </a>
                  )}
                  {project.links.github && project.links.github !== '#' && (
                    <a href={project.links.github} className="icon-link" target="_blank" rel="noopener noreferrer" title="Source Code">
                      <Code size={20} /> {t.view_project}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
