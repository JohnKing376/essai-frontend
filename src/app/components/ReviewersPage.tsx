'use client';

import React from 'react';
import { Award } from 'lucide-react';

interface ReviewersPageProps {
  onBackToDashboard: () => void;
}

export default function ReviewersPage({ onBackToDashboard }: ReviewersPageProps) {
  return (
    <main className="p-8 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center min-h-[500px] anim-fade-in">
      <div className="p-4 bg-[#0E0E11] border border-white/8 rounded-full mb-4">
        <Award className="h-8 w-8 text-[#FF7A60]" />
      </div>
      <h2 className="text-2xl font-bold text-[#F3F3F5]">Academic AI Evaluators</h2>
      <p className="text-sm text-[#93939B] mt-2 max-w-md leading-relaxed">
        Reviewer selection is actively managed inside the model selection dashboard toggles. Additional custom engine overrides are configurable inside key settings.
      </p>
      <button
        onClick={onBackToDashboard}
        className="mt-6 px-6 py-2.5 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-95 text-white rounded-lg font-medium text-sm transition-all shadow-[0_8px_24px_-8px_rgba(242,84,61,0.45)]"
      >
        Back to Dashboard
      </button>
    </main>
  );
}