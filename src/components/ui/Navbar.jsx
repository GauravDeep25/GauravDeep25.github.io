import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation Data
  const navLinks = [
    { name: 'My Story', href: '/#about' },
    { name: 'Magic Spells', href: '/#skills' },
    { name: 'Cool Stuff', href: '/#work' },
    { name: 'Photography', href: '/photography' },
    { name: 'Admin', href: '/admin' }
  ];

  // Theme Toggle Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDark(true);
    }
  };

  // Check if a link is active based on current path
  const isActive = (path) => location.pathname + location.hash === path;

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="glass-pill rounded-full px-6 py-3 flex items-center gap-2 sm:gap-6 pointer-events-auto transition-all duration-300 hover:shadow-lg">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-500 mr-2 sm:mr-6 hover:scale-105 transition-transform">
            Gaurav ✨
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`transition-all duration-300 hover:text-primary-500 dark:hover:text-primary-400 hover:-translate-y-0.5 ${
                  isActive(link.href) 
                  ? 'text-primary-500 dark:text-primary-400 font-bold' 
                  : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggler Button */}
          <button 
            onClick={toggleTheme}
            className="ml-auto sm:ml-4 text-slate-500 dark:text-yellow-300 hover:text-primary-500 bg-slate-100 dark:bg-slate-800 p-2 rounded-full transition-all hover:rotate-12 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden ml-2 text-slate-500 hover:text-primary-500 dark:text-slate-400 p-2 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 text-2xl font-heading font-bold transition-all duration-500
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.href} 
            onClick={() => setIsMenuOpen(false)} 
            className={`transition-all hover:text-primary-500 hover:scale-110 ${
              isActive(link.href) ? 'text-primary-500' : 'text-slate-800 dark:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/#contact" 
          onClick={() => setIsMenuOpen(false)} 
          className="text-primary-500 border-2 border-primary-500 px-8 py-2 rounded-full hover:bg-primary-500 hover:text-white transition-all"
        >
          Say Hello 👋
        </Link>
      </div>
    </>
  );
}