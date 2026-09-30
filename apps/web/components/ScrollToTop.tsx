'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
      aria-label="Прокрутить наверх"
    >
      <ArrowUp size={24} strokeWidth={2.5} className="md:w-7 md:h-7" />
    </button>
  );
}
