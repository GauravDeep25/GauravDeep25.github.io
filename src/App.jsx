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
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme;
    const themeColor = theme === 'light' ? '#f8f9fa' : '#1a1a1a';
    
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
    <div data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MainContent />
      <About />
      <Projects /> 
      <Contact /> 
      <Footer />
    </div>
  );
}

// --- Navbar Component ---
const Navbar = ({ theme, toggleTheme, isMenuOpen, toggleMenu }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? '' : section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#', label: 'Home', section: 'home' },
    { href: '#about', label: 'About', section: 'about' },
    { href: '#projects', label: 'Projects', section: 'projects' },
    { href: '#contact', label: 'Contact', section: 'contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo">Gaurav Deep</a>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.section} className="nav-item">
              <a 
                href={item.href} 
                className={`nav-link ${activeSection === item.section ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.section);
                  if (isMenuOpen) toggleMenu();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Theme Toggle Button ---
const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
    {theme === 'light' ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// --- Main Content Component ---
const MainContent = () => (
  <main className="hero">
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-headline">
          Crafting secure and scalable digital solutions with code and creativity.
        </h1>
        <p className="hero-subheadline">
          Hi, I'm Gaurav Deep. I am a Computer Science Engineering student specializing in IoT, Cybersecurity, and Blockchain Technology.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="cta-button primary">View My Work</a>
          <a href="#contact" className="cta-button secondary">Get In Touch</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-blob"></div>
        <img 
          src="/Me.png" 
          alt="Gaurav Deep - Creative Developer" 
          className="hero-profile-img"
        />
      </div>
    </div>
  </main>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="social-links">
        <a href={import.meta.env.VITE_GITHUB_URL || "https://github.com/GauravDeep25"} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href={import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/gauravdeep25"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href={import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/gaurav.d.jpg"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
      <p>&copy; 2024 Gaurav Deep. All rights reserved.</p>
    </div>
  </footer>
);
