'use client';
import { useState, useEffect, useRef } from 'react';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Sor3a dyal decoding
    }, 30);
  };

  // Scramble once on mount (loading effect)
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span className={className} onMouseEnter={scramble}>
      {displayText}
    </span>
  );
};

export default HackerText;