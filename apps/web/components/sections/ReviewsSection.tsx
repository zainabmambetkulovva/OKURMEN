'use client';

import { useTranslations } from 'next-intl';

export default function ReviewsSection() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        {/* Overall Rating Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { label: t('rating_quality'), rating: '5.0', icon: '🎓' },
            { label: t('rating_support'), rating: '5.0', icon: '💪' },
            { label: t('rating_results'), rating: '5.0', icon: '🎯' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-4xl font-bold text-primary-600 mb-3">
                {item.rating}
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent-500 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-dark-700 font-semibold">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Empty State for Future Reviews */}
        <div className="text-center bg-gradient-to-br from-primary-50 to-accent-50 border border-gray-100 rounded-3xl p-12 max-w-3xl mx-auto">
          <div className="inline-block bg-white px-5 py-2 rounded-full font-semibold mb-6 text-sm shadow-soft">
            💬 {t('info_title')}
          </div>
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-dark-900 mb-4">
            {t('info_title')}
          </h3>
          <p className="text-dark-700 text-lg leading-relaxed mb-4">
            {t('info_description')}
          </p>
          <p className="text-sm text-dark-600">
            {t('info_details')}
          </p>

          {/* Categories Badges */}
          <div className="mt-8 flex items-center justify-center space-x-4 flex-wrap gap-3">
            <span className="px-5 py-2 bg-white rounded-full text-sm font-semibold text-dark-700 shadow-soft">
              🎓 {t('students')}
            </span>
            <span className="px-5 py-2 bg-white rounded-full text-sm font-semibold text-dark-700 shadow-soft">
              👨‍👩‍👧‍👦 {t('parents')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
