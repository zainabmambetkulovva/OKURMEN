'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ContactsSection() {
  const t = useTranslations('contacts');

  return (
    <section id="contacts" className="py-20 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-500 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3,
              }}
            ></div>
          ))}
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{t('address')}</h3>
                  <p className="text-white/90 text-lg font-semibold">
                    {t('address_value')}
                  </p>
                  <p className="text-white/70 text-sm mt-1">Бишкек, Кыргызстан</p>
                </div>
              </div>
            </Card>

            {/* Contact Placeholders */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm text-white/70">Телефон</p>
                    <div className="h-4 bg-white/20 rounded w-32 mt-1"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <div className="h-4 bg-white/20 rounded w-48 mt-1"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="text-sm text-white/70">Часы работы</p>
                    <div className="h-4 bg-white/20 rounded w-40 mt-1"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media Placeholder */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <h4 className="font-bold text-lg mb-4">Мы в соцсетях</h4>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Facebook', 'Telegram', 'WhatsApp'].map(
                  (social, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {social}
                    </button>
                  )
                )}
              </div>
              <p className="text-xs text-white/60 mt-4">TBD</p>
            </Card>
          </div>

          {/* CTA Section */}
          <div>
            <Card className="bg-white text-gray-900 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t('cta')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Заполните форму, и мы свяжемся с вами для консультации о курсах
                и процессе обучения в ОКУРМЕН IT.
              </p>

              {/* Simple Form Structure */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="+996"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Интересующий курс (опционально)
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all">
                    <option>Выберите курс</option>
                    <option>TBD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Комментарий (опционально)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Дополнительная информация"
                  ></textarea>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    // Future: submit form
                    console.log('Form submitted');
                  }}
                >
                  Отправить заявку
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-white/80 text-sm">
            📱 Дополнительная контактная информация будет добавлена после
            согласования
          </p>
        </div>
      </Container>
    </section>
  );
}
