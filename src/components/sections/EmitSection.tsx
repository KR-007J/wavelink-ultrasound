import React from 'react';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { SlidersIcon, WaveformIcon, TransducerIcon } from '../telemetry/CustomAcousticIcons';

export const EmitSection: React.FC = () => {
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const setCarrierFreq = useWavelinkStore((s) => s.setCarrierFreq);

  return (
    <section id="emit" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Left Column (7 cols) - Interactive Carrier Dial Control */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8 telemetry-glass p-8 md:p-12">
          <div className="flex flex-col gap-6">
            <span
              className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
              style={{
                backgroundColor: 'rgba(0, 229, 255, 0.05)',
                borderColor: 'rgba(0, 229, 255, 0.2)',
                color: THEME.accent,
              }}
            >
              PIPELINE 01 // EMIT
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              Piezoelectric Acoustic Conversion
            </h2>

            <p className="text-base leading-relaxed text-slate-300 font-normal">
              Digital bit streams drive micro-voltage pulses into a lead zirconate titanate (PZT) ceramic element. Mechanical displacement generates pressure waves in ambient air, emitting a continuous near-ultrasonic carrier tone imperceptible to human ears.
            </p>
          </div>

          {/* Interactive Carrier Frequency Dial Slider */}
          <div className="flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <SlidersIcon size={18} color={THEME.accent} />
                <span className="font-bold text-white">CARRIER FREQUENCY CONTROL:</span>
              </div>
              <span className="text-[#00E5FF] font-black text-lg">{carrierFreq} kHz</span>
            </div>

            <input
              type="range"
              min="18.0"
              max="24.0"
              step="0.1"
              value={carrierFreq}
              onChange={(e) => setCarrierFreq(parseFloat(e.target.value))}
              className="w-full accent-[#00E5FF] cursor-pointer h-2 bg-white/10 rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>18.0 kHz (Lower Near-Ultrasonic)</span>
              <span>20.4 kHz (Standard Resonance)</span>
              <span>24.0 kHz (Upper Boundary)</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) - Transducer Telemetry Specs */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between items-stretch">
          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TransducerIcon size={18} color={THEME.accent} />
                <span>ACOUSTIC PRESSURE</span>
              </div>
              <span className="text-white font-bold">88 dB SPL</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black font-mono text-white">0.08 mW</span>
              <span className="text-xs text-slate-400">Ultra-low power acoustic driver circuit footprint</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <WaveformIcon size={18} color="#00E5FF" />
                <span>RESONANCE HARMONIC</span>
              </div>
              <span className="text-[#00E5FF] font-bold">Q-FACTOR: 45</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black font-mono text-white">Sub-mm</span>
              <span className="text-xs text-slate-400">Physical ceramic diaphragm mechanical deflection range</span>
            </div>
          </TelemetryPanel>
        </div>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // EMIT:</span>
        Demonstrates the first physical stage of the ultrasonic transmission pipeline where electrical signal energy is converted into air-pressure acoustic oscillations via the piezoelectric transducer.
      </div>
    </section>
  );
};

export default EmitSection;
