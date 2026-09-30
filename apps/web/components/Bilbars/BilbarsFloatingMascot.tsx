'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BilbarsCharacter, { BilbarsState } from './BilbarsCharacter';

interface BilbarsFloatingMascotProps {
  className?: string;
}

const idleSequence: BilbarsState[] = ['idle', 'happy', 'thinking', 'laugh', 'wave'];

export default function BilbarsFloatingMascot({ className = '' }: BilbarsFloatingMascotProps) {
  const [currentState, setCurrentState] = useState<BilbarsState>('idle');
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    // Создаем вариативный цикл анимаций
    const durations = [3000, 2500, 4000, 3500, 2000]; // Разные интервалы
    
    const changeState = () => {
      const nextIndex = (sequenceIndex + 1) % idleSequence.length;
      setSequenceIndex(nextIndex);
      setCurrentState(idleSequence[nextIndex]);
    };

    const timer = setTimeout(changeState, durations[sequenceIndex]);
    return () => clearTimeout(timer);
  }, [sequenceIndex]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <BilbarsCharacter
          state={currentState}
          size="md"
          className="w-32 h-32 drop-shadow-2xl"
          autoAnimate={true}
          floatingEffect={true}
        />
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute -right-2 top-0 bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl border-2 border-orange-200 dark:border-orange-800"
      >
        <div className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
          Выбери курс! 🎓
        </div>
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-orange-200 dark:border-r-orange-800"></div>
      </motion.div>

      {/* Sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-orange-400"
          style={{
            left: `${30 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}
