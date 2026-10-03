'use client';

import { useTranslations } from 'next-intl';

export default function WhySection() {
  const t = useTranslations('why');

  const advantages = [
    { id: 'hybrid', number: '01' },
    { id: 'mentor', number: '02' },
    { id: 'access', number: '03' },
    { id: 'methodology', number: '04' },
    { id: 'grant', number: '05' },
    { id: 'activities', number: '06' },
  ];

  return (
    <section id="about" className="relative bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
        </div>

        {/* Advantages Grid */}
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

                {/* Icon */}
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

                {/* Title */}
                <h3 className="text-lg font-bold text-dark-900 mb-2">
                  {t(`${advantage.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-dark-600 leading-relaxed">
                  {t(`${advantage.id}.description`)}
                </p>

                {/* Accent Line */}
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

        {/* CTA */}
        <div className="mt-16 lg:mt-20 max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
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
      </div>
    </section>
  );
}
