import React, { useState, useEffect } from 'react';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './pages/AdminOverview';
import { AdminProjects } from './pages/AdminProjects';
import { AdminSkills } from './pages/AdminSkills';
import { AdminPersonalInfo } from './pages/AdminPersonalInfo';
import { AdminMessages } from './pages/AdminMessages';
import { AdminLockScreen } from './pages/AdminLockScreen';
import { isAdminAuthenticated } from './auth-service';

export const AdminLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'personal' | 'messages'>('overview');

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(isAdminAuthenticated());
    };
    window.addEventListener('admin-auth-changed', handleAuthChange);
    return () => window.removeEventListener('admin-auth-changed', handleAuthChange);
  }, []);

  if (!isAuthenticated) {
    return <AdminLockScreen onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1B1E23] flex flex-col selection:bg-[#E65F2B] selection:text-white">
      {/* Top Admin Header Bar */}
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Admin Tab Viewport */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <AdminOverview onNavigate={setActiveTab} />}
        {activeTab === 'messages' && <AdminMessages />}
        {activeTab === 'projects' && <AdminProjects />}
        {activeTab === 'skills' && <AdminSkills />}
        {activeTab === 'personal' && <AdminPersonalInfo />}
      </main>

      {/* Admin Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-[#E5E2DC] bg-white text-xs text-[#6E6A62]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-[11px]">
            AKHIL PORTFOLIO CMS v1.0 — Password Protected Real-Time LocalStorage Sync Engine
          </div>
          <div>
            Logged in as Admin | <a href="/" className="text-[#E65F2B] font-bold hover:underline">Return to User Site</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
