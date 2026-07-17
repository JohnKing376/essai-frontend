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
      <div className="p-4 md:p-12 max-w-[1200px] w-full mx-auto anim-fade-in flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-[#18181C] border border-white/8 rounded-full flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-[#5C5C64]" />
        </div>
        <h2 className="text-2xl font-black text-[#F3F3F5] mb-2">No drafts saved</h2>
        <p className="text-[#93939B] text-center max-w-sm">
          Your saved drafts will appear here. Write an essay in the editor and click &quot;Save Draft&quot; to keep it for later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 max-w-[1200px] w-full mx-auto anim-fade-in pb-24 md:pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#F3F3F5] mb-3">Your Drafts</h1>
        <p className="text-base text-[#93939B]">
          Manage your saved essays. Drafts are securely stored in your local browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft, idx) => {
          const plainTextSnippet = draft.text.replace(/<[^>]+>/g, '').substring(0, 120) + '...';

          return (
            <div
              key={draft.id}
              className="bg-[#0E0E11] border border-white/8 rounded-xl p-6 hover:border-white/16 transition-all flex flex-col justify-between h-64 group anim-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  {draft.gradingMode && (
                    <span className="text-[10px] font-bold text-[#FF7A60] bg-[#F2543D]/10 border border-[#F2543D]/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {draft.gradingMode.replace('_', ' ')}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-[#5C5C64] text-xs font-mono font-medium ml-auto">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(draft.date).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#F3F3F5] leading-tight mb-3 line-clamp-2">
                  {draft.title || "Untitled Draft"}
                </h3>
                <p className="text-sm text-[#93939B] line-clamp-3 leading-relaxed">
                  {plainTextSnippet}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/8">
                <button
                  onClick={() => onLoadDraft(draft)}
                  className="flex-1 px-4 py-2 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(242,84,61,0.45)]"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Resume
                </button>
                <button
                  onClick={() => onDeleteDraft(draft.id)}
                  className="p-2 text-[#5C5C64] hover:text-[#FF7A60] hover:bg-[#F2543D]/10 active:scale-90 rounded-lg transition-all"
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