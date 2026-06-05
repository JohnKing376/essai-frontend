'use client';

import React from 'react';
import { Award } from 'lucide-react';

interface ReviewersPageProps {
  onBackToDashboard: () => void;
}

export default function ReviewersPage({ onBackToDashboard }: ReviewersPageProps) {
  return (
    <main className="p-8 max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center min-h-[500px]">
      <div className="p-4 bg-white border border-[#e2e8f0] rounded-full mb-4 shadow-sm">
        <Award className="h-8 w-8 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold text-[#0f172a]">Academic AI Evaluators</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        Reviewer selection is actively managed inside the model selection dashboard toggles. Additional custom engine overrides are configurable inside key settings.
      </p>
      <button
        onClick={onBackToDashboard}
        className="mt-6 px-6 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg font-medium text-sm transition"
      >
        Back to Dashboard
      </button>
    </main>
  );
}
