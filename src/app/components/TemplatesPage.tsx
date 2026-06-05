'use client';

import React from 'react';
import { TemplatePaper } from './data/templates';

interface TemplatesPageProps {
  templates: TemplatePaper[];
  onLoadMockReview: (template: TemplatePaper) => void;
}

export default function TemplatesPage({ templates, onLoadMockReview }: TemplatesPageProps) {
  return (
    <main className="p-8 max-w-6xl w-full mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#0f172a]">Templates Library</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">
          Explore pre-analyzed academic essays to understand the AI&apos;s review methodology and formatting expectations.
        </p>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((paper) => (
          <div
            key={paper.id}
            className="template-card rounded-xl p-6 flex flex-col justify-between min-h-[340px]"
          >
            <div>
              {/* Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  {paper.documentType.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0f172a] leading-tight mb-2">
                {paper.title}
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {paper.summary}
              </p>

              {/* Conditional Wind Turbine Image for Template 2 */}
              {paper.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-[#e2e8f0]">
                  <img
                    src={paper.imageUrl}
                    alt={paper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Progress bar mock complexity on card 2 */}
              {paper.id === 'renewable-energy' && (
                <div className="mb-4">
                  <div className="flex justify-between text-[9px] font-semibold text-gray-400 uppercase mb-1">
                    <span>Review Complexity</span>
                    <span>High</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0f172a] rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onLoadMockReview(paper)}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer text-center ${paper.id === 'renewable-energy'
                  ? 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
                  : 'border border-[#e2e8f0] text-[#0f172a] hover:bg-gray-50'
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
