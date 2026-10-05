import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Sparkles, FolderKanban, Cpu, GraduationCap, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../lib/portfolio-service';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolioData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Studio', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'education', label: 'Experience', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('hero')}
            className="pointer-events-auto flex items-center space-x-3 px-3.5 py-2 rounded-full bg-white/95 dark:bg-[#1B1E23] backdrop-blur-md border border-[#E5E2DC] dark:border-white/20 shadow-md hover:border-[#E65F2B]/50 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#FAF8F5] dark:bg-[#252830] flex items-center justify-center shadow-sm p-0.5 border border-[#E5E2DC] dark:border-white/10 shrink-0">
              <img
                src="/images/logo.png"
                alt="Akhil Logo"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-[#1B1E23] dark:text-white tracking-wide font-heading leading-tight group-hover:text-[#E65F2B] transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="block text-[10px] text-[#6E6A62] dark:text-zinc-300 font-medium leading-none">
                UX & Game Dev
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="pointer-events-auto hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E2DC] shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#6E6A62] hover:text-[#1B1E23] hover:bg-[#F0EEE8]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#1B1E23]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* CTA & Social Links */}
          <div className="pointer-events-auto flex items-center space-x-2">
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2.5 rounded-full bg-white/95 dark:bg-[#1B1E23] hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#E5E2DC] shadow-sm transition-all"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2.5 rounded-full bg-white/95 dark:bg-[#1B1E23] hover:bg-[#1B1E23] text-[#1B1E23] hover:text-white border border-[#E5E2DC] shadow-sm transition-all"
              title="GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#E65F2B] text-white text-xs font-bold shadow-md hover:bg-[#d45220] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full bg-[#1B1E23] text-white text-xs font-bold shadow-md hover:bg-[#E65F2B] transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Open Admin CMS Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E2DC] text-[#1B1E23] shadow-sm hover:bg-[#F0EEE8] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-white/95 backdrop-blur-xl border border-[#E5E2DC] rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1B1E23] text-white'
                        : 'text-[#6E6A62] hover:bg-[#F0EEE8] hover:text-[#1B1E23]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
              <div className="pt-2 border-t border-[#E5E2DC] mt-2 space-y-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#E65F2B] text-white font-bold text-sm shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#1B1E23] text-white font-bold text-sm shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Open Admin CMS</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
