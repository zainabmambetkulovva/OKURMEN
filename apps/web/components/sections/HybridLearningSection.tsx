'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export default function HybridLearningSection() {
  const t = useTranslations('hybrid');

  const steps = [
    {
      number: 1,
      title: t('step1'),
      icon: '💻',
      description: t('step1_desc'),
    },
    {
      number: 2,
      title: t('step2'),
      icon: '👨‍🏫',
      description: t('step2_desc'),
    },
    {
      number: 3,
      title: t('step3'),
      icon: '🏫',
      description: t('step3_desc'),
    },
    {
      number: 4,
      title: t('step4'),
      icon: '💬',
      description: t('step4_desc'),
    },
    {
      number: 5,
      title: t('step5'),
      icon: '📱',
      description: t('step5_desc'),
    },
  ];

  return (
    <section id="learning" className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-accent-200 to-purple-200 transform -translate-y-1/2"></div>

          <div className="relative z-10 flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-48"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Icon Circle */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-4xl shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-4 border-primary-600 rounded-full flex items-center justify-center font-bold text-primary-600">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform translate-x-12 text-primary-400 text-3xl animate-pulse">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Number & Icon */}
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center font-bold text-primary-600 text-xs">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="text-primary-400 text-2xl">↓</div>
              )}
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">🌍</span>
              <h4 className="font-bold text-xl text-gray-900">
                {t('online_title')}
              </h4>
            </div>
            <p className="text-gray-700">
              {t('online_desc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">🎯</span>
              <h4 className="font-bold text-xl text-gray-900">
                {t('aem_title')}
              </h4>
            </div>
            <p className="text-gray-700">
              {t('aem_desc')}
            </p>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
