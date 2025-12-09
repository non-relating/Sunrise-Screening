import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Toggle dark mode"
        title="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
        )}
      </button>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-sky-900 dark:bg-slate-900 text-white backdrop-blur-md border-t border-sky-800 dark:border-slate-700 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/quote"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              Free Quote
            </a>
            <a 
              href="tel:+15551234567"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 text-center hover:border-white/50"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyCTA;