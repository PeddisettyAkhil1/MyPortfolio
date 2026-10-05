import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Cpu, UserCheck, Eye, RotateCcw, ShieldCheck, Lock, KeyRound, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import { resetAllToDefaults } from '../../lib/portfolio-service';
import { lockAdminPortal } from '../auth-service';
import { ChangePasswordModal } from './ChangePasswordModal';

interface AdminHeaderProps {
  activeTab: 'overview' | 'projects' | 'skills' | 'personal' | 'messages';
  onTabChange: (tab: 'overview' | 'projects' | 'skills' | 'personal' | 'messages') => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, onTabChange }) => {
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all portfolio data to default resume details?')) {
      resetAllToDefaults();
      toast.success('All portfolio data has been reset to defaults!');
    }
  };

  const handleLock = () => {
    lockAdminPortal();
    toast.info('Admin session locked.');
  };

  return (
    <>
      <header className="bg-[#1B1E23] text-white border-b border-white/10 sticky top-0 z-50 shadow-xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Logo & Portal Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#E65F2B] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-extrabold font-heading tracking-wide">AKHIL CMS ADMIN</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SECURE & LIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Content Management & Password Protected</p>
            </div>
          </div>

          {/* Admin Section Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-white/5 p-1 rounded-full border border-white/10 overflow-x-auto no-scrollbar scrollbar-none">
            {[
              { id: 'overview' as const, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'messages' as const, label: 'Inbox Database', icon: Inbox },
              { id: 'projects' as const, label: 'Projects CMS', icon: FolderKanban },
              { id: 'skills' as const, label: 'Skills Matrix', icon: Cpu },
              { id: 'personal' as const, label: 'Personal & Contact', icon: UserCheck },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onTabChange(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#E65F2B] text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPassModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Change Admin Passcode"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">Passcode</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-zinc-300 hover:text-red-300 border border-white/10 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Reset Data to Resume Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleLock}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              title="Lock Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>

            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-white text-[#1B1E23] hover:bg-[#FAF8F5] text-xs font-extrabold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#E65F2B]" />
              <span>User Site</span>
            </Link>
          </div>
        </div>
      </header>

      <ChangePasswordModal isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} />
    </>
  );
};
