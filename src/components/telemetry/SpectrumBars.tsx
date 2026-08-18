import React, { useEffect, useState } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const SpectrumBars: React.FC<{ barsCount?: number; className?: string }> = ({
  barsCount = 16,
  className = '',
}) => {
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const scrollVelocity = useWavelinkStore((s) => s.scrollVelocity);
  const [heights, setHeights] = useState<number[]>(Array(barsCount).fill(20));

  useEffect(() => {
    let timer: number;
    const updateBars = () => {
      const absV = Math.min(Math.abs(scrollVelocity), 10);
      const newHeights = Array.from({ length: barsCount }).map((_, i) => {
        const centerDist = Math.abs(i - barsCount / 2) / (barsCount / 2);
        const base = (1 - centerDist * 0.7) * 75;
        const jitter = Math.random() * 25 + absV * 2.5;
        return Math.min(Math.max(base + jitter, 10), 100);
      });
      setHeights(newHeights);
      timer = requestAnimationFrame(updateBars);
    };
    timer = requestAnimationFrame(updateBars);
    return () => cancelAnimationFrame(timer);
  }, [barsCount, carrierFreq, scrollVelocity]);

  return (
    <div className={`flex items-end gap-1 h-8 ${className}`}>
      {heights.map((h, idx) => (
        <div
          key={idx}
          className="w-1 rounded-full transition-all duration-75"
          style={{
            height: `${h}%`,
            backgroundColor: idx === Math.floor(barsCount / 2) ? THEME.accent : 'rgba(255, 107, 53, 0.45)',
            boxShadow: idx === Math.floor(barsCount / 2) ? '0 0 8px rgba(255, 107, 53, 0.85)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default SpectrumBars;
