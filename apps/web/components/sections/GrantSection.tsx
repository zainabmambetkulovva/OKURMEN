'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function GrantSection() {
  const t = useTranslations('grant');

  const scrollToContacts = () => {
    const element = document.querySelector('#contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grant Card */}
        <div className="bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Visual */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-12 flex items-center justify-center">
              <div className="text-center text-white space-y-6">
                <div className="text-7xl mb-4">💰</div>
                <div className="space-y-2">
                  <div className="text-6xl sm:text-7xl font-bold">10,000</div>
                  <div className="text-2xl font-semibold">{t('currency')}</div>
                </div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
                  <span className="text-white font-semibold">{t('badge')}</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-12 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-dark-900 mb-4">
                  {t('title')}
                </h2>
                <p className="text-lg text-dark-600 leading-relaxed">
                  {t('description')}
                </p>
              </div>

              {/* Conditions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-dark-800">
                  {t('conditions')}:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center text-accent-600 font-bold">
                      1
                    </div>
                    <p className="text-dark-700 pt-1">{t('condition1')}</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center text-accent-600 font-bold">
                      2
                    </div>
                    <p className="text-dark-700 pt-1">{t('condition2')}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={scrollToContacts}
                  className="w-full sm:w-auto text-lg font-bold"
                >
                  {t('cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-white px-6 py-4 rounded-2xl shadow-soft">
            <span className="text-3xl">🎯</span>
            <p className="text-dark-700 font-medium text-lg">
              {t('bottom_text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
