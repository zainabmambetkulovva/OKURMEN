'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import BilbarsCharacter, { BilbarsState } from './BilbarsCharacter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BilbarsSectionAnimatedProps {
  state: BilbarsState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'left' | 'right' | 'center';
  className?: string;
  containerClassName?: string;
  threshold?: number;
  delay?: number;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'bounce';
}

export default function BilbarsSectionAnimated({
  state,
  size = 'lg',
  position = 'right',
  className = '',
  containerClassName = '',
  threshold = 0.3,
  delay = 0,
  animationType = 'fadeUp',
}: BilbarsSectionAnimatedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Определяем размер для адаптивности
  const getResponsiveSize = () => {
    if (typeof window === 'undefined') return size;
    
    const width = window.innerWidth;
    if (width < 640) { // mobile
      return size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm';
    } else if (width < 1024) { // tablet
      return size === 'xl' ? 'lg' : size;
    }
    return size;
  };

  const [responsiveSize, setResponsiveSize] = useState(size);

  useEffect(() => {
    setIsMounted(true);
    setResponsiveSize(getResponsiveSize());

    const handleResize = () => {
      setResponsiveSize(getResponsiveSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isMounted) return;

    // Если пользователь предпочитает уменьшенные анимации, сразу показываем
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
            
            // Отключаем observer после первого срабатывания для производительности
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, delay, hasAnimated, prefersReducedMotion, isMounted]);

  // Определяем позиционирование
  const positionClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  };

  // Определяем варианты анимации с оптимизацией
  const animationVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, 0.01, 0.05, 0.95],
        },
      },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 100, scale: 0.9 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, 0.01, 0.05, 0.95],
        },
      },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -100, scale: 0.9 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, 0.01, 0.05, 0.95],
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      },
    },
    bounce: {
      hidden: { opacity: 0, y: -100 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          type: 'spring',
          bounce: 0.5,
        },
      },
    },
  };

  if (!isMounted) {
    return <div ref={ref} className={`flex ${positionClasses[position]} ${containerClassName}`} />;
  }

  return (
    <div
      ref={ref}
      className={`flex ${positionClasses[position]} ${containerClassName}`}
    >
      <motion.div
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        variants={animationVariants[animationType]}
        className={className}
        style={{
          willChange: isVisible && !hasAnimated ? 'transform, opacity' : 'auto',
        }}
      >
        <BilbarsCharacter
          state={state}
          size={responsiveSize}
          autoAnimate={!prefersReducedMotion}
          floatingEffect={!prefersReducedMotion}
        />
      </motion.div>
    </div>
  );
}
