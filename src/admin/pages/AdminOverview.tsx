import React from 'react';
import { FolderKanban, Cpu, UserCheck, Sparkles, ArrowRight, CheckCircle2, Inbox } from 'lucide-react';
import { usePortfolioData } from '../../lib/portfolio-service';
import { getStoredContactMessages } from '../../lib/contact-service';

interface AdminOverviewProps {
  onNavigate: (tab: 'projects' | 'skills' | 'personal' | 'messages') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { projects, skills } = usePortfolioData();
  const messages = getStoredContactMessages();
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B1E23] to-[#2D323A] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E65F2B] text-white uppercase tracking-wider inline-block mb-3">
            CMS CONTROL CENTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight mb-2">
            Welcome to Akhil's Admin Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Manage your interactive portfolio content, edit projects, update skills, and view incoming contact form messages in real-time.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block opacity-10">
          <Sparkles className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DC] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6A62] block">Total Projects</span>
            <span className="text-3xl font-extrabold text-[#1B1E23] font-heading mt-1 block">
              {projects.length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E65F2B]/10 text-[#E65F2B] flex items-center justify-center shrink-0">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DC] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6A62] block">Inquiries Database</span>
            <span className="text-3xl font-extrabold text-[#1B1E23] font-heading mt-1 block flex items-center space-x-2">
              <span>{messages.length}</span>
              {unreadCount > 0 && (
                <span className="text-xs font-bold text-white bg-[#E65F2B] px-2 py-0.5 rounded-full font-mono">
                  {unreadCount} new
                </span>
              )}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DC] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6A62] block">Capability Columns</span>
            <span className="text-3xl font-extrabold text-[#1B1E23] font-heading mt-1 block">
              {skills.length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DC] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6E6A62] block">Sync Status</span>
            <span className="text-xs font-bold text-emerald-600 font-mono mt-1 block flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real-Time Active</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Section Editor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Messages Inbox Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm flex flex-col justify-between hover:border-[#E65F2B]/50 transition-all group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#1B1E23] text-white flex items-center justify-center mb-4 shadow-sm">
              <Inbox className="w-5 h-5 text-[#E65F2B]" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#1B1E23] mb-2">Inquiries Database</h3>
            <p className="text-xs text-[#6E6A62] leading-relaxed mb-6">
              View stored user submissions, read message descriptions, copy visitor contact details, and reply directly.
            </p>
          </div>
          <button
            onClick={() => onNavigate('messages')}
            className="w-full py-3 rounded-xl bg-[#F7F6F3] group-hover:bg-[#E65F2B] group-hover:text-white text-[#1B1E23] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View Inbox ({messages.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects CMS Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm flex flex-col justify-between hover:border-[#E65F2B]/50 transition-all group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#1B1E23] text-white flex items-center justify-center mb-4 shadow-sm">
              <FolderKanban className="w-5 h-5 text-[#E65F2B]" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#1B1E23] mb-2">Projects & Case Studies</h3>
            <p className="text-xs text-[#6E6A62] leading-relaxed mb-6">
              Add new projects, update project titles, descriptions, metrics, deliverables, tags, cover images, and category labels.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="w-full py-3 rounded-xl bg-[#F7F6F3] group-hover:bg-[#E65F2B] group-hover:text-white text-[#1B1E23] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Manage Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skills CMS Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm flex flex-col justify-between hover:border-[#E65F2B]/50 transition-all group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#1B1E23] text-white flex items-center justify-center mb-4 shadow-sm">
              <Cpu className="w-5 h-5 text-[#E65F2B]" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#1B1E23] mb-2">Skills Matrix</h3>
            <p className="text-xs text-[#6E6A62] leading-relaxed mb-6">
              Edit capability matrix columns, proficiency percentages, and add or remove skill chips for Game Dev, UX/UI, Visuals, and Engineering.
            </p>
          </div>
          <button
            onClick={() => onNavigate('skills')}
            className="w-full py-3 rounded-xl bg-[#F7F6F3] group-hover:bg-[#E65F2B] group-hover:text-white text-[#1B1E23] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Edit Skills Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Personal & Contact Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm flex flex-col justify-between hover:border-[#E65F2B]/50 transition-all group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#1B1E23] text-white flex items-center justify-center mb-4 shadow-sm">
              <UserCheck className="w-5 h-5 text-[#E65F2B]" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#1B1E23] mb-2">Personal & Contact Info</h3>
            <p className="text-xs text-[#6E6A62] leading-relaxed mb-6">
              Update your name, job role headline, tagline, full bio, direct email, phone number, location, and social links (LinkedIn, GitHub).
            </p>
          </div>
          <button
            onClick={() => onNavigate('personal')}
            className="w-full py-3 rounded-xl bg-[#F7F6F3] group-hover:bg-[#E65F2B] group-hover:text-white text-[#1B1E23] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Edit Contact Info</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
