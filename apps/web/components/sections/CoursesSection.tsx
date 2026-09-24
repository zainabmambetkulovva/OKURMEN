'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CoursesSection() {
  const t = useTranslations('courses');

  const coursePlaceholders = [
    {
      id: 1,
      icon: '💻',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      icon: '🎨',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      icon: '📱',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="courses" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
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

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coursePlaceholders.map((course, index) => (
            <Card
              key={course.id}
              hover
              className="group relative overflow-hidden animate-slide-up"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {/* Course Icon */}
              <div
                className={`w-full h-48 bg-gradient-to-br ${course.gradient} rounded-xl mb-6 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300`}
              >
                {course.icon}
              </div>

              {/* Course Info */}
              <div className="space-y-4">
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors duration-200">
                    {t('hybrid_format')}
                  </span>
                  <span className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-sm font-medium hover:bg-accent-100 transition-colors duration-200">
                    {t('personal_mentor')}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">{t('format_label')}</div>
                    <div className="font-bold text-gray-900">{t('hybrid')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">{t('classes_label')}</div>
                    <div className="font-bold text-gray-900">{t('twice_week')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">{t('access_label')}</div>
                    <div className="font-bold text-gray-900">{t('always')}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant="primary"
                  size="md"
                  className="w-full mt-4 hover:scale-105 transition-transform duration-200"
                  onClick={() => {
                    console.log('Course details');
                  }}
                >
                  {t('learn_more')}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Message */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300">
          <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium mb-4">
            📚 {t('info_badge')}
          </div>
          <p className="text-gray-700 leading-relaxed">
            {t('info_description')}
          </p>
        </div>
      </Container>
    </section>
  );
}
