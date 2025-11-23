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
  const { content } = useContent();
  const hero = content?.hero || {};

  return (
    <main className="hero">
      <span className="hero-subtitle">Portfolio</span>
      <h1 className="hero-headline">
        {hero.headline || 'Creating digital experiences with elegance and code.'}
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        {hero.subheadline || 'I am a passionate developer focused on building clean, efficient, and accessible web applications.'}
      </p>
    </main>
  );
};

// --- Footer Component ---
const Footer = () => {
  const { content } = useContent();
  const socialLinks = content?.socialLinks || [];

  // Fallback URLs
  const defaultLinks = [
    { platform: 'github', url: 'https://github.com/GauravDeep25' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/gauravdeep25' },
    { platform: 'instagram', url: 'https://instagram.com/gaurav.d.jpg' }
  ];

  const linksToDisplay = socialLinks.length > 0 ? socialLinks : defaultLinks;

  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <FaGithub />;
    if (p.includes('linkedin')) return <FaLinkedin />;
    if (p.includes('instagram')) return <FaInstagram />;
    return <FaLink />;
  };

  return (
    <footer className="footer">
      <div className="social-links">
        {linksToDisplay.map((link, index) => (
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
