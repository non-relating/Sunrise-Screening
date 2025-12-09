import React from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks';
import { useAuthStore, useUIStore } from '@/store';
import { Phone, Menu, X, ArrowRight, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const scrolled = useScrollPosition(50);
  const { isMenuOpen, setMenuOpen } = useUIStore();
  const { isAuthenticated, logout } = useAuthStore();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.location.href = '/'}
        >
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <circle cx="50" cy="50" r="30" fill="#fbbf24" />
              <path d="M50 20 L20 80 L80 80 Z" fill="#ffffff" opacity="0.95" transform="translate(0, 5) scale(0.6) translate(35, 15)" />
              <path d="M10 70 Q 30 60, 50 70 T 90 70" stroke="#0ea5e9" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M10 85 Q 30 75, 50 85 T 90 85" stroke="#0369a1" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className={`flex flex-col leading-tight ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
            <span className="font-extrabold text-2xl tracking-tight uppercase">Sunrise</span>
            <span className="text-xs font-bold tracking-widest uppercase opacity-90">Screening</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Services', id: 'services' },
            { name: 'Why Us', id: 'why-us' },
            { name: 'Reviews', id: 'reviews' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-bold uppercase tracking-wider hover:text-amber-400 transition-colors ${
                scrolled ? 'text-slate-600' : 'text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <a 
                href="/portal"
                className="text-slate-600 hover:text-primary-600 font-medium flex items-center gap-2 transition-colors"
              >
                <User size={18} />
                Portal
              </a>
              <button
                onClick={logout}
                className="text-slate-600 hover:text-red-600 font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a 
                href="/login"
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
              >
                Login
              </a>
              <motion.a
                href="tel:+15551234567"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={18} />
                (555) 123-4567
              </motion.a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-sky-900 bg-sky-50' : 'text-white bg-white/20 backdrop-blur-sm'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        className="lg:hidden bg-white/95 backdrop-blur-xl shadow-2xl border-t border-slate-100 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {[
            { name: 'Services', id: 'services' },
            { name: 'Why Us', id: 'why-us' },
            { name: 'Reviews', id: 'reviews' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left font-bold text-slate-700 p-4 hover:bg-sky-50 rounded-xl flex justify-between items-center group"
              whileTap={{ scale: 0.98 }}
            >
              {item.name}
              <ArrowRight size={16} className="text-sky-500" />
            </motion.button>
          ))}
          
          <div className="border-t border-slate-200 pt-4 mt-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <a href="/portal" className="block p-4 bg-sky-50 text-sky-700 rounded-xl font-bold text-center">
                  Customer Portal
                </a>
                <button
                  onClick={logout}
                  className="w-full p-4 bg-red-50 text-red-700 rounded-xl font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <a href="/login" className="block p-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-center">
                  Login
                </a>
                <a 
                  href="tel:+15551234567"
                  className="block p-4 bg-sky-600 text-white rounded-xl font-bold text-center"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;