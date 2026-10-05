import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioData } from '../../lib/portfolio-service';
import { submitContactFormMessage } from '../../lib/contact-service';

export const Contact: React.FC = () => {
  const { personalInfo: PERSONAL_INFO } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      toast.success('Email address copied to clipboard!');
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      toast.success('Phone number copied to clipboard!');
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Store in Database & 2. Dispatch Dual Emails (Admin Notification + User Confirmation)
      submitContactFormMessage(formData);

      setIsSubmitting(false);
      toast.success('Message sent & saved to database! Confirmation email sent to your inbox.', {
        duration: 5000,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full max-w-[1440px] mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-1 sm:py-2">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-mono tracking-[0.25em] text-[#8A857B] uppercase mb-1 font-semibold"
        >
          04 // GET IN TOUCH
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[#1B1E23] tracking-tight mb-1"
        >
          Let's Collaborate On Your Next Big Idea
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-xs sm:text-sm text-[#6E6A62] max-w-lg mx-auto leading-normal font-medium"
        >
          Whether you have a game project, UI/UX design challenge, or full-time opportunity, I'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch my-auto">
        {/* Contact Information & Profile Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E2DC] shadow-2xs flex items-center gap-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#F0EEE8] border border-[#E5E2DC] shadow-xs">
              <img
                src={PERSONAL_INFO.images.portrait}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available For Work</span>
              </span>
              <h3 className="text-base sm:text-lg font-bold font-heading text-[#1B1E23] leading-tight">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-[11px] text-[#6E6A62] mt-0.5 leading-tight font-medium">
                {PERSONAL_INFO.role}
              </p>
              <p className="text-[11px] text-[#6E6A62] mt-1 flex items-center space-x-1 font-mono">
                <MapPin className="w-3 h-3 text-[#E65F2B]" />
                <span>{PERSONAL_INFO.location}</span>
              </p>
            </div>
          </motion.div>

          {/* Quick Action Contact Cards */}
          <div className="space-y-2.5">
            {/* Email Card */}
            <div className="bg-white rounded-xl p-3 border border-[#E5E2DC] flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#E65F2B]/10 text-[#E65F2B] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-semibold text-[#6E6A62] uppercase tracking-wider">Direct Email</div>
                  <div className="text-xs font-bold text-[#1B1E23] truncate font-mono">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-lg hover:bg-[#F0EEE8] text-[#6E6A62] hover:text-[#1B1E23] transition-colors shrink-0 cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl p-3 border border-[#E5E2DC] flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#1B1E23]/10 text-[#1B1E23] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-semibold text-[#6E6A62] uppercase tracking-wider">Phone / WhatsApp</div>
                  <div className="text-xs font-bold text-[#1B1E23] truncate font-mono">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-lg hover:bg-[#F0EEE8] text-[#6E6A62] hover:text-[#1B1E23] transition-colors shrink-0 cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-white rounded-2xl p-4 border border-[#E5E2DC] shadow-2xs">
            <h4 className="text-[10px] font-bold text-[#6E6A62] uppercase tracking-wider mb-2">
              Social Profiles & Links
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-xl bg-[#F7F6F3] text-xs font-bold text-[#1B1E23] hover:bg-[#1B1E23] hover:text-white transition-all group"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2] group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2.5 rounded-xl bg-[#F7F6F3] text-xs font-bold text-[#1B1E23] hover:bg-[#1B1E23] hover:text-white transition-all group"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#181717] group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-6 border border-[#E5E2DC] shadow-2xs flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-[#1B1E23] mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#6E6A62] mb-3 font-medium">
              Fill out the form below and I will respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1B1E23] mb-1">
                  Your Name <span className="text-[#E65F2B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1B1E23] mb-1">
                  Your Email <span className="text-[#E65F2B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1B1E23] mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1B1E23] mb-1">
                Message <span className="text-[#E65F2B]">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project scope, timeline, or inquiry..."
                className="w-full px-3 py-2 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message Now</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
