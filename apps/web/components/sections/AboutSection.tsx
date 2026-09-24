'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export default function AboutSection() {
  const t = useTranslations('about');

  const stats = [
    {
      number: '2022',
      label: t('founded'),
      icon: '🎯',
    },
    {
      number: '3000+',
      label: t('students'),
      icon: '👥',
    },
    {
      number: '15-50',
      label: t('age_range'),
      icon: '📊',
    },
  ];

  const founders = [
    {
      name: 'Санжарбек Мадумаров',
      role: t('founders'),
    },
    {
      name: 'Улукбек Бакыбек уулу',
      role: t('founders'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              hover
              className="text-center transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Founders */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('founders')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {founder.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {founder.name}
                    </p>
                    <p className="text-gray-600 text-sm">{founder.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="mt-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 to-accent-200"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center bg-white rounded-2xl shadow-lg p-8 border-4 border-primary-100">
              <div className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                Май 2022
              </div>
              <p className="text-gray-700 text-lg font-medium">
                Основание ОКУРМЕН IT
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-accent-600 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}
