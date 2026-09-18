import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-xs focus:outline-none hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Sun className="w-4 h-4 text-amber-400 dark:text-amber-300" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Moon className="w-4 h-4 text-stone-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
