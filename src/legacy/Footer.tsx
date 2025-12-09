import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Shield, Star, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <circle cx="50" cy="50" r="30" fill="#fbbf24" />
                  <path d="M50 20 L20 80 L80 80 Z" fill="#ffffff" opacity="0.95" transform="translate(0, 5) scale(0.6) translate(35, 15)" />
                  <path d="M10 70 Q 30 60, 50 70 T 90 70" stroke="#0ea5e9" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path d="M10 85 Q 30 75, 50 85 T 90 85" stroke="#0369a1" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight uppercase">Sunrise</span>
                <span className="text-xs font-bold tracking-widest uppercase opacity-90">Screening</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Licensed & Insured in Pinellas County. Making Florida backyards beautiful since 2010.
            </p>
            <div className="flex items-center gap-2 text-amber-400">
              <Shield size={20} />
              <span className="text-sm font-semibold">Licensed & Insured</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { name: 'Services', href: '#services' },
                { name: 'Why Choose Us', href: '#why-us' },
                { name: 'Reviews', href: '#reviews' },
                { name: 'Contact', href: '#contact' },
                { name: 'Customer Portal', href: '/portal' },
                { name: 'Get Quote', href: '/quote' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-300 hover:text-amber-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={18} className="text-amber-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-amber-400" />
                <a href="mailto:info@sunrisescreening.com" className="hover:text-white transition-colors">
                  info@sunrisescreening.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={18} className="text-amber-400" />
                <span>St. Petersburg, FL</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Clock size={18} className="text-amber-400" />
                <span>Mon-Fri: 8AM-5PM</span>
              </div>
            </div>
          </motion.div>

          {/* Service Areas & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Service Areas</h3>
            <div className="space-y-2 text-slate-300">
              {[
                'St. Petersburg',
                'Clearwater',
                'Tampa',
                'Largo',
                'Pinellas Park'
              ].map((area) => (
                <div key={area} className="text-sm">{area}</div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-bold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Twitter, href: '#', label: 'Twitter' }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {currentYear} Sunrise Screening. All rights reserved.
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-amber-400" fill="currentColor" />
                <span>4.9/5 Rating</span>
              </div>
              <span>•</span>
              <span>500+ Projects Completed</span>
              <span>•</span>
              <span>10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-400 text-slate-900 p-3 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;