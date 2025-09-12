'use client';

import React, { useState, useEffect } from 'react';

export function PixelatedStars({ count = 100 }) {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: count }).map((_, i) => {
        const size = Math.floor(Math.random() * 3) + 2; // 2px to 4px
        const style = {
          position: 'absolute' as 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          backgroundColor: '#fff',
          animationDelay: `${Math.random() * 2}s`,
        };
        return <div key={i} className="star" style={style} />;
      });
      setStars(newStars);
    };
    generateStars();
  }, [count]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        {stars}
    </div>
  );
}
