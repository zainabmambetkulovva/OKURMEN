'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import BilbarsCharacter, { BilbarsState } from './BilbarsCharacter';

export default function BilbarsScrollReactive() {
  const [currentState, setCurrentState] = useState<BilbarsState>('idle');
  const [isVisible, setIsVisible] = useState(true);
  
  const { scrollYProgress } = useScroll();
  
  // Плавное движение с spring физикой
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Позиция X (движение влево-вправо)
  const x = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 50, -30, 40, -20, 0]
  );

  // Позиция Y (движение вверх-вниз)
  const y = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -50, -100, -80, -120, -150]
  );

  // Rotation
  const rotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -10, 5, -5, 0]
  );

  // Scale
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 0.85, 0.7]
  );

  // Opacity
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 1, 1, 0]
  );

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Меняем состояние Билбарса в зависимости от прокрутки
      if (progress < 0.2) {
        setCurrentState('idle');
      } else if (progress < 0.4) {
        setCurrentState('thinking');
      } else if (progress < 0.6) {
        setCurrentState('happy');
      } else if (progress < 0.8) {
        setCurrentState('wave');
      } else {
        setCurrentState('celebrate');
      }

      // Скрываем на очень большой прокрутке
      setIsVisible(progress < 0.95);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed right-8 top-1/4 z-40 pointer-events-none hidden lg:block"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BilbarsCharacter
          state={currentState}
          size="md"
          className="w-28 h-28 drop-shadow-2xl"
          autoAnimate={true}
          floatingEffect={false}
        />
      </motion.div>

      {/* Decorative trail */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-300/30 to-blue-300/30 blur-xl"></div>
      </motion.div>
    </motion.div>
  );
}
