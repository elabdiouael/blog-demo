'use client';
import { useRef } from 'react';
import styles from './TiltCard.module.css';

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null); // Ref jdid dyal l'in3ikas

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcul Percentage
    const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

    // ROTATION (Zidna l 7idda: 20deg)
    card.style.setProperty('--rx', `${yPct * -20}deg`);
    card.style.setProperty('--ry', `${xPct * 20}deg`);

    // GLARE POSITION (L'in3ikas kaytbe3 souris)
    glare.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    glare.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    glare.style.setProperty('--glare-opacity', '1');
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card && glare) {
      // Reset position
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      // Khbbi glare
      glare.style.setProperty('--glare-opacity', '0');
    }
  };

  return (
    <div 
      className={styles.tiltWrapper} 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.tiltInner}>
        <div className={styles.glare} ref={glareRef}></div>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;