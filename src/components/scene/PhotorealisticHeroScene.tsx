import React, { useRef, useEffect } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const PhotorealisticHeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const isSimulating = useWavelinkStore((s) => s.isSimulating);
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);

  // Multi-Frame Cinematic Visual Asset Pipeline
  const imagesRef = useRef<{
    schlieren: HTMLImageElement;
    emit: HTMLImageElement;
    propagate: HTMLImageElement;
    transducer: HTMLImageElement;
  }>({
    schlieren: new Image(),
    emit: new Image(),
    propagate: new Image(),
    transducer: new Image(),
  });

  useEffect(() => {
    imagesRef.current.schlieren.src = '/assets/schlieren_lab.jpg';
    imagesRef.current.emit.src = '/assets/emit_macro.jpg';
    imagesRef.current.propagate.src = '/assets/propagate_scene.jpg';
    imagesRef.current.transducer.src = '/assets/transducer_macro.jpg';
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      t += 0.025;
      const w = canvas.width;
      const h = canvas.height;
      const p = Math.max(0, Math.min(0.999, scrollProgress));

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0E0E12';
      ctx.fillRect(0, 0, w, h);

      // Frame Interpolation across 7 Chapters:
      // Frame 0: Schlieren Optical Wavefield (0.00 - 0.20)
      // Frame 1 & 2: Emit & Modulate Extreme Macro (0.20 - 0.45)
      // Frame 3 & 4: Propagate Air-Gap Laboratory (0.45 - 0.75)
      // Frame 5 & 6: Transducer Core & Specs (0.75 - 1.00)

      let currentImg = imagesRef.current.schlieren;
      let nextImg = imagesRef.current.emit;
      let blend = 0;
      let scale = 1.0;
      let panX = 0;
      let panY = 0;

      if (p < 0.22) {
        // Frame 0: Schlieren Laboratory to Emit Macro
        currentImg = imagesRef.current.schlieren;
        nextImg = imagesRef.current.emit;
        blend = Math.min(1, Math.max(0, (p - 0.10) / 0.12));
        scale = 1.0 + p * 0.5;
        panX = Math.sin(t * 0.4) * 15 + p * 50;
        panY = Math.cos(t * 0.3) * 10;
      } else if (p < 0.52) {
        // Frame 1 & 2: Emit Macro to Propagate Air-Gap
        currentImg = imagesRef.current.emit;
        nextImg = imagesRef.current.propagate;
        blend = Math.min(1, Math.max(0, (p - 0.34) / 0.18));
        scale = 1.25 - (p - 0.22) * 0.3;
        panX = (p - 0.22) * -70;
        panY = Math.sin(t * 0.5) * 12;
      } else if (p < 0.80) {
        // Frame 3 & 4: Propagate to Transducer Core
        currentImg = imagesRef.current.propagate;
        nextImg = imagesRef.current.transducer;
        blend = Math.min(1, Math.max(0, (p - 0.65) / 0.15));
        scale = 1.05 + Math.sin((p - 0.52) * Math.PI) * 0.12;
        panX = Math.sin(t * 0.3) * 20;
        panY = 0;
      } else {
        // Frame 5 & 6: Transducer Specs to Schlieren Loop
        currentImg = imagesRef.current.transducer;
        nextImg = imagesRef.current.schlieren;
        blend = Math.min(1, Math.max(0, (p - 0.88) / 0.12));
        scale = 1.0 + (p - 0.80) * 0.2;
        panX = 0;
        panY = Math.sin(t * 0.4) * 8;
      }

      // Draw Cinematic Image Layers with Smooth Aspect Cover & Zoom
      const drawLayer = (img: HTMLImageElement, alpha: number) => {
        if (alpha <= 0 || !img.complete || img.naturalWidth === 0) return;
        ctx.save();
        ctx.globalAlpha = alpha;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = w / h;
        let dw = w;
        let dh = h;

        if (screenRatio > imgRatio) {
          dw = w * scale;
          dh = (w / imgRatio) * scale;
        } else {
          dh = h * scale;
          dw = (h * imgRatio) * scale;
        }

        const dx = (w - dw) / 2 + panX;
        const dy = (h - dh) / 2 + panY;

        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();
      };

      drawLayer(currentImg, 1.0 - blend);
      drawLayer(nextImg, blend);

      // Saturated Atmospheric Optical Vignette (Keeps HTML typography readable)
      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.25,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.78
      );
      vignette.addColorStop(0, 'rgba(14, 14, 18, 0.15)');
      vignette.addColorStop(0.65, 'rgba(14, 14, 18, 0.72)');
      vignette.addColorStop(1, 'rgba(14, 14, 18, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Live 60 FPS Laser Vibrometry Acoustic Photon Streaks
      const numRays = 36;
      for (let i = 0; i < numRays; i++) {
        const rx = (i * 187 + t * 35) % w;
        const ry = (i * 431 + Math.sin(t * 1.8 + i) * 35) % h;
        const size = (i % 3) + 1.2;
        const alpha = (Math.sin(t * 2 + i) + 1) * 0.3 + 0.2;

        ctx.fillStyle = `rgba(255, 107, 53, ${alpha * 0.75})`;
        ctx.shadowColor = THEME.accent;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(rx, ry, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Dynamic Schlieren Sound Pressure Wavefronts in Chapter 0 & 3
      if (p < 0.25 || (p >= 0.45 && p <= 0.75)) {
        const cx = p < 0.25 ? w * 0.38 : w * 0.28;
        const cy = h * 0.5;
        const count = 5;

        for (let i = 0; i < count; i++) {
          const r = ((t * 65 + i * 55) % (w * 0.48));
          const alpha = Math.max(0, 1 - r / (w * 0.48));

          ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 0.75})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, -Math.PI / 2.5, Math.PI / 2.5);
          ctx.stroke();
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [scrollProgress, carrierFreq, isSimulating, isExplodedView]);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: THEME.bg,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
};

export default PhotorealisticHeroScene;
