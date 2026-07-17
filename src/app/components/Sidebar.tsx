'use client';

import React from 'react';
import Link from 'next/link';

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
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0E0E11] border-b border-white/8 px-5 py-4 flex items-center justify-between sticky top-0 z-40 w-full">
        <Link href="/">
          <h1 className="text-lg font-bold text-[#F3F3F5] tracking-tight hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2">
            <span className="w-[7px] h-[7px] rounded-full bg-[#F2543D] shadow-[0_0_12px_2px_rgba(242,84,61,0.3)] inline-block" />
            EssaiAI
          </h1>
        </Link>
        <p className="text-[10px] text-[#5C5C64] font-mono tracking-wider uppercase">V3.5 Engine</p>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0E0E11] border-r border-white/8 flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/8 anim-slide-left">
            <Link href="/">
              <h2 className="text-xl font-black text-[#F3F3F5] tracking-tight hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2">
                <span className="w-[7px] h-[7px] rounded-full bg-[#F2543D] shadow-[0_0_12px_2px_rgba(242,84,61,0.3)] inline-block" />
                EssaiAI
              </h2>
            </Link>
            <p className="text-[10px] text-[#FF7A60] font-mono tracking-[0.1em] mt-2 uppercase mb-3">
              V3.5 Academic Engine
            </p>
            <p className="text-xs text-[#93939B] font-sans leading-relaxed">
              A stateless, privacy-first academic writing assistant. Analyze grammar, style, and structure instantly.
            </p>
          </div>

          {/* New Analysis Trigger */}
          <div className="p-4">
            <button
              onClick={handleNewAnalysis}
              className="w-full py-3 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-95 text-white rounded-lg font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_24px_-8px_rgba(242,84,61,0.55)]"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 flex flex-col gap-0.5 px-2">
            {[
              { key: 'home', label: 'Home', Icon: HomeIcon },
              { key: 'drafts', label: 'Drafts', Icon: FileText },
              { key: 'templates', label: 'Templates', Icon: BookOpen },
              { key: 'reviewers', label: 'Reviewers', Icon: Award },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveNav(key as any)}
                className={`anim-fade-up active:scale-[0.97] transition-all duration-150 flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  activeNav === key
                    ? 'bg-[#18181C] text-[#FF7A60] border border-white/8'
                    : 'text-[#93939B] hover:bg-[#131316] hover:text-[#F3F3F5]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer anchors */}
        <div className="p-4 border-t border-white/8 flex flex-col gap-0.5">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="active:scale-[0.97] transition-transform duration-150 w-full py-2.5 px-4 rounded-lg text-left flex items-center gap-3 text-sm text-[#93939B] hover:bg-[#131316] hover:text-[#F3F3F5]"
          >
            <Settings className="h-4 w-4" />
            Key Settings
          </button>
          <button
            onClick={() => alert('Feedback panel coming soon!')}
            className="active:scale-[0.97] transition-transform duration-150 w-full py-2.5 px-4 rounded-lg text-left flex items-center gap-3 text-sm text-[#93939B] hover:bg-[#131316] hover:text-[#F3F3F5]"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </button>
        </div>
      </aside>

      {/* Mobile Floating Bottom Nav */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm">
        <div className="bg-[#0E0E11]/90 backdrop-blur-lg border border-white/8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-2 flex items-center justify-between">
          <button
            onClick={() => setActiveNav('home')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 ${activeNav === 'home' ? 'bg-[#F2543D] text-white' : 'text-[#93939B] hover:bg-[#131316]'}`}
          >
            <HomeIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() => setActiveNav('drafts')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 ${activeNav === 'drafts' ? 'bg-[#F2543D] text-white' : 'text-[#93939B] hover:bg-[#131316]'}`}
          >
            <FileText className="h-5 w-5" />
          </button>

          <button
            onClick={handleNewAnalysis}
            className="p-4 -mt-6 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] text-white rounded-full flex flex-col items-center justify-center shadow-lg transition-all active:scale-90 border-4 border-[#08080A]"
          >
            <Plus className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveNav('templates')}
            className={`p-3 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 ${activeNav === 'templates' ? 'bg-[#F2543D] text-white' : 'text-[#93939B] hover:bg-[#131316]'}`}
          >
            <BookOpen className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 text-[#93939B] hover:bg-[#131316]"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}