import React from 'react';
import { Mail, Code, Briefcase, Send } from 'lucide-react';
import './Contact.css';

export default function Contact({ t }) {
  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="container">
        <h2 className="section-title">
          <span className="gradient-text">04.</span> {t.title}
        </h2>
        <p className="contact-subtitle">{t.subtitle}</p>
        
        <div className="contact-content glass-panel">
          <div className="contact-info">
            <h3 className="contact-heading">{t.heading}</h3>
            <p className="contact-text">
              {t.text}
            </p>
            
            <div className="social-links">
              <a href="#" className="social-link" title="Email">
                <Mail size={24} />
              </a>
              <a href="#" className="social-link" title="Portfolio / Code">
                <Code size={24} />
              </a>
              <a href="#" className="social-link" title="Professional Network">
                <Briefcase size={24} />
              </a>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">{t.name}</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{t.email}</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">{t.message}</label>
              <textarea id="message" rows="5" placeholder="Hello..." required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary submit-btn">
              <Send size={18} /> {t.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
