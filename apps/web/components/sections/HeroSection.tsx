'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const t = useTranslations('hero');

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-50 border border-accent-200">
              <span className="text-accent-700 font-semibold text-sm">
                ✨ {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-dark-900">
              {t('title')}{' '}
              <span className="text-accent-500">{t('title_highlight')}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-dark-600 leading-relaxed max-w-xl">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => scrollToSection('#courses')}
                className="w-full sm:w-auto text-lg font-bold"
              >
                {t('cta_primary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#about')}
                className="w-full sm:w-auto"
              >
                {t('cta_secondary')}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
              <div>
                <div className="text-3xl font-bold text-primary-600">3000+</div>
                <div className="text-sm text-dark-600">{t('stat_students')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">4+</div>
                <div className="text-sm text-dark-600">{t('stat_years')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-dark-600">{t('stat_online')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Elements */}
          <div className="relative lg:h-[600px] animate-fade-in animation-delay-200">
            {/* Main Image Container */}
            <div className="relative z-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 shadow-soft-lg">
              <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {/* Placeholder for image */}
                <div className="text-center space-y-4">
                  <div className="text-8xl">💻</div>
                  <p className="text-white font-medium">Modern IT Education</p>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute top-8 -right-4 lg:right-8 bg-white rounded-xl shadow-soft-lg p-4 z-20 animate-slide-in-right">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-2xl">
                  👨‍🏫
                </div>
                <div>
                  <div className="text-sm font-semibold text-dark-800">
                    {t('card_mentor')}
                  </div>
                  <div className="text-xs text-dark-500">{t('card_mentor_sub')}</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute bottom-8 -left-4 lg:left-8 bg-white rounded-xl shadow-soft-lg p-4 z-20 animate-slide-in-left animation-delay-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                  🎓
                </div>
                <div>
                  <div className="text-sm font-semibold text-dark-800">
                    {t('card_hybrid')}
                  </div>
                  <div className="text-xs text-dark-500">{t('card_hybrid_sub')}</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
