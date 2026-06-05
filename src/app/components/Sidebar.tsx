'use client';

import React from 'react';
import {
  Settings,
  BookOpen,
  Award,
  Home as HomeIcon,
  MessageSquare,
  FileText,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeNav: 'home' | 'templates' | 'reviewers' | 'drafts';
  setActiveNav: (nav: 'home' | 'templates' | 'reviewers' | 'drafts') => void;
  handleNewAnalysis: () => void;
  setIsSettingsOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeNav,
  setActiveNav,
  handleNewAnalysis,
  setIsSettingsOpen,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Top Header (Hidden on desktop) */}
      <div className="md:hidden bg-white border-b border-[#e2e8f0] px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm w-full">
        <h1 className="text-lg font-bold text-[#0f172a] tracking-tight">EssaiAI</h1>
        <p className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">V3.5 Engine</p>
      </div>

      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[#e2e8f0] flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#e2e8f0]">
            <h2 className="text-xl font-black text-[#0f172a] tracking-tight">
              EssaiAI
            </h2>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-1 uppercase mb-3">
              V3.5 Academic Engine
            </p>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              A stateless, privacy-first academic writing assistant. Analyze grammar, style, and structure instantly.
            </p>
          </div>

          {/* New Analysis Trigger */}
          <div className="p-4">
            <button
              onClick={handleNewAnalysis}
              className="w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 flex flex-col gap-0.5">
            <button
              onClick={() => setActiveNav('home')}
              className={`sidebar-link ${activeNav === 'home' ? 'active' : ''}`}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => setActiveNav('drafts')}
              className={`sidebar-link ${activeNav === 'drafts' ? 'active' : ''}`}
            >
              <FileText className="h-4 w-4" />
              Drafts
            </button>
            <button
              onClick={() => setActiveNav('templates')}
              className={`sidebar-link ${activeNav === 'templates' ? 'active' : ''}`}
            >
              <BookOpen className="h-4 w-4" />
              Templates
            </button>
            <button
              onClick={() => setActiveNav('reviewers')}
              className={`sidebar-link ${activeNav === 'reviewers' ? 'active' : ''}`}
            >
              <Award className="h-4 w-4" />
              Reviewers
            </button>
          </nav>
        </div>

        {/* Footer anchors */}
        <div className="p-4 border-t border-[#e2e8f0] flex flex-col gap-0.5">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="sidebar-link w-full py-2 hover:bg-gray-50 rounded-lg text-left"
          >
            <Settings className="h-4 w-4" />
            Key Settings
          </button>
          <button
            onClick={() => alert('Feedback panel coming soon!')}
            className="sidebar-link py-2 w-full text-left"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </button>
        </div>
      </aside>

      {/* Mobile Floating Bottom Nav (Hidden on desktop) */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm">
        <div className="bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex items-center justify-between">
          <button
            onClick={() => setActiveNav('home')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all ${activeNav === 'home' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <HomeIcon className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setActiveNav('drafts')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all ${activeNav === 'drafts' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <FileText className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNewAnalysis}
            className="p-4 -mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all border-4 border-[#f4f6fc]"
          >
            <Plus className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveNav('templates')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all ${activeNav === 'templates' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <BookOpen className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full flex flex-col items-center justify-center transition-all text-gray-500 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
