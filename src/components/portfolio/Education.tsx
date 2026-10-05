import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA, PERSONAL_INFO } from '../../lib/portfolio-data';

export const Education: React.FC = () => {
  return (
    <section id="education" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-mono tracking-[0.25em] text-[#8A857B] uppercase mb-2 font-medium"
        >
          03 // BACKGROUND & CREDENTIALS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#1B1E23] tracking-tight mb-4"
        >
          Education & Credentials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm sm:text-base text-[#6E6A62] max-w-xl mx-auto leading-relaxed"
        >
          Academic foundation in computer science paired with industry certifications and game dev conference participation.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Education Timeline & Photo Card */}
        <div className="lg:col-span-7 space-y-4">
          {EDUCATION_DATA.map((edu) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E2DC] shadow-sm relative overflow-hidden"
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E65F2B]/10 text-[#E65F2B] uppercase tracking-wider inline-block mb-2">
                    Degree
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#1B1E23]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-[#6E6A62] mt-0.5">{edu.institution}</p>
                </div>
                <div className="text-xs font-mono font-semibold bg-[#F0EEE8] px-3 py-1.5 rounded-full text-[#1B1E23]">
                  {edu.period}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6E6A62] leading-relaxed mb-6">
                {edu.description}
              </p>

              <div className="space-y-2 mb-6">
                {edu.highlights.map((h) => (
                  <div key={h} className="flex items-center space-x-2 text-xs text-[#1B1E23] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#E65F2B] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {edu.gpa && (
                <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs text-[#6E6A62]">
                  <span>Academic Record GPA</span>
                  <span className="font-bold text-[#1B1E23] font-mono text-sm">{edu.gpa}</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* IGDC Delegate Photo Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2DC] shadow-sm flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-full sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 bg-[#F0EEE8] border border-[#E5E2DC]">
              <img
                src={PERSONAL_INFO.images.delegate}
                alt="Akhil Peddisetty IGDC Delegate"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E65F2B] mb-2 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>IGDC Delegate Recognition</span>
              </div>
              <h4 className="text-lg font-bold font-heading text-[#1B1E23] mb-2">
                India Game Developer Conference
              </h4>
              <p className="text-xs text-[#6E6A62] leading-relaxed mb-4">
                Active participant at India’s premier game development summit, engaging with industry leaders, exploring real-time engine workflows, and connecting with global interactive game creators.
              </p>
              <div className="flex items-center space-x-4 text-xs font-mono text-[#1B1E23]">
                <span className="bg-[#F0EEE8] px-2.5 py-1 rounded-md font-bold">Delegate Badge</span>
                <span className="text-[#6E6A62]">Vijayawada, IN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Certifications */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-bold font-heading text-[#1B1E23] mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#E65F2B]" />
            <span>Certifications & Honors</span>
          </h3>

          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E2DC] shadow-sm hover:border-[#E65F2B]/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1B1E23] group-hover:text-[#E65F2B] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#6E6A62] mt-1">{cert.issuer}</p>
                </div>
                <span className="text-xs font-mono text-[#6E6A62] bg-[#F0EEE8] px-2.5 py-1 rounded-md shrink-0">
                  {cert.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
