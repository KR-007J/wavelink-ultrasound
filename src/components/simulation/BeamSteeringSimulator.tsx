import React, { useRef, useEffect, useState } from 'react';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';
import { TransducerIcon } from '../telemetry/CustomAcousticIcons';

export const BeamSteeringSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [steeringAngle, setSteeringAngle] = useState(0); // -45 to +45 deg
  const [numElements, setNumElements] = useState(16);
  const [focusDistance, setFocusDistance] = useState(2.4); // meters

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      // Dark Basalt Background
      ctx.fillStyle = '#121118';
      ctx.fillRect(0, 0, w, h);

      // Radar Concentric Range Rings
      const cx = w * 0.5;
      const cy = h * 0.85;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 50; r < h * 0.8; r += 45) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '9px monospace';
        ctx.fillText(`${(r * 0.015).toFixed(1)}m`, cx + r - 20, cy - 6);
      }

      // Radial Azimuth Rays
      for (let deg = -60; deg <= 60; deg += 30) {
        const rad = (deg - 90) * (Math.PI / 180);
        const rx = cx + Math.cos(rad) * (h * 0.75);
        const ry = cy + Math.sin(rad) * (h * 0.75);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(rx, ry);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '9px monospace';
        ctx.fillText(`${deg}°`, rx - 8, ry - 4);
      }

      // Draw Phased Array Elements at bottom
      const arrayWidth = 180;
      const spacing = arrayWidth / (numElements - 1);
      const startX = cx - arrayWidth / 2;

      for (let i = 0; i < numElements; i++) {
        const ex = startX + i * spacing;
        ctx.fillStyle = THEME.accent;
        ctx.shadowColor = THEME.accent;
        ctx.shadowBlur = 8;
        ctx.fillRect(ex - 3, cy - 2, 6, 8);
        ctx.shadowBlur = 0;
      }

      // Calculate Steered Beam Vector
      const thetaRad = (steeringAngle - 90) * (Math.PI / 180);
      const beamLength = h * 0.7;
      const tx = cx + Math.cos(thetaRad) * beamLength;
      const ty = cy + Math.sin(thetaRad) * beamLength;

      // Draw Main Lobe Acoustic Energy Beam
      const grad = ctx.createLinearGradient(cx, cy, tx, ty);
      grad.addColorStop(0, 'rgba(255, 107, 53, 0.8)');
      grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
      grad.addColorStop(1, 'rgba(255, 107, 53, 0.05)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx, cy);

      const spreadRad = (12 * Math.PI) / 180;
      ctx.arc(cx, cy, beamLength, thetaRad - spreadRad, thetaRad + spreadRad);
      ctx.closePath();
      ctx.fill();

      // Draw Propagating Wavefront Arcs along Steered Beam
      for (let k = 0; k < 6; k++) {
        const radius = ((t * 40 + k * 35) % beamLength);
        const alpha = Math.max(0, 1 - radius / beamLength);

        ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, thetaRad - spreadRad * 0.9, thetaRad + spreadRad * 0.9);
        ctx.stroke();
      }

      // Target Receiver Node Reticle
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.font = '10px monospace';
      ctx.fillText(`RECEIVER LOCK (θ=${steeringAngle}°, ${focusDistance}m)`, tx + 12, ty);

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [steeringAngle, numElements, focusDistance]);

  return (
    <div className="flex flex-col gap-5 telemetry-glass p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center">
            <TransducerIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-white">
              3D PHASED-ARRAY ACOUSTIC BEAM-STEERING SIMULATOR
            </h3>
            <span className="font-mono text-xs text-slate-400">
              16-Element Near-Ultrasonic Spatial Wave Interference Engine
            </span>
          </div>
        </div>

        <span className="font-mono text-xs text-[#FF6B35] font-bold px-3 py-1.5 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30">
          Δφ = (2π/λ) · d · sin(θ)
        </span>
      </div>

      {/* Beam Steering Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas ref={canvasRef} width={640} height={240} className="w-full h-56 sm:h-64 object-cover" />
      </div>

      {/* Interactive Steering Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-400">AZIMUTH STEERING ANGLE (θ):</span>
            <span className="text-[#FF6B35] font-bold">{steeringAngle}°</span>
          </div>
          <input
            type="range"
            min={-45}
            max={45}
            value={steeringAngle}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSteeringAngle(val);
              soundEngine.playPiezoChirp(20 + Math.abs(val) * 0.1);
            }}
            className="w-full accent-[#FF6B35] cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-slate-400">FOCAL RANGE DISTANCE:</span>
            <span className="text-white font-bold">{focusDistance} m</span>
          </div>
          <input
            type="range"
            min={0.8}
            max={3.6}
            step={0.1}
            value={focusDistance}
            onChange={(e) => setFocusDistance(Number(e.target.value))}
            className="w-full accent-[#FF6B35] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BeamSteeringSimulator;
