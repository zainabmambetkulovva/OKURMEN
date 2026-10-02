'use client';

import { useTranslations } from 'next-intl';
<<<<<<< HEAD
import { RefreshCw, Users, Smartphone, Target, DollarSign, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
=======
>>>>>>> feature/landing

export default function WhySection() {
  const t = useTranslations('why');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

<<<<<<< HEAD
  const features = [
    { 
      icon: RefreshCw, 
      title: t('hybrid.title'), 
      description: t('hybrid.description'), 
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Users, 
      title: t('mentor.title'), 
      description: t('mentor.description'), 
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600'
    },
    { 
      icon: Smartphone, 
      title: t('access.title'), 
      description: t('access.description'), 
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600'
    },
    { 
      icon: Target, 
      title: t('methodology.title'), 
      description: t('methodology.description'), 
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600'
    },
    { 
      icon: DollarSign, 
      title: t('grant.title'), 
      description: t('grant.description'), 
      gradient: 'from-yellow-500 to-amber-500',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600'
    },
    { 
      icon: BookOpen, 
      title: t('activities.title'), 
      description: t('activities.description'), 
      gradient: 'from-indigo-500 to-purple-500',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600'
    },
=======
  const advantages = [
    { id: 'hybrid', number: '01' },
    { id: 'mentor', number: '02' },
    { id: 'access', number: '03' },
    { id: 'methodology', number: '04' },
    { id: 'grant', number: '05' },
    { id: 'activities', number: '06' },
>>>>>>> feature/landing
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
<<<<<<< HEAD
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Мы предлагаем уникальный подход к IT-образованию
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-soft hover:shadow-premium-lg transition-all duration-500 border border-slate-200 dark:border-slate-700 hover:border-transparent overflow-hidden hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Icon with enhanced hover effects */}
                  <div className={`inline-flex p-4 rounded-2xl ${feature.iconBg} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm group-hover:shadow-md`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.gradient} transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Corner with Animation */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <div className={`absolute top-0 right-0 w-8 h-0.5 bg-gradient-to-r ${feature.gradient}`}></div>
                  <div className={`absolute top-0 right-0 w-0.5 h-8 bg-gradient-to-b ${feature.gradient}`}></div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
            );
          })}
        </div>
=======
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6">
            <span className="text-primary-700 font-medium text-xs uppercase tracking-wide">
              {t('label')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-900 leading-tight mb-6">
            {t('title')}
          </h2>
          
          <p className="text-lg sm:text-xl text-dark-600 leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Large Number Statement */}
          <div className="mt-12 inline-flex items-center justify-center gap-4 px-8 py-6 bg-white rounded-2xl border-2 border-primary-100 shadow-soft">
            <div className="text-5xl sm:text-6xl font-bold text-primary-600">
              3000+
            </div>
            <div className="text-left">
              <div className="text-sm text-dark-500 uppercase tracking-wide">
                {t('students_label')}
              </div>
              <div className="text-base font-medium text-dark-900">
                {t('students_text')}
              </div>
            </div>
          </div>
        </div>

        {/* Advantages Grid - 2x3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => {
            const isBlue = index % 2 === 0;
            
            return (
              <div
                key={advantage.id}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-soft-lg"
              >
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                  <span className="text-white font-bold text-sm">
                    {advantage.number}
                  </span>
                </div>

                {/* Small Icon Indicator */}
                <div
                  className={`w-8 h-8 rounded-lg mb-4 transition-colors duration-300 ${
                    isBlue
                      ? 'bg-primary-50 group-hover:bg-primary-100'
                      : 'bg-accent-50 group-hover:bg-accent-100'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-lg border-2 transition-colors duration-300 ${
                      isBlue
                        ? 'border-primary-200 group-hover:border-primary-400'
                        : 'border-accent-200 group-hover:border-accent-400'
                    }`}
                  ></div>
                </div>

                {/* Title - Very Short */}
                <h3 className="text-lg font-bold text-dark-900 mb-2">
                  {t(`${advantage.id}.title`)}
                </h3>

                {/* Description - Short */}
                <p className="text-sm text-dark-600 leading-relaxed">
                  {t(`${advantage.id}.description`)}
                </p>

                {/* Bottom Accent Line */}
                <div
                  className={`mt-4 h-0.5 rounded-full transition-all duration-300 ${
                    isBlue
                      ? 'w-8 bg-primary-500 group-hover:w-16'
                      : 'w-8 bg-accent-500 group-hover:w-16'
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Visual Element */}
        <div className="mt-16 lg:mt-20 max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-white/80 text-sm uppercase tracking-wide mb-3">
                {t('cta_label')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {t('cta_title')}
              </h3>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                {t('cta_button')}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
>>>>>>> feature/landing
      </div>
    </section>
  );
}
