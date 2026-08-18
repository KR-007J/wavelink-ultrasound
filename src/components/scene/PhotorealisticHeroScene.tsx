import React, { useRef, useEffect } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const PhotorealisticHeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const isSimulating = useWavelinkStore((s) => s.isSimulating);
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);

  // Load 8K Photorealistic Assets
  const imagesRef = useRef<{
    hero: HTMLImageElement;
    emit: HTMLImageElement;
    propagate: HTMLImageElement;
    scada: HTMLImageElement;
  }>({
    hero: new Image(),
    emit: new Image(),
    propagate: new Image(),
    scada: new Image(),
  });

  useEffect(() => {
    imagesRef.current.hero.src = '/assets/transducer_macro.jpg';
    imagesRef.current.emit.src = '/assets/emit_macro.jpg';
    imagesRef.current.propagate.src = '/assets/propagate_scene.jpg';
    imagesRef.current.scada.src = '/assets/scada_facility.jpg';
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
      t += 0.024;
      const w = canvas.width;
      const h = canvas.height;
      const p = Math.max(0, Math.min(0.999, scrollProgress));

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0E0E12';
      ctx.fillRect(0, 0, w, h);

      // 7 Narrative Chapters across 0.0 to 1.0 progress:
      // Ch0: [0.0 - 0.16] (Hero Overview)
      // Ch1: [0.16 - 0.32] (Emit Macro)
      // Ch2: [0.32 - 0.48] (Modulate)
      // Ch3: [0.48 - 0.65] (Propagate Air-Gap)
      // Ch4: [0.65 - 0.80] (Demodulate)
      // Ch5: [0.80 - 0.92] (Decode)
      // Ch6: [0.92 - 1.00] (Specs)

      let currentImg = imagesRef.current.hero;
      let nextImg = imagesRef.current.emit;
      let blendFactor = 0;
      let scale = 1.0;
      let panX = 0;
      let panY = 0;

      if (p < 0.28) {
        // Hero to Emit Transition
        currentImg = imagesRef.current.hero;
        nextImg = imagesRef.current.emit;
        blendFactor = Math.min(1, Math.max(0, (p - 0.12) / 0.16));
        scale = 1.0 + p * 0.4;
        panX = Math.sin(t * 0.5) * 12 + p * 40;
        panY = Math.cos(t * 0.4) * 8;
      } else if (p < 0.55) {
        // Emit to Propagate Air-Gap Transition
        currentImg = imagesRef.current.emit;
        nextImg = imagesRef.current.propagate;
        blendFactor = Math.min(1, Math.max(0, (p - 0.38) / 0.17));
        scale = 1.15 - (p - 0.28) * 0.25;
        panX = (p - 0.28) * -60;
        panY = Math.sin(t * 0.6) * 10;
      } else {
        // Propagate to SCADA / Specs Transition
        currentImg = imagesRef.current.propagate;
        nextImg = imagesRef.current.hero;
        blendFactor = Math.min(1, Math.max(0, (p - 0.75) / 0.2));
        scale = 1.05 + Math.sin(p * Math.PI) * 0.08;
        panX = Math.sin(t * 0.3) * 15;
        panY = 0;
      }

      // Draw Base Image with Cinematic Parallax & Scale
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

      drawLayer(currentImg, 1.0 - blendFactor);
      drawLayer(nextImg, blendFactor);

      // Dark Atmosphere & Cinematic Vignette for UI Readability
      const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
      vignette.addColorStop(0, 'rgba(14, 14, 18, 0.25)');
      vignette.addColorStop(0.7, 'rgba(14, 14, 18, 0.75)');
      vignette.addColorStop(1, 'rgba(14, 14, 18, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Procedural 60 FPS Ambient Solar Amber Acoustic Refractions
      const numParticles = 45;
      for (let i = 0; i < numParticles; i++) {
        const px = ((i * 1234 + t * 25) % w);
        const py = ((i * 5678 + Math.sin(t + i) * 30) % h);
        const size = (i % 3) + 1.2;
        const alpha = Math.sin(t * 1.5 + i) * 0.25 + 0.35;

        ctx.fillStyle = `rgba(255, 107, 53, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Propagate Chapter Active Soundwave Waves
      if (p >= 0.45 && p <= 0.75) {
        const cx = w * 0.3;
        const cy = h * 0.5;
        for (let i = 0; i < 5; i++) {
          const r = ((t * 60 + i * 50) % (w * 0.45));
          const alpha = Math.max(0, 1 - r / (w * 0.45));
          ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 0.6})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, -Math.PI / 3, Math.PI / 3);
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
