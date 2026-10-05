import React, { useState } from 'react';
import { UserCheck, Save, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { usePortfolioData } from '../../lib/portfolio-service';

export const AdminPersonalInfo: React.FC = () => {
  const { personalInfo, savePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({ ...personalInfo });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePersonalInfo(formData);
    toast.success('Personal & Contact details updated successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#1B1E23] flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-[#E65F2B]" />
            <span>Personal & Contact Info CMS</span>
          </h2>
          <p className="text-xs text-[#6E6A62] mt-1">
            Update your public profile bio, email, phone, location, and social links.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-full bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Contact Info</span>
        </button>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E2DC] shadow-sm space-y-6">
        <h3 className="text-lg font-bold font-heading text-[#1B1E23] border-b border-[#E5E2DC] pb-3">
          1. Public Identity & Bio
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1">
              Full Name <span className="text-[#E65F2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* Role Headline */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1">
              Job Role Headline <span className="text-[#E65F2B]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-bold text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* Tagline */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#1B1E23] mb-1">
              Hero Tagline Paragraph <span className="text-[#E65F2B]">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
            />
          </div>

          {/* Full Bio */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#1B1E23] mb-1">
              Full Bio Paragraph
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B] resize-none"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold font-heading text-[#1B1E23] border-b border-[#E5E2DC] pb-3 pt-4">
          2. Direct Contact Details & Social Profiles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#E65F2B]" />
              <span>Direct Email Address <span className="text-[#E65F2B]">*</span></span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E65F2B]" />
              <span>Phone / WhatsApp Number <span className="text-[#E65F2B]">*</span></span>
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E65F2B]" />
              <span>Location (City, Country)</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-xs font-bold text-[#1B1E23] mb-1 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="text"
              value={formData.social.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social: { ...formData.social, linkedin: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>

          {/* GitHub URL */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#1B1E23] mb-1 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#1B1E23]" />
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="text"
              value={formData.social.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  social: { ...formData.social, github: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-mono text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#E5E2DC]">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Personal & Contact Details</span>
          </button>
        </div>
      </form>
    </div>
  );
};
