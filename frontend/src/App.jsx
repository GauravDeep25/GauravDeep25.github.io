import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa';
import './App.css';
import About from './components/about.jsx';
import Projects from './components/projects.jsx';
import Certifications from './components/certifications.jsx';
import Contact from './components/contact.jsx';
import Photography from './components/Photography.jsx';
import Login from './components/Login.jsx';
import EditDashboard from './components/EditDashboard.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { useContent } from './context/ContentContext.jsx';

import Navbar from './components/Navbar.jsx';

// --- Main App Component ---
export default function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/edit" element={<Login />} />
        <Route path="/edit/dashboard" element={<EditDashboard />} />
      </Routes>
    </>
  );
}

// --- Portfolio Component ---
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const themeColor = theme === 'light' ? '#f9f9f9' : '#0f0f0f';

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = themeColor;

    document.title = "Gaurav Deep - Portfolio";
  }, []);

  return (
    <div className="container">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MainContent />
      <About />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

// --- Main Content Component ---
const MainContent = () => {
  const { content, loading } = useContent();
  const hero = content?.hero || {};

  if (loading) {
    return (
      <main className="hero">
        <div className="skeleton skeleton-subtitle" style={{ width: '100px', height: '1.2rem', marginBottom: '1rem' }}></div>
        <div className="skeleton skeleton-title" style={{ width: '80%', height: '3rem', marginBottom: '1.5rem' }}></div>
        <div className="skeleton skeleton-paragraph" style={{ width: '90%', height: '1.2rem', marginBottom: '0.5rem' }}></div>
        <div className="skeleton skeleton-paragraph" style={{ width: '85%', height: '1.2rem' }}></div>
      </main>
    );
  }

  return (
    <main className="hero">
      <span className="hero-subtitle">Portfolio</span>
      <h1 className="hero-headline">
        {hero.headline}
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        {hero.subheadline}
      </p>
    </main>
  );
};

// --- Footer Component ---
const Footer = () => {
  const { content, loading } = useContent();
  const socialLinks = content?.socialLinks || [];

  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub />;
    if (p.includes('linkedin')) return <FaLinkedin />;
    if (p.includes('instagram')) return <FaInstagram />;
    return <FaLink />;
  };

  if (loading) {
    return (
      <footer className="footer">
        <div className="social-links">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-circle" style={{ width: '40px', height: '40px' }}></div>
          ))}
        </div>
        <div className="skeleton skeleton-text" style={{ width: '250px', height: '1rem', margin: '1rem auto 0' }}></div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link-item">
            <span className="footer-icon">{getIcon(link.platform)}</span>
            <span className="footer-text">{link.platform}</span>
          </a>
        ))}
      </div>
      <p>&copy; 2025 Gaurav Deep. All rights reserved.</p>
    </footer>
  );
};
