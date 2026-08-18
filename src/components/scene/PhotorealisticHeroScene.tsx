import React, { useRef, useEffect } from 'react';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const PhotorealisticHeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const isSimulating = useWavelinkStore((s) => s.isSimulating);
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);

  // Multi-Frame Authentic MNC Hardware Pipeline
  const imagesRef = useRef<{
    hardware: HTMLImageElement;
    emit: HTMLImageElement;
    schlieren: HTMLImageElement;
    propagate: HTMLImageElement;
  }>({
    hardware: new Image(),
    emit: new Image(),
    schlieren: new Image(),
    propagate: new Image(),
  });

  useEffect(() => {
    imagesRef.current.hardware.src = '/assets/mnc_hardware.jpg';
    imagesRef.current.emit.src = '/assets/emit_macro.jpg';
    imagesRef.current.schlieren.src = '/assets/schlieren_lab.jpg';
    imagesRef.current.propagate.src = '/assets/propagate_scene.jpg';
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
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      const p = Math.max(0, Math.min(0.999, scrollProgress));

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0E0E12';
      ctx.fillRect(0, 0, w, h);

      // Frame Interpolation across 7 Chapters:
      // Frame 0: Authentic WAVELINK PHY-2400 Enterprise Unit (0.00 - 0.22)
      // Frame 1 & 2: Diaphragm & Electrode Nodal Resonance (0.22 - 0.48)
      // Frame 3 & 4: Optical Schlieren Air-Gap Propagation (0.48 - 0.76)
      // Frame 5 & 6: Transceiver Verification & Specs (0.76 - 1.00)

      let currentImg = imagesRef.current.hardware;
      let nextImg = imagesRef.current.emit;
      let blend = 0;
      let scale = 1.0;
      let panX = 0;
      let panY = 0;

      if (p < 0.22) {
        // Frame 0: PHY-2400 Hardware Unit Overview
        currentImg = imagesRef.current.hardware;
        nextImg = imagesRef.current.emit;
        blend = Math.min(1, Math.max(0, (p - 0.12) / 0.10));
        scale = 1.0 + p * 0.35;
        panX = Math.sin(t * 0.3) * 8 + p * 30;
        panY = Math.cos(t * 0.25) * 6;
      } else if (p < 0.50) {
        // Frame 1 & 2: Macro Diaphragm to Schlieren Wavefield
        currentImg = imagesRef.current.emit;
        nextImg = imagesRef.current.schlieren;
        blend = Math.min(1, Math.max(0, (p - 0.32) / 0.18));
        scale = 1.15 - (p - 0.22) * 0.2;
        panX = (p - 0.22) * -50;
        panY = Math.sin(t * 0.3) * 8;
      } else if (p < 0.78) {
        // Frame 3 & 4: Schlieren Laboratory to Propagate Channel
        currentImg = imagesRef.current.schlieren;
        nextImg = imagesRef.current.hardware;
        blend = Math.min(1, Math.max(0, (p - 0.62) / 0.16));
        scale = 1.04 + Math.sin((p - 0.50) * Math.PI) * 0.08;
        panX = Math.sin(t * 0.2) * 12;
        panY = 0;
      } else {
        // Frame 5 & 6: Hardware Unit Specifications
        currentImg = imagesRef.current.hardware;
        nextImg = imagesRef.current.hardware;
        blend = 0;
        scale = 1.0 + (p - 0.78) * 0.15;
        panX = 0;
        panY = Math.sin(t * 0.25) * 6;
      }

      // Draw Cinematic Image Layers
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

      // Clean, Studio-Grade Ambient Contrast Vignette (Guarantees Razor-Sharp Text Readability)
      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.28,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.8
      );
      vignette.addColorStop(0, 'rgba(14, 14, 18, 0.2)');
      vignette.addColorStop(0.65, 'rgba(14, 14, 18, 0.75)');
      vignette.addColorStop(1, 'rgba(14, 14, 18, 0.96)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Subtle, Ultra-Refined Acoustic Photon Stream (Clean & Minimalist)
      const numRays = 24;
      for (let i = 0; i < numRays; i++) {
        const rx = (i * 211 + t * 25) % w;
        const ry = (i * 487 + Math.sin(t * 1.4 + i) * 20) % h;
        const size = (i % 2) + 1.0;
        const alpha = (Math.sin(t * 1.5 + i) + 1) * 0.25 + 0.15;

        ctx.fillStyle = `rgba(255, 107, 53, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(rx, ry, size, 0, Math.PI * 2);
        ctx.fill();
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
