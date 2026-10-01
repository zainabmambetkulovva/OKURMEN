'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BilbarsIntro = dynamic(() => import('./BilbarsIntro'), {
  ssr: false,
});

export default function BilbarsIntroWrapper() {
  const [showIntro, setShowIntro] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Проверяем, показывали ли intro в этой сессии
    const hasSeenIntro = sessionStorage.getItem('bilbars-intro-seen');
    
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleComplete = () => {
    setShowIntro(false);
  };

  if (!isMounted || !showIntro) {
    return null;
  }

  return <BilbarsIntro onComplete={handleComplete} />;
}

