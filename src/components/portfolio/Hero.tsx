import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FolderKanban, Send, Gamepad2, Layout } from 'lucide-react';
import { STATS } from '../../lib/portfolio-data';
import { usePortfolioData } from '../../lib/portfolio-service';
import { HeroScene3D } from './HeroScene3D';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  active3DFocus: 'overview' | 'projects' | 'skills' | 'contact';
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, active3DFocus }) => {
  const { personalInfo: PERSONAL_INFO } = usePortfolioData();
  return (
    <section id="hero" className="relative w-full max-w-[1440px] mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch my-auto">
        {/* Left Column: Headline, Info, Action Buttons & Integrated Stats */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4 z-10">
          <div className="space-y-4">
            {/* Eyebrow Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2DC] shadow-xs text-xs font-semibold text-[#1B1E23]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for UI/UX & Unity Projects</span>
            </motion.div>

            {/* Main Name & Role Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#1B1E23] tracking-tight leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#E65F2B] mt-1.5 font-heading">
                {PERSONAL_INFO.role}
              </p>
            </motion.div>

            {/* Tagline Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-sm sm:text-base text-[#6E6A62] max-w-xl leading-relaxed font-medium"
            >
              {PERSONAL_INFO.tagline}
            </motion.p>

            {/* Specialization Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              <span className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] flex items-center space-x-1.5 shadow-2xs">
                <Layout className="w-3.5 h-3.5 text-[#E65F2B]" />
                <span>UI/UX Product Design</span>
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] flex items-center space-x-1.5 shadow-2xs">
                <Gamepad2 className="w-3.5 h-3.5 text-[#E65F2B]" />
                <span>Unity C# Game Engine</span>
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] flex items-center space-x-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E65F2B]" />
                <span>Interactive WebGL & 3D</span>
              </span>
            </motion.div>

            {/* Action Buttons + Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 rounded-full bg-[#1B1E23] hover:bg-[#E65F2B] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <FolderKanban className="w-4 h-4" />
                <span>Explore Projects</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F0EEE8] text-[#1B1E23] border border-[#E5E2DC] font-bold text-xs sm:text-sm shadow-2xs transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              {/* LinkedIn & GitHub Links */}
              <div className="flex items-center space-x-2 pl-1">
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#E5E2DC] shadow-2xs transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-[#1B1E23] text-[#1B1E23] hover:text-white border border-[#E5E2DC] shadow-2xs transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Integrated Stats Counter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-3xl bg-white border border-[#E5E2DC] shadow-sm"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center p-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-[#1B1E23] leading-tight">
                  {s.value}
                </div>
                <div className="text-xs text-[#6E6A62] font-semibold leading-tight mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Canvas Container (Stretches to match left column height) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 h-full min-h-[380px] lg:min-h-[440px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#EFECE6] to-[#E5E1D8] border border-[#E5E2DC] shadow-xl flex flex-col"
        >
          {/* 3D Scene */}
          <HeroScene3D activeFocus={active3DFocus} />

          {/* Personal Suit Photo Overlay */}
          <div className="absolute top-4 right-4 z-20 flex items-center space-x-3 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-[#E5E2DC] shadow-lg">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F0EEE8] shrink-0 border border-[#E5E2DC]">
              <img
                src={PERSONAL_INFO.images.portrait}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pr-2">
              <div className="text-xs sm:text-sm font-bold text-[#1B1E23] leading-tight font-heading">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[10px] sm:text-xs text-[#6E6A62] font-semibold">Vijayawada, IN</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
