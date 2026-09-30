'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BilbarsSimple() {
  const [currentImage, setCurrentImage] = useState('/bilbars/БИЛБАРС с книгой.png');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === '/bilbars/БИЛБАРС с книгой.png'
          ? '/bilbars/БИЛБАРС с рюкзаком.png'
          : '/bilbars/БИЛБАРС с книгой.png'
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80 animate-float">
        <Image
          src={currentImage}
          alt="Билбарс"
          fill
          className="object-contain drop-shadow-2xl transition-all duration-500"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}
