import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, PenTool, Palette, Code } from 'lucide-react';
import { usePortfolioData } from '../../lib/portfolio-service';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gamepad2,
  PenTool,
  Palette,
  Code,
};

export const Skills: React.FC = () => {
  const { skills: CAPABILITY_MATRIX } = usePortfolioData();
  return (
    <section id="skills" className="relative w-full max-w-[1440px] mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Section Header matching exact screenshot */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-mono tracking-[0.25em] text-[#8A857B] uppercase mb-2 font-medium"
        >
          02 // CAPABILITY MATRIX
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#1B1E23] tracking-tight mb-4"
        >
          Skills & Tooling
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm sm:text-base text-[#6E6A62] max-w-xl mx-auto leading-relaxed"
        >
          The loadout: interactive systems, prototyping tooling, visual craft and engineering fundamentals.
        </motion.p>
      </div>

      {/* 4-Column Capability Cards Grid matching exact screenshot layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITY_MATRIX.map((col, idx) => {
          const Icon = iconMap[col.iconName] || Code;
          return (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#F2F0EA] rounded-[28px] p-6 border border-[#E5E2DC] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#1B1E23] flex items-center justify-center shadow-xs border border-[#E5E2DC]/60 shrink-0">
                    <Icon className="w-5 h-5 text-[#1B1E23]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#1B1E23] leading-snug">
                    {col.title}
                  </h3>
                </div>

                {/* Proficiency Label + Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#8A857B] uppercase mb-2">
                    <span>PROFICIENCY</span>
                    <span className="font-bold text-[#1B1E23]">{col.proficiency}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-[#E5E2DC] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${col.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-[#1B1E23]"
                    />
                  </div>
                </div>

                {/* Skill Chips (White Pills) */}
                <div className="flex flex-wrap gap-2">
                  {col.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-xl bg-white text-[#1B1E23] text-xs font-semibold shadow-2xs border border-[#E5E2DC]/70 hover:border-[#1B1E23]/30 transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
