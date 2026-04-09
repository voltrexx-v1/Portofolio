import React from 'react';
import { ArrowRight, Mail, Code2, Database, Zap } from 'lucide-react';
import './Hero.css';

export default function Hero({ t }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        <div className="hero-text-wrapper animate-fade-up">
          <p className="greeting">{t.greeting}</p>
          <h1 className="hero-title">
            <span className="gradient-text">Muhammad Arief Nur Azziz</span> <br />
          </h1>
          <h2 className="hero-role">{t.role}</h2>
          <p className="hero-desc delay-100">{t.description}</p>
          
          <div className="hero-cta delay-200">
            <a href="#portfolio" className="btn btn-primary">
              {t.cta_primary} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary glass-panel">
              <Mail size={18} /> {t.cta_secondary}
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glow-orb"></div>
          
          <div className="floating-badge badge-top-right glass-panel">
            <Code2 size={20} className="badge-icon" />
            <span>Clean Code</span>
          </div>
          
          <div className="floating-badge badge-bottom-left glass-panel">
            <Database size={20} className="badge-icon" />
            <span>Scalable Apps</span>
          </div>

          <div className="floating-badge badge-bottom-right glass-panel">
            <Zap size={20} className="badge-icon" />
            <span>High Performance</span>
          </div>

          <div className="glass-card main-card">
            <div className="card-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="card-body">
              <pre><code>
{`const developer = {
  name: "Muhammad Arief Nur Azziz",
  role: "Software Dev",
  passion: "Creating UI/UX",
  status: "Available"
};`}
              </code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
