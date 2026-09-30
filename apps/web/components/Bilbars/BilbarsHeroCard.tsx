'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BilbarsCharacter, { BilbarsState } from './BilbarsCharacter';

export default function BilbarsHeroCard() {
  const [currentState, setCurrentState] = useState<'reading' | 'backpack'>('reading');
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Автоматическая смена состояний каждые 6 секунд
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev === 'reading' ? 'backpack' : 'reading'));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsInteractive(true);
    // Temporary state change on click
    const originalState = currentState;
    setCurrentState(currentState === 'reading' ? 'backpack' : 'reading');
    
    setTimeout(() => {
      setCurrentState(originalState);
      setIsInteractive(false);
    }, 2000);
  };

  return (
    <motion.div
      className="relative h-full w-full flex items-center justify-center overflow-visible"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-200/20 to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/20 to-transparent"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Bilbars Character */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ 
            opacity: 0, 
            scale: 0.9,
            rotateY: -20,
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
          }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            rotateY: 20,
          }}
          transition={{
            duration: 0.6,
            ease: [0.6, 0.01, 0.05, 0.95],
          }}
          className="relative z-10"
        >
          <BilbarsCharacter
            state={currentState}
            size="xl"
            className="w-80 h-80 md:w-96 md:h-96"
            onClick={handleClick}
            floatingEffect={!isInteractive}
            autoAnimate={!isInteractive}
          />
        </motion.div>
      </AnimatePresence>

      {/* State indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex gap-2">
          {(['reading', 'backpack'] as const).map((state) => (
            <motion.div
              key={state}
              className={`h-2 rounded-full transition-all ${
                currentState === state
                  ? 'w-8 bg-gradient-to-r from-orange-500 to-orange-600'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              animate={{
                scale: currentState === state ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: currentState === state ? Infinity : 0,
                repeatDelay: 5.4,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-blue-400 opacity-40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
}
