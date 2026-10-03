'use client';

import { useEffect, useState } from 'react';

/**
 * Hook для определения prefers-reduced-motion настройки пользователя
 * Возвращает true если пользователь предпочитает уменьшенные анимации
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Проверяем поддержку matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Устанавливаем начальное значение
    setPrefersReducedMotion(mediaQuery.matches);

    // Слушаем изменения
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Добавляем слушатель
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback для старых браузеров
      mediaQuery.addListener(handleChange);
    }

    // Очистка
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
