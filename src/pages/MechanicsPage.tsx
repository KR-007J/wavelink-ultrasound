import React from 'react';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../components/telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../components/telemetry/SpectrumBars';
import { PacketSimulator } from '../components/simulation/PacketSimulator';
import { LinkBudgetCalculator } from '../components/simulation/LinkBudgetCalculator';
import { ImpairmentSandbox } from '../components/simulation/ImpairmentSandbox';
import { ArchitectureDiagram } from '../components/simulation/ArchitectureDiagram';
import { ConstellationPlot } from '../components/telemetry/ConstellationPlot';
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
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full z-10 flex flex-col gap-16">
      
      {/* Page Header */}
      <div className="flex flex-col gap-6">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B35] font-bold">
            DEEP ARCHITECTURAL MECHANICS & DSP LAB
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Physical Principles & <br />
          <span style={{ color: THEME.accent }}>Hardware-in-the-Loop DSP Lab.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
          Comprehensive interactive teardown of piezoelectric resonance, real-time 2-FSK acoustic packet transmission, link budget physics modeling, and jamming resistance simulations.
        </p>
      </div>

      {/* SYSTEM 1: Live Air-Gap Packet Transmission Simulator */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          01 // LIVE HARDWARE SIMULATOR
        </h2>
        <PacketSimulator />
      </section>

      {/* SYSTEM 2: Interactive ASIC Architecture Blueprint */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          02 // ASIC SYSTEM ARCHITECTURE BLOCK DIAGRAM
        </h2>
        <ArchitectureDiagram />
      </section>

      {/* SYSTEM 3: Enterprise Link Budget & Range Calculator */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          03 // ENTERPRISE LINK BUDGET & ACOUSTIC RANGE MODELER
        </h2>
        <LinkBudgetCalculator />
      </section>

      {/* SYSTEM 4: Hostile Channel & Jamming Resistance Sandbox */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          04 // HOSTILE CHANNEL & EMP JAMMING RESISTANCE
        </h2>
        <ImpairmentSandbox />
      </section>

      {/* SYSTEM 5: Real-Time Phase Constellation Diagram */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          05 // REAL-TIME IN-PHASE / QUADRATURE (I/Q) CONSTELLATION POLAR PLOT
        </h2>
        <TelemetryPanel className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <h3 className="font-display font-bold text-xl text-white">
              Continuous-Phase 2-FSK Trajectory Analysis
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Visualizing the polar symbol trajectory across $(I, Q)$ phase space. WAVELINK maintains exact phase continuity at symbol transitions ($\Delta\phi = \pm\pi$), bounding out-of-band spectral emissions and guaranteeing zero audible switching transients.
            </p>
            <div className="flex items-center gap-4 pt-2 font-mono text-xs text-slate-400">
              <span>ERROR VECTOR MAGNITUDE (EVM): <strong className="text-[#10B981]">1.4% RMS</strong></span>
              <span>CARRIER SUPPRESSION: <strong className="text-white">&gt; 45 dB</strong></span>
            </div>
          </div>

          <div className="shrink-0">
            <ConstellationPlot size={240} />
          </div>
        </TelemetryPanel>
      </section>

      {/* Deep Mechanics Cards Grid */}
      <section className="flex flex-col gap-6">
        <h2 className="text-sm font-mono tracking-widest uppercase text-slate-400 font-bold">
          05 // MATHEMATICAL FOUNDATIONS & EQUATIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deepMechanics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TelemetryPanel key={idx} className="flex flex-col justify-between gap-6 p-6 sm:p-8">
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
      </section>

    </div>
  );
};

export default MechanicsPage;
