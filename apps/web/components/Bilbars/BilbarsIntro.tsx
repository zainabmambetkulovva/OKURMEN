'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import BilbarsCharacter from './BilbarsCharacter';
import Image from 'next/image';

interface BilbarsIntroProps {
  onComplete: () => void;
}

export default function BilbarsIntro({ onComplete }: BilbarsIntroProps) {
  const [stage, setStage] = useState<'bilbars' | 'logo' | 'complete'>('bilbars');
  const [bilbarsState, setBilbarsState] = useState<'appearing' | 'waving' | 'moving'>('appearing');

  useEffect(() => {
    // Проверяем, показывали ли intro в этой сессии
    const hasSeenIntro = sessionStorage.getItem('bilbars-intro-seen');
    
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Последовательность анимации
    const timeline = [
      { delay: 800, action: () => setBilbarsState('waving') },
      { delay: 2500, action: () => setBilbarsState('moving') },
      { delay: 3500, action: () => setStage('logo') },
      { delay: 5500, action: () => {
        setStage('complete');
        sessionStorage.setItem('bilbars-intro-seen', 'true');
        onComplete();
      }},
    ];

    const timers = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (stage === 'complete') return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <AnimatePresence mode="wait">
        {stage === 'bilbars' && (
          <motion.div
            key="bilbars-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              x: window.innerWidth > 768 ? 300 : 150,
              scale: 0.6,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {bilbarsState === 'appearing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [50, -20, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.6, 0.01, 0.05, 0.95],
                }}
              >
                <BilbarsCharacter 
                  state="idle" 
                  size="xl"
                  autoAnimate={false}
                  floatingEffect={false}
                />
              </motion.div>
            )}

            {bilbarsState === 'waving' && (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: 2,
                  ease: 'easeOut',
                }}
              >
                <BilbarsCharacter 
                  state="wave" 
                  size="xl"
                  autoAnimate={true}
                  floatingEffect={false}
                />
              </motion.div>
            )}

            {bilbarsState === 'moving' && (
              <BilbarsCharacter 
                state="happy" 
                size="xl"
                autoAnimate={true}
                floatingEffect={false}
              />
            )}
          </motion.div>
        )}

        {stage === 'logo' && (
          <motion.div
            key="logo-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: [0.8, 1.1, 1],
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.8,
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Image
                src="/logo.svg"
                alt="ОКУРМЭН"
                width={300}
                height={100}
                className="drop-shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8"
            >
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
