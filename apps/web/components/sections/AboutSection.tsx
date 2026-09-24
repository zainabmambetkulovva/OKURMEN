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
      role: t('founder_role'),
    },
    {
      name: 'Улукбек Бакыбек уулу',
      role: t('founder_role'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16 animate-fade-in">
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
              className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Founders */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 sm:p-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('founders')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-transform duration-300 hover:scale-110">
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
      </Container>
    </section>
  );
}
