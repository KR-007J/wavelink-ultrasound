import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { TransducerIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';

export const SpecSection: React.FC = () => {
  const specs = [
    { param: 'Carrier Frequency Range', val: '18.0 kHz – 24.0 kHz', note: 'Near-ultrasonic acoustic spectrum' },
    { param: 'Effective Transmission Range', val: '0.1 m – 5.0 m', note: 'Line-of-sight & diffuse room acoustics' },
    { param: 'Acoustic Latency', val: '14 ms', note: '1024-point sliding FFT window' },
    { param: 'Raw Data Rate', val: '16.4 kbps', note: '2-FSK / M-FSK modulation' },
    { param: 'Driver Power Consumption', val: '0.08 mW (Active) / 2 µW (Idle)', note: 'Micro-power piezoelectric driver' },
    { param: 'Supported Platforms', val: 'Embedded C, Rust, WebAssembly, iOS/Android', note: 'Microcontroller & Mobile SDKs' },
  ];

  return (
    <section id="specs" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
      <div className="flex flex-col gap-12 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <span
            className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
            style={{
              backgroundColor: 'rgba(0, 229, 255, 0.05)',
              borderColor: 'rgba(0, 229, 255, 0.2)',
              color: THEME.accent,
            }}
          >
            PIPELINE 06 // SPECIFICATIONS & DEPLOYMENT
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            Engineering Data Sheet
          </h2>

          <p className="text-base text-slate-300 font-normal">
            Production-grade near-ultrasonic data-transfer hardware chipset and C/Rust embedded firmware stack.
          </p>
        </div>

        {/* Technical Data Table Panel */}
        <TelemetryPanel className="p-8 md:p-12 flex flex-col gap-8">
          <div className="flex flex-col divide-y divide-white/10 font-mono text-xs">
            {specs.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-white font-bold text-sm">{item.param}</span>
                <div className="flex items-center gap-6">
                  <span className="text-[#00E5FF] font-black text-sm">{item.val}</span>
                  <span className="text-slate-500 hidden sm:inline text-[11px]">{item.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dev Kit Request Box */}
          <div className="p-8 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.08)',
                  borderColor: 'rgba(0, 229, 255, 0.25)',
                }}
              >
                <TransducerIcon size={24} color={THEME.accent} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-display font-bold text-lg">WAVELINK Dev Kit v2</span>
                <span className="text-xs text-slate-400 font-mono">Includes 2x Transceiver Core Modules + C/Rust SDK License</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xl whitespace-nowrap"
              style={{
                backgroundColor: THEME.accent,
                color: '#0B0C0E',
                boxShadow: '0 0 30px -5px rgba(0, 229, 255, 0.5)',
              }}
            >
              <span>REQUEST DEV KIT</span>
              <ArrowRightIcon size={14} color="#0B0C0E" />
            </motion.button>
          </div>
        </TelemetryPanel>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // SPECIFICATION:</span>
        Provides the concrete physical parameters, power consumption envelopes, and SDK targets required for integration into commercial and industrial IoT hardware.
      </div>
    </section>
  );
};

export default SpecSection;
