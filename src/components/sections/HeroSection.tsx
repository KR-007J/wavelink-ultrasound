import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../telemetry/SpectrumBars';
import { ArrowRightIcon, WaveformIcon, TransducerIcon } from '../telemetry/CustomAcousticIcons';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Left Headline Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-8 hero-glass p-8 md:p-12">
          <div className="flex flex-col gap-6">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
              style={{
                backgroundColor: 'rgba(0, 229, 255, 0.06)',
                borderColor: 'rgba(0, 229, 255, 0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#00E5FF] font-bold">
                NEAR-ULTRASONIC · 18–24 kHz
              </span>
            </div>

            {/* Mask-Reveal Display Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.04]"
              >
                DATA, CARRIED <br />
                <span style={{ color: THEME.accent }}>ON SOUND.</span>
              </motion.h1>
            </div>

            <p className="text-base md:text-lg max-w-2xl font-normal leading-relaxed text-slate-300">
              WAVELINK transforms standard audio speakers and microphones into secure, air-gapped data transceivers. Transmitting binary packets across physical space via near-ultrasonic acoustic waves with zero RF emissions.
            </p>
          </div>

          {/* CTA Button Group */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#emit">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xl transition-all"
                style={{
                  backgroundColor: THEME.accent,
                  color: '#0B0C0E',
                  boxShadow: '0 0 30px -5px rgba(0, 229, 255, 0.5)',
                }}
              >
                <span>SEE IT TRANSMIT</span>
                <ArrowRightIcon size={14} color="#0B0C0E" />
              </motion.button>
            </a>

            <a href="#specs">
              <button className="px-7 py-3.5 rounded-xl font-mono text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-[#00E5FF]/40 bg-white/[0.02] cursor-pointer transition-all">
                <span>READ THE SPEC</span>
              </button>
            </a>
          </div>
        </div>

        {/* Right Matched-Height Telemetry Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 justify-between items-stretch">
          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <WaveformIcon size={18} color={THEME.accent} />
                <span className="tracking-wider">CARRIER OSCILLATION</span>
              </div>
              <SpectrumBars barsCount={8} />
            </div>
            
            <OscilloscopeStrip height={65} />

            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-1">
              <span>FREQUENCY BAND:</span>
              <span className="text-white font-bold">18.0–24.0 kHz</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TransducerIcon size={18} color={THEME.accent} />
                <span className="tracking-wider">PHYSICAL TRANSDUCER</span>
              </div>
              <span className="text-[#00E5FF] font-bold">ACTIVE</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black font-mono text-white">Piezo Ceramic</span>
              <span className="text-xs text-slate-400">High-Q acoustic resonance diaphragm with sub-millimeter displacement</span>
            </div>
          </TelemetryPanel>
        </div>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // HERO:</span>
        Maps to baseline carrier oscillation initialization before binary data modulation begins. The 3D transducer core establishes a stable harmonic tone in the 18–24 kHz near-ultrasonic spectrum.
      </div>
    </section>
  );
};

export default HeroSection;
