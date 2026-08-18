import React, { useEffect, useRef } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const ConstellationPlot: React.FC<{ size?: number }> = ({ size = 220 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const isSimulating = useWavelinkStore((s) => s.isSimulating);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let phase = 0;
    const trail: { x: number; y: number }[] = [];

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.38;

      // 1. Polar Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      // Concentric Circles
      [0.33, 0.66, 1.0].forEach((rFactor) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * rFactor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Axis Lines
      ctx.beginPath();
      ctx.moveTo(cx - radius * 1.1, cy);
      ctx.lineTo(cx + radius * 1.1, cy);
      ctx.moveTo(cx, cy - radius * 1.1);
      ctx.lineTo(cx, cy + radius * 1.1);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText('+I', cx + radius * 1.15, cy + 3);
      ctx.fillText('+Q', cx - 5, cy - radius * 1.15);

      // 2. Compute CPFSK Phase Trajectory
      const speed = isSimulating ? 0.08 : 0.035;
      const freqMod = Math.sin(phase * 0.4) > 0 ? 1 : -1;
      phase += speed * (carrierFreq / 20.4) * freqMod;

      const px = cx + Math.cos(phase) * radius * 0.92;
      const py = cy + Math.sin(phase) * radius * 0.92;

      trail.push({ x: px, y: py });
      if (trail.length > 28) trail.shift();

      // 3. Draw Continuous Phase Trajectory Trail
      ctx.lineWidth = 1.5;
      for (let i = 0; i < trail.length - 1; i++) {
        const alpha = (i / trail.length) * 0.6;
        ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        ctx.stroke();
      }

      // 4. Symbol Constellation Nodes (Mark & Space)
      const markX = cx + radius * 0.92;
      const markY = cy;
      const spaceX = cx - radius * 0.92;
      const spaceY = cy;

      // Mark Point
      ctx.fillStyle = THEME.accent;
      ctx.beginPath();
      ctx.arc(markX, markY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Space Point
      ctx.fillStyle = THEME.secondary;
      ctx.beginPath();
      ctx.arc(spaceX, spaceY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 5. Active Phase Cursor
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = THEME.accent;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [size, carrierFreq, isSimulating]);

  return (
    <div className="flex flex-col items-center gap-2 font-mono text-xs">
      <div className="relative p-2 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
        <canvas ref={canvasRef} width={size} height={size} className="w-full h-auto" />
      </div>
      <div className="flex justify-between w-full text-[10px] text-slate-400 px-1">
        <span className="text-[#FF6B35]">MARK: 0° (+1)</span>
        <span>EVM: 1.4%</span>
        <span className="text-[#F59E0B]">SPACE: 180° (-1)</span>
      </div>
    </div>
  );
};

export default ConstellationPlot;
