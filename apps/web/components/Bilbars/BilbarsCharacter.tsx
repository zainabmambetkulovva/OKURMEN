'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type BilbarsState = 
  | 'idle'
  | 'happy'
  | 'wave'
  | 'jump'
  | 'laugh'
  | 'surprised'
  | 'thinking'
  | 'reading'
  | 'backpack'
  | 'celebrate'
  | 'laptop'
  | 'sitting';

interface BilbarsCharacterProps {
  state?: BilbarsState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  autoAnimate?: boolean;
  floatingEffect?: boolean;
}

const stateImages: Record<BilbarsState, string> = {
  idle: '/bilbars/БИЛБАРС обычное лицо.png',
  happy: '/bilbars/БИЛБАРС радость.png',
  wave: '/bilbars/БИЛБАРС приветствие.png',
  jump: '/bilbars/БИЛБАРС радосььть.png',
  laugh: '/bilbars/БИЛБАРС смех.png',
  surprised: '/bilbars/БИЛБАРС удивленное лицо.png',
  thinking: '/bilbars/БИЛБАРС думает.png',
  reading: '/bilbars/БИЛБАРС с книгой.png',
  backpack: '/bilbars/БИЛБАРС с рюкзаком.png',
  celebrate: '/bilbars/БИЛБАРС указание.png',
  laptop: '/bilbars/БИЛБАРС с ноутбуком.png',
  sitting: '/bilbars/БИЛБАРС сидит.png',
};

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
};

const stateAnimations: Record<BilbarsState, any> = {
  idle: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  happy: {
    scale: [1, 1.05, 1],
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: 2,
      ease: 'easeOut',
    },
  },
  wave: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 1,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
  jump: {
    y: [0, -40, 0],
    transition: {
      duration: 0.8,
      repeat: 1,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
  laugh: {
    scale: [1, 1.1, 1, 1.05, 1],
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 1.2,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
  surprised: {
    scale: [1, 1.15, 1],
    y: [0, -15, 0],
    transition: {
      duration: 0.4,
      repeat: 1,
      ease: 'easeOut',
    },
  },
  thinking: {
    rotate: [0, -8, 0, 8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  reading: {
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  backpack: {
    y: [0, -6, 0],
    x: [0, 3, 0, -3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  celebrate: {
    y: [0, -20, 0],
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: 1,
      ease: 'easeOut',
    },
  },
  laptop: {
    y: [0, -4, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  sitting: {
    y: [0, -3, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function BilbarsCharacter({
  state = 'idle',
  size = 'lg',
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  autoAnimate = true,
  floatingEffect = true,
}: BilbarsCharacterProps) {
  const [currentImage, setCurrentImage] = useState(stateImages[state]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (stateImages[state] !== currentImage) {
      setIsChanging(true);
      const timer = setTimeout(() => {
        setCurrentImage(stateImages[state]);
        setIsChanging(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state, currentImage]);

  const baseAnimation = floatingEffect && autoAnimate ? stateAnimations[state] : {};

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={baseAnimation}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="w-full h-full relative"
        >
          <Image
            src={currentImage}
            alt="Билбарс"
            fill
            className="object-contain drop-shadow-2xl"
            style={{ 
              mixBlendMode: 'multiply',
              filter: 'contrast(1.1) brightness(1.05)'
            }}
            priority
            quality={100}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
