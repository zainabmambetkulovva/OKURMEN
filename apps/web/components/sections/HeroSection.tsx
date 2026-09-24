'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const t = useTranslations('hero');

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent animate-slide-down">
              {t('title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 animate-slide-up">
            {t('subtitle')}
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slide-up animation-delay-400">
            <Button
              size="lg"
              variant="primary"
              onClick={() => scrollToSection('#courses')}
              className="w-full sm:w-auto"
            >
              {t('cta_primary')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#about')}
              className="w-full sm:w-auto"
            >
              {t('cta_secondary')}
            </Button>
          </div>

          {/* Visual Elements */}
          <div className="pt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in animation-delay-600">
            {[
              { icon: '💻', label: 'IT Education' },
              { icon: '👨‍🏫', label: 'Personal Mentor' },
              { icon: '🎓', label: '3000+ Students' },
              { icon: '🚀', label: 'Real Results' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 hover:scale-105"
              >
                <span className="text-4xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#about')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Scroll down"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
}
