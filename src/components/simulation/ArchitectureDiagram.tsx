import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { TransducerIcon, FftIcon, PacketIcon, WaveformIcon } from '../telemetry/CustomAcousticIcons';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>('dsp');

  const blocks = {
    host: {
      name: 'Host Interface & Cryptographic FIFO',
      specs: 'SPI / I2C / UART @ 3.3V · 64-Byte Depth FIFO',
      desc: 'Connects to master embedded microcontroller. Direct Memory Access (DMA) channel transfers structured 64-byte payload frames with hardware CRC-32 calculation offload.',
      registers: '0x0000 (WL_CTRL) · 0x0008 (WL_TX_DATA)',
    },
    dsp: {
      name: 'UltraDSP RISC-V Dual-Core Processor',
      specs: '32-bit RV32IMC @ 120 MHz · 64 KB SRAM',
      desc: 'Executes real-time 2-FSK continuous-phase symbol modulation and dynamic threshold detection. Hardwired 1024-point Fast Fourier Transform accelerator computes spectral bins in 0.8ms.',
      registers: '0x0004 (WL_FREQ_KHZ) · 0x0010 (WL_DSP_STATUS)',
    },
    tx: {
      name: 'Class-D Piezoelectric Transmit Driver',
      specs: '16-bit 96 kHz DAC · 88 dBm Piezo Bridge',
      desc: 'Synthesizes clean, phase-continuous sinusoidal carrier voltage pulses into the lead zirconate titanate (PZT-5H) transducer disc with over 88% acoustic conversion efficiency.',
      registers: '0x0014 (WL_TX_GAIN) · 0x0018 (WL_DAC_CFG)',
    },
    rx: {
      name: 'Low-Noise MEMS Analog Front-End (AFE)',
      specs: '24-bit 48 kHz ADC · 18–24 kHz Bandpass Filter',
      desc: 'Captures ambient pressure signals from MEMS mic, applying a steep 8th-order Butterworth bandpass filter to suppress human-audible ambient noise below 16 kHz.',
      registers: '0x000C (WL_RX_STATUS) · 0x0020 (WL_ADC_GAIN)',
    },
  };

  return (
    <TelemetryPanel className="p-6 sm:p-8 flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              borderColor: 'rgba(255, 107, 53, 0.25)',
            }}
          >
            <FftIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              WAVELINK ASIC System Architecture Blueprint
            </h3>
            <span className="font-mono text-[11px] text-slate-400">
              Interactive Hardware Functional Block Map
            </span>
          </div>
        </div>

        <span className="font-mono text-xs text-slate-400">
          CLICK ANY BLOCK TO INSPECT REGISTERS
        </span>
      </div>

      {/* Interactive Block Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {[
          { id: 'host', label: '1. HOST SPI/UART', subtitle: '64B DMA FIFO' },
          { id: 'dsp', label: '2. UltraDSP RISC-V', subtitle: '1024-FFT Accelerator' },
          { id: 'tx', label: '3. CLASS-D TX', subtitle: '16-bit 96k DAC' },
          { id: 'rx', label: '4. LOW-NOISE AFE', subtitle: '24-bit 48k ADC' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedBlock(item.id)}
            className={`p-4 rounded-xl border flex flex-col items-start gap-1 text-left transition-all cursor-pointer ${
              selectedBlock === item.id
                ? 'bg-[#FF6B35]/20 border-[#FF6B35] shadow-[0_0_20px_-3px_rgba(255,107,53,0.4)]'
                : 'bg-black/40 border-white/10 hover:border-white/20'
            }`}
          >
            <span className={`font-mono text-xs font-bold ${selectedBlock === item.id ? 'text-[#FF6B35]' : 'text-white'}`}>
              {item.label}
            </span>
            <span className="text-[11px] font-mono text-slate-400">{item.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Selected Block Inspection Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBlock}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-2xl bg-black/50 border border-white/10 flex flex-col gap-4 font-mono text-xs"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-3">
            <span className="text-base font-bold text-white font-display">
              {blocks[selectedBlock as keyof typeof blocks].name}
            </span>
            <span className="text-[#FF6B35] font-bold">
              {blocks[selectedBlock as keyof typeof blocks].specs}
            </span>
          </div>

          <p className="text-slate-300 font-sans text-sm leading-relaxed font-normal">
            {blocks[selectedBlock as keyof typeof blocks].desc}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
            <span>REGISTER MAP MAPPING:</span>
            <span className="text-white font-bold">{blocks[selectedBlock as keyof typeof blocks].registers}</span>
          </div>
        </motion.div>
      </AnimatePresence>

    </TelemetryPanel>
  );
};

export default ArchitectureDiagram;
