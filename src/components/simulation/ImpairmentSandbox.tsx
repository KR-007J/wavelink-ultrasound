import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { AcousticShieldIcon } from '../telemetry/CustomAcousticIcons';

export const ImpairmentSandbox: React.FC = () => {
  const [activeTest, setActiveTest] = useState<'emp' | 'multipath' | 'doppler'>('emp');
  const [isFiringEmp, setIsFiringEmp] = useState(false);
  const [multipathEchoMs, setMultipathEchoMs] = useState(3.5);
  const [velocityMs, setVelocityMs] = useState(2.4);

  const handleFireEmp = () => {
    setIsFiringEmp(true);
    setTimeout(() => setIsFiringEmp(false), 2200);
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
            <AcousticShieldIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Hostile Channel & Jamming Resistance Sandbox
            </h3>
            <span className="font-mono text-[11px] text-slate-400">
              Live Stress-Test Comparison: Acoustic vs. RF Protocols
            </span>
          </div>
        </div>

        {/* Test Selector Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {(['emp', 'multipath', 'doppler'] as const).map((test) => (
            <button
              key={test}
              onClick={() => setActiveTest(test)}
              className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                activeTest === test
                  ? 'bg-[#FF6B35]/20 text-[#FF6B35] font-bold border border-[#FF6B35]/40'
                  : 'bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {test}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Test Scenarios */}
      <div>
        {/* SCENARIO 1: RF EMP BLAST ATTACK */}
        {activeTest === 'emp' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1 max-w-xl">
                <span className="font-display font-bold text-white text-base">
                  High-Intensity RF Electromagnetic Pulse (EMP) Attack
                </span>
                <p className="text-xs text-slate-300">
                  Simulates a 100 V/m wideband RF burst designed to jam Wi-Fi, Bluetooth, and cellular modems.
                </p>
              </div>

              <button
                onClick={handleFireEmp}
                disabled={isFiringEmp}
                className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-[#FF6B35] text-[#0E0E12] shadow-[0_0_25px_-4px_rgba(255,107,53,0.6)] cursor-pointer hover:scale-[1.02] transition-all whitespace-nowrap"
              >
                {isFiringEmp ? 'EMP BURST ACTIVE (100 V/m)...' : 'TRIGGER RF EMP BLAST'}
              </button>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Conventional RF */}
              <div className={`p-5 rounded-xl border transition-all ${
                isFiringEmp ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-black/40 border-white/10 text-slate-300'
              }`}>
                <div className="flex justify-between items-center font-mono text-xs pb-3 border-b border-white/10">
                  <span>CONVENTIONAL RF (2.4 / 5 GHz)</span>
                  <strong className={isFiringEmp ? 'text-red-400' : 'text-slate-400'}>
                    {isFiringEmp ? 'STATUS: JAMMED' : 'NORMAL'}
                  </strong>
                </div>
                <div className="pt-3 font-mono text-xs flex flex-col gap-1">
                  <span>PACKET LOSS: <strong className={isFiringEmp ? 'text-red-400 text-lg' : 'text-white'}>{isFiringEmp ? '100.0%' : '0.2%'}</strong></span>
                  <span>SNR: <strong>{isFiringEmp ? '-14.2 dB (UNREADABLE)' : '+24 dB'}</strong></span>
                </div>
              </div>

              {/* WAVELINK Acoustic */}
              <div className="p-5 rounded-xl border bg-[#10B981]/[0.05] border-[#10B981]/30 text-[#10B981]">
                <div className="flex justify-between items-center font-mono text-xs pb-3 border-b border-[#10B981]/20">
                  <span>WAVELINK ACOUSTIC AIR-GAP</span>
                  <strong className="text-[#10B981]">STATUS: 100% RESILIENT</strong>
                </div>
                <div className="pt-3 font-mono text-xs flex flex-col gap-1">
                  <span>PACKET LOSS: <strong className="text-[#10B981] text-lg">0.00%</strong></span>
                  <span>SNR: <strong className="text-white">+32.4 dB (UNAFFECTED BY RF)</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENARIO 2: MULTIPATH ROOM REFLECTIONS */}
        {activeTest === 'multipath' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>INJECTED MULTIPATH ROOM ECHO DELAY:</span>
                <strong className="text-[#FF6B35]">{multipathEchoMs.toFixed(1)} ms</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={multipathEchoMs}
                onChange={(e) => setMultipathEchoMs(parseFloat(e.target.value))}
                className="w-full accent-[#FF6B35] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span>SLIDING 1024-FFT FILTER RESPONSE:</span>
                <span className="text-[#10B981] font-bold">ACTIVE ECHO SUBTRACTION</span>
              </div>
              <p className="text-slate-300 font-normal leading-relaxed">
                WAVELINK applies dynamic thresholding with continuous baseline subtraction to cancel secondary room reflections up to 8.0ms without corrupting the primary carrier bit cells.
              </p>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-white/5">
                <span>ECHO ATTENUATION: <strong>-42 dB</strong></span>
                <span>RESIDUAL BER: <strong className="text-[#10B981]">&lt; 10⁻¹¹</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* SCENARIO 3: DOPPLER VELOCITY SHIFT */}
        {activeTest === 'doppler' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>TRANSCEIVER RELATIVE VELOCITY:</span>
                <strong className="text-[#FF6B35]">{velocityMs.toFixed(1)} m/s ({(velocityMs * 3.6).toFixed(1)} km/h)</strong>
              </div>
              <input
                type="range"
                min="0.0"
                max="6.0"
                step="0.1"
                value={velocityMs}
                onChange={(e) => setVelocityMs(parseFloat(e.target.value))}
                className="w-full accent-[#FF6B35] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span>PHASE-LOCKED DOPPLER TRACKER:</span>
                <span className="text-[#FF6B35] font-bold">Δf = ±{(velocityMs * 59.4).toFixed(0)} Hz</span>
              </div>
              <p className="text-slate-300 font-normal leading-relaxed">
                Continuous digital phase-locked loops (DPLL) dynamically track frequency drift caused by physical operator motion, maintaining lock up to 6.0 m/s relative speed.
              </p>
            </div>
          </div>
        )}
      </div>
    </TelemetryPanel>
  );
};

export default ImpairmentSandbox;
