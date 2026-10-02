'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'about', href: '#about' },
    { key: 'directions', href: '#directions' },
    { key: 'advantages', href: '#advantages' },
    { key: 'reviews', href: '#reviews' },
  ];

  const languages = [
    { code: 'ky', label: '╥Ü╨á' },
    { code: 'ru', label: '╨á╨ú' },
    { code: 'en', label: 'EN' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#')}
            className="flex-shrink-0 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200"
            aria-label="OKURMEN Home"
          >
            ╨₧╨Ü╨ú╨á╨£╨ò╨¥
          </button>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors duration-200"
              >
                {t(item.key as any)}
              </button>
            ))}
          </nav>

          {/* Desktop Actions - Right */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                    locale === lang.code
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dark-500 hover:text-dark-700 hover:bg-gray-50'
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('#contacts')}
              className="px-5 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 hover:shadow-soft transition-all duration-200 active:scale-95"
            >
              {t('contacts')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-dark-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-dark-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {t(item.key as any)}
                </button>
              ))}
            </nav>

            {/* Mobile Language + CTA */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              {/* Language Switcher */}
              <div className="flex items-center gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      locale === lang.code
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-dark-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => scrollToSection('#contacts')}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                {t('contacts')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
