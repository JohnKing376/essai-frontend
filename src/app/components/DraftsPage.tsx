import React from 'react';
import { Trash2, Edit3, FileText, Clock } from 'lucide-react';

export interface Draft {
  id: string;
  title: string;
  date: string;
  text: string;
  gradingMode?: string;
}

interface DraftsPageProps {
  drafts: Draft[];
  onLoadDraft: (draft: Draft) => void;
  onDeleteDraft: (id: string) => void;
}

export default function DraftsPage({ drafts, onLoadDraft, onDeleteDraft }: DraftsPageProps) {
  if (drafts.length === 0) {
    return (
      <div className="p-4 md:p-12 max-w-[1200px] w-full mx-auto animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-[#0f172a] mb-2">No drafts saved</h2>
        <p className="text-gray-500 text-center max-w-sm font-sans">
          Your saved drafts will appear here. Write an essay in the editor and click "Save Draft" to keep it for later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 max-w-[1200px] w-full mx-auto animate-fade-in pb-24 md:pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#0f172a] mb-3">Your Drafts</h1>
        <p className="text-base text-gray-600 font-sans">
          Manage your saved essays. Drafts are securely stored in your local browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => {
          // Extract a plain text snippet for preview (strip html)
          const plainTextSnippet = draft.text.replace(/<[^>]+>/g, '').substring(0, 120) + '...';

          return (
            <div 
              key={draft.id} 
              className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-64 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  {draft.gradingMode && (
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {draft.gradingMode.replace('_', ' ')}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-mono font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(draft.date).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] leading-tight mb-3 line-clamp-2">
                  {draft.title || "Untitled Draft"}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 font-serif leading-relaxed">
                  {plainTextSnippet}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onLoadDraft(draft)}
                  className="flex-1 px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Resume
                </button>
                <button
                  onClick={() => onDeleteDraft(draft.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete Draft"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
