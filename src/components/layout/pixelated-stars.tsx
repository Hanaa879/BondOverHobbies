
'use client';

import React, { useState, useEffect } from 'react';

export function PixelatedStars({ count = 100 }) {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: count }).map((_, i) => {
        const size = Math.floor(Math.random() * 4) + 3; // 3px to 6px
        const style = {
          position: 'absolute' as 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        };
        const starStyle = {
            width: `${size}px`,
            height: `${size}px`,
        }

        return (
            <div key={i} className="star-wrapper" style={style}>
                <div className="star" style={starStyle} />
            </div>
        );
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
