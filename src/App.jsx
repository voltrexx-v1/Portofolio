import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { dict } from './data/dictionary';
import './App.css';

function App() {
  const [lang, setLang] = useState('id'); // Default is Indonesian
  const [theme, setTheme] = useState('dark');
  const currentDict = dict[lang];

  // Theme observer
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  // Intersection Observer setup for scroll animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const hiddenElements = document.querySelectorAll('.scroll-reveal, .animate-fade-up');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang, theme]); // Added theme back so observer re-attaches if needed

  return (
    <div className="app-container">
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={currentDict.nav} />
      
      <main>
        <Hero t={currentDict.hero} />
        <About t={currentDict.about} />
        <Skills t={currentDict.skills} />
        <Portfolio t={currentDict.portfolio} />
        <Contact t={currentDict.contact} />
      </main>

      <footer style={styles.footer}>
        <p>{currentDict.footer}</p>
      </footer>
    </div>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '24px 0',
    color: 'var(--text-secondary)',
    borderTop: '1px solid var(--border-light)',
    marginTop: '60px',
    fontSize: '0.9rem'
  }
};

export default App;
