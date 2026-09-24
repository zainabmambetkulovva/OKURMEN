'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export default function ReviewsSection() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <Container>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>

        {/* Review Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Student Reviews */}
          <div className="animate-slide-up">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-3xl">🎓</span>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('students')}
              </h3>
            </div>

            {/* Review Card Structure (Placeholder) */}
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <Card key={index} hover className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                      S
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm hover:scale-110 transition-transform duration-200">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        {t('student_review')}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Parent Reviews */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <h3 className="text-2xl font-bold text-gray-900">
                {t('parents')}
              </h3>
            </div>

            {/* Review Card Structure (Placeholder) */}
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <Card key={index} hover className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                      P
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm hover:scale-110 transition-transform duration-200">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        {t('parent_review')}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto hover:shadow-xl transition-shadow duration-300 animate-fade-in">
          <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium mb-4">
            💬 {t('info_title')}
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {t('info_description')}
          </p>
          <p className="text-sm text-gray-600">
            {t('info_details')}
          </p>
        </div>

        {/* Overall Rating Display */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: t('rating_quality'), rating: '5.0' },
            { label: t('rating_support'), rating: '5.0' },
            { label: t('rating_results'), rating: '5.0' },
          ].map((item, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {item.rating}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl hover:scale-125 transition-transform duration-200">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-700 font-medium">{item.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
