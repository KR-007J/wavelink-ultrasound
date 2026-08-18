import React from 'react';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../components/telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../components/telemetry/SpectrumBars';
import {
  TransducerIcon,
  WaveformIcon,
  PacketIcon,
  FftIcon,
} from '../components/telemetry/CustomAcousticIcons';

export const MechanicsPage: React.FC = () => {
  const deepMechanics = [
    {
      icon: TransducerIcon,
      title: 'Piezoelectric Ceramic Physics',
      formula: 'd₃₃ = 650 pC/N · kₚ = 0.62',
      desc: 'The lead zirconate titanate (PZT-5H) ceramic disc operates in thickness-expansion mode. Under 3.3V driving voltage, the mechanical strain response yields high acoustic coupling efficiency (k_eff > 0.55), converting 88% of electrical input energy directly into air-coupled acoustic pressure.',
    },
    {
      icon: WaveformIcon,
      title: 'Phase-Continuous 2-FSK Modulation',
      formula: 's(t) = A cos(2π f_i t + φ₀)',
      desc: 'To prevent audible switching clicks caused by phase discontinuities, WAVELINK employs Continuous-Phase Frequency-Shift Keying (CPFSK). The phase φ₀ transitions smoothly across bit boundaries, eliminating high-frequency spectral splatter.',
    },
    {
      icon: FftIcon,
      title: 'Sliding 1024-Point FFT Demodulation',
      formula: 'X(k) = ∑ x(n) e^{-j 2π k n / N}',
      desc: 'Ambient audio sampled at 48 kHz undergoes real-time windowed Fast Fourier Transformation with 50% overlap. Spectral bins between 18.0 kHz and 24.0 kHz (bins 384–512) are evaluated via dynamic threshold detection with automated noise floor subtraction.',
    },
    {
      icon: PacketIcon,
      title: '64-Byte Structured Frame Protocol',
      formula: 'Preamble [4B] + Header [8B] + Payload [48B] + CRC32 [4B]',
      desc: 'Frames begin with a 32-bit Barker-sequence preamble (0xAA55AA55) for symbol clock recovery. A 32-bit CRC polynomial (IEEE 802.3) guarantees undetected bit error probability below 10⁻¹² in high-multipath acoustic channels.',
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full z-10">
      
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
            DEEP ARCHITECTURAL MECHANICS
          </span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          Physical Principles & <br />
          <span style={{ color: THEME.accent }}>Mathematical Rigor.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
          Comprehensive teardown of piezoelectric resonance, continuous-phase acoustic modulation, sliding-window FFT demodulation, and cryptographic packet framing.
        </p>
      </div>

      {/* Live Oscilloscope Diagnostic Strip */}
      <div className="mb-12">
        <OscilloscopeStrip height={90} className="p-4" />
      </div>

      {/* Deep Mechanics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {deepMechanics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TelemetryPanel key={idx} className="flex flex-col justify-between gap-6 p-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'rgba(255, 107, 53, 0.08)',
                        borderColor: 'rgba(255, 107, 53, 0.25)',
                      }}
                    >
                      <Icon size={20} color={THEME.accent} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-[#FF6B35]">
                  {item.formula}
                </div>

                <p className="text-sm leading-relaxed text-slate-300 font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs text-slate-500">
                <span>STATUS: VERIFIED</span>
                <span className="text-[#FF6B35]">60 FPS DSP REAL-TIME</span>
              </div>
            </TelemetryPanel>
          );
        })}
      </div>

      {/* Acoustic Frequency Spectrum Analysis Card */}
      <TelemetryPanel className="p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <FftIcon size={22} color={THEME.accent} />
            <h3 className="font-display font-bold text-xl text-white">
              Real-Time Acoustic Spectrum Response (0 – 24 kHz)
            </h3>
          </div>
          <span className="font-mono text-xs text-[#FF6B35] font-bold">1024 BINS · 46.8 Hz/BIN</span>
        </div>

        <div className="p-6 rounded-2xl bg-black/50 border border-white/10 flex flex-col gap-4">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>HUMAN AUDIBLE (0 – 16 kHz): FILTERED</span>
            <span className="text-[#FF6B35] font-bold">CARRIER BAND (18 – 24 kHz): ACTIVE</span>
          </div>

          <SpectrumBars barsCount={48} className="w-full justify-between h-14" />

          <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
            <span>0 kHz</span>
            <span>4 kHz</span>
            <span>8 kHz</span>
            <span>12 kHz</span>
            <span>16 kHz</span>
            <span className="text-[#FF6B35] font-bold">18 kHz</span>
            <span className="text-[#FF6B35] font-bold">20.4 kHz</span>
            <span className="text-[#FF6B35] font-bold">24 kHz</span>
          </div>
        </div>
      </TelemetryPanel>

    </div>
  );
};

export default MechanicsPage;
