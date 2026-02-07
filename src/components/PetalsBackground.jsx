import { useEffect, useRef } from 'react';
import './PetalsBackground.css';

const PETAL_COUNT = 25;
const COLORS = ['#ffb6c1', '#ff69b4', '#ff1493', '#db7093', '#ffc0cb', '#e6a8b8', '#dda0dd'];

function createPetal() {
  const el = document.createElement('div');
  el.className = 'petal';
  el.style.setProperty('--delay', Math.random() * 15 + 's');
  el.style.setProperty('--duration', 12 + Math.random() * 8 + 's');
  el.style.setProperty('--x', Math.random() * 100 + 'vw');
  el.style.setProperty('--rotation', (Math.random() * 360) + 'deg');
  el.style.setProperty('--color', COLORS[Math.floor(Math.random() * COLORS.length)]);
  el.style.setProperty('--size', 8 + Math.random() * 12 + 'px');
  el.style.setProperty('--sway', (Math.random() * 40 - 20) + 'px');
  return el;
}

export default function PetalsBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    for (let i = 0; i < PETAL_COUNT; i++) {
      container.appendChild(createPetal());
    }
    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="petals-background" aria-hidden="true" />;
}
