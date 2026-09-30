'use client';

import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* AI Chat Button - рядом с ScrollToTop */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-20 md:bottom-8 md:right-24 z-40 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="AI Ассистент"
      >
        {isOpen ? (
          <X size={24} strokeWidth={2.5} className="md:w-7 md:h-7" />
        ) : (
          <Sparkles size={24} strokeWidth={2.5} className="md:w-7 md:h-7" />
        )}
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-40 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Ассистент</h3>
                <p className="text-xs text-white/80">Чем могу помочь?</p>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="p-4 h-64 overflow-y-auto bg-slate-50 dark:bg-slate-900">
            <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
              <p>Здравствуйте! 👋</p>
              <p className="mt-2">Я AI-ассистент ОКУРМЭН.</p>
              <p className="mt-1">Задайте мне вопрос о курсах!</p>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Напишите вопрос..."
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
