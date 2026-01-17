'use client';
import { useEffect, useRef } from 'react';

const SnowStorm = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set Canvas Size
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Snow Particles Config
    const snowflakeCount = 150; // Zid ola n9ess bach t-controlé l'kammiya
    const snowflakes = [];

    class Snowflake {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1; // 7jam mkhtalfa
        this.speed = Math.random() * 2 + 0.5; // Sor3a mkhtalfa
        this.wind = Math.random() * 1 - 0.5; // Rih khfif
        this.opacity = Math.random() * 0.5 + 0.3; // Transparence
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;

        // Ila wssel lta7t, 3awd rj3o lfo9
        if (this.y > height) {
          this.y = 0;
          this.x = Math.random() * width;
        }
        
        // Ila fat jnab
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
        
        // Glow Effect (Dwi 3la Telj)
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
      }
    }

    // Init Flakes
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(new Snowflake());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height); // Mse7 frame l9dima
      
      snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1, // Wra koulchi
        pointerEvents: 'none',
        background: 'transparent' // Bach yban l gradient lk7el wraah
      }}
    />
  );
};

export default SnowStorm;