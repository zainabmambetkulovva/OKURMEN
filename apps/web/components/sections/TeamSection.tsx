'use client';

import { useTranslations } from 'next-intl';

export default function TeamSection() {
  const t = useTranslations('team');

  return (
    <section id="team" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-dark-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-dark-600">
            Информация о команде добавляется
          </p>
        </div>
      </div>
    </section>
  );
}
