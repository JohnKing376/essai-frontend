'use client';

import React, { useState, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReviewResult, TemplatePaper, TEMPLATE_PAPERS } from './components/data/templates';
import Sidebar from './components/Sidebar';
import TemplatesPage from './components/TemplatesPage';
import AnalysisPage from './components/AnalysisPage';
import ReviewersPage from './components/ReviewersPage';
import SettingsModal from './components/SettingsModal';
import DraftsPage, { Draft } from './components/DraftsPage';

export default function Home() {
  // Navigation tabs: 'home' | 'templates' | 'reviewers' | 'drafts'
  const [activeNav, setActiveNav] = useState<'home' | 'templates' | 'reviewers' | 'drafts'>('home');
  const [charCount, setCharCount] = useState(0);

  // Key storage state
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');

  // UI state
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'openai' | 'anthropic'>('gemini');
  const [gradingMode, setGradingMode] = useState<'general_essay' | 'formal_letter' | 'thesis' | 'blog_post'>('general_essay');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [mobileTab, setMobileTab] = useState<'editor' | 'analysis'>('editor');

  // Drafts state
  const [drafts, setDrafts] = useState<Draft[]>([]);

  // Initialize keys and drafts from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGeminiKey(localStorage.getItem('aura_gemini_key') || '');
      setOpenaiKey(localStorage.getItem('aura_openai_key') || '');
      setAnthropicKey(localStorage.getItem('aura_anthropic_key') || '');

      try {
        const storedDrafts = localStorage.getItem('aura_drafts');
        if (storedDrafts) {
          setDrafts(JSON.parse(storedDrafts));
        }
      } catch (e) {
        console.error("Failed to parse drafts");
      }
    }
  }, []);

  const saveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aura_gemini_key', geminiKey);
    localStorage.setItem('aura_openai_key', openaiKey);
    localStorage.setItem('aura_anthropic_key', anthropicKey);
    setIsSettingsOpen(false);
    setErrorMsg(null);
  };

  // TipTap Rich-Text Editor instantiation
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p></p>`,
    onUpdate({ editor }) {
      setCharCount(editor.getText().length);
    },
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none bg-white text-gray-800',
      },
    },
  });

  // Keep character count in sync on load/initialization
  useEffect(() => {
    if (editor) {
      setCharCount(editor.getText().length);
    }
  }, [editor]);

  // Clear workspace for a new analysis
  const handleNewAnalysis = () => {
    if (editor) {
      editor.commands.setContent('<p></p>');
    }
    setReviewResult(null);
    setErrorMsg(null);
    setActiveNav('home');
    setCharCount(0);
    setHasAnalyzed(false);
    setLoadingProgress(0);
    setGradingMode('general_essay');
    setMobileTab('editor');
  };

  // Save current editor content as draft
  const handleSaveDraft = () => {
    if (!editor) return;
    const text = editor.getHTML();
    const plainText = editor.getText();
    if (plainText.trim().length === 0) return;

    // Generate title from first 5 words
    const words = plainText.trim().split(/\s+/);
    const title = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');

    const newDraft: Draft = {
      id: Date.now().toString(),
      title,
      date: new Date().toISOString(),
      text,
      gradingMode
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    localStorage.setItem('aura_drafts', JSON.stringify(updatedDrafts));

    // Optional: could show a toast here
    alert("Draft saved successfully!");
  };

  // Load a saved draft
  const handleLoadDraft = (draft: Draft) => {
    if (editor) {
      editor.commands.setContent(draft.text);
    }
    setReviewResult(null);
    setHasAnalyzed(false);
    setErrorMsg(null);
    setActiveNav('home');
    setGradingMode(draft.gradingMode as any);
    setMobileTab('editor');
  };

  // Delete a saved draft
  const handleDeleteDraft = (id: string) => {
    const updatedDrafts = drafts.filter(d => d.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem('aura_drafts', JSON.stringify(updatedDrafts));
  };

  // Load a pre-analyzed template
  const handleLoadMockReview = (template: TemplatePaper) => {
    if (editor) {
      editor.commands.setContent(template.essayText);
    }
    setReviewResult(template.reviewResult);
    setErrorMsg(null);
    setActiveNav('home');
    setHasAnalyzed(true);
    setMobileTab('analysis'); // automatically switch to analysis tab on mobile
    const plainText = template.essayText.replace(/<\/?[^>]+(>|$)/g, "");
    setCharCount(plainText.length);

    setGradingMode(template.documentType as any);
  };

  // Send request to real backend API
  const handleReview = async () => {
    if (!editor) return;
    setErrorMsg(null);
    setReviewResult(null);

    const text = editor.getText();

    if (text.trim().length < 100) {
      setErrorMsg('Essay must be at least 100 characters long to receive a meaningful review.');
      return;
    }
    if (text.length > 10000) {
      setErrorMsg('Essay exceeds the 10,000 character limit.');
      return;
    }

    if (selectedModel === 'openai' && !openaiKey) {
      setErrorMsg('Please configure your OpenAI API Key in settings first.');
      setIsSettingsOpen(true);
      return;
    }
    if (selectedModel === 'anthropic' && !anthropicKey) {
      setErrorMsg('Please configure your Anthropic API Key in settings first.');
      setIsSettingsOpen(true);
      return;
    }

    setIsLoading(true);
    setHasAnalyzed(true);
    setLoadingProgress(0);
    setMobileTab('analysis'); // Switch tab on mobile so user sees loading state

    // Simulate progress counting up to 99% while waiting for API
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 99) return prev;
        // Slow down as it gets closer to 99
        const increment = prev < 50 ? 5 : prev < 80 ? 2 : 1;
        return prev + increment;
      });
    }, 150);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (geminiKey) headers['x-gemini-key'] = geminiKey;
      if (openaiKey) headers['x-openai-key'] = openaiKey;
      if (anthropicKey) headers['x-anthropic-key'] = anthropicKey;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          essayText: text,
          targetModel: selectedModel,
          documentType: gradingMode,
        }),
      });

      const data = await response.json();

      clearInterval(progressInterval);
      setLoadingProgress(100);

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while analyzing the document.');
      }

      // Small delay so user sees 100%
      setTimeout(() => {
        setReviewResult(data);
        setIsLoading(false);
      }, 500);

    } catch (err: any) {
      clearInterval(progressInterval);
      setIsLoading(false);
      setErrorMsg(err.message || 'Failed to connect to the backend review service.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f4f6fc]">

      {/* Left Sidebar Navigation (Desktop) / Bottom Floating Nav (Mobile) / Top Header (Mobile) */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        handleNewAnalysis={handleNewAnalysis}
        setIsSettingsOpen={setIsSettingsOpen}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-y-auto max-h-screen pb-20 md:pb-0">

        {/* Templates Library View */}
        {activeNav === 'templates' && (
          <TemplatesPage
            templates={TEMPLATE_PAPERS}
            onLoadMockReview={handleLoadMockReview}
          />
        )}

        {/* Drafts View */}
        {activeNav === 'drafts' && (
          <DraftsPage
            drafts={drafts}
            onLoadDraft={handleLoadDraft}
            onDeleteDraft={handleDeleteDraft}
          />
        )}

        {/* Reviewers View */}
        {activeNav === 'reviewers' && (
          <ReviewersPage onBackToDashboard={() => setActiveNav('home')} />
        )}

        {/* Active Dashboard Editor & Workspace View */}
        {activeNav === 'home' && (
          <AnalysisPage
            editor={editor}
            charCount={charCount}
            gradingMode={gradingMode}
            setGradingMode={setGradingMode}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            reviewResult={reviewResult}
            isLoading={isLoading}
            loadingProgress={loadingProgress}
            hasAnalyzed={hasAnalyzed}
            errorMsg={errorMsg}
            handleReview={handleReview}
            handleSaveDraft={handleSaveDraft}
            mobileTab={mobileTab}
            setMobileTab={setMobileTab}
          />
        )}

      </div>

      {/* Settings configuration modal */}
      {isSettingsOpen && (
        <SettingsModal
          geminiKey={geminiKey}
          openaiKey={openaiKey}
          anthropicKey={anthropicKey}
          setGeminiKey={setGeminiKey}
          setOpenaiKey={setOpenaiKey}
          setAnthropicKey={setAnthropicKey}
          onClose={() => setIsSettingsOpen(false)}
          onSave={saveKeys}
        />
      )}
    </div>
  );
}
