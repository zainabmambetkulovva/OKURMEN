'use client';

import { useTranslations } from 'next-intl';

export default function WhySection() {
  const t = useTranslations('why');

  const features = [
    {
      icon: '🔄',
      title: t('hybrid.title'),
      description: t('hybrid.description'),
      color: 'blue',
    },
    {
      icon: '👨‍🏫',
      title: t('mentor.title'),
      description: t('mentor.description'),
      color: 'orange',
    },
    {
      icon: '📱',
      title: t('access.title'),
      description: t('access.description'),
      color: 'blue',
    },
    {
      icon: '🎯',
      title: t('methodology.title'),
      description: t('methodology.description'),
      color: 'orange',
    },
    {
      icon: '💰',
      title: t('grant.title'),
      description: t('grant.description'),
      color: 'blue',
    },
    {
      icon: '📚',
      title: t('activities.title'),
      description: t('activities.description'),
      color: 'orange',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-4xl shadow-soft ${
                  feature.color === 'blue'
                    ? 'bg-primary-50 group-hover:bg-primary-100'
                    : 'bg-accent-50 group-hover:bg-accent-100'
                } transition-colors duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-dark-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div
                className={`mt-6 h-1 rounded-full transition-all duration-300 ${
                  feature.color === 'blue'
                    ? 'w-12 bg-primary-500 group-hover:w-full'
                    : 'w-12 bg-accent-500 group-hover:w-full'
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-soft p-8 max-w-2xl border border-gray-100">
            <p className="text-lg text-dark-700 leading-relaxed">
              <span className="font-bold text-primary-600">3000+</span>{' '}
              {t('bottom_text')}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-accent-500 text-2xl">
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
