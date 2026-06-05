'use client';

import React, { useState, useEffect } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import {
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FileText,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List as ListIcon,
  ChevronDown,
  ChevronUp,
  Save
} from 'lucide-react';
import { ReviewResult } from './data/templates';

interface AnalysisPageProps {
  editor: Editor | null;
  charCount: number;
  gradingMode: 'general_essay' | 'formal_letter' | 'thesis' | 'blog_post' | string;
  setGradingMode: (mode: any) => void;
  selectedModel: 'gemini' | 'openai' | 'anthropic';
  setSelectedModel: (model: 'gemini' | 'openai' | 'anthropic') => void;
  reviewResult: ReviewResult | null;
  isLoading: boolean;
  loadingProgress: number;
  hasAnalyzed: boolean;
  errorMsg: string | null;
  handleReview: () => void;
  handleSaveDraft: () => void;
  mobileTab: 'editor' | 'analysis';
  setMobileTab: (tab: 'editor' | 'analysis') => void;
}

export default function AnalysisPage({
  editor,
  charCount,
  gradingMode,
  setGradingMode,
  selectedModel,
  setSelectedModel,
  reviewResult,
  isLoading,
  loadingProgress,
  hasAnalyzed,
  errorMsg,
  handleReview,
  handleSaveDraft,
  mobileTab,
  setMobileTab
}: AnalysisPageProps) {
  
  // Array of loading messages to rotate through
  const loadingMessages = [
    "Analyzing document structure...",
    "Evaluating academic tone...",
    "Checking grammatical mechanics...",
    "Assessing evidence and support...",
    "Synthesizing actionable feedback...",
    "Finalizing review results..."
  ];

  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading, loadingMessages.length]);

  return (
    <main className="p-4 md:p-8 max-w-[1400px] w-full mx-auto pb-24 md:pb-8">
      
      {/* Mobile Tab Switcher (Visible only on small screens after analysis) */}
      {hasAnalyzed && (
        <div className="lg:hidden flex bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-200 sticky top-4 z-10">
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mobileTab === 'editor' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setMobileTab('editor')}
          >
            Document Editor
          </button>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mobileTab === 'analysis' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setMobileTab('analysis')}
          >
            Analysis Results
          </button>
        </div>
      )}

      <div className={`grid grid-cols-1 ${hasAnalyzed ? 'lg:grid-cols-2' : ''} gap-8 items-start animate-fade-in`}>

        {/* Left Column: TipTap Document Workspace */}
        <section className={`bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden ${!hasAnalyzed ? 'max-w-4xl mx-auto w-full' : ''} ${hasAnalyzed && mobileTab !== 'editor' ? 'hidden lg:block' : ''}`}>
          {/* Document Editor Header */}
          <div className="border-b border-[#e2e8f0] px-4 md:px-6 py-4 bg-gray-50/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                <h3 className="font-bold text-sm text-[#0f172a] tracking-wide uppercase">
                  Editor
                </h3>
              </div>

              {/* Document Type Selector dropdown */}
              <div className="flex items-center gap-1.5 sm:ml-4 sm:border-l border-gray-200 sm:pl-4">
                <select
                  value={gradingMode}
                  onChange={(e) => setGradingMode(e.target.value)}
                  className="text-xs font-semibold bg-white border border-[#e2e8f0] text-gray-600 rounded px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer w-full sm:w-auto"
                >
                  <option value="general_essay">General Essay</option>
                  <option value="formal_letter">Formal Letter</option>
                  <option value="thesis">Thesis / Chapter</option>
                  <option value="blog_post">Blog Post / Article</option>
                </select>
              </div>
            </div>

            {/* Text editor format toolbars */}
            {editor && (
              <div className="flex gap-1 items-center self-end sm:self-auto">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`editor-toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
                  title="Bold"
                >
                  <BoldIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`editor-toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
                  title="Italic"
                >
                  <ItalicIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`editor-toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                  title="Bullet List"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Editor Workspace */}
          <div className="bg-white border-b border-[#e2e8f0]">
            {editor && <EditorContent editor={editor} />}
          </div>

          {/* Editor Footer */}
          <div className="px-4 md:px-6 py-5 bg-gray-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start w-full sm:w-auto">
              <span className="text-xs text-gray-400 font-mono">
                {charCount} chars
              </span>
              
              {!hasAnalyzed && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value as any)}
                    className="text-xs font-semibold bg-white border border-[#e2e8f0] text-gray-600 rounded px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="gemini">Gemini 3 Flash</option>
                    <option value="openai">GPT 5.5</option>
                    <option value="anthropic">Claude 3 Opus</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleSaveDraft}
                disabled={charCount === 0}
                className="flex-1 sm:flex-none px-4 py-3 bg-white border border-gray-300 hover:border-[#0f172a] hover:text-[#0f172a] text-gray-600 disabled:text-gray-300 disabled:border-gray-200 rounded-lg font-bold text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
              <button
                onClick={handleReview}
                disabled={isLoading || charCount < 100}
                className="flex-1 sm:flex-none px-6 py-3 bg-[#0f172a] hover:bg-[#1e293b] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg font-bold text-sm tracking-wide transition uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Evaluating...</span>
                  </>
                ) : (
                  <>
                    Analyze
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Dashboards Reports (Only visible if analyzed) */}
        {hasAnalyzed && (
          <section className={`flex flex-col gap-6 animate-fade-in ${mobileTab !== 'analysis' ? 'hidden lg:flex' : ''}`}>

            {/* Header & Model Controls */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-black text-[#0f172a]">Analysis Results</h2>
              </div>
              
              <div className="flex gap-1.5 sm:gap-2">
                {['gemini', 'openai', 'anthropic'].map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model as any)}
                    className={`px-2 sm:px-3 py-1.5 border rounded-lg text-[10px] uppercase tracking-wider font-bold transition ${selectedModel === model
                        ? 'border-[#0f172a] bg-indigo-50/50 text-[#0f172a]'
                        : 'border-[#e2e8f0] text-gray-400 hover:bg-gray-50'
                      }`}
                  >
                    {model === 'gemini' ? 'Gemini' : model === 'openai' ? 'GPT 5.5' : 'Opus'}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 flex gap-3 text-sm leading-relaxed">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-1">Evaluation Rejected</span>
                  {errorMsg}
                </div>
              </div>
            )}

            {/* NEW PROGRESS LOADING STATE */}
            {isLoading && (
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 sm:p-16 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">
                
                <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                  {/* Outer animated ring */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="46"
                      className="stroke-gray-100 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50" cy="50" r="46"
                      className="stroke-[#0f172a] fill-none transition-all duration-300 ease-out"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * loadingProgress) / 100}
                    />
                  </svg>
                  {/* Inner text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#0f172a]">{loadingProgress}%</span>
                  </div>
                </div>
                
                <h4 className="font-bold text-[#0f172a] text-lg mb-2">Analyzing Document</h4>
                <p className="text-sm text-gray-500 max-w-sm leading-relaxed h-6 transition-all">
                  {loadingMessages[loadingMsgIdx]}
                </p>
              </div>
            )}

            {/* Report display dashboard panels */}
            {reviewResult && !isLoading && (
              <div className="flex flex-col gap-6 animate-fade-in">

                {/* OVERALL ASSESSMENT CARD */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 md:p-8 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-black text-[#0f172a] mb-1">Overall Assessment</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Tailored specifically for <strong>{gradingMode.replace('_', ' ')}</strong> formatting.
                    </p>
                  </div>
                  {/* Overall Score Box */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg">
                    {reviewResult.overallScore.toFixed(1)}
                  </div>
                </div>

                {/* SUMMARY REVIEW CARD (Stacked full-width bands) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3 font-mono">
                      High-Level Summary
                    </span>
                    <p className="text-base lg:text-lg text-[#334155] leading-relaxed font-serif">
                      {reviewResult.feedbackSummary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                    {/* Notable strengths (Full width band) */}
                    <div className="bg-emerald-50/50 p-5 md:p-6 rounded-xl border border-emerald-100">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-4 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Notable Strengths
                      </span>
                      <ul className="space-y-3">
                        {reviewResult.strengths.map((str, idx) => (
                          <li key={idx} className="text-base text-emerald-950 leading-relaxed flex gap-3 items-start font-serif">
                            <span className="text-emerald-500 font-bold mt-1">✓</span>
                            {str}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key suggestions (Full width band) */}
                    <div className="bg-rose-50/50 p-5 md:p-6 rounded-xl border border-rose-100">
                      <span className="text-xs font-bold text-rose-800 uppercase tracking-widest block mb-4 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        Key Suggestions
                      </span>
                      <ul className="space-y-3">
                        {reviewResult.suggestions.map((sug, idx) => (
                          <li key={idx} className="text-base text-rose-950 leading-relaxed flex gap-3 items-start font-serif">
                            <span className="text-rose-500 font-bold mt-1">→</span>
                            {sug}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DETAILED METRICS CARDS (RICH RENDER) */}
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mt-4 font-mono">
                    Detailed Section Evaluations
                  </span>

                  {reviewResult.sectionEvaluations.map((evaluation, idx) => (
                    <CategoryCard key={idx} title={evaluation.sectionName} data={evaluation} />
                  ))}

                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

// Sub-component for rendering the rich category feedback
function CategoryCard({ title, data }: { title: string, data: any }) {
  const [expanded, setExpanded] = useState(false);
  
  if (typeof data !== 'object' || !data.currentAssessment) {
    return null;
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-sm transition-all hover:border-[#cbd5e1]">
      <div 
        className="p-4 md:p-6 cursor-pointer flex items-center justify-between bg-gray-50/30"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f8fafc] border border-gray-200 flex items-center justify-center font-black text-[#0f172a] text-sm md:text-base">
            {data.score.toFixed(1)}
          </div>
          <h4 className="font-bold text-base md:text-lg text-[#0f172a]">{title}</h4>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-24 md:w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full" 
              style={{ width: `${data.score * 10}%` }}
            ></div>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 md:p-6 pt-2 border-t border-gray-100 bg-white animate-fade-in">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-2 font-mono">
              Current Assessment
            </span>
            <p className="text-base text-gray-800 leading-relaxed font-serif">
              {data.currentAssessment}
            </p>
          </div>
          
          {data.actionableSuggestions && data.actionableSuggestions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-3 font-mono">
                Actionable Suggestions
              </span>
              <ul className="space-y-2">
                {data.actionableSuggestions.map((sug: string, idx: number) => (
                  <li key={idx} className="text-sm md:text-base text-gray-700 leading-relaxed flex gap-3 items-start font-serif">
                    <span className="text-amber-500 mt-1">•</span>
                    {sug}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
