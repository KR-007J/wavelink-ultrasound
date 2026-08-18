import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../telemetry/SpectrumBars';
import { WaveformIcon, PacketIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';

export const PacketSimulator: React.FC = () => {
  const [inputText, setInputText] = useState('AIRGAP_SECURE_0x9F');
  const isSimulating = useWavelinkStore((s) => s.isSimulating);
  const simulationProgress = useWavelinkStore((s) => s.simulationProgress);
  const decodedBytes = useWavelinkStore((s) => s.decodedBytes);
  const crcValidated = useWavelinkStore((s) => s.crcValidated);
  const startSimulation = useWavelinkStore((s) => s.startSimulation);
  const resetSimulation = useWavelinkStore((s) => s.resetSimulation);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);

  const presets = [
    'SCADA_TELEMETRY_98%',
    'FLIGHT_CTRL_AUTH_TOKEN',
    'AIRGAP_CRYPT_0x9F41',
  ];

  const handleTransmit = () => {
    if (!inputText.trim() || isSimulating) return;
    startSimulation(inputText.trim());
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
            <PacketIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Live Air-Gap Packet Transmission Simulator
            </h3>
            <span className="font-mono text-[11px] text-slate-400">
              Hardware-in-the-Loop 2-FSK DSP Emulation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="font-mono text-xs text-[#FF6B35] font-bold">
            DSP ENGINE ACTIVE · {carrierFreq} kHz
          </span>
        </div>
      </div>

      {/* Interactive Input & Presets */}
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs text-slate-400 flex justify-between">
          <span>INPUT ARBITRARY PAYLOAD (STRING):</span>
          <span>MAX 32 BYTES</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputText}
            maxLength={32}
            disabled={isSimulating}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type payload string..."
            className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/15 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
          />

          <button
            onClick={handleTransmit}
            disabled={isSimulating}
            className={`px-6 py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSimulating
                ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                : 'bg-[#FF6B35] text-[#0E0E12] shadow-[0_0_25px_-4px_rgba(255,107,53,0.6)] hover:scale-[1.02]'
            }`}
          >
            <span>{isSimulating ? 'TRANSMITTING...' : 'TRANSMIT ACOUSTIC PACKET'}</span>
            <ArrowRightIcon size={14} color="#0E0E12" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-mono text-[10px] text-slate-500">PRESETS:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setInputText(preset);
                resetSimulation();
              }}
              disabled={isSimulating}
              className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[10px] text-slate-400 hover:text-white hover:border-[#FF6B35]/40 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time DSP Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Modulator Oscilloscope */}
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <WaveformIcon size={14} color={THEME.accent} />
              <span>MODULATED WAVEFORM (2-FSK)</span>
            </span>
            <span className="text-[#FF6B35] font-bold">
              {isSimulating ? 'TRANSMITTING BURST' : 'IDLE CARRIER'}
            </span>
          </div>
          <OscilloscopeStrip height={55} />
        </div>

        {/* 1024-Point FFT Demodulator */}
        <div className="flex flex-col justify-between gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>RECEIVER 1024-POINT FFT PEAKS</span>
            <span className={crcValidated ? 'text-[#10B981] font-bold' : 'text-[#FF6B35]'}>
              {crcValidated ? 'PACKET LOCKED' : 'SEARCHING'}
            </span>
          </div>
          <SpectrumBars barsCount={32} className="w-full justify-between h-14" />
          <div className="flex justify-between font-mono text-[10px] text-slate-500 pt-1 border-t border-white/5">
            <span>18.0 kHz</span>
            <span className="text-[#FF6B35]">Mark: 19.5 kHz</span>
            <span className="text-[#FF6B35]">Space: 21.5 kHz</span>
            <span>24.0 kHz</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Frame Rebuilder */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
        <div className="flex justify-between items-center text-slate-400">
          <span>FRAME REASSEMBLY STATUS:</span>
          <span>{Math.round(simulationProgress * 100)}%</span>
        </div>

        {/* Progress Fill */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-[#FF6B35]"
            style={{ width: `${simulationProgress * 100}%` }}
          />
        </div>

        {/* Decoded Byte Cells */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <span className="text-[10px] text-slate-500 self-center mr-1">FRAME [HEX]:</span>
          {decodedBytes.length > 0 ? (
            decodedBytes.map((hex, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] font-bold text-[11px]"
              >
                {hex}
              </span>
            ))
          ) : (
            <span className="text-slate-600 text-[11px] italic">Awaiting acoustic packet transmission...</span>
          )}
        </div>

        {/* CRC-32 Validation Banner */}
        <AnimatePresence>
          {crcValidated && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-mono text-xs mt-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="font-bold">CRC-32 CHECKSUM VERIFIED (0 ERRORS)</span>
              </div>
              <span>SNR: +32.4 dB · LATENCY: 14ms</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TelemetryPanel>
  );
};

export default PacketSimulator;
