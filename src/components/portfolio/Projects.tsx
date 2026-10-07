import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { type Project } from '../../lib/portfolio-data';
import { usePortfolioData } from '../../lib/portfolio-service';
import { BlockDashDemo } from './BlockDashDemo';
import { TiltCard3D } from './TiltCard3D';

export const Projects: React.FC = () => {
  const { projects: PROJECTS } = usePortfolioData();
  const [filter, setFilter] = useState<'All' | 'UI/UX' | 'Game Dev' | 'Vibe Coding'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section id="projects" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Section Header matching exact screenshot */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-mono tracking-[0.25em] text-[#8A857B] uppercase mb-2 font-medium"
        >
          01 // FEATURED WORK
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#1B1E23] tracking-tight mb-4"
        >
          Projects & Case Studies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm sm:text-base text-[#6E6A62] max-w-xl mx-auto leading-relaxed"
        >
          UX case studies, game builds, and AI vibe coding experiments — open a card for full drill-down.
        </motion.p>
      </div>

      {/* Category Filter Tabs matching exact screenshot */}
      <div className="flex items-center justify-start sm:justify-center space-x-2.5 mb-14 overflow-x-auto pb-1">
        {[
          { key: 'All' as const, label: 'ALL PROJECTS' },
          { key: 'UI/UX' as const, label: 'UI/UX DESIGN' },
          { key: 'Game Dev' as const, label: 'GAME DEVELOPMENT' },
          { key: 'Vibe Coding' as const, label: '⚡ VIBE CODING' },
        ].map((tab) => {
          const isActive = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1B1E23] text-white shadow-md'
                  : 'bg-white text-[#6E6A62] hover:bg-[#F0EEE8] hover:text-[#1B1E23] border border-[#E5E2DC]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3-Column Projects Grid matching exact screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TiltCard3D
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-[28px] overflow-hidden border border-[#E5E2DC] hover:border-[#E65F2B]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Cover Image Container with Monospaced Badges */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-[27px] bg-[#F0EEE8]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {/* Top Left Badge */}
                  {project.badgeTopLeft && (
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/80 text-[#1B1E23] backdrop-blur-md border border-white/80 shadow-xs">
                        {project.badgeTopLeft}
                      </span>
                    </div>
                  )}

                  {/* Top Right Badge */}
                  {project.badgeTopRight && (
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#1B1E23] text-white shadow-xs">
                        {project.badgeTopRight}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body & Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Subcategory Label */}
                    <div className="text-[11px] font-mono font-medium tracking-widest text-[#8A857B] uppercase mb-1.5">
                      {project.subCategory || project.category}
                    </div>

                    {/* Display Title */}
                    <h3 className="text-lg font-bold font-heading text-[#1B1E23] group-hover:text-[#E65F2B] transition-colors mb-2 leading-snug">
                      {project.displayTitle || project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-[#6E6A62] leading-relaxed line-clamp-2 mb-6">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-[11px] font-medium bg-[#F2F0EA] text-[#1B1E23] border border-[#E5E2DC]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Case Study ↗ Link */}
                    <div className="flex items-center space-x-1 text-xs font-bold text-[#1B1E23] group-hover:text-[#E65F2B] transition-colors pt-2 border-t border-[#F2F0EA]">
                      <span>View case study</span>
                      <span className="text-sm font-mono transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State Banner when Category has 0 Projects */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E2DC] shadow-sm text-center my-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#E65F2B]/10 text-[#E65F2B] flex items-center justify-center mx-auto mb-4 border border-[#E65F2B]/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-heading text-[#1B1E23] mb-2">
            Vibe Coding Showcase Ready
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6A62] max-w-md mx-auto leading-relaxed">
            AI-assisted rapid prototypes & vibe coding builds will appear here. Add new Vibe Coding projects anytime directly from the Admin CMS!
          </p>
        </motion.div>
      )}

      {/* Drill-down Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-8 border border-[#E5E2DC]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#E5E2DC] sticky top-0 bg-white/95 backdrop-blur-md z-20">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65F2B]">
                    {selectedProject.subCategory || selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-[#1B1E23]">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-[#F2F0EA] text-[#6E6A62] hover:text-[#1B1E23] transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
                {/* Interactive Demo Player (If present) */}
                {selectedProject.interactiveDemoType === 'block-dash' && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B1E23] mb-3">
                      LIVE INTERACTIVE GAME DEMO
                    </h4>
                    <BlockDashDemo />
                  </div>
                )}

                {/* Hero Cover Image (If not game demo) */}
                {selectedProject.interactiveDemoType !== 'block-dash' && (
                  <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-[#F2F0EA]">
                    <img
                      src={selectedProject.coverImage}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Metrics Highlights Grid */}
                <div className="grid grid-cols-3 gap-4 bg-[#F7F6F3] p-6 rounded-2xl border border-[#E5E2DC]">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xl sm:text-2xl font-extrabold font-heading text-[#1B1E23]">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#6E6A62] font-medium mt-1 font-mono">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Overview & Story */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold font-heading text-[#1B1E23]">Project Summary</h4>
                  <p className="text-sm text-[#6E6A62] leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50/60 p-6 rounded-2xl border border-red-100">
                    <h5 className="text-sm font-bold text-red-900 mb-2">The Challenge</h5>
                    <p className="text-xs text-red-800 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100">
                    <h5 className="text-sm font-bold text-emerald-900 mb-2">The Solution</h5>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B1E23] mb-3">
                    DELIVERABLES & OUTPUTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#F7F6F3] text-xs font-medium text-[#1B1E23]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E65F2B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
