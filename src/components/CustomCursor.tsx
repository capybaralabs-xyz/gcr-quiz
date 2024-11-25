"use client"

import React, { useState, useEffect, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = useCallback(() => {
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrowScreen = window.matchMedia("(max-width: 1024px)").matches;
    console.log(hasTouchSupport, isNarrowScreen)
    setIsMobile(hasTouchSupport && isNarrowScreen);
  }, []);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);


  useEffect(() => {
    checkMobile();

    window.addEventListener('resize', checkMobile);


    if (!isMobile) {
      document.addEventListener('mousemove', updateCursorPosition);
      document.body.style.cursor = 'none';
    }

    return () => {
      if (!isMobile) {
        document.removeEventListener('mousemove', updateCursorPosition);
        document.body.style.cursor = 'default';
      }
    };
  }, [updateCursorPosition, checkMobile, isMobile]);


  if (isMobile) {
    return null;
  }
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '32px',
          height: '32px',
          backgroundImage: "url('/images/cursor.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-11px, -2px)', // 调整偏移量使点击点对准指针
          transition: 'transform 0.1s ease',
        }}
      >
 
      </div>
    </div>
  );
};

export default CustomCursor;








