import React from 'react';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { WaveformIcon, PacketIcon, FftIcon } from '../telemetry/CustomAcousticIcons';

export const ModulateSection: React.FC = () => {
  return (
    <section id="modulate" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
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
            PIPELINE 02 // MODULATE
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            Frequency-Shift Keyed Encoding
          </h2>

          <p className="text-base text-slate-300 font-normal">
            Binary payloads are encoded via dual-tone Frequency-Shift Keying (2-FSK). Binary 1s (Mark) modulate at 19.5 kHz, while Binary 0s (Space) modulate at 21.5 kHz, ensuring zero audible clicks or harmonic distortion.
          </p>
        </div>

        {/* Binary Stream to Waveform Visualization Panel */}
        <TelemetryPanel className="flex flex-col gap-8 w-full">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <PacketIcon size={20} color={THEME.accent} />
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                RAW BITSTREAM ➔ FSK MODULATION MATRIX
              </span>
            </div>
            <span className="font-mono text-xs text-[#00E5FF]">64-BYTE FRAME ENCODING</span>
          </div>

          {/* Interactive Binary Bit Cells */}
          <div className="grid grid-cols-8 gap-3 font-mono text-center">
            {[
              { bit: '1', tone: '19.5 kHz', state: 'MARK' },
              { bit: '0', tone: '21.5 kHz', state: 'SPACE' },
              { bit: '1', tone: '19.5 kHz', state: 'MARK' },
              { bit: '1', tone: '19.5 kHz', state: 'MARK' },
              { bit: '0', tone: '21.5 kHz', state: 'SPACE' },
              { bit: '0', tone: '21.5 kHz', state: 'SPACE' },
              { bit: '1', tone: '19.5 kHz', state: 'MARK' },
              { bit: '0', tone: '21.5 kHz', state: 'SPACE' },
            ].map((cell, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border flex flex-col gap-1 items-center justify-center transition-all hover:scale-105"
                style={{
                  backgroundColor: cell.bit === '1' ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  borderColor: cell.bit === '1' ? 'rgba(0, 229, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className={`text-2xl font-black ${cell.bit === '1' ? 'text-[#00E5FF]' : 'text-slate-400'}`}>
                  {cell.bit}
                </span>
                <span className="text-[10px] font-mono text-white font-bold">{cell.state}</span>
                <span className="text-[9px] font-mono text-slate-500">{cell.tone}</span>
              </div>
            ))}
          </div>

          {/* Modulator Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-slate-400">DATA THROUGHPUT:</span>
              <span className="text-2xl font-black text-white">16.4 kbps</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400">SYMBOL DURATION:</span>
              <span className="text-2xl font-black text-[#00E5FF]">61.0 µs</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-400">MODULATION SCHEME:</span>
              <span className="text-2xl font-black text-white">2-FSK / M-FSK</span>
            </div>
          </div>
        </TelemetryPanel>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // MODULATE:</span>
        Translates discrete digital binary words into distinct high-frequency acoustic tone shifts, enabling raw data packet transmission without electromagnetic radiation.
      </div>
    </section>
  );
};

export default ModulateSection;
