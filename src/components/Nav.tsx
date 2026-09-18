import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { Profile } from '../types';
import { Menu, X } from 'lucide-react';

interface NavProps {
  profile?: Profile | null;
}

export function Nav({ profile }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const name = profile?.name || 'Gaurav Deep';
  const role = profile?.role || 'Software Developer & Cybersecurity Enthusiast';

  const navItems = [
    { to: '/', label: 'Home', end: true, id: 'nav-home' },
    { to: '/work', label: 'Work', end: false, id: 'nav-work' },
    { to: '/photography', label: 'Photography', end: false, id: 'nav-photography' },
    { to: '/log', label: 'Log', end: false, id: 'nav-log' },
    { to: '/about', label: 'About', end: false, id: 'nav-about' },
  ];

  return (
    <header className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 max-w-7xl mx-auto border-b border-stone-200 dark:border-stone-800/50 mb-8 sm:mb-12">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <div>
          <Link
            to="/"
            id="nav-brand"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-stone-950 dark:text-stone-50 hover:opacity-85 transition-opacity inline-block rounded-xs focus-visible:ring-2 focus-visible:ring-stone-500"
          >
            {name}
          </Link>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5 font-sans font-medium line-clamp-1">
            {role}
          </p>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm">
          <nav className="flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                id={item.id}
                className={({ isActive }) =>
                  isActive
                    ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-950 dark:border-white pb-1 transition-all rounded-xs'
                    : 'text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white font-medium transition-colors pb-1 rounded-xs'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-0.5 pl-2 border-l border-stone-200 dark:border-stone-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Actions: Theme Toggle + Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors rounded-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden mt-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col space-y-1"
          >
            {navItems.map((item, idx) => {
              const isActive = item.end
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 text-sm font-sans rounded-xs transition-colors ${
                      isActive
                        ? 'bg-stone-200/80 dark:bg-stone-800/80 text-stone-950 dark:text-white font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-950 dark:hover:text-white font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-stone-950 dark:bg-white" />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
