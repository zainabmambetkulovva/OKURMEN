'use client';

import { useTranslations } from 'next-intl';

export default function ContactsSection() {
  const t = useTranslations('contacts');

  return (
    <section id="contacts" className="py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-48 -left-48 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-accent-500 rounded-full -bottom-48 -right-48 blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
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

            {/* Phone Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('phone')}</h3>
                  <a href="tel:+996990686889" className="text-white/95 text-lg font-semibold hover:text-white transition-colors">
                    +996 990 686 889
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/okurmen.kg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61571215919153"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white text-dark-900 rounded-3xl shadow-soft-lg p-8">
              <h3 className="text-3xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {t('cta')}
                </span>
              </h3>
              <p className="text-dark-600 mb-6 leading-relaxed">
                Заполните форму, и мы свяжемся с вами для консультации о курсах.
              </p>

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
                    Комментарий (опционально)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder="Дополнительная информация"
                  ></textarea>
                </div>
                <button
                  className="w-full px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors duration-300"
                  onClick={() => {
                    console.log('Form submission');
                  }}
                >
                  Отправить заявку
                </button>
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
