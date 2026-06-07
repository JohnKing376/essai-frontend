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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 flex flex-col items-center text-center border-b border-indigo-100/50">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 relative">
            <FileSearch className="text-indigo-600 h-8 w-8" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="text-white h-4 w-4" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2 font-jakarta">Automated Detection</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We scanned your document and believe it is a:
          </p>
          <div className="mt-3 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-inner text-lg font-jakarta">
            {primaryGuess}
          </div>
        </div>

        {/* Action Body */}
        <div className="p-6">
          {!showAlternatives ? (
            <div className="space-y-3">
              <p className="text-center text-slate-700 font-medium mb-4">Is this correct?</p>
              <button
                onClick={() => onConfirm(primaryGuess)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                Yes, analyze as {primaryGuess}
              </button>
              <button
                onClick={() => setShowAlternatives(true)}
                className="w-full py-3 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="h-5 w-5 text-slate-400" />
                No, it&apos;s something else
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-in slide-in-from-top-4 fade-in duration-300">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Did you mean?</p>
              
              {alternatives.map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => onConfirm(alt)}
                  className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 rounded-xl text-slate-700 hover:text-indigo-700 font-medium transition-all flex items-center justify-between group"
                >
                  {alt}
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
          >
            Cancel Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
