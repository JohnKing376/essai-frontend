'use client';

import React from 'react';
import { TemplatePaper } from './data/templates';

interface TemplatesPageProps {
  templates: TemplatePaper[];
  onLoadMockReview: (template: TemplatePaper) => void;
}

export default function TemplatesPage({ templates, onLoadMockReview }: TemplatesPageProps) {
  return (
    <main className="p-8 max-w-6xl w-full mx-auto anim-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#F3F3F5]">Templates Library</h2>
        <p className="text-sm text-[#93939B] mt-2 max-w-2xl leading-relaxed">
          Explore pre-analyzed academic essays to understand the AI&apos;s review methodology and formatting expectations.
        </p>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((paper, idx) => (
          <div
            key={paper.id}
            className="bg-[#0E0E11] border border-white/8 hover:border-white/16 rounded-xl p-6 flex flex-col justify-between min-h-[340px] transition-all anim-fade-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div>
              {/* Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-[#FF7A60] bg-[#F2543D]/10 border border-[#F2543D]/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  {paper.documentType.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#F3F3F5] leading-tight mb-2">
                {paper.title}
              </h3>

              <p className="text-xs text-[#93939B] leading-relaxed mb-4">
                {paper.summary}
              </p>

              {/* Conditional Image */}
              {paper.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/8">
                  <img
                    src={paper.imageUrl}
                    alt={paper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Complexity bar mock */}
              {paper.id === 'renewable-energy' && (
                <div className="mb-4">
                  <div className="flex justify-between text-[9px] font-semibold text-[#5C5C64] uppercase mb-1 font-mono">
                    <span>Review Complexity</span>
                    <span>High</span>
                  </div>
                  <div className="h-1 bg-[#18181C] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF7A60] to-[#F2543D] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onLoadMockReview(paper)}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer text-center ${paper.id === 'renewable-energy'
                  ? 'bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 text-white shadow-[0_8px_24px_-8px_rgba(242,84,61,0.45)]'
                  : 'border border-white/12 text-[#D4D4D8] hover:bg-[#18181C] hover:border-white/20'
                }`}
            >
              View Mock Review
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}