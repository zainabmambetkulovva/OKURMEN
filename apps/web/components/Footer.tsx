'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-dark-900 text-gray-300 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Address */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              ╨₧╨Ü╨ú╨á╨£╨ò╨¥ IT
            </h3>
            <div className="flex items-start space-x-2 text-sm text-gray-400">
              <span className="text-lg mt-0.5">≡ƒôì</span>
              <span>╨₧╨á╨₧╨ù╨æ╨ò╨Ü╨₧╨Æ╨É, 136, ╨æ╨╕╤ê╨║╨╡╨║</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">{t('navigation')}</h4>
            <ul className="space-y-2">
              {[
                { label: navT('home'), href: '#' },
                { label: navT('courses'), href: '#courses' },
                { label: navT('about'), href: '#about' },
                { label: navT('contacts'), href: '#contacts' },
              ].map((link, index) => (
                <li key={index}>
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

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">{t('info')}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('about')}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-dark-800 text-center">
          <p className="text-sm text-gray-500">
            ┬⌐ {currentYear} ╨₧╨Ü╨ú╨á╨£╨ò╨¥ IT. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
