import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';

interface MotionVideoCardProps {
  type: 'scada' | 'defense' | 'mesh' | 'pos' | 'crystal' | 'piezo';
  title: string;
  subtitle: string;
  imageSrc?: string;
  onClick?: () => void;
  className?: string;
}

export const MotionVideoCard: React.FC<MotionVideoCardProps> = ({
  type,
  title,
  subtitle,
  imageSrc,
  onClick,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const bgImg = new Image();
    if (imageSrc) {
      bgImg.src = imageSrc;
    }

    const render = () => {
      t += 0.028;
      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw Base Background or Image
      if (imageSrc && bgImg.complete && bgImg.naturalWidth > 0) {
        ctx.drawImage(bgImg, 0, 0, w, h);
        // Semi-transparent dark overlay for acoustic wave readability
        ctx.fillStyle = 'rgba(14, 14, 18, 0.45)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = '#121118';
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Procedural Kinetic Acoustic Overlays
      if (type === 'scada' || type === 'pos') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const numRings = 6;

        for (let i = 0; i < numRings; i++) {
          const r = ((t * 45 + i * 38) % (w * 0.65));
          const alpha = Math.max(0, 1 - r / (w * 0.65));

          ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 0.75})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Pulse Central Emitter
        ctx.fillStyle = THEME.accent;
        ctx.shadowColor = THEME.accent;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

      } else if (type === 'defense' || type === 'piezo') {
        ctx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
        ctx.lineWidth = 1.8;

        for (let x = 24; x < w - 24; x += 22) {
          ctx.beginPath();
          ctx.moveTo(x, h);
          const controlY = h * 0.48 + Math.sin(t * 2.2 + x * 0.06) * 38;
          ctx.quadraticCurveTo(w * 0.5, controlY, w * 0.5, 28);
          ctx.stroke();
        }

        ctx.fillStyle = THEME.secondary;
        ctx.shadowColor = THEME.secondary;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(w * 0.5, 28, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

      } else {
        const gridSize = 22;
        for (let x = 12; x < w; x += gridSize) {
          for (let y = 12; y < h; y += gridSize) {
            const dist = Math.hypot(x - w / 2, y - h / 2);
            const wave = Math.sin(dist * 0.09 - t * 3.2);
            const size = Math.max(1.2, 3 + wave * 2.2);

            ctx.fillStyle = `rgba(255, 107, 53, ${Math.max(0.15, (wave + 1) * 0.4)})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. Cinematic Vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
      grad.addColorStop(0, 'rgba(14, 14, 18, 0)');
      grad.addColorStop(1, 'rgba(14, 14, 18, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [type, imageSrc]);

  const handleClick = () => {
    soundEngine.playClick();
    if (onClick) onClick();
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer group select-none ${className}`}
    >
      {/* 60 FPS Procedural Canvas Video Loop */}
      <canvas
        ref={canvasRef}
        width={480}
        height={260}
        className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Floating Live Telemetry Badge */}
      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#FF6B35] flex items-center gap-1.5 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
        <span>{isHovered ? 'INSPECT TELEMETRY' : 'LIVE 60 FPS'}</span>
      </div>

      {/* Card Footer */}
      <div className="p-4 sm:p-5 flex flex-col gap-1 border-t border-white/10 bg-[#17161D]/95 backdrop-blur-md">
        <span className="text-xs font-mono text-[#FF6B35] font-bold">{subtitle}</span>
        <h4 className="font-display font-bold text-white text-base leading-snug group-hover:text-[#FF6B35] transition-colors">
          {title}
        </h4>
      </div>
    </motion.div>
  );
};

export default MotionVideoCard;
