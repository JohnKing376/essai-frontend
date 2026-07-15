'use client';

import React from 'react';
import { Key } from 'lucide-react';

interface SettingsModalProps {
  geminiKey: string;
  openaiKey: string;
  anthropicKey: string;
  setGeminiKey: (key: string) => void;
  setOpenaiKey: (key: string) => void;
  setAnthropicKey: (key: string) => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function SettingsModal({
  geminiKey,
  openaiKey,
  anthropicKey,
  setGeminiKey,
  setOpenaiKey,
  setAnthropicKey,
  onClose,
  onSave,
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 anim-fade-in">
      <div className="bg-[#0E0E11] w-full max-w-md rounded-xl overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] p-6 border border-white/10">
        <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Key className="text-[#FF7A60] h-5 w-5" />
            <h3 className="font-bold text-lg text-[#F3F3F5]">Custom Provider Keys</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#5C5C64] hover:text-[#93939B] text-sm cursor-pointer transition-colors active:scale-90"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-[#93939B] mb-6 leading-relaxed">
          Premium providers are client-funded. Paste your keys here to enable evaluations. They are stored strictly in your browser&apos;s local storage sandbox.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C5C64] font-mono block mb-1.5">
              Gemini API Key (Optional Override)
            </label>
            <input
              type="password"
              placeholder="Using server key fallback"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2 bg-[#131316] border border-white/8 rounded-lg text-sm focus:border-[#F2543D] focus:outline-none text-[#F3F3F5] placeholder:text-[#5C5C64] transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C5C64] font-mono block mb-1.5">
              OpenAI API Key (Required for GPT-4o)
            </label>
            <input
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full px-4 py-2 bg-[#131316] border border-white/8 rounded-lg text-sm focus:border-[#F2543D] focus:outline-none text-[#F3F3F5] placeholder:text-[#5C5C64] transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#5C5C64] font-mono block mb-1.5">
              Anthropic API Key (Required for Claude)
            </label>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="w-full px-4 py-2 bg-[#131316] border border-white/8 rounded-lg text-sm focus:border-[#F2543D] focus:outline-none text-[#F3F3F5] placeholder:text-[#5C5C64] transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/8 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/12 text-[#93939B] hover:bg-[#18181C] hover:border-white/20 active:scale-95 rounded-lg text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-b from-[#FF7A60] to-[#F2543D] hover:brightness-110 active:scale-95 text-white rounded-lg font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(242,84,61,0.55)] transition-all"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}