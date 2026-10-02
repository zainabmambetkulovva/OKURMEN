'use client';

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="relative bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content - Spans 6 columns */}
          <div className="lg:col-span-6 space-y-8">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="text-dark-600 font-medium text-xs uppercase tracking-wide">
                {t('label')}
              </span>
            </div>

            {/* Large Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-dark-900">
              {t('headline')}
            </h2>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-dark-600 leading-relaxed max-w-xl">
              {t('description')}
            </p>

            {/* Key Details - Minimal List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                </div>
                <p className="text-dark-700 font-medium">{t('point1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                </div>
                <p className="text-dark-700 font-medium">{t('point2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                </div>
                <p className="text-dark-700 font-medium">{t('point3')}</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element - Spans 6 columns */}
          <div className="lg:col-span-6">
            {/* Strong Visual Container */}
            <div className="relative">
              {/* Main Card - Large Blue */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 shadow-soft-lg">
                <div className="space-y-8">
                  {/* Stats Display */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Stat 1 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                        2022
                      </div>
                      <p className="text-white/80 text-sm font-medium">
                        {t('founded')}
                      </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                        3000+
                      </div>
                      <p className="text-white/80 text-sm font-medium">
                        {t('students')}
                      </p>
                    </div>
                  </div>

                  {/* Founders Info */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">👥</span>
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        {t('founders')}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/90 text-sm font-medium">
                        Санжарбек Мадумаров
                      </p>
                      <p className="text-white/90 text-sm font-medium">
                        Улукбек Бакыбек уулу
                      </p>
                    </div>
                    <p className="text-white/60 text-xs mt-3">
                      {t('founded_date')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Small Accent Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-accent-500 opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
