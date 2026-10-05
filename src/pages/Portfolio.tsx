import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/portfolio/Navbar';
import { Hero } from '../components/portfolio/Hero';
import { Projects } from '../components/portfolio/Projects';
import { Skills } from '../components/portfolio/Skills';
import { Education } from '../components/portfolio/Education';
import { Contact } from '../components/portfolio/Contact';
import { Creative3DLoader } from '../components/portfolio/Creative3DLoader';
import { usePortfolioData } from '../lib/portfolio-service';

export const PortfolioPage: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolioData();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('hero');

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const get3DFocusState = (): 'overview' | 'projects' | 'skills' | 'contact' => {
    if (activeTab === 'projects') return 'projects';
    if (activeTab === 'skills') return 'skills';
    if (activeTab === 'contact') return 'contact';
    return 'overview';
  };

  const isSingleScreenTab = activeTab === 'hero' || activeTab === 'skills' || activeTab === 'contact';

  return (
    <>
      <AnimatePresence>
        {isLoading && <Creative3DLoader key="portfolio-loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div className="bg-[#F7F6F3] text-[#1B1E23] selection:bg-[#E65F2B] selection:text-white min-h-screen flex flex-col justify-between">
        {/* Top Floating Navbar */}
        <Navbar activeSection={activeTab} onNavigate={handleTabChange} />

        {/* Main Tab Viewport Container */}
        <main className={`flex-1 w-full relative z-10 flex flex-col justify-center ${isSingleScreenTab ? 'pt-20 lg:pt-22 pb-2 my-auto' : 'pt-24 pb-12 justify-start'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`w-full flex-1 flex flex-col ${isSingleScreenTab ? 'justify-center my-auto' : 'justify-start'}`}
            >
              {activeTab === 'hero' && (
                <Hero onNavigate={handleTabChange} active3DFocus={get3DFocusState()} />
              )}
              {activeTab === 'projects' && <Projects />}
              {activeTab === 'skills' && <Skills />}
              {activeTab === 'education' && <Education />}
              {activeTab === 'contact' && <Contact />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className={`px-4 sm:px-6 lg:px-8 border-t border-[#E5E2DC] bg-white text-xs text-[#6E6A62] shrink-0 ${isSingleScreenTab ? 'py-3 mt-2' : 'py-6 mt-12'}`}>
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#1B1E23] font-heading">{PERSONAL_INFO.name}</span>
              <span>© {new Date().getFullYear()} — All Rights Reserved.</span>
            </div>

            <div className="flex items-center space-x-1 font-medium">
              <span>UX Designer & Game Developer Portfolio</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
