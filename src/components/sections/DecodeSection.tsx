import React from 'react';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { PacketIcon, AcousticShieldIcon } from '../telemetry/CustomAcousticIcons';

export const DecodeSection: React.FC = () => {
  return (
    <section id="decode" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
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
            PIPELINE 05 // DECODE
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            Frame Assembly & Cryptographic Validation
          </h2>

          <p className="text-base text-slate-300 font-normal">
            Demodulated tones are reassembled into structured 64-byte acoustic frames. Preamble sync words align bit boundaries, while CRC-32 checksums verify packet integrity against ambient multipath phase reflections.
          </p>
        </div>

        {/* Structured Acoustic Frame Architecture Visualizer */}
        <TelemetryPanel className="flex flex-col gap-8 w-full">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <PacketIcon size={20} color={THEME.accent} />
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                ACOUSTIC FRAME SPECIFICATION (64 BYTES TOTAL)
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00E5FF]">
              <AcousticShieldIcon size={16} color={THEME.accent} />
              <span>CRC-32 VERIFIED</span>
            </div>
          </div>

          {/* Frame Segment Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono text-xs">
            
            {/* 1. Preamble */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-bold">PREAMBLE [4 BYTES]</span>
              <span className="text-lg font-black text-[#00E5FF]">0xAA55AA55</span>
              <span className="text-[11px] text-slate-400">Frequency sync & phase alignment</span>
            </div>

            {/* 2. Header */}
            <div className="md:col-span-3 p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-bold">HEADER [8 BYTES]</span>
              <span className="text-lg font-black text-white">0x01 · 0x30 · LEN:48</span>
              <span className="text-[11px] text-slate-400">Protocol version & routing ID</span>
            </div>

            {/* 3. Encrypted Payload */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-[#00E5FF]/[0.04] border border-[#00E5FF]/30 flex flex-col gap-2 shadow-lg">
              <span className="text-[10px] text-[#00E5FF] font-bold">PAYLOAD DATA [48 BYTES]</span>
              <span className="text-lg font-black text-white font-mono truncate">4A 6F 68 6E 20 44 6F 65</span>
              <span className="text-[11px] text-slate-300">Encrypted binary payload bytes</span>
            </div>

            {/* 4. Checksum */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-bold">CRC-32 [4 BYTES]</span>
              <span className="text-lg font-black text-[#00E5FF]">0x8F9B201A</span>
              <span className="text-[11px] text-slate-400">Parity & error detection</span>
            </div>

          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs text-slate-400">
            <span>PACKET LOSS RATE: &lt; 0.02% AT 3 METERS</span>
            <span className="text-white font-bold">BIT ERROR RATE (BER): 10⁻⁶</span>
          </div>
        </TelemetryPanel>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // DECODE:</span>
        The final stage where demodulated bit symbols are parsed into structured data frames with hardware checksum verification before being dispatched to application memory.
      </div>
    </section>
  );
};

export default DecodeSection;
