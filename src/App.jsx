import React, { useState, useEffect } from 'react';
import './App.css';
import About from './components/about.jsx';
import Projects from './components/projects.jsx';
import Contact from './components/contact.jsx';

// --- Main App Component ---
export default function App() {
  // State for managing the color theme ('light' or 'dark')
  const [theme, setTheme] = useState('dark');
  // State for managing the mobile navigation menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect to update the body class and meta tags when the theme changes
  useEffect(() => {
    document.body.className = theme;
    const themeColor = theme === 'light' ? '#f8f9fa' : '#121212';
    
    // Update or create theme-color meta tag for browser UI theming
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = themeColor;

    // --- SEO Optimization ---
    // Dynamically set title and meta description
    document.title = "Gaurav Deep - Creative Developer Portfolio";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if(!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Welcome to the portfolio of Gaurav Deep, a creative developer specializing in modern web applications with React and Vite. Discover my projects and skills.";

  }, [theme]);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MainContent />
      <About />
      <Projects /> 
      <Contact /> 
      <Footer />
    </>
  );
}

// --- Navbar Component ---
const Navbar = ({ theme, toggleTheme, isMenuOpen, toggleMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="nav-logo">Gaurav Deep</a>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item"><a href="#" className="nav-links" onClick={() => isMenuOpen && toggleMenu()}>Home</a></li>
          <li className="nav-item"><a href="#about" className="nav-links" onClick={() => isMenuOpen && toggleMenu()}>About</a></li>
          <li className="nav-item"><a href="#projects" className="nav-links" onClick={() => isMenuOpen && toggleMenu()}>Projects</a></li>
          <li className="nav-item"><a href="#contact" className="nav-links" onClick={() => isMenuOpen && toggleMenu()}>Contact</a></li>
        </ul>
        <div className="nav-controls">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'animate' : ''}`}></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Theme Toggle Button ---
const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
    {theme === 'light' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    )}
  </button>
);

// --- Main Content (Landing Page Hero) ---
const MainContent = () => {
  return (
    <main className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-headline">Crafting secure and scalable digital solutions with code and creativity.</h1>
          <p className="hero-subheadline">
            Hi, I'm Gaurav Deep. I am a Computer Science Engineering student specializing in IoT, Cybersecurity, and Blockchain Technology.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="cta-button primary">View My Work</a>
            <a href="#contact" className="cta-button secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-visual">
            <div className="visual-blob">
              <img 
                src="/Me.png" 
                alt="A profile picture of Gaurav Deep" 
                className="hero-profile-img"
              />
            </div>
        </div>
      </div>
    </main>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
            <a href={import.meta.env.VITE_GITHUB_URL || "#"} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg></a>
            <a href={import.meta.env.VITE_LINKEDIN_URL || "#"} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href={import.meta.env.VITE_INSTAGRAM_URL || "#"} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
        </div>
        <p>&copy; {new Date().getFullYear()} Gaurav Deep. All rights reserved.</p>
      </div>
    </footer>
  );
};