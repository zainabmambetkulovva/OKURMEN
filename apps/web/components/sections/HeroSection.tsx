'use client';

import { useTranslations } from 'next-intl';
<<<<<<< HEAD
import { ArrowRight, Play, Sparkles, TrendingUp, Award } from 'lucide-react';
import BilbarsHeroCard from '@/components/Bilbars/BilbarsHeroCard';
=======
>>>>>>> feature/landing

export default function HeroSection() {
  const t = useTranslations('hero');

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
<<<<<<< HEAD
    <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Улучшенные декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Главный оранжевый круг */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-orange-200/30 via-orange-300/20 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 animate-pulse" style={{ animationDuration: '4s' }}></div>
        
        {/* Синий круг */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/30 via-blue-300/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        
        {/* Дополнительные акценты */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Улучшенная типографика */}
          <div className="space-y-8 lg:space-y-10">
            {/* Badge с иконкой */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-soft-lg border border-orange-200/50 dark:border-slate-700/50 animate-slide-down">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Лучшее IT Образование в Кыргызстане
              </span>
            </div>

            {/* Main Heading - Улучшенная иерархия */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-balance">
                <span className="block text-slate-900 dark:text-white mb-2">
                  Построй Свое
                </span>
                <span className="block text-slate-900 dark:text-white mb-3">
                  Будущее с{' '}
                </span>
                <span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                  ОКУРМЭН
                </span>
              </h1>
            </div>

            {/* Description - Улучшенная читаемость */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Освойте востребованные IT-профессии с практическим подходом. 
              <span className="font-semibold text-slate-700 dark:text-slate-200"> Гибридный формат обучения</span> и 
              <span className="font-semibold text-slate-700 dark:text-slate-200"> личный ментор</span> на каждом этапе.
            </p>

            {/* CTA Buttons - Улучшенный стиль */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('#courses')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Смотреть Курсы
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('#about')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                Узнать Больше
              </button>
            </div>

            {/* Мини статистика с иконками */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Формат</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Гибридный</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Результат</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Сертификат</div>
                </div>
=======
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
>>>>>>> feature/landing
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* Right Side - Билбарс карточка */}
          <div className="relative lg:pl-8">
            {/* Main Visual */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Основная карточка с Билбарсом */}
              <div className="relative h-full bg-gradient-to-br from-orange-100 via-white to-blue-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl overflow-visible shadow-premium-lg border-2 border-orange-200/50 dark:border-slate-600/50">
                {/* Декоративная сетка */}
                <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>
                
                {/* Билбарс Hero Card - автоматически меняющийся */}
                <div className="absolute inset-0">
                  <BilbarsHeroCard />
                </div>

                {/* Плавающие элементы с улучшенной анимацией */}
                <div className="absolute top-8 left-8 p-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-premium border border-orange-200/50 dark:border-slate-700 animate-float z-20" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">3K+</div>
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Студентов</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 p-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-premium border border-blue-200/50 dark:border-slate-700 animate-float z-20" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">95%</div>
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Успех</div>
                    </div>
                  </div>
                </div>
              </div>
=======
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
>>>>>>> feature/landing
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
>>>>>>> feature/landing
    </section>
  );
}
