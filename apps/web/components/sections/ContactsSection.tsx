'use client';

import { useTranslations } from 'next-intl';
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/ours
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
=======
import { Button } from '@/components/ui/Button';
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/theirs

export default function ContactsSection() {
  const t = useTranslations('contacts');

  const contactInfo = [
    {
      icon: MapPin,
      title: t('address'),
      value: t('address_value'),
      link: null,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600'
    },
    {
      icon: Phone,
      title: t('phone'),
      value: '+996 990 686 889',
      link: 'tel:+996990686889',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@okurmen.kg',
      link: 'mailto:info@okurmen.kg',
      gradient: 'from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600'
    },
  ];

  const schedule = [
    { days: 'Понедельник - Четверг', time: '09:00 - 21:00', active: true },
    { days: 'Пятница', time: 'Выходной', active: false },
    { days: 'Суббота - Воскресенье', time: '09:00 - 21:00', active: true },
  ];

  return (
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/ours
    <section id="contacts" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/10 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
=======
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
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/theirs
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
          </p>
        </div>

<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/ours
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              const content = (
                <div
                  className="group relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-soft hover:shadow-premium-lg border-2 border-slate-200 dark:border-slate-700 hover:border-transparent transition-all duration-300 hover:-translate-y-2 animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="relative space-y-5">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl ${contact.iconBg} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                      <Icon className={`w-7 h-7 ${contact.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {contact.title}
                    </h3>

                    {/* Value */}
                    <p className={`text-sm leading-relaxed ${contact.link ? 'text-orange-600 dark:text-orange-400 font-semibold group-hover:text-orange-700 dark:group-hover:text-orange-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      {contact.value}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute bottom-0 right-0 w-6 h-0.5 bg-gradient-to-l ${contact.gradient}`}></div>
                    <div className={`absolute bottom-0 right-0 w-0.5 h-6 bg-gradient-to-t ${contact.gradient}`}></div>
                  </div>
                </div>
              );

              return contact.link ? (
                <a key={index} href={contact.link} className="relative block">
                  {content}
                </a>
              ) : (
                <div key={index} className="relative">
                  {content}
                </div>
              );
            })}
          </div>

          {/* Schedule Card */}
          <div className="relative p-8 bg-gradient-to-br from-orange-600 via-orange-500 to-blue-600 rounded-2xl shadow-premium-lg text-white animate-scale-in overflow-hidden" style={{ animationDelay: '0.3s' }}>
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            {/* Animated Background Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold">График работы</h3>
              </div>

              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 ${
                      !item.active ? 'opacity-70' : ''
                    }`}
                  >
                    <span className="font-semibold text-sm">{item.days}</span>
                    <span className={`text-sm font-bold ${item.active ? 'text-white' : 'text-white/70'}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-sm text-white/90 text-center">
                  📞 Звоните в рабочее время или оставьте заявку
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Следите за нами в соцсетях
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Актуальные новости, полезные материалы и события
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/okurmen.kg/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-900 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-110 border border-slate-200 dark:border-slate-700"
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
                className="p-4 bg-white dark:bg-slate-900 hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-110 border border-slate-200 dark:border-slate-700"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
=======
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
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.Jze9FF1e3y/theirs
      </div>
    </section>
  );
}
