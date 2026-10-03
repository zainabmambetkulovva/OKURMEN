'use client';

<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.TTzCyaOFcH/ours
import { Star, User, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

interface Review {
  id: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
  student: {
    fullName: string;
    photo: string | null;
  } | null;
  course: {
    translation: {
      title: string;
    } | null;
  } | null;
  translation: {
    comment: string;
  } | null;
}
=======
import { useTranslations } from 'next-intl';
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.TTzCyaOFcH/theirs

export default function ReviewsSection() {
  const locale = useLocale();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-pink-500 to-rose-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-indigo-500',
    'from-orange-500 to-amber-500',
    'from-teal-500 to-cyan-500',
  ];

  // Update itemsPerView on mount and resize
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1024) {
          setItemsPerView(3);
        } else if (width >= 640) {
          setItemsPerView(2);
        } else {
          setItemsPerView(1);
        }
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const response = await fetch(`${apiUrl}/api/reviews`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          // Фильтруем только одобренные отзывы
          const approvedReviews = data.data.filter((review: Review) => review.isApproved);
          setReviews(approvedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Carousel controls
  const maxIndex = Math.max(0, Math.ceil(reviews.length / itemsPerView) - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (loading) {
    return (
      <section id="reviews" className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Отзывы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Отзывы
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Отзывы студентов появятся здесь
            </p>
            <div className="p-12 bg-white dark:bg-slate-900 rounded-2xl">
              <Quote className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                Пока отзывов нет
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.TTzCyaOFcH/ours
    <section id="reviews" className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/10 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Отзывы
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Что говорят наши студенты, выпускники и их родители
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {reviews.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: Math.ceil(reviews.length / itemsPerView) }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
                >
                  {reviews
                    .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                    .map((review, index) => {
                      const gradient = gradients[index % gradients.length];
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
                      const photoUrl = review.student?.photo ? `${apiUrl}${review.student.photo}` : null;
                      const studentName = review.student?.fullName || 'Студент';
                      const courseTitle = review.course?.translation?.title || '';

                      return (
                        <div
                          key={review.id}
                          className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-soft hover:shadow-premium-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-800 hover:-translate-y-2 min-h-[320px] flex flex-col"
                        >
                          {/* Quote Icon Background */}
                          <div className={`absolute top-6 right-6 p-3 bg-gradient-to-br ${gradient} rounded-xl opacity-10`}>
                            <Quote className="w-8 h-8" />
                          </div>

                          <div className="space-y-5 flex-1 flex flex-col">
                            {/* Avatar and Info */}
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 ${photoUrl ? 'w-14 h-14' : 'p-3'} bg-gradient-to-br ${gradient} rounded-full overflow-hidden`}>
                                {photoUrl ? (
                                  <img src={photoUrl} alt={studentName} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-8 h-8 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate">
                                  {studentName}
                                </h4>
                                {courseTitle && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                                    {courseTitle}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-5 h-5 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-slate-300 dark:text-slate-600'
                                  }`} 
                                />
                              ))}
                            </div>

                            {/* Review Text */}
                            <div className="flex-1">
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-6">
                                {review.translation?.comment || 'Отличный курс!'}
                              </p>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-slate-500 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                              {new Date(review.createdAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'ky' ? 'ky-KG' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>

                          {/* Decorative corner on hover */}
                          <div className="absolute bottom-4 right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className={`absolute bottom-0 right-0 w-6 h-0.5 bg-gradient-to-l ${gradient}`}></div>
                            <div className={`absolute bottom-0 right-0 w-0.5 h-6 bg-gradient-to-t ${gradient}`}></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {reviews.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-orange-600'
                      : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
=======
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
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.TTzCyaOFcH/theirs
      </div>
    </section>
  );
}
