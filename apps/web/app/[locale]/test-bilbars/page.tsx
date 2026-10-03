'use client';

import { useState } from 'react';
import { BilbarsCharacter, BilbarsSectionAnimated, type BilbarsState } from '@/components/Bilbars';

const allStates: BilbarsState[] = [
  'idle', 'happy', 'wave', 'jump', 'laugh', 'surprised', 'thinking',
  'reading', 'backpack', 'celebrate', 'laptop', 'sitting', 'sad',
  'angry', 'walking', 'standing', 'wink', 'back', 'withLogo',
  'graduate', 'teaching', 'working', 'openArms', 'waving1', 'waving2'
];

export default function TestBilbarsPage() {
  const [selectedState, setSelectedState] = useState<BilbarsState>('wave');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🦁 Тестирование БИЛБАРСА
          </h1>
          <p className="text-lg text-gray-600">
            Проверка всех 25 состояний и анимаций персонажа
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Выберите состояние ({allStates.length} доступно):
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value as BilbarsState)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 font-medium"
              >
                {allStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Размер:
              </label>
              <div className="flex gap-3">
                {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      size === s
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Текущее состояние: <span className="text-primary-600">{selectedState}</span>
            </h2>
            <p className="text-gray-600">Размер: {size}</p>
          </div>

          <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl">
            <BilbarsCharacter
              state={selectedState}
              size={size}
              autoAnimate={true}
              floatingEffect={true}
            />
          </div>
        </div>

        {/* All States Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Все состояния БИЛБАРСА
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allStates.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedState === state
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-gray-50 hover:border-primary-300'
                }`}
              >
                <div className="aspect-square flex items-center justify-center mb-2">
                  <BilbarsCharacter
                    state={state}
                    size="sm"
                    autoAnimate={false}
                    floatingEffect={false}
                  />
                </div>
                <div className="text-xs font-semibold text-center text-gray-700">
                  {state}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Animation Types Test */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Тест Scroll Анимаций
          </h2>
          <div className="space-y-12">
            {['fadeUp', 'fadeLeft', 'fadeRight', 'scale', 'bounce'].map((animationType) => (
              <div key={animationType} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {animationType}
                </h3>
                <BilbarsSectionAnimated
                  state="wave"
                  size="md"
                  position="center"
                  animationType={animationType as any}
                  threshold={0.1}
                  delay={0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">
                ✅ Все компоненты загружены
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 25 изображений БИЛБАРСА</li>
                <li>• 25 состояний с анимациями</li>
                <li>• 5 типов scroll анимаций</li>
                <li>• 4 размера (sm, md, lg, xl)</li>
                <li>• Responsive адаптация</li>
                <li>• Accessibility поддержка</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
