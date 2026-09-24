'use client';

import { useTranslations } from 'next-intl';

export default function TeamSection() {
  const t = useTranslations('team');

  return (
    <section id="team" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Founders Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl">
                👥
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark-900">
                  {t('founders_title')}
                </h3>
                <p className="text-dark-600">{t('founded_date')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-5 border border-primary-200">
                <p className="font-bold text-lg text-dark-900">
                  Санжарбек Мадумаров
                </p>
                <p className="text-dark-600 text-sm">{t('cofounder')}</p>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-5 border border-primary-200">
                <p className="font-bold text-lg text-dark-900">
                  Улукбек Бакыбек уулу
                </p>
                <p className="text-dark-600 text-sm">{t('cofounder')}</p>
              </div>
            </div>
          </div>

          {/* Online Teacher Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center text-4xl">
                👩‍🏫
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark-900">
                  {t('online_teacher')}
                </h3>
                <p className="text-dark-600">USA</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-5 border border-accent-200">
              <p className="font-bold text-lg text-dark-900">
                Айзада Акылбекова
              </p>
              <p className="text-dark-600 text-sm mb-2">
                {t('teacher_role')}
              </p>
              <p className="text-dark-700 text-sm">
                {t('teacher_description')}
              </p>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="text-center bg-white border border-gray-100 rounded-3xl p-8 shadow-soft max-w-3xl mx-auto">
          <div className="inline-block bg-primary-100 text-primary-700 px-5 py-2 rounded-full font-semibold mb-4 text-sm">
            👥 {t('info_title')}
          </div>
          <p className="text-dark-700 text-lg leading-relaxed mb-4">
            {t('info_description')}
          </p>
          <p className="text-sm text-dark-600">
            {t('info_details')}
          </p>
        </div>
      </div>
    </section>
  );
}
