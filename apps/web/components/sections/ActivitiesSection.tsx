'use client';

import { useTranslations } from 'next-intl';

export default function ActivitiesSection() {
  const t = useTranslations('activities');

  const activities = [
    {
      title: t('onugu'),
      icon: '🌱',
      color: 'blue',
    },
    {
      title: t('oratory'),
      icon: '🎤',
      color: 'orange',
    },
    {
      title: t('literacy'),
      icon: '⌨️',
      color: 'blue',
    },
    {
      title: t('talking'),
      icon: '💬',
      color: 'orange',
    },
    {
      title: t('ai'),
      icon: '🤖',
      color: 'blue',
    },
    {
      title: t('seminars'),
      icon: '🎯',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 mb-6 rounded-xl flex items-center justify-center text-5xl shadow-soft ${
                  activity.color === 'blue'
                    ? 'bg-primary-50 group-hover:bg-primary-100'
                    : 'bg-accent-50 group-hover:bg-accent-100'
                } transition-colors duration-300`}
              >
                {activity.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                {activity.title}
              </h3>

              {/* Decorative Line */}
              <div
                className={`mt-6 h-1 rounded-full transition-all duration-300 ${
                  activity.color === 'blue'
                    ? 'w-12 bg-primary-500 group-hover:w-full'
                    : 'w-12 bg-accent-500 group-hover:w-full'
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
          <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 mb-4">
            {t('bottom_title')}
          </h3>
          <p className="text-dark-700 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            {t('bottom_description')}
          </p>
          <div className="flex items-center justify-center space-x-4 flex-wrap gap-3">
            <span className="px-5 py-2 bg-white rounded-full text-sm font-semibold text-dark-700 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
              🎓 {t('badge_education')}
            </span>
            <span className="px-5 py-2 bg-white rounded-full text-sm font-semibold text-dark-700 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
              💪 {t('badge_development')}
            </span>
            <span className="px-5 py-2 bg-white rounded-full text-sm font-semibold text-dark-700 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
              🤝 {t('badge_community')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
