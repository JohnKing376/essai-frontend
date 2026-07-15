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
  Save,
  UploadCloud
} from 'lucide-react';
import { ReviewResult } from './data/templates';

interface AnalysisPageProps {
  editor: Editor | null;
  charCount: number;
  selectedModel: 'gemini' | 'openai' | 'anthropic';
  setSelectedModel: (model: 'gemini' | 'openai' | 'anthropic') => void;
  reviewResult: ReviewResult | null;
  isLoading: boolean;
  isDetecting: boolean;
  isUploading: boolean;
  loadingProgress: number;
  hasAnalyzed: boolean;
  errorMsg: string | null;
  handleAnalyzeClick: () => void;
  handleSaveDraft: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileTab: 'editor' | 'analysis';
  setMobileTab: (tab: 'editor' | 'analysis') => void;
  geminiKey: string;
  openaiKey: string;
  anthropicKey: string;
}

export default function AnalysisPage({
  editor,
  charCount,
  selectedModel,
  setSelectedModel,
  reviewResult,
  isLoading,
  isDetecting,
  isUploading,
  loadingProgress,
  hasAnalyzed,
  errorMsg,
  handleAnalyzeClick,
  handleSaveDraft,
  handleFileUpload,
  mobileTab,
  setMobileTab,
}: AnalysisPageProps) {

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
    <main className="p-4 md:p-8 w-full pb-24 md:pb-8 flex-1 overflow-hidden flex flex-col">

      {/* Mobile Tab Switcher */}
      {hasAnalyzed && (
        <div className="lg:hidden flex bg-[#0E0E11] rounded-xl p-1 mb-6 border border-white/8 sticky top-4 z-10">
          <button
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mobileTab === 'editor' ? 'bg-[#F2543D] text-white' : 'text-[#93939B] hover:text-[#F3F3F5]'}`}
            onClick={() => setMobileTab('editor')}
          >
            Document Editor
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mobileTab === 'analysis' ? 'bg-[#F2543D] text-white' : 'text-[#93939B] hover:text-[#F3F3F5]'}`}
            onClick={() => setMobileTab('analysis')}
          >
            Analysis Results
          </button>
        </div>
      )}

      <div className={`grid grid-cols-1 ${hasAnalyzed ? 'lg:grid-cols-2' : ''} gap-8 anim-fade-in flex-1 min-h-0 overflow-hidden`}>

        {/* Left Column: TipTap Document Workspace */}
        <section className={`bg-[#0E0E11] border border-white/8 rounded-xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] h-full flex flex-col ${!hasAnalyzed ? 'max-w-4xl mx-auto w-full' : ''} ${hasAnalyzed && mobileTab !== 'editor' ? 'hidden lg:block lg:flex' : ''}`}>

          {/* Document Editor Header */}
          <div className="border-b border-white/8 px-4 md:px-6 py-4 bg-[#0E0E11] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#FF7A60]" />
                <h3 className="font-mono text-xs text-[#93939B] tracking-[0.1em] uppercase">
                  Editor
                </h3>
              </div>

              <div className="flex items-center sm:ml-4 sm:border-l border-white/8 sm:pl-4">
                <label className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                  isUploading
                    ? 'bg-[#F2543D]/10 text-[#F2543D]/50 cursor-not-allowed'
                    : 'bg-[#F2543D]/10 text-[#FF7A60] hover:bg-[#F2543D]/20'
                }`}>
                  {isUploading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <UploadCloud className="h-4 w-4" />
                  )}
                  {isUploading ? 'Uploading...' : 'Upload Doc'}
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Format toolbar */}
            {editor && (
              <div className="flex gap-1 items-center self-end sm:self-auto">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded-md transition-colors active:scale-95 ${editor.isActive('bold') ? 'bg-[#F2543D]/15 text-[#FF7A60]' : 'text-[#93939B] hover:bg-[#18181C] hover:text-[#F3F3F5]'}`}
                  title="Bold"
                >
                  <BoldIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded-md transition-colors active:scale-95 ${editor.isActive('italic') ? 'bg-[#F2543D]/15 text-[#FF7A60]' : 'text-[#93939B] hover:bg-[#18181C] hover:text-[#F3F3F5]'}`}
                  title="Italic"
                >
                  <ItalicIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-2 rounded-md transition-colors active:scale-95 ${editor.isActive('bulletList') ? 'bg-[#F2543D]/15 text-[#FF7A60]' : 'text-[#93939B] hover:bg-[#18181C] hover:text-[#F3F3F5]'}`}
                  title="Bullet List"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Editor Workspace */}
          <div className="bg-[#0E0E11] border-b border-white/8 flex-1 overflow-y-auto min-h-0 cursor-text [&_.tiptap]:text-[#F3F3F5] [&_.tiptap]:bg-transparent [&_.tiptap]:min-h-full [&_.tiptap]:p-6"
            onClick={() => editor?.commands.focus()}
          >
            {editor && <EditorContent editor={editor} />}
          </div>

          {/* Editor Footer */}
          <div className="px-4 md:px-6 py-5 bg-[#0E0E11] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start w-full sm:w-auto">
              <span className="text-xs text-[#5C5C64] font-mono">
                {charCount} chars
              </span>

              {!hasAnalyzed && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value as any)}
                    className="text-xs font-semibold bg-[#18181C] border border-white/8 text-[#93939B] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#F2543D] cursor-pointer"
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
                className="flex-1 sm:flex-none px-4 py-3 bg-[#18181C] border border-white/8 hover:border-white/16 hover:text-[#F3F3F5] active:scale-95 text-[#93939B] disabled:text-[#5C5C64] disabled:border-white/4 disabled:active:scale-100 rounded-lg font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
              <button
                onClick={handleAnalyzeClick}
                disabled={isLoading || isDetecting || charCount < 100}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-95 disabled:bg-none disabled:bg-[#18181C] disabled:text-[#5C5C64] disabled:active:scale-100 text-white rounded-lg font-bold text-sm tracking-wide transition-all uppercase flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(242,84,61,0.55)] disabled:shadow-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Evaluating...</span>
                  </>
                ) : isDetecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Scanning...</span>
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

        {/* Right Column: Analysis Results */}
        {hasAnalyzed && (
          <section className={`flex flex-col gap-6 anim-fade-in overflow-y-auto h-full pb-6 min-h-0 ${mobileTab !== 'analysis' ? 'hidden lg:flex' : ''}`}>
 
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-black text-[#F3F3F5]">Analysis Results</h2>
              </div>

              <div className="flex gap-1.5 sm:gap-2">
                {['gemini', 'openai', 'anthropic'].map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model as any)}
                    className={`px-2 sm:px-3 py-1.5 border rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all active:scale-95 ${selectedModel === model
                        ? 'border-[#F2543D]/40 bg-[#F2543D]/10 text-[#FF7A60]'
                        : 'border-white/8 text-[#5C5C64] hover:bg-[#18181C] hover:text-[#93939B]'
                      }`}
                  >
                    {model === 'gemini' ? 'Gemini' : model === 'openai' ? 'GPT 5.5' : 'Opus'}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-[#F2543D]/8 border border-[#F2543D]/25 rounded-xl text-[#FF7A60] flex gap-3 text-sm leading-relaxed">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-1">Evaluation Rejected</span>
                  {errorMsg}
                </div>
              </div>
            )}

            {/* LOADING STATE */}
            {isLoading && (
              <div className="bg-[#0E0E11] border border-white/8 rounded-xl p-8 sm:p-16 text-center flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">

                <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="46"
                      className="stroke-white/8 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50" cy="50" r="46"
                      className="stroke-[#F2543D] fill-none transition-all duration-300 ease-out"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="289"
                      strokeDashoffset={289 - (289 * loadingProgress) / 100}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#F3F3F5]">{loadingProgress}%</span>
                  </div>
                </div>

                <h4 className="font-bold text-[#F3F3F5] text-lg mb-2">Analyzing Document</h4>
                <p className="text-sm text-[#93939B] max-w-sm leading-relaxed h-6 transition-all font-mono">
                  {loadingMessages[loadingMsgIdx]}
                </p>
              </div>
            )}

            {/* Report display */}
            {reviewResult && !isLoading && (
              <div className="flex flex-col gap-6 anim-fade-in">

                {/* OVERALL ASSESSMENT */}
                <div className="bg-[#0E0E11] border border-white/8 rounded-xl p-6 md:p-8 flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-black text-[#F3F3F5] mb-1">Overall Assessment</h4>
                    <p className="text-sm text-[#93939B] leading-relaxed">
                      Tailored specifically for the detected document type formatting.
                    </p>
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-[#FF7A60] to-[#F2543D] text-white flex items-center justify-center text-2xl md:text-3xl font-black shadow-[0_8px_24px_-8px_rgba(242,84,61,0.55)]">
                    {reviewResult.overallScore.toFixed(1)}
                  </div>
                </div>

                {/* SUMMARY REVIEW */}
                <div className="bg-[#0E0E11] border border-white/8 rounded-xl p-6 md:p-8 flex flex-col gap-8">
                  <div>
                    <span className="text-xs font-bold text-[#5C5C64] uppercase tracking-widest block mb-3 font-mono">
                      High-Level Summary
                    </span>
                    <p className="text-base lg:text-lg text-[#D4D4D8] leading-relaxed">
                      {reviewResult.feedbackSummary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-6 border-t border-white/8">
                    {/* Strengths */}
                    <div className="bg-[#7FE0B0]/[0.06] p-5 md:p-6 rounded-xl border border-[#7FE0B0]/20">
                      <span className="text-xs font-bold text-[#7FE0B0] uppercase tracking-widest block mb-4 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#7FE0B0]"></span>
                        Notable Strengths
                      </span>
                      <ul className="space-y-3">
                        {reviewResult.strengths.map((str, idx) => (
                          <li key={idx} className="text-base text-[#D4D4D8] leading-relaxed flex gap-3 items-start">
                            <span className="text-[#7FE0B0] font-bold mt-1">✓</span>
                            {str}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-[#F2543D]/[0.06] p-5 md:p-6 rounded-xl border border-[#F2543D]/20">
                      <span className="text-xs font-bold text-[#FF7A60] uppercase tracking-widest block mb-4 font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F2543D]"></span>
                        Key Suggestions
                      </span>
                      <ul className="space-y-3">
                        {reviewResult.suggestions.map((sug, idx) => (
                          <li key={idx} className="text-base text-[#D4D4D8] leading-relaxed flex gap-3 items-start">
                            <span className="text-[#FF7A60] font-bold mt-1">→</span>
                            {sug}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DETAILED METRICS */}
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <span className="text-xs font-bold text-[#5C5C64] uppercase tracking-widest block mt-4 font-mono">
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

// Sub-component for rich category feedback
function CategoryCard({ title, data }: { title: string, data: any }) {
  const [expanded, setExpanded] = useState(false);

  if (typeof data !== 'object' || !data.currentAssessment) {
    return null;
  }

  return (
    <div className="bg-[#0E0E11] border border-white/8 rounded-xl overflow-hidden transition-all hover:border-white/16">
      <div
        className="p-4 md:p-6 cursor-pointer flex items-center justify-between active:scale-[0.99] transition-transform"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#18181C] border border-white/8 flex items-center justify-center font-black text-[#F3F3F5] text-sm md:text-base">
            {data.score.toFixed(1)}
          </div>
          <h4 className="font-bold text-base md:text-lg text-[#F3F3F5]">{title}</h4>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-24 md:w-32 h-2 bg-[#18181C] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF7A60] to-[#F2543D] rounded-full transition-all duration-500"
              style={{ width: `${data.score * 10}%` }}
            ></div>
          </div>
          {expanded ? <ChevronUp className="h-5 w-5 text-[#5C5C64]" /> : <ChevronDown className="h-5 w-5 text-[#5C5C64]" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 md:p-6 pt-2 border-t border-white/8 bg-[#0E0E11] anim-fade-in">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-[#FF7A60] uppercase tracking-widest block mb-2 font-mono">
              Current Assessment
            </span>
            <p className="text-base text-[#D4D4D8] leading-relaxed">
              {data.currentAssessment}
            </p>
          </div>

          {data.actionableSuggestions && data.actionableSuggestions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-3 font-mono">
                Actionable Suggestions
              </span>
              <ul className="space-y-2">
                {data.actionableSuggestions.map((sug: string, idx: number) => (
                  <li key={idx} className="text-sm md:text-base text-[#D4D4D8] leading-relaxed flex gap-3 items-start">
                    <span className="text-amber-400 mt-1">•</span>
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