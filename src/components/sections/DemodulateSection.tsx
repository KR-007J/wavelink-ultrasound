import React from 'react';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { SpectrumBars } from '../telemetry/SpectrumBars';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { FftIcon, TransducerIcon } from '../telemetry/CustomAcousticIcons';

export const DemodulateSection: React.FC = () => {
  const packetSnr = useWavelinkStore((s) => s.packetSnr);
  const decodeLatency = useWavelinkStore((s) => s.decodeLatency);

  return (
    <section id="demodulate" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* Left Column (5 cols) - Receiver Demodulator Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between items-stretch">
          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FftIcon size={18} color={THEME.accent} />
                <span>SIGNAL-TO-NOISE RATIO</span>
              </div>
              <span className="text-[#00E5FF] font-bold">OPTIMAL</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black font-mono text-white">+{packetSnr} dB</span>
              <span className="text-xs text-slate-400">Robust reception above 85 dB ambient industrial noise floor</span>
            </div>
          </TelemetryPanel>

          <TelemetryPanel tiltOnHover className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <TransducerIcon size={18} color="#00E5FF" />
                <span>FFT DECODE LATENCY</span>
              </div>
              <span className="text-white font-bold">REAL-TIME</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-black font-mono text-[#00E5FF]">{decodeLatency} ms</span>
              <span className="text-xs text-slate-400">Continuous 1024-point sliding FFT window DSP execution</span>
            </div>
          </TelemetryPanel>
        </div>

        {/* Right Column (7 cols) - FFT Demodulation Architecture */}
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
              PIPELINE 04 // DEMODULATE
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              Fast Fourier Transform Spectrum Extraction
            </h2>

            <p className="text-base leading-relaxed text-slate-300 font-normal">
              The receiving MEMS microphone samples ambient audio at 48.0 kHz / 24-bit. An embedded DSP runs a sliding Fast Fourier Transform (FFT) pipeline, isolating energy peaks in the 18–24 kHz bin while discarding low-frequency speech and background rumble.
            </p>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400">
              <span>REAL-TIME FFT SPECTRAL DENSITY:</span>
              <span className="text-[#00E5FF] font-bold">1024 BINS · 46.8 Hz/BIN</span>
            </div>

            <div className="flex justify-between items-end h-16 bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <SpectrumBars barsCount={32} className="w-full justify-between h-10" />
            </div>
          </div>
        </div>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // DEMODULATE:</span>
        The receiver transducer converts raw pressure oscillations back into voltage samples, using Fast Fourier Transform spectral analysis to distinguish carrier frequencies from ambient acoustic noise.
      </div>
    </section>
  );
};

export default DemodulateSection;
