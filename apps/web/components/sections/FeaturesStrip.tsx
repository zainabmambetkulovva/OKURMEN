'use client';

import { useTranslations } from 'next-intl';

export default function FeaturesStrip() {
  const t = useTranslations('features');

  const features = [
    {
      icon: '🌐',
      title: t('online_title'),
      description: t('online_desc'),
    },
    {
      icon: '👨‍🏫',
      title: t('mentor_title'),
      description: t('mentor_desc'),
    },
    {
      icon: '📱',
      title: t('app_title'),
      description: t('app_desc'),
    },
    {
      icon: '🎓',
      title: t('certificate_title'),
      description: t('certificate_desc'),
    },
    {
      icon: '💰',
      title: t('grant_title'),
      description: t('grant_desc'),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center space-y-3 p-4 rounded-xl hover:bg-white hover:shadow-soft transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="font-bold text-dark-800 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-dark-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
