import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border cursor-pointer ${
        isDark
          ? 'text-amber-400 bg-slate-800/80 border-slate-700 hover:bg-slate-700 hover:border-amber-400/40 shadow-xs'
          : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-blue-300 shadow-xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-90 animate-in fade-in" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:text-blue-600 transition-transform duration-300 hover:-rotate-12 animate-in fade-in" />
      )}
    </button>
  );
};

export default ThemeToggle;
