import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ lang, setLang, theme, setTheme, t }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.skills, href: '#skills' },
    { name: t.portfolio, href: '#portfolio' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <span className="gradient-text">P</span>ortfolio
        </a>

        {/* Desktop Menu */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
          
          <button className="lang-toggle" onClick={toggleTheme} title={"Toggle Theme"}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="lang-toggle" onClick={toggleLanguage} title={"Switch to " + (lang === 'id' ? 'English' : 'Indonesian')}>
            <Globe size={18} className="lang-icon" />
            <span>{lang.toUpperCase()}</span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link, idx) => (
            <li key={idx} onClick={() => setMobileMenuOpen(false)}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
          <li className="mobile-lang-container" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             <span>Mode: {theme === 'dark' ? 'Dark' : 'Light'}</span>
          </li>
          <li className="mobile-lang-container" onClick={toggleLanguage} style={{ cursor: 'pointer', marginTop: '0' }}>
             <Globe size={18} />
             <span>Bahasa: {lang === 'id' ? 'ID' : 'EN'}</span>
          </li>
        </ul>
      </div>
    </header>
  );
}
