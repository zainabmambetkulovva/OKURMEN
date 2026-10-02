'use client';

import { useTranslations } from 'next-intl';

export default function StudentsSection() {
  const t = useTranslations('students');

  const achievements = [
    {
      icon: '🍎',
      company: 'Apple',
      description: t('apple'),
    },
    {
      icon: '🏛️',
      company: t('mayor_company'),
      description: t('mayor'),
    },
    {
      icon: '🏢',
      company: 'Kulikovsky',
      description: t('kulikovsky'),
    },
    {
      icon: '🇰🇿',
      company: t('kazakhstan_company'),
      description: t('kazakhstan'),
    },
    {
      icon: '💼',
      company: t('freelance_company'),
      description: t('freelance'),
    },
  ];

  return (
    <section id="students" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Stat Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl shadow-soft-lg p-12 text-center">
            <div className="text-7xl mb-6">🎓</div>
            <h3 className="text-6xl sm:text-7xl font-bold mb-4">3000+</h3>
            <p className="text-2xl font-semibold opacity-95">{t('total')}</p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-20 h-20 mb-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl flex items-center justify-center text-5xl shadow-soft group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                {achievement.company}
              </h3>
              <p className="text-dark-600 leading-relaxed">
                {achievement.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 h-1 w-12 bg-accent-500 rounded-full group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Info Card */}
        <div className="mt-16 bg-white border border-gray-100 rounded-3xl shadow-soft p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h4 className="font-bold text-xl text-dark-900 mb-2">
                {t('employment_title')}
              </h4>
              <p className="text-dark-600 text-sm">
                {t('employment_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h4 className="font-bold text-xl text-dark-900 mb-2">
                {t('international_title')}
              </h4>
              <p className="text-dark-600 text-sm">
                {t('international_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h4 className="font-bold text-xl text-dark-900 mb-2">
                {t('growth_title')}
              </h4>
              <p className="text-dark-600 text-sm">
                {t('growth_desc')}
              </p>
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-dark-700 text-lg leading-relaxed">
              <span className="font-bold text-primary-600">
                {t('bottom_highlight')}
              </span>{' '}
              {t('bottom_text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
