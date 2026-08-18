import React, { useState } from 'react';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../components/telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../components/telemetry/SpectrumBars';
import { PacketSimulator } from '../components/simulation/PacketSimulator';
import { LinkBudgetCalculator } from '../components/simulation/LinkBudgetCalculator';
import { ImpairmentSandbox } from '../components/simulation/ImpairmentSandbox';
import { ArchitectureDiagram } from '../components/simulation/ArchitectureDiagram';
import { ConstellationPlot } from '../components/telemetry/ConstellationPlot';
import { UltrasonicRadar } from '../components/simulation/UltrasonicRadar';
import { BeamSteeringSimulator } from '../components/simulation/BeamSteeringSimulator';
import { AcousticLevitator } from '../components/simulation/AcousticLevitator';
import {
  TransducerIcon,
  WaveformIcon,
  PacketIcon,
  FftIcon,
} from '../components/telemetry/CustomAcousticIcons';

export const MechanicsPage: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'radar' | 'beam' | 'levitator'>('radar');

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
          Comprehensive interactive suite: live browser microphone ultrasonic radar, 3D phased-array beam-steering, standing-wave acoustic levitator, link budget modeling, and RF EMP attack resistance.
        </p>
      </div>

      {/* NEW INNOVATION SUITE: Tabbed Advanced Acoustic Research Lab */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
            01 // ADVANCED ACOUSTIC RESEARCH EXPERIMENTS
          </h2>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveLabTab('radar')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLabTab === 'radar' ? 'bg-[#FF6B35] text-[#0E0E12] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              MIC ULTRASONIC RADAR
            </button>
            <button
              onClick={() => setActiveLabTab('beam')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLabTab === 'beam' ? 'bg-[#FF6B35] text-[#0E0E12] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PHASED-ARRAY BEAMFORMER
            </button>
            <button
              onClick={() => setActiveLabTab('levitator')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLabTab === 'levitator' ? 'bg-[#FF6B35] text-[#0E0E12] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D ACOUSTIC LEVITATOR
            </button>
          </div>
        </div>

        {activeLabTab === 'radar' && <UltrasonicRadar />}
        {activeLabTab === 'beam' && <BeamSteeringSimulator />}
        {activeLabTab === 'levitator' && <AcousticLevitator />}
      </section>

      {/* SYSTEM 2: Live Air-Gap Packet Transmission Simulator */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          02 // LIVE HARDWARE PACKET TRANSMISSION SIMULATOR
        </h2>
        <PacketSimulator />
      </section>

      {/* SYSTEM 3: I/Q Phase Constellation & Link Budget Modeler */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          03 // I/Q PHASE CONSTELLATION & ACOUSTIC LINK BUDGET MODELER
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <ConstellationPlot />
          </div>
          <div className="lg:col-span-7">
            <LinkBudgetCalculator />
          </div>
        </div>
      </section>

      {/* SYSTEM 4: RF EMP Jamming Resistance Sandbox */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          04 // RF EMP BLAST & DOPPLER JAMMING RESISTANCE SANDBOX
        </h2>
        <ImpairmentSandbox />
      </section>

      {/* SYSTEM 5: ASIC System Architecture Blueprint */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          05 // ASIC HARDWARE ARCHITECTURE BLUEPRINT
        </h2>
        <ArchitectureDiagram />
      </section>

      {/* SYSTEM 6: Deep Physics Principles Bento Grid */}
      <section className="flex flex-col gap-6">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#FF6B35] font-bold">
          06 // PHYSICAL PRINCIPLES & GOVERNING EQUATIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepMechanics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <TelemetryPanel key={idx} className="flex flex-col justify-between gap-4 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon size={18} color={THEME.accent} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
                    <span className="font-mono text-xs text-[#FF6B35]">{item.formula}</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 font-normal">
                  {item.desc}
                </p>
              </TelemetryPanel>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default MechanicsPage;
