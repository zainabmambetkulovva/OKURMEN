'use client';

import { useState } from 'react';
import { BilbarsCharacter, BilbarsState } from '@/components/Bilbars';

const allStates: BilbarsState[] = [
  'idle',
  'happy',
  'wave',
  'jump',
  'laugh',
  'surprised',
  'thinking',
  'reading',
  'backpack',
  'celebrate',
  'laptop',
  'sitting',
];

export default function BilbarsTestPage() {
  const [selectedState, setSelectedState] = useState<BilbarsState>('idle');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [autoAnimate, setAutoAnimate] = useState(true);
  const [floatingEffect, setFloatingEffect] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          Билбарс - Тест Анимаций
        </h1>

        {/* Character Display */}
        <div className="flex justify-center mb-12 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl">
          <BilbarsCharacter
            state={selectedState}
            size={size}
            autoAnimate={autoAnimate}
            floatingEffect={floatingEffect}
            className="transition-all"
          />
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* State Selector */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Состояние
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allStates.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    selectedState === state
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Размер
            </h2>
            <div className="flex gap-3">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    size === s
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Toggles */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Настройки Анимации
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAnimate}
                  onChange={(e) => setAutoAnimate(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Auto-анимация (движения по состоянию)
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={floatingEffect}
                  onChange={(e) => setFloatingEffect(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  Floating эффект (парение)
                </span>
              </label>
            </div>
          </div>

          {/* State Info */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
            <h2 className="text-xl font-bold mb-2">
              Текущее состояние: {selectedState}
            </h2>
            <p className="text-orange-100">
              Размер: {size} | Auto-анимация: {autoAnimate ? 'Вкл' : 'Выкл'} |
              Floating: {floatingEffect ? 'Вкл' : 'Выкл'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              Быстрые Действия
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const randomState =
                    allStates[Math.floor(Math.random() * allStates.length)];
                  setSelectedState(randomState);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                🎲 Случайное состояние
              </button>
              <button
                onClick={() => {
                  let index = 0;
                  const interval = setInterval(() => {
                    setSelectedState(allStates[index]);
                    index++;
                    if (index >= allStates.length) {
                      clearInterval(interval);
                      index = 0;
                    }
                  }, 2000);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                ▶️ Показать все (2 сек каждое)
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
          <p>Используйте эту страницу для тестирования всех состояний Билбарса</p>
          <p className="text-sm mt-2">
            Путь: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">/bilbars-test</code>
          </p>
        </div>
      </div>
    </div>
  );
}
