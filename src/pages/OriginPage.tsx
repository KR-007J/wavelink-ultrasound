import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import { TransducerIcon, ArrowRightIcon } from '../components/telemetry/CustomAcousticIcons';
import { TactileButton } from '../components/ui/TactileButton';
import { BenchmarkMatrix } from '../components/telemetry/BenchmarkMatrix';

interface OriginPageProps {
  onNavigate: (page: string) => void;
}

export const OriginPage: React.FC<OriginPageProps> = ({ onNavigate }) => {
  const originChapters = [
    {
      num: '01',
      title: 'The Air-Gap Conundrum',
      year: '2023',
      desc: 'High-security environments and SCADA networks require true physical air-gaps. However, copper cables introduce eavesdropping vulnerabilities, while RF wireless protocols (Wi-Fi, Bluetooth) bleed electromagnetic emissions beyond room walls. We set out to carry data purely on mechanical sound pressure waves.',
    },
    {
      num: '02',
      title: 'The First Piezo Diaphragm',
      year: '2024',
      desc: 'Early prototypes combined raw lead zirconate titanate (PZT) ceramic elements with hand-wound resonant inductors. While acoustic propagation succeeded, ambient room noise and reverberant echoes created severe packet loss. We engineered an adaptive sliding-window FFT filter capable of isolating carrier tones in 85 dB noise floors.',
    },
    {
      num: '03',
      title: 'Near-Ultrasonic Carrier Lock',
      year: '2025',
      desc: 'By locking the acoustic transmission window between 18.0 kHz and 24.0 kHz, WAVELINK achieved zero human audibility while remaining fully compatible with commercial off-the-shelf MEMS audio hardware. Dual-tone 2-FSK modulation eliminated switching transients, enabling robust 16.4 kbps throughput.',
    },
    {
      num: '04',
      title: 'Monolithic Titanium Production',
      year: '2026',
      desc: 'Today, the WAVELINK Core platform packages high-Q acoustic resonance, hardware cryptographic parity validation, and micro-power DSP logic into a monolithic titanium housing ready for mission-critical embedded deployments.',
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto w-full z-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 mb-16">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B35] font-bold">
            ORIGIN & HARDWARE EVOLUTION
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Pioneering Air-Gapped <br />
          <span style={{ color: THEME.accent }}>Acoustic Telemetry.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          How a breakthrough in near-ultrasonic resonance turned physical acoustic pressure into a secure, electromagnetic-free data conduit.
        </p>
      </div>

      {/* Origin Timeline Stream */}
      <div className="flex flex-col gap-12 relative">
        <div className="absolute top-0 bottom-0 left-6 sm:left-8 w-[1px] bg-white/10" />

        {originChapters.map((ch, idx) => (
          <motion.div
            key={ch.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-start gap-6 sm:gap-10 relative"
          >
            {/* Timeline Node */}
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border shrink-0 z-10"
              style={{
                backgroundColor: 'rgba(14, 14, 18, 0.95)',
                borderColor: idx === 3 ? THEME.accent : 'rgba(255, 255, 255, 0.15)',
                boxShadow: idx === 3 ? '0 0 20px -3px rgba(255, 107, 53, 0.35)' : 'none',
              }}
            >
              <span className={`font-mono font-black text-sm sm:text-base ${idx === 3 ? 'text-[#FF6B35]' : 'text-white'}`}>
                {ch.num}
              </span>
            </div>

            {/* Content Glass Panel */}
            <TelemetryPanel className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-xl text-white">
                  {ch.title}
                </h3>
                <span className="font-mono text-xs font-bold text-[#FF6B35] px-2.5 py-1 rounded-md bg-[#FF6B35]/10 border border-[#FF6B35]/25">
                  {ch.year}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-slate-300 font-normal">
                {ch.desc}
              </p>
            </TelemetryPanel>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Protocol Benchmark Matrix */}
      <div className="mt-8">
        <BenchmarkMatrix />
      </div>

      {/* Connected Architecture CTA */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              borderColor: 'rgba(255, 107, 53, 0.25)',
            }}
          >
            <TransducerIcon size={24} color={THEME.accent} />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-lg">Inspect the Architecture</h4>
            <p className="text-xs font-mono text-slate-400">Discover the full physical and mathematical breakdown</p>
          </div>
        </div>

        <TactileButton
          onClick={() => onNavigate('mechanics')}
          variant="primary"
          icon={<ArrowRightIcon size={14} color="#0E0E12" />}
        >
          VIEW MECHANICS
        </TactileButton>
      </div>

    </div>
  );
};

export default OriginPage;
