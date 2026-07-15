'use client';

import React, { useState } from 'react';
import { FileSearch, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface DetectionModalProps {
  primaryGuess: string;
  alternatives: string[];
  onConfirm: (confirmedType: string) => void;
  onCancel: () => void;
}

export default function DetectionModal({
  primaryGuess,
  alternatives,
  onConfirm,
  onCancel,
}: DetectionModalProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 anim-fade-in">
      <div className="bg-[#0E0E11] w-full max-w-md rounded-2xl shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#131316] p-6 flex flex-col items-center text-center border-b border-white/8">
          <div className="w-16 h-16 bg-[#18181C] border border-white/8 rounded-full flex items-center justify-center mb-4 relative">
            <FileSearch className="text-[#FF7A60] h-8 w-8" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#7FE0B0] rounded-full border-2 border-[#131316] flex items-center justify-center">
              <CheckCircle2 className="text-[#0E0E11] h-4 w-4" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#F3F3F5] mb-2">Automated Detection</h2>
          <p className="text-[#93939B] text-sm leading-relaxed">
            We scanned your document and believe it is a:
          </p>
          <div className="mt-3 px-4 py-2 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] text-white font-bold rounded-lg text-lg shadow-[0_8px_24px_-8px_rgba(242,84,61,0.5)]">
            {primaryGuess}
          </div>
        </div>

        {/* Action Body */}
        <div className="p-6">
          {!showAlternatives ? (
            <div className="space-y-3">
              <p className="text-center text-[#D4D4D8] font-medium mb-4">Is this correct?</p>
              <button
                onClick={() => onConfirm(primaryGuess)}
                className="w-full py-3 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-[0.98] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(242,84,61,0.55)]"
              >
                <CheckCircle2 className="h-5 w-5" />
                Yes, analyze as {primaryGuess}
              </button>
              <button
                onClick={() => setShowAlternatives(true)}
                className="w-full py-3 bg-transparent border border-white/12 hover:border-white/20 hover:bg-[#18181C] active:scale-[0.98] text-[#D4D4D8] font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="h-5 w-5 text-[#5C5C64]" />
                No, it&apos;s something else
              </button>
            </div>
          ) : (
            <div className="space-y-3 anim-fade-up">
              <p className="text-sm font-semibold text-[#5C5C64] uppercase tracking-wider mb-2 font-mono">Did you mean?</p>

              {alternatives.map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => onConfirm(alt)}
                  className="w-full text-left px-4 py-3 bg-[#131316] hover:bg-[#F2543D]/10 border border-white/8 hover:border-[#F2543D]/30 active:scale-[0.98] rounded-xl text-[#D4D4D8] hover:text-[#FF7A60] font-medium transition-all flex items-center justify-between group"
                >
                  {alt}
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#131316] p-4 border-t border-white/8 flex justify-center">
          <button
            onClick={onCancel}
            className="text-[#5C5C64] hover:text-[#93939B] text-sm font-medium transition-colors"
          >
            Cancel Analysis
          </button>
        </div>
      </div>
    </div>
  );
}