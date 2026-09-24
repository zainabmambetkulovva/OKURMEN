'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function ContactsSection() {
  const t = useTranslations('contacts');

  return (
    <section id="contacts" className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-48 -left-48 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-accent-500 rounded-full -bottom-48 -right-48 blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('address')}</h3>
                  <p className="text-white/95 text-lg font-semibold">
                    {t('address_value')}
                  </p>
                  <p className="text-white/70 text-sm mt-1">Бишкек, Кыргызстан</p>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Дополнительная контактная информация (телефон, email, соцсети) будет добавлена после согласования с командой ОКУРМЕН
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CTA Form */}
          <div>
            <div className="bg-white text-dark-900 rounded-3xl shadow-soft-lg p-8">
              <h3 className="text-3xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t('cta')}
                </span>
              </h3>
              <p className="text-dark-600 mb-6 leading-relaxed">
                Заполните форму, и мы свяжемся с вами для консультации о курсах и процессе обучения в ОКУРМЕН IT.
              </p>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="+996"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    Интересующий курс (опционально)
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white">
                    <option>Выберите курс</option>
                    <option>Информация о курсах добавляется</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-800 mb-2">
                    Комментарий (опционально)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder="Дополнительная информация"
                  ></textarea>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold"
                  onClick={() => {
                    console.log('Form submission - to be implemented');
                  }}
                >
                  Отправить заявку
                </Button>
              </div>

              <p className="text-xs text-dark-500 mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
