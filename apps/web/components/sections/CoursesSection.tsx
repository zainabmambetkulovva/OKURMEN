'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function CoursesSection() {
  const t = useTranslations('courses');

  const coursePlaceholders = [
    {
      id: 1,
      icon: '💻',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
    },
    {
      id: 2,
      icon: '🎨',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
    },
    {
      id: 3,
      icon: '📱',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 animate-fade-in">
            {/* Orange Label */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-50 border border-accent-200">
              <span className="text-accent-700 font-semibold text-sm">
                📚 {t('label')}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 leading-tight">
              {t('title')}
            </h2>

            {/* Description List */}
            <div className="space-y-4 text-dark-600">
              <div className="flex items-start space-x-3">
                <span className="text-primary-600 mt-1">✓</span>
                <p className="text-lg">{t('point1')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-primary-600 mt-1">✓</span>
                <p className="text-lg">{t('point2')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-primary-600 mt-1">✓</span>
                <p className="text-lg">{t('point3')}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                variant="primary"
                onClick={scrollToContacts}
                className="text-lg font-bold"
              >
                {t('cta_all_courses')}
              </Button>
            </div>
          </div>

          {/* Right Column: Course Cards */}
          <div className="space-y-6 animate-fade-in animation-delay-200">
            {coursePlaceholders.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-200 hover:shadow-soft-lg transition-all duration-300 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${course.bgColor} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                    {course.icon}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                    {t('hybrid_format')}
                  </span>
                  <span className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-medium">
                    {t('personal_mentor')}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    24/7
                  </span>
                </div>
              </div>
            ))}

            {/* Info Note */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-dark-600 leading-relaxed">
                💡 {t('info_note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
