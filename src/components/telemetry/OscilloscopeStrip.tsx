import React, { useEffect, useRef, useState } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const OscilloscopeStrip: React.FC<{ className?: string; height?: number }> = ({
  className = '',
  height = 80,
}) => {
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const pathRef = useRef<SVGPathElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const updatePhase = () => {
      setPhase((prev) => (prev + (carrierFreq / 20.4) * 0.12) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(updatePhase);
    };
    animationFrameId = requestAnimationFrame(updatePhase);
    return () => cancelAnimationFrame(animationFrameId);
  }, [carrierFreq]);

  const width = 400;
  const points: string[] = [];
  const cycles = (carrierFreq / 20.4) * 4;

  for (let x = 0; x <= width; x += 4) {
    const normX = x / width;
    const y = (height / 2) + Math.sin(normX * Math.PI * 2 * cycles + phase) * (height * 0.35);
    points.push(`${x},${y.toFixed(2)}`);
  }

  const d = `M ${points.join(' L ')}`;

  return (
    <div className={`w-full overflow-hidden bg-black/40 border border-white/10 rounded-xl p-2 ${className}`}>
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1 px-1">
        <span>CARRIER WAVE: {carrierFreq} kHz</span>
        <span className="text-[#FF6B35] font-bold">FSK SYNCHRONIZED</span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        fill="none"
      >
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeDasharray="4 4"
        />

        {/* Dynamic Glowing Solar Amber Sine Wave */}
        <path
          ref={pathRef}
          d={d}
          stroke={THEME.accent}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255, 107, 53, 0.75))',
          }}
        />
      </svg>
    </div>
  );
};

export default OscilloscopeStrip;
