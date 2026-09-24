'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  const navSections = [
    {
      title: 'Навигация',
      links: [
        { label: navT('about'), href: '#about' },
        { label: navT('courses'), href: '#courses' },
        { label: navT('learning'), href: '#learning' },
        { label: navT('team'), href: '#team' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { label: navT('students'), href: '#students' },
        { label: navT('reviews'), href: '#reviews' },
        { label: navT('contacts'), href: '#contacts' },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
                ОКУРМЕН IT
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">{t('about')}</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-2xl">📍</span>
                <span>ОРОЗБЕКОВА, 136, Бишкек</span>
              </div>
            </div>

            {/* Navigation Sections */}
            {navSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-800">
            {[
              { icon: '🎓', label: '3000+', sublabel: 'Студентов' },
              { icon: '👨‍🏫', label: '50', sublabel: 'Студентов/Ментор' },
              { icon: '💼', label: 'Apple', sublabel: 'Выпускники' },
              { icon: '💰', label: '10K', sublabel: 'Грант' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="font-bold text-white">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} ОКУРМЕН IT. {t('rights')}
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Политика конфиденциальности
              </a>
              <span className="text-gray-700">|</span>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Условия использования
              </a>
            </div>
          </div>

          {/* Tech Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full text-xs text-gray-500">
              <span>Built with</span>
              <span className="text-primary-400">Next.js</span>
              <span>•</span>
              <span className="text-accent-400">TypeScript</span>
              <span>•</span>
              <span className="text-purple-400">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
