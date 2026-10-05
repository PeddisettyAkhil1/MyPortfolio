import React, { useState, useEffect, useCallback } from 'react';
import { Inbox, Mail, Search, Trash2, CheckCircle2, User, Clock, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import {
  getStoredContactMessages,
  markMessageAsRead,
  deleteContactMessage,
  clearAllMessages,
  type ContactMessage,
} from '../../lib/contact-service';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>(getStoredContactMessages);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshMessages = useCallback(() => {
    const list = getStoredContactMessages();
    setMessages(list);
    if (selectedMsg) {
      const updatedSel = list.find((m) => m.id === selectedMsg.id);
      if (updatedSel) setSelectedMsg(updatedSel);
    }
  }, [selectedMsg]);

  useEffect(() => {
    window.addEventListener('portfolio-data-updated', refreshMessages);
    return () => window.removeEventListener('portfolio-data-updated', refreshMessages);
  }, [refreshMessages]);

  useEffect(() => {
    if (messages.length > 0 && !selectedMsg) {
      setSelectedMsg(messages[0]);
    }
  }, [messages, selectedMsg]);

  const handleSelectMsg = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      markMessageAsRead(msg.id);
      refreshMessages();
    }
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this contact submission from the database?')) {
      deleteContactMessage(id);
      toast.success('Message deleted from database.');
      refreshMessages();
      if (selectedMsg?.id === id) {
        setSelectedMsg(null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL contact form submissions from the database?')) {
      clearAllMessages();
      toast.success('Database inbox cleared.');
      setMessages([]);
      setSelectedMsg(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'unread' ? !m.isRead : m.isRead;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-3xl border border-[#E5E2DC] shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold font-heading text-[#1B1E23] flex items-center space-x-2">
              <Inbox className="w-6 h-6 text-[#E65F2B]" />
              <span>Contact Messages Database</span>
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E65F2B] text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#6E6A62] mt-1">
            Real-time inbox storing user submissions & automated email dispatch records.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {messages.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Inbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Inbox Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Message List */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-[#E5E2DC] shadow-sm space-y-4">
          {/* Search & Filter Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6A62]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages by name, email, or subject..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#E5E2DC] text-xs font-medium text-[#1B1E23] focus:outline-none focus:border-[#E65F2B]"
              />
            </div>

            <div className="flex items-center space-x-1.5 bg-[#F7F6F3] p-1 rounded-xl border border-[#E5E2DC]">
              {(['all', 'unread', 'read'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-white text-[#1B1E23] shadow-xs'
                      : 'text-[#6E6A62] hover:text-[#1B1E23]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-2">
                <MessageSquare className="w-8 h-8 text-[#8A857B] mx-auto opacity-50" />
                <p className="text-xs font-bold text-[#6E6A62]">No messages found in database.</p>
                <p className="text-[11px] text-[#8A857B]">Form submissions from your portfolio will appear here live.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMsg?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMsg(msg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1E23] text-white border-[#1B1E23] shadow-md'
                        : msg.isRead
                        ? 'bg-[#F7F6F3] text-[#1B1E23] border-[#E5E2DC] hover:border-[#1B1E23]/30'
                        : 'bg-amber-50/70 border-amber-200/80 text-[#1B1E23]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center space-x-2 truncate">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#E65F2B] shrink-0" />
                        )}
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#1B1E23]'}`}>
                          {msg.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-zinc-400' : 'text-[#6E6A62]'}`}>
                        {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <div className={`text-xs font-semibold truncate mb-1 ${isSelected ? 'text-amber-400' : 'text-[#E65F2B]'}`}>
                      {msg.subject}
                    </div>

                    <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-[#6E6A62]'}`}>
                      {msg.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Reader View */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E2DC] shadow-sm min-h-[500px] flex flex-col justify-between">
          {selectedMsg ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b border-[#E5E2DC]">
                  <div>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-100 text-emerald-800 mb-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>STORED IN DATABASE</span>
                    </span>
                    <h3 className="text-xl font-bold font-heading text-[#1B1E23]">
                      {selectedMsg.subject}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(selectedMsg.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-red-600 border border-red-200 transition-colors cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F6F3] p-4 rounded-2xl border border-[#E5E2DC] my-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#1B1E23] flex items-center justify-center font-bold text-sm shadow-xs border border-[#E5E2DC]">
                      <User className="w-5 h-5 text-[#E65F2B]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#6E6A62] uppercase tracking-wider">Sender Name</div>
                      <div className="text-xs font-bold text-[#1B1E23]">{selectedMsg.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#1B1E23] flex items-center justify-center font-bold text-sm shadow-xs border border-[#E5E2DC]">
                      <Mail className="w-5 h-5 text-[#E65F2B]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-[#6E6A62] uppercase tracking-wider">Sender Email</div>
                      <div className="text-xs font-mono font-bold text-[#1B1E23]">{selectedMsg.email}</div>
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center space-x-2 text-xs text-[#6E6A62] font-mono mb-6">
                  <Clock className="w-3.5 h-3.5 text-[#E65F2B]" />
                  <span>Received: {new Date(selectedMsg.createdAt).toLocaleString()}</span>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#1B1E23] uppercase tracking-wider font-mono">
                    Message Description & Details
                  </h4>
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E2DC] text-xs sm:text-sm text-[#1B1E23] leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedMsg.message}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E5E2DC] flex items-center justify-between flex-wrap gap-4">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re:%20${encodeURIComponent(selectedMsg.subject)}&body=Hi%20${encodeURIComponent(selectedMsg.name)},%0A%0AThank%20you%20for%20reaching%20out!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Reply via Email to {selectedMsg.email}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
              <Mail className="w-12 h-12 text-[#8A857B] opacity-40" />
              <h3 className="text-base font-bold text-[#1B1E23]">Select a Message to View Details</h3>
              <p className="text-xs text-[#6E6A62] max-w-sm">
                Click on any inquiry from the left list to read the full description and trigger direct reply emails.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
