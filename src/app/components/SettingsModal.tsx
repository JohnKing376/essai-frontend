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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-2xl p-6 border border-[#e2e8f0]">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Key className="text-indigo-600 h-5 w-5" />
            <h3 className="font-bold text-lg text-[#0f172a]">Custom Provider Keys</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Premium providers are client-funded. Paste your keys here to enable evaluations. They are stored strictly in your browser&apos;s local storage sandbox.
        </p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Gemini API Key (Optional Override)
            </label>
            <input
              type="password"
              placeholder="Using server key fallback"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:border-indigo-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              OpenAI API Key (Required for GPT-4o)
            </label>
            <input
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:border-indigo-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Anthropic API Key (Required for Claude)
            </label>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="w-full px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:border-indigo-500 focus:outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#e2e8f0] text-gray-500 hover:bg-gray-50 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg font-semibold text-sm shadow-sm"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
