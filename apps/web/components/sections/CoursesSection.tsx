'use client';

import { useTranslations } from 'next-intl';

export default function CoursesSection() {
  const t = useTranslations('courses');

  const courses = [
    {
      id: 'frontend',
      icon: '💻',
      featured: true,
      accentColor: 'blue',
    },
    {
      id: 'backend',
      icon: '⚙️',
      featured: false,
      accentColor: 'blue',
    },
    {
      id: 'mobile',
      icon: '📱',
      featured: false,
      accentColor: 'orange',
    },
    {
      id: 'design',
      icon: '🎨',
      featured: false,
      accentColor: 'orange',
    },
  ];

  return (
    <section id="courses" className="relative bg-white py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="text-dark-600 font-medium text-xs uppercase tracking-wide">
              {t('label')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 leading-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-dark-600 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {courses.map((course) => {
            const isFeatured = course.featured;
            const isBlue = course.accentColor === 'blue';
            const isOrange = course.accentColor === 'orange';

            return (
              <div
                key={course.id}
                className={`
                  group relative bg-white rounded-3xl border-2 transition-all duration-300
                  ${isFeatured ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}
                  ${isBlue ? 'border-gray-200 hover:border-primary-300 hover:shadow-soft-lg' : ''}
                  ${isOrange ? 'border-gray-200 hover:border-accent-300 hover:shadow-soft-lg' : ''}
                `}
              >
                <div className={`p-6 sm:p-8 ${isFeatured ? 'lg:p-10' : ''} h-full flex flex-col`}>
                  {/* Icon */}
                  <div
                    className={`
                      flex items-center justify-center rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-105
                      ${isFeatured ? 'w-20 h-20 text-5xl' : 'w-16 h-16 text-4xl'}
                      ${isBlue ? 'bg-primary-50' : ''}
                      ${isOrange ? 'bg-accent-50' : ''}
                    `}
                  >
                    {course.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className={`
                        font-bold text-dark-900 mb-3
                        ${isFeatured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'}
                      `}
                    >
                      {t(`${course.id}.name`)}
                    </h3>
                    <p
                      className={`
                        text-dark-600 leading-relaxed
                        ${isFeatured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}
                      `}
                    >
                      {t(`${course.id}.description`)}
                    </p>

                    {/* Tags - Only for featured */}
                    {isFeatured && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-100">
                          {t('tag_popular')}
                        </span>
                        <span className="px-3 py-1.5 bg-gray-50 text-dark-600 rounded-full text-xs font-medium border border-gray-200">
                          {t('tag_beginner')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Arrow CTA */}
                  <div className="flex items-center gap-2 mt-6 text-dark-900 font-medium group-hover:gap-3 transition-all duration-300">
                    <span className={isFeatured ? 'text-base' : 'text-sm'}>{t('learn_more')}</span>
                    <svg
                      className={`transition-transform duration-300 group-hover:translate-x-1 ${isBlue ? 'text-primary-600' : ''} ${isOrange ? 'text-accent-600' : ''}`}
                      width={isFeatured ? '24' : '20'}
                      height={isFeatured ? '24' : '20'}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Wide Card - Full Width */}
          <div className="lg:col-span-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 mb-3">
                  {t('custom.name')}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {t('custom.description')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300"
                >
                  {t('custom.cta')}
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
      </div>
    </section>
  );
}
