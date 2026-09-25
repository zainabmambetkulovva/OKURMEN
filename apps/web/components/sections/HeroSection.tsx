'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-white overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Content - Spans 7 columns on desktop */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 bg-primary-50">
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
              <span className="text-primary-700 font-semibold text-xs uppercase tracking-wide">
                {t('badge')}
              </span>
            </div>

            {/* Headline - Very Large */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-dark-900">
              {t('title')}
              <span className="block mt-2 text-primary-600">{t('title_highlight')}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl lg:text-2xl text-dark-600 leading-relaxed max-w-2xl">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('#courses')}
                className="group px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 hover:shadow-soft-lg transition-all duration-200 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  {t('cta_primary')}
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => scrollToSection('#about')}
                className="px-8 py-4 border-2 border-dark-200 text-dark-700 font-semibold rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                {t('cta_secondary')}
              </button>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-12 border-t border-dark-100">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600">3000+</div>
                <div className="text-sm text-dark-600 mt-1">{t('stat_students')}</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600">4+</div>
                <div className="text-sm text-dark-600 mt-1">{t('stat_years')}</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-dark-600 mt-1">{t('stat_online')}</div>
              </div>
            </div>
          </div>

          {/* Visual Element - Spans 5 columns on desktop */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Container */}
            <div className="relative">
              {/* Large Blue Shape */}
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 shadow-soft-lg">
                <div className="h-full flex flex-col justify-between">
                  {/* Top Content */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <div className="w-3 h-3 rounded-full bg-accent-500"></div>
                      <span className="text-white text-sm font-semibold">
                        {t('visual_badge')}
                      </span>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm">
                      <span className="text-7xl">💻</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="text-white/90 text-center">
                    <p className="font-medium">{t('visual_text')}</p>
                  </div>
                </div>
              </div>

              {/* Floating Info Cards */}
              {/* Card 1 - Top Right */}
              <div className="absolute -top-6 -right-6 lg:-right-12 bg-white rounded-2xl shadow-soft-lg p-5 max-w-[200px] hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark-900">
                      {t('card1_title')}
                    </div>
                    <div className="text-xs text-dark-600 mt-0.5">
                      {t('card1_subtitle')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Bottom Left */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white rounded-2xl shadow-soft-lg p-5 max-w-[200px] hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <span className="text-xl">👨‍🏫</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dark-900">
                      {t('card2_title')}
                    </div>
                    <div className="text-xs text-dark-600 mt-0.5">
                      {t('card2_subtitle')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Dot - Small orange */}
              <div className="absolute top-1/4 -left-3 w-6 h-6 rounded-full bg-accent-500 shadow-orange"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
    </section>
  );
}
