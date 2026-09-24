'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export default function TeamSection() {
  const t = useTranslations('team');

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <Container>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>

        {/* Подтверждённая информация о команде */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Основатели */}
          <Card hover className="bg-gradient-to-br from-primary-50 to-accent-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300">
                👥
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t('founders_title')}
                </h3>
                <p className="text-gray-600">{t('founded_date')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="font-bold text-lg text-gray-900">
                  Санжарбек Мадумаров
                </p>
                <p className="text-gray-600 text-sm">{t('cofounder')}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="font-bold text-lg text-gray-900">
                  Улукбек Бакыбек уулу
                </p>
                <p className="text-gray-600 text-sm">{t('cofounder')}</p>
              </div>
            </div>
          </Card>

          {/* Онлайн-преподаватель */}
          <Card hover className="bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300">
                👩‍🏫
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {t('online_teacher')}
                </h3>
                <p className="text-gray-600">USA</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="font-bold text-lg text-gray-900">
                Айзада Акылбекова
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {t('teacher_role')}
              </p>
              <p className="text-gray-700 text-sm">
                {t('teacher_description')}
              </p>
            </div>
          </Card>
        </div>

        {/* Info Message */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto hover:shadow-xl transition-shadow duration-300 animate-fade-in">
          <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium mb-4">
            👥 {t('info_title')}
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('info_description')}
          </p>
          <p className="text-sm text-gray-600">
            {t('info_details')}
          </p>
        </div>
      </Container>
    </section>
  );
}
