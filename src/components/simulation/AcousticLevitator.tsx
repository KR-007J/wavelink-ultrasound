import React, { useRef, useEffect, useState } from 'react';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';
import { WaveformIcon } from '../telemetry/CustomAcousticIcons';

export const AcousticLevitator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(22.0); // kHz
  const [numParticles, setNumParticles] = useState(12);
  const [turbulence, setTurbulence] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.035;
      const w = canvas.width;
      const h = canvas.height;

      // Dark Basalt Chamber
      ctx.fillStyle = '#121118';
      ctx.fillRect(0, 0, w, h);

      // Emitter Top & Bottom Transducer Horns
      const hornWidth = 140;
      const cx = w * 0.5;

      // Top Emitter
      ctx.fillStyle = '#2A2633';
      ctx.fillRect(cx - hornWidth / 2, 10, hornWidth, 18);
      ctx.fillStyle = THEME.accent;
      ctx.fillRect(cx - hornWidth / 2 + 10, 26, hornWidth - 20, 4);

      // Bottom Reflector
      ctx.fillStyle = '#2A2633';
      ctx.fillRect(cx - hornWidth / 2, h - 28, hornWidth, 18);
      ctx.fillStyle = THEME.secondary;
      ctx.fillRect(cx - hornWidth / 2 + 10, h - 32, hornWidth - 20, 4);

      // Standing Wave Pressure Node Profiles
      const wavelengthPixels = 42 * (22.0 / frequency);
      const startY = 32;
      const endY = h - 32;
      const chamberHeight = endY - startY;

      // Draw Standing Wave Sinusoidal Pressure Envelopes
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.25)';
      ctx.lineWidth = 1.5;

      const numNodes = Math.floor(chamberHeight / wavelengthPixels);

      for (let n = 0; n <= numNodes; n++) {
        const nodeY = startY + n * wavelengthPixels;

        // Draw nodal plane line
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx - 100, nodeY);
        ctx.lineTo(cx + 100, nodeY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '8px monospace';
        ctx.fillText(`NODE z_${n}`, cx + 105, nodeY + 3);
      }

      // Draw Oscillating Trapped Micro-Particles at Nodal Planes
      for (let i = 0; i < numParticles; i++) {
        const nodeIdx = i % (numNodes + 1);
        const baseNodeY = startY + nodeIdx * wavelengthPixels;

        const turbOffset = turbulence ? Math.sin(t * 12 + i) * 15 : 0;
        const hoverX = cx + Math.sin(t * 2 + i * 1.5) * 18 + (i % 3 - 1) * 25;
        const hoverY = baseNodeY + Math.cos(t * 3 + i) * 2.5 + turbOffset;

        // Radiant Trapped Particle
        ctx.fillStyle = i % 2 === 0 ? THEME.accent : '#10B981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(hoverX, hoverY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [frequency, numParticles, turbulence]);

  const handleTurbulence = () => {
    soundEngine.playPacketBurst();
    setTurbulence(true);
    setTimeout(() => setTurbulence(false), 1200);
  };

  return (
    <div className="flex flex-col gap-5 telemetry-glass p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center">
            <WaveformIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-white">
              3D ACOUSTIC STANDING-WAVE LEVITATION CHAMBER
            </h3>
            <span className="font-mono text-xs text-slate-400">
              Acoustic Radiation Force (F_rad = -∇U) Trapping Micro-Particles
            </span>
          </div>
        </div>

        <button
          onClick={handleTurbulence}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#FF6B35]/20 hover:text-[#FF6B35] text-slate-300 font-mono text-xs transition-colors cursor-pointer"
        >
          PERTURB PRESSURE FIELD
        </button>
      </div>

      {/* Levitation Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} width={640} height={240} className="w-full h-56 sm:h-64 object-cover" />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-400">LEVITATOR FREQUENCY:</span>
            <span className="text-[#FF6B35] font-bold">{frequency} kHz</span>
          </div>
          <input
            type="range"
            min={18.0}
            max={24.0}
            step={0.2}
            value={frequency}
            onChange={(e) => {
              const val = Number(e.target.value);
              setFrequency(val);
              soundEngine.playPiezoChirp(val);
            }}
            className="w-full accent-[#FF6B35] cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-400">TRAPPED PARTICLE DENSITY:</span>
            <span className="text-white font-bold">{numParticles} PARTICLES</span>
          </div>
          <input
            type="range"
            min={4}
            max={24}
            value={numParticles}
            onChange={(e) => setNumParticles(Number(e.target.value))}
            className="w-full accent-[#FF6B35] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AcousticLevitator;
